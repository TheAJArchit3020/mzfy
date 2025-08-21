import {
    Animated,
    AppState,
    Easing,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Input from "@components/reusable/Input";
import Button from "@components/reusable/button";
import { PaperAirplaneIcon } from "react-native-heroicons/solid";
import { heightToDP } from "react-native-responsive-screens";
import EventSource from "react-native-sse";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Pennieaichat: FC = () => {


    const [inputValue, setInputValue] = useState("");
    const [selectedButton, setSelectedButton] = useState("");
    const [messages, setMessages] = useState<
        { text?: string; sender: "user" | "bot"; typing?: boolean }[]
    >([]);
    const flatListRef = useRef<FlatList>(null);


    // useEffect(() => {
    //     const appStateSubscription = AppState.addEventListener('change', (nextAppState) => {
    //         if (nextAppState === 'active') {
    //             // App became active, reconnect SSE
    //             es.open();
    //         } else if (nextAppState === 'background' || nextAppState === 'inactive') {
    //             // App went to background, close SSE connection
    //             es.close();
    //         }
    //     });

    //     return () => {
    //         appStateSubscription.remove();
    //     };
    // }, []);

    // 🔹 Setup SSE connection once
    // useEffect(() => {
    //     let es: EventSource | null = null;

    //     const initSSE = async () => {
    //         const token = await AsyncStorage.getItem("token");
    //         if (!token) {
    //             console.warn("⚠️ No token found in AsyncStorage");
    //             return;
    //         }

    //         es = new EventSource(
    //             "https://api.moneezify.com/api/moneezifyAgent/chat/stream",
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                     Accept: "text/event-stream",
    //                 },
    //             }
    //         );

    //         es.addEventListener("open", () => {
    //             console.log("✅ SSE connection opened");
    //         });

    //         // es.addEventListener("message", (event) => {
    //         //     console.log("📩 Bot reply:", event.data);

    //         //     setMessages((prev) => {
    //         //         const newMessages = [...prev];
    //         //         if (
    //         //             newMessages.length &&
    //         //             newMessages[newMessages.length - 1].typing
    //         //         ) {
    //         //             newMessages.pop(); // remove typing bubble
    //         //         }
    //         //         newMessages.push({ text: event.data ?? undefined, sender: "bot" });
    //         //         return newMessages;
    //         //     });
    //         // });

    //         es.addEventListener("message", (event) => {
    //             console.log("📩 SSE chunk:", event.data);

    //             setMessages((prev) => {
    //                 const newMessages = [...prev];

    //                 // 1. If last message is typing → replace it with first chunk
    //                 if (newMessages.length && newMessages[newMessages.length - 1].typing) {
    //                     newMessages.pop();
    //                     newMessages.push({ text: event.data ?? undefined, sender: "bot" });
    //                     return newMessages;
    //                 }

    //                 // 2. If last message is bot → append chunk to it
    //                 if (newMessages.length && newMessages[newMessages.length - 1].sender === "bot") {
    //                     newMessages[newMessages.length - 1].text = (newMessages[newMessages.length - 1].text ?? "") + event.data;
    //                     return [...newMessages];
    //                 }

    //                 // 3. Otherwise push new bot message
    //                 newMessages.push({ text: event.data ?? undefined, sender: "bot" });
    //                 return newMessages;
    //             });
    //         });


    //         es.addEventListener("error", (event) => {
    //             console.error("❌ SSE error:", event);
    //         });
    //     };

    //     initSSE();

    //     return () => {
    //         if (es) {
    //             console.log("🔌 Closing SSE connection");
    //             es.close();
    //         }
    //     };
    // }, []);

    // 🔹 Setup SSE connection once
    // useEffect(() => {
    //     const initSSE = async () => {
    //         const token = await AsyncStorage.getItem("token");
    //         if (!token) {
    //             console.error("❌ No token found in storage");
    //             return;
    //         }

    //         const es = new EventSource("https://api.moneezify.com/api/moneezifyAgent/chat/stream", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 Accept: "text/event-stream",
    //             },
    //         });

    //         // 🔹 Job queued
    //         es.addEventListener("queued" as any, (event: any) => {
    //             console.log("📌 Job queued:", event.data);
    //         });

    //         // 🔹 Streaming token chunks
    //         es.addEventListener("token" as any, (event: any) => {
    //             try {
    //                 const parsed = JSON.parse(event.data);
    //                 console.log("🔹 Token chunk:", parsed);

    //                 setMessages((prev) => {
    //                     const newMessages = [...prev];

    //                     // If last is typing → replace with first token
    //                     if (newMessages.length && newMessages[newMessages.length - 1].typing) {
    //                         newMessages.pop();
    //                         newMessages.push({ text: parsed.token, sender: "bot" });
    //                         return newMessages;
    //                     }

    //                     // If last is bot → append token
    //                     if (newMessages.length && newMessages[newMessages.length - 1].sender === "bot") {
    //                         newMessages[newMessages.length - 1].text =
    //                             (newMessages[newMessages.length - 1].text ?? "") + parsed.token;
    //                         return [...newMessages];
    //                     }

    //                     // Otherwise → new bot message
    //                     newMessages.push({ text: parsed.token, sender: "bot" });
    //                     return newMessages;
    //                 });
    //             } catch (err) {
    //                 console.error("⚠️ Failed to parse token event:", err, event.data);
    //             }
    //         });

    //         // 🔹 Final answer (server assembled)
    //         es.addEventListener("final" as any, (event: any) => {
    //             try {
    //                 const parsed = JSON.parse(event.data);
    //                 console.log("✅ Final answer:", parsed.answer);

    //                 setMessages((prev) => {
    //                     const newMessages = [...prev];
    //                     // Replace last bot message with the final one
    //                     if (newMessages.length && newMessages[newMessages.length - 1].sender === "bot") {
    //                         newMessages[newMessages.length - 1].text = parsed.answer;
    //                         return [...newMessages];
    //                     }
    //                     // Or push if none exists
    //                     newMessages.push({ text: parsed.answer, sender: "bot" });
    //                     return newMessages;
    //                 });
    //             } catch (err) {
    //                 console.error("⚠️ Failed to parse final event:", err, event.data);
    //             }
    //         });

    //         // 🔹 Done marker
    //         es.addEventListener("done" as any, () => {
    //             console.log("🏁 Stream complete.");
    //         });

    //         // 🔹 Error handler
    //         es.addEventListener("error", (event: any) => {
    //             console.error("❌ SSE error:", event);
    //         });

    //         // Cleanup on unmount
    //         return () => {
    //             es.close();
    //         };
    //     };

    //     initSSE();
    // }, []);


    const handleInputChange = (value: string) => setInputValue(value);

    const handleButtonPress = (buttonName: string) => {
        setSelectedButton(buttonName);
        setInputValue(buttonName);
    };

    // auto-scroll chat
    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const buttonArray = [
        { name: "Extra payment impact" },
        { name: "APR explained" },
        { name: "Budgeting tips" },
        { name: "Total interest calculation" },
        { name: "Manage multiple debts" },
        { name: "Save more monthly" },
    ];

    // 🔹 Send message via HTTP (backend pushes reply via SSE)
    const chathandler = async () => {
        try {
            if (!inputValue.trim()) return;

            // show user message + bot typing
            setMessages((prev) => [
                ...prev,
                { text: inputValue, sender: "user" },
                { sender: "bot", typing: true },
            ]);

            const token = await AsyncStorage.getItem("token");
            if (!token) {
                console.error("❌ No token found in storage");
                return;
            }

            const qs = new URLSearchParams({
                message: inputValue,
            }).toString();

            // 2️⃣ Listen for stream response
            const es = new EventSource(
                `https://api.moneezify.com/api/moneezifyAgent/chat/stream?${qs}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "text/event-stream",
                    },
                } as any
            );

            es.addEventListener("queued" as any, (event: any) => {
                console.log("📌 Job queued:", event.data);
            });

            es.addEventListener("token" as any, (event: any) => {
                try {
                    const parsed = JSON.parse(event.data);

                    setMessages((prev) => {
                        const newMessages = [...prev];
                        if (newMessages.length && newMessages[newMessages.length - 1].typing) {
                            newMessages.pop();
                            newMessages.push({ text: parsed.token, sender: "bot" });
                            return newMessages;
                        }
                        if (newMessages.length && newMessages[newMessages.length - 1].sender === "bot") {
                            newMessages[newMessages.length - 1].text =
                                (newMessages[newMessages.length - 1].text ?? "") + parsed.token;
                            return [...newMessages];
                        }
                        newMessages.push({ text: parsed.token, sender: "bot" });
                        return newMessages;
                    });
                } catch (err) {
                    console.error("⚠️ Failed to parse token:", err, event.data);
                }
            });

            es.addEventListener("final" as any, (event: any) => {
                try {
                    const parsed = JSON.parse(event.data);
                    console.log("✅ Final answer:", parsed.answer);

                    setMessages((prev) => {
                        const newMessages = [...prev];
                        if (newMessages.length && newMessages[newMessages.length - 1].sender === "bot") {
                            newMessages[newMessages.length - 1].text = parsed.answer;
                            return [...newMessages];
                        }
                        newMessages.push({ text: parsed.answer, sender: "bot" });
                        return newMessages;
                    });
                } catch (err) {
                    console.error("⚠️ Failed to parse final event:", err, event.data);
                }
            });

            es.addEventListener("done" as any, () => {
                console.log("🏁 Stream complete.");
                es.close();
            });

            es.addEventListener("error", (event: any) => {
                console.error("❌ SSE error:", event);
                es.close();
            });
        } catch (error) {
            console.error("❌ Error sending message:", error);

            setMessages((prev) => {
                const newMessages = [...prev];
                if (newMessages.length && newMessages[newMessages.length - 1].typing) {
                    newMessages.pop();
                }
                newMessages.push({ text: "Failed to send message.", sender: "bot" });
                return newMessages;
            });
        }
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;
        chathandler();
        setInputValue("");
    };

    // 🔹 Typing dots animation
    const TypingDots = () => {
        const dot1 = useRef(new Animated.Value(0)).current;
        const dot2 = useRef(new Animated.Value(0)).current;
        const dot3 = useRef(new Animated.Value(0)).current;

        const bounce = (anim: Animated.Value, delay: number) =>
            Animated.loop(
                Animated.sequence([
                    Animated.timing(anim, {
                        toValue: -4,
                        duration: 200,
                        easing: Easing.linear,
                        useNativeDriver: true,
                        delay,
                    }),
                    Animated.timing(anim, {
                        toValue: 0,
                        duration: 200,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ])
            );

        useEffect(() => {
            bounce(dot1, 0).start();
            bounce(dot2, 100).start();
            bounce(dot3, 200).start();
        }, []);

        return (
            <View style={styles.typingContainer}>
                {[dot1, dot2, dot3].map((anim, idx) => (
                    <Animated.View
                        key={idx}
                        style={[styles.dot, { transform: [{ translateY: anim }] }]}
                    />
                ))}
            </View>
        );
    };

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
                    {messages.length > 0 ? (
                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View
                                    style={[
                                        styles.messageBubble,
                                        item.sender === "user"
                                            ? styles.userBubble
                                            : styles.botBubble,
                                    ]}
                                >
                                    {item.typing ? (
                                        <TypingDots />
                                    ) : (
                                        <Text style={styles.messageText}>{item.text}</Text>
                                    )}
                                </View>
                            )}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            showsVerticalScrollIndicator={false}
                            onContentSizeChange={() =>
                                flatListRef.current?.scrollToEnd({ animated: true })
                            }
                        />
                    ) : (
                        <View style={styles.section1}>
                            <View style={styles.logowrapper}>
                                <Image
                                    source={require("@images/pennieai/aiimage.png")}
                                    style={styles.image}
                                />
                            </View>
                            <Text style={styles.text1}>Pennie ai</Text>
                            <Text style={styles.text2}>
                                Our AI is here 24/7 to guide you — from tracking payments to
                                planning your financial future, one smart step at a time.
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    gap: 10,
                                    justifyContent: "center",
                                }}
                            >
                                {buttonArray.map((item, idx) => (
                                    <Button
                                        key={idx}
                                        style={styles.button}
                                        onPress={() => handleButtonPress(item.name)}
                                    >
                                        <Text style={styles.buttonText}>{item.name}</Text>
                                    </Button>
                                ))}
                            </View>
                        </View>
                    )}

                    <View>
                        <Input
                            value={inputValue}
                            onChangeContent={handleInputChange}
                            inputWrapperStyle={styles.inputwrapperStyle}
                            placeholder="Ask moneezify Ai"
                            placeholderTextColor={"#A4A4A5"}
                            children={
                                <Button onPress={handleSend}>
                                    <PaperAirplaneIcon color={"#00FFFF"} />
                                </Button>
                            }
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

export default Pennieaichat;

const styles = StyleSheet.create({
    gradient: { flex: 1 },
    container: {
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: 20,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === "android" ? heightToDP(7) : heightToDP(7),
    },
    inputwrapperStyle: {
        borderColor: "#00D9F5",
        borderWidth: 1,
        borderRadius: 24,
        backgroundColor: "rgba(20, 20, 20, 0.6)",
    },
    section1: {
        flexDirection: "column",
        gap: 24,
        alignItems: "center",
        marginBottom: 70,
    },
    logowrapper: {},
    image: { width: 100, height: 100 },
    text1: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 24,
        textAlign: "center",
    },
    text2: {
        color: "#A4A4A5",
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 12,
        textAlign: "center",
    },
    button: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 50,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 12,
        textAlign: "center",
    },
    messageBubble: {
        maxWidth: "80%",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 15,
        marginVertical: 5,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: "flex-start",
        justifyContent: "center",
    },
    userBubble: {
        backgroundColor: "#006FFF",
        alignSelf: "flex-end",
    },
    botBubble: {
        backgroundColor: "transparent",
        alignSelf: "flex-start",
    },
    messageText: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Regular",
    },
    typingContainer: { flexDirection: "row", alignItems: "flex-end", height: 20 },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#fff",
        marginHorizontal: 2,
    },
});
