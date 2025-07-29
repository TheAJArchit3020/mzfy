import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';

const DebtsScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text>DebtsScreen</Text>
    </View>
  );
};

export default DebtsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
