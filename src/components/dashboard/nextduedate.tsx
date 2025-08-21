import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useEffect, useMemo, useState } from "react";
import Card from "@components/reusable/card";
import LinearGradient from "react-native-linear-gradient";
import { AppDispatch } from "@redux/store";
import { useDispatch } from "react-redux";
import { logTransaction } from "@redux/debts/debtsSlice";
import { heightToDP } from "react-native-responsive-screens";

interface NextduedateProps {
    data?: Array<{ id: string; amount: number; dueDate: string, _id?: string }>
    logpopupHandler?: () => void
    setSelectedDueTransaction?: (id: string) => void
}

const Nextduedate: FC<NextduedateProps> = ({ data, logpopupHandler, setSelectedDueTransaction }) => {


    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (data) {
            const timer = setTimeout(() => {
                setShowContent(true);
            }, 1200);

            return () => clearTimeout(timer); // cleanup
        }
    }, [data]);


    const startOfDay = (d: Date) => {
        const x = new Date(d);
        x.setHours(0, 0, 0, 0);
        return x;
    };
    const sameYMD = (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();

    const today = useMemo(() => startOfDay(new Date()), []);

    // Build a list of upcoming items (due today or later), sorted soonest first.
    const upcomingSorted = useMemo(() => {
        return (data ?? [])
            .map(item => ({ ...item, _due: startOfDay(new Date(item.dueDate)) }))
            .filter(item => !isNaN(item._due.getTime()) && item._due >= today)
            .sort((a, b) => a._due.getTime() - b._due.getTime());
    }, [data, today]);


    // Pick all items that fall on the earliest upcoming day
    const comingData = useMemo(() => {
        if (upcomingSorted.length === 0) return [];
        const firstDate = upcomingSorted[0]._due;
        return upcomingSorted.filter(x => sameYMD(x._due, firstDate));
    }, [upcomingSorted]);


    // Set the selected transaction id (first card) when it changes
    useEffect(() => {
        if (setSelectedDueTransaction) {
            setSelectedDueTransaction(comingData[0]?.id ?? comingData[0]?._id ?? "");
        }
    }, [setSelectedDueTransaction, comingData]);

    if (comingData.length === 0) return null;



    return (
        <>
            {comingData?.map((item, idx) => {
                const dueDate = new Date(item.dueDate)
                // gap in days
                const gapMs = dueDate.getTime() - today.getTime()
                const gapDays = Math.ceil(gapMs / (1000 * 60 * 60 * 24))

                // choose styles
                let cardColors: string[]
                let buttonColors: string[]
                let buttonTextColors: string
                let images: any
                let textcolor: string

                const cardcolor1 = ['#F44336', '#B71C1C']
                const cardcolor2 = ['#00E5FF', '#2979FF']
                const cardcolor3 = ['#B2FF59', '#00C853']
                const buttoncolor1 = ['#00C853', '#B2FF59']
                const buttoncolor2 = ['#000000', '#1A237E']
                const buttoncolor3 = ['#1F1F1F', '#2C2C2C']
                const image1 = require('@images/dashboard/whitecalendar.png')
                const image2 = require('@images/dashboard/blackcalendar.png')
                const textcolorLight = '#fff'
                const textcolorDark = '#2A2A2A'

                if (gapDays <= 7) {
                    cardColors = cardcolor1
                    buttonColors = buttoncolor1
                    buttonTextColors = textcolorDark
                    images = image1
                    textcolor = textcolorLight
                } else if (gapDays <= 30) {
                    cardColors = cardcolor2
                    buttonColors = buttoncolor2
                    buttonTextColors = textcolorLight
                    images = image2
                    textcolor = textcolorDark
                } else {
                    cardColors = cardcolor3
                    buttonColors = buttoncolor3
                    buttonTextColors = textcolorLight
                    images = image2
                    textcolor = textcolorDark
                }

                return (
                    <Card style={styles.section_card} cardStyle={styles.section_card_inner} key={idx}>

                        {showContent ? (
                            <>
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
                                                    <Text style={[styles.section_card_text1, { color: textcolor }]}>Next</Text>
                                                    <Text style={[styles.section_card_text2, { color: textcolor }]}>Due date</Text>
                                                </View>
                                                <Image source={images} style={styles.image} />
                                            </View>

                                            <Text style={[styles.section_card_text4, { color: textcolor }]}>
                                                {dueDate.getDate()}{' '}
                                                <Text style={[styles.section_card_span, { color: textcolor }]}>
                                                    {dueDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                                </Text>
                                            </Text>

                                            <Text style={[styles.section_card_text5, { color: textcolor }]}>
                                                {item.amount.toLocaleString('en-IN')} /-
                                            </Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                                <LinearGradient
                                    colors={buttonColors}
                                    locations={[0, 1]}
                                    start={{ x: 1, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    style={styles.button_gradient}
                                >
                                    <TouchableOpacity style={styles.logbutton} onPress={logpopupHandler} >
                                        <Text style={[styles.logbutton_text, { color: buttonTextColors }]}>Log Payment</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </>
                        ) : <ActivityIndicator color={"#fff"} size={"large"} style={{marginVertical: heightToDP(6)}} />}
                    </Card>
                )
            })}
        </>
    )
}

export default Nextduedate

const styles = StyleSheet.create({
    section_card: { width: '100%', overflow: 'hidden', marginBottom: 20 },
    section_card_inner_content: { padding: 20 },
    section_card_inner_content_item: { flexDirection: 'column' },
    grpsection: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    section_card_text1: { fontFamily: 'PlusJakartaSans-Bold', fontSize: 16, marginBottom: 10 },
    section_card_text2: { fontWeight: 'bold', fontSize: 14, marginBottom: 14 },
    section_card_text4: { fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, marginBottom: 11 },
    section_card_span: { fontFamily: 'PlusJakartaSans-Bold', fontSize: 14 },
    section_card_text5: { fontStyle: 'italic', fontSize: 14 },
    section_card_inner: { padding: 0, flexDirection: 'column', borderWidth: 0 },
    image: { width: 24, height: 24, resizeMode: 'contain' },
    button_gradient: { shadowColor: 'rgba(0,0,0,0.25)', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 1, shadowRadius: 4, elevation: 5 },
    logbutton: { padding: 16 },
    logbutton_text: { fontFamily: 'PlusJakartaSans-Bold', fontSize: 14, textAlign: 'center' },
})
