import { ReactNode } from "react";
import { StyleProp, TextStyle, TouchableOpacityProps } from "react-native";
import { ButtonVariants } from "./button-variants.interface";

export interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariants;
  leftIcon?: ReactNode;
  labelStyle?: StyleProp<TextStyle>;
}
