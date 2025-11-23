import { VerticalLinearGradient } from "@/components/linear-gradient/linear-gradient.component";
import { FC } from "react";
import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContainerProps } from "./interfaces";

export const Container: FC<ContainerProps> = ({
  children,
  gradient = false,
  withNavbar = false,
  ...props
}) => {
  const { width } = useWindowDimensions();
  const isIos = Platform.OS === "ios";

  if (gradient) {
    return (
      <VerticalLinearGradient>
        <SafeAreaView edges={["top", "bottom"]}>
          <View
            style={
              withNavbar
                ? { paddingHorizontal: isIos ? 32 : width * 0.075 }
                : styles.container
            }
            {...props}
          >
            {children}
          </View>
        </SafeAreaView>
      </VerticalLinearGradient>
    );
  }

  return (
    <SafeAreaView edges={["top", "bottom"]}>
      <View style={styles.container} {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
  },
});
