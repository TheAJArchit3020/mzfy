import React, { FC, memo } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  heightToDP as hp,
  widthToDP as wp,
} from "react-native-responsive-screens";
import { ChevronRightIcon, ChevronUpIcon } from "react-native-heroicons/solid";
interface GraphComponentProps {
  width?: number;
  height?: number;
  data?: {
    labels: string[];
    datasets: Array<{
      data: number[];
    }>;
  };
}

const defaultData = {
  labels: ["Jan", "Feb", "Mar", "Ap", "May", "Jun", "Jul"],
  datasets: [
    {
      data: [39, 45, 28, 80, 99, 43, 50],
    },
  ],
};

const GraphComponent: FC<GraphComponentProps> = memo(
  ({ width = wp(90), height = hp(25), data = defaultData }) => {
    return (
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          <LineChart
            data={data}
            width={width}
            height={height}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#2a2a2a",
              backgroundGradientFrom: "#2a2a2a",
              backgroundGradientTo: "#2a2a2a",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "0",
                strokeWidth: "0",
              },
              fillShadowGradient: "#4C96F7",
              fillShadowGradientOpacity: 1,
            }}
            renderDotContent={({ x, y, index, indexData }) => (
              <Image
                key={`dot-${index}`}
                source={require("../../assets/images/graphcCompoennt/graphDot.png")}
                style={{
                  position: "absolute",
                  top: y - 10,
                  left: x - 10,
                  width: wp(5),
                  height: wp(5),
                }}
              />
            )}
            withHorizontalLines={false}
            withVerticalLines={false}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              backgroundColor: "#2a2a2a",
            }}
          />
          <View style={styles.horizontalLine} />
          <ChevronRightIcon
            size={wp(5)}
            color={"#fff"}
            style={styles.verticalArrowIcon}
          />
          <View style={styles.verticalLine} />
          <ChevronUpIcon
            size={wp(5)}
            color={"#fff"}
            style={styles.horizontalArrowIcon}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartContainer: {
    backgroundColor: "#2a2a2a",
    borderRadius: wp(5),
    paddingTop: hp(2),
    paddingHorizontal: wp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#C0C0C0",
  },
  horizontalLine: {
    borderWidth: 0.8,
    borderColor: "#fff",
    position: "absolute",
    width: "80%",
    right: wp(4),
    backgroundColor: "#fff",
    bottom: hp(5),
  },
  verticalLine: {
    backgroundColor: "#fff",
    borderWidth: 0.8,
    borderColor: "#fff",
    position: "absolute",
    height: "80%",
    left: wp(17),
    bottom: hp(5),
  },
  verticalArrowIcon: {
    position: "absolute",
    bottom: hp(4),
    right: wp(0.8),
  },
  horizontalArrowIcon: {
    position: "absolute",
    top: hp(0.8),
    left: wp(14.8),
  },
});

export default GraphComponent;
