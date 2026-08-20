import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import { Post } from '../types/feed.types';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { zustandMMKVStorage } from '../services/storage/mmkv.storage';
import { feedApi } from '../services/api/feed';

export interface OfflineAction {
  id: string;
  type: 'CREATE_POST' | 'LIKE_POST' | 'COMMENT';
  payload: any;
  createdAt: string;
}

export interface FeedSlice {
  posts: Post[];
  offlineQueue: OfflineAction[];
  isSyncing: boolean;

  setPosts: (posts: Post[]) => void;
  appendPosts: (posts: Post[]) => void;
  prependPost: (post: Post) => void;

  // Offline Actions
  addOfflinePost: (content: string, mediaUrls?: string[]) => void;
  toggleLikePost: (postId: string) => void;
  addOfflineComment: (postId: string, content: string) => void;

  // Background Sync
  syncOfflineQueue: () => Promise<void>;
  clearOfflineQueue: () => void;
}

export const useFeedStore = create<FeedSlice>()(
  persist(
    (set, get) => ({
      posts: [],
      offlineQueue: [],
      isSyncing: false,

      setPosts: (posts) =>
        set(
          produce((state: FeedSlice) => {
            state.posts = posts;
          })
        ),

      appendPosts: (newPosts) =>
        set(
          produce((state: FeedSlice) => {
            state.posts.push(...newPosts);
          })
        ),

      prependPost: (post) =>
        set(
          produce((state: FeedSlice) => {
            state.posts.unshift(post);
          })
        ),

      addOfflinePost: (content, mediaUrls) =>
        set(
          produce((state: FeedSlice) => {
            const tempPost: Post = {
              id: `offline_${Date.now()}`,
              author: {
                id: 'me',
                email: 'user@offline.com',
                firstName: 'Offline',
                lastName: 'User',
                headline: 'Posting offline...',
                connectionCount: 0,
                experiences: [],
                education: [],
                skills: [],
                certificates: [],
              },
              content,
              mediaUrls,
              likesCount: 0,
              commentsCount: 0,
              repostsCount: 0,
              isLiked: false,
              isReposted: false,
              isSaved: false,
              createdAt: new Date().toISOString(),
            };

            state.posts.unshift(tempPost);
            state.offlineQueue.push({
              id: tempPost.id,
              type: 'CREATE_POST',
              payload: { content, mediaUrls },
              createdAt: new Date().toISOString(),
            });
          })
        ),

      toggleLikePost: (postId) =>
        set(
          produce((state: FeedSlice) => {
            const post = state.posts.find((p) => p.id === postId);
            if (post) {
              post.isLiked = !post.isLiked;
              post.likesCount += post.isLiked ? 1 : -1;

              state.offlineQueue.push({
                id: `like_${postId}_${Date.now()}`,
                type: 'LIKE_POST',
                payload: { postId },
                createdAt: new Date().toISOString(),
              });
            }
          })
        ),

      addOfflineComment: (postId, content) =>
        set(
          produce((state: FeedSlice) => {
            const post = state.posts.find((p) => p.id === postId);
            if (post) {
              post.commentsCount += 1;
              state.offlineQueue.push({
                id: `comment_${postId}_${Date.now()}`,
                type: 'COMMENT',
                payload: { postId, content },
                createdAt: new Date().toISOString(),
              });
            }
          })
        ),

      syncOfflineQueue: async () => {
        const { offlineQueue, isSyncing } = get();
        if (isSyncing || offlineQueue.length === 0) return;

        set({ isSyncing: true });

        const remainingQueue: OfflineAction[] = [];

        for (const action of offlineQueue) {
          try {
            if (action.type === 'CREATE_POST') {
              await feedApi.createPost(action.payload);
            } else if (action.type === 'LIKE_POST') {
              await feedApi.likePost(action.payload.postId);
            } else if (action.type === 'COMMENT') {
              await feedApi.commentOnPost(action.payload);
            }
          } catch (err) {
            console.error(`[BackgroundSync] Failed to sync action ${action.id}:`, err);
            remainingQueue.push(action);
          }
        }

        set(
          produce((state: FeedSlice) => {
            state.offlineQueue = remainingQueue;
            state.isSyncing = false;
          })
        );
      },

      clearOfflineQueue: () =>
        set(
          produce((state: FeedSlice) => {
            state.offlineQueue = [];
          })
        ),
    }),
    {
      name: STORAGE_KEYS.FEED_STORE || 'feed-store',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
