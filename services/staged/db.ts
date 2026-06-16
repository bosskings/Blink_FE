import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "blink_";

export const db = {
  async getAll<T>(key: string): Promise<T[]> {
    const raw = await AsyncStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : [];
  },

  async getById<T extends { id: string | number }>(key: string, id: string | number): Promise<T | null> {
    const items = await this.getAll<T>(key);
    return items.find((item) => item.id === id) ?? null;
  },

  async create<T extends { id: string | number }>(key: string, item: T): Promise<T> {
    const items = await this.getAll<T>(key);
    items.push(item);
    await AsyncStorage.setItem(PREFIX + key, JSON.stringify(items));
    return item;
  },

  async update<T extends { id: string | number }>(key: string, id: string | number, changes: Partial<T> & Record<string, any>): Promise<T | null> {
    const items = await this.getAll<T>(key);
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...changes };
    await AsyncStorage.setItem(PREFIX + key, JSON.stringify(items));
    return items[index];
  },

  async delete<T extends { id: string | number }>(key: string, id: string | number): Promise<boolean> {
    const items = await this.getAll<T>(key);
    const filtered = items.filter((item) => item.id !== id);
    if (filtered.length === items.length) return false;
    await AsyncStorage.setItem(PREFIX + key, JSON.stringify(filtered));
    return true;
  },

  async set<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(PREFIX + key, JSON.stringify(value));
  },

  async get<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  },

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(PREFIX + key);
  },

  async clearAll(): Promise<void> {
    const keys = await AsyncStorage.getAllKeys();
    const blinkKeys = keys.filter((k) => k.startsWith(PREFIX));
    await AsyncStorage.multiRemove(blinkKeys);
  },
};
