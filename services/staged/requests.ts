import { db } from "./db";

const KEY = "requests";

export async function fetchRequests(filters?: any): Promise<any[]> {
  let items = await db.getAll<any>(KEY);
  if (filters?.communityId) {
    items = items.filter((r: any) => r.communityId === filters.communityId);
  }
  return items;
}

export async function createRequest(data: any): Promise<any> {
  const request = { id: `r${Date.now()}`, ...data, timePosted: new Date().toISOString(), responsesCount: 0 };
  return db.create(KEY, request);
}

export async function updateRequest(id: string, changes: any): Promise<any | null> {
  return db.update(KEY, id, changes);
}
