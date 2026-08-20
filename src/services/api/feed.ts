import { apiClient } from './axios';
import { ApiResponse, PaginatedResponse } from './types';
import { Comment, CreatePostPayload, Post } from '../../types/feed.types';

export interface CommentPayload {
  postId: string;
  content: string;
}

export const feedApi = {
  getFeed: async (page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<Post>>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Post>>>('/feed', {
      params: { page, limit },
    });
    return response.data;
  },

  createPost: async (payload: CreatePostPayload): Promise<ApiResponse<Post>> => {
    const response = await apiClient.post<ApiResponse<Post>>('/feed/posts', payload);
    return response.data;
  },

  editPost: async (postId: string, content: string): Promise<ApiResponse<Post>> => {
    const response = await apiClient.put<ApiResponse<Post>>(`/feed/posts/${postId}`, { content });
    return response.data;
  },

  deletePost: async (postId: string): Promise<ApiResponse<{ deleted: boolean }>> => {
    const response = await apiClient.delete<ApiResponse<{ deleted: boolean }>>(`/feed/posts/${postId}`);
    return response.data;
  },

  likePost: async (postId: string): Promise<ApiResponse<{ liked: boolean; likeCount: number }>> => {
    const response = await apiClient.post<ApiResponse<{ liked: boolean; likeCount: number }>>(
      `/feed/posts/${postId}/like`
    );
    return response.data;
  },

  commentOnPost: async (payload: CommentPayload): Promise<ApiResponse<Comment>> => {
    const response = await apiClient.post<ApiResponse<Comment>>(
      `/feed/posts/${payload.postId}/comments`,
      { content: payload.content }
    );
    return response.data;
  },

  repost: async (postId: string, commentary?: string): Promise<ApiResponse<Post>> => {
    const response = await apiClient.post<ApiResponse<Post>>(`/feed/posts/${postId}/repost`, { commentary });
    return response.data;
  },
};
