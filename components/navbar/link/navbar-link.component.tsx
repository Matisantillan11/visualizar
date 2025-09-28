import { ThemedText, ThemedTextVariants } from "@/components/UI";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Icon } from "react-native-paper";

export default function NavbarLink({
  source,
  linkText,
  ...props
}: TouchableOpacityProps & {
  source: string;
  linkText: string;
}) {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 24,
        gap: 20,
      }}
      {...props}
    >
      <Icon size={24} source={source} color="white" />
      <ThemedText
        variant={ThemedTextVariants.default}
        style={{ fontWeight: "bold", fontSize: 16 }}
      >
        {linkText}
      </ThemedText>
    </TouchableOpacity>
  );
}
