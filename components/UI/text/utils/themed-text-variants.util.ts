import { theme } from "@/constants";
import { ThemedTextVariants } from "../interfaces";

const variants = {
  default: {
    fontSize: 14,
    color: theme.primary.brand100,
  },
  h1: {
    fontSize: 24,
    color: theme.primary.brand50,
  },
};

export const textVariants = (variant: ThemedTextVariants) => {
  return {
    variant: variants[variant] ?? variants.default,
  };
};
