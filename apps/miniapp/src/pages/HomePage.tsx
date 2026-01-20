import { 
  Play, Pause, Clock, Flame, Target, Activity, 
  Bluetooth, Battery, 
  Lightbulb, ChevronRight 
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { 
  useTranslation, 
  useGreeting, 
  useDailyTip, 
  usePostureSimulation, 
  useSessionTimer,
  formatTime 
} from '../hooks';
import { Card, Button, ProgressRing, PostureIndicator, Badge } from '../components/ui';

export function HomePage() {
  const { t } = useTranslation();
  const greeting = useGreeting();
  const dailyTip = useDailyTip();
  
  const { 
    user, 
    device, 
    currentPosture, 
    isTracking, 
    currentSession,
    dailyStats,
    startSession, 
    endSession,
    setActiveTab,
  } = useAppStore();

  // Enable posture simulation and session timer
  usePostureSimulation();
  useSessionTimer();

  const today = new Date().toISOString().split('T')[0];
  const todayStats = dailyStats[today];
  const dailyGoal = user?.settings.dailyGoalMinutes || 60;
  const todayMinutes = todayStats?.totalMinutes || 0;
  const goalProgress = Math.min((todayMinutes / dailyGoal) * 100, 100);

  const handleToggleSession = () => {
    if (isTracking) {
      endSession();
    } else {
      startSession();
    }
  };

  const getPostureLabel = () => {
    switch (currentPosture) {
      case 'good': return t('home.posture.good');
      case 'attention': return t('home.posture.attention');
      case 'poor': return t('home.posture.poor');
    }
  };

  const getPostureColor = () => {
    switch (currentPosture) {
      case 'good': return '#22c55e';
      case 'attention': return '#f59e0b';
      case 'poor': return '#ef4444';
    }
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{greeting},</p>
          <h1 className="text-2xl font-display font-bold text-slate-800 dark:text-white">
            {user?.name || 'User'} 👋
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={user?.stats.currentStreak ? 'warning' : 'default'}>
            🔥 {user?.stats.currentStreak || 0}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <span className="font-bold text-primary-600 dark:text-primary-400">
              {t('common.level')} {user?.level || 1}
            </span>
          </div>
        </div>
      </div>

      {/* Main Posture Card */}
      <Card elevated className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            {t('home.posture.title')}
          </h2>
          <Badge variant={isTracking ? 'success' : 'default'}>
            {isTracking ? t('home.posture.tracking') : t('home.posture.notTracking')}
          </Badge>
        </div>

        <div className="flex items-center justify-center mb-6">
          <ProgressRing
            progress={currentSession?.postureScore || (isTracking ? 100 : 0)}
            size={160}
            strokeWidth={12}
            color={getPostureColor()}
          >
            <div className="text-center">
              {isTracking ? (
                <>
                  <PostureIndicator status={currentPosture} size="lg" />
                  <p className="text-2xl font-bold mt-2 text-slate-800 dark:text-white">
                    {currentSession?.postureScore || 100}%
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {getPostureLabel()}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-4xl mb-1">🧘</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t('home.posture.startSession')}
                  </p>
                </>
              )}
            </div>
          </ProgressRing>
        </div>

        {/* Session info */}
        {isTracking && currentSession && (
          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('home.session.duration')}</p>
              <p className="text-lg font-bold text-slate-800 dark:text-white">
                {formatTime(currentSession.duration)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('home.session.score')}</p>
              <p className="text-lg font-bold text-slate-800 dark:text-white">
                {currentSession.postureScore}%
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('home.session.goodTime')}</p>
              <p className="text-lg font-bold text-posture-good">
                {formatTime(currentSession.goodPostureTime)}
              </p>
            </div>
          </div>
        )}

        <Button 
          onClick={handleToggleSession} 
          fullWidth 
          variant={isTracking ? 'secondary' : 'primary'}
        >
          {isTracking ? (
            <>
              <Pause className="mr-2 inline" size={18} />
              {t('home.posture.endSession')}
            </>
          ) : (
            <>
              <Play className="mr-2 inline" size={18} />
              {t('home.posture.startSession')}
            </>
          )}
        </Button>
      </Card>

      {/* Daily Goal Progress */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-800 dark:text-white">
            {t('progress.dailyGoal')}
          </h3>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {todayMinutes}/{dailyGoal} {t('common.minutes')}
          </span>
        </div>
        
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500"
            style={{ width: `${goalProgress}%` }}
          />
        </div>
        
        <p className="text-xs text-slate-500 dark:text-slate-400 text-right">
          {Math.round(goalProgress)}% {t('progress.completed')}
        </p>
      </Card>

      {/* Quick Stats */}
      <div>
        <h3 className="font-semibold text-slate-800 dark:text-white mb-3">
          {t('home.quickStats.title')}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Card className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('home.quickStats.minutes')}</p>
              <p className="text-lg font-bold text-slate-800 dark:text-white">{todayMinutes}</p>
            </div>
          </Card>
          
          <Card className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('home.quickStats.score')}</p>
              <p className="text-lg font-bold text-slate-800 dark:text-white">
                {todayStats?.averageScore || 0}%
              </p>
            </div>
          </Card>
          
          <Card className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('home.quickStats.streak')}</p>
              <p className="text-lg font-bold text-slate-800 dark:text-white">
                {user?.stats.currentStreak || 0}
              </p>
            </div>
          </Card>
          
          <Card className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('home.quickStats.exercises')}</p>
              <p className="text-lg font-bold text-slate-800 dark:text-white">
                {todayStats?.exercisesCompleted || 0}
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Device Status */}
      <Card 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setActiveTab('settings')}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            device.connected 
              ? 'bg-green-100 dark:bg-green-900/30' 
              : 'bg-slate-100 dark:bg-slate-800'
          }`}>
            <Bluetooth className={`w-5 h-5 ${
              device.connected 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-slate-400'
            }`} />
          </div>
          <div>
            <p className="font-medium text-slate-800 dark:text-white">
              {t('home.device.title')}
            </p>
            <p className={`text-sm ${
              device.connected 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-slate-400'
            }`}>
              {device.connected ? t('home.device.connected') : t('home.device.disconnected')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {device.connected && (
            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <Battery className="w-4 h-4" />
              {device.batteryLevel}%
            </div>
          )}
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </div>
      </Card>

      {/* Daily Tip */}
      <Card className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-200 dark:bg-primary-800 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <p className="font-medium text-primary-800 dark:text-primary-200 mb-1">
              {t('home.tip.title')}
            </p>
            <p className="text-sm text-primary-700 dark:text-primary-300">
              {dailyTip}
            </p>
          </div>
        </div>
      </Card>

      {/* XP Progress */}
      {user && (
        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {t('common.level')} {user.level}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {user.xp}/{user.xpToNextLevel} XP
            </span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${(user.xp / user.xpToNextLevel) * 100}%` }}
            />
          </div>
        </Card>
      )}
    </div>
  );
}
