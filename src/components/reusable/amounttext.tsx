import { Dimensions, StyleProp, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

type textProps = {
    style?: any
    text?: any
    minFontSize?: number;
    maxFontSize?: number;
};
const { width: windowWidth } = Dimensions.get("window");

const Amounttext: FC<textProps> = ({
    text,
    style,
    minFontSize = 12,
    maxFontSize = 30,
}) => {

    const fontSize = Math.max(
        minFontSize,
        Math.min(maxFontSize, windowWidth * 0.1) // adjust multiplier if needed
    );


    return (
        <Text style={[styles.text, { fontSize }, style]}>{text ?? '-'}</Text>
    )
}

export default Amounttext

const styles = StyleSheet.create({
    text: {
        fontFamily: "PlusJakartaSans-Bold"
    }
})