import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './types';

export const deepLinkingConfig: LinkingOptions<RootStackParamList> = {
  prefixes: ['linkedin://', 'https://linkedin.com', 'https://*.linkedin.com'],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
          Register: 'register',
        },
      },
      Main: {
        screens: {
          FeedTab: 'feed',
          JobsTab: 'jobs',
          MessagesTab: 'messages',
          NotificationsTab: 'notifications',
        },
      },
      PostDetails: 'posts/:postId',
      JobDetails: 'jobs/:jobId',
    },
  },
};
