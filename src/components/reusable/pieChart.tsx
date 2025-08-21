import React, { FC } from "react";
import { View, Text, StyleSheet, Dimensions, ViewStyle } from "react-native";
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
  }>;
  height?: number;
  width?: number;
  paddingLeft?: number;
  radius?: number;
  containerStyle: ViewStyle;
}

const PieChartComponent: FC<PieChartProps> = ({
  containerStyle,
  data,
  radius = wp(15),
}) => {
  const chartData = data.map((item) => ({
    value: item.value,
    color: item.color,
    text: `${item.value}%`,
  }));
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          radius={radius}
          showText
          textColor="#fff"
          textSize={wp(4)}
          font={"PlusJakartaSans-Bold"}
          fontWeight="bold"
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
