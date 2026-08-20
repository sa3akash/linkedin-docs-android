import { useEffect, useRef, useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socketService, PresencePayload, TypingPayload } from '../../../services/socket/socket.service';
import { ChatMessage } from '../../../types/message.types';

export interface UseChatSocketProps {
  conversationId?: string;
  onMessageReceived?: (message: ChatMessage) => void;
}

export const useChatSocket = ({ conversationId, onMessageReceived }: UseChatSocketProps = {}) => {
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(socketService.getIsConnected());
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [userPresence, setUserPresence] = useState<Map<string, PresencePayload['status']>>(new Map());

  // AbortController ref for cancelling ongoing fetch requests during component unmount
  const abortControllerRef = useRef<AbortController | null>(null);

  // 1. Handle Typing status updates with memory cleanup
  const handleTypingStatus = useCallback(
    (data: TypingPayload) => {
      if (conversationId && data.conversationId !== conversationId) return;

      setTypingUsers((prev) => {
        const next = new Set(prev);
        if (data.isTyping) {
          next.add(data.userId);
        } else {
          next.delete(data.userId);
        }
        return next;
      });
    },
    [conversationId]
  );

  // 2. Handle Presence updates
  const handlePresenceUpdate = useCallback((data: PresencePayload) => {
    setUserPresence((prev) => {
      const next = new Map(prev);
      next.set(data.userId, data.status);
      return next;
    });
  }, []);

  // 3. Handle incoming chat messages + query cancellation + cache update
  const handleNewMessage = useCallback(
    async (message: ChatMessage) => {
      if (conversationId && message.conversationId !== conversationId) return;

      // Cancel active chat queries to avoid race conditions
      await queryClient.cancelQueries({ queryKey: ['chat', message.conversationId] });

      // Update query cache optimistically
      queryClient.setQueryData(['chat', message.conversationId], (oldData: any) => {
        if (!oldData) return [message];
        return [...oldData, message];
      });

      if (onMessageReceived) {
        onMessageReceived(message);
      }
    },
    [conversationId, onMessageReceived, queryClient]
  );

  useEffect(() => {
    // Instantiate AbortController for memory-safe request cancellation
    abortControllerRef.current = new AbortController();

    // Attach listeners with clean teardown references
    const unsubConnect = socketService.on('connect', () => setIsConnected(true));
    const unsubDisconnect = socketService.on('disconnect', () => setIsConnected(false));
    const unsubMessage = socketService.onNewMessage(handleNewMessage);
    const unsubTyping = socketService.onTypingStatus(handleTypingStatus);
    const unsubPresence = socketService.onPresenceUpdate(handlePresenceUpdate);

    // Cleanup Effect (Mandatory for memory leak prevention)
    return () => {
      // Cancel active HTTP requests via AbortController
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Cancel React Query active refetches
      if (conversationId) {
        queryClient.cancelQueries({ queryKey: ['chat', conversationId] });
      }

      // Unsubscribe event listeners (Event & Listener Cleanup)
      unsubConnect();
      unsubDisconnect();
      unsubMessage();
      unsubTyping();
      unsubPresence();

      socketService.off('new_message', handleNewMessage);
      socketService.removeListener('user_typing', handleTypingStatus);
    };
  }, [conversationId, handleNewMessage, handleTypingStatus, handlePresenceUpdate, queryClient]);

  const sendTyping = useCallback(
    (isTyping: boolean) => {
      if (conversationId) {
        socketService.sendTypingStatus(conversationId, isTyping);
      }
    },
    [conversationId]
  );

  const sendMessage = useCallback((message: Partial<ChatMessage>) => {
    socketService.sendMessage(message);
  }, []);

  return {
    isConnected,
    typingUsers: Array.from(typingUsers),
    userPresence,
    sendTyping,
    sendMessage,
    abortController: abortControllerRef.current,
  };
};
