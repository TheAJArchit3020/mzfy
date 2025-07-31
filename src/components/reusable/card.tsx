import { Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'


type CardProps = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    cardStyle?: StyleProp<ViewStyle>;
};

const Card = ({ children, style, cardStyle }: CardProps) => {
    return (
        <View style={[styles.shadowContainer, style]}>
            <View style={[styles.card, cardStyle]}>
                {children}
            </View>
        </View>
    )
}

export default Card

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
        width: 'auto',
        backgroundColor: "#2A2A2A",
        borderRadius: 25,
        borderColor:"#fff",
        borderWidth:1
    },
    card: {
        padding: '5%'
    }
})