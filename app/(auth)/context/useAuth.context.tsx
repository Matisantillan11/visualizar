import { useStorage } from "@/hooks";
import { fetcher } from '@/lib/fetcher';
import { useRouter } from 'expo-router';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { AuthResponse, AuthSession, AuthUser } from '../interfaces';

type AuthStateContextProps = {
  userEmailAttempt: string | undefined;
  setUserEmailAttempt: Dispatch<SetStateAction<string | undefined>>;
  userCodeAttempt: string | undefined;
  setUserCodeAttempt: Dispatch<string | undefined>;
  isLoading: boolean;
  handleSignOut: () => void;
  getUserData: () =>
    | {
        name: string | null | undefined;
        avatar: string | undefined;
      }
    | undefined;
  onSendEmailCode: () => Promise<void>;
  onValidateCode: () => Promise<void>;
  user: AuthUser | undefined;
  session: AuthSession | undefined;
};

export const AuthStateContext = createContext<AuthStateContextProps | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | undefined>(undefined);
  const [session, setSession] = useState<AuthSession | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userEmailAttempt, setUserEmailAttempt] = useState<string | undefined>(undefined);
  const [userCodeAttempt, setUserCodeAttempt] = useState<string | undefined>(undefined);

  const { storeItem, getItem, removeItem } = useStorage();

  const disableOnboardingPage = async () => {
    await storeItem({ pairs: [{ key: 'onboarding', value: true }] });
  };

  const saveSession = async (session: AuthSession) => {
    await storeItem({ pairs: [{ key: 'session', value: session }] });
  };

  const getSession = async () => {
    const session = await getItem('session');
    return session;
  };

  const getUser = async () => {
    const user = await getItem('user');
    return user;
  };

  const saveUser = async (user: AuthUser) => {
    await storeItem({ pairs: [{ key: 'user', value: user }] });
  };

  const removeSession = async () => {
    await removeItem('session');
    await removeItem('user');
  };

  const onSendEmailCode = async () => {
    try {
      await fetcher({
        url: '/auth/send-otp',
        init: {
          method: 'POST',
          body: JSON.stringify({ email: userEmailAttempt }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
        withAuthentication: false, // No auth needed for sending OTP
      });

      router.push('/(auth)/check-your-email');
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new Error('Failed to send OTP code. Please try again.');
    }
  };

  const onValidateCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetcher<AuthResponse>({
        url: '/auth/verify-otp',
        init: {
          method: 'POST',
          body: JSON.stringify({
            email: userEmailAttempt,
            token: userCodeAttempt,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
        withAuthentication: false, // No auth needed for verification
      });

      if (response && response.access_token && response.user) {
        const authUser: AuthUser = {
          id: response.user.id,
          teacherId: response.user.teacherId,
          studentId: response.user.studentId,
          name: response.user.name ?? '',
          role: response.user.role,
          email: response.user.email,
        };

        const authSession: AuthSession = {
          user: authUser,
          token: response.access_token, // Main token from API
          accessToken: response.access_token, // Same token for both fields
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
        };

        if (authSession) {
          await saveSession(authSession);
          await saveUser(authUser);
          setUser(authUser);
          setSession(authSession);
          router.push('/(app)');
        }
      }
    } catch (error) {
      console.error('Error validating code:', error);
      throw new Error('Failed to validate code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    console.log('click');
    await removeSession();
    setSession(undefined);
    setUser(undefined);
    router.push('/(auth)');
  };

  const getUserData = () => {
    return undefined;
  };

  useEffect(() => {
    const onAuthStateChange = async () => {
      try {
        setIsLoading(true);
        const session = await getSession();
        const user = await getUser();

        console.log({ session, user });
        if (session && user) {
          setSession(session as AuthSession);
          setUser(user as AuthUser);
        } else {
          setSession(undefined);
          setUser(undefined);
          router.push('/(auth)');
        }
      } catch (error) {
        console.error('Error getting session and user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    onAuthStateChange();
  }, []);

  return (
    <AuthStateContext.Provider
      value={{
        userEmailAttempt,
        setUserEmailAttempt,
        userCodeAttempt,
        setUserCodeAttempt,
        isLoading,
        onSendEmailCode,
        onValidateCode,
        handleSignOut,
        getUserData,
        user,
        session,
      }}>
      {children}
    </AuthStateContext.Provider>
  );
};
