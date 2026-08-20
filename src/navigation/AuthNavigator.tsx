import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import { LoginScreen, RegisterScreen, OTPVerificationScreen } from '../features/auth';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => (
          <LoginScreen
            onNavigateToRegister={() => props.navigation.navigate('Register')}
            onNavigateToOTP={(email) => props.navigation.navigate('OTPVerification', { email })}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Register">
        {(props) => (
          <RegisterScreen onNavigateToLogin={() => props.navigation.navigate('Login')} />
        )}
      </Stack.Screen>
      <Stack.Screen name="OTPVerification">
        {(props) => (
          <OTPVerificationScreen
            email={props.route.params.email}
            onVerified={() => props.navigation.navigate('Login')}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
