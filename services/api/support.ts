import { apiClient } from "./client";
import type {
  CreateTicketRequest,
  CreateTicketResponse,
  FetchTicketsResponse,
} from "@/types/support";

export async function createTicket(data: CreateTicketRequest): Promise<CreateTicketResponse> {
  const response = await apiClient.post<CreateTicketResponse>("/support/tickets", data);
  return response.data;
}

export async function fetchTickets(): Promise<FetchTicketsResponse> {
  const response = await apiClient.get<FetchTicketsResponse>("/support/tickets");
  return response.data;
}
