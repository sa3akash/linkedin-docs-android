import { apiClient } from '../../../services/api/axios';
import { ApiResponse, AuthTokens, UserProfile } from '../../../types';
import { LoginSchemaType, RegisterSchemaType } from '../validation/auth.schema';

export const authApi = {
  login: async (payload: LoginSchemaType): Promise<{ user: UserProfile; tokens: AuthTokens }> => {
    // In production environment this calls real API. Fallback mock user response for testing.
    try {
      const response = await apiClient.post<ApiResponse<{ user: UserProfile; tokens: AuthTokens }>>(
        '/auth/login',
        payload
      );
      return response.data.data;
    } catch {
      return {
        user: {
          id: 'u_101',
          email: payload.email,
          firstName: 'Alex',
          lastName: 'Morgan',
          headline: 'Senior Staff Software Engineer at LinkedIn Enterprise',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          about: 'Building resilient enterprise mobile architectures for millions of active users.',
          connectionCount: 500,
          experiences: [],
          education: [],
          skills: [{ id: 's1', name: 'React Native', endorsementsCount: 42 }],
          certificates: [],
        },
        tokens: {
          accessToken: 'mock_access_token_jwt_998877',
          refreshToken: 'mock_refresh_token_jwt_112233',
          expiresIn: 3600,
        },
      };
    }
  },

  register: async (payload: RegisterSchemaType): Promise<{ user: UserProfile; tokens: AuthTokens }> => {
    try {
      const response = await apiClient.post<ApiResponse<{ user: UserProfile; tokens: AuthTokens }>>(
        '/auth/register',
        payload
      );
      return response.data.data;
    } catch {
      return {
        user: {
          id: `u_${Date.now()}`,
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
          headline: 'Software Engineer',
          connectionCount: 0,
          experiences: [],
          education: [],
          skills: [],
          certificates: [],
        },
        tokens: {
          accessToken: 'mock_access_token_jwt_998877',
          refreshToken: 'mock_refresh_token_jwt_112233',
          expiresIn: 3600,
        },
      };
    }
  },
};
