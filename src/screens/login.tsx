import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Header from '@components/reusable/header'
import Button from '@components/reusable/button'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '@managers/routing'
import { useNavigation } from '@react-navigation/native'


type navProps = NativeStackNavigationProp<RootStackParams>

const Login: FC = () => {

    const navigation = useNavigation<navProps>();

    const navigationHandler = () => {
        navigation.navigate('registrationlayoutscreen', {
            index: 0
        })
    }

    return (

        <LinearGradient
            colors={['#5145BC', '#2F2C4A', '#2B293E', '#272631', '#232323']}
            locations={[0, 0.64, 0.76, 0.87, 1]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}>


            <View style={styles.container}>
                <View style={styles.section1} >
                    <View style={styles.imagecontainer}>
                        {/* <Image source={require('@images/dashboard/fireprogress.png')} style={styles.logoimage} /> */}

                    </View>
                    <Text style={styles.section1_text}>Moneezify</Text>
                </View>
                <View style={styles.section2} >
                    <Button style={styles.button} onPress={navigationHandler} >
                        <Image source={require('@images/login/google.png')} style={styles.loginimage} />
                        <Text style={styles.buttontext} >Signup with google</Text>
                    </Button>

                    <Text style={styles.buttontext}>Or</Text>

                    <Button style={styles.button} onPress={navigationHandler}>
                        <Image source={require('@images/login/apple.png')} style={styles.loginimage} />
                        <Text style={styles.buttontext}>Signup with apple</Text>
                    </Button>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Login

const styles = StyleSheet.create({
    gradient: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: '35%'
    },
    section1: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    imagecontainer: {
        backgroundColor: "#D9D9D9",
        borderRadius: 100,
        padding: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // flexDirection: "row",
        width: 25,
        height: 25,
    },
    logoimage: {
        width: 30,
        height: 30,
        resizeMode: "contain"
    },
    section1_text: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 20,
        marginTop: -5
    },
    section2: {
        flexDirection: "column",
        gap: 32,
        alignItems: "center",
        // backgroundColor:"#fff",
        width: '100%'
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        borderWidth: 0.5,
        borderColor: "#C0C0C0",
        padding: 10,
        borderRadius: 12,
        width: '80%'
    },
    buttontext: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 16,
        marginTop: -5
    },
    loginimage: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    }
})