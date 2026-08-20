import { useState, useCallback } from 'react';

export type PermissionType = 'camera' | 'notifications' | 'biometrics';

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<Record<PermissionType, boolean>>({
    camera: false,
    notifications: true,
    biometrics: false,
  });

  const requestPermission = useCallback(async (type: PermissionType): Promise<boolean> => {
    // Simulating native permission check
    setPermissions((prev) => ({ ...prev, [type]: true }));
    return true;
  }, []);

  return {
    permissions,
    requestPermission,
  };
};
