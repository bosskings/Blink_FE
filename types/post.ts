export interface PostAuthor {
  _id?: string;
  firstName: string;
  lastName: string;
  blinkTag?: string;
  avatar?: string;
}

export interface PostCommunity {
  _id?: string;
  name: string;
}

export interface Post {
  _id: string;
  content: string;
  author: PostAuthor;
  community: PostCommunity;
  type?: string;
  isAnonymous?: boolean;
  likesCount: number;
  commentsCount: number;
  images?: string[];
  videos?: string[];
  tags?: string[];
  poll?: PostPoll;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostPoll {
  question: string;
  options: PollOption[];
}

export interface PollOption {
  _id: string;
  text: string;
  votes: number;
}

export interface PostResponse {
  status: string;
  post: Post;
}

export interface CreatePostRequest {
  content: string;
  community: string;
  type?: string;
  isAnonymous?: boolean;
  allowComments?: boolean;
  poll?: {
    question: string;
    options: string[];
  };
}

export interface CreatePostResponse {
  status: string;
  post: Post;
}

export interface LikePostResponse {
  status: string;
  message: string;
}

export interface AddCommentRequest {
  content: string;
  parentId?: string | null;
}

export interface AddCommentResponse {
  status: string;
  message: string;
}

export interface DeletePostResponse {
  status: string;
  message: string;
}

export interface VotePostRequest {
  optionId: string;
}

export interface VotePostResponse {
  status: string;
  message: string;
}

export interface ReportPostResponse {
  status: string;
  message: string;
}

export interface PostComment {
  _id: string;
  user: string;
  avatar?: string;
  time: string;
  content: string;
  parentId: string | null;
}

export interface FetchPostCommentsResponse {
  status: string;
  comments: PostComment[];
}
