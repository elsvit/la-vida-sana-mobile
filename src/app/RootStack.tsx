import { useEffect } from 'react';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from '~/components/ui/Loading';
import { useColorScheme } from '~/hooks/use-color-scheme';
import { AppDispatch } from '~/store';
import { initLanguage } from '~/store/account';
import { selectIsLangInitiating, selectLang } from '~/store/account/selectors';
import { fetchGenericProducts } from '~/store/genericProducts';
import {
  fetchCarrefourProducts,
  fetchMercadonaProducts,
} from '~/store/products';
import { ELang } from '~/types/ILang';

export default function RootStack() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();

  const lang = useSelector(selectLang) ?? ELang.es;

  const isLangInitiating = useSelector(selectIsLangInitiating);

  useEffect(() => {
    dispatch(initLanguage());
    dispatch(fetchMercadonaProducts());
    dispatch(fetchCarrefourProducts());
    dispatch(fetchGenericProducts());
  }, [dispatch]);

  if (isLangInitiating) {
    return <Loading />; // or a loading spinner
  }

  const minimalHeaderBackOptions: NativeStackNavigationOptions = {
    headerBackTitle: '',
    headerBackButtonDisplayMode: 'minimal',
  };

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack key={`stack-${lang}`}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: 'modal', title: 'Modal' }}
          />

          <Stack.Screen
            name="dishes/Dishes/Dishes"
            options={minimalHeaderBackOptions}
          />
          <Stack.Screen
            name="products/Dish/Dish"
            options={minimalHeaderBackOptions}
          />
          <Stack.Screen
            name="more/Settings/Settings"
            options={minimalHeaderBackOptions}
          />
          <Stack.Screen
            name="products/Products/Products"
            options={minimalHeaderBackOptions}
          />
          <Stack.Screen
            name="products/Product/Product"
            options={minimalHeaderBackOptions}
          />
          <Stack.Screen
            name="users/UserAdd"
            options={minimalHeaderBackOptions}
          />
          <Stack.Screen
            name="users/UserEdit"
            options={minimalHeaderBackOptions}
          />
          <Stack.Screen
            name="users/UsersRemove"
            options={minimalHeaderBackOptions}
          />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
