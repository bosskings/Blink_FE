# Blink Backend - Missing API Endpoints

**Date:** June 18, 2026  
**Base URL:** `{{base_url}}/api/v1`  
**Auth:** All endpoints require `Authorization: Bearer <token>` header  
**Response Pattern:** All responses follow `{ "status": "SUCCESS", ... }`

---

## 1. Events API (3 endpoints)

**Frontend screens that need these:**
- `all-events.tsx` — Lists all events for a community
- `event/[id].tsx` — Single event detail with comments
- `create-content.tsx` — Event creation form
- `community-details/[id].tsx` — Shows upcoming events section

---

### 1.1 Create Event

```
POST /api/v1/events
```

**Request Body (JSON):**
```json
{
  "communityId": "string (required)",
  "title": "string (required)",
  "description": "string (optional)",
  "date": "string (required) — e.g. 'Nov 5, 2023'",
  "time": "string (required) — e.g. '10:00 AM'",
  "location": "string (required)",
  "category": "string (required) — one of: Workshop, Conference, Festival, Meetup, Hackathon, Seminar, Webinar, Sports, Charity, Exhibition, Party, Cultural",
  "image": "string (optional) — main image URL",
  "images": ["string (optional) — additional image URLs"],
  "videos": ["string (optional) — video URLs"]
}
```

**Response (201 Created):**
```json
{
  "status": "SUCCESS",
  "event": {
    "_id": "evt_abc123",
    "communityId": "comm_123",
    "title": "Tech Innovation Summit",
    "description": "Join us for an exciting day of tech talks and networking.",
    "date": "Nov 5, 2023",
    "time": "10:00 AM",
    "location": "Main Auditorium, Block A",
    "category": "Conference",
    "community": "Covenant University",
    "image": "https://example.com/event.jpg",
    "images": [],
    "videos": [],
    "createdBy": {
      "_id": "user_123",
      "firstName": "John"
    },
    "createdAt": "2024-05-12T10:00:00.000Z"
  }
}
```

---

### 1.2 List Events

```
GET /api/v1/events?communityId=comm_123
```

**Query Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `communityId` | string | Optional | Filter events by community |

**Response (200 OK):**
```json
{
  "status": "SUCCESS",
  "events": [
    {
      "_id": "evt_abc123",
      "title": "Tech Innovation Summit",
      "date": "Nov 5, 2023",
      "time": "10:00 AM",
      "location": "Main Auditorium, Block A",
      "category": "Conference",
      "community": "Covenant University",
      "description": "Join us for an exciting day of tech talks.",
      "image": "https://example.com/event.jpg",
      "images": [],
      "videos": [],
      "createdAt": "2024-05-12T10:00:00.000Z"
    }
  ]
}
```

---

### 1.3 Get Single Event

```
GET /api/v1/events/:id
```

**Path Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `id` | string | Event ID |

**Response (200 OK):**
```json
{
  "status": "SUCCESS",
  "event": {
    "_id": "evt_abc123",
    "title": "Tech Innovation Summit",
    "date": "Nov 5, 2023",
    "time": "10:00 AM",
    "location": "Main Auditorium, Block A",
    "category": "Conference",
    "community": "Covenant University",
    "description": "Join us for an exciting day of tech talks and networking.",
    "image": "https://example.com/event.jpg",
    "images": [],
    "videos": [],
    "createdAt": "2024-05-12T10:00:00.000Z"
  }
}
```

---

## 2. Hashtags API (2 endpoints)

**Frontend screens that need these:**
- `trending-hashtags.tsx` — Trending hashtags list
- `hashtag/[tag].tsx` — Posts filtered by hashtag
- `community.tsx` — Trending hashtags section

---

### 2.1 Get Trending Hashtags

```
GET /api/v1/hashtags/trending
```

**Response (200 OK):**
```json
{
  "status": "SUCCESS",
  "hashtags": [
    {
      "id": 1,
      "tag": "#CampusLife",
      "count": "2.4k posts",
      "trend": "up",
      "category": "Campus"
    },
    {
      "id": 2,
      "tag": "#TechDeals",
      "count": "1.8k posts",
      "trend": "up",
      "category": "Technology"
    },
    {
      "id": 3,
      "tag": "#StudyGroup",
      "count": "956 posts",
      "trend": "stable",
      "category": "Academic"
    },
    {
      "id": 4,
      "tag": "#FoodRun",
      "count": "743 posts",
      "trend": "down",
      "category": "Food"
    }
  ]
}
```

**Field Descriptions:**
| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique ID |
| `tag` | string | Hashtag including `#` prefix |
| `count` | string | Human-readable post count (e.g. "2.4k posts") |
| `trend` | string | One of: `up`, `down`, `stable` |
| `category` | string | Category label |

---

### 2.2 Get Posts by Hashtag

```
GET /api/v1/hashtags/:tag/posts
```

**Path Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `tag` | string | Hashtag without `#` prefix (e.g. `CampusLife`) |

**Response (200 OK):**
```json
{
  "status": "SUCCESS",
  "posts": [
    {
      "_id": "post_123",
      "content": "Loving the campus vibes today! #CampusLife",
      "author": {
        "_id": "user_123",
        "firstName": "Jane",
        "lastName": "Smith",
        "avatar": "https://example.com/avatar.jpg"
      },
      "community": {
        "_id": "comm_123",
        "name": "Covenant University"
      },
      "likesCount": 10,
      "commentsCount": 3,
      "tags": ["#CampusLife", "#Tech"],
      "images": [],
      "createdAt": "2024-05-12T10:00:00.000Z"
    }
  ]
}
```

---

## 3. Support API (2 endpoints)

**Frontend screens that need these:**
- `contact-support.tsx` — Submit support ticket form

---

### 3.1 Create Support Ticket

```
POST /api/v1/support/tickets
```

**Request Body (JSON):**
```json
{
  "topic": "string (required) — one of: Payments, Listings, Account, Other",
  "subject": "string (required)",
  "message": "string (required)"
}
```

**Response (201 Created):**
```json
{
  "status": "SUCCESS",
  "ticket": {
    "_id": "ticket_abc123",
    "topic": "Payments",
    "subject": "Payment not received",
    "message": "I made a payment 2 hours ago but the seller hasn't received it.",
    "status": "OPEN",
    "createdAt": "2024-05-12T10:00:00.000Z"
  }
}
```

---

### 3.2 List My Support Tickets

```
GET /api/v1/support/tickets
```

**Response (200 OK):**
```json
{
  "status": "SUCCESS",
  "tickets": [
    {
      "_id": "ticket_abc123",
      "topic": "Payments",
      "subject": "Payment not received",
      "message": "I made a payment 2 hours ago but...",
      "status": "OPEN",
      "createdAt": "2024-05-12T10:00:00.000Z",
      "updatedAt": "2024-05-12T10:00:00.000Z"
    }
  ]
}
```

**Status Values:** `OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`

---

## 4. Community Join Requests Listing (1 endpoint)

**Frontend screens that need this:**
- `request.tsx` — Lists pending join requests for community admins
- `community-membership.tsx` — Shows pending requests section

**Note:** The approve (`POST /communities/:id/requests/:userId/approve`) and reject (`POST /communities/:id/requests/:userId/reject`) endpoints already exist. Only the listing endpoint is missing.

---

### 4.1 List Pending Join Requests

```
GET /api/v1/communities/:id/requests
```

**Path Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `id` | string | Community ID |

**Response (200 OK):**
```json
{
  "status": "SUCCESS",
  "requests": [
    {
      "id": "req_123",
      "name": "Jane Cooper",
      "username": "@janecooper",
      "avatar": "https://example.com/avatar.jpg",
      "time": "2h ago",
      "message": "Hi, I'd love to join this community! I'm a 300-level student.",
      "status": "pending"
    },
    {
      "id": "req_456",
      "name": "Mike Wilson",
      "username": "@mikewilson",
      "avatar": "https://example.com/avatar2.jpg",
      "time": "5h ago",
      "message": "Interested in joining for the tech meetups.",
      "status": "pending"
    }
  ]
}
```

**Field Descriptions:**
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Request ID (used as `userId` param in approve/reject) |
| `name` | string | Requester's display name |
| `username` | string | Requester's blink tag with `@` prefix |
| `avatar` | string | Requester's avatar URL |
| `time` | string | Human-readable time since request (e.g. "2h ago") |
| `message` | string | Optional message from the requester |
| `status` | string | `pending` (only pending requests should be returned) |

---

## 5. Community Reported Posts Listing (1 endpoint)

**Frontend screens that need this:**
- `reported-posts.tsx` — Lists reported posts for community admins
- `community-membership.tsx` — Shows reported posts section

**Note:** The takedown action uses `DELETE /posts/:id` which already exists.

---

### 5.1 List Reported Posts for Community

```
GET /api/v1/communities/:id/reports
```

**Path Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `id` | string | Community ID |

**Response (200 OK):**
```json
{
  "status": "SUCCESS",
  "reports": [
    {
      "id": "report_123",
      "type": "Inappropriate Content",
      "reportedBy": "John Doe",
      "reportedAt": "2 hours ago",
      "postPreview": "This post contains offensive language that violates...",
      "postId": "post_abc123",
      "status": "pending"
    },
    {
      "id": "report_456",
      "type": "Spam",
      "reportedBy": "Sarah Miller",
      "reportedAt": "5 hours ago",
      "postPreview": "Buy cheap phones at www.scam...",
      "postId": "post_def456",
      "status": "pending"
    }
  ]
}
```

**Field Descriptions:**
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Report ID |
| `type` | string | Report category (e.g. "Inappropriate Content", "Spam", "Harassment") |
| `reportedBy` | string | Name of the user who submitted the report |
| `reportedAt` | string | Human-readable time since report |
| `postPreview` | string | Truncated preview of the reported post content |
| `postId` | string | ID of the reported post (used for takedown via `DELETE /posts/:postId`) |
| `status` | string | `pending`, `reviewed`, `taken_down` |

---

## 6. Post Comments Listing (1 endpoint)

**Frontend screens that need this:**
- `post/[id].tsx` — Shows comments under a post (currently hardcoded with 30 fake comments)

**Note:** The `POST /posts/:id/comments` endpoint to ADD a comment already exists. Only the GET (listing) is missing.

---

### 6.1 List Comments for a Post

```
GET /api/v1/posts/:id/comments
```

**Path Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `id` | string | Post ID |

**Response (200 OK):**
```json
{
  "status": "SUCCESS",
  "comments": [
    {
      "_id": "comment_123",
      "user": "Mike Berger",
      "avatar": "https://example.com/avatar.jpg",
      "time": "2h ago",
      "content": "This is such an insightful post! Really enjoyed reading it.",
      "parentId": null
    },
    {
      "_id": "comment_456",
      "user": "Sarah Chen",
      "avatar": "https://example.com/avatar2.jpg",
      "time": "1h ago",
      "content": "I agree with Mike, great perspective!",
      "parentId": "comment_123"
    }
  ]
}
```

**Field Descriptions:**
| Field | Type | Description |
|-------|------|-------------|
| `_id` | string | Comment ID |
| `user` | string | Commenter's display name |
| `avatar` | string | Commenter's avatar URL |
| `time` | string | Human-readable time since comment |
| `content` | string | Comment text |
| `parentId` | string or null | Parent comment ID for nested replies, `null` for top-level comments |

---

## Summary

| # | Method | Endpoint | Priority | Description |
|---|--------|----------|----------|-------------|
| 1 | `POST` | `/api/v1/events` | High | Create event |
| 2 | `GET` | `/api/v1/events?communityId=` | High | List events |
| 3 | `GET` | `/api/v1/events/:id` | High | Get single event |
| 4 | `GET` | `/api/v1/hashtags/trending` | Medium | Trending hashtags |
| 5 | `GET` | `/api/v1/hashtags/:tag/posts` | Medium | Posts by hashtag |
| 6 | `POST` | `/api/v1/support/tickets` | Medium | Create support ticket |
| 7 | `GET` | `/api/v1/support/tickets` | Low | List my tickets |
| 8 | `GET` | `/api/v1/communities/:id/requests` | High | List pending join requests |
| 9 | `GET` | `/api/v1/communities/:id/reports` | High | List reported posts |
| 10 | `GET` | `/api/v1/posts/:id/comments` | High | List post comments |

**Total: 10 endpoints needed.**

All endpoints should:
- Use the same `Authorization: Bearer <token>` auth header pattern
- Return `{ "status": "SUCCESS", ... }` on success
- Return `{ "status": "ERROR", "message": "..." }` on failure
- Follow the same base URL: `{{base_url}}/api/v1/...`

Once these are built and added to the Postman collection, the frontend can immediately wire them in — the types and screen structures are already in place.
