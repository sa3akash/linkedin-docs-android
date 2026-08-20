import { useEffect } from 'react';
import { socketService } from '../services/socket/socket.service';
import { useAuth } from './useAuth';

export const useSocket = () => {
  const { tokens, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && tokens?.accessToken) {
      socketService.connect(tokens.accessToken);
    } else {
      socketService.disconnect();
    }

    return () => {
      socketService.disconnect();
    };
  }, [isAuthenticated, tokens?.accessToken]);

  return {
    socketService,
    isConnected: socketService.getIsConnected(),
  };
};
