import { useAuthStore } from '../src/stores/auth.store';
import { createTheme } from '../src/theme';

describe('LinkedIn Application Bootstrap Test', () => {
  it('should initialize auth store and theme provider cleanly', () => {
    const authState = useAuthStore.getState();
    expect(authState.isAuthenticated).toBe(false);

    const theme = createTheme('light', false);
    expect(theme.colors.primary).toBe('#0A66C2');
  });
});
