// components/UpcomingDebtsWithScrollbar.tsx
import React, { useState, useRef } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    NativeSyntheticEvent,
    NativeScrollEvent,
    LayoutChangeEvent,
    TouchableOpacity,
    Image,
} from 'react-native'
import Card from '@components/reusable/card'

export interface DebtItem {
    name: string
    amount: number
    date: string
}

interface UpcomingDebtsWithScrollbarProps {
    data: DebtItem[]
}

const UpcomingDebtsWithScrollbar: React.FC<UpcomingDebtsWithScrollbarProps> = ({
    data,
}) => {
    const [containerHeight, setContainerHeight] = useState(0)
    const [contentHeight, setContentHeight] = useState(1)
    const [scrollY, setScrollY] = useState(0)

    const thumbHeight = Math.max(
        (containerHeight / contentHeight) * 100,  // base thumb on 100px track
        20
    )
    const maxThumbPos = 100 - thumbHeight
    const scrollableRange = Math.max(contentHeight - containerHeight, 1)
    const thumbTop = (scrollY / scrollableRange) * maxThumbPos

    const onContainerLayout = (e: LayoutChangeEvent) =>
        setContainerHeight(e.nativeEvent.layout.height)

    const onContentSizeChange = (_: number, h: number) =>
        setContentHeight(h)

    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) =>
        setScrollY(e.nativeEvent.contentOffset.y)

    return (
        <Card style={styles.card} cardStyle={styles.innerCard}>
            <View style={styles.scrollArea} onLayout={onContainerLayout}>
                <ScrollView
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    onContentSizeChange={onContentSizeChange}
                    showsVerticalScrollIndicator={false}
                >
                    {data.map((item, idx) => {
                        const isLast = idx === data.length - 1
                        return (
                            <View
                                key={idx}
                                style={[
                                    styles.row,
                                    isLast && styles.noBorder,
                                ]}
                            >
                                <Text style={styles.text}>{item.name}</Text>
                                <Text style={styles.text}>
                                    {'\u20B9'} {item.amount}
                                </Text>
                                <Text style={styles.text}>{item.date}</Text>
                                <TouchableOpacity>
                                    <Image source={require('@images/dashboard/rightarrow.png')} style={styles.image} />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>

                {/* fixed‐height (100px) scrollbar track, vertically centered */}
                <View
                    style={[
                        styles.scrollbarTrack,
                        {
                            height: 120,
                            top: (containerHeight - 120) / 2,
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.scrollbarThumb,
                            { height: thumbHeight, top: thumbTop },
                        ]}
                    />
                </View>
            </View>
        </Card>
    )
}

export default UpcomingDebtsWithScrollbar

const styles = StyleSheet.create({
    card: {
        width: '100%',
        padding: 0,
    },
    innerCard: {
        padding: 0,
        justifyContent: 'flex-start',
        overflow: 'visible',
    },
    scrollArea: {
        height: 170,
        position: 'relative',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#C0C0C0',
        borderBottomWidth: 0.2,
        paddingTop: 25,
        paddingBottom: 12,
        marginHorizontal: 30
    },
    noBorder: {
        borderBottomWidth: 0,
    },
    text: {
        color: '#fff',
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: 14,
    },
    scrollbarTrack: {
        position: 'absolute',
        right: 14,
        width: 2,
        backgroundColor: '#D9D9D9',
        borderRadius: 4,
    },
    scrollbarThumb: {
        position: 'absolute',
        left: 0,
        width: 2,
        backgroundColor: '#006FFF',
        borderRadius: 4,
    },
    image: {
        width: 24,
        height: 24,
        resizeMode: "contain"
    },
})
