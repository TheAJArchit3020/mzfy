<<<<<<< HEAD
import { StyleSheet, Text, View, ScrollView } from "react-native";
=======
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
>>>>>>> 5980a1971813680518bd92b7bedabf4f08c99324
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
import { useNavigation } from "@react-navigation/native";

const inProgressDebts = [
  {
    name: "Car Loan",
    time: "Completes on Jul 2 2026 (9 month 1 days)",
    minamt: 5000,
    apr: 7.5,
    payoffprogress: 40,
  },
  {
    name: "Student Loan",
    time: "Completes on Jul 2 2026 (9 month 1 days)",
    minamt: 2000,
    apr: 5.2,
    payoffprogress: 60,
  },
  {
    name: "Home Loan",
    time: "Completes on Jul 2 2026 (9 month 1 days)",
    minamt: 15000,
    apr: 6.8,
    payoffprogress: 25,
  },
  {
    name: "Personal Loan",
    time: "Completes on Jul 2 2026 (9 month 1 days)",
    minamt: 3000,
    apr: 12.5,
    payoffprogress: 70,
  },


];

const completedDebts = [
  {
    name: "Credit Card Debt",
     time: "Completes on Jul 2 2026 (9 month 1 days)",
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
     time: "Completes on Jul 2 2026 (9 month 1 days)",
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
     time: "Completes on Jul 2 2026 (9 month 1 days)",
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
     time: "Completes on Jul 2 2026 (9 month 1 days)",
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
     time: "Completes on Jul 2 2026 (9 month 1 days)",
    minamt: 0,
    apr: 13.5,
    payoffprogress: 100,
  },
  
];



const DebtsScreen: FC = () => {

  const navigation = useNavigation();
  const [searchKeyword, setSeacthKeyword] = useState("");
  const [selectedButton, setSelectedButton] = useState(0);

  return (
<<<<<<< HEAD
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <Payoffcard
              data={selectedButton === 0 ? inProgressDebts : completedDebts}
            />
          </ScrollView>
        </View>
=======
    <View style={styles.container}>
      <View style={styles.debtInfoContainer}>
        <Debtbalance />
        <Debtpaid />
>>>>>>> 5980a1971813680518bd92b7bedabf4f08c99324
      </View>

      <View style={styles.debtsListContainer}>
        <SegmentButton
          items={["InProgress (3)", "Completed (3)"]}
          onChange={(idx) => {
            setSelectedButton(idx);
          }}
          selectedIndex={selectedButton}
          containerStyle={styles.toggleButtonContainer}
        />
        <Input
          iconAbove={
            <MagnifyingGlassIcon
              size={wp(4)}
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
          style={{marginHorizontal: 10}}
        >
          <Payoffcard data={selectedButton === 0 ? inProgressDebts : completedDebts} source={require("@assets/images/dashboard/rightarrow.png")} onPress={() => navigation.navigate('particulardebtdetailscreen')} />
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.section6}
        onPress={() => {
          navigation.navigate("adddebtscreen");
        }}
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
<<<<<<< HEAD
    height: hp(65),
=======
    height: hp(62),
>>>>>>> 5980a1971813680518bd92b7bedabf4f08c99324
    paddingVertical: hp(2),
    justifyContent: "flex-start",
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: "#C0C0C0",
    marginHorizontal: wp(5)
  },
  toggleButtonContainer: {
<<<<<<< HEAD
    marginLeft: wp(5),
    justifyContent: "flex-start",
    width: wp(55),
    padding: wp(1.5),
=======
    width: 'auto',
    padding: wp(2),
>>>>>>> 5980a1971813680518bd92b7bedabf4f08c99324
    marginTop: wp(1),
    alignSelf: "flex-start",
    marginHorizontal: wp(3),
    paddingHorizontal:  wp(4),
  },
  searchBar: {
    marginHorizontal: wp(5),
    backgroundColor: "#C0C0C0",
    borderRadius: wp(10),
    // paddingHorizontal: wp(4),
    // paddingVertical: hp(0.3),
    gap: wp(1),
    alignItems: "center",
    marginHorizontal: wp(4),
    height: hp(4.5)
  },
  searchInput: {
    fontSize: wp(2.5),
    fontFamily: "PlusJakartaSans-Bold",
    color: "#747474",
    height: 40,
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
