export const haptics = {
  light: () => window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light'),
  medium: () => window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium'),
  heavy: () => window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('heavy'),
  success: () => window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success'),
  warning: () => window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('warning'),
  error: () => window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('error'),
};
