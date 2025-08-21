import React, { FC, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
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
import Button from "@components/reusable/button";
import { paymentStatus } from "src/commonTypes";
import { RootStackParams } from "@managers/routing";
import { StackScreenProps } from "@react-navigation/stack";
import TextCard2 from "@components/reusable/textcard2";
import PieChartComponent from "@components/reusable/pieChart";
import Popup from "@components/reusable/popup";
import DonutChart from "../../src/DonutChart";
import Legend from "@components/reusable/Legend";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import {
  getTransactionData,
  logPayment,
} from "@redux/Transacttion/Transaction";
import { saveNoteApi } from "@managers/apis";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TransactionScreenProps = StackScreenProps<RootStackParams, "Transaction">;

const Transaction: FC<TransactionScreenProps> = ({ route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { transaction, loading, error } = useSelector(
    (state: RootState) => state.transaction
  );

  // State for transaction data
  const [transactionData, setTransactionData] = useState<any>({
    _id: "",
    user: "",
    debt: { _id: "", name: " " },
    openingBalance: 0,
    closingBalance: 0,
    paymentAmount: 0,
    principalComponent: 0,
    interestComponent: 0,
    dueDate: new Date().toISOString(),
    status: "upcoming",
    note: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  });

  const status: paymentStatus =
    (transactionData?.status as paymentStatus) || "upcoming";
  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState("");
  const [kbEnabled, setKbEnabled] = useState(false);
  const [note, setNote] = useState("");

  // Fetch transaction data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const transactionData = await dispatch(
      getTransactionData(route.params.id.toString())
    );
    setTransactionData(transactionData.payload.transaction);
    console.log("transactionData", transactionData);
  };

  // Update transaction data when API data is received

  useEffect(() => {
    console.log("transaction useEffect", transactionData);
  }, [transactionData]);

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
    setNote(note);
    // Add your note change logic here
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setAmount("");
  };

  useEffect(() => {
    console.log("trasaction", transaction);
  }, [transaction]);
  const handleConfirm = async () => {
    console.log("Confirmed amount:", amount);
    if(amount === "") return;
    try {
      await dispatch(
        logPayment({
          transactionId: transactionData._id,
          amount: Number(amount),
        })
      );

      fetchData();
    } catch (error) {
      console.error("Failed to log payment:", error);
    }
    setAmount("");
    setShowPopup(false);
  };

  // Keyboard handlers to toggle KeyboardAvoidingView
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKbEnabled(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKbEnabled(false)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Show loading state
  if (loading) {
    console.log("Loading state - transaction:", transaction);
    return (
      <LinearGradient
        colors={["#463C9F", "#3A346E", "#23234B", "#2B293E", "#272631"]}
        locations={[0, 0.64, 0.76, 0.87, 1]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Header title={"Loading..."} />
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading transaction data...</Text>
        </View>
      </LinearGradient>
    );
  }

  // Show error state
  if (error) {
    console.log("Error state - error:", error);
    return (
      <LinearGradient
        colors={["#463C9F", "#3A346E", "#23234B", "#2B293E", "#272631"]}
        locations={[0, 0.64, 0.76, 0.87, 1]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Header title={"Error"} />
        <View style={styles.container}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </LinearGradient>
    );
  }

  const handleSaveNote = async (note: string) => {
    console.log("Note api:", note);
    try {
      const storetoken = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${saveNoteApi}/${route.params.id}/save-note`,
        {
          note: note.toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${storetoken}`,
          },
        }
      );
      console.log("Note saved response:", response);
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"padding"}
      enabled={kbEnabled}
    >
      <LinearGradient
        colors={["#463C9F", "#3A346E", "#23234B", "#2B293E", "#272631"]}
        locations={[0, 0.64, 0.76, 0.87, 1]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Header title={transactionData.debt?.name || "Transaction"} />
        <View style={styles.main}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.contentSection}
          >
            <View style={styles.container}>
              <BalanceTransition
                openingBalance={transactionData?.openingBalance}
                closingBalance={transactionData?.closingBalance}
              />
              <View style={styles.transactionInfoContainer}>
                <TextCard2
                  text1={"Transaction Balance"}
                  text2={"₹"}
                  text3={transactionData.paymentAmount?.toString() || "0"}
                  text1style={styles.labelText}
                  text2style={styles.rupeeSymbol}
                  text3style={styles.amountText}
                  cardStyle={styles.textCardStyle}
                />
                <View
                  style={[
                    styles.textCardStyle,
                    {
                      borderWidth: 0.5,
                      borderColor: "#F7F7F7",
                      paddingHorizontal: wp(1.5),
                      padding: wp(0),
                    },
                  ]}
                >
                  <View style={styles.graphContainer}>
                    <DonutChart
                      data={[
                        {
                          value: transactionData.interestComponent,
                          label: `${transactionData.interestComponent?.toFixed(
                            0
                          )}%`,
                          color: "#DC143C",
                        },
                        {
                          value: transactionData.principalComponent,
                          label: `${transactionData.principalComponent?.toFixed(
                            0
                          )}%`,
                          color: "#006FFF",
                        },
                      ]}
                      radius={55}
                      donutStrokeWidth={10}
                      canvasWidth={25}
                      canvasHeight={20}
                      arcCornerRadius={0}
                      fontFamily="PlusJakartaSans-Bold"
                      labelFontSize={wp(3)}
                      lineStroke={3}
                      labelOffset={10}
                      centerText="Breakdown"
                      centerTextFontSize={wp(3)}
                      singleLineLabel={true}
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
                status={transactionData.status}
                date={
                  transactionData.dueDate
                    ? new Date(transactionData.dueDate).toLocaleDateString()
                    : "N/A"
                }
                amount={transactionData.paymentAmount || 0}
                onPress={handleCardPress}
              />
              <Note
                onNoteChange={handleNoteChange}
                initialNote={transactionData.note}
                saveNote={(note) => handleSaveNote(note)}
              />
              {/* <WhatIfCalculator onExtraPaymentChange={handleExtraPaymentChange} /> */}
            </View>

            <View style={styles.footer}>
              {transactionData.status === "paid" ? (
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
        </View>

        {/* Popup for Paid Amount */}
        <Popup
          visible={showPopup}
          onClose={handleClosePopup}
          onConfirm={handleConfirm}
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    gap: hp(2),
  },
  contentSection: {
    flex: 9,
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
    marginBottom: 0,
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
    marginBottom: 0,
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
    height: hp(22),
    justifyContent: "space-between",
    borderRadius: wp(7),
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
    width: wp(43),

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendContainer: {
    paddingHorizontal: wp(3),
    paddingBottom: hp(1),
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
  graphContainer: {
    height: "90%",
  },
  loadingText: {
    color: "#fff",
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Bold",
    textAlign: "center",
    marginTop: hp(20),
  },
  errorText: {
    color: "#fff",
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Bold",
    textAlign: "center",
    marginTop: hp(20),
  },
  footer: {
    paddingHorizontal: wp(5),
    marginVertical: hp(2),
    justifyContent: "center",
  },
});

export default Transaction;
