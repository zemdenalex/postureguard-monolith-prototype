import { useState } from 'react';
import { 
  TrendingUp, Flame, Target, Clock, 
  ChevronLeft, ChevronRight, Award 
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../hooks';
import { Card, Badge, ProgressRing } from '../components/ui';
import { generateMockWeeklyStats } from '../utils/mockData';

type ViewMode = 'daily' | 'weekly' | 'monthly';

export function ProgressPage() {
  const { t } = useTranslation();
  const { user, dailyStats } = useAppStore();
  const [viewMode, setViewMode] = useState<ViewMode>('weekly');
  const [weekOffset, setWeekOffset] = useState(0);

  // Generate mock weekly data
  const weeklyData = generateMockWeeklyStats();
  
  const today = new Date().toISOString().split('T')[0];
  const todayStats = dailyStats[today];
  const dailyGoal = user?.settings.dailyGoalMinutes || 60;

  // Week navigation
  const currentWeek = new Date();
  currentWeek.setDate(currentWeek.getDate() - weekOffset * 7);
  const weekStart = new Date(currentWeek);
  weekStart.setDate(currentWeek.getDate() - currentWeek.getDay() + 1);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const formatWeekRange = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${weekStart.toLocaleDateString('ru', options)} - ${weekEnd.toLocaleDateString('ru', options)}`;
  };

  // Days of week for chart
  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-800 dark:text-white mb-1">
          {t('progress.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t('progress.subtitle')}
        </p>
      </div>

      {/* View Mode Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
        {(['daily', 'weekly', 'monthly'] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              viewMode === mode
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {t(`progress.${mode}`)}
          </button>
        ))}
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setWeekOffset(weekOffset + 1)}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
        <span className="font-medium text-slate-700 dark:text-slate-200">
          {formatWeekRange()}
        </span>
        <button 
          onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
          className={`p-2 rounded-lg ${weekOffset === 0 ? 'opacity-50' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          disabled={weekOffset === 0}
        >
          <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
      </div>

      {/* Weekly Chart */}
      <Card elevated className="p-4">
        <h3 className="font-semibold text-slate-800 dark:text-white mb-4">
          {t('progress.weeklyChart')}
        </h3>
        
        {/* Bar Chart */}
        <div className="flex items-end justify-between h-40 mb-4">
          {weeklyData.map((day, i) => {
            const heightPercent = Math.min((day.minutes / dailyGoal) * 100, 100);
            const isToday = i === new Date().getDay() - 1;
            
            return (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className="relative w-full max-w-[32px] h-32 flex items-end justify-center">
                  {/* Background bar */}
                  <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-t-lg" />
                  
                  {/* Progress bar */}
                  <div 
                    className={`relative w-full rounded-t-lg transition-all duration-500 ${
                      day.score >= 80 ? 'bg-posture-good' :
                      day.score >= 50 ? 'bg-posture-attention' : 'bg-posture-poor'
                    } ${isToday ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-slate-900' : ''}`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                
                {/* Day label */}
                <p className={`text-xs mt-2 ${
                  isToday 
                    ? 'font-bold text-primary-600 dark:text-primary-400' 
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {daysOfWeek[i]}
                </p>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-posture-good" />
            <span className="text-slate-500 dark:text-slate-400">&gt;80%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-posture-attention" />
            <span className="text-slate-500 dark:text-slate-400">50-80%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-posture-poor" />
            <span className="text-slate-500 dark:text-slate-400">&lt;50%</span>
          </div>
        </div>
      </Card>

      {/* Weekly Summary Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="text-center p-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-2">
            <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            {weeklyData.reduce((sum, d) => sum + d.minutes, 0)}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('progress.totalMinutes')}
          </p>
        </Card>

        <Card className="text-center p-4">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            {Math.round(weeklyData.reduce((sum, d) => sum + d.score, 0) / 7)}%
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('progress.avgScore')}
          </p>
        </Card>

        <Card className="text-center p-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-2">
            <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            {user?.stats.currentStreak || 0}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('progress.currentStreak')}
          </p>
        </Card>

        <Card className="text-center p-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-2">
            <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            {weeklyData.filter(d => d.minutes >= dailyGoal).length}/7
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('progress.goalsAchieved')}
          </p>
        </Card>
      </div>

      {/* Streak Card */}
      <Card elevated className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <ProgressRing
              progress={Math.min(((user?.stats.currentStreak || 0) / 7) * 100, 100)}
              size={80}
              strokeWidth={8}
              color="#f59e0b"
            >
              <span className="text-2xl">🔥</span>
            </ProgressRing>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-1">
              {t('progress.streakTitle')}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
              {t('progress.streakDescription', { days: user?.stats.currentStreak || 0 })}
            </p>
            <div className="flex items-center gap-1">
              <Badge variant="warning">
                {t('progress.bestStreak')}: {user?.stats.longestStreak || 0}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Today's Summary */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-800 dark:text-white">
            {t('progress.today')}
          </h3>
          <Badge variant={todayStats?.totalMinutes >= dailyGoal ? 'success' : 'default'}>
            {todayStats?.totalMinutes >= dailyGoal ? '✓ ' : ''}{t('progress.dailyGoal')}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-300">
              {t('progress.sessionsToday')}
            </span>
            <span className="font-medium text-slate-800 dark:text-white">
              {todayStats?.sessions || 0}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-300">
              {t('progress.minutesToday')}
            </span>
            <span className="font-medium text-slate-800 dark:text-white">
              {todayStats?.totalMinutes || 0} / {dailyGoal}
            </span>
          </div>
          
          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all"
              style={{ width: `${Math.min(((todayStats?.totalMinutes || 0) / dailyGoal) * 100, 100)}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-300">
              {t('progress.avgScoreToday')}
            </span>
            <span className="font-medium text-slate-800 dark:text-white">
              {todayStats?.averageScore || 0}%
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-300">
              {t('progress.exercisesToday')}
            </span>
            <span className="font-medium text-slate-800 dark:text-white">
              {todayStats?.exercisesCompleted || 0}
            </span>
          </div>
        </div>
      </Card>

      {/* Achievements Preview */}
      <Card 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => {}}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="font-medium text-slate-800 dark:text-white">
              {t('progress.achievementsEarned')}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {user?.stats.totalAchievements || 0} / 12 {t('progress.unlocked')}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </Card>
    </div>
  );
}
