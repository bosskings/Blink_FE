import { useMutation } from "@tanstack/react-query";
import * as authApi from "../api/auth";
import type {
  RegisterRequest,
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  VerifyPhoneRequest,
  ResendOtpRequest,
} from "@/types/auth";

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.registerUser(data),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.loginUser(data),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => authApi.logoutUser(),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (data: VerifyEmailRequest) => authApi.verifyEmail(data),
  });
}

export function useVerifyPhone() {
  return useMutation({
    mutationFn: (data: VerifyPhoneRequest) => authApi.verifyPhone(data),
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: (data: ResendOtpRequest) => authApi.resendOtp(data),
  });
}
