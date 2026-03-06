import * as React from 'react';
import type { ComponentProps } from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export type TextInputProps = ComponentProps<typeof PaperTextInput>;

export function TextInput({ outlineStyle, outlineColor, ...rest }: TextInputProps) {
  return (
    <PaperTextInput
      mode="outlined"
      outlineStyle={[styles.container, outlineStyle as any]}
      outlineColor={outlineColor ?? '#9E9E9E'}
      {...rest}
    />
  );
}

TextInput.Icon = PaperTextInput.Icon;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderColor: '#9E9E9E',
  },
});
