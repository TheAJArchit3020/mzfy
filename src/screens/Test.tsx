import React, { FC } from "react";
import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import IncomeDetails from "./RegistartionScreens/income";
const Test: FC = () => {
  return (
       <LinearGradient
         colors={["#463C9F", "#3A346E", "#23234B", "#2B293E", "#272631"]}
         locations={[0, 0.64, 0.76, 0.87, 1]}
         style={{ flex: 1 }}
         start={{ x: 0, y: 0 }}
         end={{ x: 0, y: 1 }}
        
       >
        <IncomeDetails/>

       </LinearGradient>
  );
};

export default Test;
