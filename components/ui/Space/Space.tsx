import React, { memo } from 'react';
import { View } from 'react-native';

const Space = memo(
  ({
    size = 0,
    horizontal = false,
  }: {
    size: number;
    horizontal?: boolean;
  }) => {
    if (horizontal) {
      return <View style={{ width: size }} />;
    }

    return <View style={{ height: size }} />;
  },
);

export { Space };
