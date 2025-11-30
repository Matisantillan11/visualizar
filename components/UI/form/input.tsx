import { theme } from "@/constants";
import React from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "../input/input.component";
import { InputProps } from "../input/interfaces/input.interface";

interface FormInputProps<T extends FieldValues>
  extends Omit<InputProps, "value" | "onChangeText"> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  rules?: any;
}

export function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  rules,
  ...props
}: FormInputProps<T>) {
  return (
    <Controller
      control={form.control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          <Input
            {...props}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            styles={{
              wrapper: error ? { borderColor: theme.error.main } : undefined,
              ...props.styles,
            }}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: theme.gray.gray700,
    fontWeight: "500",
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: theme.text.error,
  },
});
