import React, { FC, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import Payoffcard from "@components/payoffplan/payoffcard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "@managers/routing";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

const AddDebts: FC = () => {

  type navprops = NativeStackNavigationProp<RootStackParams>;

  const debtArray = useSelector((s: RootState) => s.user.current.debts) ?? [];

  const navigation = useNavigation<navprops>()
  const [debts, setDebts] = useState<any[]>([]);


  console.log("debtArray : ", debtArray)

  const handleAddDebt = () => {

    navigation.navigate('adddebtscreen')

    const newDebt = {
      name: "Credit Card",
      time: "Pay in 12 months",
      minamt: "5000",
      apr: "14%",
      payoffprogress: 0,
    };
    setDebts((prevDebts) => [...prevDebts, newDebt]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddDebt}>
          <Image
            source={require("@images/registration/add.png")}
            style={styles.plusImage}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          marginVertical: hp(2),
        }}
      >
        <Text
          style={[styles.instruction, { fontFamily: "PlusJakartaSans-Bold" }]}
        >
          Click{" "}
        </Text>
        <View
          style={{
            width: wp(9),
            height: hp(5),
            paddingHorizontal: wp(1),
            paddingTop: hp(1),
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: wp(1),
          }}
        >
          <Image
            source={require("@images/registration/add.png")}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </View>
        <Text
          style={[styles.instruction, { fontFamily: "PlusJakartaSans-Bold" }]}
        >
          to add all your debt details.
        </Text>
      </View>

      {debtArray?.length > 0 && (
        <View style={styles.debtsContainer}>
          <FlatList
            data={debtArray}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <View style={index > 0 && { marginTop: hp(2) }}>
                  <Payoffcard data={[item]} />
                </View>
              );
            }}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "69%",
    alignItems: "center",
  },
  buttonContainer: {
    width: wp(90),
    borderRadius: wp(5),
    paddingVertical: hp(5),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#C0C0C0",
  },
  addButton: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    borderWidth: 1,
    borderColor: "#5E5E5E",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  plusImage: {
    width: "100%",
    height: "100%",
  },
  plusSign: {
    color: "#FFFFFF",
    fontSize: wp(8),
    fontFamily: "PlusJakartaSans-Bold",
  },
  instruction: {
    marginTop: hp(1.5),
    color: "#FFFFFF",
    fontSize: wp(4.5),
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "PlusJakartaSans-Regular",
  },
  plusInline: {
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Bold",
    color: "#FFFFFF",
  },
  debtsContainer: {
    width: "100%",
    paddingHorizontal: wp(2.5),
  },
});

export default AddDebts;
