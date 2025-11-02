import { ThemedText, ThemedTextVariants } from "@/components/UI";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-paper";

export const BottomNavigation = ({
  handlePrevious,
  handleNext,
  currentIndex,
  optionsLength,
}: {
  handlePrevious: () => void;
  handleNext: () => void;
  currentIndex: number;
  optionsLength: number;
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        minHeight: 50,
        bottom: 30,
        alignContent: "center",
        left: 0,
        right: 0,
        paddingHorizontal: 40,
      }}
    >
      <TouchableOpacity onPress={handlePrevious}>
        <Icon size={32} source="chevron-left" color="white" />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText variant={ThemedTextVariants.default}>
          {currentIndex + 1} / {optionsLength}
        </ThemedText>
      </View>

      <TouchableOpacity onPress={handleNext}>
        <Icon size={32} source="chevron-right" color="white" />
      </TouchableOpacity>
    </View>
  );
};
