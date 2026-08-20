import React from 'react';
import { useSocket } from '../hooks/useSocket';

export interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  useSocket();
  return <>{children}</>;
};
