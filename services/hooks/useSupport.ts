import { useMutation } from "@tanstack/react-query";
import * as staged from "../staged/support";

export function useCreateTicket() {
  return useMutation({
    mutationFn: (data: { topic: string; message: string }) => staged.createTicket(data.topic, data.message),
  });
}
