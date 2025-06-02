import { useSignIn } from "@clerk/clerk-expo";
import { SignInFirstFactor } from "@clerk/types";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function useAuth() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const [userEmailAttempt, setUserEmailAttempt] = useState<string | undefined>(
    undefined
  );
  const [userCodeAttempt, setUserCodeAttempt] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSendEmailCode = async () => {
    if ((!isLoaded && !signIn) || !userEmailAttempt) return null;

    setIsLoading(true);

    try {
      const { supportedFirstFactors } = await signIn.create({
        identifier: userEmailAttempt,
      });

      const isEmailCodeFactor = (factor: SignInFirstFactor) => {
        return factor.strategy === "email_code";
      };

      const emailCodeFactor = supportedFirstFactors?.find(isEmailCodeFactor);

      if (emailCodeFactor) {
        // Grab the phoneNumberId
        const { emailAddressId } = emailCodeFactor;

        // Send the OTP code to the user
        await signIn.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId,
        });

        router.push("/(auth)/check-your-email");

        // Set verifying to true to display second form
        // and capture the OTP code
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const onValidateCode = async () => {
    if ((!isLoaded && !signIn) || !userCodeAttempt) return null;
    setIsLoading(true);
    try {
      // Use the code provided by the user and attempt verification
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: userCodeAttempt.toString() as string,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });

        router.push("/(app)");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(signInAttempt);
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error({ err });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userEmailAttempt,
    setUserEmailAttempt,
    userCodeAttempt,
    setUserCodeAttempt,
    isLoading,
    onSendEmailCode,
    onValidateCode,
  };
}
