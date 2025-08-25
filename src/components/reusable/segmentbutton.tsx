// components/SegmentButton.tsx
import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle,
    Platform,
} from 'react-native'
import { heightToDP, widthToDP } from 'react-native-responsive-screens'

export interface SegmentButtonProps {
    items: string[]
    selectedIndex: number
    onChange: (newIndex: number) => void
    containerStyle?: ViewStyle
    segmentStyle?: ViewStyle
    textStyle?: TextStyle
    activeSegmentStyle?: ViewStyle
    activeTextStyle?: TextStyle
}

const SegmentButton: React.FC<SegmentButtonProps> = ({
    items,
    selectedIndex,
    onChange,
    containerStyle,
    segmentStyle,
    textStyle,
    activeSegmentStyle,
    activeTextStyle,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {items.map((label, idx) => {
                const isActive = idx === selectedIndex
                return (
                    <TouchableOpacity
                        key={idx}
                        activeOpacity={0.7}
                        onPress={() => onChange(idx)}
                        style={[
                            styles.segment,
                            // add right‑margin on all but last
                            idx < items.length - 1 && styles.segmentMargin,
                            segmentStyle,
                            isActive && [styles.activeSegment, activeSegmentStyle],
                        ]}
                    >
                        <Text
                            style={[
                                styles.text,
                                textStyle,
                                isActive && [styles.activeText, activeTextStyle],
                            ]}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default SegmentButton

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-around",
        backgroundColor: '#2A2A2A',
        borderRadius: 100,
        padding: 10,
        width: Platform.OS === 'android' ? widthToDP(90) : widthToDP(90),
        marginTop: Platform.OS === 'android' ? heightToDP(5.5) : heightToDP(5),
        alignSelf: "center",
        marginBottom: '4%'

    },
    segment: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    segmentMargin: {
        marginRight: 8,
    },
    activeSegment: {
        backgroundColor: '#006FFF',
    },
    text: {
        color: '#FFF',
        fontSize: widthToDP(3.2),
    },
    activeText: {
        fontWeight: '600',
    },
})
