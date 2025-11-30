import { ThemedText, ThemedTextVariants } from "@/components/UI";
import { theme } from "@/constants";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { RadioButton as RadioButtonCore } from "react-native-paper";

export function RadioButton({
  value,
  status,
  onPress,
  label,
  style,
  labelStyle,
  ...rest
}: TouchableOpacityProps & {
  value: string;
  status: "checked" | "unchecked";
  onPress: () => void;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
}) {
  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: theme.gray.gray300,
          borderRadius: 8,
          padding: 8,
        },
        style,
      ]}
    >
      <ThemedText variant={ThemedTextVariants.default} style={labelStyle}>
        {label}
      </ThemedText>
      <RadioButtonCore value={value} status={status} onPress={onPress} />
    </TouchableOpacity>
  );
}
