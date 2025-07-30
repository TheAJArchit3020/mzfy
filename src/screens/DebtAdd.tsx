import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";

interface componentNameProps {}

const DebtAdd: FC<componentNameProps> = () => {
  return (
    <View style={styles.container}>
      <Text>componentName</Text>
    </View>
  );
};

export default DebtAdd;

const styles = StyleSheet.create({
  container: {},
});
