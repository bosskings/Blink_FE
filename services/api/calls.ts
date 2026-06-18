import { apiClient } from "./client";
import type {
  InitiateCallRequest,
  InitiateCallResponse,
  CallHistoryResponse,
} from "@/types/call";

export async function initiateCall(
  data: InitiateCallRequest,
): Promise<InitiateCallResponse> {
  const response = await apiClient.post<InitiateCallResponse>(
    "/calls/initiate",
    data,
  );
  return response.data;
}

export async function fetchCallHistory(): Promise<CallHistoryResponse> {
  const response = await apiClient.get<CallHistoryResponse>("/calls/history");
  return response.data;
}
