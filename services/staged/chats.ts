import { db } from "./db";

const KEY = "chats";

export async function fetchChats(): Promise<any[]> {
  return db.getAll<any>(KEY);
}

export async function deleteChat(id: string): Promise<boolean> {
  return db.delete(KEY, id);
}
