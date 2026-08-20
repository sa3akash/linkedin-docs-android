import { UserProfile } from './user.types';

export type ConnectionStatus = 'NONE' | 'PENDING_SENT' | 'PENDING_RECEIVED' | 'CONNECTED';

export interface NetworkConnection {
  id: string;
  user: UserProfile;
  status: ConnectionStatus;
  mutualConnectionsCount: number;
  connectedAt?: string;
}

export interface ConnectionRequest {
  id: string;
  sender: UserProfile;
  createdAt: string;
  note?: string;
}
