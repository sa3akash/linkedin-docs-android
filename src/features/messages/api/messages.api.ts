import { Conversation, ChatMessage } from '../../../types';

export const messagesApi = {
  getConversations: async (): Promise<Conversation[]> => {
    return [
      {
        id: 'conv_1',
        participant: {
          id: 'u_501',
          email: 'michael.ross@netflix.com',
          firstName: 'Michael',
          lastName: 'Ross',
          headline: 'VP Mobile Infrastructure at Netflix',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
          connectionCount: 2100,
          experiences: [],
          education: [],
          skills: [],
          certificates: [],
        },
        lastMessage: {
          id: 'm_101',
          conversationId: 'conv_1',
          senderId: 'u_501',
          recipientId: 'u_101',
          text: 'Hey Alex, reviewing the React Native performance report now. Fantastic work!',
          status: 'READ',
          createdAt: '10:42 AM',
        },
        unreadCount: 0,
        updatedAt: '10:42 AM',
        isTyping: false,
      },
    ];
  },

  getMessages: async (conversationId: string): Promise<ChatMessage[]> => {
    return [
      {
        id: 'm_100',
        conversationId,
        senderId: 'u_101',
        recipientId: 'u_501',
        text: 'Hi Michael, sent over the enterprise benchmark results.',
        status: 'READ',
        createdAt: '10:30 AM',
      },
      {
        id: 'm_101',
        conversationId,
        senderId: 'u_501',
        recipientId: 'u_101',
        text: 'Hey Alex, reviewing the React Native performance report now. Fantastic work!',
        status: 'READ',
        createdAt: '10:42 AM',
      },
    ];
  },
};
