import { useEffect, useState } from "react";

import { useStorage } from "./use-storage.hook";

export const useOnboarding = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [hasToShowOnboarding, setHasToShowOnboarding] = useState(false);

  const { getItem } = useStorage();

  const checkOnboarding = async () => {
    try {
      const onboarding = await getItem("onboarding");

      if (!onboarding) {
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

  return {
    checkOnboarding,
    hasToShowOnboarding,
    isChecking,
  };
};
