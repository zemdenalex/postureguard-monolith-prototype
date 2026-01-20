import { useState, useEffect } from 'react';
import { 
  Play, Pause, X, Clock, Zap, CheckCircle, 
  ChevronRight, Award
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useTranslation, useTelegram } from '../hooks';
import { Card, Button, Badge, ProgressRing } from '../components/ui';
import { mockExercises } from '../utils/mockData';
import type { Exercise } from '../types';

type Category = 'all' | 'neck' | 'back' | 'shoulders' | 'eyes' | 'full_body';

export function ExercisesPage() {
  const { t } = useTranslation();
  const { haptic } = useTelegram();
  const { user, completeExercise } = useAppStore();
  
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepTimer, setStepTimer] = useState(0);
  const [totalTimer, setTotalTimer] = useState(0);

  const categories: { id: Category; emoji: string; labelKey: string }[] = [
    { id: 'all', emoji: '📋', labelKey: 'exercises.categories.all' },
    { id: 'neck', emoji: '🦒', labelKey: 'exercises.categories.neck' },
    { id: 'back', emoji: '🦴', labelKey: 'exercises.categories.back' },
    { id: 'shoulders', emoji: '💪', labelKey: 'exercises.categories.shoulders' },
    { id: 'eyes', emoji: '👁️', labelKey: 'exercises.categories.eyes' },
    { id: 'full_body', emoji: '🧘', labelKey: 'exercises.categories.full_body' },
  ];

  const filteredExercises = selectedCategory === 'all' 
    ? mockExercises 
    : mockExercises.filter((e: Exercise) => e.category === selectedCategory);

  // Get exercise with translated content
  const getExercise = (exercise: Exercise) => ({
    ...exercise,
    name: t(`exercises.list.${exercise.id}.name`),
    description: t(`exercises.list.${exercise.id}.description`),
    steps: exercise.steps.map((_: unknown, i: number) => t(`exercises.list.${exercise.id}.steps.${i}`)),
  });

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isPlaying && activeExercise) {
      interval = setInterval(() => {
        setTotalTimer((prev) => prev + 1);
        setStepTimer((prev) => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, activeExercise]);

  const handleStartExercise = (exercise: Exercise) => {
    haptic('medium');
    setActiveExercise(exercise);
    setCurrentStep(0);
    setStepTimer(0);
    setTotalTimer(0);
    setIsPlaying(true);
  };

  const handleNextStep = () => {
    haptic('light');
    if (activeExercise && currentStep < activeExercise.steps.length - 1) {
      setCurrentStep(s => s + 1);
      setStepTimer(0);
    } else {
      // Exercise completed
      handleCompleteExercise();
    }
  };

  const handlePrevStep = () => {
    haptic('light');
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
      setStepTimer(0);
    }
  };

  const handleCompleteExercise = () => {
    if (activeExercise) {
      haptic('success');
      completeExercise(activeExercise.id);
      setActiveExercise(null);
      setIsPlaying(false);
    }
  };

  const handleCloseExercise = () => {
    haptic('light');
    setActiveExercise(null);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'default';
    }
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-800 dark:text-white mb-1">
          {t('exercises.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t('exercises.subtitle')}
        </p>
      </div>

      {/* Category Filter */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-2 min-w-max pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                haptic('light');
                setSelectedCategory(cat.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{t(cat.labelKey)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Exercises List */}
      <div className="space-y-3">
        {filteredExercises.map((exercise: Exercise, i: number) => {
          const ex = getExercise(exercise);
          const isCompleted = user?.stats.completedExercises?.includes(exercise.id);
          
          return (
            <Card 
              key={exercise.id}
              className="animate-slide-up cursor-pointer hover:shadow-md transition-shadow"
              style={{ animationDelay: `${i * 50}ms` } as React.CSSProperties}
              onClick={() => handleStartExercise(exercise)}
            >
              <div className="flex items-center gap-4">
                {/* Exercise icon/image */}
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
                  isCompleted 
                    ? 'bg-green-100 dark:bg-green-900/30' 
                    : 'bg-slate-100 dark:bg-slate-800'
                }`}>
                  {exercise.category === 'neck' && '🦒'}
                  {exercise.category === 'back' && '🦴'}
                  {exercise.category === 'shoulders' && '💪'}
                  {exercise.category === 'eyes' && '👁️'}
                  {exercise.category === 'full_body' && '🧘'}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-800 dark:text-white truncate">
                      {ex.name}
                    </h3>
                    {isCompleted && (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                  
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
                    {ex.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={getDifficultyColor(exercise.difficulty) as any}>
                      {t(`exercises.difficulty.${exercise.difficulty}`)}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="w-3 h-3" />
                      {exercise.duration}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                      <Zap className="w-3 h-3" />
                      +{exercise.xpReward} XP
                    </div>
                  </div>
                </div>
                
                <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Exercise Player Modal */}
      {activeExercise && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in">
          <div className="w-full bg-white dark:bg-slate-900 rounded-t-3xl max-h-[90vh] overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="font-semibold text-slate-800 dark:text-white">
                  {getExercise(activeExercise).name}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t('exercises.player.step')} {currentStep + 1} / {activeExercise.steps.length}
                </p>
              </div>
              <button 
                onClick={handleCloseExercise}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Progress */}
            <div className="flex gap-1 p-4 pb-0">
              {activeExercise.steps.map((_, i) => (
                <div 
                  key={i}
                  className={`flex-1 h-1 rounded-full transition-all ${
                    i < currentStep 
                      ? 'bg-primary-500' 
                      : i === currentStep 
                        ? 'bg-primary-300' 
                        : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Timer */}
              <div className="flex justify-center">
                <ProgressRing
                  progress={(stepTimer / 30) * 100}
                  size={140}
                  strokeWidth={10}
                  color="#22c55e"
                >
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-800 dark:text-white">
                      {formatTime(stepTimer)}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t('exercises.player.total')}: {formatTime(totalTimer)}
                    </p>
                  </div>
                </ProgressRing>
              </div>

              {/* Step instruction */}
              <div className="text-center">
                <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                  {getExercise(activeExercise).steps[currentStep]}
                </p>
              </div>

              {/* Visual guide placeholder */}
              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                  <span className="text-6xl">
                    {activeExercise.category === 'neck' && '🦒'}
                    {activeExercise.category === 'back' && '🦴'}
                    {activeExercise.category === 'shoulders' && '💪'}
                    {activeExercise.category === 'eyes' && '👁️'}
                    {activeExercise.category === 'full_body' && '🧘'}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                <Button 
                  variant="secondary" 
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className="flex-1"
                >
                  {t('common.back')}
                </Button>
                
                <Button 
                  variant="secondary"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-6"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </Button>
                
                <Button 
                  onClick={handleNextStep}
                  className="flex-1"
                >
                  {currentStep === activeExercise.steps.length - 1 
                    ? t('exercises.player.complete')
                    : t('common.next')
                  }
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Daily exercises summary */}
      <Card className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10 border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-200 dark:bg-amber-800 flex items-center justify-center">
            <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="font-medium text-amber-800 dark:text-amber-200">
              {t('exercises.todayProgress')}
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {user?.stats.completedExercises?.length || 0} {t('exercises.completed')} • 
              +{(user?.stats.completedExercises?.length || 0) * 25} XP
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
