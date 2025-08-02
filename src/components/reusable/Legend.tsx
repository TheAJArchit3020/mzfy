import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";

interface LegendItem {
  name: string;
  color: string;
}

interface LegendProps {
  data: LegendItem[];
  layout?: "row" | "column";
  textStyle?: any;
  circleSize?: number;
  gap?: number;
  containerStyle?: any;
}

const Legend: React.FC<LegendProps> = ({
  data,
  layout = "row",
  textStyle,
  circleSize = wp(3),
  gap = wp(0.5),
  containerStyle,
}) => {
  const defaultTextStyle = {
    color: "#fff",
    fontSize: wp(3),
    fontFamily: "PlusJakartaSans-Bold",
  };

  const defaultContainerStyle = {
    flexDirection: layout === "row" ? "row" : "column",
    alignItems: "center",
    justifyContent: layout === "row" ? "space-between" : "flex-start",
    gap: gap,
  };

  return (
    <View style={[defaultContainerStyle, containerStyle]}>
      {data.map((item, index) => (
        <View
          key={index}
          style={[
            styles.legendItemContainer,
            {
              flexDirection: layout === "row" ? "row" : "row",
              alignItems: "center",
              justifyContent: "center",
              gap: gap,
            },
          ]}
        >
          <View
            style={[
              styles.circle,
              {
                backgroundColor: item.color,
                width: circleSize,
                height: circleSize,
                borderRadius: circleSize / 2,
              },
            ]}
          />
          <Text style={[defaultTextStyle, textStyle]}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  legendItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    borderRadius: wp(2),
  },
});

export default Legend;
