import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "@components/reusable/card";

type debtFreeCountDown = {
  year: number;
  month: number;
  day: number;
};

interface DebtcountdownProps {
  data: debtFreeCountDown;
}
const Debtcountdown: React.FC<DebtcountdownProps> = ({ data }) => {
  return (
    <Card style={styles.section_card} cardStyle={styles.section_card_inner}>
      <Text style={styles.section_card_text}>Debt free countdown</Text>
      <View style={styles.section_card_inner_content}>
        <View style={styles.section_card_inner_content_item}>
          <Text style={styles.section_card_inner_content_item_text}>
            {data.year}
          </Text>
          <Text style={styles.section_card_inner_content_item_text2}>Year</Text>
        </View>
        <View style={styles.section_card_inner_content_item}>
          <Text style={styles.section_card_inner_content_item_text}>
            {data.month}
          </Text>
          <Text style={styles.section_card_inner_content_item_text2}>
            Month
          </Text>
        </View>
        <View style={styles.section_card_inner_content_item}>
          <Text style={styles.section_card_inner_content_item_text}>
            {data.day}
          </Text>
          <Text style={styles.section_card_inner_content_item_text2}>Day</Text>
        </View>
      </View>
      <Text style={styles.section_card_text2}>
        Countdown to financial freedom
      </Text>
    </Card>
  );
};

export default Debtcountdown;

const styles = StyleSheet.create({
  section_card: {
    borderWidth: 0.5,
  },
  section_card_text: {
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
  },
  section_card_inner_content: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "4%",
  },
  section_card_inner_content_item: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: "6%",
  },
  section_card_inner_content_item_text: {
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 30,
  },
  section_card_inner_content_item_text2: {
    color: "#fff",
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 20,
  },
  section_card_text2: {
    color: "#fff",
    fontStyle: "italic",
    fontSize: 12,
    marginTop: 10,
  },
  section_card_inner: {
    height: "auto",
    justifyContent: "center",
  },
});
