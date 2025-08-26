import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import Input from "@components/reusable/Input";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "@redux/user/userSlice";
import { RootState } from "@redux/store";

const IncomeDetails: FC = () => {

  const dispatch = useDispatch()
  const income = useSelector((state: RootState) => state.user.current.personalIncome)
  const totalincome = useSelector((state: RootState) => state.user.current.totalHouseholdIncome)
  const currency = useSelector((state: RootState) => state.user.current.currency)

  const [selectedOption, setSelectedOption] = useState<string>("");

  const OPTIONS = ["Yes", "No"];

  const [touched, setTouched] = useState(false);
  const empty = income == null || income === 0;


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Input
          value={income}
          onChangeContent={(val: any) => {
            if (!touched) setTouched(true);
            dispatch(setField({ field: 'personalIncome', value: val }))
          }}
          placeholder={`Eg. ${currency} 30,000`}
          placeholderTextColor={'#C6C6C6'}
          label="Personal income"
          type="number"
          style={styles.input}
          containerStyle={styles.inputContainer}
        />
        {touched && empty && <Text style={styles.error}>This field is required.</Text>}

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
            value={totalincome}
            onChangeContent={(val: any) =>
              dispatch(
                setField({ field: "totalHouseholdIncome", value: val ?? 0 })
              )
            }
            placeholder="Eg. ₹ 30,000"
            placeholderTextColor={"#C6C6C6"}
            label="Total income"
            type="number"
            containerStyle={styles.inputContainer}
            style={styles.input}
          />
        )}
      </View>
    </ScrollView>
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
    fontSize: wp(3.5),
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
  error: {
    color: "#FF6B6B",
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Bold"
  },

});

export default IncomeDetails;
