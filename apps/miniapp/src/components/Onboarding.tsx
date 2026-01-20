import React, { useState } from 'react';
import { ChevronRight, Wifi, Target, Zap, Award, Check } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useTranslation, useTelegram } from '../hooks';
import { Button, Card } from './ui';

export function Onboarding() {
  const [step, setStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(60);
  const { t } = useTranslation();
  const { haptic } = useTelegram();
  const { completeOnboarding, updateSettings, connectDevice } = useAppStore();

  const handleNext = () => {
    haptic('light');
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    haptic('light');
    setStep((s) => s - 1);
  };

  const handleComplete = () => {
    haptic('success');
    updateSettings({ dailyGoalMinutes: selectedGoal });
    completeOnboarding();
  };

  const handleConnectDevice = () => {
    haptic('medium');
    connectDevice();
    handleNext();
  };

  const steps = [
    // Welcome
    <WelcomeStep key="welcome" onNext={handleNext} t={t} />,
    // Features
    <FeaturesStep key="features" onNext={handleNext} onBack={handleBack} t={t} />,
    // Device
    <DeviceStep key="device" onConnect={handleConnectDevice} onSkip={handleNext} onBack={handleBack} t={t} />,
    // Goals
    <GoalsStep 
      key="goals" 
      selectedGoal={selectedGoal} 
      onSelectGoal={setSelectedGoal} 
      onNext={handleNext} 
      onBack={handleBack} 
      t={t} 
    />,
    // Ready
    <ReadyStep key="ready" onComplete={handleComplete} t={t} />,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-primary-900/20 dark:to-background-dark">
      {/* Progress dots */}
      <div className="flex justify-center gap-2 pt-8 pb-4">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step 
                ? 'w-8 bg-primary-500' 
                : i < step 
                  ? 'w-2 bg-primary-300' 
                  : 'w-2 bg-slate-200 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="animate-fade-in">
        {steps[step]}
      </div>
    </div>
  );
}

// Welcome Step
function WelcomeStep({ onNext, t }: { onNext: () => void; t: (key: string) => string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 pt-12 pb-8 text-center">
      {/* Logo/Icon */}
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mb-8 shadow-2xl shadow-primary-500/30 animate-bounce-slow">
        <span className="text-6xl">🧘</span>
      </div>

      <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white mb-3">
        {t('onboarding.welcome.title')}
      </h1>
      
      <p className="text-lg text-primary-600 dark:text-primary-400 font-medium mb-2">
        PostureGuard
      </p>
      
      <p className="text-slate-600 dark:text-slate-300 mb-4 max-w-xs">
        {t('onboarding.welcome.subtitle')}
      </p>
      
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-12 max-w-xs">
        {t('onboarding.welcome.description')}
      </p>

      <Button onClick={onNext} size="lg" fullWidth className="max-w-xs">
        {t('common.start')}
        <ChevronRight className="ml-2 inline" size={20} />
      </Button>
    </div>
  );
}

// Features Step
function FeaturesStep({ 
  onNext, 
  onBack, 
  t 
}: { 
  onNext: () => void; 
  onBack: () => void; 
  t: (key: string) => string;
}) {
  const features = [
    {
      icon: <Wifi className="w-6 h-6" />,
      titleKey: 'onboarding.features.monitoring.title',
      descKey: 'onboarding.features.monitoring.description',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      titleKey: 'onboarding.features.feedback.title',
      descKey: 'onboarding.features.feedback.description',
      color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    },
    {
      icon: <Target className="w-6 h-6" />,
      titleKey: 'onboarding.features.exercises.title',
      descKey: 'onboarding.features.exercises.description',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    },
    {
      icon: <Award className="w-6 h-6" />,
      titleKey: 'onboarding.features.gamification.title',
      descKey: 'onboarding.features.gamification.description',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="px-6 pb-8">
      <h2 className="text-2xl font-display font-bold text-slate-800 dark:text-white mb-6 text-center">
        {t('onboarding.features.title')}
      </h2>

      <div className="space-y-4 mb-8">
        {features.map((feature, i) => (
          <Card 
            key={i} 
            className="flex items-start gap-4 animate-slide-up"
            style={{ animationDelay: `${i * 100}ms` } as React.CSSProperties}
          >
            <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center flex-shrink-0`}>
              {feature.icon}
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white">
                {t(feature.titleKey)}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t(feature.descKey)}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="secondary" className="flex-1">
          {t('common.back')}
        </Button>
        <Button onClick={onNext} className="flex-1">
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
}

// Device Step
function DeviceStep({
  onConnect,
  onSkip,
  onBack,
  t,
}: {
  onConnect: () => void;
  onSkip: () => void;
  onBack: () => void;
  t: (key: string) => string;
}) {
  return (
    <div className="px-6 pb-8">
      <h2 className="text-2xl font-display font-bold text-slate-800 dark:text-white mb-2 text-center">
        {t('onboarding.device.title')}
      </h2>
      
      <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
        {t('onboarding.device.description')}
      </p>

      {/* Device illustration */}
      <div className="flex justify-center mb-8">
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl">📎</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">PostureGuard</p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3 mb-8">
        {[
          { num: 1, key: 'onboarding.device.steps.clip' },
          { num: 2, key: 'onboarding.device.steps.position' },
          { num: 3, key: 'onboarding.device.steps.calibrate' },
        ].map((step) => (
          <div key={step.num} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-sm">
              {step.num}
            </div>
            <p className="text-slate-700 dark:text-slate-200">{t(step.key)}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <Button onClick={onConnect} fullWidth>
          <Wifi className="mr-2 inline" size={18} />
          {t('onboarding.device.connect')}
        </Button>
        
        <Button onClick={onSkip} variant="ghost" fullWidth>
          {t('onboarding.device.later')}
        </Button>
        
        <Button onClick={onBack} variant="secondary" fullWidth>
          {t('common.back')}
        </Button>
      </div>
    </div>
  );
}

// Goals Step
function GoalsStep({
  selectedGoal,
  onSelectGoal,
  onNext,
  onBack,
  t,
}: {
  selectedGoal: number;
  onSelectGoal: (goal: number) => void;
  onNext: () => void;
  onBack: () => void;
  t: (key: string) => string;
}) {
  const goals = [
    { value: 30, labelKey: 'onboarding.goals.options.easy', emoji: '🌱' },
    { value: 60, labelKey: 'onboarding.goals.options.medium', emoji: '🌿' },
    { value: 120, labelKey: 'onboarding.goals.options.hard', emoji: '🌳' },
  ];

  return (
    <div className="px-6 pb-8">
      <h2 className="text-2xl font-display font-bold text-slate-800 dark:text-white mb-2 text-center">
        {t('onboarding.goals.title')}
      </h2>
      
      <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
        {t('onboarding.goals.description')}
      </p>

      <div className="space-y-3 mb-8">
        {goals.map((goal) => (
          <Card
            key={goal.value}
            elevated={selectedGoal === goal.value}
            onClick={() => onSelectGoal(goal.value)}
            className={`cursor-pointer transition-all ${
              selectedGoal === goal.value 
                ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                : 'hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{goal.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold text-slate-800 dark:text-white">
                  {t(goal.labelKey)}
                </p>
              </div>
              {selectedGoal === goal.value && (
                <div className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center">
                  <Check size={14} />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="secondary" className="flex-1">
          {t('common.back')}
        </Button>
        <Button onClick={onNext} className="flex-1">
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
}

// Ready Step
function ReadyStep({ onComplete, t }: { onComplete: () => void; t: (key: string) => string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 pt-12 pb-8 text-center">
      {/* Celebration animation */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-2xl shadow-primary-500/30">
          <span className="text-6xl animate-wiggle">🎉</span>
        </div>
        {/* Confetti-like elements */}
        <div className="absolute -top-2 -left-2 text-2xl animate-bounce">✨</div>
        <div className="absolute -top-4 right-0 text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>🌟</div>
        <div className="absolute bottom-0 -right-4 text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>⭐</div>
      </div>

      <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white mb-3">
        {t('onboarding.ready.title')}
      </h1>
      
      <p className="text-slate-600 dark:text-slate-300 mb-12 max-w-xs">
        {t('onboarding.ready.description')}
      </p>

      <Button onClick={onComplete} size="lg" fullWidth className="max-w-xs">
        {t('onboarding.ready.startButton')}
        <ChevronRight className="ml-2 inline" size={20} />
      </Button>
    </div>
  );
}
