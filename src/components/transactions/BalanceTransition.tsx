import React, { FC } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";

interface BalanceTransitionProps {
  openingBalance: number;
  closingBalance: number;
}

const BalanceTransition: FC<BalanceTransitionProps> = ({
  openingBalance,
  closingBalance,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.balanceRow}>
        <View style={styles.balanceSection}>
          <Text style={styles.label}>Opening Balance</Text>
          <Text style={styles.amount}>₹{openingBalance.toLocaleString()}</Text>
        </View>

        <View style={styles.arrowContainer}>
          <Image
            source={require("../../assets/images/seperateTransaction/Arrow.png")}
            style={styles.arrowImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.balanceSection}>
          <Text style={styles.label}>Closing Balance</Text>
          <Text style={styles.amount}>₹{closingBalance.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2A2A2A",
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: "#C0C0C0",
    padding: wp(4),
  },
  balanceRow: {
    flexDirection: "row",
    paddingVertical: hp(2),
    justifyContent: "space-between",
  },
  balanceSection: {
    alignItems: "flex-start",
    gap: wp(2),
  },
  label: {
    color: "#FFFFFF",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Regular",
    marginBottom: hp(0.5),
  },
  amount: {
    color: "#FFFFFF",
    fontSize: wp(6),
    fontFamily: "PlusJakartaSans-Bold",
    fontWeight: "bold",
  },
  arrowContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp(2),
  },
  arrowImage: {
    width: wp(15),
    height: wp(7.5),
  },
});

export default BalanceTransition;
