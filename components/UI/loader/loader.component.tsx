import { ActivityIndicator, StyleSheet, View } from "react-native";

import { theme } from "@/constants";

export const Loader = ({
  size,
}: {
  size?: number | "small" | "large" | undefined;
}) => {
  return (
    <View style={loaderStyles.loaderContainer}>
      <ActivityIndicator size={size} color={theme.primary.brand50} />
    </View>
  );
};

const loaderStyles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
