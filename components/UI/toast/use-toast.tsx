import { Toast } from "toastify-react-native";


export default function useToast() {
  const showToast = (message: string, type: any = "customSuccess") => {
    Toast.show({
      text1: message,
      type,
      position: "bottom",
      autoHide: true,
      visibilityTime: 3000,
    });
  };

  return {
    showToast,
  };
}
