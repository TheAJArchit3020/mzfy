import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Card from '@components/reusable/card'
import Circularprogressbar from '@components/reusable/circularprogressbar'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import Dashboarddonutgraph from '@components/dashboard/dashboarddonutgraph'


interface DebtItemProps {
    data: any,
    balance?: any
}

const Debtbalance: FC<DebtItemProps> = ({ data, balance }) => {

    return (
        <Card style={styles.section_card} cardStyle={styles.section_card_inner}>
            <Dashboarddonutgraph data={data} balanceamount={balance?.data?.totalBalance} />
            <View style={styles.section_card_inner_content_item3} >
                <Text style={styles.section_card_text}>Balance</Text>
                <Image style={styles.image} source={require('@images/dashboard/balanceicon.png')} />
            </View>
        </Card>
    )
}



export default Debtbalance;

const styles = StyleSheet.create({
    section_card: {
        width: "48%",
        height: 168,
        borderWidth: 0.5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    section_card_text: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 14,
    },
    section_card_inner_content: {
        gap: 20,
        justifyContent: "center",
        paddingVertical: 10,
    },
    section_card_inner_content_item: {
        flexDirection: "column",
        gap: ".5%",
        alignItems: "center",
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
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 14,
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
    section_card_inner_content_item3: {
        flexDirection: "row",
        alignItems: "center",
        gap: "4%",
        justifyContent: "center"
    },
    donut_chart_container: {},
});
