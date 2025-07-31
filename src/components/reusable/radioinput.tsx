// components/RadioInput.tsx
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

export type RadioOption = {
  label: string;
  value: string;
  description?: string; // the value shown on right (e.g., price)
  disabled?: boolean;
};

type RadioInputProps = {
  options: RadioOption[];
  selectedValue: string | null;
  onValueChange: (val: string) => void;
  direction?: 'row' | 'column';
  containerStyle?: ViewStyle;
  optionStyle?: ViewStyle;
  labelStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  children?: any
};

const RadioInput: React.FC<RadioInputProps> = ({
  options,
  selectedValue,
  onValueChange,
  direction = 'column',
  containerStyle,
  optionStyle,
  labelStyle,
  descriptionStyle,
  children
}) => {
  return (
    <View
      style={[styles.group, direction === 'row' && styles.row, containerStyle]}
      accessibilityRole="radiogroup"
    >
      {options.map((opt, idx) => {
        const isSelected = selectedValue === opt.value;
        const disabled = !!opt.disabled;

        return (
          <Pressable
            key={idx}
            style={[styles.option, optionStyle, disabled && styles.disabled]}
            onPress={() => {
              if (disabled) return;
              onValueChange(opt.value);
            }}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected, disabled }}
            accessibilityLabel={opt.label}
            disabled={disabled}
          >
            <View style={styles.left}>
              <View
                style={[
                  styles.outer,
                  isSelected && styles.outerSelected,
                  disabled && styles.outerDisabled,
                ]}
              >
                {isSelected && <View style={styles.inner} />}
              </View>
              <Text style={[styles.label, labelStyle, disabled && styles.labelDisabled]}>
                {opt.label}
              </Text>
              {opt.description ? (
                <Text style={[styles.rightLabel, descriptionStyle]}>
                  ({opt.description})
                </Text>
              ) : null}
            </View>
          </Pressable>
        );
      })}
      {children}

    </View>
  );
};

export default RadioInput;

const RADIO_SIZE = 18;
const INNER_SIZE = 8;

const styles = StyleSheet.create({
  group: {
    flexDirection: 'column',
    gap: 4,
  },
  row: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // gap: 12,
  },
  option: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // paddingVertical: 8,
    // paddingHorizontal: 6,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
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
  outerDisabled: {
    borderColor: '#ccc',
  },
  inner: {
    width: INNER_SIZE,
    height: INNER_SIZE,
    borderRadius: INNER_SIZE / 2,
    backgroundColor: '#007aff',
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
  labelDisabled: {
    color: '#999',
  },
  rightLabel: {
    fontSize: 14,
    color: '#666',
  },
  disabled: {
    opacity: 0.6,
  },
});
