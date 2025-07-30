import React, { FC } from "react";
import { View, Text, StyleSheet,Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {heightToDP as hp,widthToDP as wp} from 'react-native-responsive-screens'
interface graphComponentProps {}

const GraphComponent: FC<graphComponentProps> = ({}) => {
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={wp(90)}
        height={hp(25)}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "transparent",
          backgroundGradientFrom: "#transparents",
          backgroundGradientTo: "transparent",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(76, 150, 247, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 0,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#fff",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GraphComponent;
