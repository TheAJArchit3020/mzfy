// LineAreaChart.tsx
import React, { FC, useMemo } from "react";
import { View, Dimensions } from "react-native";
import Svg, {
  Defs, LinearGradient, Stop, Rect, Path, Circle, Text as SvgText, G,
} from "react-native-svg";

type RawPoint = { amount: number; dueDate: string };
type Point    = { label: string; value: number };

interface Props {
  width?: number;
  height?: number;
  /** <-- pass your server data here */
  rawData: RawPoint[];
  /** optional overrides; if omitted we auto-pick nice bounds */
  minY?: number;
  maxY?: number;
}

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const fmtLabel = (iso: string) => {
  const d = new Date(iso);
  const m = months[d.getUTCMonth()];
  const y = String(d.getUTCFullYear()).slice(-2); // "25"
  return `${m} ${y}`;
};

// pick “nice” axis limits & ticks (1/2/5 * 10^k steps)
const niceNumber = (range: number, round: boolean) => {
  const exp = Math.floor(Math.log10(range));
  const f = range / Math.pow(10, exp); // 1..10
  let nf;
  if (round) {
    if (f < 1.5) nf = 1;
    else if (f < 3) nf = 2;
    else if (f < 7) nf = 5;
    else nf = 10;
  } else {
    if (f <= 1) nf = 1;
    else if (f <= 2) nf = 2;
    else if (f <= 5) nf = 5;
    else nf = 10;
  }
  return nf * Math.pow(10, exp);
};

const niceBounds = (min: number, max: number, maxTicks = 6) => {
  const padding = (max - min) * 0.08 || Math.max(1, min * 0.08);
  let lo = min - padding, hi = max + padding;
  const range = niceNumber(hi - lo, false);
  const step  = niceNumber(range / (maxTicks - 1), true);
  const niceLo = Math.floor(lo / step) * step;
  const niceHi = Math.ceil(hi / step) * step;
  const ticks: number[] = [];
  for (let v = niceLo; v <= niceHi + 1e-9; v += step) ticks.push(v);
  return { min: niceLo, max: niceHi, ticks };
};

const LineAreaChart: FC<Props> = ({
  width = Dimensions.get("window").width - 50,
  height = 340,
  rawData,
  minY,
  maxY,
}) => {
  // 1) map incoming data -> {label,value}
  const data: Point[] = useMemo(
    () => rawData.map(d => ({ label: fmtLabel(d.dueDate), value: d.amount })),
    [rawData]
  );

  // 2) compute Y bounds & ticks (or use overrides)
  const stats = useMemo(() => {
    const vals = data.map(d => d.value);
    const localMin = Math.min(...vals);
    const localMax = Math.max(...vals);
    if (minY != null && maxY != null) {
      // build ticks around explicit bounds
      const { ticks } = niceBounds(minY, maxY);
      return { min: minY, max: maxY, ticks };
    }
    return niceBounds(localMin, localMax);
  }, [data, minY, maxY]);

  // layout
  const M = { top: 28, right: 24, bottom: 84, left: 72 };
  const W = width, H = height;
  const chartW = W - M.left - M.right;
  const chartH = H - M.top - M.bottom;
  const xStep = chartW / Math.max(1, data.length - 1);

  // scales
  const yToPx = (y: number) => {
    const t = (y - stats.min) / (stats.max - stats.min || 1);
    return M.top + chartH - t * chartH;
  };
  const xToPx = (i: number) => M.left + i * xStep;

  // paths
  const { linePath, areaPath, pts } = useMemo(() => {
    const pts = data.map((d, i) => [xToPx(i), yToPx(d.value)] as const);
    const line = pts.map(([x, y], i) => (i ? `L ${x} ${y}` : `M ${x} ${y}`)).join(" ");
    const baseY = M.top + chartH;
    const area = `${line} L ${pts[pts.length - 1][0]} ${baseY} L ${pts[0][0]} ${baseY} Z`;
    return { linePath: line, areaPath: area, pts };
  }, [data, chartH, M.top, xStep]);

  return (
    <View style={{ backgroundColor: "#262626", borderRadius: 16 }}>
      <Svg width={W} height={H}>

        <Defs>
          <LinearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#4A86F7" stopOpacity="0.9" />
            <Stop offset="100%" stopColor="#4A86F7" stopOpacity="0.15" />
          </LinearGradient>
        </Defs>

        {/* area + line */}
        <Path d={areaPath} fill="url(#area)" />
        <Path d={linePath} stroke="#FFFFFF" strokeWidth={2} fill="none" />

        {/* points */}
        <G>
          {pts.map(([x, y], i) => (
            <G key={i}>
              <Circle cx={x} cy={y} r={12} stroke="#FFFFFF" strokeWidth={1} fill="none" />
              <Circle cx={x} cy={y} r={6} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth={2} />
            </G>
          ))}
        </G>

        {/* X axis */}
        <Path
          d={`M ${M.left} ${M.top + chartH} L ${M.left + chartW} ${M.top + chartH}`}
          stroke="#FFFFFF"
          strokeWidth={1}
        />
        {/* right-pointing arrowhead */}
        <Path
          d={`M ${M.left + chartW} ${M.top + chartH} l 12 -6 l 0 12 Z`}
          fill="#FFFFFF"
        />

        {/* Y axis */}
        <Path
          d={`M ${M.left} ${M.top + chartH} L ${M.left} ${M.top}`}
          stroke="#FFFFFF"
          strokeWidth={1}
        />
        {/* up arrowhead */}
        <Path d={`M ${M.left} ${M.top} l -6 12 l 12 0 Z`} fill="#FFFFFF" />

        {/* Y tick labels */}
        {stats.ticks.map((t) => (
          <SvgText
            key={t}
            x={M.left - 26}
            y={yToPx(t) + 4}
            fill="#EDEDED"
            fontSize={14}
            fontWeight="600"
            textAnchor="end"
          >
            {t >= 1000 ? `${Math.round(t / 100) / 10}k` : `${t}`}
          </SvgText>
        ))}

        {/* X labels */}
        {data.map((d, i) => (
          <SvgText
            key={i}
            x={xToPx(i)}
            y={M.top + chartH + 30}
            fill="#EDEDED"
            fontSize={12}
            fontWeight="600"
            textAnchor="middle"
          >
            {d.label}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
};

export default LineAreaChart;
