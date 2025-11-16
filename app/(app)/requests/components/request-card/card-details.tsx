import { ThemedText, ThemedTextVariants } from "@/components/UI";
import { theme } from "@/constants";

export const CardDetails = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <ThemedText
      variant={ThemedTextVariants.default}
      style={{
        color: theme.base.white,
        fontWeight: "bold",
        fontSize: 14,
      }}
    >
      {label}:
      <ThemedText variant={ThemedTextVariants.default}>
        {" " + value}
      </ThemedText>
    </ThemedText>
  );
};
