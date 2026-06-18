export interface AuthUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isSuspended: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  avatar?: string;
  blinkTag?: string;
  bio?: string;
  interests?: string[];
  verificationLevel?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface RegisterResponse {
  status: string;
  token: string;
  user: AuthUser;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  token: string;
  user: AuthUser;
}

export interface LogoutResponse {
  status: string;
  message: string;
}

export interface RefreshTokenRequest {
  email: string;
}

export interface RefreshTokenResponse {
  status: string;
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  status: string;
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  status: string;
  message: string;
}

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface VerifyEmailResponse {
  status: string;
  message: string;
}

export interface VerifyPhoneRequest {
  phone: string;
  otp: string;
}

export interface VerifyPhoneResponse {
  status: string;
  message: string;
}

export interface ResendOtpRequest {
  email?: string;
  phone?: string;
  type: "email" | "phone";
}

export interface ResendOtpResponse {
  status: string;
  message: string;
}
