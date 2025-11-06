import { ThemedText, ThemedTextVariants } from "@/components/UI";
import { theme } from "@/constants";
import { TouchableOpacity } from "react-native";
import { RadioButton as RadioButtonCore } from "react-native-paper";

export function RadioButton({
  value,
  status,
  onPress,
  label,
}: {
  value: string;
  status: "checked" | "unchecked";
  onPress: () => void;
  label: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: theme.gray.gray300,
        borderRadius: 8,
        padding: 8,
      }}
    >
      <ThemedText variant={ThemedTextVariants.default}>{label}</ThemedText>
      <RadioButtonCore value={value} status={status} onPress={onPress} />
    </TouchableOpacity>
  );
}
