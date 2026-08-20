import { useBreakpoint, BreakpointKey } from './useBreakpoint';

export const useDeviceType = (): BreakpointKey => {
  return useBreakpoint();
};
