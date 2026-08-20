export const QUERY_KEYS = {
  AUTH: {
    ME: ['auth', 'me'] as const,
    SESSION: ['auth', 'session'] as const,
  },
  FEED: {
    POSTS: ['feed', 'posts'] as const,
    POST_DETAILS: (id: string) => ['feed', 'post', id] as const,
    COMMENTS: (postId: string) => ['feed', 'comments', postId] as const,
  },
  PROFILE: {
    USER: (id: string) => ['profile', id] as const,
    EXPERIENCE: (userId: string) => ['profile', userId, 'experience'] as const,
    EDUCATION: (userId: string) => ['profile', userId, 'education'] as const,
    SKILLS: (userId: string) => ['profile', userId, 'skills'] as const,
  },
  JOBS: {
    LIST: (query: string) => ['jobs', 'list', query] as const,
    DETAILS: (id: string) => ['jobs', 'details', id] as const,
    SAVED: ['jobs', 'saved'] as const,
    APPLIED: ['jobs', 'applied'] as const,
  },
  MESSAGES: {
    CONVERSATIONS: ['messages', 'conversations'] as const,
    CHAT_HISTORY: (conversationId: string) => ['messages', 'history', conversationId] as const,
  },
  NETWORK: {
    CONNECTIONS: ['network', 'connections'] as const,
    RECOMMENDATIONS: ['network', 'recommendations'] as const,
    PENDING_REQUESTS: ['network', 'requests'] as const,
  },
  NOTIFICATIONS: {
    LIST: ['notifications', 'list'] as const,
    UNREAD_COUNT: ['notifications', 'unread'] as const,
  },
} as const;
