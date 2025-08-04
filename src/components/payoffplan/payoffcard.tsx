import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import ProgressBar from '@components/reusable/progressbar'
import Card from '@components/reusable/card'


interface payoffProps {
    data: any,
    source?: any,
    cardstyle?: any,
    cardcontainerstyle?: any
    onPress?: any
}


const Payoffcard: FC<payoffProps> = ({ data, source, cardstyle, cardcontainerstyle, onPress }) => {
    return (
        <>
            <View style={styles.cardcontainer}>
                {data?.map((item: any, idx: any) => {
                    return (
                        <Card style={[styles.section_card, cardstyle]} cardStyle={styles.section_card_inner} key={idx}>
                            <View style={styles.groupsection}>
                                <Text style={styles.groupsection_text1}>{item.name}</Text>
                                <Text style={styles.groupsection_text2}>{item.time}</Text>
                                <TouchableOpacity style={styles.button} onPress={onPress}>
                                    <Image source={source} style={styles.image} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.groupsection2}>
                                <Text style={styles.groupsection_text1}>Minimun: {item.minamt} {'\u20B9'}</Text>
                                <Text style={styles.groupsection_text1}>APR: {item.apr}%</Text>

                            </View>
                            <View style={styles.groupsection3}>
                                <Text style={styles.groupsection_text1}>Payoff Progress</Text>
                                <ProgressBar progress={item?.payoffprogress} tooltipLabel={`Balance 20,000 ${'\u20B9'}`} showTooltip={true} style={styles.progressbar} />
                                <Text style={styles.groupsection_text1}>{item.payoffprogress} %</Text>

                            </View>

                        </Card>
                    )
                })}
            </View>
        </>

    )
}
export default Payoffcard

const styles = StyleSheet.create({
    cardcontainer: {
        flexDirection: "column",
        gap: 20
    },
    section_card: {
        backgroundColor: "rgba(51, 255, 0, 0.38)",
        borderWidth: 0,
        width: '95%',
        alignSelf: "center",
        paddingHorizontal: 6,
        borderRadius: 10
    },
    section_card_inner: {
        flexDirection: "column",
        // gap: 40
    },
    image: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    groupsection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18
    },
    groupsection2: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20,
        marginBottom: 40
    },
    groupsection_text1: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 14
    },
    groupsection_text2: {
        width: 120,
        color: "#fff",
        fontFamily: "PlusJakartaSans-Light",
        fontSize: 10
    },
    button: {
    },
    groupsection3: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    progressbar: {
        flex: 1
    }
})