// User Profile
export interface UserProfile {
  id: string;
  telegramId: number;
  name: string;
  username?: string;
  avatarUrl?: string;
  createdAt: Date;
  settings: UserSettings;
  stats: UserStats;
  level: number;
  xp: number;
  xpToNextLevel: number;
}

export interface UserSettings {
  language: 'ru' | 'en';
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  notificationsEnabled: boolean;
  postureAlerts: boolean;
  breakReminders: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  reminderInterval: number; // minutes
  workSessionDuration: number; // minutes
  breakDuration: number; // minutes
  dailyGoalMinutes: number;
  debugMode: boolean;
}

export interface UserStats {
  totalMinutesTracked: number;
  totalSessions: number;
  currentStreak: number;
  longestStreak: number;
  averagePostureScore: number;
  exercisesCompleted: number;
  totalAchievements: number;
  completedExercises: string[];
}

// Device
export interface DeviceState {
  connected: boolean;
  batteryLevel: number;
  isCharging: boolean;
  firmwareVersion: string;
  lastSyncTime: Date;
  calibrationStatus: 'not_calibrated' | 'calibrating' | 'calibrated';
  ledEnabled: boolean;
  ledBrightness: number;
  sensitivity: 'low' | 'medium' | 'high';
}

// Posture
export type PostureStatus = 'good' | 'attention' | 'poor';

export interface PostureData {
  status: PostureStatus;
  angle: number;
  timestamp: Date;
  sessionId: string;
}

export interface PostureSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // seconds
  goodPostureTime: number; // seconds
  attentionTime: number; // seconds
  poorPostureTime: number; // seconds
  postureScore: number; // 0-100
  xpEarned: number;
}

// Daily Stats
export interface DailyStats {
  date: string; // YYYY-MM-DD
  totalMinutes: number;
  sessions: number;
  sessionsCount: number;
  averageScore: number;
  goodPosturePercent: number;
  attentionPercent: number;
  poorPosturePercent: number;
  exercisesCompleted: number;
  xpEarned: number;
  goalReached: boolean;
}

// Weekly Stats
export interface WeeklyStats {
  weekStart: string; // YYYY-MM-DD
  dailyStats: DailyStats[];
  totalMinutes: number;
  averageScore: number;
  streakDays: number;
}

// Achievements
export type AchievementCategory = 
  | 'beginner' 
  | 'consistency' 
  | 'posture' 
  | 'exercise' 
  | 'social' 
  | 'special';

export interface Achievement {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  category: AchievementCategory;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  secret: boolean;
}

// Exercises
export type ExerciseCategory = 'neck' | 'back' | 'shoulders' | 'eyes' | 'full_body';
export type ExerciseDifficulty = 'easy' | 'medium' | 'hard';

export interface Exercise {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: ExerciseCategory;
  difficulty: ExerciseDifficulty;
  duration: number; // seconds
  steps: ExerciseStep[];
  xpReward: number;
  imageUrl?: string;
  videoUrl?: string;
}

export interface ExerciseStep {
  id: string;
  instructionKey: string;
  duration: number; // seconds
  imageUrl?: string;
}

export interface ExerciseSession {
  exerciseId: string;
  completedAt: Date;
  xpEarned: number;
}

// Leaderboard
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  username?: string;
  avatarUrl?: string;
  score: number;
  level: number;
  isCurrentUser: boolean;
}

export type LeaderboardType = 'daily' | 'weekly' | 'allTime';

// Notifications
export interface Notification {
  id: string;
  type: 'posture_alert' | 'break_reminder' | 'achievement' | 'streak' | 'tip';
  titleKey: string;
  messageKey: string;
  timestamp: Date;
  read: boolean;
  data?: Record<string, unknown>;
}

// Navigation
export type TabRoute = 'home' | 'progress' | 'exercises' | 'achievements' | 'settings';

// Telegram WebApp
export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
      photo_url?: string;
    };
    start_param?: string;
  };
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    showProgress(leaveActive?: boolean): void;
    hideProgress(): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    setText(text: string): void;
    setParams(params: { text?: string; color?: string; text_color?: string; is_active?: boolean; is_visible?: boolean }): void;
  };
  BackButton: {
    isVisible: boolean;
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
  };
  HapticFeedback: {
    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
    notificationOccurred(type: 'error' | 'success' | 'warning'): void;
    selectionChanged(): void;
  };
  ready(): void;
  expand(): void;
  close(): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  setHeaderColor(color: string): void;
  setBackgroundColor(color: string): void;
  showPopup(params: { title?: string; message: string; buttons?: Array<{ id?: string; type?: string; text?: string }> }, callback?: (buttonId: string) => void): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}
