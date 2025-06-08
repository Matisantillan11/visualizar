import { ROUTES } from "@/constants/routes/routes.constant";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { RelativePathString, usePathname } from "expo-router";
import { Appbar } from "react-native-paper";

const ALLOWED_ROUTES = [ROUTES.FORGOT_PASSWORD];

export const AuthNavbar = (props: NativeStackHeaderProps) => {
  const path = usePathname();

  if (ALLOWED_ROUTES.includes(path as RelativePathString)) {
    return (
      <Appbar.Header
        {...props}
        style={{
          backgroundColor: "transparent",
        }}
      >
        {props.navigation.canGoBack() && (
          <Appbar.Action
            icon={"chevron-back"}
            onPress={() => props.navigation.goBack()}
          />
        )}
      </Appbar.Header>
    );
  }

  return null;
};
