import Amounttext from "@components/reusable/amounttext";
import { RootState } from "@redux/store";
import React, { FC, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { useSelector } from "react-redux";

type Slice = { value: number; color: string };

interface Props {
  data?: Slice[];
  width?: number;
  balanceamount?: number | string;
  /** visual gap between segments in degrees (set 0 for no gaps) */
  gapAngle?: number;
}

const Dashboarddonutgraph: FC<Props> = ({
  width = 180,
  data = [],
  balanceamount,
  gapAngle = 1.5,
}) => {
  const selectedCurrency = useSelector(
    (s: RootState) => s.user.items[0]?.selectedCurrency
  );

  const size = width * 0.6;               // donut diameter
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Keep only positive values; coerce & sanitize
  const slices = useMemo(
    () =>
      (data ?? [])
        .map(d => ({ value: Math.max(0, Number(d.value) || 0), color: d.color || "#ccc" }))
        .filter(d => d.value > 0),
    [data]
  );

  const total = useMemo(
    () => slices.reduce((sum, s) => sum + s.value, 0),
    [slices]
  );

  // Precompute arc lengths and a constant gap between segments
  const segments = useMemo(() => {
    if (total <= 0 || slices.length === 0) return [];

    // gap length along the circle (convert degrees → arc length)
    const gapLen = slices.length > 1 ? (circumference * (gapAngle / 360)) : 0;
    const totalGap = gapLen * (slices.length > 1 ? slices.length : 0);

    // Raw lengths proportional to value
    const raw = slices.map(s => (s.value / total) * circumference);

    // Scale all lengths so sum(lengths) + totalGap = circumference
    const rawSum = raw.reduce((a, b) => a + b, 0);
    const usable = Math.max(0, circumference - totalGap);
    const scale = rawSum > 0 ? (usable / rawSum) : 0;

    // Build segments with start offsets
    let cumulative = 0;
    return raw.map((len, i) => {
      const length = Math.max(0, len * scale);
      const startOffset = cumulative;          // where this segment starts
      cumulative += length + gapLen;           // move pointer for next segment
      return {
        color: slices[i].color,
        length,
        startOffset,
        gapLen
      };
    });
  }, [slices, total, circumference, gapAngle]);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" originX={size / 2} originY={size / 2}>
          {/* Base track */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#ffffff"
            strokeOpacity={0.25}
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Multi-color segments */}
          {segments.map((seg, i) => {
            if (seg.length <= 0) return null;

            // Single dash (segment) followed by the rest of the circle as gap
            const dashArray = [seg.length, Math.max(0, circumference - seg.length)];
            // Position so the dash spans [startOffset, startOffset + length]
            const dashOffset = Math.max(0, circumference - seg.startOffset - seg.length);

            return (
              <Circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeLinecap="butt"           // avoid end-cap overlap
                strokeDasharray={dashArray}     // IMPORTANT: [length, remainder]
                strokeDashoffset={dashOffset}   // IMPORTANT: position the dash
                fill="transparent"
              />
            );
          })}
        </G>
      </Svg>

      <View style={styles.centerText}>
        <Amounttext
          text={`${selectedCurrency} ${balanceamount ?? 0}`}
          style={styles.text}
        />
      </View>
    </View>
  );
};

export default Dashboarddonutgraph;

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", flex: 1 },
  centerText: { position: "absolute", justifyContent: "center", alignItems: "center" },
  text: { fontSize: 16, fontFamily: "PlusJakartaSans-Bold", color: "red", marginHorizontal: 20 },
});
