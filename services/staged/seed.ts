import { db } from "./db";

const SEEDED_KEY = "seeded";

const USERS = [
  { id: "u2", name: "Mike Berger", blinkTag: "mike~berger", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop", email: "mike@example.com", phone: "+2348123456789", tier: "bronze", bio: "Tech enthusiast", interests: ["Tech", "Gaming"], verificationLevel: "none", phoneVerified: false, emailVerified: false },
  { id: "u3", name: "Sarah Chen", blinkTag: "sarah~chen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop", email: "sarah@example.com", phone: "+2348222333444", tier: "silver", bio: "Designer & photographer", interests: ["Fashion", "Photography"], verificationLevel: "silver", phoneVerified: true, emailVerified: true },
  { id: "u4", name: "Anna Montana", blinkTag: "anna~montana", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop", email: "anna@example.com", phone: "+2348333444555", tier: "bronze", bio: "Fashion lover", interests: ["Fashion", "Lifestyle"], verificationLevel: "none", phoneVerified: false, emailVerified: false },
  { id: "u5", name: "David Adeleke", blinkTag: "david~adeleke", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", email: "david@example.com", phone: "+2348444555666", tier: "bronze", bio: "Student & entrepreneur", interests: ["Business", "Tech"], verificationLevel: "none", phoneVerified: false, emailVerified: false },
  { id: "u6", name: "Dana Johnson", blinkTag: "dana~johnson", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop", email: "dana@example.com", phone: "+2348555666777", tier: "gold", bio: "Community manager", interests: ["Culture", "Faith"], verificationLevel: "gold", phoneVerified: true, emailVerified: true },
];

const LISTINGS = [
  { id: "l1", userId: "u2", title: "Road Bicycle", price: 45000, description: "Great condition road bicycle, perfect for city rides.", timePosted: new Date().toISOString(), distance: 0.7, image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop", tag: "SALE", images: ["https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800"], location: { lat: 6.5, lng: 3.4 } },
  { id: "l2", userId: "u3", title: "Laptop Stand", price: 12500, description: "Adjustable aluminum laptop stand, barely used.", timePosted: new Date(Date.now() - 3600000 * 5).toISOString(), distance: 0.5, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop", tag: "RENT", images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop"], location: { lat: 6.6, lng: 3.3 } },
  { id: "l3", userId: "u4", title: "Office Chair", price: 35000, description: "Ergonomic office chair with lumbar support.", timePosted: new Date(Date.now() - 86400000).toISOString(), distance: 1.2, image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=600&fit=crop", tag: "SERVICE", images: ["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=600&fit=crop"], location: { lat: 6.4, lng: 3.5 } },
  { id: "l5", userId: "u5", title: "HP EliteBook Laptop", price: 180000, description: "Core i7 business laptop, 16GB RAM, 512GB SSD.", timePosted: new Date(Date.now() - 3600000 * 3).toISOString(), distance: 1.8, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop", tag: "SALE", images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800"], location: { lat: 6.3, lng: 3.6 } },
  { id: "l6", userId: "u6", title: "Mountain Bike", price: 65000, description: "Off-road mountain bike, tough tires.", timePosted: new Date(Date.now() - 86400000 * 2).toISOString(), distance: 1.5, image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&h=600&fit=crop", tag: "SALE", images: ["https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800"], location: { lat: 6.7, lng: 3.2 } },
  { id: "l7", userId: "u2", title: "Calculus Textbook", price: 2500, description: "Engineering Mathematics textbook, good condition.", timePosted: new Date(Date.now() - 86400000 * 5).toISOString(), distance: 0.6, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop", tag: "SALE", images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800"], location: { lat: 6.5, lng: 3.4 } },
  { id: "l8", userId: "u4", title: "Graphic Design Service", price: 15000, description: "Professional logo and flyer design. 3-day turnaround.", timePosted: new Date().toISOString(), distance: 0.0, image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop", tag: "SERVICE", images: ["https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800"], location: { lat: 6.5, lng: 3.4 } },
];

const REQUESTS = [
  { id: "r1", userId: "u3", title: "Looking for: An umbrella", description: "I need an umbrella ASAP!", type: "Borrow", budget: 0, urgency: "HIGH", duration: "Few hours", timePosted: new Date(Date.now() - 480000).toISOString(), responsesCount: 3, requesterId: "u4" },
  { id: "r2", userId: "u5", title: "Looking for: Laptop Charger", description: "My USB-C charger stopped working!", type: "Borrow", budget: 0, urgency: "HIGH", duration: "Few hours", timePosted: new Date(Date.now() - 900000).toISOString(), responsesCount: 1, requesterId: "u2" },
  { id: "r3", userId: "u6", title: "Need a Ride to Campus", description: "Anyone driving to Covenant University tomorrow?", type: "Buy", budget: 2000, urgency: "MEDIUM", duration: "1 day", timePosted: new Date(Date.now() - 3600000 * 2).toISOString(), responsesCount: 5, requesterId: "u3" },
];

const DISCUSSIONS = [
  { id: "d1", userId: "u2", userName: "Mike Berger", userAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop", communityId: "c1", communityName: "Covenant University", content: "Anyone with ENG 201 past questions?\nExams are coming fast!", tags: ["#ExamSeason", "#StudyTips"], likes: 124, likedByMe: false, comments: 67, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: "d2", userId: "u4", userName: "Anna Montana", userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop", communityId: "c1", communityName: "Covenant University", content: "Anyone selling a used laptop around campus?", tags: ["#BuySell", "#Tech"], likes: 45, likedByMe: false, comments: 23, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "d3", userId: "u3", userName: "Sarah Chen", userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop", communityId: "c2", communityName: "Ota Central Market", content: "Best spots for affordable fabrics in Ota market?", tags: ["#Fashion", "#Market"], likes: 89, likedByMe: false, comments: 34, createdAt: new Date(Date.now() - 3600000 * 4).toISOString() },
  { id: "d4", userId: "u5", userName: "David Adeleke", userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", communityId: "c3", communityName: "Unilag Hub", content: "Startup meetup this Friday at the innovation hub!", tags: ["#Startup", "#Events"], likes: 210, likedByMe: false, comments: 56, createdAt: new Date(Date.now() - 3600000 * 8).toISOString() },
];

const COMMUNITIES = [
  { id: "c1", name: "Covenant University", description: "A vibrant student community in Ota, Ogun State.", memberCount: 18000, nestedCount: 2, image: "https://images.unsplash.com/photo-1587466738777-28022963e45a?w=900&auto=format&fit=crop", status: "DISCOVER", isJoined: false, isOwned: false, latitude: 6.5, longitude: 3.4 },
  { id: "c2", name: "Ota Central Market", description: "Local marketplace for fresh produce, fabrics and more.", memberCount: 12000, nestedCount: 1, image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=900&auto=format&fit=crop", status: "DISCOVER", isJoined: false, isOwned: false, latitude: 6.6, longitude: 3.3 },
  { id: "c3", name: "Unilag Hub", description: "University of Lagos student community.", memberCount: 25000, nestedCount: 3, image: "https://images.unsplash.com/photo-1522752562114-9deaf20c2058?w=900&auto=format&fit=crop", status: "DISCOVER", isJoined: false, isOwned: false, latitude: 6.5, longitude: 3.4 },
  { id: "c4", name: "Tech Hub", description: "Tech enthusiasts and developers community.", memberCount: 8500, nestedCount: 2, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&auto=format&fit=crop", status: "DISCOVER", isJoined: false, isOwned: false, latitude: 6.5, longitude: 3.4 },
  { id: "c5", name: "Sports Arena", description: "Sports lovers community for events and discussions.", memberCount: 5200, nestedCount: 1, image: "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf0b?w=900&auto=format&fit=crop", status: "DISCOVER", isJoined: false, isOwned: false, latitude: 6.5, longitude: 3.4 },
];

const POSTS = [
  { id: "p1", communityId: "c1", userId: "u2", content: "Anyone up for a study group tonight?", createdAt: new Date(Date.now() - 3600000).toISOString(), likes: 12, comments: 5 },
  { id: "p2", communityId: "c1", userId: "u4", content: "Selling my barely used textbooks. DM me!", createdAt: new Date(Date.now() - 7200000).toISOString(), likes: 8, comments: 3 },
  { id: "p3", communityId: "c2", userId: "u3", content: "Best tailor in Ota? Need a native outfit made.", createdAt: new Date(Date.now() - 86400000).toISOString(), likes: 15, comments: 7 },
  { id: "p4", communityId: "c3", userId: "u5", content: "Startup pitch competition next week. Register now!", createdAt: new Date(Date.now() - 3600000 * 12).toISOString(), likes: 45, comments: 12 },
  { id: "p5", communityId: "c4", userId: "u6", content: "Free React Native workshop this Saturday.", createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), likes: 67, comments: 23 },
  { id: "p6", communityId: "c5", userId: "u2", content: "Football match this Sunday at 4pm.", createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), likes: 23, comments: 9 },
  { id: "p7", communityId: "c1", userId: "u5", content: "Lost my student ID card. If found please contact me.", createdAt: new Date(Date.now() - 3600000 * 5).toISOString(), likes: 5, comments: 1 },
  { id: "p8", communityId: "c1", userId: "u6", content: "Happy Founders Day Covenant University!", createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), likes: 156, comments: 34 },
];

const EVENTS = [
  { id: "e1", communityId: "c1", title: "Engineering Career Fair", date: new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0], time: "10:00", location: "Engineering Building", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", category: "Career", description: "Meet top employers and explore career opportunities." },
  { id: "e2", communityId: "c1", title: "End of Year Party", date: new Date(Date.now() + 86400000 * 14).toISOString().split("T")[0], time: "18:00", location: "Student Center", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", category: "Social", description: "Celebrate the academic year with music and dance." },
  { id: "e3", communityId: "c3", title: "Startup Pitch Day", date: new Date(Date.now() + 86400000 * 5).toISOString().split("T")[0], time: "14:00", location: "Innovation Hub", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop", category: "Business", description: "Present your startup idea and win funding." },
  { id: "e4", communityId: "c4", title: "Hackathon 2026", date: new Date(Date.now() + 86400000 * 21).toISOString().split("T")[0], time: "09:00", location: "Tech Hub", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop", category: "Tech", description: "48-hour hackathon to build innovative solutions." },
];

const CHATS = [
  { id: "ch1", participantName: "Mike Berger", participantAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop", lastMessage: "Is the bicycle still available?", lastMessageTime: new Date(Date.now() - 120000).toISOString(), unreadCount: 2, isOnline: true },
  { id: "ch2", participantName: "Sarah Chen", participantAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop", lastMessage: "Thanks for the laptop stand!", lastMessageTime: new Date(Date.now() - 3600000).toISOString(), unreadCount: 0, isOnline: false },
  { id: "ch3", participantName: "Dana Johnson", participantAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop", lastMessage: "Can we meet at the library?", lastMessageTime: new Date(Date.now() - 10800000).toISOString(), unreadCount: 1, isOnline: true },
];

const NOTIFICATIONS = [
  { id: "n1", title: "New message", description: "You have a new message from Mike Berger", time: "2m ago", type: "message" },
  { id: "n2", title: "Item approved", description: "Your listing 'Road Bicycle' was approved", time: "1h ago", type: "item" },
  { id: "n3", title: "Payment received", description: "You received ₦12,500 for 'Laptop Stand'", time: "Yesterday", type: "payment" },
  { id: "n4", title: "Community update", description: "New event in Covenant University", time: "2 days ago", type: "event" },
];

const TRENDING_HASHTAGS = [
  { id: "h1", tag: "#ExamSeason", posts: 1240, location: "Covenant University" },
  { id: "h2", tag: "#StudyTips", posts: 890, location: "Nigeria" },
  { id: "h3", tag: "#CampusLife", posts: 2100, location: "Ota" },
  { id: "h4", tag: "#TechTrends", posts: 560, location: "Lagos" },
  { id: "h5", tag: "#Fashion", posts: 1450, location: "Nigeria" },
  { id: "h6", tag: "#Startups", posts: 780, location: "Africa" },
];

export async function seedIfNeeded(): Promise<void> {
  const seeded = await db.get<string>(SEEDED_KEY);
  if (seeded === "true") return;

  await db.set("users", USERS);
  await db.set("listings", LISTINGS);
  await db.set("requests", REQUESTS);
  await db.set("discussions", DISCUSSIONS);
  await db.set("communities", COMMUNITIES);
  await db.set("posts", POSTS);
  await db.set("events", EVENTS);
  await db.set("chats", CHATS);
  await db.set("notifications", NOTIFICATIONS);
  await db.set("trending_hashtags", TRENDING_HASHTAGS);
  await db.set("chat_messages", []);

  await db.set(SEEDED_KEY, "true");
}
