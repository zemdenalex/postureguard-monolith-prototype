import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  UserProfile,
  UserSettings,
  UserStats,
  DeviceState,
  PostureStatus,
  PostureSession,
  DailyStats,
  Achievement,
  Exercise,
  ExerciseSession,
} from '../types';
import { mockAchievements, mockExercises } from '../utils/mockData';
import { haptics } from '../utils/haptics';

// Default settings
const defaultSettings: UserSettings = {
  language: 'ru',
  theme: 'light',
  notifications: true,
  notificationsEnabled: true,
  postureAlerts: true,
  breakReminders: true,
  soundEnabled: true,
  hapticEnabled: true,
  reminderInterval: 30,
  workSessionDuration: 45,
  breakDuration: 5,
  dailyGoalMinutes: 60,
  debugMode: false,
};

const defaultStats: UserStats = {
  totalMinutesTracked: 0,
  totalSessions: 0,
  currentStreak: 0,
  longestStreak: 0,
  averagePostureScore: 0,
  exercisesCompleted: 0,
  totalAchievements: 0,
  completedExercises: [],
};

const defaultDevice: DeviceState = {
  connected: false,
  batteryLevel: 85,
  isCharging: false,
  firmwareVersion: '1.2.3',
  lastSyncTime: new Date(),
  calibrationStatus: 'not_calibrated',
  ledEnabled: true,
  ledBrightness: 70,
  sensitivity: 'medium',
};

// Calculate XP needed for each level
const calculateXpForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

interface AppState {
  // User
  user: UserProfile | null;
  isOnboarded: boolean;
  
  // Posture tracking
  currentPosture: PostureStatus;
  isTracking: boolean;
  currentSession: PostureSession | null;
  sessionHistory: PostureSession[];
  
  // Device
  device: DeviceState;
  
  // Stats
  dailyStats: Record<string, DailyStats>;
  
  // Achievements
  achievements: Achievement[];
  
  // Exercises
  exercises: Exercise[];
  exerciseHistory: ExerciseSession[];
  
  // UI state
  activeTab: string;
  showOnboarding: boolean;
  
  // Actions - User
  initUser: (telegramUser?: { id: number; first_name: string; last_name?: string; username?: string }) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  addXp: (amount: number) => void;
  
  // Actions - Posture
  setPosture: (status: PostureStatus) => void;
  startSession: () => void;
  endSession: () => void;
  updateSession: () => void;
  
  // Actions - Device
  connectDevice: () => void;
  disconnectDevice: () => void;
  updateDevice: (updates: Partial<DeviceState>) => void;
  calibrateDevice: () => Promise<boolean>;
  
  // Actions - Achievements
  unlockAchievement: (id: string) => void;
  checkAchievements: () => void;
  
  // Actions - Exercises
  completeExercise: (exerciseId: string) => void;
  
  // Actions - UI
  setActiveTab: (tab: string) => void;
  completeOnboarding: () => void;
  
  // Actions - Debug
  resetAll: () => void;
  setDebugPosture: (status: PostureStatus) => void;
  toggleDeviceConnection: () => void;
  addDebugXp: (amount: number) => void;
  unlockRandomAchievement: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isOnboarded: false,
      currentPosture: 'good',
      isTracking: false,
      currentSession: null,
      sessionHistory: [],
      device: defaultDevice,
      dailyStats: {},
      achievements: mockAchievements,
      exercises: mockExercises,
      exerciseHistory: [],
      activeTab: 'home',
      showOnboarding: true,

      // User actions
      initUser: (telegramUser) => {
        const existingUser = get().user;
        if (existingUser) return;

        const newUser: UserProfile = {
          id: crypto.randomUUID(),
          telegramId: telegramUser?.id || 0,
          name: telegramUser?.first_name || 'User',
          username: telegramUser?.username,
          createdAt: new Date(),
          settings: defaultSettings,
          stats: defaultStats,
          level: 1,
          xp: 0,
          xpToNextLevel: calculateXpForLevel(1),
        };
        set({ user: newUser });
      },

      updateSettings: (settings) => {
        const user = get().user;
        if (!user) return;
        set({
          user: {
            ...user,
            settings: { ...user.settings, ...settings },
          },
        });
      },

      addXp: (amount) => {
        const user = get().user;
        if (!user) return;

        let newXp = user.xp + amount;
        let newLevel = user.level;
        let xpToNext = user.xpToNextLevel;

        // Check for level up
        const startLevel = user.level;
        while (newXp >= xpToNext) {
          newXp -= xpToNext;
          newLevel++;
          xpToNext = calculateXpForLevel(newLevel);
        }

        // Haptic feedback on level up
        if (newLevel > startLevel && get().user?.settings.hapticEnabled) {
          haptics.success();
          haptics.medium();
        }

        set({
          user: {
            ...user,
            xp: newXp,
            level: newLevel,
            xpToNextLevel: xpToNext,
          },
        });

        // Check level achievements
        get().checkAchievements();
      },

      // Posture actions
      setPosture: (status) => {
        const prevStatus = get().currentPosture;
        set({ currentPosture: status });

        // Haptic feedback on status change
        if (status !== prevStatus && get().user?.settings.hapticEnabled) {
          if (status === 'good') haptics.success();
          else if (status === 'attention') haptics.warning();
          else if (status === 'poor') haptics.error();
        }

        if (get().isTracking) {
          get().updateSession();
        }
      },

      startSession: () => {
        if (get().user?.settings.hapticEnabled) {
          haptics.medium();
        }
        const session: PostureSession = {
          id: crypto.randomUUID(),
          startTime: new Date(),
          duration: 0,
          goodPostureTime: 0,
          attentionTime: 0,
          poorPostureTime: 0,
          postureScore: 100,
          xpEarned: 0,
        };
        set({ isTracking: true, currentSession: session });
      },

      endSession: () => {
        const session = get().currentSession;
        if (!session) return;

        const endedSession: PostureSession = {
          ...session,
          endTime: new Date(),
        };

        // Calculate XP based on score and duration
        const minutes = Math.floor(session.duration / 60);
        const xpEarned = Math.floor(minutes * (session.postureScore / 100) * 2);
        endedSession.xpEarned = xpEarned;

        // Update daily stats
        const today = new Date().toISOString().split('T')[0];
        const existingStats = get().dailyStats[today] || {
          date: today,
          totalMinutes: 0,
          sessions: 0,
          averageScore: 0,
          goodPosturePercent: 0,
          attentionPercent: 0,
          poorPosturePercent: 0,
          exercisesCompleted: 0,
          xpEarned: 0,
          goalReached: false,
        };

        const totalDuration = session.duration;
        const newTotalMinutes = existingStats.totalMinutes + Math.floor(totalDuration / 60);
        const newSessions = existingStats.sessions + 1;
        const newAvgScore = (existingStats.averageScore * existingStats.sessions + session.postureScore) / newSessions;

        const updatedStats: DailyStats = {
          ...existingStats,
          totalMinutes: newTotalMinutes,
          sessions: newSessions,
          averageScore: Math.round(newAvgScore),
          goodPosturePercent: totalDuration > 0 ? Math.round((session.goodPostureTime / totalDuration) * 100) : 0,
          attentionPercent: totalDuration > 0 ? Math.round((session.attentionTime / totalDuration) * 100) : 0,
          poorPosturePercent: totalDuration > 0 ? Math.round((session.poorPostureTime / totalDuration) * 100) : 0,
          xpEarned: existingStats.xpEarned + xpEarned,
          goalReached: newTotalMinutes >= (get().user?.settings.dailyGoalMinutes || 60),
        };

        set({
          isTracking: false,
          currentSession: null,
          sessionHistory: [...get().sessionHistory, endedSession],
          dailyStats: {
            ...get().dailyStats,
            [today]: updatedStats,
          },
        });

        // Add XP
        get().addXp(xpEarned);

        // Update user stats
        const user = get().user;
        if (user) {
          const newTotalMinutesTracked = user.stats.totalMinutesTracked + Math.floor(totalDuration / 60);
          const newTotalSessions = user.stats.totalSessions + 1;
          const newAvgPostureScore = (user.stats.averagePostureScore * (newTotalSessions - 1) + session.postureScore) / newTotalSessions;

          set({
            user: {
              ...user,
              stats: {
                ...user.stats,
                totalMinutesTracked: newTotalMinutesTracked,
                totalSessions: newTotalSessions,
                averagePostureScore: Math.round(newAvgPostureScore),
              },
            },
          });
        }

        // Check achievements
        get().checkAchievements();

        if (get().user?.settings.hapticEnabled) {
          haptics.success();
        }
      },

      updateSession: () => {
        const session = get().currentSession;
        const posture = get().currentPosture;
        if (!session) return;

        const now = new Date();
        const elapsedSeconds = Math.floor((now.getTime() - new Date(session.startTime).getTime()) / 1000);
        
        // Increment time counters based on current posture
        const increment = 1; // 1 second
        let goodTime = session.goodPostureTime;
        let attentionTime = session.attentionTime;
        let poorTime = session.poorPostureTime;

        switch (posture) {
          case 'good':
            goodTime += increment;
            break;
          case 'attention':
            attentionTime += increment;
            break;
          case 'poor':
            poorTime += increment;
            break;
        }

        const totalTime = goodTime + attentionTime + poorTime;
        const score = totalTime > 0
          ? Math.round((goodTime * 100 + attentionTime * 50) / totalTime)
          : 100;

        set({
          currentSession: {
            ...session,
            duration: elapsedSeconds,
            goodPostureTime: goodTime,
            attentionTime: attentionTime,
            poorPostureTime: poorTime,
            postureScore: score,
          },
        });
      },

      // Device actions
      connectDevice: () => {
        set({
          device: {
            ...get().device,
            connected: true,
            lastSyncTime: new Date(),
          },
        });
        get().checkAchievements();
      },

      disconnectDevice: () => {
        set({
          device: {
            ...get().device,
            connected: false,
          },
        });
      },

      updateDevice: (updates) => {
        set({
          device: {
            ...get().device,
            ...updates,
          },
        });
      },

      calibrateDevice: async () => {
        set({
          device: {
            ...get().device,
            calibrationStatus: 'calibrating',
          },
        });

        // Simulate calibration
        await new Promise((resolve) => setTimeout(resolve, 3000));

        set({
          device: {
            ...get().device,
            calibrationStatus: 'calibrated',
          },
        });

        return true;
      },

      // Achievement actions
      unlockAchievement: (id) => {
        const achievements = get().achievements;
        const achievement = achievements.find((a) => a.id === id);
        if (!achievement || achievement.unlocked) return;

        const updatedAchievements = achievements.map((a) =>
          a.id === id
            ? { ...a, unlocked: true, unlockedAt: new Date(), progress: a.maxProgress }
            : a
        );

        set({ achievements: updatedAchievements });

        if (get().user?.settings.hapticEnabled) {
          haptics.success();
        }

        get().addXp(achievement.xpReward);
      },

      checkAchievements: () => {
        const { user, device, sessionHistory, exerciseHistory, achievements } = get();
        if (!user) return;

        const updates: string[] = [];

        // First session
        if (sessionHistory.length >= 1 && !achievements.find((a) => a.id === 'first_session')?.unlocked) {
          updates.push('first_session');
        }

        // First exercise
        if (exerciseHistory.length >= 1 && !achievements.find((a) => a.id === 'first_exercise')?.unlocked) {
          updates.push('first_exercise');
        }

        // Device connected
        if (device.connected && !achievements.find((a) => a.id === 'connected')?.unlocked) {
          updates.push('connected');
        }

        // Streak achievements
        if (user.stats.currentStreak >= 3 && !achievements.find((a) => a.id === 'streak_3')?.unlocked) {
          updates.push('streak_3');
        }
        if (user.stats.currentStreak >= 7 && !achievements.find((a) => a.id === 'streak_7')?.unlocked) {
          updates.push('streak_7');
        }
        if (user.stats.currentStreak >= 30 && !achievements.find((a) => a.id === 'streak_30')?.unlocked) {
          updates.push('streak_30');
        }

        // Level achievements
        if (user.level >= 5 && !achievements.find((a) => a.id === 'level_5')?.unlocked) {
          updates.push('level_5');
        }
        if (user.level >= 10 && !achievements.find((a) => a.id === 'level_10')?.unlocked) {
          updates.push('level_10');
        }

        updates.forEach((id) => get().unlockAchievement(id));
      },

      // Exercise actions
      completeExercise: (exerciseId) => {
        const exercise = get().exercises.find((e) => e.id === exerciseId);
        if (!exercise) return;

        const session: ExerciseSession = {
          exerciseId,
          completedAt: new Date(),
          xpEarned: exercise.xpReward,
        };

        set({
          exerciseHistory: [...get().exerciseHistory, session],
        });

        // Update user stats
        const user = get().user;
        if (user) {
          set({
            user: {
              ...user,
              stats: {
                ...user.stats,
                exercisesCompleted: user.stats.exercisesCompleted + 1,
              },
            },
          });
        }

        // Update daily stats
        const today = new Date().toISOString().split('T')[0];
        const existingStats = get().dailyStats[today];
        if (existingStats) {
          set({
            dailyStats: {
              ...get().dailyStats,
              [today]: {
                ...existingStats,
                exercisesCompleted: existingStats.exercisesCompleted + 1,
              },
            },
          });
        }

        get().addXp(exercise.xpReward);
        get().checkAchievements();
      },

      // UI actions
      setActiveTab: (tab) => set({ activeTab: tab }),

      completeOnboarding: () => {
        set({ isOnboarded: true, showOnboarding: false });
        get().checkAchievements();
      },

      // Debug actions
      resetAll: () => {
        set({
          user: null,
          isOnboarded: false,
          currentPosture: 'good',
          isTracking: false,
          currentSession: null,
          sessionHistory: [],
          device: defaultDevice,
          dailyStats: {},
          achievements: mockAchievements,
          exerciseHistory: [],
          activeTab: 'home',
          showOnboarding: true,
        });
      },

      setDebugPosture: (status) => {
        set({ currentPosture: status });
        if (get().isTracking) {
          get().updateSession();
        }
      },

      toggleDeviceConnection: () => {
        const connected = get().device.connected;
        if (connected) {
          get().disconnectDevice();
        } else {
          get().connectDevice();
        }
      },

      addDebugXp: (amount) => {
        get().addXp(amount);
      },

      unlockRandomAchievement: () => {
        const locked = get().achievements.filter((a) => !a.unlocked);
        if (locked.length > 0) {
          const random = locked[Math.floor(Math.random() * locked.length)];
          get().unlockAchievement(random.id);
        }
      },
    }),
    {
      name: 'postureguard-storage',
      partialize: (state) => ({
        user: state.user,
        isOnboarded: state.isOnboarded,
        sessionHistory: state.sessionHistory,
        device: state.device,
        dailyStats: state.dailyStats,
        achievements: state.achievements,
        exerciseHistory: state.exerciseHistory,
      }),
    }
  )
);
