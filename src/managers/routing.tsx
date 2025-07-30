import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from '@screens/dashboard';
import Layout from '@screens/layout';



export type RootStackParams = {
    layoutscreen: undefined;
}


const Stack = createNativeStackNavigator<RootStackParams>();

const Routing: FC = () => {
    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="layoutscreen"
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="layoutscreen" component={Layout} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routing;


