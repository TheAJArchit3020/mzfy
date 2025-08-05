import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { paymentStatus } from "src/commonTypes";
import { NavigationContainer } from "@react-navigation/native";
import DashboardScreen from "@screens/dashboard";
import DebtAdd from "@screens/adddebt";
import Test from "@screens/Test";
import DebtsScreen from "@screens/debts";
import Transaction from "@screens/transaction";
import Expenses from "@screens/Expenses";
import LogExpense from "@screens/LogExpense";
import catagoryManagement from "@screens/catagoryManagement";
import IncomeDetails from "@screens/registration/personalincome";
import AddDebts from "@screens/registration/adddebts";

import Layout from "@screens/layout";
import Particulardebtdetail from "@screens/particulardebtdetail";
import Createcustomeplan from "@screens/createcustomplan";
import Createcustomplan from "@screens/createcustomplan";
import Registrationlayout from "@screens/registrationlayout";
import Selectstrategy from "@screens/selectstrategy";
import AllExpenses from "@screens/allExpenses";

import Intro from "@screens/intro";
import Splash from "@screens/splash";
import TransactionScreen from "@screens/transaction";

export type RootStackParams = {
  Intro: undefined;
  dashboardscreen: undefined;
  adddebtscreen: undefined;
  DebtsScreen: undefined;
  particulardebtdetailscreen: undefined;
  createcustomplanscreen: undefined;
  selectstrategyscreen: undefined;
  test: undefined; // added to test reusable components
  Transaction: { status: paymentStatus };
  Expenses: undefined;
  LogExpense: undefined;
  catagoryManagement: undefined;
  IncomeDetails: undefined;
  layoutscreen: undefined;
  registrationlayoutscreen: undefined;
  Splash: undefined;
  AddDebts: undefined;
  AllExpenses: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const Routing: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AllExpenses"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen
          name="registrationlayoutscreen"
          component={Registrationlayout}
        />
        <Stack.Screen name="layoutscreen" component={Layout} />
        <Stack.Screen name="Transaction" component={Transaction} />
        <Stack.Screen name="adddebtscreen" component={DebtAdd} />
        <Stack.Screen
          name="particulardebtdetailscreen"
          component={Particulardebtdetail}
        />
        <Stack.Screen
          name="createcustomplanscreen"
          component={Createcustomplan}
        />
        <Stack.Screen name="selectstrategyscreen" component={Selectstrategy} />
        <Stack.Screen name="LogExpense" component={LogExpense} />
        <Stack.Screen
          name="catagoryManagement"
          component={catagoryManagement}
        />
        <Stack.Screen name="AllExpenses" component={AllExpenses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routing;
