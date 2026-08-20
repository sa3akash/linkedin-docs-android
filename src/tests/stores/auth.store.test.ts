import { useAuthStore } from '../../stores/auth.store';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('should initialize with logged out default state', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('should correctly set auth session and login state', () => {
    const mockUser = {
      id: 'u_test',
      email: 'test@linkedin.com',
      firstName: 'Test',
      lastName: 'User',
      headline: 'Engineer',
      connectionCount: 10,
      experiences: [],
      education: [],
      skills: [],
      certificates: [],
    };
    const mockTokens = {
      accessToken: 'access_123',
      refreshToken: 'refresh_123',
      expiresIn: 3600,
    };

    useAuthStore.getState().setAuthSession(mockUser, mockTokens);

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.email).toBe('test@linkedin.com');
  });

  it('should logout cleanly', () => {
    useAuthStore.getState().logout();
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
