import { apiClient } from './axios';
import { ApiResponse } from './types';
import { UserEducation, UserExperience, UserProfile, UserSkill } from '../../types/user.types';

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  headline?: string;
  about?: string;
  avatarUrl?: string;
  bannerUrl?: string;
}

export const profileApi = {
  getProfile: async (userId?: string): Promise<ApiResponse<UserProfile>> => {
    const url = userId ? `/users/${userId}/profile` : '/users/me/profile';
    const response = await apiClient.get<ApiResponse<UserProfile>>(url);
    return response.data;
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<ApiResponse<UserProfile>> => {
    const response = await apiClient.patch<ApiResponse<UserProfile>>('/users/me/profile', payload);
    return response.data;
  },

  addExperience: async (exp: Omit<UserExperience, 'id'>): Promise<ApiResponse<UserExperience>> => {
    const response = await apiClient.post<ApiResponse<UserExperience>>('/users/me/experience', exp);
    return response.data;
  },

  addEducation: async (edu: Omit<UserEducation, 'id'>): Promise<ApiResponse<UserEducation>> => {
    const response = await apiClient.post<ApiResponse<UserEducation>>('/users/me/education', edu);
    return response.data;
  },

  addSkill: async (skillName: string): Promise<ApiResponse<UserSkill>> => {
    const response = await apiClient.post<ApiResponse<UserSkill>>('/users/me/skills', { name: skillName });
    return response.data;
  },
};
