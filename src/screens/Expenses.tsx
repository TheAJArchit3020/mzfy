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
import { PencilIcon } from "react-native-heroicons/solid";

interface ExpensesProps {}

const Expenses: FC<ExpensesProps> = ({}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState(0); // 0 for Expenses, 1 for Categories

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected date:", date.toLocaleDateString());
  };

  const expensesData = [
    { value: 64, color: "#FF6B6B", label: "Total spent" },
    { value: 26, color: "#177AD5", label: "Monthly budget" },
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

  return (
    <LinearGradient
      colors={["#463C9F", "#3A346E", "#23234B", "#2B293E", "#272631"]}
      locations={[0, 0.64, 0.76, 0.87, 1]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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
                  <PieChartComponent data={expensesData} radius={wp(20)} />
                  <View style={styles.balanceContainer}>
                    <Text style={styles.balanceText}>Balance: ₹18,000</Text>
                  </View>
                </View>
              ) : (
                // Categories View
                <View style={styles.chartCard}>
                  <PieChartComponent data={categoriesData} radius={wp(25)} />
                </View>
              )}
            </View>
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
    gap: wp(6),
    paddingHorizontal: wp(5),
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
    justifyContent: "center",
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
  graphContainer: {},
  buttonContainer: {
    alignItems: "center",
    marginVertical: hp(4.5),
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
});

export default Expenses;
