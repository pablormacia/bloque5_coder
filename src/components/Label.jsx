
import React from "react";
import { View, Text,StyleSheet } from "react-native";


const Label = ({ children, style, label, subLabel, subLabelStyle }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, style]}>{label}</Text>
      {children}
      {subLabel && <Text style={[styles.subLabel, subLabelStyle]}>{subLabel}</Text>}
    </View>
  );
};
export default Label;

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
    },
    label: {
      fontSize: 14,
      color: "#333",
    },
  });