import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import Card from "@components/reusable/card";
import LinearGradient from "react-native-linear-gradient";
import { CalendarIcon } from "react-native-heroicons/outline";
import { paymentStatus } from "src/commonTypes";
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
            <Text style={styles.amountText}>₹{amount.toLocaleString()}</Text>
          </View>
        </View>
        <View style={styles.rightSection}>
          <CalendarIcon color="#333" size={24} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default StatusDueCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    padding: 20,
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  dateSection: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  dayText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  monthYearText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  amountSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
