import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import ProgressBar from '@components/reusable/progressbar'
import Card from '@components/reusable/card'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '@managers/routing'
import { formatDDMMMyyyy, formatDDMMMyyyy2, formatToDDMMMYYYY } from '@components/reusable/formatdate'


interface payoffProps {
    data: any,
    source?: any,
    cardstyle?: any,
    cardcontainerstyle?: any
    onPress?: any
}

type NavigationProp = NativeStackNavigationProp<RootStackParams>;

const Payoffcard: FC<payoffProps> = ({ data, source, cardstyle, cardcontainerstyle, onPress }) => {

    const navigation = useNavigation<NavigationProp>();


    console.log("data : ",data)

    const navigateHandler = (_id: any, name: any) => {
        navigation.navigate('particulardebtdetailscreen', {
            id: _id,
            name: name
        })
    }


    function percentPaid(principal: any, balance: any, digits = 0) {
        const p = parseFloat(String(principal));
        const b = parseFloat(String(balance));
        if (!isFinite(p) || p <= 0 || !isFinite(b)) return 0;

        const paid = Math.max(0, p - b);
        const pct = (paid / p) * 100;
        return Number(pct.toFixed(digits)); // e.g. digits=1 -> 20.0
    }


    return (
        <>
            <View style={styles.cardcontainer}>
                {data?.map((item: any, idx: any) => {

                    const percentagePaid = percentPaid(item?.principal, item?.balance, 2);


                    console.log("data :", percentagePaid)

                    return (
                        <Card style={[styles.section_card, cardstyle, { backgroundColor: `${item.tagColor}` }]} cardStyle={[styles.section_card_inner]} key={idx}>
                            <View style={styles.groupsection}>
                                <Text style={styles.groupsection_text1}>{item.name}</Text>
                                <Text style={styles.groupsection_text2}> Completes on {formatToDDMMMYYYY(item.nextDueDate) || item.dueDate || formatDDMMMyyyy(item.completionDate || item.estimatedDebtFreeDate || formatDDMMMyyyy2(item.nextDueDate))}</Text>
                                <TouchableOpacity style={styles.button} onPress={() => navigateHandler(item.id, item.name)}>
                                    <Image source={source} style={styles.image} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.groupsection2}>
                                <Text style={styles.groupsection_text1}>Minimun: {item.minPaymentAmount} {'\u20B9'}</Text>
                                <Text style={styles.groupsection_text1}>APR: {item.apr}%</Text>

                            </View>
                            <View style={styles.groupsection3}>
                                <Text style={styles.groupsection_text1}>Payoff Progress</Text>
                                <ProgressBar progress={percentagePaid || item.payoffPct || item.payoffProgress} tooltipLabel={`Balance : ${item.balance} ${'\u20B9'}`} showTooltip={true} style={styles.progressbar} />
                                <Text style={styles.groupsection_text1}>{percentagePaid || item?.payoffPct || item?.payoffProgress?.toFixed(2)} %</Text>

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
        borderRadius: 10,
        // opacity: 0.6
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
        width: 130,
        color: "#fff",
        fontFamily: "PlusJakartaSans-Light",
        fontSize: 10,
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