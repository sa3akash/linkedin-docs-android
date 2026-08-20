import { apiClient } from './axios';
import { ApiResponse, PaginatedResponse } from './types';
import { UserProfile } from '../../types/user.types';

export const networkApi = {
  getConnections: async (page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<UserProfile>>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<UserProfile>>>('/network/connections', {
      params: { page, limit },
    });
    return response.data;
  },

  sendConnectionRequest: async (targetUserId: string): Promise<ApiResponse<{ sent: boolean }>> => {
    const response = await apiClient.post<ApiResponse<{ sent: boolean }>>(`/network/connect/${targetUserId}`);
    return response.data;
  },

  acceptConnectionRequest: async (requestId: string): Promise<ApiResponse<{ accepted: boolean }>> => {
    const response = await apiClient.post<ApiResponse<{ accepted: boolean }>>(
      `/network/requests/${requestId}/accept`
    );
    return response.data;
  },

  followUser: async (targetUserId: string): Promise<ApiResponse<{ following: boolean }>> => {
    const response = await apiClient.post<ApiResponse<{ following: boolean }>>(`/network/follow/${targetUserId}`);
    return response.data;
  },
};
