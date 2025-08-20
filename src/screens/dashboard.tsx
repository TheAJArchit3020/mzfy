import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState, useMemo } from "react";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { fetchDashboardSummary } from "@redux/dashBoard/dashboard";
import { AppDispatch, RootState } from "@redux/store";
import Debtcountdown from "@components/dashboard/debtcountdown";

import Debtbalance from "@components/dashboard/debtbalance";
import Debtpaid from "@components/dashboard/debtpaid";
import Nextduedate from "@components/dashboard/nextduedate";
import Popup from "@components/reusable/popup";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "@managers/routing";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import UpcomingDebtsWithScrollbar from "@components/dashboard/upcommingdebts";
import Input from "@components/reusable/Input";
import { widthToDP } from "react-native-responsive-screens";
import Debtprogress from "@components/dashboard/debtprogress";
import { dashboard } from "../managers/apis";
import { DebtCountDownType } from "src/commonTypes";
import { DebtChartDataItem, DonutDataItem } from "src/commonTypes";
import Aimodal from "@components/chatai/aimodal";

type navprops = NativeStackNavigationProp<RootStackParams>;

const DashboardScreen: FC = () => {


  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<navprops>();
  const [show, setShow] = useState(false);

  const dashboardData = useSelector((state: RootState) => state.dashBoard);
  const userDetails = useSelector((state: RootState) => state.user.items[0]);


  const [debtFreeDate, setDebtFreeDate] = useState<DebtCountDownType>({
    year: 0,
    month: 0,
    day: 0,
  });

  const [donutData, setDonutData] = useState<DonutDataItem[]>([]);


  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, []);

  useEffect(() => {
    adjustedDate();
    transformDebtData(dashboardData?.data?.balanceByDebt || []);
  }, [dashboardData]);

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



  const adjustedDate = () => {
    if (!dashboardData.data?.debtFreeDate) return null;

    const today = new Date();
    const debtFreeDate = new Date(dashboardData.data.debtFreeDate);

    let yearDiff = debtFreeDate.getFullYear() - today.getFullYear();
    let monthDiff = debtFreeDate.getMonth() - today.getMonth();
    let dayDiff = debtFreeDate.getDate() - today.getDate();

    if (dayDiff < 0) {
      // borrow days from previous month
      const daysInPrevMonth = new Date(
        debtFreeDate.getFullYear(),
        debtFreeDate.getMonth(),
        0
      ).getDate();
      dayDiff += daysInPrevMonth;
      monthDiff--;
    }

    if (monthDiff < 0) {
      monthDiff += 12;
      yearDiff--;
    }

    const date = {
      year: yearDiff,
      month: monthDiff,
      day: dayDiff,
    };

    setDebtFreeDate(date);
  };

  const transformDebtData = (debts: DebtChartDataItem[]) => {
    const formatted = debts.map((debt) => ({
      value: parseFloat(debt.balance),
      color: debt.color,
    }));

    setDonutData(formatted);
  };




  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollview}
      >
        <View style={styles.section1}>
          <View style={styles.section1_1}>
            <Text style={styles.section1_1_text}>
              Hey <Text style={styles.section1_1_span}>{userDetails?.name} ,</Text>
            </Text>
            <Text style={styles.section1_1_text}>{getGreeting()}</Text>
          </View>
          <TouchableOpacity
            style={styles.section1_2}
            onPress={() => {
              navigation.navigate("profilescreen");
            }}
          >
            {/* <Image
              source={require("@images/dashboard/rightarrow.png")}
              style={{ width: 20, height: 20 }}
            /> */}
            <Text style={styles.section1_2_text}>{userDetails?.name?.charAt(0).toUpperCase()}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section2}>
          <Debtcountdown
            data={{
              year: debtFreeDate.year,
              month: debtFreeDate.month,
              day: debtFreeDate.day,
            }}
          />
        </View>

        <View style={styles.section3}>
          {<Debtprogress percent={dashboardData.data?.payoffPct || 0} />}
        </View>

        <View style={styles.section4}>
          <Debtbalance data={donutData} />

          <Debtpaid data={dashboardData.data || 0} />
        </View>
        <View style={styles.section7}>
          <Nextduedate
            data={
              dashboardData.data?.upcomingTransactions.slice(
                0,
                dashboardData.data?.balanceByDebt.length
              ) || []
            }
            logpopupHandler={logpopupHandler}
          />
        </View>
        <View style={styles.section5}>
          <Text style={styles.section5_text}>Upcoming Transactions</Text>
          <UpcomingDebtsWithScrollbar
            data={dashboardData?.data?.upcomingTransactions || []}
            style={styles.cardstyle1}
          />
        </View>
      </ScrollView>

      <Aimodal style={styles.aiContainer} imagestyle={styles.aiimagestyle} />

      {/* <TouchableOpacity
        style={styles.section6}
        onPress={() => {
          navigation.navigate("adddebtscreen", {
            screen: 2
          });
        }}
      >
        <Text style={styles.section6_text}>+</Text>
      </TouchableOpacity> */}

      {/* log payment popup */}
      <Popup
        visible={show}
        title="Paid amount"
        onClose={() => setShow(false)}
        titleStyle={styles.popuptitle}
        containerStyle={styles.popupContainerStyle}
      >
        <Input
          value={""}
          onChangeContent={(val) => console.log(val)}
          keyboardType="numeric"
          textHeader="₹"
          children={
            <Text
              style={{
                color: "#fff",
                fontSize: widthToDP(4.5),
                marginLeft: widthToDP(1),
              }}
            >
              /-
            </Text>
          }
          style={styles.popupinput}
          inputWrapperStyle={styles.inputWrapperStyle}
        />
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
    overflow: "hidden",
  },
  popupinput: {
    marginHorizontal: 5,
  },
  inputWrapperStyle: {
    marginHorizontal: 20,
  },
  aiContainer: {
    zIndex: 1,
    backgroundColor: "transparent",
  },
  aiimagestyle: {
    width: 70,
    height: 70,
  },
});
