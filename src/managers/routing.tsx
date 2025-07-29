import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from '@screens/dashboard';



export type RootStackParams = {
    dashboardscreen: undefined;
}


const Stack = createNativeStackNavigator<RootStackParams>();

const Routing: FC = () => {
    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="dashboardscreen"
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="dashboardscreen" component={DashboardScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routing;


