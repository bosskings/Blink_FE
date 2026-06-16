import { useMutation, useQuery } from "@tanstack/react-query";
import * as auth from "../staged/auth";

export function useRegister() {
  return useMutation({ mutationFn: (data: { method: string; identifier: string; isBusiness: boolean }) => auth.register(data) });
}

export function useLogin() {
  return useMutation({ mutationFn: (data: { identifier: string; password: string }) => auth.login(data.identifier, data.password) });
}

export function useSendOtp() {
  return useMutation({ mutationFn: (contact: string) => auth.sendOtp(contact) });
}

export function useVerifyOtp() {
  return useMutation({ mutationFn: (data: { contact: string; otp: string }) => auth.verifyOtp(data.contact, data.otp) });
}

export function useResendOtp() {
  return useMutation({ mutationFn: (contact: string) => auth.resendOtp(contact) });
}
