import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "./Button";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
interface headerProps {
  title: string;
}

const backHandler = (): void => {};
const Header: FC<headerProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Button onPress={backHandler}>
        <View style={styles.backButton}>
          <ArrowLeftIcon size={wp(5)} color={"#5145BC"} />
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
    width: wp(9),
    height: hp(4),
    backgroundColor: "#fff",
    borderRadius: wp(6.5),
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "PlusJakartaSans-Bold",
    color: "#fff",
    fontSize: wp(5),
  },
});

export default Header;
