import React, { memo } from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
} from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";

interface InputProps extends Omit<TextInputProps, "onChangeText" | "value"> {
  value: string | number;
  onChangeContent: (value: string) => void;
  label?: string;
  textHeader?: string;
  type?: "text" | "number";
  style?: any;
  inputWrapperStyle?: any;
  children?: React.ReactNode;
  iconAbove?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeContent,
  label,
  textHeader,
  type = "text",
  inputWrapperStyle,
  style,
  children,
  iconAbove,
  ...rest
}) => {
  return (
    <View style={{ marginBottom: hp(2) }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, inputWrapperStyle]}>
        {iconAbove && (
          <View style={styles.iconAboveContainer}>{iconAbove}</View>
        )}
        {textHeader && (
          <Text style={[styles.label, { marginBottom: 0 }]}>{textHeader}</Text>
        )}
        <TextInput
          value={String(value)}
          onChangeText={onChangeContent}
          keyboardType={type === "number" ? "numeric" : "default"}
          style={[styles.input, style]}
          {...rest}
        />
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: "transparent",
    borderWidth: 0.5,
    flexDirection: "row",
    borderColor: "#BCBCBC",
    borderRadius: wp(3),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    justifyContent: "center",
    marginTop: 0,
  },
  iconAboveContainer: {
    alignItems: "center",
    marginBottom: hp(1),
  },
  input: {
    color: "#e5e5f7",
    fontSize: wp(4.5),
    flex: 1,
    padding: 0,
    backgroundColor: "transparent",
  },
  label: {
    marginBottom: hp(2),
    fontSize: wp(4),
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
  },
});

export default memo(Input);
