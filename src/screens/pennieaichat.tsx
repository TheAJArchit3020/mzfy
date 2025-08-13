import { Animated, Easing, FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Input from '@components/reusable/Input'
import Button from '@components/reusable/button'
import { PaperAirplaneIcon } from 'react-native-heroicons/solid'
import LottieView from "lottie-react-native";
import { heightToDP } from 'react-native-responsive-screens'

const Pennieaichat: FC = () => {

    const [inputValue, setInputValue] = React.useState('');
    const [selectedButton, setSelectedButton] = React.useState('');
    const [messages, setMessages] = useState<{ text?: string; sender: 'user' | 'bot'; typing?: boolean }[]>([]);

    const flatListRef = useRef<FlatList>(null);


    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleButtonPress = (buttonName: string) => {
        setSelectedButton(buttonName);
        setInputValue(buttonName);
        // Handle button press logic here
    }

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);




    const buttonArray = [
        { name: "Extra payment impact" },
        { name: "APR explained" },
        { name: "Budgeting tips" },
        { name: "Total interest calculation " },
        { name: "Manage multiple debts" },
        { name: "Save more monthly" }
    ]


    const handleSend = () => {
        if (!inputValue.trim()) return;

        setMessages(prev => [
            ...prev,
            { text: inputValue.trim(), sender: 'user' },
            { sender: 'bot', typing: true }
        ]);


        // Simulate bot response after delay
        setTimeout(() => {
            setMessages(prev => {
                const newMessages = [...prev];
                // Remove typing placeholder
                if (newMessages.length && newMessages[newMessages.length - 1].typing) {
                    newMessages.pop();
                }
                // Add actual bot response
                newMessages.push({
                    text: `hgdjah hjasdjhsag dhgsajhdg gdjhsa hsgdjhsga jdgjash sahgdjhsagd hgdjhsajd jdgj gsjhdgjsahdgjhsdjhg jdgj sgdjhas dhgsjdhgsaj dgjha sdjgajsdgjashgdjagd jg dgshgdjhasgdjhsag jdgsajdgjsahgdj sagdjs`,
                    sender: 'bot'
                });
                return newMessages;
            });
        }, 1000);

        setInputValue('');
    };


    const TypingDots = () => {
        const dot1 = useRef(new Animated.Value(0)).current
        const dot2 = useRef(new Animated.Value(0)).current
        const dot3 = useRef(new Animated.Value(0)).current

        const bounce = (anim: Animated.Value, delay: number) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.timing(anim, { toValue: -4, duration: 200, easing: Easing.linear, useNativeDriver: true, delay }),
                    Animated.timing(anim, { toValue: 0, duration: 200, easing: Easing.linear, useNativeDriver: true }),
                ])
            )
        }

        useEffect(() => {
            bounce(dot1, 0).start()
            bounce(dot2, 100).start()
            bounce(dot3, 200).start()
        }, [])

        return (
            <View style={styles.typingContainer}>
                {[dot1, dot2, dot3].map((anim, idx) => (
                    <Animated.View
                        key={idx}
                        style={[
                            styles.dot,
                            { transform: [{ translateY: anim }] }
                        ]}
                    />
                ))}
            </View>
        )
    }


    return (
        <LinearGradient
            colors={["#5145BC", "#2F2C4A", "#2B293E", "#272631", "#232323"]}
            locations={[0, 0.64, 0.76, 0.87, 1]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}


        >

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={80}
            >
                <View style={styles.container}>
                    {
                        messages && messages.length > 0 ? (
                            <FlatList 
                                ref={flatListRef}
                                data={messages}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={[
                                        styles.messageBubble,
                                        item.sender === 'user' ? styles.userBubble : styles.botBubble
                                    ]}>
                                        {item.typing ? (
                                            <TypingDots />
                                        ) : (
                                            <Text style={styles.messageText}>{item.text}</Text>
                                        )}
                                    </View>
                                )}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                showsVerticalScrollIndicator={false}
                                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}

                            />

                        ) : (

                            <View style={styles.section1} >
                                <View style={styles.logowrapper} >
                                    <Image source={require("@images/pennieai/pennielogo.png")} style={styles.image} />
                                </View>
                                <Text style={styles.text1}>Pennie ai</Text>
                                <Text style={styles.text2}>Our AI is here 24/7 to guide you — from tracking payments to planning your financial future, one smart step at a time.</Text>

                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                                    {buttonArray?.map((item, idx) => {
                                        return (
                                            <Button key={idx} style={styles.button} onPress={() => handleButtonPress(item.name)} >
                                                <Text style={styles.buttonText}>{item.name}</Text>
                                            </Button>
                                        )
                                    })}
                                </View>
                            </View>
                        )

                    }

                    <View>
                        <Input value={inputValue} onChangeContent={(val) => handleInputChange(val)} inputWrapperStyle={styles.inputwrapperStyle} placeholder='Ask moneezify Ai' placeholderTextColor={'#A4A4A5'} children={
                            <Button onPress={handleSend}>
                                <PaperAirplaneIcon color={'#00FFFF'} />
                            </Button>
                        } />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient >
    )
}

export default Pennieaichat

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 20,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? heightToDP(7) : heightToDP(7),
    },
    inputwrapperStyle: {
        borderColor: '#00D9F5',
        borderWidth: 1,
        borderRadius: 24,
        backgroundColor: 'rgba(20, 20, 20, 0.6)',
    },
    section1: {
        flexDirection: "column",
        gap: 24,
        alignItems: "center",
        marginBottom: 70
    },
    logowrapper: {
        backgroundColor: "#32426A",
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    text1: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 24,
        textAlign: "center"
    },
    text2: {
        color: "#A4A4A5",
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 12,
        textAlign: "center"
    },
    gradientbutton: {
        borderRadius: 50
    },
    button: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 50,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.22,
        shadowRadius: 12,

        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 12,
        textAlign: "center"
    },
    messageBubble: {
        maxWidth: '80%',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 15,
        marginVertical: 5,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'flex-start',
        justifyContent: 'center',
    },
    userBubble: {
        backgroundColor: '#006FFF',
        alignSelf: 'flex-end',
    },
    botBubble: {
        backgroundColor: 'transparent',
        alignSelf: 'flex-start',
    },
    messageText: {
        color: '#fff',
        fontFamily: "PlusJakartaSans-Regular",
    },
    typingContainer: { flexDirection: 'row', alignItems: 'flex-end', height: 20 },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#fff',
        marginHorizontal: 2,
    },
})
