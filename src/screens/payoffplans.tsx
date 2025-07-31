import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import Strategycard from '@components/payoffplan/strategycard';
import ProgressBar from '@components/reusable/progressbar';
import Payoffcard from '@components/payoffplan/payoffcard';

const PayoffplansScreen: FC = () => {

  const data = [
    { name: 'Car Loan', minamt: 500, apr: '2.5%', payoffprogress: 5.5, time: 'Completes on Jul 2 2026 (9 month 1 days)' },
    { name: 'House Loan', minamt: 500, apr: '9.5%', payoffprogress: 25.5, time: 'Completes on Jul 2 2026 (9 month 1 days)' },
    { name: 'Bike Loan', minamt: 500, apr: '10.5%', payoffprogress: 45.5, time: 'Completes on Jul 2 2026 (9 month 1 days)' },
  ]
  return (
    <View style={styles.container}>
      <Strategycard title={'Debt Snowball'} subtitle={'Debt Snowball'} />
      <View style={{ marginTop: 22 }}>
        <Payoffcard data={data} source={require('@images/payoffplan/rightarrowwhite.png')} />
      </View>
    </View>
  );
};

export default PayoffplansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
