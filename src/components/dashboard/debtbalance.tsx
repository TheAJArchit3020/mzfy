import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from '@components/reusable/card'
import Circularprogressbar from '@components/reusable/circularprogressbar'

const Debtbalance = () => {
    return (
        <Card style={styles.section_card} cardStyle={styles.section_card_inner}>
            <View style={styles.section_card_inner_content}>
                <View style={styles.section_card_inner_content_item}>
                    <Circularprogressbar progress={100} size={120} strokeWidth={12} />
                    <View style={styles.section_card_inner_content_item3} >
                        <Text style={styles.section_card_text}>Balance</Text>
                        <Image style={styles.image} source={require('@images/dashboard/balanceicon.png')} />
                    </View>
                </View>
            </View>
        </Card>
    )
}

export default Debtbalance

const styles = StyleSheet.create({
    section_card: {
        width: '48%',
        height: 168,
    },
    section_card_text: {
        color: '#fff',
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 14,
    },
    section_card_inner_content: {
        gap: 20,
        justifyContent: "center",
        paddingVertical: 10

    },
    section_card_inner_content_item: {
        flexDirection: "column",
        gap: '5%',
        alignItems: "center",
        justifyContent: "center"
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
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 14,
    },
    section_card_inner: {
        height: 'auto',
        justifyContent: "center"
    },
    image: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    section_card_inner_content_item2: {

    },
    section_card_inner_content_item3: {
        flexDirection: "row",
        alignItems: "center",
        gap: '4%'
    }
})