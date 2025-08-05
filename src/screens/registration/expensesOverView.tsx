import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";

const ExpensesOverView = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
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
});

export default ExpensesOverView;
