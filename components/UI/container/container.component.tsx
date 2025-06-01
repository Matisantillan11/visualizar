import { VerticalLinearGradient } from "@/components/linear-gradient/linear-gradient.component";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContainerProps } from "./interfaces";

export const Container: FC<ContainerProps> = ({
  children,
  gradient = false,
  withNavbar = false,
  ...props
}) => {
  if (gradient) {
    return (
      <VerticalLinearGradient>
        <SafeAreaView edges={["top", "bottom"]}>
          <View
            style={
              withNavbar
                ? { paddingHorizontal: 32, paddingBottom: 32 }
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
