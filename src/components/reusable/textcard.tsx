import { Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'


type CardProps = {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    cardStyle?: StyleProp<ViewStyle>;
    text1?: any
    text2?: any
    text1style?: any
    text2style?: any
};

const TextCard = ({ children, style, cardStyle, text1, text2, text1style, text2style }: CardProps) => {
    return (
        <View style={[styles.shadowContainer, style]}>
            <View style={[styles.card, cardStyle]}>
                <Text style={text1style}>{text1}</Text>
                <Text style={text2style}>{text2}</Text>
                {children}
            </View>
        </View>
    )
}

export default TextCard

const styles = StyleSheet.create({
    shadowContainer: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 6,
            },
            android: {
                elevation: 5,
            },
        }),
        width: '48%',
        backgroundColor: "#2A2A2A",
        borderRadius: 25,
        borderColor: "#fff",
        borderWidth: 0.5,
        overflow: "hidden"

    },
    card: {
        padding: '5%'
    }
})