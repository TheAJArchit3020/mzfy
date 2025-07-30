import React, { memo } from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
} from "react-native";

interface InputProps extends Omit<TextInputProps, "onChangeText" | "value"> {
  value: string | number;
  onChangeContent: (value: string) => void;
  label?: string;
  type?: "text" | "number";
  style?: any;
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeContent,
  label,
  type = "text",
  style,
  ...rest
}) => {
  return (
    <View style={{ marginBottom: 16 }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={String(value)}
        onChangeText={onChangeContent}
        keyboardType={type === "number" ? "numeric" : "default"}
        style={[styles.input, style]}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: "#333",
  },
});

export default memo(Input);
