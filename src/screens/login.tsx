import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Button from '@components/reusable/button'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '@managers/routing'
import { useNavigation } from '@react-navigation/native'
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { AppleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';

import { appleAuth } from '@invertase/react-native-apple-authentication';
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@redux/store'
import { checkUser } from '@redux/login/loginSlice'
import { unwrapResult } from '@reduxjs/toolkit'

type navProps = NativeStackNavigationProp<RootStackParams>

const Login: FC = () => {

    const navigation = useNavigation<navProps>();
    const dispatch = useDispatch<AppDispatch>();

    const { loading, error } = useSelector((state: RootState) => state.loginuser)

    const navigationHandler = () => {
        handleGoogleSignIn();
        // navigation.navigate('registrationlayoutscreen', {
        //     index: 0
        // })
    }


    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                '300899465301-sedenisladme72hus6n9stvvg2ofkpl1.apps.googleusercontent.com',
            iosClientId:
                '300899465301-q4gh41im4l4r8irbn2gr0pumnk0g78jq.apps.googleusercontent.com',
            offlineAccess: true,
        });
    }, []);


    // google sign in
    const handleGoogleSignIn = async () => {
        console.log('handleGoogleSignIn clicked !!');
        try {
            await GoogleSignin.signOut();
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            console.log("userInfo : ", userInfo)

            const payload = {
                idToken: userInfo?.data?.idToken,
                // email: userInfo?.data?.user?.email,
                // googleId: userInfo?.data?.user?.id,
            };

            // dispatch the thunk:
            const resultAction = await dispatch(checkUser(payload));
            const user = unwrapResult(resultAction);

            // on success navigate:
            console.log('API returned:', user)

            console.log("handleGoogleSignIn data : ", payload)
        } catch (err: any) {
            if (err?.status === 401) {
                navigation.navigate('registrationlayoutscreen', {
                    index: 0
                })
            }
        }


    };

    // google sign in
    const handleAppleSignIn = async () => {
        console.log('handleGoogleSignIn clicked !!');
        try {
            // Start the sign-in request
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,

                requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
            });

            // Ensure Apple returned a user identityToken
            if (!appleAuthRequestResponse.identityToken) {
                throw new Error('Apple Sign-In failed - no identify token returned');
            }
            console.log('appleAuthRequestResponse', appleAuthRequestResponse);

            // Create a Firebase credential from the response
            const { identityToken, nonce } = appleAuthRequestResponse;
            const appleCredential = AppleAuthProvider.credential(identityToken, nonce);

            console.log('appleCredential', appleCredential);

        } catch (err) {
            console.log(err)
        }


    };

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

                    {
                        Platform.OS === "ios" && (
                            <>
                                <Text style={styles.buttontext}>Or</Text>

                                <Button style={styles.button} onPress={handleAppleSignIn}>
                                    <Image source={require('@images/login/apple.png')} style={styles.loginimage} />
                                    <Text style={styles.buttontext}>Signup with apple</Text>
                                </Button>
                            </>
                        )

                    }
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
        marginTop: Platform.OS === 'android' ? -5 : 0
    },
    section2: {
        flexDirection: "column",
        gap: 32,
        alignItems: "center",
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
        marginTop: Platform.OS === 'android' ? -5 : 0
    },
    loginimage: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    }
})