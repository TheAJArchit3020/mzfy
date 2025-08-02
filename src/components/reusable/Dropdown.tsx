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
} from 'react-native';
import { ChevronDownIcon, ChevronUpIcon } from 'react-native-heroicons/solid';
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
}

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select',
  style,
  label,
}) => {
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
    dropdownStyle.maxHeight = 130;
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
    <View style={{ marginBottom: 16 }}>
      {label && <Text style={styles.label}>{label}</Text>}
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
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
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
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 0.5,
    borderColor: '#C0C0C0',
    borderRadius: widthToDP(3),
    paddingHorizontal: 12,
    paddingVertical: 14,

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
    marginTop: -10,

  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFFFFF',
    width: "100%"
  },
  optionText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-SemiBold',
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
});

export default memo(Dropdown);
