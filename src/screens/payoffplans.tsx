import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';

const PayoffplansScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text>PayoffplansScreen</Text>
    </View>
  );
};

export default PayoffplansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
