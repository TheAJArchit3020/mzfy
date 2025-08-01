import React, { FC } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import Popup from "./popup";
interface PieChartProps {
  data: Array<{
    value: number;
    color: string;
    label: string;
  }>;
  height?: number;
  width?: number;
  paddingLeft?: number;
  showInnerCircle: boolean;
  reduceOuterCirclewidthBy?: number;
  reduceOuterCircleHeightBy?: number;
}

const PieChartComponent: FC<PieChartProps> = ({
  data,
  height = hp(15),
  width = wp(40),
  paddingLeft = wp(10),
  showInnerCircle,
  reduceOuterCirclewidthBy = wp(20),
  reduceOuterCircleHeightBy = hp(6),
}) => {
  const chartData = data.map((item) => ({
    name: item.label,
    population: item.value,
    color: item.color,
    legendFontColor: "#fff",
    legendFontSize: wp(3),
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const chartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={width}
          height={height}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft={paddingLeft.toString()}
          absolute
          hasLegend={false}
        />
        {showInnerCircle && (
          <View
            style={[
              styles.centerCircle,
              {
                width: width - reduceOuterCirclewidthBy,
                height: height - reduceOuterCircleHeightBy,
              },
            ]}
          >
            <Text style={styles.breakdownText}>BreakDown</Text>
          </View>
        )}
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
  centerCircle: {
    position: "absolute",
    backgroundColor: "#2A2A2A",
    borderRadius: wp(10),
    alignItems: "center",
    justifyContent: "center",
  },
  centerText: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  breakdownText: {
    color: "#fff",
    fontSize: wp(3),
    fontFamily: "PlusJakartaSans-Bold",
  },
  labelContainer: {
    position: "absolute",
  },
  connectingLine: {
    position: "absolute",
  },
  label: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Bold",
    fontWeight: "bold",
  },
});

export default PieChartComponent;
