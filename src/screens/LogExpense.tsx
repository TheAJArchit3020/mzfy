import React, { useState, useEffect } from "react";
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
import { Dispatch } from "@reduxjs/toolkit";
import { fetchExpenseCategories } from "@redux/expenseSlice/expenseSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { LogExpenseCategoryItem } from "src/commonTypes";
import { logExpense } from "@redux/expenseSlice/expenseSlice";
import CategoryManagement from "./catagoryManagement";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "@managers/routing";

type ExpensesScreenNavigationProp = StackNavigationProp<RootStackParams>;

const LogExpense = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<ExpensesScreenNavigationProp>();
  const catagories = useSelector(
    (state: RootState) => state.expenses.getCatogories
  );

  const [spentAmount, setSpentAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [categories, setCategories] = useState<LogExpenseCategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryID, setSelectedCategoryID] = useState<string | null>(
    null
  );
  const [note, setNote] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let result;
    if (catagories.length <= 0) {
      result = await dispatch(fetchExpenseCategories()).unwrap();
      setCategories(result || []);
    } else {
      result = catagories;
      setCategories(result || []);
    }
  };

  const handleLogExpense = async () => {
    const data = {
      amount: spentAmount,
      date: selectedDate,
      category: selectedCategoryID ?? "",
      description: note,
    };
    // Handle expense logging logic here
    console.log("Logging expense:", { data });
    const result = await dispatch(logExpense(data)).unwrap();
    if (result) {
      navigation.goBack();
    }
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
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Spent Amount Input */}
          <Input
            label="Spent amount"
            containerStyle={styles.inputContainer}
            value={spentAmount}
            style={styles.inputStyle}
            onChangeContent={setSpentAmount}
            type="number"
            iconAbove={<Text style={styles.currencySymbol}>₹</Text>}
            inputWrapperStyle={styles.inputWrapper}
          />

          {/* Date Input */}
          <Input
            label="Date"
            editable={false}
            containerStyle={styles.inputContainer}
            value={selectedDate}
            style={styles.inputStyle}
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
            onChange={(value) => {
              setSelectedCategory(value.name);
              setSelectedCategoryID(value._id);
            }}
            style={styles.dropdownStyle}
          />

          {/* Note Input */}
          <Input
            label="Add a note...."
            value={note}
            onChangeContent={setNote}
            style={styles.inputStyle}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            containerStyle={styles.inputContainer}
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
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    gap: hp(2),
  },
  inputContainer: {
    marginBottom: hp(0),
  },
  inputStyle: {
    fontFamily: "PlusJakartaSans-Medium",
    color: "#F7F7F7",
    fontSize: wp(4.5),
  },
  scrollView: {
    flex: 1,
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
    marginTop: hp(25),
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
