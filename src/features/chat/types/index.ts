export type MessageType = 'TEXT' | 'IMAGE' | 'VIDEO' | 'FILE' | 'VOICE_NOTE';
export type MessageStatus = 'SENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';

export interface MessageReaction {
  emoji: string;
  count: number;
  userIds: string[];
}

export interface VoiceNoteMetadata {
  durationSec: number;
  waveform: number[];
  audioUrl: string;
}

export interface AttachmentMetadata {
  url: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  type: MessageType;
  text?: string;
  attachments?: AttachmentMetadata[];
  voiceNote?: VoiceNoteMetadata;
  replyToMessageId?: string;
  replyToMessageText?: string;
  reactions: MessageReaction[];
  isEdited: boolean;
  isDeleted: boolean;
  status: MessageStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  updatedAt: string;
}
