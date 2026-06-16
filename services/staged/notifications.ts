import { db } from "./db";

const KEY = "notifications";

export async function fetchNotifications(): Promise<any[]> {
  return db.getAll<any>(KEY);
}

export async function clearNotifications(): Promise<void> {
  await db.set(KEY, []);
}
