import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";



interface ExpensesProps { }

const Expenses: FC<ExpensesProps> = ({ }) => {


  return (
    <LinearGradient
      colors={["#463C9F", "#3A346E", "#23234B", "#2B293E", "#272631"]}
      locations={[0, 0.64, 0.76, 0.87, 1]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Comming Soon !</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Bold",
    fontWeight: "600",
    marginBottom: hp(2),
  },

});

export default Expenses;
