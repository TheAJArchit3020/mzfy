import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useCallback, useEffect, useReducer, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Header from '@components/reusable/header'
import DraggablePayoffcard from '@components/payoffplan/dragablepayoffcard'
import Button from '@components/reusable/button'
import TextCard2 from '@components/reusable/textcard2'
import TextCard from '@components/reusable/textcard'
import Popup from '@components/reusable/popup'
import Dropdown from '@components/reusable/dropdown'
import Input from '@components/reusable/Input'
import { widthToDP } from 'react-native-responsive-screens'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@redux/store'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { fetchPayoffPlan } from '@redux/payoffplans/payoffplanSlice'
import { addCustomPlan, fetchCustomPlan, previewCustomPlan } from '@redux/customplan/customplanSlice'




const Createcustomplan: FC = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch<AppDispatch>();
    const { current } = useSelector((state: RootState) => state.customplan)
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);


    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [debtAmount, setDebtAmount] = useState('');
    const [planName, setPlanName] = useState('');
    const [debtExtraPaymentArray, setDebtExtraPaymentArray] = useState<any[]>([]);
    const [debtArray, setDebtArray] = useState<any[]>([]);
    const [selectedDebt, setSelectedDebt] = useState<string | null>(null);

    const selectedCurrency = useSelector((state: RootState) => state.user?.items[0]?.selectedCurrency)
    const payoffCustomplanArray = useSelector((state: RootState) => state?.customplan?.items[0]) ?? [];



    useEffect(() => {
        if (debtExtraPaymentArray.length > 0) {
            _fetchPreviewCustomPlan()
        }
    }, [debtExtraPaymentArray]);

    const _getDebtIds = payoffCustomplanArray?.debtOrder?.map((item: any) => item.id) || [];
    console.log("_getDebtIds : ", _getDebtIds)

    const _fetchPreviewCustomPlan = async () => {

        console.log({
            debtOrder: debtArray?.length > 0 ? debtArray : _getDebtIds,
            extraPayments: debtExtraPaymentArray,
        })
        try {
            await dispatch(previewCustomPlan({
                debtOrder: debtArray?.length > 0 ? debtArray : _getDebtIds,
                extraPayments: debtExtraPaymentArray,
            }));
        } catch (error) {
            console.error('Error fetchCustomPlan payoff plans:', error);
        }
    };





    useFocusEffect(
        useCallback(() => {

            const _fetchCustomPlan = async () => {
                try {
                    await dispatch(fetchCustomPlan());
                } catch (error) {
                    console.error('Error fetchCustomPlan payoff plans:', error);
                }
            };

            _fetchCustomPlan();

        }, [])
    );

    const previewCustomplanArray = useSelector((state: RootState) => state?.customplan?.previewCustomData) ?? [];
    console.log("previewCustomplanArray : ", previewCustomplanArray)



    const __date = payoffCustomplanArray?.estimatedDebtFreeDate

    const d = __date ? new Date(__date as string) : new Date();

    const year = d.getUTCFullYear()

    const monthNumber = d.getUTCMonth() + 1  // 8
    const monthName = d.toLocaleString('default', { month: 'short', timeZone: 'UTC' })
    const now = new Date()


    const monthsUntil =
        (year - now.getUTCFullYear()) * 12 +
        ((monthNumber) - (now.getUTCMonth() + 1))


    const showsetPopup = () => {
        setShow(true);
    };

    console.log(" payoffCustomplanArray?.debtOrder : ", payoffCustomplanArray?.debtOrder)



    const _debtorder = payoffCustomplanArray?.debtOrder?.map((item: any) => {
        return item.id;
    });


    const handleDataChange = (newData: any[]) => {
        const reorderedIds = newData?.map(item => item.id);
        setDebtArray(reorderedIds);
    };


    const _dropdownOptions = Array.isArray(payoffCustomplanArray?.debtOrder)
        ? payoffCustomplanArray?.debtOrder.map((item: any) => ({
            label: item.name,
            value: item.id,
        }))
        : [];

    const handleSelectedDebtChange = () => {

        const newExtraPayment = {
            debt: selectedDebt,
            extraAmount: Number(debtAmount),
        };

        setDebtExtraPaymentArray((prev) => [...prev, newExtraPayment]);
        setDebtAmount('');
        setSelectedDebt(null);
        setShow(false);

    }

    const CancelHandler = () => {
        setPlanName('');
        setDebtExtraPaymentArray([]);
        setDebtArray([]);
    }



    const AddCustomPlanHandler = async () => {

        await dispatch(addCustomPlan({
            name: planName,
            debtOrder: debtArray?.length > 0 ? debtArray : _debtorder,
            extraPayments: debtExtraPaymentArray,
        })).then(() => {
            setPlanName('');
            setDebtExtraPaymentArray([]);
            setDebtArray([]);
            setShow2(false);
            navigation.goBack();

        }).catch((error) => {
            console.error('Error adding custom plan:', error);
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
            <Header title='Create Custom Plan' />
            <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={scrollEnabled}>

                <View style={styles.container}>
                    <View style={styles.cardcontainer}>
                        <View style={styles.cardgroup}  >
                            <TextCard2 text1={'Estimated payoff'} text2={monthName} text3={year} text1style={styles.text1} text2style={styles.text2_1} text3style={styles.text2_2} cardStyle={styles.cardstyle}></TextCard2>

                            <TextCard text1={'Months'} text2={monthsUntil} text1style={styles.text1} text2style={styles.text2} cardStyle={styles.cardstyle} ></TextCard>
                        </View>
                        <View style={styles.cardgroup2}>
                            <TextCard text1={'Total interest Paid'} text2={`${selectedCurrency} ${payoffCustomplanArray?.totalInterestPaid}`} text1style={styles.text1} text2style={styles.text3} cardStyle={styles.cardstyle2} ></TextCard>
                            <TextCard text1={'You save'} text2={`${selectedCurrency} ${payoffCustomplanArray?.totalSavings}`} text1style={styles.text1} text2style={styles.text3} cardStyle={styles.cardstyle2} ></TextCard>
                        </View>
                    </View>

                    <View style={styles.cardcontainer3}>
                        <View style={styles.cardcontainer3_content}>
                            <View>
                                <Text style={styles.cardcontainer3_title}>Order Wise Debt payoff</Text>
                                <View style={styles.info_content}>
                                    <Image source={require('@images/payoffplan/info.png')} style={styles.infoimage} />
                                    <Text style={styles.info_text}>You can Arrange debts your way</Text>
                                </View>
                            </View>
                            <Button style={styles.button} onPress={showsetPopup} >
                                <Image source={require('@images/payoffplan/pluswhite.png')} style={styles.plusimage} />
                                <Text style={styles.button_text}>Set extra payment</Text>
                            </Button>
                        </View>
                        <View style={styles.cardcontainer3_inner}>
                            <DraggablePayoffcard
                                data={payoffCustomplanArray?.debtOrder || []}
                                source={require('@images/payoffplan/edit.png')}
                                showicon={false}
                                showcustom={true}
                                onDataChange={handleDataChange}
                                onDragStatusChange={(isDragging) => setScrollEnabled(!isDragging)}
                            />
                        </View>
                    </View>

                    <View style={styles.buttongroup}>
                        <Button style={styles.button_save} onPress={() => setShow2(true)} >
                            <Text style={styles.button_save_text}>Save</Text>
                        </Button>
                        <Button style={styles.button_cancel} onPress={CancelHandler} >
                            <Text style={styles.button_cancel_text}>Cancel</Text>
                        </Button>
                    </View>
                </View>

            </ScrollView>

            {/* log payment popup */}
            <Popup
                visible={show}
                onClose={handleSelectedDebtChange}
                onClose2={() => setShow(false)}
                containerStyle={styles.popupContainerStyle}
                buttonText='Set'
                color1="#B2FF59"
                color2="#00C853"
            >
                <View style={styles.formgroup}>

                    <View style={styles.inputgroup}>
                        <Text style={styles.inputgroup_label}>Select a debt</Text>
                        <Dropdown dropdownoptionstyle={styles.inputWrapperStyle2}
                            options={_dropdownOptions}
                            value={selectedDebt}
                            placeholder="Debt name"
                            onChange={(val) => {
                                setSelectedDebt(val as string);
                                console.log('picked', val);
                            }}
                        />

                    </View>
                    <View style={styles.inputgroup}>
                        <Text style={styles.inputgroup_label}>Extra payment</Text>
                        <Input
                            value={debtAmount}
                            onChangeContent={(val) =>
                                setDebtAmount(val)
                            }
                            textHeader={selectedCurrency}
                            inputWrapperStyle={styles.inputWrapperStyle}
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
                        />

                    </View>
                </View>
            </Popup>

            <Popup
                visible={show2}
                onClose2={() => setShow2(false)}
                onClose={AddCustomPlanHandler}
                containerStyle={styles.popupContainerStyle}
                buttonText='Ok'
                color1="#B2FF59"
                color2="#00C853"
            >
                <View style={styles.formgroup}>

                    <View style={styles.inputgroup}>
                        <Text style={styles.inputgroup_label}>Enter Plan name</Text>
                        <Input
                            value={planName}
                            onChangeContent={(val) =>
                                setPlanName(val)
                            }
                            inputWrapperStyle={styles.inputWrapperStyle}
                        />

                    </View>
                </View>
            </Popup>

        </LinearGradient>
    )
}

export default Createcustomplan

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        gap: 16,
        marginVertical: 20,
        marginBottom: 30
    },
    cardcontainer3: {
        marginHorizontal: 20,
        flexDirection: "column",
        gap: 25,
        marginTop: 20,
        // backgroundColor:"red",
        flex: 1,
        // overflow:"hidden"
    },

    cardcontainer3_inner: {
        marginHorizontal: 5
    },
    cardcontainer3_title: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'PlusJakartaSans-Bold',
    },
    infoimage: {
        width: 12,
        height: 12,
        resizeMode: "contain"
    },
    cardcontainer3_content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    info_text: {
        color: '#fff',
        fontSize: 9,
        fontFamily: 'PlusJakartaSans-Regular',
    },
    info_content: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        marginTop: 5

    },
    button: {
        backgroundColor: "#006EFF",
        borderRadius: 100,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingHorizontal: 12,
        gap: 5,
    },
    button_text: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 12
    },
    plusimage: {
        width: 15,
        height: 15
    },
    cardcontainer: {
        flexDirection: "column",
        gap: 32
    },
    cardgroup: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardgroup2: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardstyle: {
        padding: 20,
        flexDirection: "column",
        gap: 30
    },
    cardstyle2: {
        padding: 20,
        flexDirection: "column",
        gap: 15
    },
    text1: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'PlusJakartaSans-Bold'
    },
    text2: {
        color: '#fff',
        fontSize: 36,
        fontFamily: 'PlusJakartaSans-Bold',
        textAlign: "center"

    },
    text3: {
        color: '#fff',
        fontSize: 22,
        fontFamily: 'PlusJakartaSans-Bold',
    },
    text2_1: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'PlusJakartaSans-Bold',
        textAlign: "center"
    },
    text2_2: {
        color: '#fff',
        fontSize: 36,
        fontFamily: 'PlusJakartaSans-Bold',
        textAlign: "center"
    },
    buttongroup: {
        flexDirection: "column",
        gap: 16,
        marginTop: 90,
    },
    button_save: {
        backgroundColor: "#006EFF",
        borderRadius: 45,
        padding: 16,
        paddingHorizontal: 20,
        marginHorizontal: 20
    },
    button_save_text: {
        color: "#fff",
        fontFamily: 'PlusJakartaSans-Bold',
        textAlign: "center"
    },
    button_cancel: {
        backgroundColor: "transparent",
        borderRadius: 45,
        padding: 16,
        paddingHorizontal: 20,
        marginHorizontal: 20
    },
    button_cancel_text: {
        color: "#BCBCBC",
        fontFamily: 'PlusJakartaSans-Bold',
        textAlign: "center"
    },
    popupContainerStyle: {
        backgroundColor: "#2A2A2A",
        width: '90%',
        justifyContent: "center"
    },
    inputWrapperStyle: {
        borderColor: "#C0C0C0",
        borderWidth: 0.5
    },
    inputgroup_label: {
        color: "#fff",
        fontFamily: 'PlusJakartaSans-Bold',
    },
    inputgroup: {
        paddingHorizontal: 20,
        flexDirection: "column",
        gap: 15
    },
    formgroup: {
        paddingTop: 20
    },
    inputWrapperStyle2: {
        backgroundColor: "#2A2A2A",
    }

})