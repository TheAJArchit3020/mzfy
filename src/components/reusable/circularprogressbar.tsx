import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Svg, { Circle, G } from 'react-native-svg'

interface Debt {
  id: string
  payoffPct: number
  tagColor: string
}

interface Props {
  size?: number     // px
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

  // build segments for each debt slice
  const segments = useMemo(() => {
    const debts = data?.inProgressDebts ?? []
    let cumulative = 0
    return debts.map(d => {
      const pct = Math.max(0, Math.min(d.payoffPct, 100))
      const length = (pct / 100) * circumference
      const offset = circumference - cumulative - length
      cumulative += length
      return { color: d.tagColor, length, offset }
    })
  }, [data, circumference])

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* rotate so 0% is at top */}
        <G rotation="-90" origin={`${size/2}, ${size/2}`}>  
          {/* background ring */}
          <Circle
            cx={size/2}
            cy={size/2}
            r={radius}
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* debt segments */}
          {segments.map((seg, i) => (
            <Circle
              key={i}
              cx={size/2}
              cy={size/2}
              r={radius}
              stroke={seg.color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${seg.length} ${circumference}`}
              strokeDashoffset={seg.offset}
            />
          ))}
        </G>
      </Svg>

      {/* center label */}
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentText: {
    fontSize: 13,
    color: '#E63A30',
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
})
