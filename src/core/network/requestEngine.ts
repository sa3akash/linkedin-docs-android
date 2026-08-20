import { apiClient } from '../../services/api/axios';
import { AxiosRequestConfig } from 'axios';
import { mmkvStorage } from '../../services/storage/mmkv.storage';
import { MemoryCache } from '../cache/memoryCache';

export type RequestPriority = 'HIGH' | 'NORMAL' | 'LOW';

export interface AdvancedRequestConfig extends AxiosRequestConfig {
  priority?: RequestPriority;
  dedupeKey?: string;
  useCache?: boolean;
  cacheTtlMs?: number;
  retryCount?: number;
  maxRetries?: number;
  offlineQueueable?: boolean;
}

export interface QueuedOfflineRequest {
  id: string;
  config: AdvancedRequestConfig;
  createdAt: string;
}

export class RequestEngine {
  private static inflightRequests: Map<string, Promise<any>> = new Map();
  private static offlineQueue: QueuedOfflineRequest[] = [];
  private static BATCH_WINDOW_MS = 50;
  private static batchBuffer: Array<{ config: AdvancedRequestConfig; resolve: (val: any) => void; reject: (err: any) => void }> = [];
  private static batchTimer: ReturnType<typeof setTimeout> | null = null;
  private static OFFLINE_QUEUE_STORAGE_KEY = 'net_offline_queue';

  // 1. Request Deduplication & Execution
  public static async executeRequest<T>(config: AdvancedRequestConfig): Promise<T> {
    const dedupeKey = config.dedupeKey || `${config.method || 'GET'}:${config.url}`;

    // 2. Cache Interceptor
    if (config.method?.toUpperCase() === 'GET' && config.useCache) {
      const cached = MemoryCache.get<T>(dedupeKey);
      if (cached) {
        console.log(`[RequestEngine] Cache Hit for ${dedupeKey}`);
        return cached;
      }
    }

    // 3. Request Deduplication
    if (RequestEngine.inflightRequests.has(dedupeKey)) {
      console.log(`[RequestEngine] Inflight deduplicated: ${dedupeKey}`);
      return RequestEngine.inflightRequests.get(dedupeKey) as Promise<T>;
    }

    const promise = RequestEngine.executeWithRetry<T>(config)
      .then((data) => {
        if (config.useCache) {
          MemoryCache.set(dedupeKey, data, config.cacheTtlMs || 60000);
        }
        return data;
      })
      .catch(async (err) => {
        // 4. Offline Queue
        if (config.offlineQueueable) {
          RequestEngine.queueOfflineRequest(config);
        }
        throw err;
      })
      .finally(() => {
        RequestEngine.inflightRequests.delete(dedupeKey);
      });

    RequestEngine.inflightRequests.set(dedupeKey, promise);
    return promise;
  }

  // 5. Retry Queue with Exponential Backoff
  private static async executeWithRetry<T>(config: AdvancedRequestConfig, attempt = 1): Promise<T> {
    const maxRetries = config.maxRetries ?? 3;
    try {
      const res = await apiClient.request<T>(config);
      return res.data;
    } catch (error) {
      if (attempt < maxRetries) {
        const delayMs = Math.pow(2, attempt) * 500;
        console.warn(`[RequestEngine] Retry attempt ${attempt}/${maxRetries} in ${delayMs}ms...`);
        await new Promise((r) => setTimeout(() => r(undefined), delayMs));
        return RequestEngine.executeWithRetry<T>(config, attempt + 1);
      }
      throw error;
    }
  }

  // 6. Request Batching
  public static async executeBatchedRequest<T>(config: AdvancedRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      RequestEngine.batchBuffer.push({ config, resolve, reject });

      if (RequestEngine.batchTimer) {
        clearTimeout(RequestEngine.batchTimer);
      }

      RequestEngine.batchTimer = setTimeout(() => {
        RequestEngine.flushBatch();
      }, RequestEngine.BATCH_WINDOW_MS);
    });
  }

  private static async flushBatch(): Promise<void> {
    const currentBatch = [...RequestEngine.batchBuffer];
    RequestEngine.batchBuffer = [];
    RequestEngine.batchTimer = null;

    console.log(`[RequestEngine] Flushing batch of ${currentBatch.length} requests`);

    currentBatch.forEach(async ({ config, resolve, reject }) => {
      try {
        const result = await RequestEngine.executeRequest(config);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  // Offline Queue Management
  public static queueOfflineRequest(config: AdvancedRequestConfig): void {
    const item: QueuedOfflineRequest = {
      id: `off_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      config,
      createdAt: new Date().toISOString(),
    };
    RequestEngine.offlineQueue.push(item);
    mmkvStorage.setItem(RequestEngine.OFFLINE_QUEUE_STORAGE_KEY, JSON.stringify(RequestEngine.offlineQueue));
    console.log(`[RequestEngine] Queued offline request: ${config.url}`);
  }

  public static async flushOfflineQueue(): Promise<void> {
    const raw = mmkvStorage.getItem(RequestEngine.OFFLINE_QUEUE_STORAGE_KEY);
    if (!raw) return;

    try {
      const items = JSON.parse(raw) as QueuedOfflineRequest[];
      console.log(`[RequestEngine] Flushing ${items.length} offline queued requests`);

      for (const item of items) {
        try {
          await RequestEngine.executeRequest(item.config);
        } catch {
          // Keep failing items in queue
        }
      }

      mmkvStorage.removeItem(RequestEngine.OFFLINE_QUEUE_STORAGE_KEY);
      RequestEngine.offlineQueue = [];
    } catch (err) {
      console.error('[RequestEngine] Error flushing offline queue:', err);
    }
  }
}
