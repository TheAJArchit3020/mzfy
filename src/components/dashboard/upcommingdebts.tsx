// components/UpcomingDebtsWithScrollbar.tsx
import React, { useState, useRef } from "react";
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
import { formatDDMMMyyyy } from '@components/reusable/formatdate'
import { widthToDP } from 'react-native-responsive-screens'

// export interface DebtItem {
//     name: string
//     amount: number
//     date: string

// }

interface UpcomingDebtsWithScrollbarProps {
  data: any
  style?: any
  cardStyle?: any
  sort?: any
  showicon?: any
}

const UpcomingDebtsWithScrollbar: React.FC<UpcomingDebtsWithScrollbarProps> = ({
  data,
  cardStyle,
  style,
  sort = true,
  showicon = true,
}) => {

  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(1);
  const [scrollY, setScrollY] = useState(0);


  // Calculate scrollbar dimensions
  const scrollableRange = Math.max(contentHeight - containerHeight, 1);
  const thumbHeight = Math.max(
    (containerHeight / contentHeight) * 120, // 120px is the track height
    20 // minimum thumb height
  );
  const maxThumbPos = 120 - thumbHeight;
  const thumbTop =
    scrollableRange > 0 ? (scrollY / scrollableRange) * maxThumbPos : 0;

  const onContainerLayout = (e: LayoutChangeEvent) => {
    const height = e.nativeEvent.layout.height
    setContainerHeight(height)
  }

  const onContentSizeChange = (_: number, h: number) => {
    setContentHeight(h)
  }

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.y
    setScrollY(offset)
  }

  const scrollViewRef = useRef<ScrollView>(null)

  return (
    <Card style={[styles.card, style]} cardStyle={[styles.innerCard, cardStyle]}>
      <View style={styles.scrollArea} onLayout={onContainerLayout}>
        <ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          onContentSizeChange={onContentSizeChange}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled={true}
          ref={scrollViewRef}
        >
          {data?.map((item: any, idx: any) => {

            const isLast = idx === data.length - 1
            return (
              <View key={idx}>
                {sort ?
                  (<View
                    style={[
                      styles.row,
                      isLast && styles.noBorder,
                    ]}
                  >
                    <Text style={[styles.text, { textAlign: "left" }]}>{formatDDMMMyyyy(item?.dueDate)}</Text>

                    <Text style={styles.text}>
                      {'\u20B9'} {item.amount}
                    </Text>
                    <Text style={[styles.text, { textAlign: item.debtName ? "left" : "right" }]}>
                      {item.name ?? item.debtName}</Text>

                    {showicon && <TouchableOpacity>
                      <Image source={require('@images/dashboard/rightarrow.png')} style={styles.image} />
                    </TouchableOpacity>}
                  </View>)
                  : (<View
                    style={[
                      styles.row,
                      isLast && styles.noBorder,
                    ]}
                  >
                    <Text style={styles.text}>{formatDDMMMyyyy(item?.dueDate)}</Text>
                    <Text style={styles.text}></Text>
                    <Text style={[styles.text]}>
                      {'\u20B9'} {item.amount} /-
                    </Text>
                    {showicon && <TouchableOpacity>
                      <Image source={require('@images/dashboard/rightarrow.png')} style={styles.image} />
                    </TouchableOpacity>}
                  </View>)}
              </View>
            )
          })}
        </ScrollView>

        {/* Custom scrollbar */}
        {contentHeight > containerHeight && (
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
        )}
      </View>
    </Card>
  );
};

export default UpcomingDebtsWithScrollbar;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 0,
    height: 200,
  },
  innerCard: {
    padding: 0,
    justifyContent: 'flex-start',
    overflow: 'visible',
    // backgroundColor: "#2A2A2A"

  },
  scrollArea: {
    height: 200,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 0.2,
    paddingTop: 25,
    paddingBottom: 12,
    marginHorizontal: 30,

  },
  noBorder: {
    borderBottomWidth: 0,
  },
  text: {
    color: '#fff',
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    width: '30.33%',
    textAlign: "center"
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
