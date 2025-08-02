import React, { FC } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Button from "./Button";
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
      <Button onPress={backHandler}>
        <View style={styles.backButton}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../../assets/images/backButton/arrow.png")}
          />
        </View>
      </Button>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(12),
    flexDirection: "row",
    gap: wp(4),
    alignItems: "center",
    paddingLeft: wp(5),
    paddingTop: wp(10),
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
    marginBottom: wp(1.5),
  },
});

export default Header;
