import { useMutation } from "../index";
import type { AuthResponse, SendOtpInput, VerifyOtpInput } from "./auth-types";

/**
 * Hook to send OTP code
 *
 * @param options - Configuration options (onSuccess, onError callbacks)
 */
export function useSendOtp(options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  return useMutation<void, SendOtpInput>(
    "/auth/send-otp",
    {
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    },
    {
      init: { method: "POST" },
      withAuthentication: false,
    }
  );
}

/**
 * Hook to verify OTP code
 *
 * @param options - Configuration options (onSuccess, onError callbacks)
 */
export function useVerifyOtp(options?: {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: Error) => void;
}) {
  return useMutation<AuthResponse, VerifyOtpInput>(
    "/auth/verify-otp",
    {
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    },
    {
      init: { method: "POST", headers: { "Content-Type": "application/json" } },
      withAuthentication: false,
    }
  );
}
