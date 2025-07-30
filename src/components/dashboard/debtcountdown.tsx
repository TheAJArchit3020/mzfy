import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from '@components/reusable/card'

const Debtcountdown = () => {
    return (
        <Card style={styles.section_card} cardStyle={styles.section_card_inner}>
            <Text style={styles.section_card_text}>Debt free countdown</Text>
            <View style={styles.section_card_inner_content}>
                <View style={styles.section_card_inner_content_item}>
                    <Text style={styles.section_card_inner_content_item_text}>03</Text>
                    <Text style={styles.section_card_inner_content_item_text2}>Years</Text>
                </View>
                <View style={styles.section_card_inner_content_item}>
                    <Text style={styles.section_card_inner_content_item_text}>10</Text>
                    <Text style={styles.section_card_inner_content_item_text2}>Months</Text>
                </View>
                <View style={styles.section_card_inner_content_item}>
                    <Text style={styles.section_card_inner_content_item_text} >20</Text>
                    <Text style={styles.section_card_inner_content_item_text2}>Days</Text>
                </View>
            </View>
            <Text style={styles.section_card_text2}>Countdown to financial freedom</Text>
        </Card>
    )
}

export default Debtcountdown

const styles = StyleSheet.create({
    section_card:{},
    section_card_text: {
        color: '#fff',
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 16,
    },
    section_card_inner_content: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: '4%'
    },
    section_card_inner_content_item: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: '3%'
    },
    section_card_inner_content_item_text: {
        color: '#fff',
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 30,
    },
    section_card_inner_content_item_text2: {
        color: '#fff',
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 20,
    },
    section_card_text2: {
        color: '#fff',
        fontFamily: "PlusJakartaSans-Italic",
        fontSize: 12,
    },
    section_card_inner: {
        height: 'auto',
        justifyContent: "center"
    }
})