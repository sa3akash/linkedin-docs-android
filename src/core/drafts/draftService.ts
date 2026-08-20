import { mmkvStorage } from '../../services/storage/mmkv.storage';

export type DraftType = 'POST' | 'COMMENT' | 'MESSAGE' | 'JOB_APPLICATION';

export interface DraftItem<T = unknown> {
  id: string;
  type: DraftType;
  content: T;
  updatedAt: string;
}

export class DraftService {
  public static saveDraft<T>(type: DraftType, targetId: string, content: T): void {
    const draftKey = `draft_${type}_${targetId}`;
    const item: DraftItem<T> = {
      id: draftKey,
      type,
      content,
      updatedAt: new Date().toISOString(),
    };
    mmkvStorage.setItem(draftKey, JSON.stringify(item));
  }

  public static getDraft<T>(type: DraftType, targetId: string): DraftItem<T> | null {
    const draftKey = `draft_${type}_${targetId}`;
    const raw = mmkvStorage.getItem(draftKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as DraftItem<T>;
    } catch {
      return null;
    }
  }

  public static clearDraft(type: DraftType, targetId: string): void {
    const draftKey = `draft_${type}_${targetId}`;
    mmkvStorage.removeItem(draftKey);
  }
}
