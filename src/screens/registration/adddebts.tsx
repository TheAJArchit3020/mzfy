import React, { useState } from "react";
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

const AddDebts = () => {
  const [debts, setDebts] = useState<any[]>([]);

  const handleAddDebt = () => {
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
            <Image source={require("@images/reg/addIcon.png")} style={styles.plusImage} />
        </TouchableOpacity>
      </View>
      <Text style={styles.instruction}>
        <Text style={{ fontFamily: "PlusJakartaSans-Bold" }}>Click </Text>
        <Text style={styles.plusInline}>+</Text> to add all your debt details.
      </Text>

      {debts.length > 0 && (
        <View style={styles.debtsContainer}>
          <FlatList
            data={debts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.cardcontainer}>
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
    flex: 1,
    backgroundColor: "#1E2D5E",
    alignItems: "center",
    marginTop: hp(3),
  },
  buttonContainer: {
    marginTop: hp(5),
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
  plusImage:{
    width: '100%',
    height: '100%',
  },
  plusSign: {
    color: "#FFFFFF",
    fontSize: wp(8),
    fontFamily: "PlusJakartaSans-Bold",
  },
  instruction: {
    marginTop: hp(1.5),
    color: "#FFFFFF",
    fontSize: wp(4),
    textAlign: "center",
    fontFamily: "PlusJakartaSans-Regular",
  },
  plusInline: {
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Bold",
    color: "#FFFFFF",
  },
  debtsContainer: {
    width: "100%",
    marginTop: hp(5),
  },
  cardcontainer: {
    marginVertical: hp(2),
  },
});

export default AddDebts;
