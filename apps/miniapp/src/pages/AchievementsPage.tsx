import { useState } from 'react';
import { Lock, Check, Sparkles } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useTranslation, useTelegram } from '../hooks';
import { Card, Badge, ProgressRing } from '../components/ui';
import { mockAchievements } from '../utils/mockData';
import type { Achievement } from '../types';

type AchievementCategory = 'all' | 'beginner' | 'consistency' | 'posture' | 'exercise' | 'social' | 'special';

export function AchievementsPage() {
  const { t } = useTranslation();
  const { haptic } = useTelegram();
  const { achievements } = useAppStore();
  
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>('all');
  const [showUnlocked, setShowUnlocked] = useState<string | null>(null);

  const categories: { id: AchievementCategory; emoji: string; labelKey: string }[] = [
    { id: 'all', emoji: '🏆', labelKey: 'achievements.categories.all' },
    { id: 'beginner', emoji: '🌱', labelKey: 'achievements.categories.beginner' },
    { id: 'consistency', emoji: '🔥', labelKey: 'achievements.categories.consistency' },
    { id: 'posture', emoji: '🎯', labelKey: 'achievements.categories.posture' },
    { id: 'exercise', emoji: '💪', labelKey: 'achievements.categories.exercise' },
    { id: 'special', emoji: '✨', labelKey: 'achievements.categories.special' },
  ];

  const filteredAchievements = selectedCategory === 'all'
    ? mockAchievements
    : mockAchievements.filter((a: Achievement) => a.category === selectedCategory);

  const unlockedCount = achievements.filter((a: Achievement) => a.unlocked).length;
  const totalXpEarned = achievements
    .filter((a: Achievement) => a.unlocked)
    .reduce((sum: number, a: Achievement) => sum + a.xpReward, 0);

  const getAchievementProgress = (achievementId: string) => {
    const achievement = achievements.find((a: Achievement) => a.id === achievementId);
    return achievement?.progress || 0;
  };

  const isUnlocked = (achievementId: string) => {
    return achievements.find((a: Achievement) => a.id === achievementId)?.unlocked || false;
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-800 dark:text-white mb-1">
          {t('achievements.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t('achievements.subtitle')}
        </p>
      </div>

      {/* Summary Card */}
      <Card elevated className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ProgressRing
              progress={(unlockedCount / mockAchievements.length) * 100}
              size={70}
              strokeWidth={6}
              color="#8b5cf6"
            >
              <span className="text-lg font-bold text-slate-800 dark:text-white">
                {unlockedCount}
              </span>
            </ProgressRing>
            <div>
              <p className="font-semibold text-slate-800 dark:text-white">
                {unlockedCount} / {mockAchievements.length}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t('achievements.unlocked')}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-amber-600 dark:text-amber-400">
              +{totalXpEarned} XP
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('achievements.earned')}
            </p>
          </div>
        </div>
      </Card>

      {/* Category Filter */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-2 min-w-max pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                haptic('light');
                setSelectedCategory(cat.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{t(cat.labelKey)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredAchievements.map((achievement: Achievement, i: number) => {
          const unlocked = isUnlocked(achievement.id);
          const progress = getAchievementProgress(achievement.id);
          
          return (
            <Card
              key={achievement.id}
              className={`p-4 text-center transition-all animate-scale-in ${
                unlocked 
                  ? 'bg-gradient-to-br from-purple-50 to-amber-50 dark:from-purple-900/20 dark:to-amber-900/20 border-purple-200 dark:border-purple-800' 
                  : 'opacity-75'
              }`}
              style={{ animationDelay: `${i * 50}ms` } as React.CSSProperties}
              onClick={() => {
                haptic('light');
                setShowUnlocked(showUnlocked === achievement.id ? null : achievement.id);
              }}
            >
              {/* Badge */}
              <div className={`relative w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center ${
                unlocked 
                  ? 'bg-gradient-to-br from-purple-400 to-amber-400 shadow-lg shadow-purple-200 dark:shadow-purple-900' 
                  : 'bg-slate-200 dark:bg-slate-700'
              }`}>
                {unlocked ? (
                  <>
                    <span className="text-3xl">{achievement.icon}</span>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </>
                ) : (
                  <Lock className="w-6 h-6 text-slate-400" />
                )}
              </div>

              {/* Title */}
              <h3 className={`font-semibold text-sm mb-1 ${
                unlocked 
                  ? 'text-slate-800 dark:text-white' 
                  : 'text-slate-500 dark:text-slate-400'
              }`}>
                {t(`achievements.list.${achievement.id}.name`)}
              </h3>

              {/* Progress or XP */}
              {unlocked ? (
                <Badge variant="warning" className="text-xs">
                  +{achievement.xpReward} XP
                </Badge>
              ) : (
                <div className="mt-2">
                  <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-1">
                    <div 
                      className="h-full bg-purple-400 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400">
                    {Math.round(progress)}%
                  </p>
                </div>
              )}

              {/* Expanded description */}
              {showUnlocked === achievement.id && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 animate-fade-in">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t(`achievements.list.${achievement.id}.description`)}
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Near completion section */}
      <div>
        <h3 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          {t('achievements.almostThere')}
        </h3>
        <div className="space-y-3">
          {mockAchievements
            .filter((a: Achievement) => !isUnlocked(a.id) && getAchievementProgress(a.id) >= 50)
            .slice(0, 3)
            .map((achievement: Achievement) => {
              const progress = getAchievementProgress(achievement.id);
              
              return (
                <Card key={achievement.id} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 flex items-center justify-center">
                    <span className="text-2xl opacity-50">{achievement.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-slate-800 dark:text-white text-sm">
                        {t(`achievements.list.${achievement.id}.name`)}
                      </h4>
                      <span className="text-xs text-amber-600 dark:text-amber-400">
                        +{achievement.xpReward} XP
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-400 to-amber-400 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {Math.round(progress)}% {t('achievements.complete')}
                    </p>
                  </div>
                </Card>
              );
            })}
          
          {mockAchievements.filter((a: Achievement) => !isUnlocked(a.id) && getAchievementProgress(a.id) >= 50).length === 0 && (
            <Card className="text-center py-8">
              <span className="text-4xl mb-3 block">🎯</span>
              <p className="text-slate-500 dark:text-slate-400">
                {t('achievements.keepGoing')}
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Rarity legend */}
      <Card className="p-3">
        <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
          {t('achievements.rarity')}
        </h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">{t('achievements.rarities.common')}</Badge>
          <Badge variant="info">{t('achievements.rarities.uncommon')}</Badge>
          <Badge variant="success">{t('achievements.rarities.rare')}</Badge>
          <Badge variant="warning">{t('achievements.rarities.epic')}</Badge>
          <Badge variant="error">{t('achievements.rarities.legendary')}</Badge>
        </div>
      </Card>
    </div>
  );
}
