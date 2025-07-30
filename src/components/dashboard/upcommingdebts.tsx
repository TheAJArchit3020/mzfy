import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from '@components/reusable/card'


interface UpcomingDebtsProps {
    data: any
}

const Upcommingdebts: React.FC<UpcomingDebtsProps> = ({ data }) => {
    return (
        <Card style={styles.section_card} cardStyle={styles.section_card_inner}>
            <View style={styles.section_card_inner_content}>
                {data?.map((item: any, idx: any) => {
                    const isLast = idx === data.length - 1
                    return (
                        <View style={[styles.section_card_inner_content_item, isLast && styles.noBorder]} key={idx}>
                            <Text style={styles.section_card_text}>{item.name}</Text>
                            <Text style={styles.section_card_text}>{'\u20B9'}&nbsp;
                                {item.amount}
                            </Text>
                            <Text style={styles.section_card_text}>
                                {item.date}
                            </Text>
                        </View>
                    )
                })}

            </View>
        </Card>
    )
}

export default Upcommingdebts

const styles = StyleSheet.create({
    section_card: {
        width: '100%',
        padding: 0,
        justifyContent: "center"
    },
    section_card_text: {
        color: '#fff',
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 14,
    },
    section_card_inner_content: {

    },
    section_card_inner_content_item: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "#C0C0C0",
        borderBottomWidth: 0.2,
        paddingVertical: 10
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
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 14,
    },
    section_card_span: {
        color: '#00D600',
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 16,
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
    noBorder: {
        borderBottomWidth: 0
    }
})