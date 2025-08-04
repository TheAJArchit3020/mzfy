import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { paymentStatus } from "src/commonTypes";
import { NavigationContainer } from "@react-navigation/native";
<<<<<<< HEAD
import DashboardScreen from "@screens/dashboard";
import DebtAdd from "@screens/DebtAdd";
import Test from "@screens/Test";
import DebtsScreen from "@screens/debts";
import Transaction from "@screens/transaction";
import Expenses from "@screens/Expenses";
import LogExpense from "@screens/LogExpense";
import catagoryManagement from "@screens/catagoryManagement";
import IncomeDetails from "@screens/RegistartionScreens/income";
export type RootStackParams = {
  dashboardscreen: undefined;
  debtadd: undefined;
  DebtsScreen: undefined;
  test: undefined; // added to test reusable components
  Transaction: { status: paymentStatus };
  Expenses: undefined;
  LogExpense: undefined;
  catagoryManagement: undefined;
  IncomeDetails: undefined;
=======

import Layout from "@screens/layout";
import Particulardebtdetail from "@screens/particulardebtdetail";
import DebtAdd from "@screens/adddebt";
import Createcustomeplan from "@screens/createcustomplan";
import Createcustomplan from "@screens/createcustomplan";
import Registrationlayout from "@screens/registrationlayout";
import Selectstrategy from "@screens/selectstrategy";


export type RootStackParams = {
    layoutscreen: undefined
    adddebtscreen: undefined
    particulardebtdetailscreen: undefined
    createcustomplanscreen: undefined
    registrationlayoutscreen: undefined
    selectstrategyscreen: undefined
>>>>>>> 5980a1971813680518bd92b7bedabf4f08c99324
};

const Stack = createNativeStackNavigator<RootStackParams>();

const Routing: FC = () => {
<<<<<<< HEAD
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogExpense"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="dashboardscreen" component={DashboardScreen} />
        <Stack.Screen name="debtadd" component={DebtAdd} />
        <Stack.Screen name="DebtsScreen" component={DebtsScreen} />
        <Stack.Screen name="Transaction" component={Transaction} />
        <Stack.Screen name="Expenses" component={Expenses} />
        <Stack.Screen name="LogExpense" component={LogExpense} />
        <Stack.Screen name="IncomeDetails" component={IncomeDetails} />
        <Stack.Screen name="test" component={Test} />
        <Stack.Screen
          name="catagoryManagement"
          component={catagoryManagement}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
=======


    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="layoutscreen"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="registrationlayoutscreen" component={Registrationlayout} />
                <Stack.Screen name="layoutscreen" component={Layout} />

                <Stack.Screen name="adddebtscreen" component={DebtAdd} />
                <Stack.Screen name="particulardebtdetailscreen" component={Particulardebtdetail} />
                <Stack.Screen name="createcustomplanscreen" component={Createcustomplan} />
                <Stack.Screen name="selectstrategyscreen" component={Selectstrategy} />

            </Stack.Navigator>
        </NavigationContainer>
    );
>>>>>>> 5980a1971813680518bd92b7bedabf4f08c99324
};

export default Routing;
