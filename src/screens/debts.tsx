import { StyleSheet, Text, View } from "react-native";
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
