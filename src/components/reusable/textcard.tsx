import { ActivityIndicator, Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightToDP } from 'react-native-responsive-screens';
import Amounttext from './amounttext';


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
                        <Amounttext
                            style={text2style}
                            text={text2}
                        />
                        {children}
                    </>
                ) : (
                    <ActivityIndicator color={"#fff"} size={"large"} style={{ marginTop: heightToDP(2) }} />
                )}
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