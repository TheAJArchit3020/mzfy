import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from '@components/reusable/card';
import Debtcountdown from '@components/dashboard/debtcountdown';
import Debtprogress from '@components/dashboard/debtprogress';
import Debtbalance from '@components/dashboard/debtbalance';
import Debtpaid from '@components/dashboard/debtpaid';


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
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#5145BC', '#2F2C4A', '#2B293E', '#272631', '#232323']}
                locations={[0, 0.64, 0.76, 0.87, 1]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}>


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

                {/* <View style={styles.section4}>
                    <Debtbalance />
                    <Debtpaid />
                </View> */}


            </LinearGradient>
        </View>
    );
};

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1
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

});
