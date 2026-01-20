import React from 'react';
import { Home, TrendingUp, Dumbbell, Trophy, Settings } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from '../hooks';
import { TabItem } from './ui';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { activeTab, setActiveTab, user } = useAppStore();
  const { t } = useTranslation();
  const debugMode = user?.settings.debugMode || false;

  const tabs = [
    { id: 'home', icon: <Home size={22} />, labelKey: 'tabs.home' },
    { id: 'progress', icon: <TrendingUp size={22} />, labelKey: 'tabs.progress' },
    { id: 'exercises', icon: <Dumbbell size={22} />, labelKey: 'tabs.exercises' },
    { id: 'achievements', icon: <Trophy size={22} />, labelKey: 'tabs.achievements' },
    { id: 'settings', icon: <Settings size={22} />, labelKey: 'tabs.settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      {/* Debug indicator */}
      {debugMode && (
        <div className="fixed top-0 left-0 right-0 bg-amber-500 text-amber-900 text-xs text-center py-1 z-50 font-medium">
          🛠 Debug Mode
        </div>
      )}
      
      {/* Main content */}
      <main className={`flex-1 overflow-y-auto pb-20 ${debugMode ? 'pt-6' : ''}`}>
        {children}
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface-light dark:bg-surface-dark border-t border-slate-100 dark:border-slate-800 safe-area-bottom z-40">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {tabs.map((tab) => (
            <TabItem
              key={tab.id}
              icon={tab.icon}
              label={t(tab.labelKey)}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
      </nav>
    </div>
  );
}
