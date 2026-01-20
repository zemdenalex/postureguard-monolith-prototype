import { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { useTheme, useTelegram } from './hooks';
import { Layout } from './components/Layout';
import { Onboarding } from './components/Onboarding';
import { HomePage } from './pages/HomePage';
import { ProgressPage } from './pages/ProgressPage';
import { ExercisesPage } from './pages/ExercisesPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  const { showOnboarding, activeTab, initUser } = useAppStore();
  const { webApp, user: tgUser } = useTelegram();
  
  // Initialize theme
  useTheme();

  // Initialize user from Telegram data
  useEffect(() => {
    if (tgUser) {
      initUser({
        id: tgUser.id,
        first_name: tgUser.first_name,
        last_name: tgUser.last_name,
        username: tgUser.username,
      });
    } else {
      // Initialize with default user for browser testing
      initUser();
    }
  }, [tgUser, initUser]);

  // Telegram WebApp setup
  useEffect(() => {
    if (webApp) {
      webApp.ready();
      webApp.expand();
      webApp.enableClosingConfirmation?.();
    }
  }, [webApp]);

  // Show onboarding for new users
  if (showOnboarding) {
    return <Onboarding />;
  }

  // Render active page based on tab
  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'progress':
        return <ProgressPage />;
      case 'exercises':
        return <ExercisesPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

export default App;
