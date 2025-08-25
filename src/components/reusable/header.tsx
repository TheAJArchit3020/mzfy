import React, { FC } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform } from "react-native";
import Button from "./button";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "@managers/routing";
import { useNavigation } from "@react-navigation/native";


interface headerProps {
  title?: string;
  showBackButton?: boolean;
}
type navProp = NativeStackNavigationProp<RootStackParams>;

const Header: FC<headerProps> = ({ title, showBackButton = true }) => {
  const navigation = useNavigation();
  const backHandler = (): void => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {showBackButton && <TouchableOpacity onPress={backHandler}>
        <Image
          style={{ width: 40, height: 40 }}
          source={require("../../assets/images/backButton/arrow.png")}
        />
      </TouchableOpacity>}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(4),
    paddingLeft: wp(5),
    paddingTop: Platform.OS === "android" ? wp(5) : wp(8),
    paddingBottom: wp(2),
  },
  backButton: {
    width: wp(7.5),
    height: hp(4),
    borderRadius: wp(6.5),
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "PlusJakartaSans-Bold",
    color: "#fff",
    fontSize: wp(5),
    marginTop: Platform.OS === 'android' ? -5 : 0
  },
});

export default Header;
