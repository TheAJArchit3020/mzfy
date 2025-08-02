import React, { memo, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import { ChevronDownIcon, ChevronUpIcon } from "react-native-heroicons/outline";

interface Option {
  label: string;
  value: string | number;
}

interface CustomDropdownProps {
  options: Option[];
  value: string | number | null;
  onChange: (value: string | number | null) => void;
  placeholder?: string;
  style?: any;
  label?: string;
  maxHeight?: number;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  style,
  label,
  maxHeight = 200,
}) => {
  const [visible, setVisible] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const selected = options.find((opt) => opt.value === value);

  const CustomScrollIndicator: React.FC<{
    scrollOffset: number;
    contentHeight: number;
    containerHeight: number;
  }> = ({ scrollOffset, contentHeight, containerHeight }) => {
    const indicatorHeight = Math.max(
      (containerHeight / contentHeight) * containerHeight,
      20
    );

    const maxScrollDistance = contentHeight - containerHeight;
    const maxIndicatorDistance = containerHeight - indicatorHeight;

    const indicatorPosition =
      maxScrollDistance > 0
        ? (scrollOffset / maxScrollDistance) * maxIndicatorDistance
        : 0;

    return (
      <View style={styles.scrollIndicatorContainer}>
        <View
          style={[
            styles.scrollIndicator,
            {
              height: indicatorHeight,
              transform: [{ translateY: indicatorPosition }],
            },
          ]}
        />
      </View>
    );
  };

  return (
    <View style={{ marginBottom: hp(2) }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={[styles.dropdown, style]}
          onPress={() => setVisible(!visible)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.dropdownText,
              { color: selected ? "#e5e5f7" : "#888" },
            ]}
          >
            {selected ? selected.label : placeholder}
          </Text>
          {visible ? (
            <ChevronUpIcon size={20} color="#e5e5f7" />
          ) : (
            <ChevronDownIcon size={20} color="#e5e5f7" />
          )}
        </TouchableOpacity>

        {visible && (
          <View style={[styles.optionsContainer]}>
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              scrollEventThrottle={16}
              onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
                const offset = event.nativeEvent.contentOffset.y;
                setScrollOffset(offset);
              }}
              onLayout={(event) => {
                setContainerHeight(event.nativeEvent.layout.height);
              }}
              onContentSizeChange={(width: number, height: number) => {
                setContentHeight(height);
              }}
              style={styles.scrollView}
            >
              {options.map((item) => (
                <TouchableOpacity
                  key={String(item.value)}
                  style={[
                    styles.option,
                    item.value === value && styles.selectedOption,
                  ]}
                  onPress={() => {
                    onChange(item.value);
                    setVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value && styles.selectedOptionText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {contentHeight > containerHeight && containerHeight > 0 && (
              <CustomScrollIndicator
                scrollOffset={scrollOffset}
                contentHeight={contentHeight}
                containerHeight={containerHeight}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    zIndex: 1000,
  },
  dropdown: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 0,
  },
  dropdownText: {
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Regular",
    flex: 1,
  },
  label: {
    marginBottom: hp(2),
    fontSize: wp(4),
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
  },
  optionsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    maxHeight: hp(25),
    backgroundColor: "#1a1a2e",
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    zIndex: 1001,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scrollView: {
    flex:1,
    borderRadius: wp(4),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,

    borderWidth:2,
    borderColor:'#fff'
  },
  option: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a3e",
  },
  selectedOption: {
    backgroundColor: "#2a2a3e",
  },
  optionText: {
    fontSize: wp(4.5),
    color: "#e5e5f7",
    fontFamily: "PlusJakartaSans-Regular",
  },
  selectedOptionText: {
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
  },
  scrollIndicatorContainer: {
    position: "absolute",
    right: wp(1),
    top: wp(1),
    bottom: wp(1),
    width: wp(1.5),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: wp(0.75),
  },
  scrollIndicator: {
    width: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: wp(0.75),
  },
});

export default memo(CustomDropdown);
