import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  OTPVerification: { email: string };
  BiometricAuth: undefined;
};

export type MainTabParamList = {
  FeedTab: undefined;
  NetworkTab: undefined;
  JobsTab: undefined;
  MessagesTab: undefined;
  NotificationsTab: undefined;
  ProfileTab: { userId?: string };
  SettingsTab: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  CreatePost: undefined;
  PostDetails: { postId: string };
  JobDetails: { jobId: string };
  ChatDetails: { conversationId: string; recipientName: string };
};
