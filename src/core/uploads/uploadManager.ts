import { mmkvStorage } from '../../services/storage/mmkv.storage';

export type UploadStatus = 'IDLE' | 'UPLOADING' | 'PAUSED' | 'COMPLETED' | 'FAILED';
export type SupportedFileType = 'image' | 'video' | 'audio' | 'pdf' | 'docx';

export interface UploadTask {
  id: string;
  fileUri: string;
  fileName: string;
  fileType: SupportedFileType;
  fileSize: number;
  uploadedBytes: number;
  status: UploadStatus;
  progress: number; // 0 to 100
  chunkSize: number;
  retryCount: number;
  maxRetries: number;
  uploadUrl?: string;
  error?: string;
}

export type UploadProgressCallback = (task: UploadTask) => void;

export class UploadManager {
  private static tasks: Map<string, UploadTask> = new Map();
  private static listeners: Map<string, Set<UploadProgressCallback>> = new Map();
  private static intervals: Map<string, ReturnType<typeof setInterval>> = new Map();

  private static STORAGE_KEY_PREFIX = 'resumable_upload_task_';

  public static createUploadTask(
    fileUri: string,
    fileName: string,
    fileType: SupportedFileType,
    fileSize: number,
    uploadUrl?: string
  ): UploadTask {
    const id = `upload_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
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
      retryCount: 0,
      maxRetries: 3,
      uploadUrl,
    };

    UploadManager.tasks.set(id, task);
    UploadManager.persistTaskState(task);
    return task;
  }

  public static startUpload(taskId: string): void {
    const task = UploadManager.tasks.get(taskId) || UploadManager.restoreTaskFromStorage(taskId);
    if (!task || task.status === 'UPLOADING') return;

    task.status = 'UPLOADING';
    UploadManager.persistTaskState(task);
    UploadManager.notifyListeners(task);

    if (UploadManager.intervals.has(taskId)) {
      clearInterval(UploadManager.intervals.get(taskId)!);
    }

    // Chunk Upload Loop Simulation
    const interval = setInterval(() => {
      if (task.status !== 'UPLOADING') {
        clearInterval(interval);
        UploadManager.intervals.delete(taskId);
        return;
      }

      task.uploadedBytes = Math.min(task.fileSize, task.uploadedBytes + task.chunkSize);
      task.progress = Math.round((task.uploadedBytes / task.fileSize) * 100);

      if (task.uploadedBytes >= task.fileSize) {
        task.status = 'COMPLETED';
        clearInterval(interval);
        UploadManager.intervals.delete(taskId);
      }

      UploadManager.persistTaskState(task);
      UploadManager.notifyListeners(task);
    }, 500);

    UploadManager.intervals.set(taskId, interval);
  }

  public static pauseUpload(taskId: string): void {
    const task = UploadManager.tasks.get(taskId);
    if (task && task.status === 'UPLOADING') {
      task.status = 'PAUSED';
      if (UploadManager.intervals.has(taskId)) {
        clearInterval(UploadManager.intervals.get(taskId)!);
        UploadManager.intervals.delete(taskId);
      }
      UploadManager.persistTaskState(task);
      UploadManager.notifyListeners(task);
    }
  }

  public static resumeUpload(taskId: string): void {
    const task = UploadManager.tasks.get(taskId);
    if (task && (task.status === 'PAUSED' || task.status === 'FAILED')) {
      UploadManager.startUpload(taskId);
    }
  }

  public static retryUpload(taskId: string): void {
    const task = UploadManager.tasks.get(taskId);
    if (task) {
      task.retryCount += 1;
      task.status = 'IDLE';
      UploadManager.startUpload(taskId);
    }
  }

  public static cancelUpload(taskId: string): void {
    if (UploadManager.intervals.has(taskId)) {
      clearInterval(UploadManager.intervals.get(taskId)!);
      UploadManager.intervals.delete(taskId);
    }
    UploadManager.tasks.delete(taskId);
    mmkvStorage.removeItem(`${UploadManager.STORAGE_KEY_PREFIX}${taskId}`);
  }

  public static getTask(taskId: string): UploadTask | null {
    return UploadManager.tasks.get(taskId) || UploadManager.restoreTaskFromStorage(taskId);
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

  private static persistTaskState(task: UploadTask): void {
    mmkvStorage.setItem(`${UploadManager.STORAGE_KEY_PREFIX}${task.id}`, JSON.stringify(task));
  }

  private static restoreTaskFromStorage(taskId: string): UploadTask | null {
    const raw = mmkvStorage.getItem(`${UploadManager.STORAGE_KEY_PREFIX}${taskId}`);
    if (!raw) return null;
    try {
      const task = JSON.parse(raw) as UploadTask;
      UploadManager.tasks.set(taskId, task);
      return task;
    } catch {
      return null;
    }
  }

  private static notifyListeners(task: UploadTask): void {
    UploadManager.listeners.get(task.id)?.forEach((cb) => cb(task));
  }
}
