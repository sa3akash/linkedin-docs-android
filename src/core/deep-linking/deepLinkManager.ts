import { Linking } from 'react-native';

export type DeepLinkCategory =
  | 'UNIVERSAL_LINK'
  | 'APP_LINK'
  | 'PUSH_NOTIFICATION_LINK'
  | 'MARKETING_LINK'
  | 'REFERRAL_LINK'
  | 'CUSTOM_SCHEME';

export interface ParsedDeepLink {
  rawUrl: string;
  category: DeepLinkCategory;
  scheme: string;
  host: string;
  path: string;
  params: Record<string, string>;
  referralCode?: string;
  campaignId?: string;
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

    let category: DeepLinkCategory = 'CUSTOM_SCHEME';

    if (url.startsWith('https://link.linkedin-enterprise.com') || params.utm_campaign) {
      category = 'MARKETING_LINK';
    } else if (url.includes('/referral') || params.code || params.ref) {
      category = 'REFERRAL_LINK';
    } else if (scheme === 'linkedin' && path.includes('notification')) {
      category = 'PUSH_NOTIFICATION_LINK';
    } else if (url.startsWith('https://app.linkedin-enterprise.com')) {
      category = 'APP_LINK';
    } else if (url.startsWith('https://linkedin-enterprise.com')) {
      category = 'UNIVERSAL_LINK';
    }

    return {
      rawUrl: url,
      category,
      scheme,
      host,
      path,
      params,
      referralCode: params.code || params.ref,
      campaignId: params.utm_campaign || params.campaign,
    };
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
