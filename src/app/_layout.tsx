import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '~/store';
import RootStack from './RootStack';


// export const unstable_settings = {
//   anchor: '(tabs)',
// };

export default function RootLayout() {
  return (
    <Provider store={store}>
      {persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          <RootStack />
        </PersistGate>
      ) : (
        <>
          <RootStack />
          <StatusBar style="auto" />
        </>
      )}
    </Provider>
  );
}
