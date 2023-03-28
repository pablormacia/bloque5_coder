import React from "react";
import { View, Text, TextInput,StyleSheet } from "react-native";

import Label from "./Label";

const Input = ({
  editable,
  children,
  value,
  onChangeText,
  onFocus,
  onBlur,
  maxLength,
  placeholder,
  placeholderTextColor,
  keyboardType,
  hasError,
  error,
  touched,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Label {...props}>
        <TextInput
          {...props}
          style={styles.input}
          editable={editable}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
        />
      </Label>
      {hasError && touched && (
        <View style={styles.message}>
          <Text style={styles.helperText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    input: {
      height: 45,
      borderBottomColor: "#ccc",
      borderBottomWidth: 1,
      width: "90%",
      marginBottom: 10,
    },
    message: {},
    helperText: {
      fontSize: 12,
      color: "red"
    },
  });