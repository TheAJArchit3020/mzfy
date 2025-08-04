import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import Input from "@components/reusable/Input";

const IncomeDetails = () => {
  const [personalIncome, setPersonalIncome] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const OPTIONS = ["Yes", "No"];

  return (
    <View style={styles.container}>
      <Input
        value={personalIncome}
        onChangeContent={setPersonalIncome}
        placeholder="Eg. ₹ 30,000"
        label="Personal income"
        type="number"
      />

      <Text style={styles.questionText}>
        Do you want to consider only your personal income?
      </Text>

      <View style={styles.optionsContainer}>
        {OPTIONS.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.optionWrapper}
            activeOpacity={0.8}
            onPress={() => setSelectedOption(option)}
          >
            <View
              style={[
                styles.radioCircle,
                selectedOption === option && styles.selectedBorder,
              ]}
            >
              {selectedOption === option && <View style={styles.innerDot} />}
            </View>
            <Text style={styles.optionLabel}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    marginTop: hp(10),
  },
  questionText: {
    color: "#FFFFFF",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  optionsContainer: {
    flexDirection: "row",
    gap: wp(5),
    marginTop: hp(1),
  },
  optionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2),
  },
  radioCircle: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: "#5E5E5E",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedBorder: {
    borderColor: "#3B82F6",
  },
  innerDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: "#3B82F6",
  },
  optionLabel: {
    color: "#FFFFFF",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Regular",
  },
});

export default IncomeDetails;
