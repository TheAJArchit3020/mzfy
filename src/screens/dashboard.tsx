import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useState } from "react";

import Debtcountdown from "@components/dashboard/debtcountdown";
import Debtbalance from "@components/dashboard/debtbalance";
import Debtpaid from "@components/dashboard/debtpaid";
import Upcommingdebts from "@components/dashboard/upcommingdebts";
import Nextduedate from "@components/dashboard/nextduedate";
import Popup from "@components/reusable/popup";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "@managers/routing";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import UpcomingDebtsWithScrollbar from "@components/dashboard/upcommingdebts";

type navprops = NativeStackNavigationProp<RootStackParams>;

const DashboardScreen: FC = () => {

  const navigation = useNavigation<navprops>();
  const [show, setShow] = useState(false);

  const logpopupHandler = () => {
    setShow(true);
  };

  // ⏰ Get current hour
  const hour = new Date().getHours();

  // 📌 Determine greeting
  const getGreeting = () => {
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const upcommingdebtsList = [
    { name: "Car loan", amount: 20000, date: "Apr 5 2025" },
    { name: "Car loan", amount: 20000, date: "Apr 5 2025" },
    { name: "Car loan", amount: 20000, date: "Apr 5 2025" },
    { name: "Car loan", amount: 20000, date: "Apr 5 2025" },
    { name: "Car loan", amount: 20000, date: "Apr 5 2025" },
  ];

  const nextDueList = [
    { name: "Car loan", amount: 20000, date: "20/08/2025" },
    { name: "Bike loan", amount: 20000, date: "03/08/2025" },
    { name: "Home loan", amount: 20000, date: "20/09/2025" },
  ];
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollview}
      >
        <View style={styles.section1}>
          <View style={styles.section1_1}>
            <Text style={styles.section1_1_text}>
              Hey <Text style={styles.section1_1_span}>Sumit ,</Text>
            </Text>
            <Text style={styles.section1_1_text}>{getGreeting()}</Text>
          </View>
          <View style={styles.section1_2}>
            <Text style={styles.section1_2_text}>S</Text>
          </View>
        </View>

        <View style={styles.section2}>
          <Debtcountdown />
        </View>

        <View style={styles.section3}>{/* <Debtprogress />*/}</View>

        <View style={styles.section4}>
          <Debtbalance />
          <Debtpaid />
        </View>
        <View style={styles.section7}>
          <Nextduedate data={nextDueList} logpopupHandler={logpopupHandler} />
        </View>
        <View style={styles.section5}>
          <Text style={styles.section5_text}>Upcoming Transactions</Text>
          <UpcomingDebtsWithScrollbar data={upcommingdebtsList} style={styles.cardstyle1} />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.section6}
        onPress={() => {
          navigation.navigate("createcustomplanscreen");
        }}
      >
        <Text style={styles.section6_text}>+</Text>
      </TouchableOpacity>

      {/* log payment popup */}
      <Popup
        visible={show}
        title="Paid amount"
        onClose={() => setShow(false)}
        titleStyle={styles.popuptitle}
        containerStyle={styles.popupContainerStyle}
      >
        <View style={styles.inputgroup}>
          <Text style={styles.inputgroup_text}>{"\u20B9"}</Text>
          <TextInput style={styles.input} />
          <Text style={styles.inputgroup_text}>/-</Text>
        </View>
      </Popup>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    fontSize: 33,
    fontFamily: "PlusJakartaSans-Bold",
    color: "white",
  },
  section1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  section1_1_text: {
    fontFamily: "PlusJakartaSans-Italic",
    fontSize: 13,
    color: "#fff",
  },
  section1_1_span: {
    fontFamily: "PlusJakartaSans-Italic",
    fontSize: 13,
    color: "#EFCB3A",
  },
  section1_2_text: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: "#000",
  },
  section1_2: {
    backgroundColor: "#D9D9D9",
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  section1_1: {},
  section2: {
    margin: 20,
  },
  section3: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  section4: {
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section5: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  section5_text: {
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
    marginBottom: 10,
  },
  section6: {
    backgroundColor: "#006FFF",
    borderRadius: 25,
    width: 50,
    height: 50,
    position: "absolute",
    bottom: "6%",
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
  scrollview: {
    marginBottom: 10,
  },
  section7: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  inputgroup: {
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    gap: 10,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "red",
    flex: 1,
    padding: 10,
  },
  inputgroup_text: {
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
  },
  popuptitle: {
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  popupContainerStyle: {
    backgroundColor: "#2A2A2A",
  },

  cardstyle1: {
    overflow: "hidden"
  },

});
