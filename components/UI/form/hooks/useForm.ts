import {
  FieldValues,
  UseFormProps,
  UseFormReturn,
  useForm as useHookForm,
} from "react-hook-form";

export function useForm<TFieldValues extends FieldValues = FieldValues>(
  props?: UseFormProps<TFieldValues>
): UseFormReturn<TFieldValues> {
  return useHookForm(props);
}
