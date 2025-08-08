import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { FC, useCallback, useMemo, useState } from "react";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "@managers/routing";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { fetchAllDebts } from "@redux/debts/debtsSlice";

type NavigationProp = NativeStackNavigationProp<RootStackParams>;



const DebtsScreen: FC = () => {


  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const [searchKeyword, setSeacthKeyword] = useState("");
  const [selectedButton, setSelectedButton] = useState(0);


  useFocusEffect(
    useCallback(() => {
      getAllDebtDetails();
    }, [])
  );

  const getAllDebtDetails = async () => {
    try {
      await dispatch(fetchAllDebts()).unwrap()
    } catch (err: any) {
      console.log("Error adding user:", err);
    }

  }


  const FETCHALLDEBTS = (useSelector((state: RootState) => state.debts.alldebts[0])) ?? {
    inProgressDebts: [],
    completedDebts: []
  };

  const inProgressList = FETCHALLDEBTS.inProgressDebts;
  const completedList = FETCHALLDEBTS.completedDebts;

  const lowerKeyword = searchKeyword.trim().toLowerCase();


  // memoize filtered arrays
  const filteredInProgress = useMemo(
    () =>
      inProgressList.filter((d: any) =>
        d.name.toLowerCase().includes(lowerKeyword)
      ),
    [inProgressList, lowerKeyword]
  );


  const filteredCompleted = useMemo(
    () =>
      completedList.filter((d: any) =>
        d.name.toLowerCase().includes(lowerKeyword)
      ),
    [completedList, lowerKeyword]
  );


    const visibleList =
    selectedButton === 0 ? filteredInProgress : filteredCompleted;


  // 4️⃣ build the two button labels
  const buttonLabels = [
    `In Progress (${inProgressList.length})`,
    `Completed   (${completedList.length})`,
  ]


  return (
    <View style={styles.container}>
      <View style={styles.debtInfoContainer}>
        <Debtbalance data={FETCHALLDEBTS} />
        <Debtpaid data={FETCHALLDEBTS} />
      </View>

      <View style={styles.debtsListContainer}>
        <SegmentButton
          items={buttonLabels}
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
          style={{ marginHorizontal: 10 }}
        >
          <Payoffcard
            data={visibleList}
            source={require("@assets/images/dashboard/rightarrow.png")}
            // onPress={() => navigation.navigate("particulardebtdetailscreen")}
          />
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.section6}
        onPress={() => {
          navigation.navigate("adddebtscreen", {
            screen: 2
          });
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
    marginBottom: hp(5),
  },
  debtInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
  },
  debtsListContainer: {
    backgroundColor: "#1E2D5E",
    height: hp(62),
    paddingVertical: hp(2),
    justifyContent: "flex-start",
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: "#C0C0C0",
    marginHorizontal: wp(5),
  },
  toggleButtonContainer: {
    width: "auto",
    padding: wp(2),
    marginTop: wp(1),
    alignSelf: "flex-start",
    marginHorizontal: wp(3),
    paddingHorizontal: wp(4),
  },
  searchBar: {
    marginHorizontal: wp(5),
    backgroundColor: "#C0C0C0",
    borderRadius: wp(10),
    // paddingHorizontal: wp(4),
    // paddingVertical: hp(0.3),
    gap: wp(1),
    alignItems: "center",
    //marginHorizontal: wp(4),
    height: hp(4.5),
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
