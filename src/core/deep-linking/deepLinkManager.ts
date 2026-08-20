import { Linking } from 'react-native';

export interface ParsedDeepLink {
  scheme: string;
  host: string;
  path: string;
  params: Record<string, string>;
}

export class DeepLinkManager {
  public static parseUrl(url: string): ParsedDeepLink {
    const [baseUrl, queryString] = url.split('?');
    const parts = baseUrl.replace('://', '/').split('/');

    const scheme = parts[0] || '';
    const host = parts[1] || '';
    const path = parts.slice(2).join('/');

    const params: Record<string, string> = {};
    if (queryString) {
      queryString.split('&').forEach((pair) => {
        const [key, value] = pair.split('=');
        if (key) {
          params[key] = decodeURIComponent(value || '');
        }
      });
    }

    return { scheme, host, path, params };
  }

  public static async getInitialUrl(): Promise<ParsedDeepLink | null> {
    const url = await Linking.getInitialURL();
    return url ? DeepLinkManager.parseUrl(url) : null;
  }

  public static subscribe(callback: (link: ParsedDeepLink) => void): () => void {
    const subscription = Linking.addEventListener('url', (event) => {
      callback(DeepLinkManager.parseUrl(event.url));
    });

    return () => subscription.remove();
  }
}
