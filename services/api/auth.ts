import { apiClient } from "./client";
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyPhoneRequest,
  VerifyPhoneResponse,
  ResendOtpRequest,
  ResendOtpResponse,
} from "@/types/auth";

export async function registerUser(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>(
    "/auth/register",
    data,
  );
  return response.data;
}

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>("/auth/login", data);
  return response.data;
}

export async function logoutUser(): Promise<LogoutResponse> {
  const response = await apiClient.post<LogoutResponse>("/auth/logout", {});
  return response.data;
}

export async function forgotPassword(
  data: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> {
  const response = await apiClient.post<ForgotPasswordResponse>(
    "/auth/forgot-password",
    data,
  );
  return response.data;
}

export async function resetPassword(
  data: ResetPasswordRequest,
): Promise<ResetPasswordResponse> {
  const response = await apiClient.post<ResetPasswordResponse>(
    "/auth/reset-password",
    data,
  );
  return response.data;
}

export async function verifyEmail(
  data: VerifyEmailRequest,
): Promise<VerifyEmailResponse> {
  const response = await apiClient.post<VerifyEmailResponse>(
    "/auth/verify-email",
    data,
  );
  return response.data;
}

export async function verifyPhone(
  data: VerifyPhoneRequest,
): Promise<VerifyPhoneResponse> {
  const response = await apiClient.post<VerifyPhoneResponse>(
    "/auth/verify-phone",
    data,
  );
  return response.data;
}

export async function resendOtp(
  data: ResendOtpRequest,
): Promise<ResendOtpResponse> {
  const response = await apiClient.post<ResendOtpResponse>(
    "/auth/resend-otp",
    data,
  );
  return response.data;
}
