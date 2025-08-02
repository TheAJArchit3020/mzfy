import React, { FC, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import DateNavigator from "../components/reusable/DateNavigator";
import SegmentButton from "../components/reusable/segmentbutton";
import PieChartComponent from "../components/reusable/pieChart";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import GraphComponent from "@components/reusable/graph";
import Button from "@components/reusable/Button";
import { PencilIcon, PlusIcon } from "react-native-heroicons/solid";
import ExpenseByDateList from "@components/Expenses/ExpenseByDateList";
import Legend from "@components/reusable/Legend";
import DonutChart from "../../src/DonutChart";
interface ExpensesProps {}

const Expenses: FC<ExpensesProps> = ({}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState(0); // 0 for Expenses, 1 for Categories

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected date:", date.toLocaleDateString());
  };

  const pieChartData = [
    { value: 64, color: "#DC143C", name: "Total Spent" },
    { value: 26, color: "#006FFF", name: "Monthly Budget" },
  ];

  const categoriesData = [
    { value: 40.8, color: "#4CAF50", label: "Investment" },
    { value: 30.19, color: "#177AD5", label: "Entertainment" },
    { value: 13.69, color: "#FF6B6B", label: "Health" },
    { value: 8.06, color: "#8BC34A", label: "Miscellaneous" },
    { value: 7.57, color: "#9C27B0", label: "Food" },
  ];

  const segmentItems = ["Expenses", "Categories"];

  const handleCategoryManagement = () => {
    console.log("Category management pressed");
    // Add navigation or modal logic here
  };

  const handleAddExpense = () => {
    console.log("Add expense pressed");
    // Add navigation or modal logic here
  };

  // Sample expenses data with dates
  const expensesData = [
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
      date: "29 Tue",
      transactions: [
        {
          id: "5",
          category: "Investment",
          item: "Stocks",
          amount: 1000,
          date: "29 Tue",
        },
        {
          id: "6",
          category: "Miscellaneous",
          item: "Books",
          amount: 150,
          date: "29 Tue",
        },
      ],
    },
  ];

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

          {/* Financial Cards */}
          <View style={styles.cardsContainer}>
            {/* Monthly Budget Card */}
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Monthly budget</Text>
              <Text style={styles.cardAmount}>₹50,000</Text>
            </View>

            {/* Total Spent Card */}
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Total spent</Text>
              <Text style={styles.cardAmount}>₹32,000</Text>
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
                    <PieChartComponent data={pieChartData} radius={wp(20)} />
                    <Legend
                      containerStyle={{
                        gap: hp(2),
                        width: "30%",
                      }}
                      data={pieChartData}
                      layout={"column"}
                      gap={hp(0.5)}
                    />
                  </View>
                  <View style={styles.balanceContainer}>
                    <Text style={styles.balanceText}>Balance: ₹18,000</Text>
                  </View>
                </View>
              ) : (
                // Categories View
                <View style={styles.graphContainer}>
                  <DonutChart
                    data={categoriesData}
                    radius={wp(20)}
                    labelOffset={30}
                    fontFamily="PlusJakartaSans-Bold"
                    labelFontSize={wp(3)}
                    lineStroke={wp(0.5)}
                  />
                </View>
              )}
            </View>
          </View>

          {/* Recent Expenses Header */}
          <View style={styles.recentExpensesHeader}>
            <Text style={styles.recentExpensesTitle}>Recent expenses</Text>
            <View style={styles.financialOverview}>
              <View style={styles.financialItem}>
                <Text style={styles.financialLabel}>Budget</Text>
                <Text style={styles.financialAmount}>₹50,000</Text>
              </View>
              <View style={styles.financialItem}>
                <Text style={styles.financialLabel}>Exp.</Text>
                <Text style={styles.financialAmount}>₹32,000</Text>
              </View>
              <View style={styles.financialItem}>
                <Text style={styles.financialLabel}>Remaining</Text>
                <Text style={styles.financialAmount}>₹18,000</Text>
              </View>
            </View>
          </View>

          {/* Expenses List */}
          <View style={styles.expensesListContainer}>
            <ExpenseByDateList data={expensesData} />
          </View>

          <View style={styles.fabContainer}>
            <Button onPress={handleAddExpense} style={styles.fabButton}>
              <PlusIcon size={wp(6)} color="#fff" />
            </Button>
          </View>

          {/* Spending Trend Section */}
          <View style={styles.spendingTrendContainer}>
            <Text style={styles.sectionTitle}>Spending trend</Text>
            <View style={styles.graphContainer}>
              <GraphComponent width={wp(80)} />
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
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: hp(2),
    paddingTop: hp(4),
    paddingHorizontal: wp(5),
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: wp(3),
  },
  card: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    borderRadius: wp(5),
    padding: wp(4),
    paddingVertical: hp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#C0C0C0",
  },
  cardLabel: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Regular",
    marginBottom: hp(1),
    opacity: 0.8,
  },
  cardAmount: {
    color: "#fff",
    fontSize: wp(5.5),
    fontFamily: "PlusJakartaSans-Bold",
    fontWeight: "bold",
  },
  expensesDataContainer: {
    backgroundColor: "#1E2D5E",
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: wp(5),
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
    height: hp(36),
  },
  segmentButtonContainer: {
    backgroundColor: "#2a2a2a",
    borderRadius: wp(5),
    padding: wp(1),
    width: wp(60),
    marginTop: 0,
  },
  segmentButton: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(5),
  },
  activeSegmentButton: {
    backgroundColor: "#177AD5",
  },
  segmentText: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Regular",
  },
  activeSegmentText: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Bold",
    fontWeight: "600",
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  chartCard: {
    borderRadius: wp(4),
    alignItems: "center",
    gap: wp(5),
  },
  graphContainer: {
    width: "100%",
  },
  chart: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(5),
  },
  balanceContainer: {
    marginTop: hp(1.5),
    alignItems: "center",
  },
  balanceText: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
    fontWeight: "600",
  },
  spendingTrendContainer: {},
  sectionTitle: {
    color: "#fff",
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Bold",
    fontWeight: "600",
    marginBottom: hp(2),
  },
  buttonContainer: {
    width: "90%",
    height: "10%",
    alignItems: "center",
    marginVertical: hp(4.5),
    alignSelf: "center",
    paddingBottom: hp(5),
  },
  categoryButton: {
    width: "100%",
    backgroundColor: "#177AD5",
    borderRadius: wp(10),
    paddingVertical: hp(1.5),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2),
  },
  buttonText: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
    fontWeight: "600",
  },
  recentExpensesHeader: {
    marginBottom: hp(5),
  },
  recentExpensesTitle: {
    color: "#fff",
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Bold",
    marginBottom: hp(2),
  },
  financialOverview: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  financialItem: {
    alignItems: "center",
    flex: 1,
  },
  financialLabel: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
    opacity: 0.8,
    marginBottom: hp(0.5),
  },
  financialAmount: {
    color: "#68AAFF",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Regular",
  },
  expensesListContainer: {
    height: hp(30),
  },
  fabContainer: {
    position: "absolute",
    top: hp(-6),
    right: wp(2),
    zIndex: 1000,
  },
  fabButton: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    backgroundColor: "#006FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default Expenses;
