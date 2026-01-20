# CLAUDE.md

> Configuration file for Claude Code
> Project: PostureGuard — Telegram Mini App для мониторинга осанки (прототип для презентации)

---

## Project Overview

**PostureGuard** — это Telegram Mini App прототип для курса Design Thinking в MISIS. Цель — продемонстрировать работающий концепт приложения для мониторинга осанки. Все данные хранятся локально (localStorage), бекенда нет — это мок для презентации.

### Architecture

```
postureguard/
├── apps/
│   ├── miniapp/          # React 18 + TypeScript + Vite + Tailwind + Zustand
│   └── bot/              # Python 3 + Aiogram 3 (простой /start хендлер)
├── deploy/               # Nginx конфиг, systemd service
├── CLAUDE.md             # Этот файл
├── TASKS.md              # Промпты для улучшений
└── README.md
```

### Tech Stack

| Component | Stack |
|-----------|-------|
| **Mini App** | React 18, TypeScript, Vite, Tailwind CSS, Zustand |
| **Bot** | Python 3.12, Aiogram 3 |
| **Icons** | Lucide React |
| **State** | Zustand + localStorage persistence |
| **Deploy** | VPS + Nginx + Let's Encrypt |

### Live URLs

- **Mini App:** https://easy-posture.site
- **Bot:** @easy_posture_bot
- **Server:** (IP сервера)

---

## Commands

### Development

```bash
# Mini App
cd apps/miniapp
npm install
npm run dev          # http://localhost:5173

# Build for production
npm run build        # Output: dist/
npm run preview      # Preview production build
```

### Bot

```bash
cd apps/bot
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run (needs BOT_TOKEN env var)
BOT_TOKEN="your_token" python bot.py
```

### Deployment

```bash
# Copy miniapp build to server
scp -r apps/miniapp/dist/* user@SERVER:/var/www/postureguard/

# Restart bot service
sudo systemctl restart postureguard-bot
```

---

## Project Structure

### Mini App (`apps/miniapp/`)

```
src/
├── components/
│   ├── ui.tsx            # UI компоненты (Card, Button, Toggle, Badge, Modal, ProgressRing)
│   ├── Toast.tsx         # Toast уведомления с анимацией
│   ├── Layout.tsx        # Лейаут с нижней навигацией
│   └── Onboarding.tsx    # 5-шаговый онбординг
├── contexts/
│   └── ToastContext.tsx  # Контекст для toast уведомлений (useToast, showToast)
├── pages/
│   ├── HomePage.tsx      # Главная: трекинг, сессии, XP
│   ├── ProgressPage.tsx  # Статистика по дням/неделям
│   ├── ExercisesPage.tsx # Упражнения с таймерами
│   ├── AchievementsPage.tsx # Система достижений
│   └── SettingsPage.tsx  # Настройки + Debug Mode
├── store/
│   └── useAppStore.ts    # Zustand store (ВСЁ состояние здесь)
├── hooks/
│   └── index.ts          # useTranslation, useTelegram, useTheme, usePostureSimulation, useRandomPostureEvents
├── i18n/
│   └── translations.ts   # Переводы RU/EN
├── types/
│   └── index.ts          # TypeScript типы
└── utils/
    ├── mockData.ts       # Моковые данные (12 ачивок, 8 упражнений)
    └── haptics.ts        # Утилита для haptic feedback (success, warning, error)
```

### Bot (`apps/bot/`)

```
bot.py                    # Aiogram 3 бот (/start + "Как это работает?")
requirements.txt          # aiogram==3.4.1
postureguard-bot.service  # Systemd unit file
```

---

## State Management

**ВСЁ состояние в `useAppStore.ts`** — это центральный файл проекта.

### Ключевые сущности

```typescript
// Пользователь
user: UserProfile | null       // Профиль, XP, уровень, настройки

// Трекинг осанки
currentPosture: 'good' | 'attention' | 'poor'
isTracking: boolean
currentSession: PostureSession | null

// Устройство (мок)
device: DeviceState            // connected, batteryLevel, calibrationStatus

// Прогресс
dailyStats: Record<string, DailyStats>
achievements: Achievement[]
exerciseHistory: ExerciseSession[]
```

### Ключевые экшены

```typescript
// Сессия
startSession()           // Начать отслеживание
endSession()             // Завершить (считает XP)
setPosture(status)       // Сменить статус осанки

// XP и уровни
addXp(amount)            // Добавить XP (авто level-up)

// Достижения
unlockAchievement(id)    // Разблокировать
checkAchievements()      // Проверить условия

// Упражнения
completeExercise(id)     // Завершить упражнение (+XP)

// Debug
resetAll()               // Сбросить всё
setDebugPosture(status)  // Ручная смена осанки
addDebugXp(amount)       // Добавить XP для теста
unlockRandomAchievement()
```

### localStorage

Zustand persist автоматически сохраняет в `postureguard-storage`:
- user, isOnboarded, sessionHistory, device, dailyStats, achievements, exerciseHistory

---

## Code Patterns

### React Component

```tsx
// Функциональные компоненты с хуками
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../hooks';
import { Card, Button } from '../components/ui';

export function ComponentName() {
  const { t } = useTranslation();
  const { user, addXp } = useAppStore();

  return (
    <Card>
      <Button onClick={() => addXp(10)}>
        {t('common.button')}
      </Button>
    </Card>
  );
}
```

### Стилизация

```tsx
// Только Tailwind CSS, никаких CSS modules
<div className="px-4 py-6 space-y-6">
  <div className="flex items-center justify-between">
    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
      Title
    </h1>
  </div>
</div>
```

### Переводы

```tsx
const { t } = useTranslation();

// Использование
t('home.posture.good')  // "Отличная осанка" или "Good posture"

// Добавление новых переводов в src/i18n/translations.ts
```

### Toast уведомления

```tsx
import { useToast } from '../contexts/ToastContext';

const { showToast } = useToast();

// Показать toast
showToast({
  type: 'success',  // 'success' | 'warning' | 'error' | 'info'
  message: 'Сообщение',
  duration: 3000,   // опционально, по умолчанию 3000ms
});
```

### Haptic Feedback

```tsx
import { haptics } from '../utils/haptics';

// Вибрация при событиях
haptics.success();   // Успешное действие
haptics.warning();   // Предупреждение
haptics.error();     // Ошибка
haptics.light();     // Легкая вибрация
haptics.medium();    // Средняя вибрация
haptics.heavy();     // Сильная вибрация
```

---

## Constraints & Rules

### DO NOT

- ❌ Создавать бекенд или базу данных — это прототип
- ❌ Использовать внешние API — всё локально
- ❌ Удалять существующий функционал без подтверждения
- ❌ Менять структуру store без понимания зависимостей
- ❌ Использовать MUI или другие UI библиотеки — только Tailwind + Lucide
- ❌ Добавлять комментарии к очевидному коду

### ALWAYS

- ✅ Всё состояние через useAppStore
- ✅ Переводы через useTranslation (RU приоритет, EN fallback)
- ✅ Поддержка темной темы (dark: классы)
- ✅ Адаптивность для мобильных (Telegram Mini App)
- ✅ Сохранение данных в localStorage (уже работает через Zustand persist)
- ✅ Тестировать на реальном устройстве через Telegram

---

## Debug Mode

В Settings есть Debug Mode который позволяет:
- Ручное управление статусом осанки (good/attention/poor)
- Подключение/отключение устройства
- Добавление XP (+10, +50, +100)
- Разблокировка случайного достижения
- Сброс всех данных

**Для презентации:** Включить Debug Mode и показывать живые изменения.

---

## Key Files to Know

| File | Зачем |
|------|-------|
| `src/store/useAppStore.ts` | ВСЁ состояние и логика |
| `src/pages/HomePage.tsx` | Главный экран с трекингом |
| `src/components/ui.tsx` | Все UI компоненты |
| `src/components/Toast.tsx` | Toast уведомления |
| `src/contexts/ToastContext.tsx` | Контекст для toast (useToast) |
| `src/hooks/index.ts` | Хуки (usePostureSimulation, useRandomPostureEvents) |
| `src/i18n/translations.ts` | Переводы |
| `src/utils/mockData.ts` | Моковые упражнения и достижения |
| `src/utils/haptics.ts` | Haptic feedback утилита |

---

## Telegram Mini App Specifics

### SDK Integration

```tsx
// В hooks/index.ts
export function useTelegram() {
  const tg = window.Telegram?.WebApp;
  
  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    colorScheme: tg?.colorScheme,  // 'light' | 'dark'
    hapticFeedback: tg?.HapticFeedback,
    close: () => tg?.close(),
  };
}
```

### Haptic Feedback

```tsx
const { tg } = useTelegram();

// Вибрация при событиях
tg?.HapticFeedback?.impactOccurred('medium');
tg?.HapticFeedback?.notificationOccurred('success');
```

### Theme

Приложение автоматически подстраивается под тему Telegram:
- `tg.colorScheme` возвращает 'light' или 'dark'
- Tailwind dark: классы применяются автоматически

---

## Common Tasks

### Добавить новое достижение

1. Добавить в `src/utils/mockData.ts` → `mockAchievements`
2. Добавить условие проверки в `useAppStore.ts` → `checkAchievements()`
3. Добавить переводы в `src/i18n/translations.ts`

### Добавить новое упражнение

1. Добавить в `src/utils/mockData.ts` → `mockExercises`
2. Добавить переводы

### Добавить случайное событие

Уже реализовано в `useRandomPostureEvents`:
- Показывает toast каждые 10-30 секунд во время сессии
- Haptic feedback через `src/utils/haptics.ts`
- Toast через `useToast()` из `src/contexts/ToastContext.tsx`

Для нового типа события:
1. Добавить логику в `useRandomPostureEvents` в `src/hooks/index.ts`
2. Добавить переводы в `src/i18n/translations.ts` (секция `events`)
3. Использовать `showToast()` и `haptics.success/warning/error()`

---

## Interaction Protocol

Перед реализацией любой задачи:

1. **Уточни скоуп** — Какой конкретно компонент/функция?
2. **Запроси контекст** — Покажи текущий файл если нужен
3. **Подтверди подход** — Я создам X, изменю Y — верно?
4. **Определи output** — Полные файлы или diff?
5. **Проверь ограничения** — Есть паттерны которым следовать?

**При неясности — спрашивай. Не делай предположений.**

---

## References

- [Telegram Mini Apps Docs](https://core.telegram.org/bots/webapps)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons/)
- [Aiogram 3](https://docs.aiogram.dev/)
