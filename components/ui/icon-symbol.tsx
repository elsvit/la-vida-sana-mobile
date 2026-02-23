// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

// Map custom keys to Material Icons — decoupled from expo-symbols name union
type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>['name']>;
// type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
export enum EIconSymbolName {
  home = 'home',
  more = 'more-horiz',
  shopping = 'shopping-cart',
  storage = 'archive',
  menu = 'restaurant',
  // 'paperplane.fill' = 'send',
  // 'chevron.left.forwardslash.chevron.right' = 'code',
  // 'chevron.right' = 'chevron-right',
  // 'person.fill' = 'person',
  default = 'help-outline',
}

export const MAPPING = {
  ...EIconSymbolName,
} as const satisfies IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: EIconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const materialName = name ?? EIconSymbolName.default;
  if (__DEV__) {
    // Log resolved icon names during development to diagnose missing icons
    // eslint-disable-next-line no-console
    console.log('[IconSymbol]', { name, materialName });
  }
  return <MaterialIcons color={color} size={size} name={materialName} style={style} />;
}
