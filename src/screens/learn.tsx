import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';

const LearnScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text>LearnScreen</Text>
    </View>
  );
};

export default LearnScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
