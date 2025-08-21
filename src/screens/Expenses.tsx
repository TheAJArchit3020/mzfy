import React, { FC, useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import GraphComponent from "@components/reusable/graph";
import Button from "@components/reusable/button";
import { PencilIcon, PlusIcon } from "react-native-heroicons/solid";
import ExpenseByDateList from "@components/Expenses/ExpenseByDateList";
import Legend from "@components/reusable/Legend";
import DonutChart from "../../src/DonutChart";
import { BookOpenIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpensesDashboard } from "@redux/expenseSlice/expenseSlice";
import { AppDispatch, RootState } from "@redux/store";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "@managers/routing";
import { StackNavigationProp } from "@react-navigation/stack";
import { expenseItem, Transaction } from "src/commonTypes";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type ExpensesScreenNavigationProp = StackNavigationProp<RootStackParams>;

interface ExpensesProps {}

const Expenses: FC<ExpensesProps> = ({}) => {
  const navigation = useNavigation<ExpensesScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState(0); // 0 for Expenses, 1 for Categories
  const userExpensesData = useSelector((state: RootState) => state.expenses);
  console.log("userExpensesData", userExpensesData);
  const isDataAvailable = userExpensesData.totalSpent > 0;
  useEffect(() => {
    console.log(
      "year : ",
      selectedDate.getFullYear(),
      " ",
      selectedDate.getMonth() + 1
    );
    dispatch(
      fetchExpensesDashboard({
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
      })
    );
  }, [selectedDate]);
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected date:", date.toLocaleDateString());
  };
  const totalSpentPercent = Math.ceil(
    (userExpensesData.totalSpent / (userExpensesData.totalBudget || 1)) * 100
  );
  const remainingPercent = 100 - totalSpentPercent;

  const pieChartData = [
    { value: totalSpentPercent, color: "#DC143C", name: "Total Spent" },
    { value: remainingPercent, color: "#006FFF", name: "Monthly Budget" },
  ];

  const totalBudget = userExpensesData.totalBudget || 1; // Prevent division by zero

  // Create category data with percentage values
  const categoriesData =
    userExpensesData.byCategory?.map((cat) => {
      const percentage = (cat.spent / totalBudget) * 100;

      // Optional: emoji mapping
      const emojiMap: Record<string, string> = {
        Investment: "💹",
        Entertainment: "🎬",
        Health: "🩺",
        Miscellaneous: "🧰",
        Food: "🍽️",
      };
      return {
        value: Number(percentage.toFixed(2)),
        color: cat.color || "#006FFF",
        label: cat.categoryName,
        line1: `${cat.categoryName} ${emojiMap[cat.categoryName] || " "}`,
        line2: `${percentage.toFixed(2)}%`,
      };
    }) || [];

  const segmentItems = ["Expenses", "Categories"];

  const handleCategoryManagement = () => {
    console.log("Category management pressed");
    // Add navigation or modal logic here
    navigation.navigate("CategoryManagement");
  };

  const handleAddExpense = () => {
    console.log("Add expense pressed");
    // Add navigation or modal logic here
    navigation.navigate("LogExpense");
  };

  const getRecentRemaining = useMemo(() => {
    return userExpensesData.totalBudget - userExpensesData.totalSpent;
  }, [userExpensesData.totalBudget, userExpensesData.totalSpent]);

  // Calculate last 7 days (including today) expenses for the graph
  const { graphData, graphLabels } = useMemo(() => {
    // Build rawData and labels arrays aligned to last7Days
    const rawData = userExpensesData.spendingTrend.map((d) => ({
      amount: d.amount || 0,
    }));

    const labels = userExpensesData.spendingTrend.map((d) => {
      const dateSplit = d.date.split("T")[0].split("-");
      console.log("dateSplit", dateSplit[1]);
      const day = dateSplit[2];
      const month = monthNames[Number(dateSplit[1] - 1)];
      return `${day} ${month}`;
    });
    return { graphData: rawData, graphLabels: labels };
  }, [userExpensesData.recentExpenses]);

  // Sample expenses data with dates
  const expensesData: expenseItem[] = Object.values(
    (userExpensesData.recentExpenses || []).reduce(
      (
        acc: Record<string, { date: string; transactions: Transaction[] }>,
        exp: any
      ) => {
        // Format the date as "DD DDD" (e.g., "31 Thu")
        const dateObj = new Date(exp.date);
        const dateLabel = dateObj.toLocaleDateString("en-US", {
          day: "numeric",
          weekday: "short",
        });

        // If this date group doesn't exist, create it
        if (!acc[dateLabel]) {
          acc[dateLabel] = {
            date: dateLabel,
            transactions: [],
          };
        }

        // Push into transactions
        acc[dateLabel].transactions.push({
          id: exp.expense || exp._id || "", // ID from backend
          category: exp.category || "",
          item: exp.note || exp.description || "", // Use note as item (or replace with real item name if available)
          amount: exp.amount || 0,
          date: dateLabel,
        });

        return acc;
      },
      {} as Record<string, { date: string; transactions: Transaction[] }>
    )
  ).sort((a, b) => {
    // Sort by date descending (most recent first)
    const dateA = new Date(a.transactions[0]?.date || "");
    const dateB = new Date(b.transactions[0]?.date || "");
    return dateB.getTime() - dateA.getTime();
  }) as expenseItem[];
  {
    console.log("categoriesData", categoriesData);
  }
  return (
    <LinearGradient
      colors={["#463C9F", "#3A346E", "#23234B", "#2B293E", "#272631"]}
      locations={[0, 0.64, 0.76, 0.87, 1]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={styles.container}>
          <DateNavigator
            onDateChange={handleDateChange}
            initialDate={selectedDate}
          />
          {isDataAvailable ? (
            <>
              {/* Financial Cards */}
              <View style={styles.cardsContainer}>
                {/* Monthly Budget Card */}
                <View style={styles.card}>
                  <Text style={styles.cardLabel}>Monthly budget</Text>
                  <Text style={styles.cardAmount}>
                    ₹.{userExpensesData.totalBudget}
                  </Text>
                </View>

                {/* Total Spent Card */}
                <View style={styles.card}>
                  <Text style={styles.cardLabel}>Total spent</Text>
                  <Text style={styles.cardAmount}>
                    ₹.{userExpensesData.totalSpent}
                  </Text>
                </View>
              </View>

              <View style={styles.expensesDataContainer}>
                <SegmentButton
                  items={segmentItems}
                  selectedIndex={selectedTab}
                  onChange={setSelectedTab}
                  containerStyle={styles.segmentButtonContainer}
                  segmentStyle={styles.segmentButton}
                  activeSegmentStyle={styles.activeSegmentButton}
                  textStyle={styles.segmentText}
                  activeTextStyle={styles.activeSegmentText}
                />

                <View style={styles.chartContainer}>
                  {selectedTab === 0 ? (
                    // Expenses View
                    <View style={styles.chartCard}>
                      <View style={styles.chart}>
                        <PieChartComponent
                          containerStyle={{ width: "50%", marginLeft: wp(10) }}
                          data={pieChartData}
                          radius={wp(20)}
                        />
                        <Legend
                          containerStyle={{
                            gap: hp(2),
                            alignItems: "flex-start",
                          }}
                          data={pieChartData}
                          layout={"column"}
                          gap={hp(0.5)}
                        />
                      </View>
                      <View style={styles.balanceContainer}>
                        <Text style={styles.balanceText}>
                          Balance: ₹{getRecentRemaining}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    // Categories View
                    <View>
                      <DonutChart
                        data={categoriesData}
                        donutStrokeWidth={20}
                        radius={80}
                        arcCornerRadius={0}
                        labelOffset={18}
                        canvasHeight={10}
                        canvasWidth={300}
                        fontFamily="PlusJakartaSans-Bold"
                        labelFontSize={wp(2.3)}
                        lineStroke={wp(0.5)}
                      />
                    </View>
                  )}
                </View>
              </View>

              {/* Recent Expenses Header */}
              <View style={styles.recentExpensesHeader}>
                <View style={styles.recentExpensesTitleContainer}>
                  <Text style={styles.recentExpensesTitle}>
                    Recent expenses
                  </Text>
                  <Button
                    onPress={() => navigation.navigate("AllExpenses")}
                    style={styles.expensesButton}
                  >
                    <BookOpenIcon size={wp(5)} color="white" />
                    <Text style={[styles.expensesText]}>All expenses</Text>
                  </Button>
                </View>
                <View style={styles.financialOverview}>
                  <View style={styles.financialItem}>
                    <Text style={styles.financialLabel}>Budget</Text>
                    <Text style={styles.financialAmount}>
                      ₹{userExpensesData.totalBudget}
                    </Text>
                  </View>
                  <View style={styles.financialItem}>
                    <Text style={styles.financialLabel}>Exp.</Text>
                    <Text style={styles.financialAmount}>
                      ₹{userExpensesData.totalSpent}
                    </Text>
                  </View>
                  <View style={styles.financialItem}>
                    <Text style={styles.financialLabel}>Remaining</Text>
                    <Text style={styles.financialAmount}>
                      ₹{getRecentRemaining}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Expenses List */}
              <View style={styles.expensesListContainer}>
                <ExpenseByDateList data={expensesData} />
              </View>

              {/* Spending Trend Section */}
              <View style={styles.spendingTrendContainer}>
                <Text style={styles.sectionTitle}>Spending trend</Text>
                <View style={styles.graphContainer}>
                  <GraphComponent
                    width={wp(80)}
                    rawData={graphData}
                    labels={graphLabels}
                  />
                </View>
              </View>

              {/* Category Management Button */}
              <View style={styles.buttonContainer}>
                <Button
                  onPress={handleCategoryManagement}
                  style={styles.categoryButton}
                >
                  <View style={styles.buttonContent}>
                    <PencilIcon size={wp(4)} color="#fff" />
                    <Text style={styles.buttonText}>Category management</Text>
                  </View>
                </Button>
              </View>
            </>
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
      </ScrollView>

      <View style={styles.fabContainer}>
        <Button onPress={handleAddExpense} style={styles.fabButton}>
          <PlusIcon size={wp(6)} color="#fff" />
        </Button>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: hp(2),
  },
  cardsContainer: {
    paddingHorizontal: wp(5),
    justifyContent: "space-between",
    gap: hp(1),
  },
  card: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    borderRadius: wp(5),
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    borderWidth: 0.5,
    borderColor: "#C0C0C0",
    gap: hp(1),
  },
  cardLabel: {
    color: "#fff",
    fontSize: wp(3.2),
    fontFamily: "PlusJakartaSans-Bold",
    opacity: 0.8,
  },
  cardAmount: {
    color: "#fff",
    fontSize: wp(7.5),
    fontFamily: "PlusJakartaSans-Bold",
    fontWeight: "bold",
  },
  expensesDataContainer: {
    marginHorizontal: wp(5),
    backgroundColor: "#1E2D5E",
    borderWidth: 0.5,
    borderColor: "#C0C0C0",
    borderRadius: wp(5),
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    height: hp(33),

    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  segmentButtonContainer: {
    backgroundColor: "#2a2a2a",
    borderRadius: wp(8),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.3),
    width: wp(60),
    marginTop: hp(0.5),
  },
  segmentButton: {
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(4),
    borderRadius: wp(8),
  },
  activeSegmentButton: {
    backgroundColor: "#006EFF",
    paddingVertical: hp(0),
  },
  segmentText: {
    color: "#fff",
    fontSize: wp(3),
    fontFamily: "PlusJakartaSans-Regular",
  },
  activeSegmentText: {
    color: "#fff",
    fontSize: wp(3),
    fontFamily: "PlusJakartaSans-Bold",
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  chartCard: {
    borderRadius: wp(4),
    alignItems: "center",
    gap: wp(5),
    alignSelf: "center",
  },
  graphContainer: {
    width: "100%",
  },
  chart: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
  balanceContainer: {
    alignItems: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Bold",
    fontWeight: "600",
    marginBottom: hp(2),
  },

});

export default Expenses;
