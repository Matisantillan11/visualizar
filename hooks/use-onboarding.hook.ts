import { useEffect, useState } from "react";

import { useRouter } from "expo-router";
import { useStorage } from "./use-storage.hook";

export const useOnboarding = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [hasToShowOnboarding, setHasToShowOnboarding] = useState(false);

  const router = useRouter();
  const { storeItem, getItem } = useStorage();

  const checkOnboarding = async () => {
    try {
      const onboarding = await getItem("onboarding");
      console.log({ onboarding });
      if (onboarding) {
        router.push("/login");
      } else {
        storeItem({ pairs: [{ key: "onboarding", value: true }] });
        setHasToShowOnboarding(true);
      }
    } catch (error) {
      console.log("error checking onboarding", error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  return { hasToShowOnboarding, isChecking };
};
