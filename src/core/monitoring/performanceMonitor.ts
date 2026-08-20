export interface PerformanceMetric {
  name: string;
  durationMs: number;
  timestamp: string;
  metadata?: Record<string, string | number | boolean>;
}

export class PerformanceMonitor {
  private static metrics: PerformanceMetric[] = [];

  public static startTimer(name: string): () => PerformanceMetric {
    const startTime = Date.now();

    return (metadata?: Record<string, string | number | boolean>): PerformanceMetric => {
      const durationMs = Date.now() - startTime;
      const metric: PerformanceMetric = {
        name,
        durationMs,
        timestamp: new Date().toISOString(),
        metadata,
      };

      PerformanceMonitor.metrics.push(metric);
      console.log(`[PerformanceMonitor] '${name}' took ${durationMs}ms`, metadata || '');
      return metric;
    };
  }

  public static getMetrics(): PerformanceMetric[] {
    return [...PerformanceMonitor.metrics];
  }

  public static clearMetrics(): void {
    PerformanceMonitor.metrics = [];
  }
}
