import React, { FC } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import Svg, {
  G,
  Path,
  Line,
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
  Polygon,
} from "react-native-svg";
import * as d3 from "d3-shape";
import * as scale from "d3-scale";

export interface LineChartPoint {
  label: string;
  value: number;
}

export interface CustomLineChartProps {
  data: any[];
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

const CustomLineChart: FC<CustomLineChartProps> = ({
  data,
  width = 350,
  height = 250,
  style,
}) => {
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };

  const xScale = scale
    .scalePoint()
    .domain(data.map((d) => d.label))
    .range([margin.left, width - margin.right]);

  const yMax = Math.max(...data.map((d) => d.value));
  const yMin = Math.min(...data.map((d) => d.value));

  const yScale = scale
    .scaleLinear()
    .domain([yMin - 1000, yMax + 1000])
    .range([height - margin.bottom, margin.top]);

  // Area under line
  const area = d3
    .area<LineChartPoint>()
    .x((d) => xScale(d.label)!)
    .y0(yScale(yMin - 1000))
    .y1((d) => yScale(d.value))
    .curve(d3.curveMonotoneX)(data);

  // Line path
  const line = d3
    .line<LineChartPoint>()
    .x((d) => xScale(d.label)!)
    .y((d) => yScale(d.value))
    .curve(d3.curveMonotoneX)(data);

  return (
    <View style={style}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#4C96F7" stopOpacity={0.9} />
            <Stop offset="100%" stopColor="#1a3d6d" stopOpacity={0.6} />
          </LinearGradient>
        </Defs>

        <G>
          {/* Area under line */}
          <Path d={area || ""} fill="url(#gradientFill)" />

          {/* Line */}
          <Path d={line || ""} stroke="#4C96F7" strokeWidth={2} fill="none" />

          {/* Circles */}
          {data.map((d, i) => (
            <Circle
              key={i}
              cx={xScale(d.label)}
              cy={yScale(d.value)}
              r={8}
              fill="#000"
              stroke="#fff"
              strokeWidth={2}
            />
          ))}

          {/* X Axis */}
          <Line
            x1={margin.left}
            y1={height - margin.bottom}
            x2={width - margin.right + 15}
            y2={height - margin.bottom}
            stroke="#fff"
            strokeWidth={1}
          />
          {/* X Arrow */}
          <Polygon
            points={`${width - margin.right + 15},${height - margin.bottom} 
                     ${width - margin.right + 8},${height - margin.bottom - 5}
                     ${width - margin.right + 8},${height - margin.bottom + 5}`}
            fill="#fff"
          />

          {/* Y Axis */}
          <Line
            x1={margin.left}
            y1={height - margin.bottom}
            x2={margin.left}
            y2={margin.top - 15}
            stroke="#fff"
            strokeWidth={1}
          />
          {/* Y Arrow */}
          <Polygon
            points={`${margin.left},${margin.top - 15}
                     ${margin.left - 5},${margin.top - 5}
                     ${margin.left + 5},${margin.top - 5}`}
            fill="#fff"
          />

          {/* X Labels */}
          {data.map((d, i) => (
            <SvgText
              key={`x-${i}`}
              x={xScale(d.label)}
              y={height - margin.bottom + 15}
              fontSize="12"
              fill="#fff"
              textAnchor="middle"
            >
              {d.label}
            </SvgText>
          ))}

          {/* Y Labels */}
          {yScale.ticks(6).map((t, i) => (
            <SvgText
              key={`y-${i}`}
              x={margin.left - 10}
              y={yScale(t)}
              fontSize="12"
              fill="#fff"
              textAnchor="end"
              alignmentBaseline="middle"
            >
              {t >= 1000 ? `${t / 1000}k` : t}
            </SvgText>
          ))}
        </G>
      </Svg>
    </View>
  );
};

export default CustomLineChart;
