import { useState, useEffect, useRef, useCallback } from 'react';
import { DraftService, DraftType } from './draftService';

export interface UseAutoSaveDraftProps<T> {
  type: DraftType;
  targetId: string;
  initialValue: T;
  intervalMs?: number;
}

export function useAutoSaveDraft<T>({
  type,
  targetId,
  initialValue,
  intervalMs = 3000,
}: UseAutoSaveDraftProps<T>) {
  const [content, setContent] = useState<T>(initialValue);
  const [isSaved, setIsSaved] = useState(true);
  const contentRef = useRef<T>(content);
  contentRef.current = content;

  // On Mount: Restore unsaved draft if present
  useEffect(() => {
    const savedDraft = DraftService.getDraft<T>(type, targetId);
    if (savedDraft) {
      setContent(savedDraft.content);
      console.log(`[AutoSaveDraft] Restored unsaved ${type} draft for target '${targetId}'`);
    }
  }, [type, targetId]);

  // Periodic Auto Save every X seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (contentRef.current !== undefined && contentRef.current !== null) {
        DraftService.saveDraft<T>(type, targetId, contentRef.current);
        setIsSaved(true);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [type, targetId, intervalMs]);

  const updateContent = useCallback((newContent: T) => {
    setContent(newContent);
    setIsSaved(false);
  }, []);

  const clearDraft = useCallback(() => {
    DraftService.clearDraft(type, targetId);
    setIsSaved(true);
  }, [type, targetId]);

  return {
    content,
    updateContent,
    clearDraft,
    isSaved,
  };
}
