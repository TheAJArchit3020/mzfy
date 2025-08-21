import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { fetchAllExpenses } from "@redux/expenseSlice/expenseSlice";

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
  { name: "Current Month", value: "current" },
  { name: "Last Month", value: "last" },
  { name: "Select date range", value: "range" },
  { name: "Select Category", value: "category" },
];

const AllExpenses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allExpenses = useSelector(
    (state: RootState) => state.expenses.allExpenses
  );
  const categoryOptions = useSelector((state: RootState) =>
    state.expenses.getCatogories.map((cat) => ({
      label: cat.name,
      value: cat._id, // or cat.name.toLowerCase() if you prefer text
      color: cat.color,
    }))
  );
  console.log("catagoriesData", categoryOptions);
  const [selectedFilter, setSelectedFilter] = useState<string | number | null>(
    "current"
  );
  const [dateFilter, setDateFilter] = useState<"current" | "last" | "range">(
    "current"
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

  // Map internal filter code to display name used by CustomDropdown
  const codeToName: Record<string, string> = {
    current: "Current Month",
    last: "Last Month",
    range: "Select date range",
    category: "Select Category",
  };
  const selectedFilterName =
    (selectedFilter && codeToName[String(selectedFilter)]) || "Current Month";

  const handleFilterChange = (value: any) => {
    const code =
      value && typeof value === "object" && "value" in value
        ? value.value
        : value;
    setSelectedFilter(code);

    if (code === "current") {
      setDateFilter("current");
      setShowDateRangePopup(false);
    } else if (code === "last") {
      setDateFilter("last");
      setShowDateRangePopup(false);
    } else if (code === "range") {
      // open date range selector; actual range applied on confirm
      setShowDateRangePopup(true);
    } else if (code === "category") {
      // open category selector; keep existing date filter (default/current/last/range)
      setShowCategoryPopup(true);
    }
  };

  const handleResetFilter = () => {
    setSelectedFilter("current");
    setDateFilter("current");
    setStartDate("");
    setEndDate("");
    setSelectedCategory(null);
    setShowDateRangePopup(false);
    setShowCategoryPopup(false);
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
    // Apply range mode so API call uses provided dates
    setDateFilter("range");
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
    setShowCategoryPopup(false);
    // Default date range to last 1 month when filtering by category
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    const toDdMmYyyy = (d: Date) => d.toLocaleDateString("en-GB");
    setStartDate(toDdMmYyyy(start));
    setEndDate(toDdMmYyyy(end));
    setDateFilter("range");
  };

  // Build current month date range ISO strings
  const getMonthRange = (date: Date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return { startDate: start.toISOString(), endDate: end.toISOString() };
  };

  useEffect(() => {
    // Build params based on current filter selections
    const params: { startDate?: string; endDate?: string; category?: string } =
      {};

    if (dateFilter === "current") {
      const { startDate, endDate } = getMonthRange(new Date());
      params.startDate = startDate;
      params.endDate = endDate;
    } else if (dateFilter === "last") {
      const now = new Date();
      const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const { startDate, endDate } = getMonthRange(prevMonth);
      params.startDate = startDate;
      params.endDate = endDate;
    } else if (dateFilter === "range") {
      // Parse DD/MM/YYYY into ISO
      const parseDdMmYyyy = (val: string): string | undefined => {
        if (!val) return undefined;
        const [dd, mm, yyyy] = val.split("/").map((v) => Number(v));
        if (!dd || !mm || !yyyy) return undefined;
        const d = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
        return d.toISOString();
      };
      const s = parseDdMmYyyy(startDate);
      const e = parseDdMmYyyy(endDate);
      if (s) params.startDate = s;
      if (e) params.endDate = e;
    }

    if (selectedCategory) {
      params.category = selectedCategory as string;
    }

    dispatch(fetchAllExpenses(params));
  }, [dispatch, dateFilter, startDate, endDate, selectedCategory]);

  // Transform API data to expenseItem[] for list
  const expensesData: expenseItem[] = React.useMemo(() => {
    const groups: Record<
      string,
      { date: string; transactions: any[]; ts: number }
    > = {};
    const toDateLabel = (dateStr: string) => {
      const d = new Date(dateStr);
      const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
      const day = String(d.getDate());
      return `${day} ${weekday}`;
    };
    (Array.isArray(allExpenses) ? allExpenses : []).forEach((exp: any) => {
      const dateStr =
        exp.date || exp.createdAt || exp.updatedAt || new Date().toISOString();
      const label = toDateLabel(dateStr);
      if (!groups[label]) {
        groups[label] = {
          date: label,
          transactions: [],
          ts: new Date(dateStr).getTime(),
        };
      }
      groups[label].transactions.push({
        id: exp.expense || exp._id || exp.id || "",
        category:
          (exp.category && (exp.category.name || exp.category.label)) ||
          exp.category ||
          "",
        item: exp.note || exp.description || exp.item || "",
        amount: Number(exp.amount) || 0,
        date: label,
      });
    });
    const arr = Object.values(groups);
    arr.sort((a, b) => b.ts - a.ts);
    return arr.map(({ date, transactions }) => ({
      date,
      transactions,
    })) as expenseItem[];
  }, [allExpenses]);

  return (
    <LinearGradient
      colors={["#463C9F", "#3A346E", "#23234B", "#2B293E", "#272631"]}
      locations={[0, 0.64, 0.76, 0.87, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* Header */}
      <Header title="All expenses" />

      {/* Filter Section */}
      <View style={styles.filterSection}>
        <CustomDropdown
          value={selectedFilterName}
          showScrollIndicator={false}
          options={dropdownOptions}
          onChange={handleFilterChange}
          placeholder="Recent transactions"
          style={styles.dropdown}
        />
      </View>

      {/* Expense List */}
      <View style={styles.expenseListContainer}>
        {expensesData.length > 0 ? (
          <ExpenseByDateList data={expensesData} showScrollIndicator={false} />
        ) : (
          <View style={styles.noDataContainer}>
            <Image
              source={require("../assets/images/Expenses/NoData.png")}
              style={styles.noImage}
            />
            <Text style={styles.noDataText}>No data available</Text>
          </View>
        )}
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
        onConfirm={handleDateRangeConfirm}
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
        onConfirm={() => setShowCategoryPopup(false)}
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
                  onPress={() => handleCategorySelect(category.value || "")}
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
  noDataContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(10),
  },
  noImage: {
    height: hp(15),
    width: wp(30),
    resizeMode: "contain",
    marginTop: hp(3),
  },
  noDataText: {
    fontFamily: "PlusJakartaSans-Bold",
    color: "#fff",
    fontSize: wp(5),
    marginTop: hp(1),
  },
});

export default AllExpenses;
