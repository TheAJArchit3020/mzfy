import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

type Props = {
    text?: string;
    style?: StyleProp<TextStyle>;
    minFontSize?: number;
    maxFontSize?: number;
    containerStyle?: StyleProp<ViewStyle>;
};

const Amounttext: FC<Props> = ({
    text = '-',
    style,
    minFontSize = 12,
    maxFontSize = 30,
    containerStyle,
}) => {
    return (
        <View style={[styles.wrap, containerStyle]}>
            <Text
                style={[styles.text, { fontSize: maxFontSize }, style]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={minFontSize / maxFontSize}
                ellipsizeMode="clip"
            >
                {text}
            </Text>
        </View>
    );
};

export default Amounttext;

const styles = StyleSheet.create({
    wrap: {
        maxWidth: '100%',
        flexShrink: 1, // important when used inside rows so it can shrink
    },
    text: {
        fontFamily: 'PlusJakartaSans-Bold',
    },
});
