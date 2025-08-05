// DonutChart.tsx
import React, { FC } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import Svg, {
  G,
  Path,
  Polyline,
  Text as SvgText,
  TSpan,
} from "react-native-svg";
import { pie, arc, PieArcDatum, Arc as ArcGenerator } from "d3-shape";

export interface DonutDataItem {
  value: number;
  color: string;
  label: string;
  line1: string;
  line2: string;
  emoji: string;
}

export interface DonutChartProps {
  data: DonutDataItem[];
  radius?: number;
  donutStrokeWidth?: number;
  labelOffset?: number;
  lineStroke?: number;
  canvasWidth?: number;
  canvasHeight?: number;
  lineColor?: string;
  labelFontColor?: string;
  labelFontSize?: number;
  centerText?: string;
  centerTextFontSize?: number;
  centerTextColor?: string;
  fontFamily?: string;
  arcCornerRadius?: number;
  style?: StyleProp<ViewStyle>;
}

const DonutChart: FC<DonutChartProps> = ({
  data,
  radius = 100,
  donutStrokeWidth = 20,
  labelOffset = 60,
  lineStroke = 1,
  canvasWidth = 100,
  canvasHeight = 100,
  labelFontColor = "#fff",
  labelFontSize = 12,
  lineColor = "#fff",
  centerText,
  centerTextFontSize = 16,
  centerTextColor = "#fff",
  fontFamily,
  arcCornerRadius = 4,
  style,
}) => {
  type ArcDatum = PieArcDatum<DonutDataItem>;
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const sectionArcs: ArcDatum[] = pie<DonutDataItem>()
    .value((d) => d.value)
    .sort(null)(data);

  const arcGen: ArcGenerator<any, ArcDatum> = arc<ArcDatum>()
    .innerRadius(radius - donutStrokeWidth)
    .outerRadius(radius)
    .cornerRadius(arcCornerRadius);

  const donutSize = radius * 1.5 + donutStrokeWidth * 2;

  const buffer = labelOffset + 20;

  const svgWidth = donutSize + buffer * 0.3 + canvasWidth;
  const svgHeight = donutSize + canvasHeight;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2.5;

  return (
    <View style={[{ overflow: "visible" }, style]}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <G transform={`translate(${centerX}, ${centerY})`}>
          {sectionArcs.map((slice, i) => {
            console.log("slice index: ", slice.index);
            console.log("slice start Angle: ", slice.startAngle);
            console.log("slice end Angle: ", slice.endAngle);
            const midAngle = (slice.startAngle + slice.endAngle) / 2 - 1.5708;

            console.log("mid Angle: ", midAngle);

            const midRadius = radius;
            const x0 = Math.cos(midAngle) * midRadius;
            const y0 = Math.sin(midAngle) * midRadius;

            const c = 15;
            const x1 = Math.cos(midAngle) * (radius + c);
            const y1 = Math.sin(midAngle) * (radius + c);

            const isRight = x1 >= 0;
            const x2 = x1 + (isRight ? labelOffset : -labelOffset);
            const y2 = y1;

            const pct = (slice.value / total) * 100;
            const text = `${data[i].label}`;
            const line1 = `${data[i].line1}`;
            const line2 = `${data[i].line2}`;
            return (
              <G key={i}>
                <Path d={arcGen(slice) || undefined} fill={data[i].color} />

                <Polyline
                  points={[
                    [x0, y0],
                    [x1, y1],
                    [x2, y2],
                  ]
                    .map((p) => p.join(","))
                    .join(" ")}
                  fill="none"
                  stroke={lineColor}
                  strokeWidth={lineStroke}
                />

                <SvgText
                  x={x2 + (isRight ? 4 : -4)}
                  y={y2}
                  fontSize={labelFontSize}
                  fill={labelFontColor}
                  textAnchor={isRight ? "start" : "end"}
                  alignmentBaseline="middle"
                >
                  <TSpan x={x2 + (isRight ? 4 : -4)} dy="0">
                    {line1}
                  </TSpan>
                  <TSpan x={x2 + (isRight ? 4 : -4)} dy={labelFontSize}>
                    {line2}
                  </TSpan>
                </SvgText>
              </G>
            );
          })}
          {centerText && (
            <SvgText
              x={0}
              y={0}
              fontSize={centerTextFontSize}
              fill={centerTextColor}
              textAnchor="middle"
              alignmentBaseline="middle"
              {...(fontFamily ? { fontFamily: fontFamily } : {})}
            >
              {centerText}
            </SvgText>
          )}
        </G>
      </Svg>
    </View>
  );
};

export default DonutChart;
