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
import { LogExpenseCategoryItem } from "src/commonTypes";

interface CustomDropdownProps {
  options: any[];
  value: string | number | null;
  onChange: (value: any) => void;
  placeholder?: string;
  style?: any;
  label?: string;
  showScrollIndicator?: boolean;
  maxHeight?: number;
}

export const CustomScrollIndicator: React.FC<{
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

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "",
  style,
  label,
  showScrollIndicator = true,
  maxHeight = 200,
}) => {
  const [visible, setVisible] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const selected = options.find((opt) => opt.name === value);
  console.log("options", options);
  return (
    <View style={styles.container}>
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
            {selected ? selected.name : placeholder}
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
                <View key={String(item.name)}>
                  <TouchableOpacity
                    style={[
                      styles.option,
                      item.name === value && styles.selectedOption,
                    ]}
                    onPress={() => {
                      onChange(item);
                      setVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        item.name === value && styles.selectedOptionText,
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.divider} />
                </View>
              ))}
            </ScrollView>
            {contentHeight > containerHeight &&
              containerHeight > 0 &&
              showScrollIndicator && (
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
  container: {},
  dropdownContainer: {
    zIndex: 1000,
  },
  dropdown: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderRadius: wp(4),
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
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
    marginTop: hp(2),
    maxHeight: hp(25),
    backgroundColor: "#1a1a2e",
    paddingVertical: hp(2),
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: "#BCBCBC",
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
    borderRadius: wp(4),
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
  },
  option: {
    width: "85%",
    paddingBottom: hp(1),
    alignSelf: "center",
  },
  selectedOption: {
    backgroundColor: "#2a2a3e",
    width: "100%",
  },
  optionText: {
    fontSize: wp(4),
    color: "#e5e5f7",
    fontFamily: "PlusJakartaSans-Regular",
  },
  selectedOptionText: {
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
    paddingLeft: wp(7),
  },
  divider: {
    width: "85%",
    height: 1,
    backgroundColor: "#F7F7F7",
    alignSelf: "center",
  },
  scrollIndicatorContainer: {
    position: "absolute",
    right: wp(2.5),
    top: wp(2),
    bottom: wp(2),
    width: wp(0.8),
    backgroundColor: "#D9D9D9",
    borderRadius: wp(0.75),
    overflow: "hidden",
  },
  scrollIndicator: {
    width: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: wp(0.75),
  },
});

export default memo(CustomDropdown);
