import { useMutation, useQuery } from "@tanstack/react-query";
import * as paymentsApi from "../api/payments";
import type {
  InitializePaymentRequest,
  VerifyPaymentRequest,
  VerifyAccountParams,
  ConfirmPickupRequest,
} from "@/types/payment";

export function useBanks() {
  return useQuery({
    queryKey: ["banks"],
    queryFn: async () => {
      const response = await paymentsApi.fetchBanks();
      return response.banks;
    },
  });
}

export function useVerifyAccount() {
  return useMutation({
    mutationFn: (params: VerifyAccountParams) =>
      paymentsApi.verifyAccount(params),
  });
}

export function useInitializePayment() {
  return useMutation({
    mutationFn: (data: InitializePaymentRequest) =>
      paymentsApi.initializePayment(data),
  });
}

export function useVerifyPayment() {
  return useMutation({
    mutationFn: (data: VerifyPaymentRequest) =>
      paymentsApi.verifyPayment(data),
  });
}

export function useConfirmPickup() {
  return useMutation({
    mutationFn: (data: ConfirmPickupRequest) =>
      paymentsApi.confirmPickup(data),
  });
}
