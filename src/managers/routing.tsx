import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FC } from "react";

import { NavigationContainer } from "@react-navigation/native";

import Layout from "@screens/layout";
import Particulardebtdetail from "@screens/particulardebtdetail";
import DebtAdd from "@screens/adddebt";
import Createcustomeplan from "@screens/createcustomplan";
import Createcustomplan from "@screens/createcustomplan";


export type RootStackParams = {
    layoutscreen: undefined
    adddebtscreen: undefined
    particulardebtdetailscreen: undefined
    createcustomplanscreen: undefined
};

const Stack = createNativeStackNavigator<RootStackParams>();

const Routing: FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="layoutscreen"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="layoutscreen" component={Layout} />
                <Stack.Screen name="adddebtscreen" component={DebtAdd} />
                <Stack.Screen name="particulardebtdetailscreen" component={Particulardebtdetail} />
                <Stack.Screen name="createcustomplanscreen" component={Createcustomplan} />


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routing;
