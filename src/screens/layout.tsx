import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SegmentButton from "@components/reusable/segmentbutton";
import LinearGradient from "react-native-linear-gradient";
import DashboardScreen from "./dashboard";
import DebtsScreen from "./debts";
import PayoffplansScreen from "./payoffplans";
import LearnScreen from "./learn";
import Expenses from "./Expenses";
const Layout: React.FC = () => {
  const [tab, setTab] = useState(0);
  const tabs = ["Dashboard", "Debts", "Pay off Plan", "Expenses"];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#5145BC", "#2F2C4A", "#2B293E", "#272631", "#232323"]}
        locations={[0, 0.64, 0.76, 0.87, 1]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <SegmentButton items={tabs} selectedIndex={tab} onChange={setTab} />

        {tab === 0 ? (
          <DashboardScreen />
        ) : tab === 1 ? (
          <DebtsScreen />
        ) : tab === 2 ? (
          <PayoffplansScreen />
        ) : (
          <Expenses />
        )}
      </LinearGradient>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});
