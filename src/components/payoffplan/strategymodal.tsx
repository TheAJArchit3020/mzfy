// components/StrategyRadioCard.tsx
import Customstrategydropdown from '@components/strategy/customstrategydropdown';
import { useFocusEffect } from '@react-navigation/native';
import { AppDispatch, RootState } from '@redux/store';
import { fetchAllCustomStrategy } from '@redux/strategies/strategySlice';
import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ViewStyle,
    TextStyle,
    Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


export type StrategyOption = {
    title: string; // e.g., "Debt Avalanche"
    subtitle?: string; // e.g., "(Prioritize highest interest rate)"
    advantage: string;
    timeToPayoff: string; // e.g., "28 Days"
    interestSaved: string; // e.g., "₹1500"
    value: string;
    disabled?: boolean;
};

type Props = {
    option: StrategyOption;
    selectedValue: string | null;
    onSelect: (val: string) => void;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    infoLabelStyle?: TextStyle;
    infoValueStyle?: TextStyle;
    onClose2?: () => void;
    customPlan: any
    setCustomPlan: any
};

const StrategyRadioCard: React.FC<Props> = ({
    option,
    selectedValue,
    onSelect,
    containerStyle,
    titleStyle,
    subtitleStyle,
    infoLabelStyle,
    infoValueStyle,
    onClose2,
    customPlan,
    setCustomPlan
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const isSelected = selectedValue === option.value;
    const disabled = !!option.disabled;

    useFocusEffect(
        React.useCallback(() => {
            getCustomPlan();
        }, [])
    );


    const getCustomPlan = async () => {
        try {
            await dispatch(fetchAllCustomStrategy())
        } catch (error) {
            console.log(error);
        }

    }

    const customPlansArray = useSelector((state: RootState) => state.strategy?.customitems[0] ?? [])
    console.log("customPlansArray : ", customPlansArray?.plans)



    interface CustomOption {
        id: number;
        label: string;
        value: string;
    }

    const customOptions: CustomOption[] = (customPlansArray?.plans ?? []).map(
        (plan: any, index: number) => ({
            id: index + 1,
            label: plan.name,
            value: plan.id,
        })
    );

    return (
        <Pressable
            onPress={() => {
                if (disabled) return;
                onSelect(option.value);
            }}
            style={[
                styles.card,
                isSelected && styles.cardSelected,
                disabled && styles.disabled,
                containerStyle,
            ]}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected, disabled }}
        >

            <View style={styles.topRow}>
                <View style={styles.radioWrapper}>
                    <View style={[styles.outer, isSelected && styles.outerSelected]}>
                        {isSelected && <View style={styles.inner} />}
                    </View>
                </View>
                <View style={styles.titleGroup}>
                    <Text style={[styles.title, titleStyle]} numberOfLines={1}>
                        {option.title}
                    </Text>
                    {option.subtitle ? (
                        <Text style={[styles.subtitle, subtitleStyle]} numberOfLines={1}>
                            ({option.subtitle})
                        </Text>
                    ) : null}
                </View>
            </View>

            {option.value === 'custom' && (
                <Customstrategydropdown
                    onClose2={onClose2}
                    style={styles.dropdown}
                    options={customOptions}
                    value={customPlan}
                    onChange={(val: any) => setCustomPlan(val)}
                    placeholder="custom plan"
                    maxheight={140}
                    onSelect={onSelect}
                />
            )}


            <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, infoLabelStyle]}>Advantage :</Text>
                <Text style={[styles.infoValue, infoValueStyle]}>
                    {option.advantage}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, infoLabelStyle]}>
                    Time to all debts paid off :
                </Text>
                <Text style={[styles.infoValue, infoValueStyle]}>
                    {option.timeToPayoff}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, infoLabelStyle]}>
                    Interest saved :
                </Text>
                <Text style={[styles.infoValue, infoValueStyle]}>
                    {option.interestSaved}
                </Text>
            </View>

            <View style={styles.divider} />
        </Pressable>
    );
};

export default StrategyRadioCard;

const RADIO_SIZE = 18;
const INNER_SIZE = 8;

const styles = StyleSheet.create({
    card: {
        // backgroundColor: '#1F1F1F',
        borderRadius: 16,
        padding: 16,
        // marginVertical: 6,
        // borderWidth: 1,
        // borderColor: 'transparent',
        flexDirection: "column"
    },
    cardSelected: {
        borderColor: '#007aff',
    },
    disabled: {
        opacity: 0.6,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
        gap: 12,
    },
    radioWrapper: {
        paddingTop: 2,
    },
    outer: {
        width: RADIO_SIZE,
        height: RADIO_SIZE,
        borderRadius: RADIO_SIZE / 2,
        borderWidth: 2,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerSelected: {
        borderColor: '#fff',
    },
    inner: {
        width: INNER_SIZE,
        height: INNER_SIZE,
        borderRadius: INNER_SIZE / 2,
        backgroundColor: '#4CB5F9',
    },
    titleGroup: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    title: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'PlusJakartaSans-Bold',
        marginTop: Platform.OS === 'android' ? -3 : 0
    },
    subtitle: {
        fontSize: 12,
        color: '#ccc',
        fontFamily: 'PlusJakartaSans-Regular',
        marginTop: 2,
    },
    infoRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
        gap: 4,
    },
    infoLabel: {
        fontSize: 12,
        color: '#fff',
        fontFamily: 'PlusJakartaSans-Bold',
        marginRight: 4,
    },
    infoValue: {
        fontSize: 12,
        color: '#fff',
        fontFamily: 'PlusJakartaSans-Regular',
    },
    divider: {
        height: 0.5,
        backgroundColor: '#F7F7F7',
        marginTop: 18,
    },
    dropdown: {
        overflow: "hidden",
        borderRadius: 10,
        // borderWidth: 0,
    }
});
