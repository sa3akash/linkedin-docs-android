import { useCallback } from 'react';
import { Alert } from 'react-native';
import { PermissionType } from './permissionManager';
import { usePermission } from './usePermission';

export const usePermissionGuard = (permissionType: PermissionType) => {
  const { status, request } = usePermission(permissionType);

  const executeWithPermission = useCallback(
    async (action: () => void | Promise<void>) => {
      let currentStatus = status;

      if (currentStatus !== 'GRANTED') {
        currentStatus = await request();
      }

      if (currentStatus === 'GRANTED') {
        await action();
      } else {
        Alert.alert(
          'Permission Required',
          `To use this feature, please enable ${permissionType} access in your device settings.`,
          [{ text: 'OK' }]
        );
      }
    },
    [status, request, permissionType]
  );

  return { executeWithPermission, status };
};
