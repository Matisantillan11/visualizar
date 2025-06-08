import { RelativePathString } from "expo-router";

type RouteNames =
  | "ONBOARDING"
  | "BOOK"
  | "LOGIN"
  | "REGISTER"
  | "FORGOT_PASSWORD"
  | "VALIDATE_CODE"
  | "NOT_FOUND"
  | "HOME";

export const ROUTES: Record<RouteNames, RelativePathString> = {
  ONBOARDING: "/index" as string as RelativePathString,
  LOGIN: "/login" as string as RelativePathString,
  REGISTER: "/register" as string as RelativePathString,
  FORGOT_PASSWORD: "/forgot-password" as string as RelativePathString,
  VALIDATE_CODE: "/validate-code" as string as RelativePathString,
  NOT_FOUND: "+not-found" as string as RelativePathString,
  HOME: "(app)" as string as RelativePathString,
  BOOK: "/book" as string as RelativePathString,
};
