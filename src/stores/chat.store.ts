import { create } from 'zustand';
import { produce } from 'immer';
import { ChatMessage, Conversation } from '../types/message.types';

interface ChatState {
  conversations: Conversation[];
  activeMessages: Record<string, ChatMessage[]>;
  setConversations: (conversations: Conversation[]) => void;
  setMessages: (conversationId: string, messages: ChatMessage[]) => void;
  appendMessage: (conversationId: string, message: ChatMessage) => void;
  setTypingStatus: (conversationId: string, isTyping: boolean) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  conversations: [],
  activeMessages: {},

  setConversations: (conversations) =>
    set(
      produce((state: ChatState) => {
        state.conversations = conversations;
      })
    ),

  setMessages: (conversationId, messages) =>
    set(
      produce((state: ChatState) => {
        state.activeMessages[conversationId] = messages;
      })
    ),

  appendMessage: (conversationId, message) =>
    set(
      produce((state: ChatState) => {
        if (!state.activeMessages[conversationId]) {
          state.activeMessages[conversationId] = [];
        }
        state.activeMessages[conversationId].push(message);

        const conversation = state.conversations.find((c) => c.id === conversationId);
        if (conversation) {
          conversation.lastMessage = message;
          conversation.updatedAt = message.createdAt;
        }
      })
    ),

  setTypingStatus: (conversationId, isTyping) =>
    set(
      produce((state: ChatState) => {
        const conversation = state.conversations.find((c) => c.id === conversationId);
        if (conversation) {
          conversation.isTyping = isTyping;
        }
      })
    ),
}));
