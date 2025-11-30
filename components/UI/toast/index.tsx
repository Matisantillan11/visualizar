import { theme } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import ToastManager, { Toast as ToastifyToast } from "toastify-react-native";
import { ThemedText, ThemedTextVariants } from "../text";

const ToastContainer = ({
  type,
  message,
}: {
  type: string;
  message: string;
}) => {
  return (
    <View
      style={{
        backgroundColor:
          type === "customSuccess"
            ? theme.success.success600
            : theme.error.error600,
        padding: 16,
        borderRadius: 10,
        minHeight: 50,
        marginHorizontal: 48,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ThemedText variant={ThemedTextVariants.default}>{message}</ThemedText>

      <Ionicons
        onPress={() => ToastifyToast.hide()}
        name="close"
        size={20}
        color="white"
        style={{ marginLeft: 20 }}
      />
    </View>
  );
};

export const Toast = () => {
  const toastConfig = {
    customSuccess: (props: any) => (
      <ToastContainer type="customSuccess" message={props.text1} />
    ),
    customError: (props: any) => (
      <ToastContainer type="customError" message={props.text1} />
    ),
    error: (props: any) => (
      <ToastContainer type="customError" message={props.text1} />
    ),
    success: (props: any) => (
      <ToastContainer type="customSuccess" message={props.text1} />
    ),
  };

  return (
    <ToastManager config={toastConfig} useModal={false} animationStyle="fade" />
  );
};
