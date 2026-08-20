export type NotificationType = 'LIKE' | 'COMMENT' | 'CONNECTION_ACCEPT' | 'JOB_ALERT' | 'SYSTEM';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  avatarUrl?: string;
  targetId?: string;
  isRead: boolean;
  createdAt: string;
}
