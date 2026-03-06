import React from 'react';
import type { ComponentProps } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { BUTTON_HEIGHT } from '~/constants/sizes';

export type PaperButtonProps = ComponentProps<typeof PaperButton>;

// export type ButtonBgColor = 'green' | 'brown' | 'orange' | 'violet' | 'red';

export type ButtonProps = PaperButtonProps & {
  isFullSize?: boolean;
  bgColor?: ButtonColors;
};

enum ButtonColors {
  Green = 'Green',
  Brown = 'Brown',
  Orange = 'Orange',
  Violet = 'Violet',
  Red = 'Red',
}

const COLOR_MAP: Record<ButtonColors, string> = {
  [ButtonColors.Green]: '#4CAF50',
  [ButtonColors.Brown]: '#6d4c41',
  [ButtonColors.Orange]: '#fb8c00',
  [ButtonColors.Violet]: '#7e57c2',
  [ButtonColors.Red]: '#e53935',
};

export const Button: React.FC<ButtonProps> = ({
  isFullSize = false,
  bgColor = ButtonColors.Green,
  style,
  contentStyle,
  buttonColor,
  ...rest
}) => {
  const resolvedButtonColor = buttonColor ?? (bgColor ? COLOR_MAP[bgColor] : undefined);

  if (isFullSize) {
    return (
      <View style={styles.fullWidthWrapper}>
        <PaperButton
          {...rest}
          buttonColor={resolvedButtonColor}
          style={[styles.baseRadius, style as any]}
          contentStyle={[styles.fixedHeight, contentStyle as any]}
        />
      </View>
    );
  }

  return (
    <PaperButton
      {...rest}
      buttonColor={resolvedButtonColor}
      style={[styles.baseRadius, styles.minWidth, style as any]}
      contentStyle={[styles.fixedHeight, contentStyle as any]}
    />
  );
};

const styles = StyleSheet.create({
  baseRadius: {
    borderRadius: 12,
  },
  fullWidthWrapper: {
    width: '100%',
  },
  minWidth: {
    minWidth: 120,
  },
  fixedHeight: {
    height: BUTTON_HEIGHT,
  },
});
