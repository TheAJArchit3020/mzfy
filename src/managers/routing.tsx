import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { paymentStatus } from "src/commonTypes";
import { NavigationContainer } from "@react-navigation/native";
import DashboardScreen from "@screens/dashboard";
import DebtAdd from "@screens/DebtAdd";
import Test from "@screens/Test";
import DebtsScreen from "@screens/debts";
import Transaction from "@screens/transaction";
export type RootStackParams = {
  dashboardscreen: undefined;
  debtadd: undefined;
  DebtsScreen: undefined;
  test: undefined; // added to test reusable components
  Transaction: { status: paymentStatus };
};

const Stack = createNativeStackNavigator<RootStackParams>();

const Routing: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Transaction"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="dashboardscreen" component={DashboardScreen} />
        <Stack.Screen name="debtadd" component={DebtAdd} />
        <Stack.Screen name="DebtsScreen" component={DebtsScreen} />
        <Stack.Screen name="Transaction" component={Transaction} />
        <Stack.Screen name="test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routing;
