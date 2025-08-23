import { Animated, Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import Button from '@components/reusable/button'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '@managers/routing';

type navProps = NativeStackNavigationProp<RootStackParams>


interface chatProps {
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    imagestyle?: any;
    children?: React.ReactNode;
    text?: any
}


const Aimodal: FC<chatProps> = ({
    onPress,
    style,
    imagestyle,
    children,
    text
}) => {

    const navigation = useNavigation<navProps>();

    const navigateHandler = () => {
        navigation.navigate('pennieaichatscreen');
    }

    const textArray = [
        "Ask me anything about your debts",
        "Get personalized debt strategies",
        "Track your debt progress with AI",
        "Receive reminders for upcoming payments",
        "Understand your debt breakdown"
    ];

    const [index, setIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // function to handle fade sequence
        const animateText = () => {
            Animated.sequence([
                Animated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }), // fade out
                Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true })  // fade in
            ]).start();
        };

        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % textArray.length);
            animateText();
        }, 5000);

        // run animation for first text
        animateText();

        return () => clearInterval(interval);
    }, [fadeAnim]);



    return (
        <View style={[styles.container, style]}>
            <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
                {text ?? textArray[index]}
            </Animated.Text>
            <Button onPress={navigateHandler} >
                <Image source={require("@images/pennieai/aiimage.png")} style={[styles.image, imagestyle]} />
            </Button>
        </View>
    )
}

export default Aimodal

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 20,
        right: 20,
        zIndex: 1,
        backgroundColor: "transparent",
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: "contain"
    },
    text: {
        fontSize: 13,
        fontFamily: "PlusJakartaSans-Bold",
        color: "#fff",
        marginTop: -5
    }
})