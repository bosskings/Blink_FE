import { db } from "./db";

const KEY = "posts";

export async function fetchPosts(communityId?: string): Promise<any[]> {
  let items = await db.getAll<any>(KEY);
  if (communityId) items = items.filter((p: any) => p.communityId === communityId);
  return items;
}

export async function createPost(data: any): Promise<any> {
  const post = { id: `p${Date.now()}`, ...data, createdAt: new Date().toISOString(), likes: 0, comments: 0 };
  return db.create(KEY, post);
}

export async function deletePost(id: string): Promise<boolean> {
  return db.delete(KEY, id);
}
