import { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
import { ButtonVariants } from "./button-variants.interface";

export interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariants;
  leftIcon?: ReactNode;
}
