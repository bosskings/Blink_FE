import { db } from "./db";

export async function login(identifier: string, password: string) {
  const users = await db.getAll<any>("users");
  const user = users.find((u: any) => u.email === identifier || u.phone === identifier);
  if (!user || password.length < 4) {
    throw new Error("Invalid credentials");
  }
  // Sync the profile from the user record
  await db.set("profile", {
    blinkTag: user.blinkTag,
    name: user.name,
    avatar: user.avatar || null,
    email: user.email || "",
    phone: user.phone || "",
    bio: user.bio || "",
    interests: user.interests || [],
    verificationLevel: user.verificationLevel || "none",
    phoneVerified: user.phoneVerified || false,
    emailVerified: user.emailVerified || false,
    hasOnboarded: false,
  });
  const token = `blink_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  return { token, user };
}

export async function register(data: { method: string; identifier: string; isBusiness: boolean }) {
  const id = `u${Date.now()}`;
  const user = {
    id,
    name: data.identifier.split("@")[0],
    blinkTag: `${data.identifier.split("@")[0].toLowerCase()}~user`,
    email: data.method === "email" ? data.identifier : "",
    phone: data.method === "phone" ? data.identifier : "",
    tier: "bronze",
    bio: "",
    interests: [],
    verificationLevel: "none",
    phoneVerified: false,
    emailVerified: false,
  };
  await db.create("users", user);
  // Seed the profile so UserProfileProvider has data to read immediately
  await db.set("profile", {
    blinkTag: user.blinkTag,
    name: user.name,
    avatar: null,
    email: user.email || "",
    phone: user.phone || "",
    bio: "",
    interests: [],
    verificationLevel: "none",
    phoneVerified: false,
    emailVerified: false,
    hasOnboarded: false,
  });
  const token = `blink_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  return { token, user };
}

export async function sendOtp(contact: string) {
  return { success: true };
}

export async function verifyOtp(contact: string, otp: string) {
  if (otp !== "6307") throw new Error("Invalid OTP");
  return { verified: true };
}

export async function resendOtp(contact: string) {
  return { success: true };
}
