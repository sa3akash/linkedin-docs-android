import { apiClient } from '../../services/api/axios';
import { AxiosRequestConfig } from 'axios';

export interface PriorityRequestConfig extends AxiosRequestConfig {
  priority?: 'HIGH' | 'NORMAL' | 'LOW';
  dedupeKey?: string;
}

export class RequestEngine {
  private static inflightRequests: Map<string, Promise<any>> = new Map();

  public static async executeRequest<T>(config: PriorityRequestConfig): Promise<T> {
    const dedupeKey = config.dedupeKey || `${config.method}:${config.url}`;

    // Request Deduplication: if exact request is inflight, reuse existing promise
    if (RequestEngine.inflightRequests.has(dedupeKey)) {
      console.log(`[RequestEngine] Deduplicated inflight request for key: ${dedupeKey}`);
      return RequestEngine.inflightRequests.get(dedupeKey) as Promise<T>;
    }

    const promise = apiClient.request<T>(config).then((res) => res.data).finally(() => {
      RequestEngine.inflightRequests.delete(dedupeKey);
    });

    RequestEngine.inflightRequests.set(dedupeKey, promise);
    return promise;
  }
}
