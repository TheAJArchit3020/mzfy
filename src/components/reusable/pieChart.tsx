import React, { FC } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import Popup from "./popup";
import { PieChart } from "react-native-gifted-charts";
import { pieDataItem } from "react-native-gifted-charts";
interface PieChartProps {
  data: Array<{
    value: number;
    color: string;
    label: string;
  }>;
  height?: number;
  width?: number;
  paddingLeft?: number;
  showInnerCircle?: boolean;
  reduceOuterCirclewidthBy?: number;
  reduceOuterCircleHeightBy?: number;
  centerText?: string;
  radius?: number;
}

const PieChartComponent: FC<PieChartProps> = ({ data, radius = wp(15) }) => {
  const chartData = data.map((item) => ({
    value: item.value,
    color: item.color,
    text: item.label,
  }));
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          radius={radius}
          showText
          showValuesAsLabels
          textColor="#fff"
          textSize={wp(4)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerLabelContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerLabelText: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Bold",
    fontWeight: "bold",
  },
});

export default PieChartComponent;
