import { theme } from "@/constants";
import { BookRequestStatus } from "@/lib/react-query/books";
import { View } from "react-native";
import { ThemedText, ThemedTextVariants } from "../text";

export default function Pill({ label }: { label: string }) {
  const getPillColor = (label: string) => {
    switch (label) {
      case BookRequestStatus.PENDING:
        return theme.blue.blue900;
      case BookRequestStatus.APPROVED:
        return theme.success.success900;
      case BookRequestStatus.DENIED:
        return theme.error.error900;
      default:
        return theme.primary.brand900;
    }
  };

  const getPillLabel = (label: string) => {
    switch (label) {
      case BookRequestStatus.PENDING:
        return "Pendiente";
      case BookRequestStatus.APPROVED:
        return "Aprobado";
      case BookRequestStatus.DENIED:
        return "Rechazado";
      default:
        return "Publicado";
    }
  };

  return (
    <View
      style={{
        backgroundColor: getPillColor(label),
        padding: 8,
        borderRadius: 16,
      }}
    >
      <ThemedText variant={ThemedTextVariants.default}>
        {getPillLabel(label)}
      </ThemedText>
    </View>
  );
}
