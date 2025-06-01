import { theme } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";

export default function CardAligmentButton({
  iconName,
  isSelected,
  color,
  size,
  onPress,
}: {
  iconName: string;
  isSelected: boolean;
  color?: string;
  size?: number;
  onPress?: () => void;
}) {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: isSelected ? theme.primary.brand950 : "transparent",
        borderRadius: 100,
      }}
    >
      <Ionicons
        onPress={onPress}
        name={iconName as any}
        size={size}
        color={color}
      />
    </View>
  );
}
