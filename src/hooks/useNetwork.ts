import { useState, useEffect } from 'react';
import { offlineQueue } from '../services/api/offlineQueue';

export const useNetwork = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    // Replay offline mutation queue when reconnected
    if (isConnected) {
      offlineQueue.processQueue();
    }
  }, [isConnected]);

  return {
    isConnected,
    setIsConnected,
    offlineQueueLength: offlineQueue.getQueueLength(),
  };
};
