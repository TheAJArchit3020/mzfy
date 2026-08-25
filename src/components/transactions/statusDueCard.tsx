import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import Card from "@components/reusable/card";
import LinearGradient from "react-native-linear-gradient";
import { CalendarDaysIcon } from "react-native-heroicons/outline";
import { paymentStatus } from "src/commonTypes";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

interface StatusDueCardProps {
  status: paymentStatus;
  date: string;
  amount: number;
  onPress?: () => void;
}

const StatusDueCard: FC<StatusDueCardProps> = ({
  status,
  date,
  amount,
  onPress,
}) => {

  const userDetails = useSelector((state: RootState) => state.user.items[0]);
  // Define colors based on status
  const getColors = () => {
    switch (status) {
      case "paid":
        return ["#B2FF59", "#00C853"];
      case "upcoming":
        return ["#00E5FF", "#2979FF"];
      case "missed":
        return ["#F44336", "#B71C1C"];
      default:
        return ["#B2FF59", "#00C853"];
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "paid":
        return "Paid";
      case "upcoming":
        return "Upcoming";
      case "missed":
        return "Missed";
      default:
        return "Paid";
    }
  };

  // Parse date
  const [dayStr, monthStr, yearStr] = date.split("/");
  const dueDate = new Date(
    Number(yearStr),
    Number(monthStr) - 1,
    Number(dayStr)
  );

  return (
    <LinearGradient
      colors={getColors()}
      locations={[0, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.card}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Text style={styles.statusText}>{getStatusText()}</Text>
          <View style={styles.dateSection}>
            <Text style={styles.dayText}>{dueDate.getDate()}</Text>
            <Text style={styles.monthYearText}>
              {dueDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </Text>
          </View>
          <View style={styles.amountSection}>
            <Text style={styles.amountText}>{userDetails?.selectedCurrency} {amount.toLocaleString()}</Text>
          </View>
        </View>
        <View style={styles.rightSection}>
          <CalendarDaysIcon color="#333" size={hp(3)} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default StatusDueCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: hp(2.5),
  },
  card: {
    borderRadius: wp(5),
    padding: wp(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  statusText: {
    fontSize: wp(4),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp(1),
  },
  dateSection: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: hp(1),
  },
  dayText: {
    fontSize: wp(8),
    fontWeight: "bold",
    color: "#333",
    marginRight: wp(2),
  },
  monthYearText: {
    fontSize: wp(3.5),
    color: "#333",
    fontWeight: "500",
  },
  amountSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  amountText: {
    fontSize: wp(4),
    fontWeight: "600",
    color: "#333",
  },
});
