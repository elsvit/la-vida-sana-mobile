import AsyncStorage from '@react-native-async-storage/async-storage';

import { IS_WEB } from '~/constants';

let storageInstance: any | null = null;

export const getStorage = () => {
  if (!storageInstance) {
    if (IS_WEB) {
      // Delay require to client only
      // storageInstance = require('redux-persist/lib/storage').default;
      storageInstance = undefined;
    } else {
      storageInstance = AsyncStorage;
    }
  }
  return storageInstance;
};

export default getStorage;
