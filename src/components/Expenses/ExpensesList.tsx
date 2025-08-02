import React, { FC, useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import { expenseItem, Transaction } from "src/commonTypes";

interface ExpensesListProps {
  data: expenseItem;
}

const CustomScrollIndicator: FC<{
  scrollOffset: number;
  contentHeight: number;
  containerHeight: number;
}> = ({ scrollOffset, contentHeight, containerHeight }) => {
  const indicatorHeight = Math.max(
    (containerHeight / contentHeight) * containerHeight,
    20
  );
  const indicatorPosition =
    (scrollOffset / (contentHeight - containerHeight)) *
    (containerHeight - indicatorHeight);

  return (
    <View style={styles.scrollIndicatorContainer}>
      <View
        style={[
          styles.scrollIndicator,
          {
            height: indicatorHeight,
            transform: [{ translateY: indicatorPosition }],
          },
        ]}
      />
    </View>
  );
};

const ExpensesList: FC<ExpensesListProps> = ({ data }) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const calculateDayTotal = (transactions: Transaction[]) => {
    return transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  };

  // Get category image and color
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

  const renderTransaction = ({
    item,
    index,
  }: {
    item: Transaction;
    index: number;
  }) => {
    const { image } = getCategoryImage(item.category);
    return (
      <View key={index} style={styles.transactionItem}>
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
  };

  const keyExtractor = (item: Transaction) => item.id;

  const handleScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleContentSizeChange = (width: number, height: number) => {
    setContentHeight(height);
  };

  const handleLayout = (event: any) => {
    setContainerHeight(event.nativeEvent.layout.height);
  };

  return (
    <>
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
        <View style={styles.transactionsContainer} onLayout={handleLayout}>
          <FlatList
            data={data.transactions}
            renderItem={renderTransaction}
            keyExtractor={keyExtractor}
            style={styles.transactionsFlatList}
            contentContainerStyle={styles.transactionsContentContainer}
            onScroll={handleScroll}
            onContentSizeChange={handleContentSizeChange}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          />
          {contentHeight > containerHeight && (
            <CustomScrollIndicator
              scrollOffset={scrollOffset}
              contentHeight={contentHeight}
              containerHeight={containerHeight}
            />
          )}
        </View>
      </View>
    </>
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
  transactionsFlatList: {
    flex: 1,
  },
  transactionsContentContainer: {
    flexGrow: 1,
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
  scrollIndicatorContainer: {
    position: "absolute",
    right: wp(0.5),
    top: hp(0.5),
    bottom: hp(0.5),
    width: wp(1),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: wp(0.5),
  },
  scrollIndicator: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: wp(0.5),
  },
});

export default ExpensesList;
