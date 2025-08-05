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
  const [TotalIncome, setTotalIncome] = useState<string>("");
  const OPTIONS = ["Yes", "No"];

  return (
    <View style={styles.container}>
      <Input
        value={personalIncome}
        onChangeContent={setPersonalIncome}
        placeholder="Eg. ₹ 30,000"
        label="Personal income"
        type="number"
        style={styles.input}
        containerStyle={styles.inputContainer}
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

      {selectedOption === "No" && (
        <Input
          value={TotalIncome}
          onChangeContent={setTotalIncome}
          placeholder="Eg. ₹ 30,000"
          label="Total income"
          type="number"
          containerStyle={styles.inputContainer}
          style={styles.input}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
  },
  inputContainer: {
    marginBottom: 0,
  },
  input: {
    fontFamily: "PlusJakartaSans-Bold",
  },
  inputWrapperStyle: {
    paddingVertical: hp(1),
  },
  questionText: {
    color: "#FFFFFF",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
    marginBottom: hp(0.5),
    marginTop: hp(2),
  },
  optionsContainer: {
    flexDirection: "row",
    gap: wp(5),
    marginTop: hp(1),
    marginBottom: hp(2),
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
    borderColor: "#fff",
  },
  innerDot: {
    width: "70%",
    height: "70%",
    borderRadius: wp(5),
    backgroundColor: "#3B82F6",
  },
  optionLabel: {
    color: "#FFFFFF",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Regular",
  },
});

export default IncomeDetails;
