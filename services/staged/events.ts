import { db } from "./db";

const KEY = "events";

export async function fetchEvents(filters?: any): Promise<any[]> {
  let items = await db.getAll<any>(KEY);
  if (filters?.communityId) items = items.filter((e: any) => e.communityId === filters.communityId);
  if (filters?.category && filters.category !== "All") items = items.filter((e: any) => e.category === filters.category);
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    items = items.filter((e: any) => e.title.toLowerCase().includes(q));
  }
  if (filters?.dateFilter === "upcoming") items = items.filter((e: any) => e.date >= new Date().toISOString().split("T")[0]);
  if (filters?.dateFilter === "past") items = items.filter((e: any) => e.date < new Date().toISOString().split("T")[0]);
  return items;
}

export async function createEvent(data: any): Promise<any> {
  const event = { id: `e${Date.now()}`, ...data };
  return db.create(KEY, event);
}
