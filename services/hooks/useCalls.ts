import { useMutation, useQuery } from "@tanstack/react-query";
import * as callsApi from "../api/calls";
import type { InitiateCallRequest } from "@/types/call";

const CALLS_KEY = ["calls"] as const;

export function useInitiateCall() {
  return useMutation({
    mutationFn: (data: InitiateCallRequest) => callsApi.initiateCall(data),
  });
}

export function useCallHistory() {
  return useQuery({
    queryKey: CALLS_KEY,
    queryFn: async () => {
      const response = await callsApi.fetchCallHistory();
      return response.calls;
    },
  });
}
