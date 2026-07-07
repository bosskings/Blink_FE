import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as supportApi from "../api/support";
import type { CreateTicketRequest } from "@/types/support";

const TICKETS_KEY = ["support_tickets"] as const;

export function useSupportTickets() {
  return useQuery({
    queryKey: TICKETS_KEY,
    queryFn: async () => {
      const response = await supportApi.fetchTickets();
      return response.tickets;
    },
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTicketRequest) => supportApi.createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TICKETS_KEY });
    },
  });
}
