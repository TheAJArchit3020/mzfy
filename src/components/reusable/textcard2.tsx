import { ActivityIndicator, Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightToDP, widthToDP as wp } from 'react-native-responsive-screens';

type CardProps = {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    cardStyle?: StyleProp<ViewStyle>;
    text1?: any
    text2?: any
    text3?: any
    text1style?: any
    text2style?: any
    text3style?: any
};

const TextCard2 = ({ children, style, cardStyle, text1, text2, text3, text1style, text2style, text3style }: CardProps) => {

    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (text1) {
            setShowContent(true);
        }
    }, [text1]);

    return (
        <View style={[styles.shadowContainer, style]}>
            <View style={[styles.card, cardStyle]}>
                <Text style={text1style}>{text1}</Text>
                {showContent ? (
                    <>
                        <Text style={text2style}>{text2} <Text style={text3style}>{text3}</Text></Text>
                        {children}
                    </>
                ) : (
                    <ActivityIndicator color={"#fff"} size={"large"} style={{ marginTop: heightToDP(2) }} />
                )}
            </View>
        </View>
    )
}

export default TextCard2

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
        borderRadius: wp(7),
        borderColor: "#F7F7F7",
        borderWidth: 0.5,
        overflow: "hidden"

    },
    card: {
        padding: '5%'
    }
})