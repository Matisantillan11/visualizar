import useToast from "@/components/UI/toast/use-toast";
import { useStorage } from "@/hooks";
import { useOnboarding } from "@/hooks/use-onboarding.hook";
import { useSendOtp, useVerifyOtp } from "@/lib/react-query/auth";
import { AuthSession, AuthUser } from "@/lib/react-query/auth/auth-types";
import { useRouter } from "expo-router";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type AuthStateContextProps = {
  userEmailAttempt: string | undefined;
  setUserEmailAttempt: Dispatch<SetStateAction<string | undefined>>;
  userCodeAttempt: string | undefined;
  setUserCodeAttempt: Dispatch<string | undefined>;
  isLoading: boolean;
  isValidatingCode: boolean;
  wasCodeResent: boolean;
  handleSignOut: () => void;
  getUserData: () =>
    | {
        name: string | null | undefined;
        avatar: string | undefined;
      }
    | undefined;
  onSendEmailCode: (isResending: boolean) => Promise<void>;
  onValidateCode: () => Promise<void>;
  disableOnboardingPage: () => Promise<void>;
  user: AuthUser | undefined;
  session: AuthSession | undefined;

  //onboarding
  hasToShowOnboarding: boolean;
  isChecking: boolean;
};

export const AuthStateContext = createContext<
  AuthStateContextProps | undefined
>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | undefined>(undefined);
  const [session, setSession] = useState<AuthSession | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wasCodeResent, setWasCodeResent] = useState<boolean>(false);
  const [userEmailAttempt, setUserEmailAttempt] = useState<string | undefined>(
    undefined
  );
  const [userCodeAttempt, setUserCodeAttempt] = useState<string | undefined>(
    undefined
  );

  const { hasToShowOnboarding, isChecking } = useOnboarding();
  const { showToast } = useToast();
  const { storeItem, getItem, removeItem } = useStorage();

  const disableOnboardingPage = async () => {
    await storeItem({ pairs: [{ key: "onboarding", value: true }] });
    router.push("/(auth)");
  };

  const saveSession = async (session: AuthSession) => {
    await storeItem({ pairs: [{ key: "session", value: session }] });
  };

  const getSession = async () => {
    const session = await getItem("session");
    return session;
  };

  const getUser = async () => {
    const user = await getItem("user");
    return user;
  };

  const saveUser = async (user: AuthUser) => {
    await storeItem({ pairs: [{ key: "user", value: user }] });
  };

  const removeSession = async () => {
    await removeItem("session");
    await removeItem("user");
  };

  const { mutate: sendOtp, isPending: isSendingOtp } = useSendOtp({
    onError: (error) => {
      console.error("Error sending OTP:", error);
      showToast(
        "Error al enviar el código OTP. Por favor, intenta nuevamente.",
        "customError"
      );
    },
  });

  const { mutate: verifyOtp, isPending: isVerifyingOtp } = useVerifyOtp({
    onSuccess: async (response) => {
      if (response && response.access_token && response.user) {
        const authUser: AuthUser = {
          id: response.user.id,
          teacherId: response.user.teacherId,
          studentId: response.user.studentId,
          name: response.user.name ?? "",
          role: response.user.role,
          email: response.user.email,
        };

        const authSession: AuthSession = {
          user: authUser,
          token: response.access_token,
          accessToken: response.access_token,
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
        };

        if (authSession) {
          await saveSession(authSession);
          await saveUser(authUser);
          setUser(authUser);
          setSession(authSession);
          setUserCodeAttempt("");
          setUserEmailAttempt("");
          router.navigate("/(app)");
        }
      }
    },
    onError: (error) => {
      console.error("Error validating code:", error);
      showToast(
        "Error al validar el código. Por favor, intenta nuevamente.",
        "customError"
      );
    },
  });

  const onSendEmailCode = async (isResending: boolean) => {
    if (!userEmailAttempt) return;

    sendOtp(
      { email: userEmailAttempt },
      {
        onSuccess: () => {
          if (!isResending) {
            router.push("/(auth)/check-your-email");
          } else {
            setWasCodeResent(true);
          }
        },
        onError: (error) => {
          if (isResending) setWasCodeResent(false);
          if (
            error.message.includes(
              "Account is temporarily blocked due to multiple failed OTP attempts"
            )
          ) {
            showToast(
              "Cuenta bloqueada temporalmente, intenta nuevamente más tarde.",
              "customError"
            );
          } else {
            showToast(
              "Error al enviar el código OTP. Por favor, intenta nuevamente.",
              "customError"
            );
          }
        },
      }
    );
  };

  const onValidateCode = async () => {
    if (!userEmailAttempt || !userCodeAttempt) return;

    verifyOtp(
      {
        email: userEmailAttempt,
        token: userCodeAttempt,
      },
      {
        onError: (error) => {
          if (
            error.message.includes(
              "Account is temporarily blocked due to multiple failed OTP attempts"
            )
          ) {
            showToast(
              "Cuenta bloqueada temporalmente, intenta nuevamente más tarde.",
              "customError"
            );
          } else {
            showToast(
              "Error al validar el código. Por favor, intenta nuevamente.",
              "customError"
            );
          }
        },
      }
    );
  };

  const handleSignOut = async () => {
    await removeSession();
    setSession(undefined);
    setUser(undefined);
    router.push("/(auth)");
  };

  const getUserData = () => {
    return undefined;
  };

  useEffect(() => {
    if (isChecking) {
      return;
    }

    const onAuthStateChange = async () => {
      try {
        setIsLoading(true);

        const storedSession = await getSession();
        const storedUser = await getUser();

        if (storedSession && storedUser) {
          if (storedUser !== user && storedSession !== session) {
            setSession(storedSession as AuthSession);
            setUser(storedUser as AuthUser);
          }
        } else {
          setSession(undefined);
          setUser(undefined);

          if (hasToShowOnboarding) {
            router.replace("/");
          } else {
            router.replace("/(auth)");
          }
        }
      } catch (error) {
        console.error("Error getting session and user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    onAuthStateChange();
  }, [isChecking, hasToShowOnboarding]);

  return (
    <AuthStateContext.Provider
      value={{
        userEmailAttempt,
        setUserEmailAttempt,
        userCodeAttempt,
        setUserCodeAttempt,
        isLoading: isLoading || isSendingOtp,
        isValidatingCode: isVerifyingOtp,
        wasCodeResent,
        onSendEmailCode,
        onValidateCode,
        handleSignOut,
        getUserData,
        disableOnboardingPage,
        user,
        session,

        //onboarding
        hasToShowOnboarding,
        isChecking,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};
