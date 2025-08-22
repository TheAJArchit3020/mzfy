import Amounttext from "@components/reusable/amounttext";
import { RootState } from "@redux/store";
import React, { FC } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { useSelector } from "react-redux";


interface props {
  data?: any
  width?: any
  text?: any
  balanceamount?: any
}

const Dashboarddonutgraph: FC<props> = ({
  width = 180,
  data = [],
  text,
  balanceamount
}) => {

  const selectedCurrency = useSelector((state: RootState) => state.user.items[0]?.selectedCurrency);

  const size = width * 0.6; // donut size
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;



  const total = data?.reduce((sum: any, d: any) => sum + d.value, 0);
  let cumulative = 0;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" originX={size / 2} originY={size / 2}>

          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#ffffff"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {data.map((slice: any, index: any) => {
            const percentage = slice.value / total;
            const strokeDasharray = circumference * percentage;
            const strokeDashoffset = circumference - strokeDasharray - cumulative;
            cumulative += strokeDasharray;

            return (
              <Circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={slice.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${strokeDasharray}, ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                fill="transparent"
              />
            );
          })}
        </G>
      </Svg>
      <View style={styles.centerText}>
        <Amounttext text={`${selectedCurrency} ${balanceamount ?? 0}`} style={styles.text} />
      </View>
    </View>
  );
};

export default Dashboarddonutgraph;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  centerText: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Bold",
    color: "red",
  },
});
