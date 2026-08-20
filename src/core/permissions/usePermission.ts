import { useState, useEffect, useCallback } from 'react';
import { PermissionType } from './permissionManager';
import { CameraPermissionHandler, PermissionStatus } from './camera';
import { MicrophonePermissionHandler } from './microphone';
import { ContactsPermissionHandler } from './contacts';
import { LocationPermissionHandler } from './location';
import { PhotosPermissionHandler } from './photos';
import { NotificationsPermissionHandler } from './notifications';
import { StoragePermissionHandler } from './storage';
import { BluetoothPermissionHandler } from './bluetooth';
import { CalendarPermissionHandler } from './calendar';

export const usePermission = (type: PermissionType) => {
  const [status, setStatus] = useState<PermissionStatus>('DENIED');

  const check = useCallback(async (): Promise<PermissionStatus> => {
    let res: PermissionStatus = 'DENIED';
    switch (type) {
      case 'camera':
        res = await CameraPermissionHandler.check();
        break;
      case 'microphone':
        res = await MicrophonePermissionHandler.check();
        break;
      case 'contacts':
        res = await ContactsPermissionHandler.check();
        break;
      case 'location':
        res = await LocationPermissionHandler.check();
        break;
      case 'photos':
        res = await PhotosPermissionHandler.check();
        break;
      case 'notifications':
        res = await NotificationsPermissionHandler.check();
        break;
      case 'storage':
        res = await StoragePermissionHandler.check();
        break;
      case 'bluetooth':
        res = await BluetoothPermissionHandler.check();
        break;
      case 'calendar':
        res = await CalendarPermissionHandler.check();
        break;
    }
    setStatus(res);
    return res;
  }, [type]);

  const request = useCallback(async (): Promise<PermissionStatus> => {
    let res: PermissionStatus = 'DENIED';
    switch (type) {
      case 'camera':
        res = await CameraPermissionHandler.request();
        break;
      case 'microphone':
        res = await MicrophonePermissionHandler.request();
        break;
      case 'contacts':
        res = await ContactsPermissionHandler.request();
        break;
      case 'location':
        res = await LocationPermissionHandler.request();
        break;
      case 'photos':
        res = await PhotosPermissionHandler.request();
        break;
      case 'notifications':
        res = await NotificationsPermissionHandler.request();
        break;
      case 'storage':
        res = await StoragePermissionHandler.request();
        break;
      case 'bluetooth':
        res = await BluetoothPermissionHandler.request();
        break;
      case 'calendar':
        res = await CalendarPermissionHandler.request();
        break;
    }
    setStatus(res);
    return res;
  }, [type]);

  useEffect(() => {
    check();
  }, [check]);

  return {
    status,
    isGranted: status === 'GRANTED',
    request,
    check,
  };
};
