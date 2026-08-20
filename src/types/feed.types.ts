import { UserProfile } from './user.types';

export interface Comment {
  id: string;
  postId: string;
  author: UserProfile;
  content: string;
  createdAt: string;
  likesCount: number;
  isLiked: boolean;
}

export interface Post {
  id: string;
  author: UserProfile;
  content: string;
  mediaUrls?: string[];
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  isLiked: boolean;
  isReposted: boolean;
  isSaved: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePostPayload {
  content: string;
  mediaUrls?: string[];
}
