import { RootStackParams } from '@managers/routing';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { memo, useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
    LayoutRectangle,
    UIManager,
    findNodeHandle,
    Platform,
    LayoutChangeEvent,
    NativeSyntheticEvent,
    NativeScrollEvent,
    ScrollView,
    Image,
} from 'react-native';
import { ChevronDownIcon, ChevronUpIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';
import { widthToDP } from 'react-native-responsive-screens';

interface Option {
    label: string;
    value: string | number;
}

interface DropdownProps {
    options?: Option[];
    value?: string | number | null;
    onChange?: (value: string | number) => void;
    placeholder?: string;
    style?: any;
    label?: string;
    maxheight?: any;
    onClose2?: () => void;
    onSelect?: any
}

type navProps = NativeStackNavigationProp<RootStackParams>

const CustomStrategyDropdown: React.FC<DropdownProps> = ({
    options = [],
    value,
    onChange,
    placeholder = 'Select',
    style,
    label,
    maxheight = 130,
    onClose2,
    onSelect
}) => {
    const navigation = useNavigation<navProps>()
    const [visible, setVisible] = useState(false);
    const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
    const triggerRef = useRef<any>(null);
    const selected = options.find(opt => opt.value === value);

    // measure after layout when opening
    const measureTrigger = () => {
        if (!triggerRef.current) return;
        const node = findNodeHandle(triggerRef.current);
        if (!node) return;

        UIManager.measureInWindow(
            node,
            (x: number, y: number, width: number, height: number) => {
                setTriggerLayout({ x, y, width, height });
            }
        );
    };

    useEffect(() => {
        if (visible) {
            // small delay to ensure layout done
            setTimeout(measureTrigger, 0);
        }
    }, [visible]);

    // calculate dropdown position
    const dropdownStyle: any = {};
    if (triggerLayout) {
        dropdownStyle.position = 'absolute';
        dropdownStyle.left = Math.max(16, triggerLayout.x); // some padding
        dropdownStyle.width = triggerLayout.width;
        dropdownStyle.top = triggerLayout.y + triggerLayout.height + 4; // gap of 4
        // optional: limit max height so it doesn't overflow
        dropdownStyle.maxHeight = maxheight;
        dropdownStyle.zIndex = 1000;
    } else {
        // fallback center-ish if measurement not ready
        dropdownStyle.marginTop = 8;
        dropdownStyle.marginHorizontal = 16;
    }
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
        <View style={visible ? {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopRightRadius: 6,
            borderTopLeftRadius: 6, overflow: "hidden"
        } : { borderRadius: 6, overflow: "hidden" }}>
            <LinearGradient
                colors={['#636363', '#2F2C4A']} // subtle horizontal shift; or keep same if solid
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={style.gradient}
            >
                <TouchableOpacity
                    ref={triggerRef}
                    style={[
                        styles.dropdown,
                        style,
                        visible && {
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0
                        }]}
                    onPress={() => setVisible(true)}
                    activeOpacity={0.7}
                >
                    <View style={styles.innerRow}>
                        <Text
                            style={[
                                styles.selectedText,
                                { color: selected ? '#FFF' : '#FFF' },
                            ]}
                            numberOfLines={1}
                        >
                            {selected ? selected.label : placeholder}
                        </Text>
                        <View style={styles.arrow}>
                            {visible ? (
                                <ChevronUpIcon size={widthToDP(5)} color="#fff" />
                            ) : (
                                <ChevronDownIcon size={widthToDP(5)} color="#fff" />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>

                <Modal visible={visible} transparent animationType="none">
                    {/* outside tap catcher */}
                    <TouchableOpacity
                        style={styles.capture}
                        activeOpacity={1}
                        onPress={() => setVisible(false)}
                    />

                    {/* positioned list */}
                    <View style={[styles.modalContent, dropdownStyle]}  >
                        <View onLayout={onContainerLayout}>
                            <ScrollView
                                onContentSizeChange={onContentSizeChange}
                                onScroll={onScroll}
                                scrollEventThrottle={16}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingRight: 24 }} // leave space for scrollbar
                            >
                                {options.map((item, index) => (
                                    <TouchableOpacity
                                        key={`${String(item.value)}-${index}`}
                                        style={styles.option}
                                        onPress={() => {
                                            onChange && onChange(item.value);
                                            setVisible(false);
                                            onSelect(item.value);
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.optionText}>{item.label}</Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity
                                    key={9}
                                    style={styles.buttonoption}
                                    onPress={() => {
                                        navigation.navigate('createcustomplanscreen')
                                        setVisible(false);
                                    }}
                                    activeOpacity={0.7}
                                >
                                    <PlusCircleIcon color={'#fff'} size={13} />
                                    <Text style={styles.optionText}>Create custom plan</Text>
                                </TouchableOpacity>
                            </ScrollView>
                            <View
                                style={[
                                    styles.scrollbarTrack,
                                    {
                                        height: 100,
                                        top: (containerHeight - 100) / 2,
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
                    </View>
                </Modal>
            </LinearGradient>

        </View>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        borderRadius: 10
    },
    dropdown: {
        // borderWidth: 0.5,
        // borderColor: '#C0C0C0',
        borderRadius: widthToDP(3),
        paddingHorizontal: 12,
        paddingVertical: 10,

    },
    label: {
        marginBottom: 4,
        fontSize: 14,
    },
    innerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectedText: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
        fontFamily: 'PlusJakartaSans-Bold',
    },
    arrow: {
        marginLeft: 8,
    },
    capture: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
    },
    modalContent: {
        borderTopWidth: 0,
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        paddingVertical: 4,
        borderWidth: 0.5,
        borderColor: '#C0C0C0',
        maxHeight: 80,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        marginTop: -5,

    },
    option: {
        marginHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 0.5,
        borderBottomColor: '#FFFFFF',
        width: "90%",

    },
    optionText: {
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'PlusJakartaSans-SemiBold',
        marginTop: -2
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
    buttonoption: {
        backgroundColor: "#006FFF",
        borderRadius: 100,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        padding: 6,
        width: "auto",
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginVertical: 10
    }

});

export default memo(CustomStrategyDropdown);
