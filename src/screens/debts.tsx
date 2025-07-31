import { StyleSheet, Text, View,ScrollView } from "react-native";
import React, { FC, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Debtbalance from "@components/dashboard/debtbalance";
import Debtpaid from "@components/dashboard/debtpaid";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import SegmentButton from "@components/reusable/segmentbutton";
import Input from "@components/reusable/Input";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Card from "@components/reusable/card";
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
    <LinearGradient
      colors={["#463C9F", "#3A346E", "#23234B", "#2B293E", "#272631"]}
      locations={[0, 0.64, 0.76, 0.87, 1]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.debtInfoContainer}>
          <Debtbalance />
          <Debtpaid />
        </View>

        <View style={styles.debtsListContainer}>
          <SegmentButton
            items={["InProgress", "Completed"]}
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
          <Payoffcard data={selectedButton === 0 ? inProgressDebts : completedDebts} />
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  );
};

export default DebtsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(8), //remove if not needed
    paddingHorizontal: wp(5),
    gap: hp(2),
  },
  debtInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: wp(5),
  },
  debtsListContainer: {
    backgroundColor: "#1E2D5E",
    height: hp(65),
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    justifyContent: "flex-start",
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: "#C0C0C0",
  },
  toggleButtonContainer: {
    justifyContent: "flex-start",
    width: wp(55),
    padding: wp(1.5),
    marginTop: wp(1),
    alignSelf: "flex-start",
  },
  searchBar: {
    backgroundColor: "#C0C0C0",
    borderRadius: wp(10),
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.3),
    gap: wp(2),
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Bold",
    color: "#747474",
  },
});
