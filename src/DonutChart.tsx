// DonutChart.tsx
import React, { FC, useRef } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import Svg, {
  G,
  Path,
  Polyline,
  Text as SvgText,
  TSpan,
} from "react-native-svg";
import { pie, arc, PieArcDatum, Arc as ArcGenerator } from "d3-shape";
import { DonutDataItem } from "./commonTypes";

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
  showLabel?: boolean;
  singleLineLabel?: boolean;
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
  showLabel = true,
  singleLineLabel = false,
  style,
}) => {
  type ArcDatum = PieArcDatum<DonutDataItem>;
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const lastOffsetRef = useRef(0);
  const sectionArcs: ArcDatum[] = pie<DonutDataItem>()
    .value((d) => d.value)
    .sort(null)(data);

  const arcGen: ArcGenerator<any, ArcDatum> = arc<ArcDatum>()
    .innerRadius(radius - donutStrokeWidth)
    .outerRadius(radius)
    .cornerRadius(arcCornerRadius)
    .padAngle(0.02)
    .padRadius(radius);

  const donutSize = radius * 2 + donutStrokeWidth * 2;

  const buffer = labelOffset + 20;

  const svgWidth = donutSize + buffer * 0.3 + canvasWidth;
  const svgHeight = donutSize + canvasHeight;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;

  console.log("pieChart Data: ", data);
  return (
    <View style={[{ overflow: "visible" }, style]}>
      <Svg width={svgWidth} height={svgHeight}>
        <G transform={`translate(${centerX}, ${centerY})`}>
          {sectionArcs.map((slice, i) => {
            // Modiefied bleow logic to prevent lable overlaps if all values are 0
            let midAngle = (slice.startAngle + slice.endAngle) / 2 - 1.5708;
            let prevOffset = lastOffsetRef.current;
            let currentOffset = prevOffset + 0.5;
            lastOffsetRef.current = currentOffset;
            midAngle += currentOffset;

            console.log("mid Angle: ", midAngle);

            const midRadius = radius;
            const x0 = Math.cos(midAngle) * midRadius;
            const y0 = Math.sin(midAngle) * midRadius;

            const c = 6;
            const x1 = Math.cos(midAngle) * (radius + c);
            const y1 = Math.sin(midAngle) * (radius + c);

            const isRight = x1 >= 0;
            const x2 = x1 + (isRight ? labelOffset : -labelOffset);
            const y2 = y1;

            const pct = (slice.value / total) * 100;
            const text = `${data[i].label}`;
            const line1 = `${data[i].line1}`;
            const line2 = `${data[i].line2}`;

            console.log("slice", slice);
            return (
              <G key={i}>
                <Path d={arcGen(slice) || undefined} fill={data[i].color} />
                {showLabel && (
                  <>
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
                      {...(fontFamily ? { fontFamily: fontFamily } : {})}
                    >
                      {singleLineLabel ? (
                        <TSpan x={x2 + (isRight ? 4 : -4)} dy="0">
                          {text}
                        </TSpan>
                      ) : (
                        <>
                          <TSpan x={x2 + (isRight ? 4 : -4)} dy="0">
                            {line1}
                          </TSpan>
                          <TSpan x={x2 + (isRight ? 4 : -4)} dy={labelFontSize}>
                            {line2}
                          </TSpan>
                        </>
                      )}
                    </SvgText>
                  </>
                )}
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
