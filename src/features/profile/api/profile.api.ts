import { UserProfile } from '../../../types';

export const profileApi = {
  getUserProfile: async (userId?: string): Promise<UserProfile> => {
    return {
      id: userId || 'u_101',
      email: 'alex.morgan@linkedin.com',
      firstName: 'Alex',
      lastName: 'Morgan',
      headline: 'Senior Staff Software Engineer at LinkedIn Enterprise',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      about: 'Designing resilient enterprise React Native software architectures scaling to millions of active mobile sessions worldwide.',
      location: 'San Francisco Bay Area',
      connectionCount: 1420,
      experiences: [
        {
          id: 'exp_1',
          title: 'Senior Staff Mobile Architect',
          companyName: 'LinkedIn',
          startDate: '2022',
          isCurrentRole: true,
          description: 'Leading global React Native CLI architectural standards and core design systems.',
        },
      ],
      education: [
        {
          id: 'edu_1',
          schoolName: 'Stanford University',
          degree: 'Master of Science',
          fieldOfStudy: 'Computer Science',
          startDate: '2016',
          endDate: '2018',
        },
      ],
      skills: [
        { id: 's_1', name: 'React Native CLI', endorsementsCount: 94 },
        { id: 's_2', name: 'TypeScript Strict Architecture', endorsementsCount: 88 },
        { id: 's_3', name: 'Zustand & State Management', endorsementsCount: 76 },
      ],
      certificates: [
        {
          id: 'cert_1',
          title: 'AWS Certified Solutions Architect - Professional',
          issuingOrganization: 'Amazon Web Services',
          issueDate: '2023',
        },
      ],
    };
  },
};
