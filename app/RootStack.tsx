import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import 'react-native-reanimated';

import { useColorScheme } from '~/hooks/use-color-scheme';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLangInitiating, selectLang } from '~/store/account/selectors';
import { t } from "i18next";
import { AppDispatch } from "~/store";
import { useEffect } from "react";
import { initLanguage } from "~/store/account";
import { fetchCarrefourProducts, fetchMercadonaProducts } from "~/store/products";
import { fetchGenericProducts } from "~/store/genericProducts";

export default function RootStack() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();

  const lang = useSelector(selectLang);

  const isLangInitiating = useSelector(selectIsLangInitiating);

  useEffect(() => {
    dispatch(initLanguage());
    dispatch(fetchMercadonaProducts());
    dispatch(fetchCarrefourProducts());
    dispatch(fetchGenericProducts());
  }, [dispatch]);

  if (isLangInitiating || !lang) {
    return null; // or a loading spinner
  }

  const minimalHeaderBackOptions: NativeStackNavigationOptions = {
    headerBackTitle: '',
    headerBackButtonDisplayMode: 'minimal',
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack key={`stack-${lang}`}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />

        <Stack.Screen name="dishes/Dishes/Dishes" options={minimalHeaderBackOptions} />
        <Stack.Screen name="more/Settings/Settings" options={{title: t('settings.title'), ...minimalHeaderBackOptions}} />
        <Stack.Screen name="products/Products/Products" options={minimalHeaderBackOptions} />
        <Stack.Screen name="users/UserAdd/UserAdd" options={minimalHeaderBackOptions} />
        <Stack.Screen name="users/UserEdit/UserEdit" options={minimalHeaderBackOptions} />
      </Stack>
    </ThemeProvider>
  );
}
