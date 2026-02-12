import Config from 'react-native-config';

export const CONFIG = {
  ...Config,
  ...(Config as any)?.getConstants(),
};
