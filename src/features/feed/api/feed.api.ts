import { apiClient } from '../../../services/api/axios';
import { ApiResponse, PaginatedResponse, Post, Comment } from '../../../types';

export const feedApi = {
  getFeedPosts: async (page = 1, limit = 10): Promise<PaginatedResponse<Post>> => {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Post>>>(
        `/feed?page=${page}&limit=${limit}`
      );
      return response.data.data;
    } catch {
      // Mock feed data for enterprise demonstration
      const mockPosts: Post[] = [
        {
          id: 'p_1',
          author: {
            id: 'u_201',
            email: 'sarah.chen@google.com',
            firstName: 'Sarah',
            lastName: 'Chen',
            headline: 'Staff AI Researcher at Google DeepMind',
            avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
            connectionCount: 1250,
            experiences: [],
            education: [],
            skills: [],
            certificates: [],
          },
          content: 'Excited to announce our new breakthrough in mobile AI agent capabilities! React Native architecture at scale enables stunning cross-platform user experiences.',
          mediaUrls: ['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'],
          likesCount: 342,
          commentsCount: 28,
          repostsCount: 14,
          isLiked: false,
          isReposted: false,
          isSaved: false,
          createdAt: '2h ago',
        },
        {
          id: 'p_2',
          author: {
            id: 'u_202',
            email: 'david.miller@microsoft.com',
            firstName: 'David',
            lastName: 'Miller',
            headline: 'VP of Engineering at Microsoft Azure',
            avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
            connectionCount: 4500,
            experiences: [],
            education: [],
            skills: [],
            certificates: [],
          },
          content: 'We are hiring Senior React Native Core Developers! Join our cloud mobile client performance engineering team working on high-impact products.',
          likesCount: 890,
          commentsCount: 104,
          repostsCount: 52,
          isLiked: true,
          isReposted: false,
          isSaved: true,
          createdAt: '5h ago',
        },
      ];

      return {
        items: mockPosts,
        page,
        pageSize: limit,
        totalPages: 5,
        totalItems: 50,
        hasNextPage: page < 5,
      };
    }
  },

  createPost: async (content: string, mediaUrls?: string[]): Promise<Post> => {
    try {
      const response = await apiClient.post<ApiResponse<Post>>('/feed/posts', {
        content,
        mediaUrls,
      });
      return response.data.data;
    } catch {
      return {
        id: `p_${Date.now()}`,
        author: {
          id: 'u_101',
          email: 'alex.morgan@linkedin.com',
          firstName: 'Alex',
          lastName: 'Morgan',
          headline: 'Senior Staff Software Engineer',
          connectionCount: 500,
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
        createdAt: 'Just now',
      };
    }
  },

  getPostComments: async (postId: string): Promise<Comment[]> => {
    return [
      {
        id: 'c_1',
        postId,
        author: {
          id: 'u_301',
          email: 'user@meta.com',
          firstName: 'Elena',
          lastName: 'Rostova',
          headline: 'Senior Product Manager',
          connectionCount: 300,
          experiences: [],
          education: [],
          skills: [],
          certificates: [],
        },
        content: 'Incredible achievement! Looking forward to testing this performance optimization in production.',
        createdAt: '30m ago',
        likesCount: 12,
        isLiked: false,
      },
    ];
  },
};
