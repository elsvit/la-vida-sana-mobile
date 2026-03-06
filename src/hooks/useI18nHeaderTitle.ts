import { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { useSelector } from 'react-redux';
import { selectLang } from '~/store/account/selectors';
import { t } from '~/services';

/**
 * Keeps the native header title translated and in sync with language changes.
 * Use inside any screen that relies on React Navigation header.
 */
export function useI18nHeaderTitle(key: Parameters<typeof t>[0]) {
  const navigation = useNavigation();
  const lang = useSelector(selectLang);

  useEffect(() => {
    navigation.setOptions({ title: t(key) });
  }, [navigation, lang, key]);
}
