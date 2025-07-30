import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, Animated } from 'react-native';

type ProgressBarProps = {
  progress: number; // 0 to 100
  height?: number;
  backgroundColor?: string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 10,
  backgroundColor = '#BBBBBB',
  borderRadius = 10,
  style,
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const getProgressColor = (value: number) => {
    if (value <= 33.33) return '#F44336'; // Red
    if (value <= 66.66) return '#2979FF'; // Blue
    return '#00C853';                    // Green
  };

  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const progressColor = getProgressColor(clampedProgress);

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: clampedProgress,
      duration: 900,
      useNativeDriver: false, // width needs to be animated in JS
    }).start();
  }, [clampedProgress]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={[
        styles.container,
        { height, backgroundColor, borderRadius },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.progress,
          {
            width: widthInterpolated,
            backgroundColor: progressColor,
            borderRadius,
          },
        ]}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});
