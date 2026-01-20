# PostureGuard

> Telegram Mini App для мониторинга осанки — прототип для презентации Design Thinking (MISIS)

## 🎯 Что это

PostureGuard — это концепт приложения которое помогает следить за осанкой. Это **прототип/мок** для демонстрации идеи, без реального бекенда. Все данные хранятся локально в браузере.

## 🔗 Live Demo

- **Mini App:** https://easy-posture.site
- **Telegram Bot:** [@easy_posture_bot](https://t.me/easy_posture_bot)

## 📦 Структура проекта

```
postureguard/
├── apps/
│   ├── miniapp/          # React + TypeScript + Vite + Tailwind
│   │   ├── src/
│   │   │   ├── components/   # UI компоненты
│   │   │   ├── pages/        # Страницы приложения
│   │   │   ├── store/        # Zustand state management
│   │   │   ├── hooks/        # React hooks
│   │   │   ├── i18n/         # Переводы RU/EN
│   │   │   └── utils/        # Моковые данные
│   │   └── dist/             # Production build
│   └── bot/              # Python Telegram бот (Aiogram 3)
├── deploy/               # Конфиги для деплоя
│   ├── nginx.conf
│   └── postureguard-bot.service
├── CLAUDE.md             # Инструкции для AI
├── TASKS.md              # Задачи и промпты
└── README.md
```

## 🚀 Быстрый старт

### Mini App (фронтенд)

```bash
cd apps/miniapp
npm install
npm run dev
# Открыть http://localhost:5173
```

### Bot

```bash
cd apps/bot
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
BOT_TOKEN="your_token" python bot.py
```

## ✨ Фичи

- 📊 **Трекинг осанки** — симуляция мониторинга в реальном времени
- 🏆 **Система достижений** — 12+ достижений с XP наградами
- 📈 **Статистика** — графики по дням и неделям
- 🧘 **Упражнения** — 8 упражнений для шеи и спины с таймерами
- 🌓 **Темы** — светлая и темная тема (авто из Telegram)
- 🌍 **Языки** — русский и английский
- 🔧 **Debug Mode** — для презентации и тестирования

## 🛠 Технологии

| Компонент | Технологии |
|-----------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| State | Zustand + localStorage persistence |
| Icons | Lucide React |
| Bot | Python 3.12, Aiogram 3 |
| Deploy | Nginx, Let's Encrypt, systemd |

## 📱 Telegram Mini App

Приложение использует [Telegram Mini Apps SDK](https://core.telegram.org/bots/webapps):
- Автоматическая тема (светлая/темная)
- Haptic feedback (вибрация)
- Данные пользователя из Telegram

## 🔧 Debug Mode

В настройках есть Debug Mode который позволяет:
- Менять статус осанки вручную
- Подключать/отключать виртуальное устройство
- Добавлять XP для теста level up
- Разблокировать достижения
- Сбросить все данные

## 📝 Разработка

См. [CLAUDE.md](CLAUDE.md) для инструкций по разработке.
См. [TASKS.md](TASKS.md) для списка задач и промптов.

## 🚢 Деплой

### 1. Билд Mini App

```bash
cd apps/miniapp
npm run build
```

### 2. Копирование на сервер

```bash
scp -r apps/miniapp/dist/* user@server:/var/www/postureguard/
```

### 3. Запуск бота как сервиса

```bash
sudo cp deploy/postureguard-bot.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now postureguard-bot
```

## 📄 Лицензия

MIT — для учебных целей (курс Design Thinking, MISIS)

---

*Создано в рамках курса Design Thinking, декабрь 2024*
