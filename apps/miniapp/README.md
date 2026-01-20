# PostureGuard Mini App 🦴

A Telegram Mini App for posture monitoring and improvement, built with React, TypeScript, and Tailwind CSS.

## Features

- 📱 **Full Telegram Mini App integration** - Works seamlessly in Telegram
- 🎯 **Posture tracking** - Real-time posture status monitoring (mocked)
- 📊 **Progress visualization** - Weekly charts and statistics
- 🏋️ **Exercises** - Step-by-step exercise guides with timers
- 🏆 **Gamification** - XP system, levels, achievements, and streaks
- 🌙 **Dark mode** - Light and dark theme support
- 🌐 **Bilingual** - Russian and English language support
- 🛠 **Debug mode** - Control all mocked features for demo/presentation

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui.tsx        # Basic components (Card, Button, Toggle, etc.)
│   ├── Layout.tsx    # Main layout with tab navigation
│   └── Onboarding.tsx # Onboarding flow wizard
├── pages/            # App screens
│   ├── HomePage.tsx       # Main dashboard
│   ├── ProgressPage.tsx   # Statistics and charts
│   ├── ExercisesPage.tsx  # Exercise library
│   ├── AchievementsPage.tsx # Achievement badges
│   └── SettingsPage.tsx   # Settings and debug panel
├── store/            # Zustand state management
│   └── useAppStore.ts # Global app state
├── hooks/            # Custom React hooks
│   └── index.ts      # useTranslation, useTelegram, etc.
├── i18n/             # Internationalization
│   └── translations.ts # RU/EN translations
├── types/            # TypeScript type definitions
│   └── index.ts      # All app types
├── utils/            # Utilities and mock data
│   └── mockData.ts   # Mock achievements, exercises, etc.
└── assets/           # Static assets
    └── images/       # Image placeholders (see below)
```

## Adding Custom Images

Place your custom images in `src/assets/images/`:

| File | Description | Recommended Size |
|------|-------------|-----------------|
| `logo.png` | App logo | 128x128px |
| `device.png` | PostureGuard device illustration | 200x200px |
| `onboarding-1.png` | Onboarding step 1 | 300x300px |
| `onboarding-2.png` | Onboarding step 2 | 300x300px |
| `onboarding-3.png` | Onboarding step 3 | 300x300px |
| `onboarding-4.png` | Onboarding step 4 | 300x300px |
| `exercise-neck.png` | Neck exercise | 150x150px |
| `exercise-back.png` | Back exercise | 150x150px |
| `exercise-shoulders.png` | Shoulder exercise | 150x150px |
| `exercise-eyes.png` | Eye exercise | 150x150px |
| `exercise-full.png` | Full body exercise | 150x150px |

**Note:** The app uses emoji placeholders by default, so images are optional.

## Deployment to Ubuntu Server

### Prerequisites

- Ubuntu 20.04+ server
- Node.js 18+ installed
- Nginx installed
- Domain name (or use server IP)
- SSL certificate (recommended for Telegram)

### Step 1: Build the App

```bash
npm run build
```

### Step 2: Upload to Server

```bash
# Upload the dist folder to your server
scp -r dist/* user@your-server:/var/www/postureguard/
```

### Step 3: Configure Nginx

Create `/etc/nginx/sites-available/postureguard`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/postureguard;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Deny "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/postureguard /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 4: Configure SSL (Required for Telegram)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Step 5: Configure Telegram Bot

1. Open @BotFather in Telegram
2. Send `/mybots` and select your bot
3. Go to **Bot Settings → Menu Button → Configure Menu Button**
4. Set the URL to `https://your-domain.com`

Or set it programmatically:

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setChatMenuButton" \
     -H "Content-Type: application/json" \
     -d '{"menu_button": {"type": "web_app", "text": "Open App", "web_app": {"url": "https://your-domain.com"}}}'
```

## Debug Mode Features

Enable debug mode in Settings to access:

- **Posture Control** - Manually set posture status (good/attention/poor)
- **Device Toggle** - Connect/disconnect virtual device
- **XP Control** - Add XP instantly (+10, +50, +100, +500)
- **Achievement Unlock** - Unlock random achievement
- **Reset All** - Clear all data and start fresh

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 3** - Styling
- **Zustand** - State management
- **Lucide React** - Icons
- **Telegram WebApp SDK** - Mini App integration

## Environment

The app automatically detects whether it's running in Telegram or in a browser:
- In Telegram: Full SDK integration with haptic feedback, theme sync, etc.
- In Browser: Mock mode for development/testing

## License

MIT License - Created for MISIS Design Thinking Course
