import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React, { FC, useState } from "react";
import Debtbalance from "@components/dashboard/debtbalance";
import Debtpaid from "@components/dashboard/debtpaid";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import SegmentButton from "@components/reusable/segmentbutton";
import Input from "@components/reusable/Input";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Payoffcard from "@components/payoffplan/payoffcard";


const inProgressDebts = [
  {
    name: "Car Loan",
    time: "2 years left",
    minamt: 5000,
    apr: 7.5,
    payoffprogress: 40,
  },
  {
    name: "Student Loan",
    time: "5 years left",
    minamt: 2000,
    apr: 5.2,
    payoffprogress: 60,
  },
  {
    name: "Home Loan",
    time: "15 years left",
    minamt: 15000,
    apr: 6.8,
    payoffprogress: 25,
  },
  {
    name: "Personal Loan",
    time: "3 years left",
    minamt: 3000,
    apr: 12.5,
    payoffprogress: 70,
  },
  {
    name: "Business Loan",
    time: "4 years left",
    minamt: 8000,
    apr: 9.2,
    payoffprogress: 45,
  },
  {
    name: "Education Loan",
    time: "6 years left",
    minamt: 4000,
    apr: 4.8,
    payoffprogress: 35,
  },
  {
    name: "Medical Loan",
    time: "1 year left",
    minamt: 6000,
    apr: 11.0,
    payoffprogress: 80,
  },
  {
    name: "Wedding Loan",
    time: "2.5 years left",
    minamt: 7000,
    apr: 10.5,
    payoffprogress: 55,
  },
  {
    name: "Renovation Loan",
    time: "3.5 years left",
    minamt: 4500,
    apr: 8.8,
    payoffprogress: 30,
  },
  {
    name: "Equipment Loan",
    time: "1.5 years left",
    minamt: 2500,
    apr: 13.2,
    payoffprogress: 65,
  },
];

const completedDebts = [
  {
    name: "Credit Card Debt",
    time: "Paid off in 2023",
    minamt: 0,
    apr: 15.0,
    payoffprogress: 100,
  },
  {
    name: "Small Personal Loan",
    time: "Paid off in 2022",
    minamt: 0,
    apr: 8.0,
    payoffprogress: 100,
  },
  {
    name: "Motorcycle Loan",
    time: "Paid off in 2023",
    minamt: 0,
    apr: 9.5,
    payoffprogress: 100,
  },
  {
    name: "Furniture Loan",
    time: "Paid off in 2022",
    minamt: 0,
    apr: 12.0,
    payoffprogress: 100,
  },
  {
    name: "Electronics Loan",
    time: "Paid off in 2023",
    minamt: 0,
    apr: 14.5,
    payoffprogress: 100,
  },
  {
    name: "Vacation Loan",
    time: "Paid off in 2022",
    minamt: 0,
    apr: 11.8,
    payoffprogress: 100,
  },
  {
    name: "Emergency Loan",
    time: "Paid off in 2023",
    minamt: 0,
    apr: 16.2,
    payoffprogress: 100,
  },
  {
    name: "Investment Loan",
    time: "Paid off in 2022",
    minamt: 0,
    apr: 7.8,
    payoffprogress: 100,
  },
  {
    name: "Tax Loan",
    time: "Paid off in 2023",
    minamt: 0,
    apr: 13.5,
    payoffprogress: 100,
  },
  {
    name: "Insurance Loan",
    time: "Paid off in 2022",
    minamt: 0,
    apr: 10.2,
    payoffprogress: 100,
  },
];

const DebtsScreen: FC = () => {


  const [searchKeyword, setSeacthKeyword] = useState("");
  const [selectedButton, setSelectedButton] = useState(0);

  return (
      <View style={styles.container}>
        <View style={styles.debtInfoContainer}>
          <Debtbalance />
          <Debtpaid />
        </View>

        <View style={styles.debtsListContainer}>
          <SegmentButton
            items={["InProgress(3)", "Completed(3)"]}
            onChange={(idx) => {
              setSelectedButton(idx);
            }}
            selectedIndex={selectedButton}
            containerStyle={styles.toggleButtonContainer}
          />
          <Input
            iconAbove={
              <MagnifyingGlassIcon
                size={wp(5)}
                color={"#747474"}
                style={{ marginTop: hp(0.8) }}
              />
            }
            onChangeContent={(val) => setSeacthKeyword(val)}
            value={searchKeyword}
            placeholder="Search"
            inputWrapperStyle={styles.searchBar}
            style={styles.searchInput}
            placeholderTextColor={"#747474"}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <Payoffcard data={selectedButton === 0 ? inProgressDebts : completedDebts} source={require("@assets/images/dashboard/rightarrow.png")} />
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.section6}
        // onPress={() => {
        //   navigation.navigate("debtadd");
        // }}
        >
          <Text style={styles.section6_text}>+</Text>
        </TouchableOpacity>
      </View>
  );
};

export default DebtsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
    marginBottom: hp(5)
  },
  debtInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5)
  },
  debtsListContainer: {
    backgroundColor: "#1E2D5E",
    height: hp(62),
    paddingVertical: hp(2),
    justifyContent: "flex-start",
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: "#C0C0C0",
    marginHorizontal: wp(5)
  },
  toggleButtonContainer: {
    width: 'auto',
    padding: wp(1.5),
    marginTop: wp(1),
    alignSelf: "flex-start",
    marginHorizontal: wp(4)
  },
  searchBar: {
    backgroundColor: "#C0C0C0",
    borderRadius: wp(10),
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.3),
    gap: wp(2),
    alignItems: "center",
    marginHorizontal: wp(4)
  },
  searchInput: {
    flex: 1,
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Bold",
    color: "#747474",
  },
  section6: {
    backgroundColor: "#006FFF",
    borderRadius: 25,
    width: 50,
    height: 50,
    position: "absolute",
    bottom: "0%",
    right: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  section6_text: {
    color: "#F7F7F7",
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 34,
    textAlign: "center",
    marginTop: -14,
  },
});
