import { useStorage } from "@/hooks";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { SignInFirstFactor } from "@clerk/types";
import { useRouter } from "expo-router";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type AuthStateContextProps = {
  userEmailAttempt: string | undefined;
  setUserEmailAttempt: Dispatch<SetStateAction<string | undefined>>;
  userCodeAttempt: string | undefined;
  setUserCodeAttempt: Dispatch<string | undefined>;
  isChecking: boolean;
  isAuthChecked: boolean;
  isLoading: boolean;
  isSignedIn: boolean | undefined;

  onSendEmailCode: () => Promise<void>;

  onValidateCode: () => Promise<void>;
};

export const AuthStateContext = createContext<
  AuthStateContextProps | undefined
>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userEmailAttempt, setUserEmailAttempt] = useState<string | undefined>(
    undefined
  );
  const [userCodeAttempt, setUserCodeAttempt] = useState<string | undefined>(
    undefined
  );

  const { storeItem } = useStorage();
  const { isSignedIn, isLoaded: isClerkAuthLoaded } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  const isEmailCodeFactor = (factor: SignInFirstFactor) => {
    return factor.strategy === "email_code";
  };

  const disableOnboardingPage = async () => {
    await storeItem({ pairs: [{ key: "onboarding", value: true }] });
  };

  const onSendEmailCode = async () => {
    if (isLoaded && signIn && userEmailAttempt) {
      setIsLoading(true);

      try {
        const { supportedFirstFactors } = await signIn.create({
          identifier: userEmailAttempt,
        });

        const emailCodeFactor = supportedFirstFactors?.find(isEmailCodeFactor);

        if (emailCodeFactor) {
          const { emailAddressId } = emailCodeFactor;

          await signIn.prepareFirstFactor({
            strategy: "email_code",
            emailAddressId,
          });

          router.push("/(auth)/check-your-email");
        }
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onValidateCode = async () => {
    if (isLoaded && signIn && userCodeAttempt) {
      setIsLoading(true);
      try {
        const signInAttempt = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code: userCodeAttempt.toString() as string,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          await disableOnboardingPage();
          router.push("/(app)");
        } else {
          console.error(signInAttempt);
        }
      } catch (err) {
        console.error({ err });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AuthStateContext.Provider
      value={{
        userEmailAttempt,
        setUserEmailAttempt,
        userCodeAttempt,
        setUserCodeAttempt,
        isLoading,
        isAuthChecked: isClerkAuthLoaded,
        onSendEmailCode,
        onValidateCode,
        isChecking: !isClerkAuthLoaded,

        isSignedIn,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};
