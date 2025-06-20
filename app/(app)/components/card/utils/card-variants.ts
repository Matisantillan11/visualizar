import { SizeVariants } from "@/app/home/interfaces";

const sizeVariants = {
  sm: {
    width: 100,
    height: 200,
  },
  md: {},
  lg: {},
};

export default function cardSizeVariants(size: SizeVariants) {
  return sizeVariants[size] ?? sizeVariants.md;
}
