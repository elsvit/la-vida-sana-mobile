import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import 'react-native-reanimated';

import { useColorScheme } from '~/hooks/use-color-scheme';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLangInitiating, selectLang } from '~/store/account/selectors';
import { AppDispatch } from '~/store';
import { useEffect } from 'react';
import { initLanguage } from '~/store/account';
import { ELang } from '~/types/ILang';
import {
  fetchCarrefourProducts,
  fetchMercadonaProducts,
} from '~/store/products';
import { fetchGenericProducts } from '~/store/genericProducts';
import { Loading } from '~/components/ui/Loading';

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
        <Stack.Screen name="users/UserAdd" options={minimalHeaderBackOptions} />
        <Stack.Screen
          name="users/UserEdit"
          options={minimalHeaderBackOptions}
        />
      </Stack>
    </ThemeProvider>
  );
}
