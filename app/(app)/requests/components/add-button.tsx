import { theme } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

export const AddButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      padding: 10,
      backgroundColor: theme.primary.brand950,
      borderRadius: 10,
    }}
  >
    <Ionicons name="add-outline" size={20} color="white" />
  </TouchableOpacity>
);
