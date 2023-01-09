import type { Device } from './types';

export const getDeviceClass = (device: Device, count?: number) =>
  count !== undefined ? `${device}-${count}` : undefined;
