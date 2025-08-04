import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FC } from "react";

import { NavigationContainer } from "@react-navigation/native";

import Layout from "@screens/layout";
import Particulardebtdetail from "@screens/particulardebtdetail";
import DebtAdd from "@screens/adddebt";
import Createcustomplan from "@screens/createcustomplan";
import Registrationlayout from "@screens/registrationlayout";
import Selectstrategy from "@screens/selectstrategy";
import Profile from "@screens/profile";
import Login from "@screens/login";
import Paywall from "@screens/paywall";


export type RootStackParams = {
    layoutscreen: undefined
    adddebtscreen: undefined
    particulardebtdetailscreen: undefined
    createcustomplanscreen: undefined
    registrationlayoutscreen: undefined
    selectstrategyscreen: undefined
    profilescreen: undefined
    loginscreen: undefined
    paywallscreen: undefined
};

const Stack = createNativeStackNavigator<RootStackParams>();

const Routing: FC = () => {


    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="createcustomplanscreen"
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
                <Stack.Screen name="profilescreen" component={Profile} />
                <Stack.Screen name="loginscreen" component={Login} />
                <Stack.Screen name="paywallscreen" component={Paywall} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routing;
