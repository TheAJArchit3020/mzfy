import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC, useCallback, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Header from '@components/reusable/header'
import SegmentButton from '@components/reusable/segmentbutton'
import UpcomingDebtsWithScrollbar from '@components/dashboard/upcommingdebts'
import Nextduedate from '@components/dashboard/nextduedate'
import Popup from '@components/reusable/popup'
import ProgressBar from '@components/reusable/progressbar'
import GraphComponent from '@components/reusable/graph'
import Card from '@components/reusable/card'
import Input from '@components/reusable/Input'
import { widthToDP } from 'react-native-responsive-screens'
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParams } from '@managers/routing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@redux/store'
import { fetchDebtsById, logTransaction } from '@redux/debts/debtsSlice'

type routeProps = RouteProp<RootStackParams, 'particulardebtdetailscreen'>

const Particulardebtdetail: FC = () => {


    const route = useRoute<routeProps>();
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();

    const [selectedButton, setSelectedButton] = useState(0);
    const [show, setShow] = useState(false);
    const [selectedDueTransaction, setSelectedDueTransaction] = useState('');
    const [logAmount, setLogAmount] = useState('');

    const { id, name } = route.params

    const selectedCurrency = useSelector((state: RootState) => state.user?.items[0]?.selectedCurrency)


    const logpopupHandler = () => {
        setShow(true);
    };


    useFocusEffect(
        useCallback(() => {
            getDebtsData()
        }, [])
    )

    const getDebtsData = async () => {
        try {
            await dispatch(fetchDebtsById(id));

        } catch (error: any) {
            console.log(error)
        }
    }

    const DEBTDATA = (useSelector((state: RootState) => state.debts.items[0]?.payload)) ?? {};


    console.log("DEBTDATA : ", DEBTDATA)

    const LogTransactionHandler = async () => {

        await dispatch(logTransaction({ selectedDueTransaction, logAmount })).then((payload) => {
            console.log("Transaction logged successfully:", payload.meta.requestStatus);
            if (payload.meta.requestStatus === 'fulfilled') {
                setShow(false);
                navigation.goBack();
            }
        }).catch((err) => {
            console.error("Error logging transaction:", err);
        });
    }





    return (
        <LinearGradient
            colors={["#443C9F", "#3A346E", "#2B293E", "#272631", "#232323"]}
            locations={[0, 0.64, 0.76, 0.87, 1]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <Header title={name ? name : '-'} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.section1}>
                        {/* <Debtcountdown /> */}
                        <Card cardStyle={styles.cardcontainer} >
                            <View style={styles.balancegrp1} >
                                <Text style={styles.text1}>Curent balance</Text>
                                <Text style={styles.text2}>{selectedCurrency ?? ''} {DEBTDATA.currentBalance}</Text>
                            </View>
                            <View style={styles.balancegrp} >
                                <Image source={require('@images/dashboard/rightarrow.png')} style={styles.arrowimage} />
                                <Text style={styles.balancetext} >-{DEBTDATA.payoffProgress}%</Text>
                            </View>
                        </Card>

                    </View>
                    <View style={styles.section2}>
                        <View style={styles.section2_header_content}>
                            <Text style={styles.section2_header_content_title}>Transactions</Text>
                        </View>
                        <View style={styles.section2_body}>
                            <SegmentButton items={["Upcoming transactions", "Paid transactions"]}
                                onChange={(idx) => {
                                    setSelectedButton(idx);
                                }}
                                selectedIndex={selectedButton}
                                containerStyle={styles.toggleButtonContainer}
                                textStyle={styles.segmentText} />

                            <UpcomingDebtsWithScrollbar data={selectedButton === 0 ? DEBTDATA.upcomingTransactions : DEBTDATA.paidTransactions} style={styles.cardstyle} cardStyle={styles.cardstyle2} sort={false} />
                        </View>
                    </View>

                    <View style={styles.section3}>
                        <Nextduedate
                            data={DEBTDATA.upcomingTransactions}
                            logpopupHandler={logpopupHandler}
                            setSelectedDueTransaction={setSelectedDueTransaction}
                        />
                    </View>

                    <View style={styles.section4}>
                        <Text style={styles.section4_title}>Payoff Progress</Text>
                        <Text style={styles.section4_title2}>{DEBTDATA.payoffProgress} %</Text>
                        <ProgressBar progress={DEBTDATA.payoffProgress} showTooltip={true} tooltipLabel={`Balance: ${DEBTDATA.currentBalance} ${selectedCurrency}`} backgroundColor='rgba(187,187,187,0.4)' />
                    </View>

                    <View style={styles.section4}>
                        <Text style={styles.section4_title}>Your Debt-Free Timeline</Text>
                        {/* <GraphComponent rawData={DEBTDATA.debtFreeTimeline} /> */}
                    </View>

                </View>
            </ScrollView>
            {/* log payment popup */}
            <Popup
                visible={show}
                title="Paid amount"
                onClose={() => LogTransactionHandler()}
                titleStyle={styles.popuptitle}
                containerStyle={styles.popupContainerStyle}
                onClose2={() => setShow(false)}
            >
                <Input
                    value={logAmount}
                    onChangeContent={(val: string) =>
                        setLogAmount(val)
                    }
                    keyboardType="numeric"
                    textHeader={selectedCurrency}
                    children={
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: widthToDP(4.5),
                                marginLeft: widthToDP(1),
                            }}
                        >
                            /-
                        </Text>
                    }
                    style={styles.popupinput}
                    inputWrapperStyle={styles.inputWrapperStyle}
                />
            </Popup>
        </LinearGradient>
    )
}

export default Particulardebtdetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        gap: 24,
        marginBottom: 30
    },
    section1: {
        marginHorizontal: 20,
        marginTop: 10
    },
    section2: {
        marginHorizontal: 20,
        flexDirection: "column",
        gap: 24
    },
    section2_header_content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    section2_header_content_title: {
        fontSize: 16,
        fontFamily: "PlusJakartaSans-Bold",
        color: "#fff"
    },
    section2_header_content_button: {
        backgroundColor: "#006EFF",
        borderRadius: 100,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        padding: 6,
        gap: 8
    },
    editimage: {
        width: 14,
        height: 14,
        resizeMode: "contain"
    },

    section2_header_content_button_text: {
        fontSize: 12,
        fontFamily: "PlusJakartaSans-Bold",
        color: "#fff"

    },
    toggleButtonContainer: {
        margin: 10,
        marginTop: 10,
        width: 'auto',
        alignSelf: "flex-start",
        marginBottom: 0,
        paddingHorizontal: 20
    },
    section2_body: {
        backgroundColor: "#1E2D5E",
        borderRadius: 24,
        flexDirection: "column",
        gap: 10

    },
    cardstyle: {
        borderWidth: 0,
        overflow: "hidden",
        backgroundColor: '#1E2D5E',
    },
    cardstyle2: {
        backgroundColor: 'none',
    },
    section3: {
        marginHorizontal: 20
    },
    section4: {
        marginHorizontal: 20,
        flexDirection: "column",
        gap: 25
    },
    section4_title: {
        fontSize: 16,
        fontFamily: "PlusJakartaSans-Bold",
        color: "#fff"
    },
    section4_title2: {
        fontSize: 16,
        fontFamily: "PlusJakartaSans-Bold",
        color: "#fff",
        marginBottom: -10,
        alignSelf: "flex-end"
    },
    segmentText: {
        fontSize: 11
    },
    text1: {
        fontSize: 16,
        fontFamily: "PlusJakartaSans-Bold",
        color: "#fff",
    },
    text2: {
        fontSize: 32,
        fontFamily: "PlusJakartaSans-Bold",
        color: "#fff",
    },
    balancegrp: {
        flexDirection: "row",
        gap: 10
    },
    arrowimage: {
        width: 16,
        height: 16,
        resizeMode: "contain",
        transform: [{ rotate: '90deg' }],
    },
    balancetext: {
        color: "#1AD054",
        fontSize: 10,
        fontFamily: "PlusJakartaSans-Bold",
    },
    cardcontainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    balancegrp1: {
        flexDirection: "column",
        gap: 13
    },
    popuptitle: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 14,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    popupContainerStyle: {
        backgroundColor: "#2A2A2A",
    },

    cardstyle1: {
        overflow: "hidden"
    },
    popupinput: {
        marginHorizontal: 5
    },
    inputWrapperStyle: {
        marginHorizontal: 20
    }
})