import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FC } from "react";

import { NavigationContainer } from "@react-navigation/native";
import DashboardScreen from "@screens/dashboard";
import DebtAdd from "@screens/DebtAdd";
import Test from "@screens/Test";
import DebtsScreen from "@screens/debts";
export type RootStackParams = {
  dashboardscreen: undefined;
  debtadd: undefined;
  DebtsScreen: undefined;
  test: undefined; // added to test reusable components
};

const Stack = createNativeStackNavigator<RootStackParams>();

const Routing: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DebtsScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="dashboardscreen" component={DashboardScreen} />
        <Stack.Screen name="debtadd" component={DebtAdd} />
        <Stack.Screen name="DebtsScreen" component={DebtsScreen} />
        <Stack.Screen name="test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routing;
