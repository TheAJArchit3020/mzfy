import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useReducer, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Name from "./registration/name";
import Age from "./registration/age";
import Button from "@components/reusable/button";
import { heightToDP, widthToDP } from "react-native-responsive-screens";
import Profession from "./registration/profession";
import Selectcurrency from "./registration/selectcurrency";
import Monthlyexpense from "./registration/monthlyexpense";

import Adddebts from "./registration/adddebts";

import IncomeDetails from "./registration/personalincome";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "@managers/routing";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { addUser } from "@redux/user/userSlice";

type navProps = NativeStackNavigationProp<RootStackParams>

type routeProps = RouteProp<RootStackParams, 'registrationlayoutscreen'>


const Registrationlayout: FC = () => {

  const route = useRoute<routeProps>();
  const navigation = useNavigation<navProps>();
  const dispatch = useDispatch<AppDispatch>();


  const userData = useSelector((state: RootState) => state.user.current)

  const isPresent = (v: any) =>
    v !== undefined && v !== null && !(typeof v === "string" && v.trim() === "");


  const EXPENSE_KEYS = ['investment', 'food', 'health', 'miscellaneous'] as const;

  const hasAnyExpenseAmount = (ebc: any) => {
    if (!ebc || typeof ebc !== 'object') return false;
    // true only if at least one category is > 0
    return EXPENSE_KEYS.some(k => Number(ebc?.[k]) > 0)
      || Object.values(ebc).some((v) => Number(v) > 0); // fallback if keys differ
  };

  const submitFormHandler = async () => {
    try {
      await dispatch(addUser(userData)).unwrap()
      navigation.navigate('selectstrategyscreen')
    } catch (err: any) {
      console.error("Error adding user:", err);
    }
  }

  const PAGES = [
    { id: 1, name: "name", Component: Name, title: "What's your name?" },
    { id: 2, name: "age", Component: Age, title: "What is your age?" },
    { id: 3, name: "profession", Component: Profession, title: "What is your profession?" },
    { id: 4, name: "selectcurrency", Component: Selectcurrency, title: "Select currency" },
    { id: 5, name: "IncomeDetails", Component: IncomeDetails, title: "What is your personal income?" },
    { id: 6, name: "monthlyexpense", Component: Monthlyexpense, title: "What is your monthly expenses?" },
    { id: 7, name: "loading", Component: Adddebts, title: "Add your debts" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(route?.params?.index || 0);
  const current = PAGES[selectedIndex];
  const CurrentPage = current.Component;

  const isStepValid = (stepName: (typeof PAGES)[number]["name"]) => {
    switch (stepName) {
      case "name":
        return isPresent(userData?.name);
      case "profession":
        return isPresent(userData?.profession);
      case "IncomeDetails":
        return isPresent(userData?.personalIncome);
      case "monthlyexpense":
        return hasAnyExpenseAmount(userData?.expenseByCategory);
      case "loading": {
        const d = userData?.debts;
        return Array.isArray(d) ? d.length > 0 : isPresent(d);
      }
      // ⬇️ No validation for these two:
      case "age":
      case "selectcurrency":
        return true;

      default:
        return true;
    }
  };

  const isCurrentStepValid = isStepValid(current.name);

  const goNext = () => {
    if (!isCurrentStepValid) return;
    if (current?.id === 6) {
      navigation.navigate('expensesoverviewscreen')
    } else {
      if (selectedIndex < PAGES.length - 1) {
        setSelectedIndex((i) => i + 1);
      } else {
        submitFormHandler();

      }
    }
  };


  const goBack = () => {
    if (selectedIndex > 0) {
      setSelectedIndex((i) => i - 1);
    } else {
      console.log("Already at first page");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#5145BC", "#2F2C4A", "#2B293E", "#272631", "#232323"]}
        locations={[0, 0.64, 0.76, 0.87, 1]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.headercontainer}>
          <View style={styles.headercontainer_content1}>
            <TouchableOpacity onPress={goBack}>
              <Image
                source={require("@images/backButton/arrow.png")}
                style={styles.backimage}
              />
            </TouchableOpacity>
            <Text style={styles.headercontainer_content1_text}>
              {current?.title}
            </Text>
          </View>
          <View style={styles.headercontainer_content2}>
            <Text style={styles.headercontainer_content2_text}>
              {selectedIndex + 1}/{7}
            </Text>
          </View>
        </View>

        <View style={styles.pageContainer}>
          <CurrentPage />
        </View>

        <View style={styles.buttonWrapper}>
          <Button onPress={goNext} style={styles.button} disabled={!isCurrentStepValid}>
            <Text style={styles.buttonText}>
              {selectedIndex < PAGES.length - 1 ? "Next" : "Done"}
            </Text>
          </Button>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Registrationlayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  backimage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  headercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: widthToDP(16),
    marginHorizontal: widthToDP(4),
  },
  headercontainer_content1: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headercontainer_content1_text: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Bold",
    marginTop: Platform.OS === 'android' ? -5 : 0
  },
  headercontainer_content2: {},
  headercontainer_content2_text: {
    color: "#fff",
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: 500,
  },
  pageContainer: {
    flex: 1,
    marginTop: heightToDP(3.5),
  },
  buttonWrapper: {
    paddingVertical: 16,
  },
  buttonText: {
    color: "#F7F7F7",
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#006FFF",
    paddingHorizontal: 20,
    width: "90%",
    alignSelf: "center",
    borderRadius: widthToDP(50),
    padding: widthToDP(4),
    marginBottom: heightToDP(3),
  },
});
