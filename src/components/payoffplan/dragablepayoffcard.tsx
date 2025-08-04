import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import ProgressBar from '@components/reusable/progressbar'
import Card from '@components/reusable/card'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import DraggableFlatList, {
    NestableScrollContainer,
    ScaleDecorator,
    ShadowDecorator,
    OpacityDecorator,
} from "react-native-draggable-flatlist"

interface payoffProps {
    data: any,
    source?: any,
    cardstyle?: any,
    cardcontainerstyle?: any
    showicon?: any
    showcustom?: any
    onDataChange?: (newData: any[]) => void
}

const DraggablePayoffcard: FC<payoffProps> = ({
    data,
    source,
    cardstyle,
    cardcontainerstyle,
    showicon = true,
    showcustom = false,
    onDataChange
}) => {
    const [localData, setLocalData] = useState(data);

    const keyExtractor = (item: any) => item.id?.toString() || item.name;

    const renderItem = ({ item, drag, isActive }: any) => {
        return (
            <View style={[styles.cardcontainer_inner, isActive && styles.activeItem]}>
                <TouchableOpacity onLongPress={drag} style={styles.dragHandle}>
                    <Image source={require('@images/payoffplan/drag.png')} style={styles.dragimage} />
                </TouchableOpacity>
                <Card style={[styles.section_card, cardstyle]} cardStyle={styles.section_card_inner}>
                    <View style={styles.groupsection}>
                        <Text style={styles.groupsection_text1}>{item.name}</Text>
                        <Text style={styles.groupsection_text2}>{item.time}</Text>
                        {showicon && <TouchableOpacity style={styles.button}>
                            <Image source={source} style={styles.editimage} />
                        </TouchableOpacity>}
                    </View>
                    <View style={styles.groupsection2}>
                        {showcustom ? (
                            <Text style={styles.groupsection_text1}>Monthly Minimum (EMI): {item.minamt} {'\u20B9'}</Text>
                        ) : (
                            <Text style={styles.groupsection_text1}>Minimun: {item.minamt} {'\u20B9'}</Text>
                        )}
                        <Text style={styles.groupsection_text1}>APR: {item.apr}</Text>
                    </View>
                    <View style={styles.groupsection3}>
                        <Text style={styles.groupsection_text1}>Payoff Progress</Text>
                        <ProgressBar
                            progress={item?.payoffprogress}
                            tooltipLabel={`Balance 20,000 ${'\u20B9'}`}
                            showTooltip={true}
                            style={styles.progressbar}
                        />
                        <Text style={styles.groupsection_text1}>{item.payoffprogress} %</Text>
                    </View>
                </Card>
            </View>
        )
    };

    const handleDragEnd = ({ data: newData }: { data: any[] }) => {
        setLocalData(newData);
        if (onDataChange) {
            onDataChange(newData);
        }
    };

    return (
        <View style={styles.cardcontainer}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                {/* <NestableScrollContainer> */}
                <DraggableFlatList
                    data={localData}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    onDragEnd={handleDragEnd}
                    containerStyle={styles.flatListContainer}
                    contentContainerStyle={styles.flatListContent}
                />
                {/* </NestableScrollContainer> */}
            </GestureHandlerRootView>
        </View>
    )
}

export default DraggablePayoffcard

const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1,
        minHeight: '100%',
    },
    flatListContainer: {
        flex: 1,
    },
    flatListContent: {
        gap: 20,
    },
    section_card: {
        backgroundColor: "rgba(51, 255, 0, 0.38)",
        borderWidth: 0,
        width: '88%',
        alignSelf: "center",
        paddingHorizontal: 10,
        borderRadius: 12
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
        fontSize: 10
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
    },
    editimage: {
        width: 16,
        height: 16,
        resizeMode: "contain"
    },
    dragimage: {
        width: 16,
        height: 26,
        resizeMode: "contain"
    },
    cardcontainer_inner: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 5,
    },
    dragHandle: {
        padding: 5,
    },
    activeItem: {
        opacity: 0.8,
        transform: [{ scale: 1.02 }],
    }
})