import { useState, useEffect, useCallback } from 'react';
import { DeepLinkManager, ParsedDeepLink } from './deepLinkManager';

export const useDeepLink = (onDeepLinkReceived?: (link: ParsedDeepLink) => void) => {
  const [initialLink, setInitialLink] = useState<ParsedDeepLink | null>(null);
  const [currentLink, setCurrentLink] = useState<ParsedDeepLink | null>(null);

  useEffect(() => {
    // 1. Handle Cold Launch Initial Deep Link
    DeepLinkManager.getInitialUrl().then((link) => {
      if (link) {
        setInitialLink(link);
        setCurrentLink(link);
        if (onDeepLinkReceived) {
          onDeepLinkReceived(link);
        }
      }
    });

    // 2. Handle Warm Launch Incoming Deep Link
    const unsub = DeepLinkManager.subscribe((link) => {
      setCurrentLink(link);
      if (onDeepLinkReceived) {
        onDeepLinkReceived(link);
      }
    });

    return () => unsub();
  }, [onDeepLinkReceived]);

  const clearCurrentLink = useCallback(() => {
    setCurrentLink(null);
  }, []);

  return {
    initialLink,
    currentLink,
    clearCurrentLink,
  };
};
