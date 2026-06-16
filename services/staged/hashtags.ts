import { db } from "./db";

const KEY = "trending_hashtags";

export async function fetchTrendingHashtags(communityId?: string): Promise<any[]> {
  let items = await db.getAll<any>(KEY);
  return items;
}
