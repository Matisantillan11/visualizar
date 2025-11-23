import { ThemedText, ThemedTextVariants } from "@/components/UI";
import { theme } from "@/constants";
import Feather from "@expo/vector-icons/Feather";
import * as React from "react";
import { Platform } from "react-native";
import { Banner as BannerCore } from "react-native-paper";

const Banner = () => {
  const isIos = Platform.OS === "ios";

  return (
    <BannerCore
      visible={true}
      style={{
        backgroundColor: "transparent",
        borderRadius: 8,
        borderColor: theme.warning.warning600,
        borderWidth: 2,
        padding: 0,
        marginHorizontal: 32,
        marginTop: isIos ? 16 : 0,
        shadowColor: theme.warning.warning600,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
      }}
      icon={({ size }) => (
        <Feather
          name="alert-triangle"
          size={size / 1.3}
          color={theme.warning.warning600}
        />
      )}
    >
      <ThemedText
        variant={ThemedTextVariants.default}
        style={{ color: theme.warning.warning500, fontSize: isIos ? 16 : 14 }}
      >
        Este libro no contiene animaciones por el momento
      </ThemedText>
    </BannerCore>
  );
};

export default Banner;
