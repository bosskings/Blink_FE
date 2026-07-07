import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  verifyPhone,
  resendOtp,
} from "@/services/api/auth";
import { apiClient } from "@/services/api/client";
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  VerifyEmailResponse,
  VerifyPhoneResponse,
  ResendOtpResponse,
} from "@/types/auth";

jest.mock("@/services/api/client", () => ({
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
  },
  getStoredToken: jest.fn(),
  setStoredToken: jest.fn(),
}));

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("Auth API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    it("calls POST /auth/register with correct payload and returns response", async () => {
      const request: RegisterRequest = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "Password123!",
        phone: "+2341234567890",
      };

      const mockResponse: RegisterResponse = {
        status: "SUCCESS",
        token: "jwt-token-123",
        user: {
          _id: "user-1",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "+2341234567890",
          role: "USER",
          isSuspended: false,
          emailVerified: false,
          phoneVerified: false,
        },
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await registerUser(request);

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        "/auth/register",
        request,
      );
      expect(result).toEqual(mockResponse);
      expect(result.token).toBe("jwt-token-123");
      expect(result.user._id).toBe("user-1");
    });

    it("throws when the API returns an error", async () => {
      const request: RegisterRequest = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "weak",
        phone: "",
      };

      mockedApiClient.post.mockRejectedValueOnce(new Error("Validation failed"));

      await expect(registerUser(request)).rejects.toThrow("Validation failed");
    });
  });

  describe("loginUser", () => {
    it("calls POST /auth/login with email and password", async () => {
      const request: LoginRequest = {
        email: "john@example.com",
        password: "Password123!",
      };

      const mockResponse: LoginResponse = {
        status: "SUCCESS",
        token: "jwt-login-token",
        user: {
          _id: "user-1",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "+2341234567890",
          role: "USER",
          isSuspended: false,
          emailVerified: true,
          phoneVerified: false,
        },
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await loginUser(request);

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        "/auth/login",
        request,
      );
      expect(result.token).toBe("jwt-login-token");
    });

    it("throws on invalid credentials", async () => {
      const request: LoginRequest = {
        email: "wrong@example.com",
        password: "wrong",
      };

      mockedApiClient.post.mockRejectedValueOnce(
        new Error("Invalid credentials"),
      );

      await expect(loginUser(request)).rejects.toThrow("Invalid credentials");
    });
  });

  describe("logoutUser", () => {
    it("calls POST /auth/logout with empty body", async () => {
      const mockResponse: LogoutResponse = {
        status: "SUCCESS",
        message: "Logged out successfully",
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await logoutUser();

      expect(mockedApiClient.post).toHaveBeenCalledWith("/auth/logout", {});
      expect(result.status).toBe("SUCCESS");
    });
  });

  describe("forgotPassword", () => {
    it("calls POST /auth/forgot-password with email", async () => {
      const mockResponse: ForgotPasswordResponse = {
        status: "SUCCESS",
        message: "Reset code sent to your email",
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await forgotPassword({ email: "john@example.com" });

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        "/auth/forgot-password",
        { email: "john@example.com" },
      );
      expect(result.message).toBe("Reset code sent to your email");
    });
  });

  describe("resetPassword", () => {
    it("calls POST /auth/reset-password with email, otp, and newPassword", async () => {
      const mockResponse: ResetPasswordResponse = {
        status: "SUCCESS",
        message: "Password reset successfully",
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await resetPassword({
        email: "john@example.com",
        otp: "123456",
        newPassword: "NewPassword123!",
      });

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        "/auth/reset-password",
        {
          email: "john@example.com",
          otp: "123456",
          newPassword: "NewPassword123!",
        },
      );
      expect(result.status).toBe("SUCCESS");
    });
  });

  describe("verifyEmail", () => {
    it("calls POST /auth/verify-email with email and otp", async () => {
      const mockResponse: VerifyEmailResponse = {
        status: "SUCCESS",
        message: "Email verified",
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await verifyEmail({
        email: "john@example.com",
        otp: "1234",
      });

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        "/auth/verify-email",
        { email: "john@example.com", otp: "1234" },
      );
      expect(result.status).toBe("SUCCESS");
    });
  });

  describe("verifyPhone", () => {
    it("calls POST /auth/verify-phone with phone and otp", async () => {
      const mockResponse: VerifyPhoneResponse = {
        status: "SUCCESS",
        message: "Phone verified",
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await verifyPhone({
        phone: "+2347012345678",
        otp: "1234",
      });

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        "/auth/verify-phone",
        { phone: "+2347012345678", otp: "1234" },
      );
      expect(result.status).toBe("SUCCESS");
    });
  });

  describe("resendOtp", () => {
    it("calls POST /auth/resend-otp with email type", async () => {
      const mockResponse: ResendOtpResponse = {
        status: "SUCCESS",
        message: "OTP resent",
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await resendOtp({
        email: "john@example.com",
        type: "email",
      });

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        "/auth/resend-otp",
        { email: "john@example.com", type: "email" },
      );
      expect(result.status).toBe("SUCCESS");
    });

    it("calls POST /auth/resend-otp with phone type", async () => {
      const mockResponse: ResendOtpResponse = {
        status: "SUCCESS",
        message: "OTP resent",
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await resendOtp({
        phone: "+2347012345678",
        type: "phone",
      });

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        "/auth/resend-otp",
        { phone: "+2347012345678", type: "phone" },
      );
      expect(result.status).toBe("SUCCESS");
    });
  });
});
