import { db } from "./db";

const KEY = "communities";

export async function fetchCommunities(filters?: any): Promise<any[]> {
  let items = await db.getAll<any>(KEY);
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    items = items.filter((c: any) => c.name.toLowerCase().includes(q));
  }
  return items;
}

export async function fetchCommunity(id: string): Promise<any | null> {
  return db.getById<any>(KEY, id);
}

export async function createCommunity(data: any): Promise<any> {
  const community = { id: `c${Date.now()}`, ...data, memberCount: 1, isOwned: true, isJoined: true, status: "OWNED" };
  return db.create(KEY, community);
}

export async function updateCommunitySettings(id: string, changes: any): Promise<any | null> {
  return db.update(KEY, id, changes);
}

export async function joinCommunity(id: string): Promise<any | null> {
  const community = await db.getById<any>(KEY, id);
  if (!community) return null;
  return db.update(KEY, id, { isJoined: true, memberCount: community.memberCount + 1, status: "Active" });
}

export async function leaveCommunity(id: string): Promise<any | null> {
  const community = await db.getById<any>(KEY, id);
  if (!community) return null;
  return db.update(KEY, id, { isJoined: false, memberCount: Math.max(0, community.memberCount - 1), status: "DISCOVER" });
}

export async function reportCommunity(id: string, reason: string, details: string): Promise<boolean> {
  return true;
}
