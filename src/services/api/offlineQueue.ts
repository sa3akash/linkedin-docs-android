import { mmkvStorage } from '../storage/mmkv.storage';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { apiClient } from './axios';

export interface OfflineMutation {
  id: string;
  endpoint: string;
  method: 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  payload: unknown;
  timestamp: number;
}

class OfflineQueueService {
  private queue: OfflineMutation[] = [];

  constructor() {
    this.loadQueue();
  }

  private loadQueue(): void {
    try {
      const stored = mmkvStorage.getItem(STORAGE_KEYS.OFFLINE_MUTATIONS);
      if (stored) {
        this.queue = JSON.parse(stored);
      }
    } catch {
      this.queue = [];
    }
  }

  private saveQueue(): void {
    mmkvStorage.setItem(STORAGE_KEYS.OFFLINE_MUTATIONS, JSON.stringify(this.queue));
  }

  public enqueueMutation(
    endpoint: string,
    method: OfflineMutation['method'],
    payload: unknown
  ): void {
    const mutation: OfflineMutation = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      endpoint,
      method,
      payload,
      timestamp: Date.now(),
    };
    this.queue.push(mutation);
    this.saveQueue();
  }

  public async processQueue(): Promise<void> {
    if (this.queue.length === 0) return;

    const currentQueue = [...this.queue];
    this.queue = [];
    this.saveQueue();

    for (const mutation of currentQueue) {
      try {
        await apiClient.request({
          url: mutation.endpoint,
          method: mutation.method,
          data: mutation.payload,
        });
      } catch (error) {
        console.error(`[OfflineQueue] Failed to replay mutation ${mutation.id}`, error);
        // Re-enqueue failed mutations for next retry
        this.queue.push(mutation);
        this.saveQueue();
      }
    }
  }

  public getQueueLength(): number {
    return this.queue.length;
  }
}

export const offlineQueue = new OfflineQueueService();
