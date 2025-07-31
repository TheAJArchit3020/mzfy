import React, { useEffect, useRef } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
} from 'react-native'
import Svg, {
    Circle,
    Defs,
    LinearGradient,
    Stop,
} from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface Props {
    progress?: number // 0–100
    size?: number     // px
    strokeWidth?: number
}

const CircularProgressbar: React.FC<Props> = ({
    progress = 65,
    size = 120,
    strokeWidth = 10,
}) => {
    // two‑tone gradient colors
    const gradientColors = ['#F4CF3B', '#8E7822']

    // Circle math
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius

    // Animated value drives dash offset
    const animatedValue = useRef(new Animated.Value(0)).current

    const clamped = Math.min(Math.max(progress, 0), 100)
    const dashOffset = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0],
    })

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: clamped,
            duration: 700,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start()
    }, [clamped])

    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                {/* 1) Define your gradient */}
                <Defs>
                    <LinearGradient
                        id="grad"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                        gradientTransform={`rotate(-90 ${size / 2} ${size / 2})`}
                    >
                        <Stop offset="0%" stopColor={gradientColors[0]} />
                        <Stop offset="100%" stopColor={gradientColors[1]} />
                    </LinearGradient>
                </Defs>

                {/* 2) Background circle */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#e6e6e6"
                    strokeWidth={strokeWidth}
                    fill="none"
                />

                {/* 3) Animated foreground, using your gradient */}
                <AnimatedCircle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#grad)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${circumference}, ${circumference}`}
                    strokeDashoffset={dashOffset}
                />
            </Svg>

            {/* Center label */}
            <View style={styles.label}>
                <Text style={styles.percentText}>₹ 90,00,00</Text>
            </View>
        </View>
    )
}

export default CircularProgressbar

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
        fontSize: 13,
        color: '#E63A30',
        fontFamily: 'PlusJakartaSans-Bold',
    },
})
