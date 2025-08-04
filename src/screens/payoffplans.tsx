import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { FC, useState } from 'react';
import Strategycard from '@components/payoffplan/strategycard';
import Payoffcard from '@components/payoffplan/payoffcard';
import TextCard from '@components/reusable/textcard';
import UpcomingDebtsWithScrollbar from '@components/dashboard/upcommingdebts';
import Button from '@components/reusable/button';
import GraphComponent from '@components/reusable/graph';
import TextCard2 from '@components/reusable/textcard2';
import Popup from '@components/reusable/popup';
import StrategyRadioCard from '@components/payoffplan/strategymodal';
import DraggablePayoffcard from '@components/payoffplan/dragablepayoffcard';


const PayoffplansScreen: FC = () => {

  const [show, setShow] = useState(false);

  const strategypopupHandler = () => {
    setShow(true);
  };

  const strategies = [
    {
      title: 'Debt Avalanche',
      subtitle: 'Prioritize highest interest rate',
      advantage: 'Fastest payoff and least interest',
      timeToPayoff: '28 Days',
      interestSaved: '₹1,500',
      value: 'avalanche',
    },
    {
      title: 'Debt Snowball',
      subtitle: 'Prioritize lowest balance first',
      advantage: 'The most quick wins',
      timeToPayoff: '2 Days',
      interestSaved: '₹1,500',
      value: 'snowball',
    },
    {
      title: 'Custom',
      subtitle: 'Customized Plan',
      advantage: 'Customized Plan',
      timeToPayoff: '3 yrs 2 mos',
      interestSaved: '₹1,500',
      value: 'custom',
    },
  ];

  const [choice, setChoice] = useState<string | null>(null);


  const data = [
    { id: 1, name: 'Car Loan', minamt: 500, apr: '2.5%', payoffprogress: 5.5, time: 'Completes on Jul 2 2026 (9 month 1 days)' },
    { id: 2, name: 'House Loan', minamt: 500, apr: '9.5%', payoffprogress: 25.5, time: 'Completes on Jul 2 2026 (9 month 1 days)' },
    { id: 3, name: 'Bike Loan', minamt: 500, apr: '10.5%', payoffprogress: 45.5, time: 'Completes on Jul 2 2026 (9 month 1 days)' },
  ]

  const upcommingdebtsList = [
    { name: "Car loan", amount: 20000, date: "Apr 5 2025" },
    { name: "Car loan", amount: 20000, date: "Apr 5 2025" },
    { name: "Car loan", amount: 20000, date: "Apr 5 2025" },
    { name: "Car loan", amount: 20000, date: "Apr 5 2025" },
    { name: "Car loan", amount: 20000, date: "Apr 5 2025" },
  ];
  return (
    <>

      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.container}>

          {/* section1 */}
          <Strategycard title={'Debt Snowball'} subtitle={'Debt Snowball'} onPress={strategypopupHandler} />

          {/* section2 */}
          <View style={styles.cardcontainer}>
            <View style={styles.cardgroup}  >
              <TextCard2 text1={'Estimated payoff'} text2={'Mar'} text3={'2027'} text1style={styles.text1} text2style={styles.text2_1} text3style={styles.text2_2} cardStyle={styles.cardstyle}></TextCard2>

              <TextCard text1={'Months'} text2={'42'} text1style={styles.text1} text2style={styles.text2} cardStyle={styles.cardstyle} ></TextCard>
            </View>
            <View style={styles.cardgroup2}>
              <TextCard text1={'Estimated payoff'} text2={'₹. 80,000/-'} text1style={styles.text1} text2style={styles.text3} cardStyle={styles.cardstyle2} ></TextCard>
              <TextCard text1={'You save'} text2={'₹. 12,000/-'} text1style={styles.text1} text2style={styles.text3} cardStyle={styles.cardstyle2} ></TextCard>
            </View>
          </View>

          {/* section3 */}
          <View style={styles.cardcontainer2}>
            <Text style={styles.cardcontainer2_title}>Step wise Plan</Text>
            <UpcomingDebtsWithScrollbar data={upcommingdebtsList} style={styles.payoffcard} showicon={false} />
          </View>
          {/* section4 */}
          <View style={styles.cardcontainer3}>
            <Text style={styles.cardcontainer3_title}>Order Wise Debt payoff</Text>
            <View style={styles.cardcontainer3_inner}>
              <Payoffcard data={data} source={require('@images/payoffplan/rightarrowwhite.png')}  />
            </View>
          </View>

          {/* <View style={styles.cardcontainer3}>
            <View style={styles.cardcontainer3_content}>
              <Text style={styles.cardcontainer3_title}>Order Wise Debt payoff</Text>
              <View style={styles.info_content}>
                <Image source={require('@images/payoffplan/info.png')} style={styles.infoimage} />
                <Text style={styles.info_text}>You can Arrange debts your way</Text>
              </View>
            </View>
            <View style={styles.cardcontainer3_inner}>
              <DraggablePayoffcard data={data} source={require('@images/payoffplan/edit.png')} />
            </View>
          </View> */}


          {/* section5 */}
          <View style={styles.cardcontainer4}>
            <Text style={styles.cardcontainer4_title}>Debt Reduction Timeline</Text>
            <View style={styles.cardcontainer4_inner}>
              <GraphComponent />
            </View>
          </View>

          {/* section6 */}
          <Button style={styles.button} >
            <Image source={require('@images/payoffplan/pdf.png')} style={styles.buttonimage} />
            <Text style={styles.buttontext}>Export pdf</Text>
          </Button>
        </View>
      </ScrollView>
    
    </>
  );
};

export default PayoffplansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 30
  },
  cardcontainer: {
    flexDirection: "column",
    gap: 32
  },
  cardgroup: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardgroup2: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardstyle: {
    padding: 20,
    flexDirection: "column",
    gap: 30
  },
  cardstyle2: {
    padding: 20,
    flexDirection: "column",
    gap: 15
  },
  text1: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold'
  },
  text2: {
    color: '#fff',
    fontSize: 40,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: "center"

  },
  text3: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  text2_1: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: "center"
  },
  text2_2: {
    color: '#fff',
    fontSize: 40,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: "center"
  },
  cardcontainer2: {
    marginHorizontal: 20,
    flexDirection: "column",
    gap: 25
  },
  cardcontainer3: {
    marginHorizontal: 20,
    flexDirection: "column",
    gap: 25
  },

  cardcontainer3_inner: {
    marginHorizontal: 0
  },

  cardcontainer2_title: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
  },

  cardcontainer3_title: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
  },

  cardcontainer4_title: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
  },

  buttonimage: {
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  button: {
    backgroundColor: "#DC143C",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    padding: 14,
    marginHorizontal: 20,
    gap: 10,
    marginVertical: 40

  },
  buttontext: {
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14
  },
  cardcontainer4: {
    marginHorizontal: 20,
    flexDirection: "column",
    gap: 25
  },
  cardcontainer4_inner: {},
  popupContainerStyle: {
    backgroundColor: "#2A2A2A",
    width: '90%',
  },
  popuptitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  inputgroup: {
    padding: 10,
    flexDirection: 'column',
  },
  inputgroup_text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  labelStyle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',

  },
  containerStyle: {
    paddingHorizontal: 20
  },
  descriptionStyle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  buttonTextStyle: {
    color: '#fff'
  },
  infoimage: {
    width: 12,
    height: 12,
    resizeMode: "contain"
  },
  cardcontainer3_content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  info_text: {
    color: '#fff',
    fontSize: 9,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  info_content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3
  },
  payoffcard:{
    overflow:"hidden"
  }

});
