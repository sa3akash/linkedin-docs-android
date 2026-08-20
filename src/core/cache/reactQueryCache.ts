import { queryClient } from '../../services/api/queryClient';

export class ReactQueryCache {
  public static invalidateQuery(queryKey: string[]): void {
    queryClient.invalidateQueries({ queryKey });
  }

  public static clearAll(): void {
    queryClient.clear();
  }

  public static getQueryData<T>(queryKey: string[]): T | undefined {
    return queryClient.getQueryData<T>(queryKey);
  }

  public static setQueryData<T>(queryKey: string[], data: T): void {
    queryClient.setQueryData<T>(queryKey, data);
  }
}
