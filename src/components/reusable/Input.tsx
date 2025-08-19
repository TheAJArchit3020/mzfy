import React, { memo } from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";

interface InputProps extends Omit<TextInputProps, "onChangeText" | "value"> {
  value?: string | number;
  onChangeContent?: (value: string) => void;
  label?: string;
  textHeader?: string;
  type?: "text" | "number";
  style?: any;
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputWrapperStyle?: any;
  children?: React.ReactNode;
  iconAbove?: React.ReactNode;
  onIconPress?: () => void; // <-- NEW Handler
  iconDisabled?: boolean; // <-- NEW Disabled Prop
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeContent,
  label,
  textHeader,
  type = "text",
  containerStyle,
  inputWrapperStyle,
  icon,
  style,
  children,
  iconAbove,
  onIconPress,
  iconDisabled = true,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.lableContainer}>
        {label && <Text style={styles.label}>{label}</Text>}
        {icon && (
          <TouchableOpacity
            disabled={iconDisabled}
            onPress={onIconPress}
            activeOpacity={iconDisabled ? 1 : 0.6}
          >
            {icon}
          </TouchableOpacity>
        )}
      </View>
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
  container: {
    marginBottom: hp(2),
  },
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
  lableContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: wp(1),
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
    paddingHorizontal: 5,
  },
  label: {
    marginBottom: hp(2),
    fontSize: wp(4),
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
  },
});

export default memo(Input);
