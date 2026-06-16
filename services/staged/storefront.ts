import { db } from "./db";

const KEY = "storefront";

export async function fetchStorefront(): Promise<any | null> {
  return db.get<any>(KEY);
}

export async function createStorefront(data: any): Promise<any> {
  const storefront = { id: `sf${Date.now()}`, ...data, createdAt: new Date().toISOString() };
  await db.set(KEY, storefront);
  return storefront;
}

export async function updateStorefront(data: any): Promise<any> {
  const existing = await db.get<any>(KEY) || {};
  const updated = { ...existing, ...data };
  await db.set(KEY, updated);
  return updated;
}
