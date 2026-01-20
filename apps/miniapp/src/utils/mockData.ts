import type { Achievement, Exercise, LeaderboardEntry } from '../types';

export const mockAchievements: Achievement[] = [
  // Beginner
  {
    id: 'first_session',
    titleKey: 'achievements.items.first_session.title',
    descriptionKey: 'achievements.items.first_session.description',
    icon: '🎯',
    category: 'beginner',
    xpReward: 50,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    secret: false,
  },
  {
    id: 'first_exercise',
    titleKey: 'achievements.items.first_exercise.title',
    descriptionKey: 'achievements.items.first_exercise.description',
    icon: '🧘',
    category: 'beginner',
    xpReward: 30,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    secret: false,
  },
  {
    id: 'connected',
    titleKey: 'achievements.items.connected.title',
    descriptionKey: 'achievements.items.connected.description',
    icon: '📡',
    category: 'beginner',
    xpReward: 25,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    secret: false,
  },

  // Consistency
  {
    id: 'streak_3',
    titleKey: 'achievements.items.streak_3.title',
    descriptionKey: 'achievements.items.streak_3.description',
    icon: '🔥',
    category: 'consistency',
    xpReward: 100,
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    secret: false,
  },
  {
    id: 'streak_7',
    titleKey: 'achievements.items.streak_7.title',
    descriptionKey: 'achievements.items.streak_7.description',
    icon: '💪',
    category: 'consistency',
    xpReward: 250,
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    secret: false,
  },
  {
    id: 'streak_30',
    titleKey: 'achievements.items.streak_30.title',
    descriptionKey: 'achievements.items.streak_30.description',
    icon: '👑',
    category: 'consistency',
    xpReward: 1000,
    unlocked: false,
    progress: 0,
    maxProgress: 30,
    secret: false,
  },

  // Posture
  {
    id: 'perfect_hour',
    titleKey: 'achievements.items.perfect_hour.title',
    descriptionKey: 'achievements.items.perfect_hour.description',
    icon: '⏰',
    category: 'posture',
    xpReward: 150,
    unlocked: false,
    progress: 0,
    maxProgress: 60,
    secret: false,
  },
  {
    id: 'perfect_day',
    titleKey: 'achievements.items.perfect_day.title',
    descriptionKey: 'achievements.items.perfect_day.description',
    icon: '🌟',
    category: 'posture',
    xpReward: 500,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    secret: false,
  },

  // Exercise
  {
    id: 'exercise_master',
    titleKey: 'achievements.items.exercise_master.title',
    descriptionKey: 'achievements.items.exercise_master.description',
    icon: '🏋️',
    category: 'exercise',
    xpReward: 300,
    unlocked: false,
    progress: 0,
    maxProgress: 8,
    secret: false,
  },

  // Special
  {
    id: 'level_5',
    titleKey: 'achievements.items.level_5.title',
    descriptionKey: 'achievements.items.level_5.description',
    icon: '⭐',
    category: 'special',
    xpReward: 200,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    secret: false,
  },
  {
    id: 'level_10',
    titleKey: 'achievements.items.level_10.title',
    descriptionKey: 'achievements.items.level_10.description',
    icon: '🌟',
    category: 'special',
    xpReward: 500,
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    secret: false,
  },
  {
    id: 'early_bird',
    titleKey: 'achievements.items.early_bird.title',
    descriptionKey: 'achievements.items.early_bird.description',
    icon: '🐦',
    category: 'special',
    xpReward: 75,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    secret: true,
  },
];

export const mockExercises: Exercise[] = [
  {
    id: 'neck_rolls',
    titleKey: 'exercises.items.neck_rolls.title',
    descriptionKey: 'exercises.items.neck_rolls.description',
    category: 'neck',
    difficulty: 'easy',
    duration: 60,
    xpReward: 15,
    steps: [
      { id: '1', instructionKey: 'Медленно наклони голову вправо', duration: 10 },
      { id: '2', instructionKey: 'Перекати голову вперёд', duration: 10 },
      { id: '3', instructionKey: 'Наклони голову влево', duration: 10 },
      { id: '4', instructionKey: 'Перекати голову назад', duration: 10 },
      { id: '5', instructionKey: 'Повтори в обратном направлении', duration: 20 },
    ],
  },
  {
    id: 'neck_stretch',
    titleKey: 'exercises.items.neck_stretch.title',
    descriptionKey: 'exercises.items.neck_stretch.description',
    category: 'neck',
    difficulty: 'easy',
    duration: 90,
    xpReward: 20,
    steps: [
      { id: '1', instructionKey: 'Наклони голову к правому плечу', duration: 15 },
      { id: '2', instructionKey: 'Задержись и почувствуй растяжку', duration: 15 },
      { id: '3', instructionKey: 'Вернись в центр', duration: 5 },
      { id: '4', instructionKey: 'Наклони голову к левому плечу', duration: 15 },
      { id: '5', instructionKey: 'Задержись и почувствуй растяжку', duration: 15 },
      { id: '6', instructionKey: 'Наклони голову вперёд, подбородок к груди', duration: 15 },
      { id: '7', instructionKey: 'Медленно вернись в исходное положение', duration: 10 },
    ],
  },
  {
    id: 'shoulder_shrugs',
    titleKey: 'exercises.items.shoulder_shrugs.title',
    descriptionKey: 'exercises.items.shoulder_shrugs.description',
    category: 'shoulders',
    difficulty: 'easy',
    duration: 45,
    xpReward: 15,
    steps: [
      { id: '1', instructionKey: 'Подними плечи к ушам', duration: 5 },
      { id: '2', instructionKey: 'Задержи на 3 секунды', duration: 3 },
      { id: '3', instructionKey: 'Резко опусти плечи вниз', duration: 2 },
      { id: '4', instructionKey: 'Расслабься', duration: 5 },
      { id: '5', instructionKey: 'Повтори 5 раз', duration: 30 },
    ],
  },
  {
    id: 'shoulder_rolls',
    titleKey: 'exercises.items.shoulder_rolls.title',
    descriptionKey: 'exercises.items.shoulder_rolls.description',
    category: 'shoulders',
    difficulty: 'easy',
    duration: 60,
    xpReward: 15,
    steps: [
      { id: '1', instructionKey: 'Подними плечи вверх', duration: 5 },
      { id: '2', instructionKey: 'Отведи назад', duration: 5 },
      { id: '3', instructionKey: 'Опусти вниз', duration: 5 },
      { id: '4', instructionKey: 'Выведи вперёд', duration: 5 },
      { id: '5', instructionKey: 'Повтори 5 раз вперёд', duration: 20 },
      { id: '6', instructionKey: 'Повтори 5 раз назад', duration: 20 },
    ],
  },
  {
    id: 'back_stretch',
    titleKey: 'exercises.items.back_stretch.title',
    descriptionKey: 'exercises.items.back_stretch.description',
    category: 'back',
    difficulty: 'medium',
    duration: 120,
    xpReward: 25,
    steps: [
      { id: '1', instructionKey: 'Сядь на край стула, ноги на полу', duration: 10 },
      { id: '2', instructionKey: 'Медленно наклонись вперёд', duration: 15 },
      { id: '3', instructionKey: 'Потянись руками к полу', duration: 20 },
      { id: '4', instructionKey: 'Задержись в нижней точке', duration: 20 },
      { id: '5', instructionKey: 'Почувствуй растяжку в пояснице', duration: 15 },
      { id: '6', instructionKey: 'Медленно поднимись, позвонок за позвонком', duration: 20 },
      { id: '7', instructionKey: 'Выпрями спину, расправь плечи', duration: 10 },
      { id: '8', instructionKey: 'Повтори ещё раз', duration: 10 },
    ],
  },
  {
    id: 'cat_cow',
    titleKey: 'exercises.items.cat_cow.title',
    descriptionKey: 'exercises.items.cat_cow.description',
    category: 'back',
    difficulty: 'medium',
    duration: 90,
    xpReward: 25,
    steps: [
      { id: '1', instructionKey: 'Встань на четвереньки (или сидя)', duration: 10 },
      { id: '2', instructionKey: 'Вдох: прогни спину, подними голову (корова)', duration: 15 },
      { id: '3', instructionKey: 'Задержись', duration: 5 },
      { id: '4', instructionKey: 'Выдох: скругли спину, опусти голову (кошка)', duration: 15 },
      { id: '5', instructionKey: 'Задержись', duration: 5 },
      { id: '6', instructionKey: 'Повтори 5-8 раз', duration: 40 },
    ],
  },
  {
    id: 'eye_rest',
    titleKey: 'exercises.items.eye_rest.title',
    descriptionKey: 'exercises.items.eye_rest.description',
    category: 'eyes',
    difficulty: 'easy',
    duration: 30,
    xpReward: 10,
    steps: [
      { id: '1', instructionKey: 'Отведи взгляд от экрана', duration: 5 },
      { id: '2', instructionKey: 'Посмотри на объект в 6 метрах от тебя', duration: 20 },
      { id: '3', instructionKey: 'Поморгай несколько раз', duration: 5 },
    ],
  },
  {
    id: 'full_stretch',
    titleKey: 'exercises.items.full_stretch.title',
    descriptionKey: 'exercises.items.full_stretch.description',
    category: 'full_body',
    difficulty: 'hard',
    duration: 300,
    xpReward: 50,
    steps: [
      { id: '1', instructionKey: 'Начни с вращений головой (30 сек)', duration: 30 },
      { id: '2', instructionKey: 'Растяжка шеи в стороны (30 сек)', duration: 30 },
      { id: '3', instructionKey: 'Вращения плечами (30 сек)', duration: 30 },
      { id: '4', instructionKey: 'Подъёмы плеч (30 сек)', duration: 30 },
      { id: '5', instructionKey: 'Наклоны в стороны стоя (60 сек)', duration: 60 },
      { id: '6', instructionKey: 'Скручивания корпуса (60 сек)', duration: 60 },
      { id: '7', instructionKey: 'Наклон вперёд с прямыми ногами (30 сек)', duration: 30 },
      { id: '8', instructionKey: 'Глубокий вдох и потягивание вверх (30 сек)', duration: 30 },
    ],
  },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: '1', name: 'Алексей', username: 'alex_fit', score: 15420, level: 12, isCurrentUser: false },
  { rank: 2, userId: '2', name: 'Мария', username: 'maria_yoga', score: 14100, level: 11, isCurrentUser: false },
  { rank: 3, userId: '3', name: 'Дмитрий', score: 12850, level: 10, isCurrentUser: false },
  { rank: 4, userId: '4', name: 'Анна', username: 'anna_k', score: 11200, level: 9, isCurrentUser: false },
  { rank: 5, userId: '5', name: 'Сергей', score: 9800, level: 8, isCurrentUser: false },
  { rank: 6, userId: '6', name: 'Елена', username: 'lena_posture', score: 8500, level: 7, isCurrentUser: false },
  { rank: 7, userId: '7', name: 'Иван', score: 7200, level: 6, isCurrentUser: false },
  { rank: 8, userId: '8', name: 'Ольга', score: 6100, level: 5, isCurrentUser: false },
  { rank: 9, userId: '9', name: 'Николай', username: 'nick', score: 5000, level: 5, isCurrentUser: false },
  { rank: 10, userId: '10', name: 'Татьяна', score: 4200, level: 4, isCurrentUser: false },
];

export const dailyTips = {
  ru: [
    'Каждые 30 минут делай перерыв и потягивайся 🧘',
    'Располагай монитор на уровне глаз 👀',
    'Держи плечи расслабленными, не поднимай их к ушам 💪',
    'Ноги должны стоять на полу, колени под углом 90° 🦵',
    'Используй поддержку для поясницы 🪑',
    'Пей воду — это помогает не забывать о перерывах 💧',
    'Встань и пройдись каждый час 🚶',
    'Делай упражнения для глаз по правилу 20-20-20 👁️',
    'Следи, чтобы локти были согнуты под углом 90° 📐',
    'Хорошая осанка — это привычка, тренируй её! 🏆',
  ],
  en: [
    'Take a break and stretch every 30 minutes 🧘',
    'Position your monitor at eye level 👀',
    'Keep your shoulders relaxed, not raised to your ears 💪',
    'Keep your feet flat on the floor, knees at 90° 🦵',
    'Use lumbar support for your lower back 🪑',
    'Drink water — it helps you remember to take breaks 💧',
    'Stand up and walk around every hour 🚶',
    'Follow the 20-20-20 rule for your eyes 👁️',
    'Keep your elbows bent at 90° 📐',
    'Good posture is a habit — train it! 🏆',
  ],
};

// Generate mock weekly data
interface WeekDayStat {
  date: string;
  minutes: number;
  score: number;
  sessions: number;
}

export const generateMockWeeklyStats = (): WeekDayStat[] => {
  const stats: WeekDayStat[] = [];
  const today = new Date();
  
  // Get Monday of current week
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    const isFuture = date > today;
    const totalMinutes = isFuture ? 0 : Math.floor(Math.random() * 90) + 15;
    const score = isFuture ? 0 : Math.floor(Math.random() * 40) + 50;
    
    stats.push({
      date: dateStr,
      minutes: totalMinutes,
      score: score,
      sessions: isFuture ? 0 : Math.floor(Math.random() * 4) + 1,
    });
  }
  
  return stats;
};
