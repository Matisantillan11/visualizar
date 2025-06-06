import { StyleSheet, TextInput, View } from "react-native";

import { theme } from "@/constants";
import { FC } from "react";
import { InputProps } from "./interfaces";

export const Input: FC<InputProps> = (props) => {
  const { rightIcon, leftIcon, styles: customStyles, ...restProps } = props;

  return (
    <View
      style={[
        styles.wrapper,
        customStyles?.wrapper,
        {
          backgroundColor: props.disabled ? theme.gray.gray350 : "transparent",
        },
      ]}
    >
      {rightIcon && rightIcon}

      <TextInput
        style={[props.style, styles.input, customStyles?.input]}
        placeholderTextColor={theme.gray.gray400}
        {...restProps}
      />

      {leftIcon && leftIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.gray.gray350,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: theme.gray.gray400,
  },
});
