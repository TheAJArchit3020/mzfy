import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import Card from '@components/reusable/card'
import LinearGradient from 'react-native-linear-gradient'

interface NextduedateProps {
    data: any,
    logpopupHandler: any
}

const Nextduedate: FC<NextduedateProps> = ({ data, logpopupHandler }) => {

    const cardcolor1 = ['#F44336', '#B71C1C']
    const cardcolor2 = ['#00E5FF', '#2979FF']
    const cardcolor3 = ['#B2FF59', '#00C853']

    const buttoncolor1 = ['#00C853', '#B2FF59']
    const buttoncolor2 = ['#000000', '#1A237E']
    const buttoncolor3 = ['#1F1F1F', '#2C2C2C']

    const buttontestcolor = '#fff'
    const buttontestcolor2 = '#000'

    const image = require('@images/dashboard/whitecalendar.png')
    const image2 = require('@images/dashboard/blackcalendar.png')

    // today at midnight
    const today = new Date()
    today.setHours(0, 0, 0, 0)


    return (
        <>
            {data?.map((item: any, idx: any) => {
                // 1) parse "dd/MM/yyyy"
                const [dayStr, monthStr, yearStr] = item.date.split('/')
                const dueDate = new Date(
                    Number(yearStr),
                    Number(monthStr) - 1,
                    Number(dayStr),
                )
                // 2) compute gap in days
                const gapMs = dueDate.getTime() - today.getTime()
                const gapDays = Math.ceil(gapMs / (1000 * 60 * 60 * 24))

                // 3) pick gradient based on gapDays
                let cardColors: string[]
                let buttonColors: string[]
                let buttonTextColors: string
                let images: any


                if (gapDays <= 7) {
                    cardColors = cardcolor1
                    buttonColors = buttoncolor1
                    buttonTextColors = buttontestcolor2
                    images = image
                } else if (gapDays <= 30) {
                    cardColors = cardcolor2
                    buttonColors = buttoncolor2
                    buttonTextColors = buttontestcolor
                    images = image2
                } else {
                    cardColors = cardcolor3
                    buttonColors = buttoncolor3
                    buttonTextColors = buttontestcolor
                    images = image2
                }
                return (
                    <Card style={styles.section_card} cardStyle={styles.section_card_inner} key={idx} >
                        <LinearGradient
                            colors={cardColors}
                            locations={[0, 1]}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        >

                            <View style={styles.section_card_inner_content}>
                                <View style={styles.section_card_inner_content_item}>
                                    <View style={styles.grpsection}>
                                        <View>
                                            <Text style={styles.section_card_text1}>Next</Text>
                                            <Text style={styles.section_card_text2}>Due date</Text>
                                        </View>
                                        <View>
                                            <Image source={images} style={styles.image} />
                                        </View>
                                    </View>
                                    <Text style={styles.section_card_text3}>{item.name}</Text>

                                    <Text style={styles.section_card_text4}>
                                        {dueDate.getDate()}{' '}
                                        <Text style={styles.section_card_span}>
                                            {dueDate.toLocaleString('default', {
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </Text>
                                    </Text>

                                    <Text style={styles.section_card_text5}>{item.amount} /- </Text>
                                </View>
                            </View>
                        </LinearGradient>
                        <LinearGradient
                            colors={buttonColors}
                            locations={[0, 1]}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        >
                            <TouchableOpacity style={styles.logbutton} onPress={logpopupHandler} >
                                <Text style={[styles.logbutton_text, { color: buttonTextColors }]}>Log Payment</Text>
                            </TouchableOpacity>
                        </LinearGradient>

                    </Card>
                )
            })}
        </>

    )
}

export default Nextduedate

const styles = StyleSheet.create({
    section_card: {
        width: '100%',
        height: 'auto',
        overflow: "hidden",
        borderColor: '#C0C0C0',
        marginBottom: 20
    },
    section_card_text: {
        color: '#fff',
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 16,
    },
    section_card_inner_content: {
        padding: 20

    },
    section_card_inner_content_item: {
        flexDirection: "column",
        padding: 0
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
    section_card_text1: {
        color: '#fff',
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 16,
        marginBottom: 10
    },
    section_card_text2: {
        color: '#fff',
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 14,
    },
    section_card_text3: {
        color: '#fff',
        fontStyle: "italic",
        fontSize: 14,
        marginBottom: 11
    },
    section_card_text4: {
        color: '#fff',
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 30,
        marginBottom: 11
    },
    section_card_text5: {
        color: '#fff',
        fontStyle: "italic",
        fontSize: 14,
    },
    section_card_text6: {
        color: '#fff',
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 30,
    },
    section_card_text7: {
        color: '#fff',
        fontFamily: "PlusJakartaSans-LightItalic",
        fontSize: 30,
    },
    section_card_span: {
        color: '#fff',
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 14,
    },
    section_card_inner: {
        padding: '0%',
        flexDirection: "column"
    },
    image: {
        width: 24,
        height: 24,
        resizeMode: "contain"
    },
    section_card_inner_content_item2: {

    },
    grpsection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    logbutton: {
        padding: 16
    },
    logbutton_text: {
        color: '#000',
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 14,
        textAlign: "center"
    }

})