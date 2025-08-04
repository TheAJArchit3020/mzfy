import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import Header from "@components/reusable/header";
import Input from "@components/reusable/Input";
import CustomDropdown from "@components/reusable/CustomDropdown";
import { CalendarDaysIcon } from "react-native-heroicons/solid";
import LinearGradient from "react-native-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "@components/reusable/button";
const LogExpense = () => {
  const [spentAmount, setSpentAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sample categories for the dropdown
  const categories = [
    { label: "Food", value: "food" },
    { label: "Miscellaneous", value: "miscellaneous" },
    { label: "Health", value: "health" },
    { label: "Investment", value: "investment" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Transportation", value: "transport" },
    { label: "Shopping", value: "shopping" },
    { label: "Education", value: "education" },
    { label: "Utilities", value: "utilities" },
    { label: "Rent", value: "rent" },
    { label: "Insurance", value: "insurance" },
    { label: "Other", value: "other" },
  ];

  const handleLogExpense = () => {
    // Handle expense logging logic here
    console.log("Logging expense:", {
      amount: spentAmount,
      date: selectedDate,
      category: selectedCategory,
      note: note,
    });
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setCurrentDate(date);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      setSelectedDate(formattedDate);
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <LinearGradient
      colors={["#463C9F", "#3A346E", "#23234B", "#2B293E", "#272631"]}
      locations={[0, 0.64, 0.76, 0.87, 1]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Header title="Log expense" />
      <View style={styles.container}>
        {/* Spent Amount Input */}
        <Input
          label="Spent amount"
          value={spentAmount}
          onChangeContent={setSpentAmount}
          type="number"
          iconAbove={<Text style={styles.currencySymbol}>₹</Text>}
          inputWrapperStyle={styles.inputWrapper}
        />

        {/* Date Input */}
        <Input
          label="Date"
          editable={false}
          value={selectedDate}
          onChangeContent={setSelectedDate}
          placeholder="Select date"
          inputWrapperStyle={styles.inputWrapper}
        >
          <Button onPress={openDatePicker}>
            <CalendarDaysIcon size={hp(3)} color="#e5e5f7" />
          </Button>
        </Input>

        {showDatePicker && (
          <DateTimePicker
            value={currentDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}

        {/* Category Dropdown */}
        <CustomDropdown
          label="Category"
          options={categories}
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value as string)}
          style={styles.dropdownStyle}
        />

        {/* Note Input */}
        <Input
          label="Add a note...."
          value={note}
          onChangeContent={setNote}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          inputWrapperStyle={[styles.inputWrapper, styles.noteInputWrapper]}
        />
      </View>
      {/* Log Expense Button */}
      <TouchableOpacity
        style={styles.logButton}
        onPress={handleLogExpense}
        activeOpacity={0.8}
      >
        <Text style={styles.logButtonText}>Log expense</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(5),
  },
  inputWrapper: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noteInputWrapper: {
    minHeight: hp(12),
    alignItems: "flex-start",
  },
  dropdownStyle: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
  },
  currencySymbol: {
    color: "#fff",
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Regular",
    marginRight: wp(2),
  },
  logButton: {
    backgroundColor: "#006FFF",
    borderRadius: wp(8),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(4),
    marginBottom: hp(5),
    alignSelf: "center",
    width: "90%",
  },
  logButtonText: {
    color: "#fff",
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Bold",
  },
});

export default LogExpense;
