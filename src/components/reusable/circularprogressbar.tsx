import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Svg, { Circle, G } from 'react-native-svg'

interface Debt {
  id: string
  payoffPct: number
  tagColor: string
}
interface Props {
  size?: number
  strokeWidth?: number
  data?: {
    totalBalance: number
    inProgressDebts: Debt[]
  }
}

const CircularProgressbar: React.FC<Props> = ({
  size = 120,
  strokeWidth = 10,
  data
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const debts = data?.inProgressDebts ?? []

  // Normalize so all segments fill the full circle
  const segments = useMemo(() => {
    if (!debts.length) return []
    const total = debts.reduce((s, d) => s + Math.max(0, d.payoffPct), 0)
    // If total is 0, nothing to draw
    if (total <= 0) return []

    let acc = 0
    return debts.map(d => {
      const pct = Math.max(0, d.payoffPct) / total // now these sum to 1
      const length = pct * circumference
      const offset = circumference - acc - length
      acc += length
      return { color: d.tagColor, length, offset }
    })
  }, [debts, circumference])

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Start at 12 o'clock */}
        <G transform={`rotate(-90, ${size / 2}, ${size / 2})`}>
          {/* background track (optional) */}
          <Circle
            cx={size/2}
            cy={size/2}
            r={radius}
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* solid, contiguous slices that fill 100% */}
          {segments.map((seg, i) => (
            <Circle
              key={i}
              cx={size/2}
              cy={size/2}
              r={radius}
              stroke={seg.color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="butt"           // avoids gaps between slices
              strokeDasharray={`${seg.length} ${circumference}`}
              strokeDashoffset={seg.offset}
            />
          ))}
        </G>
      </Svg>

      <View style={styles.label}>
        <Text style={styles.percentText}>
          ₹ {Number(data?.totalBalance ?? 0).toLocaleString('en-IN')}
        </Text>
      </View>
    </View>
  )
}

export default CircularProgressbar

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  label: { position: 'absolute', justifyContent: 'center', alignItems: 'center' },
  percentText: {
    fontSize: 13,
    color: '#E63A30',
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
})
