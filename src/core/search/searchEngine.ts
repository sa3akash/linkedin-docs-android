import { mmkvStorage } from '../../services/storage/mmkv.storage';

export interface SearchResultItem {
  id: string;
  title: string;
  type: 'USER' | 'JOB' | 'POST' | 'COMPANY';
  subtitle?: string;
  avatarUrl?: string;
}

export class SearchEngine {
  private static HISTORY_KEY = 'search_history_items';

  public static getHistory(): string[] {
    const raw = mmkvStorage.getItem(SearchEngine.HISTORY_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as string[];
    } catch {
      return [];
    }
  }

  public static addHistory(query: string): void {
    if (!query.trim()) return;
    const history = SearchEngine.getHistory();
    const filtered = history.filter((item) => item.toLowerCase() !== query.toLowerCase());
    filtered.unshift(query.trim());
    mmkvStorage.setItem(SearchEngine.HISTORY_KEY, JSON.stringify(filtered.slice(0, 10)));
  }

  public static clearHistory(): void {
    mmkvStorage.removeItem(SearchEngine.HISTORY_KEY);
  }

  public static getTrendingSearches(): string[] {
    return [
      'React Native Architect',
      'Senior TypeScript Engineer',
      'Software Engineer Remote',
      'System Design Lead',
    ];
  }
}
