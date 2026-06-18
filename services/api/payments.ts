import { apiClient } from "./client";
import type {
  InitializePaymentRequest,
  InitializePaymentResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
  BanksResponse,
  VerifyAccountParams,
  VerifyAccountResponse,
  ConfirmPickupRequest,
  ConfirmPickupResponse,
} from "@/types/payment";

export async function initializePayment(
  data: InitializePaymentRequest,
): Promise<InitializePaymentResponse> {
  const response = await apiClient.post<InitializePaymentResponse>(
    "/payments/initialize",
    data,
  );
  return response.data;
}

export async function verifyPayment(
  data: VerifyPaymentRequest,
): Promise<VerifyPaymentResponse> {
  const response = await apiClient.post<VerifyPaymentResponse>(
    "/payments/verify",
    data,
  );
  return response.data;
}

export async function fetchBanks(): Promise<BanksResponse> {
  const response = await apiClient.get<BanksResponse>("/payments/banks");
  return response.data;
}

export async function verifyAccount(
  params: VerifyAccountParams,
): Promise<VerifyAccountResponse> {
  const query = new URLSearchParams({
    accountNumber: params.accountNumber,
    bankCode: params.bankCode,
  });
  const response = await apiClient.get<VerifyAccountResponse>(
    `/payments/verify-account?${query.toString()}`,
  );
  return response.data;
}

export async function confirmPickup(
  data: ConfirmPickupRequest,
): Promise<ConfirmPickupResponse> {
  const response = await apiClient.post<ConfirmPickupResponse>(
    "/payments/confirm-pickup",
    data,
  );
  return response.data;
}
