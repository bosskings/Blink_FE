export interface SupportTicket {
  _id: string;
  topic: string;
  subject: string;
  message: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTicketRequest {
  topic: string;
  subject: string;
  message: string;
}

export interface CreateTicketResponse {
  status: string;
  ticket: SupportTicket;
}

export interface FetchTicketsResponse {
  status: string;
  tickets: SupportTicket[];
}
