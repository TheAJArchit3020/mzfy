import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from '@components/reusable/card'
import ProgressBar from '@components/reusable/progressbar'

const Debtprogress = () => {
    return (
        <Card style={styles.section_card} cardStyle={styles.section_card_inner}>
            <View style={styles.section_card_inner_content}>
                <View style={styles.section_card_inner_content_item}>
                    <Image style={styles.image} source={require('@images/dashboard/fireprogress.png')} />
                    <Text style={styles.section_card_text}>Progress</Text>
                    <Text style={styles.section_card_text2}>30%</Text>
                </View>
                <View style={styles.section_card_inner_content_item2}>
                    <ProgressBar progress={40} />
                </View>

            </View>
        </Card>
    )
}

export default Debtprogress

const styles = StyleSheet.create({
    section_card: {},
    section_card_text: {
        color: '#fff',
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 14,
        flex: 1
    },
    section_card_inner_content: {
        gap: 20,
        justifyContent: "center",
        paddingVertical: 10

    },
    section_card_inner_content_item: {
        flexDirection: "row",
        gap: '5%',
        alignItems: "center"
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

    }
})