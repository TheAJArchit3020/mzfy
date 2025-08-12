import React, { FC, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import ExpensesList from "./ExpensesList";
import { expenseItem } from "src/commonTypes";

interface ExpenseByDateListProps {
  data: expenseItem[];
  showScrollIndicator?: boolean;
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

const ExpenseByDateList: FC<ExpenseByDateListProps> = ({
  data,
  showScrollIndicator = true,
}) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const handleScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleContentSizeChange = (
    contentWidth: number,
    contentHeight: number
  ) => {
    setContentHeight(contentHeight);
  };

  const handleLayout = (event: any) => {
    setContainerHeight(event.nativeEvent.layout.height);
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <ScrollView
        style={styles.flatList}
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        onContentSizeChange={handleContentSizeChange}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {data.map((item, index) => (
          <View style={styles.dateSection} key={`expense-${index}`}>
            <ExpensesList data={item} />
            <View style={styles.seperator} />
          </View>
        ))}
      </ScrollView>

      {contentHeight > containerHeight && showScrollIndicator && (
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
    right: 0,
    top: 0,
    bottom: 0,
    width: wp(1),
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
    borderBottomWidth: 0.75,
    alignSelf: "center",
    width: "90%",
  },
});

export default ExpenseByDateList;
