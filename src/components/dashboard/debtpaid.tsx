import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Card from '@components/reusable/card'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'

interface DebtItemProps {
  data: any
}

const Debtpaid: FC<DebtItemProps> = ({ data }) => {

  const userDetails = useSelector((state: RootState) => state.user?.items[0]);


  return (
    <Card style={styles.section_card} cardStyle={styles.section_card_inner}>
      <View style={styles.section_card_inner_content}>
        <View style={styles.section_card_inner_content_item}>
          <Text style={styles.section_card_text}>Debt paid</Text>
          <Text style={styles.section_card_text2}>{userDetails?.selectedCurrency}&nbsp;
            <Text style={styles.section_card_span}>
              {Number(data?.totalPaid ?? data?.totalDebtPaid ?? 0).toLocaleString('en-IN')}
            </Text>
          </Text>
        </View>
      </View>
    </Card>
  )
}

export default Debtpaid;

const styles = StyleSheet.create({
  section_card: {
    width: "48%",
    height: 168,
    padding: 20,
    justifyContent: "center",
  },
  section_card_text: {
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
  },
  section_card_inner_content: {
    // gap: 20,
    // justifyContent: "center",
    // paddingVertical: 10
  },
  section_card_inner_content_item: {
    flexDirection: "column",
    gap: 32,
  },
  section_card_inner_content_item_text: {
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 30,
  },
  section_card_inner_content_item_text2: {
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 20,
  },
  section_card_text2: {
    color: "#00D600",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 30,
  },
  section_card_span: {
    color: "#00D600",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
  },
  section_card_inner: {
    height: "auto",
    justifyContent: "center",
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  section_card_inner_content_item2: {},
});
