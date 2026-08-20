import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { useTheme } from '../hooks/useTheme';
import { FeedScreen } from '../features/feed';
import { NetworkScreen } from '../features/network';
import { JobsScreen } from '../features/jobs';
import { MessagesScreen } from '../features/messages';
import { NotificationsScreen } from '../features/notifications';
import { ProfileScreen } from '../features/profile';
import { SettingsScreen } from '../features/settings';

const Tab = createBottomTabNavigator<MainTabParamList>();

export interface MainTabNavigatorProps {
  onNavigateToCreatePost: () => void;
  onNavigateToPostDetails: (postId: string) => void;
  onNavigateToJobDetails: (jobId: string) => void;
  onNavigateToChatDetails: (conversationId: string, recipientName: string) => void;
}

export const MainTabNavigator: React.FC<MainTabNavigatorProps> = ({
  onNavigateToCreatePost,
  onNavigateToPostDetails,
  onNavigateToJobDetails,
  onNavigateToChatDetails,
}) => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTitleStyle: {
          color: colors.textPrimary,
        },
      }}
    >
      <Tab.Screen name="FeedTab" options={{ title: 'Home' }}>
        {() => (
          <FeedScreen
            onNavigateToCreatePost={onNavigateToCreatePost}
            onNavigateToPostDetails={onNavigateToPostDetails}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="NetworkTab" component={NetworkScreen} options={{ title: 'My Network' }} />
      <Tab.Screen name="JobsTab" options={{ title: 'Jobs' }}>
        {() => <JobsScreen onNavigateToJobDetails={onNavigateToJobDetails} />}
      </Tab.Screen>
      <Tab.Screen name="MessagesTab" options={{ title: 'Messaging' }}>
        {() => <MessagesScreen onNavigateToChatDetails={onNavigateToChatDetails} />}
      </Tab.Screen>
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{ title: 'Notifications' }}
      />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
};
