export const slideAnimation = {
  slideInUp: {
    from: { transform: [{ translateY: 100 }], opacity: 0 },
    to: { transform: [{ translateY: 0 }], opacity: 1 },
    duration: 300,
  },
  slideInDown: {
    from: { transform: [{ translateY: -100 }], opacity: 0 },
    to: { transform: [{ translateY: 0 }], opacity: 1 },
    duration: 300,
  },
  slideInLeft: {
    from: { transform: [{ translateX: -100 }], opacity: 0 },
    to: { transform: [{ translateX: 0 }], opacity: 1 },
    duration: 300,
  },
  slideInRight: {
    from: { transform: [{ translateX: 100 }], opacity: 0 },
    to: { transform: [{ translateX: 0 }], opacity: 1 },
    duration: 300,
  },
};
