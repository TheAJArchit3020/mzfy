import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FC } from "react";

import Layout from "@screens/layout";
import Particulardebtdetail from "@screens/particulardebtdetail";
import DebtAdd from "@screens/adddebt";
import Createcustomplan from "@screens/createcustomplan";
import Registrationlayout from "@screens/registrationlayout";
import Selectstrategy from "@screens/selectstrategy";
import Profile from "@screens/profile";
import Login from "@screens/login";
import Paywall from "@screens/paywall";
import Splash from "@screens/splash";
import Intro from "@screens/intro";
import ExpensesOverView from "@screens/registration/expensesOverView";
import AllExpenses from "@screens/allExpenses";
import LogExpense from "@screens/LogExpense";
import CategoryManagement from "@screens/catagoryManagement";
import Transaction from "@screens/transaction"; import Pennieaichat from "@screens/pennieaichat";
import Feedback from "@screens/Feedback";




export type RootStackParams = {
  splashscreen: undefined;
  introscreen: undefined;
  layoutscreen: undefined;
  expensesoverviewscreen: undefined;
  adddebtscreen: { screen: number };
  particulardebtdetailscreen: { id: any; name: any };
  createcustomplanscreen: undefined;
  registrationlayoutscreen: { index: number };
  selectstrategyscreen: undefined;
  profilescreen: undefined;
  loginscreen: undefined;
  paywallscreen: undefined;
  AllExpenses: undefined;
  LogExpense: undefined;
  CategoryManagement: undefined;
  Transaction: { id: string };
  pennieaichatscreen: undefined;
  feedbackscreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const Routing: FC = () => {
  return (

    <Stack.Navigator
      initialRouteName="splashscreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="splashscreen" component={Splash} />
      <Stack.Screen name="introscreen" component={Intro} />
      <Stack.Screen
        name="registrationlayoutscreen"
        component={Registrationlayout}
      />
      <Stack.Screen
        name="expensesoverviewscreen"
        component={ExpensesOverView}
      />

      <Stack.Screen name="layoutscreen" component={Layout} />

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
      <Stack.Screen name="profilescreen" component={Profile} />
      <Stack.Screen name="loginscreen" component={Login} />
      <Stack.Screen name="paywallscreen" component={Paywall} />
      <Stack.Screen name="AllExpenses" component={AllExpenses} />
      <Stack.Screen name="LogExpense" component={LogExpense} />
      <Stack.Screen
        name="CategoryManagement"
        component={CategoryManagement}
      />
      <Stack.Screen name="Transaction" component={Transaction} />
      <Stack.Screen
        name="pennieaichatscreen"
        component={Pennieaichat}
      />
      <Stack.Screen
        name="feedbackscreen"
        component={Feedback}
      />
    </Stack.Navigator>

  );
};

export default Routing;
