import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
  widthToDP,
  heightToDP,
} from "react-native-responsive-screens";
import LinearGradient from "react-native-linear-gradient";
import Header from "@components/reusable/header";
import Button from "@components/reusable/button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "@managers/routing";
import { useNavigation } from "@react-navigation/native";

type navProps = NativeStackNavigationProp<RootStackParams>

const ExpensesOverView: FC = () => {

  const navigation = useNavigation<navProps>();


  return (
    <LinearGradient
      colors={["#5145BC", "#2F2C4A", "#2B293E", "#272631", "#232323"]}
      locations={[0, 0.64, 0.76, 0.87, 1]}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >

      <Header />

      <View style={styles.container}>
        <LottieView
          source={require("../../assets/LottieJson/loading/MoneyAnim.json")}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
        <Text style={styles.Text}>
          Your monthly balance shows ₹.50,000/- in surplus — this gives you room
          to build savings or reduce debt quicker.
        </Text>
      </View>

     
      <Button style={styles.button} onPress={() => navigation.navigate('registrationlayoutscreen', {
        index: 6
      })}>
        <Text style={styles.buttonText}>Next</Text>
      </Button>


    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(1),
  },
  lottieAnimation: {
    width: "100%",
    height: hp(30),
  },
  Text: {
    fontSize: wp(4.5), // ~16px
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "PlusJakartaSans-Bold",
  },
  buttonText: {
    color: "#F7F7F7",
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#006FFF",
    paddingHorizontal: 20,
    width: "90%",
    alignSelf: "center",
    borderRadius: widthToDP(50),
    padding: widthToDP(4),
    marginBottom: heightToDP(3),
  },
});

export default ExpensesOverView;
