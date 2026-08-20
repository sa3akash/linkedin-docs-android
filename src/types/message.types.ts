import { UserProfile } from './user.types';

export type MessageStatus = 'SENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  text: string;
  attachmentUrl?: string;
  status: MessageStatus;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participant: UserProfile;
  lastMessage?: ChatMessage;
  unreadCount: number;
  updatedAt: string;
  isTyping?: boolean;
}
