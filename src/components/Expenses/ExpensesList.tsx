import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import { expenseItem, Transaction } from "src/commonTypes";

interface ExpensesListProps {
  data: expenseItem;
}

const ExpensesList: FC<ExpensesListProps> = ({ data }) => {
  const calculateDayTotal = (transactions: Transaction[]) => {
    return transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  };

  const getCategoryImage = (category: string) => {
    switch (category.toLowerCase()) {
      case "food":
        return {
          image: require("../../assets/images/Expenses/Items/food.png"),
        };
      case "health":
        return {
          image: require("../../assets/images/Expenses/Items/Health.png"),
        };
      case "investment":
        return {
          image: require("../../assets/images/Expenses/Items/Investment.png"),
        };
      case "miscellaneous":
        return {
          image: require("../../assets/images/Expenses/Items/Miscellaneous.png"),
        };
      default:
        return {
          image: require("../../assets/images/Expenses/Items/Miscellaneous.png"),
        };
    }
  };

  return (
    <View key={data.date} style={styles.dateSection}>
      {/* Date Header */}
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{data.date.split(" ")[0]}</Text>
          <Text style={styles.dayText}>{data.date.split(" ")[1]}</Text>
        </View>
        <Text style={styles.totalAmount}>
          ₹{calculateDayTotal(data.transactions)}
        </Text>
      </View>

      {/* Transactions List */}
      <View style={styles.transactionsContainer}>
        {data.transactions.map((item, index) => {
          const { image } = getCategoryImage(item.category);
          return (
            <View key={item.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={styles.transactionDetailContainer}>
                  <Image
                    source={image}
                    style={styles.iconImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                <Text style={styles.itemText}>{item.item}</Text>
              </View>
              <Text style={styles.amountText}>₹{item.amount}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateSection: {
    marginBottom: hp(1),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: hp(1),
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
  },
  dayText: {
    color: "#FFFFFF",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Medium",
    backgroundColor: "#006FFF",
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    borderRadius: wp(1),
  },
  totalAmount: {
    color: "#68AAFF",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Regular",
  },
  transactionsContainer: {
    paddingHorizontal: wp(5),
    position: "relative",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp(1),
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp(50),
  },
  transactionDetailContainer: {
    flexDirection: "row",
    borderRadius: wp(5),
    justifyContent: "flex-start",
    alignItems: "center",
    gap: wp(1),
  },
  iconImage: {
    width: wp(4.5),
    height: wp(6),
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Medium",
  },
  itemText: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
  },
  amountText: {
    color: "#68AAFF",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Regular",
  },
});

export default ExpensesList;
