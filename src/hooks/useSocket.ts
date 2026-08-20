import { useEffect } from 'react';
import { socketService } from '../services/socket/socket.service';
import { useAuth } from './useAuth';
import { APP_CONFIG } from '../constants/app.constants';

export const useSocket = () => {
  const { tokens, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && tokens?.accessToken) {
      socketService.connect(APP_CONFIG.SOCKET_URL, tokens.accessToken);
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

