import React, { FC, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Header from "@components/reusable/header";
import StatusDueCard from "@components/transactions/statusDueCard";
import BalanceTransition from "@components/transactions/BalanceTransition";
import WhatIfCalculator from "@components/transactions/WhatIfCalculator";
import Note from "@components/transactions/Note";
import LinearGradient from "react-native-linear-gradient";
import { PencilIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import Button from "@components/reusable/Button";
import { paymentStatus } from "src/commonTypes";
interface TransactionProps {
  status: paymentStatus;
}

const Transaction: FC<TransactionProps> = ({ status = "paid" }) => {
  const handleCardPress = () => {
    console.log("Card pressed");
    // Add your card press logic here
  };

  const handleExtraPaymentChange = (amount: number) => {
    console.log("Extra payment changed:", amount);
    // Add your extra payment change logic here
  };

  const handleNoteChange = (note: string) => {
    console.log("Note saved:", note);
    // Add your note change logic here
  };

  return (
    <LinearGradient
      colors={["#463C9F", "#3A346E", "#23234B", "#2B293E", "#272631"]}
      locations={[0, 0.64, 0.76, 0.87, 1]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Header title={"Car Loan"} />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.container}>
          <BalanceTransition openingBalance={82500} closingBalance={76300} />
          <StatusDueCard
            status={status}
            date="24/07/2025"
            amount={25000}
            onPress={handleCardPress}
          />
          <Note onNoteChange={handleNoteChange} />
          <WhatIfCalculator onExtraPaymentChange={handleExtraPaymentChange} />
          {status === "paid" ? (
            <Button style={styles.editButton} onPress={() => {}}>
              <View style={styles.buttonContent}>
                <PencilIcon
                  color="#fff"
                  size={wp(4.5)}
                  style={{ marginRight: wp(2) }}
                />
                <Text style={styles.editButtonText}>Edit Payment</Text>
              </View>
            </Button>
          ) : (
            <Button onPress={() => {}}>
              <LinearGradient
                colors={["#00C853", "#B2FF59"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.logButton}
              >
                <View style={styles.buttonContent}>
                  <PlusCircleIcon
                    color="#222"
                    size={wp(4.5)}
                    style={{ marginRight: wp(2) }}
                  />
                  <Text style={styles.logButtonText}>Log payment</Text>
                </View>
              </LinearGradient>
            </Button>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#006FFF",
    borderRadius: wp(10),
    marginTop: hp(2),
    paddingVertical: hp(1.5),
    alignItems: "center",
    marginBottom: hp(5),
  },
  editButtonText: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
  },
  logButton: {
    backgroundColor: "#B2FF59",
    borderRadius: wp(10),
    marginTop: hp(2),
    paddingVertical: hp(1.5),
    alignItems: "center",
    marginBottom: hp(5),
  },
  logButtonText: {
    color: "#222",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
  },
});

export default Transaction;
