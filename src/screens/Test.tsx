import React, { FC } from "react";
import { View, Text } from "react-native";
import StatusDueCard from "@components/transactions/statusDueCard";
import PieChartComponent from "@components/reusable/pieChart";
import DonutChart from "../../src/DonutChart";
const Test: FC = () => {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#000" }}>
      <DonutChart
        data={[
          { value: 10, color: "red", label: "Red" },
          { value: 20, color: "blue", label: "Blue" },
        ]}
      />
    </View>
  );
};

export default Test;
