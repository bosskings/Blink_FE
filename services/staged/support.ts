import { db } from "./db";

export async function createTicket(topic: string, message: string): Promise<any> {
  const ticket = { id: `t${Date.now()}`, topic, message, createdAt: new Date().toISOString() };
  return db.create("support_tickets", ticket);
}
