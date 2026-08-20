import { useState, useEffect, useCallback } from 'react';
import { UploadManager, UploadTask, SupportedFileType } from './uploadManager';

export const useUpload = (taskId?: string) => {
  const [task, setTask] = useState<UploadTask | null>(() => (taskId ? UploadManager.getTask(taskId) : null));

  useEffect(() => {
    if (!taskId) return;

    const unsub = UploadManager.onProgress(taskId, (updatedTask) => {
      setTask({ ...updatedTask });
    });

    return () => unsub();
  }, [taskId]);

  const createAndStartUpload = useCallback(
    (fileUri: string, fileName: string, fileType: SupportedFileType, fileSize: number, uploadUrl?: string) => {
      const newTask = UploadManager.createUploadTask(fileUri, fileName, fileType, fileSize, uploadUrl);
      setTask(newTask);
      UploadManager.startUpload(newTask.id);
      return newTask.id;
    },
    []
  );

  const pause = useCallback(() => {
    if (task) UploadManager.pauseUpload(task.id);
  }, [task]);

  const resume = useCallback(() => {
    if (task) UploadManager.resumeUpload(task.id);
  }, [task]);

  const retry = useCallback(() => {
    if (task) UploadManager.retryUpload(task.id);
  }, [task]);

  const cancel = useCallback(() => {
    if (task) {
      UploadManager.cancelUpload(task.id);
      setTask(null);
    }
  }, [task]);

  return {
    task,
    createAndStartUpload,
    pause,
    resume,
    retry,
    cancel,
  };
};
