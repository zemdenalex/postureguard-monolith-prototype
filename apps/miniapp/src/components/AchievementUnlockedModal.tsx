import { useTranslation } from '../hooks';
import { Button } from './ui';
import type { Achievement } from '../types';

interface AchievementUnlockedModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementUnlockedModal({ achievement, onClose }: AchievementUnlockedModalProps) {
  const { t } = useTranslation();

  if (!achievement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 mx-4 max-w-sm w-full animate-scale-in text-center shadow-2xl">
        {/* Confetti emojis */}
        <div className="absolute -top-4 -left-4 text-4xl animate-bounce">🎉</div>
        <div
          className="absolute -top-4 -right-4 text-4xl animate-bounce"
          style={{ animationDelay: '0.1s' }}
        >
          ✨
        </div>
        <div
          className="absolute -bottom-4 -left-4 text-4xl animate-bounce"
          style={{ animationDelay: '0.2s' }}
        >
          🏆
        </div>
        <div
          className="absolute -bottom-4 -right-4 text-4xl animate-bounce"
          style={{ animationDelay: '0.15s' }}
        >
          ⭐
        </div>

        {/* Badge */}
        <div className="text-xs uppercase tracking-wider text-amber-500 font-bold mb-2">
          {t('achievements.unlockedModal.badge')}
        </div>

        {/* Icon */}
        <div className="text-7xl mb-4 animate-pulse">{achievement.icon}</div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          {t(achievement.titleKey)}
        </h2>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-400 mb-4">
          {t(achievement.descriptionKey)}
        </p>

        {/* XP Reward */}
        <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-full font-bold text-lg mb-6 animate-pulse">
          +{achievement.xpReward} XP
        </div>

        {/* Button */}
        <Button onClick={onClose} fullWidth variant="primary">
          {t('achievements.unlockedModal.button')}
        </Button>
      </div>
    </div>
  );
}
