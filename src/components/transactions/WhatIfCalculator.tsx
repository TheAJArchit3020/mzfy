import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";

import Slider from "@react-native-community/slider";
interface WhatIfCalculatorProps {
  onExtraPaymentChange?: (amount: number) => void;
}

const WhatIfCalculator: FC<WhatIfCalculatorProps> = ({
  onExtraPaymentChange,
}) => {
  const [extraPayment, setExtraPayment] = useState(3000);
  const [savings, setSavings] = useState(3500);

  const handleSliderChange = (progress: number) => {
    const newAmount = Math.round(progress * 10000);
    setExtraPayment(newAmount);
    const calculatedSavings = Math.round(newAmount * 1.17);
    setSavings(calculatedSavings);
    onExtraPaymentChange?.(newAmount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>What if</Text>
      </View>

      <View style={styles.paymentSection}>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>You Pay extra</Text>
          <Text style={styles.paymentAmount}>
            ₹{extraPayment.toLocaleString()}/-
          </Text>
        </View>

        <View style={styles.sliderContainer}>
          <Slider
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={extraPayment / 100}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#006FFF"
            maximumTrackTintColor="#7F919E"
            thumbTintColor="#fff"
            style={styles.slider}
          />
        </View>
      </View>

      <View style={styles.savingsContainer}>
        <Text style={styles.savingsText}>
          You'll save: ₹{savings.toLocaleString()}.*
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: wp(5),
  },
  headerSection: {
    marginBottom: hp(2),
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
  },
  paymentSection: {
    marginBottom: hp(3),
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(1),
  },
  paymentLabel: {
    color: "#FFFFFF",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Regular",
  },
  paymentAmount: {
    color: "#FFFFFF",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
  },
  sliderContainer: {
    marginTop: hp(1),
  },
  slider: {
    height: hp(0.5),
  },
  savingsContainer: {
    backgroundColor: "#3A3A3A",
    borderRadius: wp(3),
    padding: wp(3),
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#C0C0C0",
  },
  savingsText: {
    color: "#FFFFFF",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
    textAlign: "center",
  },
});

export default WhatIfCalculator;
