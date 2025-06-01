import { SizeVariants } from "@/app/(app)/interfaces";

const sizeVariants = {
  sm: {
    width: 100,
    height: 200,
  },
  md: {},
  lg: {},
};

export const cardSizeVariants = (size: SizeVariants) => {
  console.log(SizeVariants[size]);
  return sizeVariants[size] ?? sizeVariants.md;
};
