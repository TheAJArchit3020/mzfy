import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from '@components/reusable/card';
import Debtcountdown from '@components/dashboard/debtcountdown';
import Debtprogress from '@components/dashboard/debtprogress';
import Debtbalance from '@components/dashboard/debtbalance';
import Debtpaid from '@components/dashboard/debtpaid';
import Upcommingdebts from '@components/dashboard/upcommingdebts';
import Nextduedate from '@components/dashboard/nextduedate';


const DashboardScreen: FC = () => {

    // ⏰ Get current hour
    const hour = new Date().getHours();

    // 📌 Determine greeting
    const getGreeting = () => {
        if (hour >= 5 && hour < 12) {
            return 'Good Morning';
        } else if (hour >= 12 && hour < 17) {
            return 'Good Afternoon';
        } else {
            return 'Good Evening';
        }
    };

    const upcommingdebtsList = [
        { name: 'Car loan', amount: 20000, date: '20/02/2025' },
        { name: 'Car loan', amount: 20000, date: '20/02/2025' },
        { name: 'Car loan', amount: 20000, date: '20/02/2025' },
        { name: 'Car loan', amount: 20000, date: '20/02/2025' },
        { name: 'Car loan', amount: 20000, date: '20/02/2025' },
    ]

    const nextDueList = [
        { name: 'Car loan', amount: 20000, date: '20/08/2025' },
        { name: 'Bike loan', amount: 20000, date: '03/08/2025' },
        { name: 'Home loan', amount: 20000, date: '20/09/2025' },
    ]
    return (
        <View style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview} >

                <View style={styles.section1}>
                    <View style={styles.section1_1}>
                        <Text style={styles.section1_1_text}>Hey  <Text style={styles.section1_1_span}>Sumit ,</Text></Text>
                        <Text style={styles.section1_1_text}>{getGreeting()}</Text>
                    </View>
                    <View style={styles.section1_2}>
                        <Text style={styles.section1_2_text}>S</Text>
                    </View>
                </View>

                <View style={styles.section2}>
                    <Debtcountdown />
                </View>

                <View style={styles.section3}>
                    <Debtprogress />
                </View>

                <View style={styles.section4}>
                    <Debtbalance />
                    <Debtpaid />
                </View>
                <View style={styles.section7}>
                    <Nextduedate data={nextDueList} />
                </View>
                <View style={styles.section5}>
                    <Text style={styles.section5_text}>Upcoming Transactions</Text>
                    <Upcommingdebts data={upcommingdebtsList} />
                </View>

            </ScrollView>

            <TouchableOpacity style={styles.section6}>
                <Text style={styles.section6_text} >+</Text>
            </TouchableOpacity>


        </View>
    );
};

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    text: {
        fontSize: 33,
        fontFamily: "PlusJakartaSans-Bold",
        color: "white"
    },
    section1: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    section1_1_text: {
        fontFamily: "PlusJakartaSans-Italic",
        fontSize: 13,
        color: "#fff"
    },
    section1_1_span: {
        fontFamily: "PlusJakartaSans-Italic",
        fontSize: 13,
        color: "#EFCB3A"
    },
    section1_2_text: {
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 14,
        color: "#000"
    },
    section1_2: {
        backgroundColor: "#D9D9D9",
        borderRadius: 100,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    section1_1: {},
    section2: {
        margin: 20
    },
    section3: {
        marginHorizontal: 20,
        marginBottom: 20
    },
    section4: {
        marginHorizontal: 20,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    section5: {
        marginHorizontal: 20,
        marginBottom: 20
    },
    section5_text: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 16,
        marginBottom: 10
    },
    section6: {
        backgroundColor: "#006FFF",
        borderRadius: 25,
        width: 50,
        height: 50,
        position: "absolute",
        bottom: '6%',
        right: '5%',
        alignItems: "center",
        justifyContent: "center",
    },
    section6_text: {
        color: "#F7F7F7",
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 34,
        textAlign: "center",
        marginTop: -14
    },
    scrollview: {
        marginBottom: 10
    },
    section7: {
        marginHorizontal: 20,
        marginBottom: 20
    }

});
