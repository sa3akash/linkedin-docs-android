import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import { ChatMessage, Conversation } from '../types/message.types';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { zustandMMKVStorage } from '../services/storage/mmkv.storage';

export interface ChatSlice {
  conversations: Conversation[];
  activeMessages: Record<string, ChatMessage[]>;
  pendingOfflineMessages: ChatMessage[];

  setConversations: (conversations: Conversation[]) => void;
  setMessages: (conversationId: string, messages: ChatMessage[]) => void;
  appendMessage: (conversationId: string, message: ChatMessage) => void;
  setTypingStatus: (conversationId: string, isTyping: boolean) => void;
  clearChatCache: () => void;
}

export const useChatStore = create<ChatSlice>()(
  persist(
    (set) => ({
      conversations: [],
      activeMessages: {},
      pendingOfflineMessages: [],

      setConversations: (conversations) =>
        set(
          produce((state: ChatSlice) => {
            state.conversations = conversations;
          })
        ),

      setMessages: (conversationId, messages) =>
        set(
          produce((state: ChatSlice) => {
            state.activeMessages[conversationId] = messages;
          })
        ),

      appendMessage: (conversationId, message) =>
        set(
          produce((state: ChatSlice) => {
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
          produce((state: ChatSlice) => {
            const conversation = state.conversations.find((c) => c.id === conversationId);
            if (conversation) {
              conversation.isTyping = isTyping;
            }
          })
        ),

      clearChatCache: () =>
        set(
          produce((state: ChatSlice) => {
            state.conversations = [];
            state.activeMessages = {};
            state.pendingOfflineMessages = [];
          })
        ),
    }),
    {
      name: STORAGE_KEYS.CHAT_STORE,
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
