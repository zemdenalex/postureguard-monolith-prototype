import { useCallback, useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { translations, type Language } from '../i18n/translations';
import type { TelegramWebApp } from '../types';
import { useToast } from '../contexts/ToastContext';
import { haptics } from '../utils/haptics';

// Translation hook
export function useTranslation() {
  const language = useAppStore((state) => state.user?.settings.language || 'ru');
  
  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const keys = key.split('.');
      let value: any = translations[language as Language];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Fallback to Russian if key not found
          value = translations.ru;
          for (const fallbackKey of keys) {
            if (value && typeof value === 'object' && fallbackKey in value) {
              value = value[fallbackKey];
            } else {
              return key; // Return key if not found in any language
            }
          }
        }
      }
      
      if (typeof value !== 'string') {
        return key;
      }
      
      // Replace parameters
      if (params) {
        return value.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => {
          return String(params[paramKey] ?? `{{${paramKey}}}`);
        });
      }
      
      return value;
    },
    [language]
  );
  
  return { t, language };
}

// Telegram WebApp hook
export function useTelegram() {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      setWebApp(tg);
      setIsReady(true);
    } else {
      // Running outside Telegram - mock mode
      setIsReady(true);
    }
  }, []);
  
  const haptic = useCallback(
    (type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error') => {
      if (!webApp?.HapticFeedback) return;
      
      if (type === 'success' || type === 'warning' || type === 'error') {
        webApp.HapticFeedback.notificationOccurred(type);
      } else {
        webApp.HapticFeedback.impactOccurred(type);
      }
    },
    [webApp]
  );
  
  const showAlert = useCallback(
    (message: string) => {
      if (webApp) {
        webApp.showAlert(message);
      } else {
        alert(message);
      }
    },
    [webApp]
  );
  
  const showConfirm = useCallback(
    (message: string): Promise<boolean> => {
      return new Promise((resolve) => {
        if (webApp) {
          webApp.showConfirm(message, resolve);
        } else {
          resolve(confirm(message));
        }
      });
    },
    [webApp]
  );
  
  const close = useCallback(() => {
    if (webApp) {
      webApp.close();
    }
  }, [webApp]);
  
  return {
    webApp,
    isReady,
    user: webApp?.initDataUnsafe?.user,
    colorScheme: webApp?.colorScheme || 'light',
    haptic,
    showAlert,
    showConfirm,
    close,
  };
}

// Theme hook
export function useTheme() {
  const settings = useAppStore((state) => state.user?.settings);
  const { webApp } = useTelegram();
  
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    let resolvedTheme: 'light' | 'dark' = 'light';
    
    if (settings?.theme === 'system') {
      // Use Telegram theme or system preference
      if (webApp?.colorScheme) {
        resolvedTheme = webApp.colorScheme;
      } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
        resolvedTheme = 'dark';
      }
    } else if (settings?.theme === 'dark') {
      resolvedTheme = 'dark';
    }
    
    setTheme(resolvedTheme);
    
    // Update DOM
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings?.theme, webApp?.colorScheme]);
  
  return theme;
}

// Posture simulation hook (for demo)
export function usePostureSimulation() {
  const { isTracking, setPosture, currentPosture, user } = useAppStore();
  const debugMode = user?.settings.debugMode || false;
  
  useEffect(() => {
    if (!isTracking || debugMode) return;
    
    // Simulate random posture changes
    const interval = setInterval(() => {
      const rand = Math.random();
      let newPosture: 'good' | 'attention' | 'poor';
      
      if (rand < 0.6) {
        newPosture = 'good';
      } else if (rand < 0.85) {
        newPosture = 'attention';
      } else {
        newPosture = 'poor';
      }
      
      if (newPosture !== currentPosture) {
        setPosture(newPosture);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isTracking, debugMode, currentPosture, setPosture]);
}

// Session timer hook
export function useSessionTimer() {
  const { isTracking, currentSession, updateSession } = useAppStore();

  useEffect(() => {
    if (!isTracking || !currentSession) return;

    const interval = setInterval(() => {
      updateSession();
    }, 1000);

    return () => clearInterval(interval);
  }, [isTracking, currentSession, updateSession]);
}

// Random posture events during active session
export function useRandomPostureEvents() {
  const { isTracking, currentPosture, addXp, user } = useAppStore();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const debugMode = user?.settings.debugMode || false;
  const hapticEnabled = user?.settings.hapticEnabled !== false;

  useEffect(() => {
    if (!isTracking || debugMode) return;

    // Random interval between 10-30 seconds
    const getRandomInterval = () => Math.floor(Math.random() * 20000) + 10000;

    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextEvent = () => {
      timeoutId = setTimeout(() => {
        // Trigger event based on current posture
        if (currentPosture === 'good') {
          showToast({
            type: 'success',
            message: t('events.goodPosture'),
            duration: 3000,
          });
          if (hapticEnabled) haptics.success();
          addXp(5); // Bonus XP
        } else if (currentPosture === 'attention') {
          showToast({
            type: 'warning',
            message: t('events.attentionPosture'),
            duration: 3000,
          });
          if (hapticEnabled) haptics.warning();
        } else if (currentPosture === 'poor') {
          showToast({
            type: 'error',
            message: t('events.poorPosture'),
            duration: 3000,
          });
          if (hapticEnabled) haptics.error();
        }

        scheduleNextEvent();
      }, getRandomInterval());
    };

    scheduleNextEvent();

    return () => clearTimeout(timeoutId);
  }, [isTracking, debugMode, currentPosture, addXp, showToast, t, hapticEnabled]);
}

// Format time helper
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Get greeting based on time
export function useGreeting() {
  const { t } = useTranslation();
  
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return t('home.greeting.morning');
  } else if (hour >= 12 && hour < 17) {
    return t('home.greeting.afternoon');
  } else if (hour >= 17 && hour < 22) {
    return t('home.greeting.evening');
  } else {
    return t('home.greeting.night');
  }
}

// Daily tip hook
export function useDailyTip() {
  const language = useAppStore((state) => state.user?.settings.language || 'ru');
  const tips = language === 'ru' 
    ? [
        'Каждые 30 минут делай перерыв и потягивайся 🧘',
        'Располагай монитор на уровне глаз 👀',
        'Держи плечи расслабленными, не поднимай их к ушам 💪',
        'Ноги должны стоять на полу, колени под углом 90° 🦵',
        'Используй поддержку для поясницы 🪑',
        'Пей воду — это помогает не забывать о перерывах 💧',
      ]
    : [
        'Take a break and stretch every 30 minutes 🧘',
        'Position your monitor at eye level 👀',
        'Keep your shoulders relaxed, not raised to your ears 💪',
        'Keep your feet flat on the floor, knees at 90° 🦵',
        'Use lumbar support for your lower back 🪑',
        'Drink water — it helps you remember to take breaks 💧',
      ];
  
  // Use date as seed for consistent daily tip
  const today = new Date().toDateString();
  const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = seed % tips.length;
  
  return tips[index];
}
