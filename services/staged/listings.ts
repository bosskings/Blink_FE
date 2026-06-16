import { db } from "./db";

const KEY = "listings";

export async function fetchListings(filters?: any): Promise<any[]> {
  let items = await db.getAll<any>(KEY);
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    items = items.filter((p: any) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  if (filters?.type && filters.type !== "All") {
    items = items.filter((p: any) => p.tag === filters.type.toUpperCase());
  }
  if (filters?.communityId) {
    items = items.filter((p: any) => p.communityId === filters.communityId);
  }
  return items;
}

export async function fetchListing(id: string): Promise<any | null> {
  return db.getById<any>(KEY, id);
}

export async function createListing(data: any): Promise<any> {
  const listing = { id: `l${Date.now()}`, ...data, timePosted: new Date().toISOString() };
  return db.create(KEY, listing);
}

export async function deleteListing(id: string): Promise<boolean> {
  return db.delete(KEY, id);
}
