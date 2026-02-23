import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { palette } from '~/styles';

interface Props {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0 - 100
  color?: string;
  backgroundColor?: string;
}

export const CircleProgress: React.FC<Props> = ({
  size = 80,
  strokeWidth = 8,
  progress,
  color = palette.primaryGreen,
  backgroundColor = '#E0E0E0',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const strokeDashoffset =
    circumference - (circumference * clampedProgress) / 100;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          stroke={backgroundColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" // 👈 border radius effect
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* Center Text */}
      <View style={StyleSheet.absoluteFillObject}>
        <View style={styles.center}>
          <Text style={styles.text}>{clampedProgress}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
