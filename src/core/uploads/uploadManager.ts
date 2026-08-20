export type UploadStatus = 'IDLE' | 'UPLOADING' | 'PAUSED' | 'COMPLETED' | 'FAILED';

export interface UploadTask {
  id: string;
  fileUri: string;
  fileName: string;
  fileType: 'image' | 'video' | 'audio' | 'pdf' | 'docx';
  fileSize: number;
  uploadedBytes: number;
  status: UploadStatus;
  progress: number; // 0 to 100
  chunkSize: number;
}

export type UploadProgressCallback = (task: UploadTask) => void;

export class UploadManager {
  private static tasks: Map<string, UploadTask> = new Map();
  private static listeners: Map<string, Set<UploadProgressCallback>> = new Map();

  public static createUploadTask(
    fileUri: string,
    fileName: string,
    fileType: UploadTask['fileType'],
    fileSize: number
  ): UploadTask {
    const id = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const task: UploadTask = {
      id,
      fileUri,
      fileName,
      fileType,
      fileSize,
      uploadedBytes: 0,
      status: 'IDLE',
      progress: 0,
      chunkSize: 1024 * 1024, // 1MB chunks
    };

    UploadManager.tasks.set(id, task);
    return task;
  }

  public static startUpload(taskId: string): void {
    const task = UploadManager.tasks.get(taskId);
    if (!task || task.status === 'UPLOADING') return;

    task.status = 'UPLOADING';
    UploadManager.notifyListeners(task);

    // Simulate Chunked Upload Loop
    const interval = setInterval(() => {
      if (task.status !== 'UPLOADING') {
        clearInterval(interval);
        return;
      }

      task.uploadedBytes = Math.min(task.fileSize, task.uploadedBytes + task.chunkSize);
      task.progress = Math.round((task.uploadedBytes / task.fileSize) * 100);

      if (task.uploadedBytes >= task.fileSize) {
        task.status = 'COMPLETED';
        clearInterval(interval);
      }

      UploadManager.notifyListeners(task);
    }, 500);
  }

  public static pauseUpload(taskId: string): void {
    const task = UploadManager.tasks.get(taskId);
    if (task && task.status === 'UPLOADING') {
      task.status = 'PAUSED';
      UploadManager.notifyListeners(task);
    }
  }

  public static resumeUpload(taskId: string): void {
    const task = UploadManager.tasks.get(taskId);
    if (task && task.status === 'PAUSED') {
      UploadManager.startUpload(taskId);
    }
  }

  public static onProgress(taskId: string, callback: UploadProgressCallback): () => void {
    if (!UploadManager.listeners.has(taskId)) {
      UploadManager.listeners.set(taskId, new Set());
    }
    UploadManager.listeners.get(taskId)!.add(callback);

    return () => {
      UploadManager.listeners.get(taskId)?.delete(callback);
    };
  }

  private static notifyListeners(task: UploadTask): void {
    UploadManager.listeners.get(task.id)?.forEach((cb) => cb(task));
  }
}
