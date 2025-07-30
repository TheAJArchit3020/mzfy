import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Circularprogressbar = ({ progress = 65, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedValue = useRef(new Animated.Value(0)).current;

  const getProgressColor = (value: number) => {
    if (value <= 33.33) return '#F44336'; // red
    if (value <= 66.66) return '#2979FF'; // blue
    return '#00C853'; // green
  };

  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const progressColor = getProgressColor(clampedProgress);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: clampedProgress,
      duration: 700,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [clampedProgress]);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          stroke={progressColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.label}>
        <Text style={styles.percentText}>{`${Math.round(clampedProgress)}%`}</Text>
      </View>
    </View>
  );
};

export default Circularprogressbar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
