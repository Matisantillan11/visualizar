import { theme } from "@/constants";
import React from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import Dropdown from "../dropdown";

interface Option {
  label: string;
  value: string;
}

interface FormSelectorProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  options: Option[];
  multiple?: boolean;
}

export function FormSelector<T extends FieldValues>({
  form,
  name,
  label,
  options,
  multiple = false,
}: FormSelectorProps<T>) {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          <Dropdown
            value={value ?? []}
            onChange={onChange}
            options={options}
            multiple={multiple}
            style={error ? { borderColor: theme.text.error } : undefined}
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
