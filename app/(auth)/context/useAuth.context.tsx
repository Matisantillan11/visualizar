import { useStorage } from "@/hooks";
import { useAuth, useSignIn, useUser } from "@clerk/clerk-expo";
import { SignInFactor } from "@clerk/types";
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
  isUserSignedin: boolean | undefined;
  isAuthChecked: boolean;
  isLoading: boolean;
  isSignedIn: boolean | undefined;
  handleSignOut: () => void;
  getUserData: () =>
    | {
        name: string | null | undefined;
        avatar: string | undefined;
      }
    | undefined;

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
  const {
    user,
    isLoaded: isUserDataLoaded,
    isSignedIn: isUserSignedin,
  } = useUser();

  console.log({ isUserDataLoaded, isUserSignedin });

  const { isSignedIn, isLoaded: isClerkAuthLoaded, signOut } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  const isEmailCodeFactor = (factor: SignInFactor) => {
    return factor.strategy === "email_code";
  };

  const disableOnboardingPage = async () => {
    await storeItem({ pairs: [{ key: "onboarding", value: true }] });
  };

  const onSendEmailCode = async () => {
    router.push('/(auth)/check-your-email');

    /* if (isLoaded && signIn && userEmailAttempt) {
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
    } */
  };

  const onValidateCode = async () => {
    router.push('/(app)');
    /*  if (isLoaded && signIn && userCodeAttempt) {
      setIsLoading(true);
      try {
        const signInAttempt = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code: userCodeAttempt.toString() as string,
        });

        if (signInAttempt && signInAttempt.status === "complete") {
          console.log({ id: signInAttempt.createdSessionId });
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
    } */
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const getUserData = () => {
    if (isUserDataLoaded && isUserSignedin) {
      return {
        name: user?.fullName,
        avatar: user?.imageUrl,
      };
    }

    return undefined;
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
        handleSignOut,
        getUserData,
        isUserSignedin,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};
