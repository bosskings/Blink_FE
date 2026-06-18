export interface FeedItem {
  _id: string;
  content?: string;
  title?: string;
  type: string;
  author?: {
    _id: string;
    firstName: string;
    lastName: string;
    blinkTag?: string;
    avatar?: string;
  };
  community?: {
    _id: string;
    name: string;
  };
  likesCount?: number;
  commentsCount?: number;
  responsesCount?: number;
  images?: string[];
  tags?: string[];
  createdAt?: string;
}

export interface FeedResponse {
  status: string;
  feed: FeedItem[];
}

export interface FeedRequestsResponse {
  status: string;
  requests: FeedItem[];
}

export interface FeedDiscussionsResponse {
  status: string;
  discussions: FeedItem[];
}
