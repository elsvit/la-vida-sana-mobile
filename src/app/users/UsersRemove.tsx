import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';

import { SafeAreaBackground } from '~/components/blocks/SafeAreaBackground';
import { useI18nHeaderTitle } from '~/hooks/useI18nHeaderTitle';
import { clearUsers } from '~/store/users/slice';
import { Button } from '~/components/ui/Button/Button';

export default function UsersRemove() {
  useI18nHeaderTitle('more.remove_all_users');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRemove = () => {
    dispatch(clearUsers());
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <SafeAreaBackground>
      <View style={styles.container}>
        <Button
          mode="contained"
          isFullSize
          buttonColor="#e53935" // destructive color
          onPress={handleRemove}
        >
          remove
        </Button>
      </View>
    </SafeAreaBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
