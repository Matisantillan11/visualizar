import { theme } from "@/constants";
import { ButtonVariants } from "../interfaces";

const variants = {
  solid: {
    backgroundColor: theme.primary.brand800,
  },
  outlined: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.primary.brand800,
    borderStyle: "solid",
  },
};

const textVariants = {
  solid: {
    color: theme.base.white,
  },
  outlined: {
    color: theme.base.white,
  },
};

export const buttonVariants = (variant: ButtonVariants) => {
  return {
    variant: variants[variant] ?? variants.solid,
    textVariant: textVariants[variant] ?? textVariants.solid,
  };
};
