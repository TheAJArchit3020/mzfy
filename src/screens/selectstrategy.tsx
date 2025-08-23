import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Header from '@components/reusable/header'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Card from '@components/reusable/card'
import { heightToDP, widthToDP } from 'react-native-responsive-screens'
import Dropdown from '@components/reusable/dropdown'
import Customstrategydropdown from '@components/strategy/customstrategydropdown'
import Button from '@components/reusable/button'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '@managers/routing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@redux/store'
import { addStrategy, fetchAllCustomStrategy, fetchStrategy } from '@redux/strategies/strategySlice'
import { formatDuration } from '@components/reusable/formatdate'
import Aimodal from '@components/chatai/aimodal'


interface CustomOption {
    id: number;
    label: string;
    value: string;
}

const customOptions: CustomOption[] = [
    { id: 1, label: "Custom plan 1", value: "Custom1" },
    { id: 2, label: "Custom2", value: "Custom2" },
    { id: 3, label: "Custom3", value: "Custom3" },
    { id: 4, label: "Custom4", value: "Custom4" },

];

type Strategy = {
    key: string
    title: string
    advantage: string
    payoffTime: string
    interestSaved: string
    hasCrown?: boolean,
    subtitle?: string
}

type StrategyPlan = {
    avalanche?: any;
    snowball?: any;
    hybrid?: any;
    custom?: any;

};




// move this out as a proper component so it can get props
const CustomDropdown: FC<{
    customPlan: string
    setCustomPlan: (val: string) => void
}> = ({ customPlan, setCustomPlan }) => {
    return (

        <Customstrategydropdown
            style={styles.dropdown}
            options={customOptions}
            value={customPlan}
            onChange={(val: any) => setCustomPlan(val)}
            placeholder="custom plan"
            maxheight={140}
        />
    )
}

type navProps = NativeStackNavigationProp<RootStackParams>



const Selectstrategy: FC = () => {

    const navigation = useNavigation<navProps>();
    const dispatch = useDispatch<AppDispatch>();

    const [selectedStrategy, setSelectedStrategy] = useState('')
    const [customPlan, setCustomPlan] = useState('')

    const handleSelect = async () => {
        await dispatch(addStrategy(selectedStrategy))
        navigation.navigate('layoutscreen')
    }

    useFocusEffect(
        React.useCallback(() => {
            const fetchPayoffPlans = async () => {
                try {
                    await dispatch(fetchStrategy()).unwrap();
                    await dispatch(fetchAllCustomStrategy()).unwrap();
                } catch (error) {
                    console.error('Error fetching payoff plans:', error);
                }
            };

            fetchPayoffPlans();
        }, [])
    )

    const strategyPlanArray = useSelector((state: RootState) => state?.strategy?.items[0]) ?? [];

    const currentCurrency = useSelector((state: RootState) => state.user?.current?.selectedCurrency)

    const selectedCurrency = useSelector((state: RootState) => state.user?.items[0]?.selectedCurrency)

    const customPlansArray = useSelector((state: RootState) => state.strategy?.customitems?.plans ?? [])

    interface CustomOption {
        id: number;
        label: string;
        value: string;
    }

    const customOptions: CustomOption[] = (customPlansArray ?? []).map(
        (plan: any, index: number) => ({
            id: index + 1,
            label: plan.name,
            value: plan.id,
        })
    );

    console.log("strategyPlanArray : ", strategyPlanArray)





    const STRATEGIES: Strategy[] = [
        {
            key: 'Hybrid',
            title: 'Hybrid',
            advantage: 'Hybrid Plan',
            payoffTime: formatDuration(strategyPlanArray?.hybrid?.estimatedDebtFreeDate),
            interestSaved: `${currentCurrency ? currentCurrency : selectedCurrency} ${strategyPlanArray?.hybrid?.totalInterestPaid?.toLocaleString()}`,
            subtitle: '(Hybrid Plan)'

        },
        {
            key: 'Debt Avalanche',
            title: 'avalanche',
            advantage: 'Fastest payoff and least interest ',
            payoffTime: formatDuration(strategyPlanArray?.avalanche?.estimatedDebtFreeDate),
            interestSaved: `${currentCurrency ? currentCurrency : selectedCurrency} ${strategyPlanArray?.avalanche?.totalInterestPaid?.toLocaleString()}`,
            subtitle: '(Prioritize highest interest rate)'
        },
        {
            key: 'Debt Snowball',
            title: 'snowball',
            advantage: 'The most quick wins',
            payoffTime: formatDuration(strategyPlanArray?.snowball?.estimatedDebtFreeDate),
            interestSaved: `${currentCurrency ? currentCurrency : selectedCurrency} ${strategyPlanArray?.snowball?.totalInterestPaid?.toLocaleString()}`,
            subtitle: '(Prioritize lowest balance first)'
        },
        {
            key: 'Custom',
            title: 'Custom',
            advantage: 'Customized Plan',
            payoffTime: formatDuration(strategyPlanArray?.custom?.estimatedDebtFreeDate),
            interestSaved: `${selectedCurrency} ${strategyPlanArray?.custom?.totalInterestPaid?.toLocaleString()}`,
            subtitle: '(Customized Plan)'

        },

    ]


    const isDisabled = !selectedStrategy?.trim();


    return (
        <LinearGradient
            colors={['#5145BC', '#2F2C4A', '#2B293E', '#272631', '#232323']}
            locations={[0, 0.64, 0.76, 0.87, 1]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <Header title='Select your debt pay off strategy' showBackButton={false} />

            <View style={styles.container}>

                <Card cardStyle={styles.innercardstyle}>
                    {STRATEGIES.map((strategy, idx) => {
                        const selected = selectedStrategy === strategy.title
                        return (
                            <View key={strategy.key}>
                                <View style={styles.radiocard}>
                                    <TouchableOpacity
                                        style={styles.optionRow}
                                        activeOpacity={0.7}
                                        onPress={() => setSelectedStrategy(strategy.title)}
                                    >
                                        <View style={styles.radioWrapper}>
                                            <View
                                                style={[styles.outer, selected && styles.outerSelected]}
                                            >
                                                {selected && <View style={styles.inner} />}
                                            </View>
                                        </View>
                                        <View style={[styles.titleGroup, strategy.subtitle && { justifyContent: "flex-start", gap: 5 }]}>
                                            <Text style={styles.title}>{strategy.title}</Text>
                                            {strategy.hasCrown && (
                                                <Image
                                                    source={require('@images/registration/crown.png')}
                                                    style={styles.crownimage}
                                                />
                                            )}
                                            {strategy.subtitle && <Text style={styles.subtitle}>{strategy.subtitle}</Text>}
                                        </View>
                                    </TouchableOpacity>

                                    {strategy.key === 'Custom' && (
                                        // <CustomDropdown customPlan={customPlan} setCustomPlan={setCustomPlan} />
                                        <Customstrategydropdown

                                            style={styles.dropdown}
                                            options={customOptions}
                                            value={customPlan}
                                            onChange={(val: any) => setCustomPlan(val)}
                                            placeholder="Custom plan"
                                            maxheight={140}
                                            onSelect={setSelectedStrategy}
                                        />
                                    )}

                                    <View style={styles.radio_content}>
                                        <Text style={styles.label}>Advantage : </Text>
                                        <Text style={styles.value}>{strategy.advantage}</Text>
                                    </View>

                                    <View style={styles.radio_content}>
                                        <Text style={styles.label}>
                                            Time to all debts paid off :
                                        </Text>
                                        <Text style={styles.value}> {strategy.payoffTime}</Text>
                                    </View>

                                    <View style={styles.radio_content}>
                                        <Text style={styles.label}>Interest saved : </Text>
                                        <Text style={styles.value}>{strategy.interestSaved}</Text>
                                    </View>
                                </View>

                                {idx !== 3 ? <View style={styles.divider} /> : null}
                            </View>
                        )
                    })}
                </Card>

                <View style={styles.buttonWrapper}>
                    <Button
                        style={isDisabled ? styles.disableButton : styles.button}
                        onPress={isDisabled ? undefined : handleSelect}  // extra safety
                        disabled={isDisabled}
                    >
                        <Text style={styles.buttonText}>Select strategy</Text>
                    </Button>
                </View>

                <Aimodal style={styles.aiContainer} imagestyle={styles.aiimagestyle} text={"Need help choosing a plan? Tap Pennie - AI"} />
            </View>

        </LinearGradient>
    )
}

export default Selectstrategy

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: widthToDP(6),
        flexDirection: "column",
    },
    gradient: {
        flex: 1
    },
    innercardstyle: {
        flexDirection: "column",
        gap: 24,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    radioWrapper: {
        padding: 4,
    },
    outer: {
        width: 16,
        height: 16,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#888',
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerSelected: {
        borderColor: '#fff',
    },
    inner: {
        width: 9,
        height: 9,
        borderRadius: 6,
        backgroundColor: '#006FFF',
    },
    titleGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
    },
    radio_content: {
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 16,
        textTransform: "capitalize",
        marginTop: Platform.OS === 'android' ? -5 : 0,
    },
    label: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 10
    },
    value: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 10
    },
    crownimage: {
        width: 20,
        height: 20
    },
    radiocard: {
        flexDirection: "column",
        gap: heightToDP(1)
    },
    divider: {
        borderWidth: 1,
        borderColor: "#fff",
        marginTop: 30
    },
    subtitle: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 9
    },

    dropdown: {
        overflow: "hidden",
        borderRadius: 10,
        // borderWidth: 0,
    },
    buttonText: {
        color: "#F7F7F7",
        fontSize: 16,
        fontFamily: "PlusJakartaSans-Bold",
        textAlign: "center",
    },
    button: {
        backgroundColor: "#006FFF",
        paddingHorizontal: 20,
        width: "100%",
        alignSelf: "center",
        borderRadius: widthToDP(50),
        padding: widthToDP(2.5),
        marginBottom: heightToDP(1),
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: "flex-end",
        // marginTop: heightToDP(4),
    },
    scrollview: {
        flexGrow: 1,
    },
    aiContainer: {
        zIndex: 1,
        bottom: heightToDP(10)
    },
    aiimagestyle: {
        width: 70,
        height: 70,
    },
    disableButton: {
        backgroundColor: "#9d9d9dff",
        paddingHorizontal: 20,
        width: "100%",
        alignSelf: "center",
        borderRadius: widthToDP(50),
        padding: widthToDP(2.5),
        marginBottom: heightToDP(1),
    }
})
