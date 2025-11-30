import React, { ReactNode } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

interface FormProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  children: ReactNode;
}

export function Form<T extends FieldValues>({
  methods,
  children,
}: FormProps<T>) {
  return <FormProvider {...methods}>{children}</FormProvider>;
}
