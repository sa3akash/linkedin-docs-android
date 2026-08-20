import React, { memo } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { AppUpdateService, UpdateType, AppVersionConfig } from '../../core/update/appUpdateService';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { SecondaryButton } from '../buttons/SecondaryButton';

export interface AppUpdateModalProps {
  config: AppVersionConfig;
  visible: boolean;
  onDismissSoftUpdate?: () => void;
}

export const AppUpdateModal: React.FC<AppUpdateModalProps> = memo(({
  config,
  visible,
  onDismissSoftUpdate,
}) => {
  const updateType: UpdateType = AppUpdateService.evaluateUpdateRequirement(config);

  if (updateType === 'NONE' || !visible) {
    return null;
  }

  const isForce = updateType === 'FORCE_UPDATE';
  const isMaintenance = updateType === 'MAINTENANCE_MODE';

  const handleUpdatePress = () => {
    AppUpdateService.redirectToStore(config.storeUrlAndroid, config.storeUrlIos);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.icon}>{isMaintenance ? '🛠️' : '🚀'}</Text>
          <Text style={styles.title}>
            {isMaintenance
              ? 'System Maintenance'
              : isForce
              ? 'Update Required'
              : 'New Version Available'}
          </Text>

          <Text style={styles.description}>
            {isMaintenance
              ? config.maintenanceMessage || 'Our servers are currently undergoing scheduled maintenance. Please check back shortly.'
              : isForce
              ? 'A critical new update is available. Please update your app to continue.'
              : 'A new version of the app is available with performance improvements and feature enhancements.'}
          </Text>

          {!isMaintenance && (
            <PrimaryButton title="Update Now" onPress={handleUpdatePress} style={styles.button} />
          )}

          {!isForce && !isMaintenance && onDismissSoftUpdate && (
            <SecondaryButton title="Maybe Later" onPress={onDismissSoftUpdate} style={styles.button} />
          )}
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  button: {
    width: '100%',
    marginTop: 8,
  },
});
