import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryProvider } from './QueryProvider';
import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';
import { SocketProvider } from './SocketProvider';
import { LocalizationProvider } from './LocalizationProvider';
import { NotificationProvider } from './NotificationProvider';
import { AnalyticsProvider } from './AnalyticsProvider';

export interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <AuthProvider>
          <LocalizationProvider>
            <ThemeProvider>
              <SocketProvider>
                <NotificationProvider>
                  <AnalyticsProvider>{children}</AnalyticsProvider>
                </NotificationProvider>
              </SocketProvider>
            </ThemeProvider>
          </LocalizationProvider>
        </AuthProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
};
