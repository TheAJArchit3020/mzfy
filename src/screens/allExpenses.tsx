import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import Header from "@components/reusable/header";
import CustomDropdown, {
  CustomScrollIndicator,
} from "@components/reusable/CustomDropdown";
import ExpenseByDateList from "@components/Expenses/ExpenseByDateList";
import Button from "@components/reusable/button";
import Popup from "@components/reusable/popup";
import Input from "@components/reusable/Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ArrowPathIcon, CalendarDaysIcon } from "react-native-heroicons/solid";
import { expenseItem } from "src/commonTypes";

// Sample data formatted to match expenseItem type
const expenseData: expenseItem[] = [
  {
    date: "31 Thu",
    transactions: [
      {
        id: "1",
        category: "Food",
        item: "Biriyani",
        amount: 350,
        date: "31 Thu",
      },
      {
        id: "2",
        category: "Health",
        item: "Tablet",
        amount: 200,
        date: "31 Thu",
      },
    ],
  },
  {
    date: "30 Wed",
    transactions: [
      {
        id: "3",
        category: "Food",
        item: "Biriyani",
        amount: 350,
        date: "30 Wed",
      },
      {
        id: "4",
        category: "Entertainment",
        item: "Movie",
        amount: 200,
        date: "30 Wed",
      },
    ],
  },
  {
    date: "29 Wed",
    transactions: [
      {
        id: "5",
        category: "Food",
        item: "Biriyani",
        amount: 350,
        date: "29 Wed",
      },
      {
        id: "6",
        category: "Entertainment",
        item: "Movie",
        amount: 200,
        date: "29 Wed",
      },
    ],
  },
  {
    date: "28 Wed",
    transactions: [
      {
        id: "7",
        category: "Food",
        item: "Biriyani",
        amount: 350,
        date: "28 Wed",
      },
      {
        id: "8",
        category: "Entertainment",
        item: "Movie",
        amount: 200,
        date: "28 Wed",
      },
    ],
  },
];

const dropdownOptions = [
  { label: "Current Month", value: "current" },
  { label: "Last Month", value: "last" },
  { label: "Select date range", value: "range" },
  { label: "Select Category", value: "category" },
];

const categoryOptions = [
  { label: "Entertainment", value: "entertainment", color: "#3A7BFF" },
  { label: "Shopping", value: "shopping", color: "#4CAF50" },
  { label: "Food", value: "food", color: "#FFA500" },
  { label: "Health", value: "health", color: "#4CAF50" },
  { label: "Investment", value: "investment", color: "#4CAF50" },
  { label: "Miscellaneous", value: "miscellaneous", color: "#4CAF50" },
  { label: "Transportation", value: "transport", color: "#4CAF50" },
  { label: "Education", value: "education", color: "#4CAF50" },
  { label: "Utilities", value: "utilities", color: "#4CAF50" },
  { label: "Rent", value: "rent", color: "#4CAF50" },
  { label: "Insurance", value: "insurance", color: "#4CAF50" },
  { label: "Other", value: "other", color: "#4CAF50" },
];

const AllExpenses = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | number | null>(
    null
  );
  const [showDateRangePopup, setShowDateRangePopup] = useState(false);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [categoryScrollOffset, setCategoryScrollOffset] = useState(0);
  const [categoryContentHeight, setCategoryContentHeight] = useState(0);
  const [categoryContainerHeight, setCategoryContainerHeight] = useState(0);

  const handleFilterChange = (value: string | number | null) => {
    setSelectedFilter(value);

    if (value === "range") {
      setShowDateRangePopup(true);
    } else if (value === "category") {
      setShowCategoryPopup(true);
    }
  };

  const handleResetFilter = () => {
    setSelectedFilter("current");
    setStartDate("");
    setEndDate("");
    setSelectedCategory(null);
  };

  const handleDateChange = (
    event: any,
    date?: Date,
    isStartDate: boolean = true
  ) => {
    if (Platform.OS === "android") {
      if (isStartDate) {
        setShowStartDatePicker(false);
      } else {
        setShowEndDatePicker(false);
      }
    }

    if (date) {
      const formattedDate = date.toLocaleDateString("en-GB"); // DD/MM/YYYY format
      if (isStartDate) {
        setStartDate(formattedDate);
        setCurrentDate(date);
      } else {
        setEndDate(formattedDate);
        setCurrentDate(date);
      }
    }
  };

  const handleDateRangeConfirm = () => {
    setShowDateRangePopup(false);
    // Here you can add logic to filter expenses by date range
    console.log("Date range selected:", { startDate, endDate });
  };

  const handleCategoryConfirm = () => {
    setShowCategoryPopup(false);
    // Here you can add logic to filter expenses by category
    console.log("Category selected:", selectedCategory);
  };

  const openStartDatePicker = () => setShowStartDatePicker(true);
  const openEndDatePicker = () => setShowEndDatePicker(true);

  const handleCategorySelect = (categoryValue: string) => {
    setSelectedCategory(categoryValue);
  };

  return (
    <LinearGradient colors={["#28243D", "#2D2A5A"]} style={styles.container}>
      {/* Header */}
      <Header title="All expenses" />

      {/* Filter Section */}
      <View style={styles.filterSection}>
        <CustomDropdown
          value={selectedFilter}
          showScrollIndicator={false}
          options={dropdownOptions}
          onChange={handleFilterChange}
          placeholder="Recent transactions"
          style={styles.dropdown}
        />
      </View>

      {/* Expense List */}
      <View style={styles.expenseListContainer}>
        <ExpenseByDateList data={expenseData} showScrollIndicator={false} />
      </View>

      {/* Reset Filter Button */}
      <View style={styles.buttonContainer}>
        <Button onPress={handleResetFilter} style={styles.resetButton}>
          <View style={styles.buttonContent}>
            <ArrowPathIcon size={wp(4)} color="#fff" />
            <Text style={styles.resetButtonText}>Reset Filter</Text>
          </View>
        </Button>
      </View>

      {/* Date Range Popup */}
      <Popup
        visible={showDateRangePopup}
        onClose={() => setShowDateRangePopup(false)}
        title="Starting & End date"
        containerStyle={styles.popupContainer}
        titleStyle={styles.popupTitle}
        buttonText="OK"
        color1="#00C853"
        color2="#B2FF59"
        buttonTextStyle={styles.popupButtonText}
      >
        <View style={styles.dateRangeContent}>
          <View style={styles.dateInputRow}>
            <View style={styles.dateInputContainer}>
              <Input
                value={startDate}
                onChangeContent={() => {}}
                placeholder="DD/MM/YYYY"
                editable={false}
                style={styles.dateInput}
                inputWrapperStyle={styles.dateInputWrapper}
              >
                <TouchableOpacity
                  onPress={openStartDatePicker}
                  style={{ marginTop: hp(0.5) }}
                >
                  <CalendarDaysIcon size={wp(4)} color="#fff" />
                </TouchableOpacity>
              </Input>
            </View>

            <Text style={styles.dateSeparator}>To</Text>

            <View style={styles.dateInputContainer}>
              <Input
                value={endDate}
                onChangeContent={() => {}}
                placeholder="DD/MM/YYYY"
                editable={false}
                style={styles.dateInput}
                inputWrapperStyle={styles.dateInputWrapper}
              >
                <TouchableOpacity
                  onPress={openEndDatePicker}
                  style={{ marginTop: hp(0.5) }}
                >
                  <CalendarDaysIcon size={wp(4)} color="#fff" />
                </TouchableOpacity>
              </Input>
            </View>
          </View>
        </View>
      </Popup>

      {/* Category Selection Popup */}
      <Popup
        visible={showCategoryPopup}
        onClose={() => setShowCategoryPopup(false)}
        title="Select category"
        containerStyle={styles.popupContainer}
        titleStyle={styles.popupTitle}
        buttonText="OK"
        color1="#00C853"
        color2="#B2FF59"
        buttonTextStyle={styles.popupButtonText}
      >
        <View style={styles.categoryContent}>
          <View
            style={styles.categoryScrollContainer}
            onLayout={(event) => {
              setCategoryContainerHeight(event.nativeEvent.layout.height);
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={(event) => {
                setCategoryScrollOffset(event.nativeEvent.contentOffset.y);
              }}
              onContentSizeChange={(width, height) => {
                setCategoryContentHeight(height);
              }}
            >
              {categoryOptions.map((category, index) => (
                <TouchableOpacity
                  key={category.value}
                  style={[
                    styles.categoryItem,
                    index < categoryOptions.length - 1 &&
                      styles.categoryItemBorder,
                  ]}
                  onPress={() => handleCategorySelect(category.value)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.categoryDot,
                      { backgroundColor: category.color },
                    ]}
                  />
                  <Text style={styles.categoryLabel}>{category.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {categoryContentHeight > categoryContainerHeight && (
              <CustomScrollIndicator
                scrollOffset={categoryScrollOffset}
                contentHeight={categoryContentHeight}
                containerHeight={categoryContainerHeight}
              />
            )}
          </View>
        </View>
      </Popup>

      {/* Date Pickers */}
      {showStartDatePicker && (
        <DateTimePicker
          value={currentDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) => handleDateChange(event, date, true)}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          value={currentDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) => handleDateChange(event, date, false)}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterSection: {
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
  },
  dropdown: {
    borderRadius: wp(2),
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  expenseListContainer: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  buttonContainer: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
  },
  resetButton: {
    backgroundColor: "#006FFF",
    borderRadius: wp(10),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: wp(2),
  },
  resetButtonText: {
    color: "#fff",
    fontSize: wp(4),
    fontWeight: "bold",
  },
  // Popup Styles
  popupContainer: {
    backgroundColor: "#2A2A2A",
    width: "85%",
    maxHeight: hp(60),
  },
  popupTitle: {
    color: "#fff",
    fontSize: wp(4.5),
    fontWeight: "bold",
    paddingHorizontal: wp(4),
    paddingTop: wp(4),
  },
  popupButtonText: {
    color: "#fff",
    fontSize: wp(4),
    fontWeight: "bold",
  },
  // Date Range Popup Styles
  dateRangeContent: {
    paddingHorizontal: wp(4),
  },
  dateInputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: wp(2),
  },
  dateInputContainer: {
    flex: 1,
  },
  dateInput: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Bold",
  },
  dateInputWrapper: {
    borderRadius: wp(2),
    borderWidth: 0.5,
    borderColor: "#C0C0C0",
  },
  dateSeparator: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
    paddingBottom: hp(2),
  },
  // Category Popup Styles
  categoryContent: {
    paddingHorizontal: wp(4),
    maxHeight: hp(20),
  },
  categoryScrollContainer: {
    position: "relative",
    maxHeight: hp(35),
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
  },
  categoryItemBorder: {
    borderBottomWidth: 1,
    width: "90%",
    borderBottomColor: "#F7F7F7",
  },
  categoryDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    marginRight: wp(3),
  },
  categoryLabel: {
    color: "#fff",
    fontSize: wp(3.5),
    fontWeight: "500",
  },
});

export default AllExpenses;
