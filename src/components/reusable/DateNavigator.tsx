import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";

interface DateNavigatorProps {
  onDateChange?: (date: Date) => void;
  initialDate?: Date;
}

const DateNavigator: React.FC<DateNavigatorProps> = ({
  onDateChange,
  initialDate = new Date(),
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const formatDate = (date: Date): string => {
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={handlePreviousMonth}
          activeOpacity={0.7}
        >
          <ChevronLeftIcon size={wp(7)} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.dateText}>{formatDate(currentDate)}</Text>

        <TouchableOpacity
          style={styles.arrowButton}
          onPress={handleNextMonth}
          activeOpacity={0.7}
        >
          <ChevronRightIcon size={wp(7)} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  navigationBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: wp(3),
    width: wp(100),
  },
  arrowButton: {
    padding: wp(2),
    borderRadius: wp(2),
  },
  dateText: {
    color: "#fff",
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Bold",
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
});

export default DateNavigator;
