import { useState, useCallback, useMemo } from 'react';
import { ChatMessage } from '../types';
import { ChatApi } from '../api/chat.api';

export const useMessaging = (conversationId: string, initialMessages: ChatMessage[] = []) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);

  const sendMessage = useCallback(
    async (text: string, type: ChatMessage['type'] = 'TEXT', attachments?: ChatMessage['attachments']) => {
      const tempId = `temp_${Date.now()}`;
      const newMsg: ChatMessage = {
        id: tempId,
        conversationId,
        senderId: 'current_user',
        type,
        text,
        attachments,
        replyToMessageId: replyingTo?.id,
        replyToMessageText: replyingTo?.text,
        reactions: [],
        isEdited: false,
        isDeleted: false,
        status: 'SENDING',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setMessages((prev) => [newMsg, ...prev]);
      setReplyingTo(null);

      try {
        const sent = await ChatApi.sendMessage(newMsg);
        setMessages((prev) => prev.map((m) => (m.id === tempId ? sent : m)));
      } catch {
        setMessages((prev) => prev.map((m) => (m.id === tempId ? { ...m, status: 'FAILED' } : m)));
      }
    },
    [conversationId, replyingTo]
  );

  const editMessage = useCallback(async (messageId: string, newText: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, text: newText, isEdited: true } : m))
    );
    await ChatApi.editMessage(messageId, newText);
  }, []);

  const deleteMessage = useCallback(async (messageId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, text: 'This message was deleted', isDeleted: true } : m))
    );
    await ChatApi.deleteMessage(messageId);
  }, []);

  const toggleReaction = useCallback(async (messageId: string, emoji: string) => {
    const updated = await ChatApi.addReaction(messageId, emoji);
    setMessages((prev) => prev.map((m) => (m.id === messageId ? updated : m)));
  }, []);

  const forwardMessage = useCallback(async (messageId: string, targetConversationId: string) => {
    await ChatApi.forwardMessage(messageId, targetConversationId);
  }, []);

  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages;
    return messages.filter((m) => m.text?.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [messages, searchQuery]);

  return {
    messages: filteredMessages,
    sendMessage,
    editMessage,
    deleteMessage,
    toggleReaction,
    forwardMessage,
    replyingTo,
    setReplyingTo,
    searchQuery,
    setSearchQuery,
  };
};
