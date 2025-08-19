import React, { FC, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing, Image } from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "@managers/routing";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUser } from "@redux/user/userSlice";

type navProps = NativeStackNavigationProp<RootStackParams>

const Splash: FC = () => {

  const dispatch = useDispatch<AppDispatch>();


  const navigation = useNavigation<navProps>();
  const containerAnim = useRef(new Animated.Value(-hp(50))).current;
  const circleAnim = useRef(new Animated.Value(hp(100))).current;
  const textAnim = useRef(new Animated.Value(hp(100))).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;


  const GetToken = async () => {

    const token = await AsyncStorage.getItem('token');

    if (token) {
      await dispatch(fetchUser());
      navigation.navigate('layoutscreen')
    } else {
      navigation.navigate('introscreen')
    }
  }


  useEffect(() => {
    // Start animations
    const startAnimations = () => {
      // Container slides from top
      Animated.timing(containerAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease), // Ease-Out
      }).start();

      // Circle and text come from bottom
      Animated.parallel([
        Animated.timing(circleAnim, {
          toValue: hp(8),
          duration: 600,
          delay: 200,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease), // Ease-Out
        }),
        Animated.timing(textAnim, {
          toValue: hp(6.5),
          duration: 600,
          delay: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease), // Ease-Out
        }),
      ]).start();
    };

    // After 2 seconds, start exit animations
    const exitAnimations = () => {
      setTimeout(() => {
        // Container slides up
        Animated.timing(containerAnim, {
          toValue: -hp(50),
          duration: 600,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }).start();

        Animated.parallel([
          Animated.timing(circleAnim, {
            toValue: hp(100),
            duration: 600,
            useNativeDriver: true,
            easing: Easing.in(Easing.ease),
          }),
          Animated.timing(textAnim, {
            toValue: hp(100),
            duration: 600,
            useNativeDriver: true,
            easing: Easing.in(Easing.ease),
          }),
        ]).start();


        GetToken();
      }, 1500);

    };

    startAnimations();
    exitAnimations();
  }, []);

  return (
    <LinearGradient
      colors={["#2F2C4A", "#23234B", "#2B293E", "#272631"]}
      locations={[0, 0.76, 0.87, 1]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Animated.View
        style={[
          Styles.contianer,
          {
            transform: [{ translateY: containerAnim }],
          },
        ]}
      />

      <Animated.View
        style={[
          Styles.circleContainer,
          {
            transform: [{ translateY: circleAnim }],
          },
        ]}
      >
        <View style={Styles.circle} >
          <Image source={require("@images/AppIntro/moneezifylogo.png")} style={Styles.logoImage} />
        </View>
      </Animated.View>

      <Animated.Text
        style={[
          Styles.text,
          {
            transform: [{ translateY: textAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        Moneezify
      </Animated.Text>
    </LinearGradient>
  );
};

const Styles = StyleSheet.create({
  contianer: {
    height: hp(50),
    backgroundColor: "#2A2A2A",
    borderBottomLeftRadius: wp(15),
    borderBottomRightRadius: wp(15),
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#C0C0C0",
  },
  circleContainer: {
    position: "absolute",
    top: hp(35),
    left: wp(50) - wp(15),
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    position: "absolute",
    top: hp(50),
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: wp(6),
    color: "#FFFFFF",
    fontFamily: "PlusJakartaSans-Bold",
  },
  logoImage: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(15),
    resizeMode: "contain",
  }
});

export default Splash;
