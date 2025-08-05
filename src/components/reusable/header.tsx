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
  title: string;
}
type navProp = NativeStackNavigationProp<RootStackParams>;

const Header: FC<headerProps> = ({ title }) => {
  const navigation = useNavigation();
  const backHandler = (): void => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={backHandler}>
        <Image
          style={{ width: 40, height: 40 }}
          source={require("../../assets/images/backButton/arrow.png")}
        />
      </TouchableOpacity>
      {/* <Button onPress={backHandler}>
        <View style={styles.backButton}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../../assets/images/backButton/arrow.png")}
          />
        </View>
      </Button> */}
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
    paddingTop: wp(12),
    paddingBottom: wp(2),
  },
  backButton: {
    width: wp(10),
    height: hp(5),
    borderRadius: wp(6.5),
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "PlusJakartaSans-Bold",
    color: "#fff",
    fontSize: wp(5),
    marginTop:Platform.OS ==='android' ? -5 : 0
  },
});

export default Header;
