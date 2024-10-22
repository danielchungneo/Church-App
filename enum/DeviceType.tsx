import { Platform } from 'react-native';

const os = Platform.OS;

export const isIOS = os === 'ios';
export const isAndroid = os === 'android';
export const isWeb = os === 'web';
export const isMac = os === 'macos';
export const isWindows = os === 'windows';
