export const scaleAnimation = {
  scaleUp: {
    from: { transform: [{ scale: 0.8 }], opacity: 0 },
    to: { transform: [{ scale: 1 }], opacity: 1 },
    duration: 250,
  },
  scaleDown: {
    from: { transform: [{ scale: 1 }], opacity: 1 },
    to: { transform: [{ scale: 0.8 }], opacity: 0 },
    duration: 250,
  },
};
