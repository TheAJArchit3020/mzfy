import React, { FC, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput } from "react-native";
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
import { RootStackParams } from "@managers/routing";
import { StackScreenProps } from "@react-navigation/stack";
import TextCard2 from "@components/reusable/textcard2";
import PieChartComponent from "@components/reusable/pieChart";
import Popup from "@components/reusable/popup";
import DonutChart from "../../src/DonutChart";
import Legend from "@components/reusable/Legend";

type TransactionScreenProps = StackScreenProps<RootStackParams, "Transaction">;

const Transaction: FC<TransactionScreenProps> = ({ route }) => {
  const status: paymentStatus = route?.params?.status ?? "paid";
  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState("");

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

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setAmount("");
  };

  const handleConfirmAmount = () => {
    console.log("Confirmed amount:", amount);
    // Add your amount confirmation logic here
    // You can update the transaction status, save to database, etc.
    setAmount("");
    setShowPopup(false);
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
          <View style={styles.transactionInfoContainer}>
            <TextCard2
              text1={"Transaction Balance"}
              text2={"₹"}
              text3={"6000"}
              text1style={styles.labelText}
              text2style={styles.rupeeSymbol}
              text3style={styles.amountText}
              cardStyle={styles.textCardStyle}
            />
            <View
              style={[
                styles.textCardStyle,
                {
                  borderWidth: 1,
                  borderColor: "#fff",
                  paddingHorizontal: wp(3),
                  paddingTop: wp(0),
                },
              ]}
            >
              <View style={styles.graphContainer}>
                <DonutChart
                  data={[
                    { value: 87, label: "87%", color: "#006FFF" },
                    { value: 13, label: "13%", color: "#DC143C" },
                  ]}
                  canvasHeight={hp(5)}
                  fontFamily="PlusJakartaSans-Bold"
                  labelFontSize={wp(7)}
                  lineStroke={3}
                />
              </View>
              <Legend
                data={[
                  { name: "Interest", color: "#DC143C" },
                  { name: "Principle", color: "#006FFF" },
                ]}
                layout="row"
                containerStyle={styles.legendContainer}
                textStyle={styles.legendText}
              />
            </View>
          </View>
          <StatusDueCard
            status={status}
            date="24/07/2025"
            amount={25000}
            onPress={handleCardPress}
          />
          <Note onNoteChange={handleNoteChange} />
          <WhatIfCalculator onExtraPaymentChange={handleExtraPaymentChange} />
          {status === "paid" ? (
            <Button style={styles.editButton} onPress={handleShowPopup}>
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
            <Button onPress={handleShowPopup}>
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

      {/* Popup for Paid Amount */}
      <Popup
        visible={showPopup}
        onClose={handleClosePopup}
        title="Paid amount"
        containerStyle={styles.popupContainer}
        titleStyle={styles.popupTitle}
        buttonText="OK"
        color1="#00C853"
        color2="#B2FF59"
        buttonTextStyle={styles.popupButtonText}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.rupeeSymbolInput}>₹</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder=""
            placeholderTextColor="#666"
            keyboardType="numeric"
            autoFocus
          />
          <Text style={styles.slashText}>/-</Text>
        </View>
      </Popup>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    gap: hp(2),
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#006FFF",
    borderRadius: wp(10),
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
    paddingVertical: hp(1.5),
    alignItems: "center",
    marginBottom: hp(5),
  },
  logButtonText: {
    color: "#222",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
  },
  transactionInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelText: {
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Bold",
    color: "#fff",
  },
  rupeeSymbol: {
    fontSize: wp(10),
    fontFamily: "PlusJakartaSans-Bold",
    color: "#C62623",
  },
  amountText: {
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Bold",
    color: "#C62623",
  },
  textCardStyle: {
    backgroundColor: "#2A2A2A",
    height: hp(20),
    justifyContent: "space-between",
    borderRadius: wp(7),
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
    width: wp(40),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendContainer: {
    paddingHorizontal: wp(3),
  },
  legendText: {
    color: "#fff",
    fontSize: wp(2),
  },
  // Popup styles
  popupContainer: {
    backgroundColor: "#2A2A2A",
  },
  popupTitle: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Bold",
    marginVertical: hp(1.5),
    marginLeft: wp(4),
  },
  popupButtonText: {
    color: "#222",
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Bold",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: wp(3),
    marginHorizontal: wp(3),
    paddingHorizontal: wp(4),
  },
  rupeeSymbolInput: {
    color: "#fff",
    fontSize: wp(5),
    fontFamily: "PlusJakartaSans-Bold",
    marginRight: wp(2),
  },
  amountInput: {
    flex: 1,
    color: "#fff",
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Regular",
  },
  slashText: {
    color: "#fff",
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Regular",
    marginLeft: wp(2),
  },
  graphContainer: {},
});

export default Transaction;
