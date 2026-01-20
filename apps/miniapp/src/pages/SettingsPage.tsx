import { useState } from 'react';
import { 
  Bluetooth, Bell, Palette, Target, Info, 
  ChevronRight, Battery, Sun, Moon,
  Bug, RefreshCw, Award, AlertTriangle,
  Check, Lightbulb, ChevronLeft
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useTranslation, useTelegram } from '../hooks';
import { Card, Button, Toggle, Badge, Modal } from '../components/ui';
import type { PostureStatus } from '../types';

type SettingsSection = 'main' | 'device' | 'notifications' | 'appearance' | 'goals' | 'debug' | 'about';

export function SettingsPage() {
  const { t } = useTranslation();
  const { haptic } = useTelegram();
  
  const { 
    user, 
    device, 
    updateSettings, 
    updateDevice,
    connectDevice, 
    disconnectDevice,
    calibrateDevice,
    setDebugPosture,
    addDebugXp,
    unlockRandomAchievement,
    resetAll,
    toggleDeviceConnection,
  } = useAppStore();

  const [activeSection, setActiveSection] = useState<SettingsSection>('main');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);

  const debugMode = user?.settings.debugMode || false;
  const currentTheme = user?.settings.theme || 'light';

  const handleLanguageChange = (language: 'ru' | 'en') => {
    haptic('light');
    updateSettings({ language });
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    haptic('light');
    updateSettings({ theme });
  };

  const handleCalibrate = async () => {
    haptic('medium');
    setIsCalibrating(true);
    await calibrateDevice();
    setTimeout(() => {
      setIsCalibrating(false);
      haptic('success');
    }, 2000);
  };

  const handleBack = () => {
    haptic('light');
    setActiveSection('main');
  };

  const renderMainSection = () => (
    <div className="space-y-3">
      {/* Profile */}
      <Card className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-2xl text-white">
          {user?.name?.[0]?.toUpperCase() || '👤'}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800 dark:text-white">
            {user?.name || 'User'}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('common.level')} {user?.level || 1} • {user?.xp || 0} XP
          </p>
        </div>
      </Card>

      {/* Device */}
      <Card 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setActiveSection('device')}
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
              {t('settings.device.title')}
            </p>
            <p className={`text-sm ${
              device.connected 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-slate-400'
            }`}>
              {device.connected ? t('settings.device.connected') : t('settings.device.notConnected')}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </Card>

      {/* Notifications */}
      <Card 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setActiveSection('notifications')}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="font-medium text-slate-800 dark:text-white">
            {t('settings.notifications.title')}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </Card>

      {/* Appearance */}
      <Card 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setActiveSection('appearance')}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="font-medium text-slate-800 dark:text-white">
            {t('settings.appearance.title')}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </Card>

      {/* Goals */}
      <Card 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setActiveSection('goals')}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <p className="font-medium text-slate-800 dark:text-white">
            {t('settings.goals.title')}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </Card>

      {/* Debug Mode */}
      <Card className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <Bug className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <p className="font-medium text-slate-800 dark:text-white">
              {t('settings.debug.title')}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('settings.debug.description')}
            </p>
          </div>
        </div>
        <Toggle 
          checked={debugMode}
          onChange={(checked) => updateSettings({ debugMode: checked })}
        />
      </Card>

      {/* Debug Actions */}
      {debugMode && (
        <Card 
          className="flex items-center justify-between cursor-pointer bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
          onClick={() => setActiveSection('debug')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-200 dark:bg-orange-800 flex items-center justify-center">
              <Bug className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="font-medium text-orange-800 dark:text-orange-200">
              {t('settings.debug.actions')}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-orange-400" />
        </Card>
      )}

      {/* About */}
      <Card 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setActiveSection('about')}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Info className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <p className="font-medium text-slate-800 dark:text-white">
            {t('settings.about.title')}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </Card>
    </div>
  );

  const renderDeviceSection = () => (
    <div className="space-y-4">
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-primary-600 dark:text-primary-400"
      >
        <ChevronLeft className="w-5 h-5" />
        {t('common.back')}
      </button>

      <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
        {t('settings.device.title')}
      </h2>

      {/* Connection Status */}
      <Card elevated className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Bluetooth className={`w-6 h-6 ${device.connected ? 'text-green-500' : 'text-slate-400'}`} />
            <div>
              <p className="font-medium text-slate-800 dark:text-white">
                PostureGuard
              </p>
              <p className={`text-sm ${device.connected ? 'text-green-500' : 'text-slate-400'}`}>
                {device.connected ? t('settings.device.connected') : t('settings.device.notConnected')}
              </p>
            </div>
          </div>
          {device.connected && (
            <Badge variant="success" className="flex items-center gap-1">
              <Battery className="w-3 h-3" />
              {device.batteryLevel}%
            </Badge>
          )}
        </div>

        <Button
          onClick={() => device.connected ? disconnectDevice() : connectDevice()}
          variant={device.connected ? 'secondary' : 'primary'}
          fullWidth
        >
          {device.connected ? t('settings.device.disconnect') : t('settings.device.connect')}
        </Button>
      </Card>

      {/* Calibration */}
      {device.connected && (
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800 dark:text-white">
                {t('settings.device.calibration')}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {device.calibrationStatus === 'calibrated' 
                  ? t('settings.device.calibrated')
                  : t('settings.device.needsCalibration')}
              </p>
            </div>
            <Button 
              onClick={handleCalibrate}
              loading={isCalibrating}
              variant="secondary"
              size="sm"
            >
              {isCalibrating ? t('settings.device.calibrating') : t('settings.device.calibrate')}
            </Button>
          </div>
        </Card>
      )}

      {/* LED Settings */}
      {device.connected && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <p className="font-medium text-slate-800 dark:text-white">
                {t('settings.device.led')}
              </p>
            </div>
            <Toggle 
              checked={device.ledEnabled}
              onChange={(checked) => updateDevice({ ledEnabled: checked })}
            />
          </div>
          
          {device.ledEnabled && (
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                {t('settings.device.brightness')}: {device.ledBrightness}%
              </p>
              <input
                type="range"
                min="10"
                max="100"
                step="10"
                value={device.ledBrightness}
                onChange={(e) => updateDevice({ ledBrightness: Number(e.target.value) })}
                className="w-full accent-primary-500"
              />
            </div>
          )}
        </Card>
      )}
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-4">
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-primary-600 dark:text-primary-400"
      >
        <ChevronLeft className="w-5 h-5" />
        {t('common.back')}
      </button>

      <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
        {t('settings.notifications.title')}
      </h2>

      <Card className="flex items-center justify-between">
        <div>
          <p className="font-medium text-slate-800 dark:text-white">
            {t('settings.notifications.enabled')}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('settings.notifications.enabledDesc')}
          </p>
        </div>
        <Toggle 
          checked={user?.settings.notifications || false}
          onChange={(checked) => updateSettings({ notifications: checked })}
        />
      </Card>

      <Card className="flex items-center justify-between">
        <div>
          <p className="font-medium text-slate-800 dark:text-white">
            {t('settings.notifications.sound')}
          </p>
        </div>
        <Toggle 
          checked={user?.settings.soundEnabled || false}
          onChange={(checked) => updateSettings({ soundEnabled: checked })}
          disabled={!user?.settings.notifications}
        />
      </Card>

      <Card className="flex items-center justify-between">
        <div>
          <p className="font-medium text-slate-800 dark:text-white">
            {t('settings.notifications.haptic')}
          </p>
        </div>
        <Toggle 
          checked={user?.settings.hapticEnabled || false}
          onChange={(checked) => updateSettings({ hapticEnabled: checked })}
        />
      </Card>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-4">
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-primary-600 dark:text-primary-400"
      >
        <ChevronLeft className="w-5 h-5" />
        {t('common.back')}
      </button>

      <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
        {t('settings.appearance.title')}
      </h2>

      {/* Theme */}
      <Card>
        <p className="font-medium text-slate-800 dark:text-white mb-3">
          {t('settings.appearance.theme')}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {(['light', 'dark', 'system'] as const).map((theme) => (
            <button
              key={theme}
              onClick={() => handleThemeChange(theme)}
              className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                currentTheme === theme
                  ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500'
                  : 'bg-slate-100 dark:bg-slate-800 border-2 border-transparent'
              }`}
            >
              {theme === 'light' && <Sun className="w-5 h-5" />}
              {theme === 'dark' && <Moon className="w-5 h-5" />}
              {theme === 'system' && <Palette className="w-5 h-5" />}
              <span className="text-xs font-medium">
                {t(`settings.appearance.themes.${theme}`)}
              </span>
            </button>
          ))}
        </div>
      </Card>

      {/* Language */}
      <Card>
        <p className="font-medium text-slate-800 dark:text-white mb-3">
          {t('settings.appearance.language')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {(['ru', 'en'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                user?.settings.language === lang
                  ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500'
                  : 'bg-slate-100 dark:bg-slate-800 border-2 border-transparent'
              }`}
            >
              <span className="text-lg">{lang === 'ru' ? '🇷🇺' : '🇬🇧'}</span>
              <span className="font-medium">
                {lang === 'ru' ? 'Русский' : 'English'}
              </span>
              {user?.settings.language === lang && (
                <Check className="w-4 h-4 text-primary-500" />
              )}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderGoalsSection = () => (
    <div className="space-y-4">
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-primary-600 dark:text-primary-400"
      >
        <ChevronLeft className="w-5 h-5" />
        {t('common.back')}
      </button>

      <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
        {t('settings.goals.title')}
      </h2>

      <Card>
        <p className="font-medium text-slate-800 dark:text-white mb-3">
          {t('settings.goals.daily')}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[30, 60, 120].map((minutes) => (
            <button
              key={minutes}
              onClick={() => {
                haptic('light');
                updateSettings({ dailyGoalMinutes: minutes });
              }}
              className={`p-4 rounded-xl text-center transition-all ${
                user?.settings.dailyGoalMinutes === minutes
                  ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500'
                  : 'bg-slate-100 dark:bg-slate-800 border-2 border-transparent'
              }`}
            >
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {minutes}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('common.minutes')}
              </p>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <p className="font-medium text-slate-800 dark:text-white mb-2">
          {t('settings.goals.reminderInterval')}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
          {t('settings.goals.reminderDesc')}
        </p>
        <div className="flex items-center gap-2">
          {[15, 30, 45, 60].map((interval) => (
            <button
              key={interval}
              onClick={() => {
                haptic('light');
                updateSettings({ reminderInterval: interval });
              }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                user?.settings.reminderInterval === interval
                  ? 'bg-primary-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {interval}{t('common.min')}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderDebugSection = () => (
    <div className="space-y-4">
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-primary-600 dark:text-primary-400"
      >
        <ChevronLeft className="w-5 h-5" />
        {t('common.back')}
      </button>

      <div className="flex items-center gap-2">
        <Bug className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          {t('settings.debug.actions')}
        </h2>
      </div>

      <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
        <p className="text-sm text-orange-700 dark:text-orange-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          {t('settings.debug.warning')}
        </p>
      </Card>

      {/* Posture Control */}
      <Card>
        <p className="font-medium text-slate-800 dark:text-white mb-3">
          {t('settings.debug.postureControl')}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {(['good', 'attention', 'poor'] as PostureStatus[]).map((status) => (
            <Button
              key={status}
              onClick={() => setDebugPosture(status)}
              variant="secondary"
              size="sm"
              className={`${
                status === 'good' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                status === 'attention' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}
            >
              {status === 'good' && '✓ Good'}
              {status === 'attention' && '⚠ Attention'}
              {status === 'poor' && '✗ Poor'}
            </Button>
          ))}
        </div>
      </Card>

      {/* Device Toggle */}
      <Card>
        <div className="flex items-center justify-between">
          <p className="font-medium text-slate-800 dark:text-white">
            {t('settings.debug.toggleDevice')}
          </p>
          <Button onClick={toggleDeviceConnection} variant="secondary" size="sm">
            {device.connected ? t('settings.debug.disconnect') : t('settings.debug.connect')}
          </Button>
        </div>
      </Card>

      {/* XP Control */}
      <Card>
        <p className="font-medium text-slate-800 dark:text-white mb-3">
          {t('settings.debug.addXp')}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {[10, 50, 100, 500].map((xp) => (
            <Button
              key={xp}
              onClick={() => addDebugXp(xp)}
              variant="secondary"
              size="sm"
            >
              +{xp}
            </Button>
          ))}
        </div>
      </Card>

      {/* Achievement Unlock */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-slate-800 dark:text-white">
              {t('settings.debug.unlockAchievement')}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('settings.debug.unlockRandom')}
            </p>
          </div>
          <Button onClick={unlockRandomAchievement} variant="secondary" size="sm">
            <Award className="w-4 h-4 mr-1" />
            {t('settings.debug.unlock')}
          </Button>
        </div>
      </Card>

      {/* Reset */}
      <Card className="border-red-200 dark:border-red-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-red-600 dark:text-red-400">
              {t('settings.debug.resetAll')}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('settings.debug.resetWarning')}
            </p>
          </div>
          <Button 
            onClick={() => setShowResetConfirm(true)} 
            variant="danger"
            size="sm"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            {t('settings.debug.reset')}
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderAboutSection = () => (
    <div className="space-y-4">
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-primary-600 dark:text-primary-400"
      >
        <ChevronLeft className="w-5 h-5" />
        {t('common.back')}
      </button>

      <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
        {t('settings.about.title')}
      </h2>

      <Card className="text-center py-6">
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
          <span className="text-4xl">🦴</span>
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
          PostureGuard
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          {t('settings.about.version')} 1.0.0
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 px-4">
          {t('settings.about.description')}
        </p>
      </Card>

      <Card>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">{t('settings.about.developer')}</span>
            <span className="font-medium text-slate-800 dark:text-white">MISIS Team</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">{t('settings.about.contact')}</span>
            <span className="font-medium text-primary-600 dark:text-primary-400">support@postureguard.app</span>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="px-4 py-6">
      {activeSection === 'main' && (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-display font-bold text-slate-800 dark:text-white mb-1">
              {t('settings.title')}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('settings.subtitle')}
            </p>
          </div>
          {renderMainSection()}
        </>
      )}
      
      {activeSection === 'device' && renderDeviceSection()}
      {activeSection === 'notifications' && renderNotificationsSection()}
      {activeSection === 'appearance' && renderAppearanceSection()}
      {activeSection === 'goals' && renderGoalsSection()}
      {activeSection === 'debug' && renderDebugSection()}
      {activeSection === 'about' && renderAboutSection()}

      {/* Reset Confirmation Modal */}
      <Modal 
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        title={t('settings.debug.resetConfirm')}
      >
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          {t('settings.debug.resetConfirmText')}
        </p>
        <div className="flex gap-3">
          <Button 
            variant="secondary" 
            onClick={() => setShowResetConfirm(false)}
            fullWidth
          >
            {t('common.cancel')}
          </Button>
          <Button 
            variant="danger"
            onClick={() => {
              resetAll();
              setShowResetConfirm(false);
              setActiveSection('main');
            }}
            fullWidth
          >
            {t('settings.debug.reset')}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
