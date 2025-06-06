import { useContext } from "react";
import { AuthStateContext } from "../context/useAuth.context";

export const useAuthContext = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
