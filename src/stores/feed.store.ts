import { create } from 'zustand';
import { produce } from 'immer';
import { Post } from '../types/feed.types';

interface FeedState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  appendPosts: (posts: Post[]) => void;
  prependPost: (post: Post) => void;
  toggleLikePost: (postId: string) => void;
  toggleBookmarkPost: (postId: string) => void;
  deletePost: (postId: string) => void;
}

export const useFeedStore = create<FeedState>()((set) => ({
  posts: [],

  setPosts: (posts) =>
    set(
      produce((state: FeedState) => {
        state.posts = posts;
      })
    ),

  appendPosts: (newPosts) =>
    set(
      produce((state: FeedState) => {
        state.posts.push(...newPosts);
      })
    ),

  prependPost: (post) =>
    set(
      produce((state: FeedState) => {
        state.posts.unshift(post);
      })
    ),

  toggleLikePost: (postId) =>
    set(
      produce((state: FeedState) => {
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.isLiked = !post.isLiked;
          post.likesCount += post.isLiked ? 1 : -1;
        }
      })
    ),

  toggleBookmarkPost: (postId) =>
    set(
      produce((state: FeedState) => {
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.isSaved = !post.isSaved;
        }
      })
    ),

  deletePost: (postId) =>
    set(
      produce((state: FeedState) => {
        state.posts = state.posts.filter((p) => p.id !== postId);
      })
    ),
}));
