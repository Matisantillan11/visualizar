import { theme } from "@/constants";
import React from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "../radio-button";

interface Option {
  label: string;
  value: string;
}

interface FormRadioButtonProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  options: Option[];
  multiple?: boolean;
}

export function FormRadioButton<T extends FieldValues>({
  form,
  name,
  label,
  options,
}: FormRadioButtonProps<T>) {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <View key={option.value} style={styles.optionWrapper}>
                <RadioButton
                  label={option.label}
                  value={option?.value?.[0]}
                  status={
                    value?.includes(option.value) ? "checked" : "unchecked"
                  }
                  onPress={() => onChange(option.value)}
                  onBlur={onBlur}
                  style={
                    error ? { borderColor: theme.error.error600 } : undefined
                  }
                  labelStyle={
                    error ? { color: theme.error.error600 } : undefined
                  }
                />
              </View>
            ))}
          </View>
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
  optionsContainer: {
    gap: 8,
  },
  optionWrapper: {
    marginBottom: 8,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: theme.text.error,
  },
});
