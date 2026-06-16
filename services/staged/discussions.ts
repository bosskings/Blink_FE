import { db } from "./db";

const KEY = "discussions";

export async function fetchDiscussions(filters?: any): Promise<any[]> {
  let items = await db.getAll<any>(KEY);
  if (filters?.communityId) {
    items = items.filter((d: any) => d.communityId === filters.communityId);
  }
  return items;
}

export async function likeDiscussion(id: string): Promise<any | null> {
  const discussion = await db.getById<any>(KEY, id);
  if (!discussion) return null;
  const nowLiked = !discussion.likedByMe;
  return db.update(KEY, id, {
    likedByMe: nowLiked,
    likes: discussion.likes + (nowLiked ? 1 : -1),
  });
}
