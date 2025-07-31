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
  children?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeContent,
  textHeader,
  label,
  type = "text",
  style,
  children,
  ...rest
}) => {
  return (
    <View style={{ marginBottom: hp(2) }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
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
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderRadius: wp(4),
    flexDirection: "row",
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.5),
    justifyContent: "space-between",
    marginTop: 0,
  },
  input: {
    flex: 1,
    paddingHorizontal: wp(2),
    color: "#e5e5f7",
    fontSize: wp(4),
    padding: 0,
    backgroundColor: "transparent",
    fontFamily: "PlusJakartaSans-Medium",
  },
  label: {
    marginBottom: hp(2),
    fontSize: wp(4),
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
  },
});

export default memo(Input);
