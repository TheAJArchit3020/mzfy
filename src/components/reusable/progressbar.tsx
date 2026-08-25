// ProgressBarWithTooltip.tsx
import React, {
    useEffect,
    useRef,
    useState,
    FC,
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
    LayoutChangeEvent,
    ViewStyle,
} from 'react-native'

type ProgressBarProps = {
    progress: number   // 0–100
    height?: number
    backgroundColor?: string
    borderRadius?: number
    style?: ViewStyle
    /** what to show in the tooltip; defaults to `${progress}%` */
    tooltipLabel?: string
    showTooltip?: boolean
}

const ProgressBar: FC<ProgressBarProps> = ({
    progress,
    height = 10,
    backgroundColor = '#BBBBBB',
    borderRadius = 10,
    style,
    tooltipLabel,
    showTooltip = false
}) => {
    // animated 0→100
    const animatedValue = useRef(new Animated.Value(0)).current
    const [barWidth, setBarWidth] = useState(0)

    // clamp
    const clamped = Math.min(Math.max(progress, 0), 100)

    // fire the animation on mount / when `progress` changes
    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: clamped,
            duration: 900,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start()
    }, [clamped])

    // width of the fill
    const widthInterpolated = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    })

    // tooltip dimensions
    const TIP_W = 120
    const TIP_H = 28
    const ARROW_H = 5

    // compute left offset so center of tip = fill-head
    const leftInterpolated = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [-TIP_W / 2, barWidth - TIP_W / 2],
    })

    // color logic (same as yours)
    const getColor = (v: number) => {
        if (v <= 33.33) return '#F44336'
        if (v <= 66.66) return '#2979FF'
        return '#00C853'
    }
    const fillColor = getColor(clamped)

    return (
        <View
            style={[styles.container, { height, backgroundColor, borderRadius }, style]}
            onLayout={(e: LayoutChangeEvent) => {
                setBarWidth(e.nativeEvent.layout.width)
            }}
        >
            {/* Animated Fill */}
            <Animated.View
                style={[
                    styles.fill,
                    {
                        width: widthInterpolated,
                        backgroundColor: fillColor,
                        borderRadius,
                    },
                ]}
            />

            {/* Tooltip */}
            {showTooltip && <Animated.View
                style={[
                    styles.tooltipContainer,
                    {
                        width: TIP_W,
                        height: TIP_H + ARROW_H,
                        transform: [{ translateX: leftInterpolated }],
                        top: - (TIP_H + ARROW_H),
                    },
                ]}
                pointerEvents="none"
            >
                <View style={[styles.tooltip, { backgroundColor: '#0A0A0A' }]}>
                    <Text style={styles.tooltipText}>
                        {tooltipLabel ?? `${clamped}%`}
                    </Text>
                </View>
                <View style={[styles.arrow, { borderTopColor: '#0A0A0A' }]} />
            </Animated.View>}
        </View>
    )
}

export default ProgressBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        overflow: 'visible',
    },
    fill: {
        height: '100%',
    },
    tooltipContainer: {
        position: 'absolute',
        left: 0,
        alignItems: 'center',
    },
    tooltip: {
        width: 'auto',
        height: 'auto',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        padding: 6
    },
    tooltipText: {
        color: '#FFF',
        fontSize: 8,
        fontFamily: "PlusJakartaSans-Bold"
    },
    arrow: {
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 6,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        marginTop: -1,
    },
})
