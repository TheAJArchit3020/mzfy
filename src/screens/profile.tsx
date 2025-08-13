import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC, useCallback } from 'react'
import Header from '@components/reusable/header';
import LinearGradient from 'react-native-linear-gradient';
import Button from '@components/reusable/button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '@managers/routing';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import { fetchUser } from '@redux/user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


type navProps = NativeStackNavigationProp<RootStackParams>

const Profile: FC = () => {

    const navigation = useNavigation<navProps>();
    const dispatch = useDispatch<AppDispatch>();


    // ⏰ Get current hour
    const hour = new Date().getHours();

    // 📌 Determine greeting
    const getGreeting = () => {
        if (hour >= 5 && hour < 12) {
            return "Good Morning";
        } else if (hour >= 12 && hour < 17) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    };

    useFocusEffect(
        useCallback(() => {
            // Fetch user details when the screen is focused
            getUserDetails();
        }, [])
    );

    const getUserDetails = async () => {
        try {
            await dispatch(fetchUser()).unwrap()
        } catch (err: any) {
            console.log("Error adding user:", err);
        }

    }

    const USERARRAY = useSelector((state: RootState) => state.user.items[0]) ?? [];




    const LogoutHandler = async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('splashscreen');

    }



    return (

        <LinearGradient
            colors={['#5145BC', '#2F2C4A', '#2B293E', '#272631', '#232323']}
            locations={[0, 0.64, 0.76, 0.87, 1]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}>
            <View style={styles.container}>
                <Header title='Profile' />

                <View style={styles.profilecontainer}>

                    <View style={styles.section1}>
                        <View>
                            <Text style={styles.section1_1_text}>
                                Hey <Text style={styles.section1_1_span}>{USERARRAY?.name} ,</Text>
                            </Text>
                            <Text style={styles.section1_1_text}>{getGreeting()}</Text>
                        </View>
                        <View style={styles.section1_2}>
                            <Text style={styles.section1_2_text}>{USERARRAY?.name?.charAt(0).toUpperCase()}</Text>
                        </View>
                    </View>

                    <View style={styles.section2}>
                        <View style={styles.section2_content}>
                            <Text style={styles.label} >Sign in method</Text>
                            <View style={styles.section2_content_item}>
                                <Text style={styles.section2_content_item_title}>Email</Text>
                                <Text style={styles.section2_content_item_value}>{USERARRAY?.email}</Text>
                            </View>
                        </View>

                        {/* <View style={styles.section2_content}>
                            <Text style={styles.label} >Plan</Text>
                            <View style={styles.section2_content_item}>
                                <Text style={styles.section2_content_item_title}>Moneezify plan</Text>
                                <Image source={require('@images/registration/crown.png')} style={styles.image} />
                            </View>
                        </View> */}

                        <View style={styles.section2_content}>
                            <Text style={styles.label} >Plan</Text>
                            <View style={styles.section2_content_item}>
                                <Text style={styles.section2_content_item_title}>{USERARRAY?.currentStrategy}</Text>
                                {USERARRAY?.currentStrategy === 'moneezify' && <Image source={require('@images/registration/crown.png')} style={styles.image} />}
                            </View>
                        </View>
                        {USERARRAY?.currentStrategy !== 'moneezify' && (
                            <View>
                                <LinearGradient
                                    colors={['#00C853', '#B2FF59']}
                                    locations={[0, 1]}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.gradientbutton}
                                >
                                    <Button style={styles.upgradebutton}>
                                        <Text style={styles.upgradetext}>Upgrade to Moneezify plan</Text>
                                    </Button>

                                </LinearGradient>
                            </View>
                        )}

                    </View>

                    <View style={styles.buttonsection}>
                        <Button style={styles.logoutbutton} onPress={LogoutHandler}>
                            <Image source={require('@images/profile/logout.png')} style={styles.buttonimage} />
                            <Text style={styles.buttontext}>Log out</Text>
                        </Button>
                        <Button style={styles.deletebutton}>
                            <Image source={require('@images/profile/bin.png')} style={styles.buttonimage} />
                            <Text style={styles.buttontext}>Delete account</Text>
                        </Button>
                    </View>
                </View>
            </View >
        </LinearGradient >
    )
}

export default Profile

const styles = StyleSheet.create({
    gradient: {
        flex: 1
    },
    container: {
        flex: 1,
    },
    profilecontainer: {
        flexDirection: "column",
        gap: 30,
        flex: 1

    },
    section1: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    section1_1_text: {
        fontFamily: "PlusJakartaSans-Italic",
        fontSize: 13,
        color: "#fff",
    },
    section1_1_span: {
        fontFamily: "PlusJakartaSans-Italic",
        fontSize: 13,
        color: "#EFCB3A",
    },
    section1_2_text: {
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 14,
        color: "#000",
    },
    section1_2: {
        backgroundColor: "#D9D9D9",
        borderRadius: 100,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    section2: {
        flexDirection: "column",
        gap: 30,
        marginHorizontal: 20
    },
    section2_content: {
        flexDirection: "column",
        gap: 16,

    },
    label: {
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 14,
        color: "#fff",
    },
    section2_content_item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: "#F7F7F7",
        borderWidth: 0.5,
        borderRadius: 12,
        padding: 16,
    },
    section2_content_item_title: {
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 14,
        color: "#fff",
        textTransform: "capitalize"
    },
    section2_content_item_value: {
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 14,
        color: "#F7F7F7",
    },
    image: {
        width: 24,
        height: 24
    },
    buttonsection: {
        flexDirection: "column",
        gap: 20,
        marginHorizontal: 20,
        paddingVertical: 30,
        flex: 1,
        justifyContent: "flex-end"
    },
    logoutbutton: {
        backgroundColor: "#006FFF",
        borderRadius: 44,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8
    },
    deletebutton: {
        backgroundColor: "#DC143C",
        borderRadius: 44,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8
    },
    buttonimage: {
        width: 16,
        height: 16,
        resizeMode: "contain"
    },
    buttontext: {
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 14,
        color: "#fff",
    },
    gradientbutton: {
        borderRadius: 44
    },
    upgradetext: {
        textAlign: "center",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 16,
        color: "#2A2A2A"
    },
    upgradebutton: {
        padding: 12
    }


})