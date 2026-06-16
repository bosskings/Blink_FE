import { db } from "./db";

const KEY = "profile";

export async function fetchProfile(): Promise<any> {
  return db.get(KEY);
}

export async function updateProfile(data: Partial<any>): Promise<any> {
  const profile = await db.get<any>(KEY);
  const updated = { ...profile, ...data };
  await db.set(KEY, updated);
  return updated;
}

export async function updateAvatar(avatar: string): Promise<any> {
  return updateProfile({ avatar });
}

export async function updateInterests(interests: string[]): Promise<any> {
  return updateProfile({ interests });
}

export async function completeOnboarding(): Promise<any> {
  return updateProfile({ hasOnboarded: true });
}
