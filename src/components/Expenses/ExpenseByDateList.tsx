import React, { FC, useMemo, useState } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import ExpensesList from "./ExpensesList";
import { expenseItem } from "src/commonTypes";

interface ExpenseByDateListProps {
  data: expenseItem[];
}

const CustomScrollIndicator: FC<{
  scrollOffset: number;
  contentHeight: number;
  containerHeight: number;
}> = ({ scrollOffset, contentHeight, containerHeight }) => {
  const indicatorHeight = Math.max(
    (containerHeight / contentHeight) * containerHeight,
    30
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

const ExpenseByDateList: FC<ExpenseByDateListProps> = ({ data }) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const renderItem = ({
    item,
    index,
  }: {
    item: expenseItem;
    index: number;
  }) => (
    <View style={styles.dateSection} key={index}>
      <ExpensesList data={item} />
      <View style={styles.seperator} />
    </View>
  );

  const keyExtractor = (item: expenseItem, index: number) => `expense-${index}`;

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
    <View style={styles.container} onLayout={handleLayout}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.flatList}
        contentContainerStyle={styles.contentContainer}
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
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
  },
  flatList: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  dateSection: {
    marginBottom: hp(2),
  },
  scrollIndicatorContainer: {
    position: "absolute",
    right: wp(1),
    top: hp(1),
    bottom: hp(1),
    width: wp(1.5),
    backgroundColor: "#D9D9D9",
    borderRadius: wp(0.75),
  },
  scrollIndicator: {
    width: "100%",
    backgroundColor: "#006FFF",
    borderRadius: wp(0.75),
  },
  seperator: {
    borderColor: "#F7F7F7",
    borderWidth: 1,
    alignSelf: "center",
    width: "90%",
  },
});

export default ExpenseByDateList;
