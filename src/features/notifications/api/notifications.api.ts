import { AppNotification } from '../../../types';

export const notificationsApi = {
  getNotifications: async (): Promise<AppNotification[]> => {
    return [
      {
        id: 'n_1',
        type: 'LIKE',
        title: 'Sarah Chen liked your post',
        body: 'Excited to announce our new breakthrough in mobile AI agent capabilities!',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        isRead: false,
        createdAt: '1h ago',
      },
      {
        id: 'n_2',
        type: 'CONNECTION_ACCEPT',
        title: 'Michael Ross accepted your connection request',
        body: 'You are now connected with Michael Ross.',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        isRead: true,
        createdAt: '4h ago',
      },
    ];
  },
};
