import * as React from 'react';
import { StyleProp, StyleSheet, TextInputProps, ViewStyle } from 'react-native';

import { Searchbar } from 'react-native-paper';

import { t } from '~/services';

export type SearchProps = TextInputProps & {
  value: string;
  placeholder?: string;
  onChangeText: (v: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function Search({ value, onChangeText, placeholder, style, ...rest }: SearchProps) {
  return (
    <Searchbar
      placeholder={placeholder ?? t('common.search')}
      onChangeText={onChangeText}
      value={value}
      style={[styles.container, style]}
      inputStyle={{ fontSize: 16 }}
      elevation={0}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: '#fff',
    // height: 50,
    fontSize: 16,
  },
});
