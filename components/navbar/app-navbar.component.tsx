import { theme } from "@/constants";
import { ROUTES } from "@/constants/routes/routes.constant";

import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { Link, usePathname } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Appbar, Icon } from "react-native-paper";

type AppNavbarProps = NativeStackHeaderProps & {
  handlePresentModalPress: () => void;
};

export const AppNavbar = (props: AppNavbarProps) => {
  const { handlePresentModalPress } = props;
  const pathname = usePathname();
  const isHomeScreen = pathname === "/";

  return (
    <Appbar.Header
      {...props}
      style={{
        backgroundColor: theme.primary.brand800,
        paddingHorizontal: 40,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {props.navigation.canGoBack() && !isHomeScreen ? (
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon size={40} source="chevron-left" color="white" />
        </TouchableOpacity>
      ) : (
        <Link
          href={ROUTES.HOME}
          style={{
            width: 150,
            height: 50,
            marginLeft: -15,
          }}
        >
          <Image
            source={require("../../assets/images/negative-horizontal-logo.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
            contentFit="fill"
            transition={1000}
          />
        </Link>
      )}

      <TouchableOpacity onPress={handlePresentModalPress}>
        <Icon size={35} source="account-circle" color="white" />
      </TouchableOpacity>
    </Appbar.Header>
  );
};
