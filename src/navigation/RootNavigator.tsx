import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { deepLinkingConfig } from './deepLinking';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { CreatePostScreen, PostDetailsScreen } from '../features/feed';
import { JobDetailsScreen } from '../features/jobs';
import { ChatDetailsScreen } from '../features/messages';
import { useAuth } from '../hooks/useAuth';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer linking={deepLinkingConfig}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="Main">
              {(props) => (
                <MainTabNavigator
                  onNavigateToCreatePost={() => props.navigation.navigate('CreatePost')}
                  onNavigateToPostDetails={(postId) =>
                    props.navigation.navigate('PostDetails', { postId })
                  }
                  onNavigateToJobDetails={(jobId) =>
                    props.navigation.navigate('JobDetails', { jobId })
                  }
                  onNavigateToChatDetails={(conversationId, recipientName) =>
                    props.navigation.navigate('ChatDetails', { conversationId, recipientName })
                  }
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="CreatePost" options={{ presentation: 'modal' }}>
              {(props) => <CreatePostScreen onClose={() => props.navigation.goBack()} />}
            </Stack.Screen>
            <Stack.Screen name="PostDetails" options={{ headerShown: true, title: 'Post' }}>
              {(props) => <PostDetailsScreen postId={props.route.params.postId} />}
            </Stack.Screen>
            <Stack.Screen name="JobDetails" options={{ headerShown: true, title: 'Job Details' }}>
              {(props) => <JobDetailsScreen jobId={props.route.params.jobId} />}
            </Stack.Screen>
            <Stack.Screen name="ChatDetails" options={{ headerShown: true, title: 'Chat' }}>
              {(props) => (
                <ChatDetailsScreen
                  conversationId={props.route.params.conversationId}
                  recipientName={props.route.params.recipientName}
                />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
