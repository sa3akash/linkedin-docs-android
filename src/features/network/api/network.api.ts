import { UserProfile } from '../../../types';

export const networkApi = {
  getRecommendations: async (): Promise<UserProfile[]> => {
    return [
      {
        id: 'u_601',
        email: 'jessica.taylor@uber.com',
        firstName: 'Jessica',
        lastName: 'Taylor',
        headline: 'Director of Product Design at Uber',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        connectionCount: 3400,
        experiences: [],
        education: [],
        skills: [],
        certificates: [],
      },
      {
        id: 'u_602',
        email: 'marcus.vance@stripe.com',
        firstName: 'Marcus',
        lastName: 'Vance',
        headline: 'Staff Infrastructure Architect at Stripe',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        connectionCount: 1890,
        experiences: [],
        education: [],
        skills: [],
        certificates: [],
      },
    ];
  },
};
