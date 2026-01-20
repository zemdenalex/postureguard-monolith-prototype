export const translations = {
  ru: {
    // Common
    common: {
      loading: 'Загрузка...',
      error: 'Ошибка',
      retry: 'Повторить',
      cancel: 'Отмена',
      save: 'Сохранить',
      done: 'Готово',
      next: 'Далее',
      back: 'Назад',
      skip: 'Пропустить',
      start: 'Начать',
      stop: 'Остановить',
      pause: 'Пауза',
      resume: 'Продолжить',
      close: 'Закрыть',
      yes: 'Да',
      no: 'Нет',
      ok: 'ОК',
      minutes: 'мин',
      min: 'мин',
      hours: 'ч',
      seconds: 'сек',
      today: 'Сегодня',
      yesterday: 'Вчера',
      thisWeek: 'Эта неделя',
      level: 'Уровень',
      xp: 'XP',
    },
    
    // Onboarding
    onboarding: {
      welcome: {
        title: 'Привет! 👋',
        subtitle: 'PostureGuard поможет тебе следить за осанкой и чувствовать себя лучше',
        description: 'Присоединяйся к тысячам студентов, которые уже улучшили свою осанку',
      },
      features: {
        title: 'Что умеет приложение',
        monitoring: {
          title: 'Мониторинг осанки',
          description: 'Устройство отслеживает положение тела в реальном времени',
        },
        feedback: {
          title: 'Мгновенная обратная связь',
          description: 'LED-индикатор подсказывает, когда пора выпрямиться',
        },
        exercises: {
          title: 'Упражнения',
          description: 'Короткие разминки для шеи, спины и плеч',
        },
        gamification: {
          title: 'Геймификация',
          description: 'Зарабатывай XP, получай достижения и соревнуйся с друзьями',
        },
      },
      device: {
        title: 'Подключи устройство',
        description: 'Закрепи PostureGuard на воротнике или лацкане',
        steps: {
          clip: 'Прикрепи клипсу к одежде',
          position: 'Расположи на уровне ключицы',
          calibrate: 'Сядь прямо для калибровки',
        },
        later: 'Подключить позже',
        connect: 'Подключить сейчас',
      },
      goals: {
        title: 'Установи цель',
        description: 'Сколько минут в день ты хочешь следить за осанкой?',
        options: {
          easy: '30 мин — Легко начать',
          medium: '60 мин — Оптимально',
          hard: '120 мин — Максимум результата',
        },
      },
      ready: {
        title: 'Всё готово! 🎉',
        description: 'Теперь ты готов улучшить свою осанку',
        startButton: 'Начать',
      },
    },
    
    // Tabs
    tabs: {
      home: 'Главная',
      progress: 'Прогресс',
      exercises: 'Упражнения',
      achievements: 'Достижения',
      settings: 'Настройки',
    },
    
    // Home / Dashboard
    home: {
      greeting: {
        morning: 'Доброе утро',
        afternoon: 'Добрый день',
        evening: 'Добрый вечер',
        night: 'Доброй ночи',
      },
      posture: {
        title: 'Твоя осанка',
        good: 'Отлично! 💪',
        attention: 'Выпрямись! ⚠️',
        poor: 'Срочно выпрямись! 🔴',
        tracking: 'Отслеживание',
        notTracking: 'Не отслеживается',
        startSession: 'Начать сессию',
        endSession: 'Завершить сессию',
      },
      session: {
        duration: 'Длительность',
        score: 'Оценка',
        goodTime: 'Хорошая осанка',
      },
      quickStats: {
        title: 'Сегодня',
        minutes: 'Минуты',
        score: 'Средняя оценка',
        streak: 'Серия дней',
        exercises: 'Упражнения',
      },
      device: {
        title: 'Устройство',
        connected: 'Подключено',
        disconnected: 'Отключено',
        battery: 'Батарея',
        connect: 'Подключить',
        settings: 'Настройки',
      },
      tip: {
        title: 'Совет дня 💡',
      },
      tips: [
        'Каждые 30 минут делай перерыв и потягивайся',
        'Располагай монитор на уровне глаз',
        'Держи плечи расслабленными, не поднимай их к ушам',
        'Ноги должны стоять на полу, колени под углом 90°',
        'Используй поддержку для поясницы',
        'Пей воду — это помогает не забывать о перерывах',
      ],
    },
    
    // Progress
    progress: {
      title: 'Прогресс',
      subtitle: 'Отслеживай свои достижения',
      today: 'Сегодня',
      week: 'Неделя',
      month: 'Месяц',
      daily: 'День',
      weekly: 'Неделя',
      monthly: 'Месяц',
      dailyGoal: 'Дневная цель',
      completed: 'выполнено',
      weeklyChart: 'Статистика за неделю',
      totalMinutes: 'Всего минут',
      avgScore: 'Средняя оценка',
      currentStreak: 'Текущая серия',
      goalsAchieved: 'Целей достигнуто',
      streakTitle: 'Твоя серия',
      streakDescription: 'Ты занимаешься {{days}} дней подряд',
      bestStreak: 'Лучшая',
      sessionsToday: 'Сессий сегодня',
      minutesToday: 'Минут сегодня',
      avgScoreToday: 'Средняя оценка',
      exercisesToday: 'Упражнений',
      achievementsEarned: 'Достижения',
      unlocked: 'открыто',
      chart: {
        title: 'Статистика за неделю',
        goodPosture: 'Хорошая осанка',
        attention: 'Требует внимания',
        poor: 'Плохая осанка',
      },
      stats: {
        totalMinutes: 'Всего минут',
        sessions: 'Сессий',
        avgScore: 'Средняя оценка',
        bestDay: 'Лучший день',
      },
      streaks: {
        title: 'Серии',
        current: 'Текущая серия',
        longest: 'Лучшая серия',
        days: 'дней',
      },
      history: {
        title: 'История',
        noData: 'Нет данных за этот период',
      },
    },
    
    // Exercises
    exercises: {
      title: 'Упражнения',
      subtitle: 'Разомнись и улучши осанку',
      todayProgress: 'Сегодня выполнено',
      exercisesDone: 'упражнений',
      categories: {
        all: 'Все',
        neck: 'Шея',
        back: 'Спина',
        shoulders: 'Плечи',
        eyes: 'Глаза',
        full_body: 'Всё тело',
      },
      difficulty: {
        easy: 'Лёгкий',
        medium: 'Средний',
        hard: 'Сложный',
      },
      duration: 'мин',
      xpReward: 'XP',
      start: 'Начать',
      complete: 'Завершить',
      step: 'Шаг',
      of: 'из',
      completed: 'Упражнение выполнено! 🎉',
      xpEarned: 'Получено XP',
      recommendedTitle: 'Рекомендуемые',
      allExercises: 'Все упражнения',
      
      // Exercise items
      items: {
        neck_rolls: {
          title: 'Вращения головой',
          description: 'Мягкие круговые движения для расслабления шеи',
        },
        neck_stretch: {
          title: 'Растяжка шеи',
          description: 'Наклоны головы в стороны',
        },
        shoulder_shrugs: {
          title: 'Подъём плеч',
          description: 'Поднимай и опускай плечи',
        },
        shoulder_rolls: {
          title: 'Вращения плечами',
          description: 'Круговые движения плечами',
        },
        back_stretch: {
          title: 'Растяжка спины',
          description: 'Наклоны вперёд из положения сидя',
        },
        cat_cow: {
          title: 'Кошка-корова',
          description: 'Прогибы и скругления спины',
        },
        eye_rest: {
          title: 'Отдых для глаз',
          description: 'Правило 20-20-20',
        },
        full_stretch: {
          title: 'Полная растяжка',
          description: 'Комплекс упражнений на всё тело',
        },
      },
    },
    
    // Achievements
    achievements: {
      title: 'Достижения',
      subtitle: 'Собирай награды за прогресс',
      unlocked: 'Открыто',
      locked: 'Закрыто',
      progress: 'Прогресс',
      earned: 'Заработано',
      almostThere: 'Почти готово!',
      complete: 'выполнено',
      keepGoing: 'Продолжай заниматься!',
      rarity: 'Редкость',
      rarities: {
        common: 'Обычное',
        uncommon: 'Необычное',
        rare: 'Редкое',
        epic: 'Эпическое',
        legendary: 'Легендарное',
      },
      categories: {
        all: 'Все',
        beginner: 'Начало',
        consistency: 'Постоянство',
        posture: 'Осанка',
        exercise: 'Упражнения',
        social: 'Социальные',
        special: 'Особые',
      },
      
      // Achievement items
      items: {
        first_session: {
          title: 'Первые шаги',
          description: 'Заверши первую сессию отслеживания',
        },
        first_exercise: {
          title: 'Разминка',
          description: 'Выполни первое упражнение',
        },
        connected: {
          title: 'На связи',
          description: 'Подключи устройство PostureGuard',
        },
        streak_3: {
          title: 'Три дня подряд',
          description: 'Отслеживай осанку 3 дня подряд',
        },
        streak_7: {
          title: 'Неделя силы',
          description: 'Серия в 7 дней',
        },
        streak_30: {
          title: 'Месяц привычки',
          description: 'Серия в 30 дней',
        },
        perfect_hour: {
          title: 'Идеальный час',
          description: 'Держи хорошую осанку целый час',
        },
        perfect_day: {
          title: 'Идеальный день',
          description: '100% хорошая осанка за день',
        },
        exercise_master: {
          title: 'Мастер упражнений',
          description: 'Выполни все упражнения',
        },
        level_5: {
          title: 'Уровень 5',
          description: 'Достигни 5-го уровня',
        },
        level_10: {
          title: 'Уровень 10',
          description: 'Достигни 10-го уровня',
        },
        early_bird: {
          title: 'Ранняя пташка',
          description: 'Начни сессию до 7 утра',
        },
      },
      unlockedModal: {
        badge: 'Достижение получено!',
        button: 'Отлично!',
      },
    },

    // Settings
    settings: {
      title: 'Настройки',
      subtitle: 'Управление приложением',
      profile: {
        title: 'Профиль',
        name: 'Имя',
        level: 'Уровень',
        totalXp: 'Всего XP',
      },
      device: {
        title: 'Устройство',
        status: 'Статус',
        connected: 'Подключено',
        notConnected: 'Не подключено',
        disconnected: 'Отключено',
        battery: 'Батарея',
        firmware: 'Прошивка',
        calibrate: 'Калибровать',
        calibration: 'Калибровка',
        calibrated: 'Калибровка выполнена',
        needsCalibration: 'Требуется калибровка',
        calibrating: 'Калибровка...',
        connect: 'Подключить',
        disconnect: 'Отключить',
        led: 'LED-индикатор',
        brightness: 'Яркость',
        ledEnabled: 'LED-индикатор',
        ledBrightness: 'Яркость LED',
        sensitivity: 'Чувствительность',
        sensitivityLevels: {
          low: 'Низкая',
          medium: 'Средняя',
          high: 'Высокая',
        },
      },
      notifications: {
        title: 'Уведомления',
        enabled: 'Уведомления',
        enabledDesc: 'Получать уведомления об осанке',
        sound: 'Звуки',
        haptic: 'Вибрация',
        postureAlerts: 'Оповещения об осанке',
        breakReminders: 'Напоминания о перерывах',
        reminderInterval: 'Интервал напоминаний',
        minutes: 'минут',
      },
      appearance: {
        title: 'Внешний вид',
        language: 'Язык',
        theme: 'Тема',
        themes: {
          light: 'Светлая',
          dark: 'Тёмная',
          system: 'Системная',
        },
        sound: 'Звуки',
        haptic: 'Вибрация',
      },
      goals: {
        title: 'Цели',
        daily: 'Дневная цель (минуты)',
        dailyGoal: 'Дневная цель',
        reminderInterval: 'Интервал напоминаний',
        reminderDesc: 'Как часто напоминать о перерывах',
        workSession: 'Рабочая сессия',
        breakDuration: 'Длительность перерыва',
      },
      debug: {
        title: '🛠 Режим отладки',
        enabled: 'Включён',
        description: 'Показывать кнопки для тестирования',
        actions: 'Панель отладки',
        warning: 'Эти действия только для тестирования',
        postureControl: 'Управление осанкой',
        postureStatus: 'Статус осанки',
        toggleDevice: 'Устройство',
        deviceStatus: 'Статус устройства',
        connected: 'Подключено',
        disconnected: 'Отключено',
        connect: 'Подключить',
        disconnect: 'Отключить',
        addXp: 'Добавить XP',
        unlockAchievement: 'Достижение',
        unlockRandom: 'Открыть случайное',
        unlock: 'Открыть',
        resetAll: 'Сбросить всё',
        resetWarning: 'Удалит весь прогресс',
        reset: 'Сброс',
        resetConfirm: 'Подтвердить сброс',
        resetConfirmText: 'Вы уверены? Это действие нельзя отменить.',
        resetData: 'Сбросить данные',
        simulateAchievement: 'Открыть достижение',
        toggleSession: 'Вкл/Выкл сессию',
      },
      about: {
        title: 'О приложении',
        version: 'Версия',
        description: 'Умный помощник для улучшения осанки',
        developer: 'Разработчик',
        contact: 'Контакты',
        support: 'Поддержка',
        privacy: 'Политика конфиденциальности',
        terms: 'Условия использования',
      },
      danger: {
        title: 'Опасная зона',
        resetProgress: 'Сбросить прогресс',
        resetWarning: 'Это действие нельзя отменить',
        deleteAccount: 'Удалить аккаунт',
      },
    },
    
    // Device / Calibration
    device: {
      connect: {
        title: 'Подключение устройства',
        searching: 'Поиск устройства...',
        found: 'Устройство найдено',
        connecting: 'Подключение...',
        connected: 'Подключено!',
        failed: 'Не удалось подключиться',
        retry: 'Попробовать снова',
        instructions: 'Убедитесь, что устройство включено и находится рядом',
      },
      calibration: {
        title: 'Калибровка',
        step1: {
          title: 'Сядь прямо',
          description: 'Расположись удобно, выпрями спину',
        },
        step2: {
          title: 'Подбородок параллельно полу',
          description: 'Смотри прямо перед собой',
        },
        step3: {
          title: 'Расслабь плечи',
          description: 'Опусти плечи, не напрягай их',
        },
        calibrating: 'Калибровка...',
        success: 'Калибровка завершена!',
        failed: 'Ошибка калибровки',
      },
    },
    
    // Leaderboard
    leaderboard: {
      title: 'Рейтинг',
      tabs: {
        daily: 'День',
        weekly: 'Неделя',
        allTime: 'Всё время',
      },
      yourRank: 'Твоё место',
      points: 'очков',
      empty: 'Пока нет данных',
    },
    
    // Notifications / Alerts
    alerts: {
      postureWarning: 'Выпрямись! Твоя осанка ухудшилась 📐',
      breakReminder: 'Время перерыва! Сделай разминку 🧘',
      goalReached: 'Цель достигнута! Отличная работа! 🎉',
      streakMaintained: 'Серия сохранена! {{days}} дней подряд 🔥',
      newAchievement: 'Новое достижение: {{title}} 🏆',
      levelUp: 'Новый уровень! Теперь ты {{level}} уровня 🌟',
    },

    // Random posture events
    events: {
      goodPosture: 'Отличная осанка! +5 XP',
      attentionPosture: 'Выпрямите спину!',
      poorPosture: 'Внимание: сутулость!',
    },
  },

  en: {
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      retry: 'Retry',
      cancel: 'Cancel',
      save: 'Save',
      done: 'Done',
      next: 'Next',
      back: 'Back',
      skip: 'Skip',
      start: 'Start',
      stop: 'Stop',
      pause: 'Pause',
      resume: 'Resume',
      close: 'Close',
      yes: 'Yes',
      no: 'No',
      ok: 'OK',
      minutes: 'min',
      min: 'min',
      hours: 'h',
      seconds: 'sec',
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This week',
      level: 'Level',
      xp: 'XP',
    },
    
    // Onboarding
    onboarding: {
      welcome: {
        title: 'Hello! 👋',
        subtitle: 'PostureGuard will help you maintain good posture and feel better',
        description: 'Join thousands of students who have already improved their posture',
      },
      features: {
        title: 'What the app can do',
        monitoring: {
          title: 'Posture Monitoring',
          description: 'The device tracks your body position in real-time',
        },
        feedback: {
          title: 'Instant Feedback',
          description: 'LED indicator tells you when to straighten up',
        },
        exercises: {
          title: 'Exercises',
          description: 'Quick stretches for neck, back, and shoulders',
        },
        gamification: {
          title: 'Gamification',
          description: 'Earn XP, unlock achievements, and compete with friends',
        },
      },
      device: {
        title: 'Connect your device',
        description: 'Attach PostureGuard to your collar or lapel',
        steps: {
          clip: 'Clip it to your clothing',
          position: 'Position at collarbone level',
          calibrate: 'Sit straight for calibration',
        },
        later: 'Connect later',
        connect: 'Connect now',
      },
      goals: {
        title: 'Set your goal',
        description: 'How many minutes per day do you want to track your posture?',
        options: {
          easy: '30 min — Easy start',
          medium: '60 min — Optimal',
          hard: '120 min — Maximum results',
        },
      },
      ready: {
        title: 'All set! 🎉',
        description: 'You are now ready to improve your posture',
        startButton: 'Get Started',
      },
    },
    
    // Tabs
    tabs: {
      home: 'Home',
      progress: 'Progress',
      exercises: 'Exercises',
      achievements: 'Achievements',
      settings: 'Settings',
    },
    
    // Home / Dashboard
    home: {
      greeting: {
        morning: 'Good morning',
        afternoon: 'Good afternoon',
        evening: 'Good evening',
        night: 'Good night',
      },
      posture: {
        title: 'Your Posture',
        good: 'Excellent! 💪',
        attention: 'Straighten up! ⚠️',
        poor: 'Fix your posture! 🔴',
        tracking: 'Tracking',
        notTracking: 'Not tracking',
        startSession: 'Start Session',
        endSession: 'End Session',
      },
      session: {
        duration: 'Duration',
        score: 'Score',
        goodTime: 'Good posture',
      },
      quickStats: {
        title: 'Today',
        minutes: 'Minutes',
        score: 'Avg Score',
        streak: 'Day Streak',
        exercises: 'Exercises',
      },
      device: {
        title: 'Device',
        connected: 'Connected',
        disconnected: 'Disconnected',
        battery: 'Battery',
        connect: 'Connect',
        settings: 'Settings',
      },
      tip: {
        title: 'Tip of the day 💡',
      },
      tips: [
        'Take a break and stretch every 30 minutes',
        'Position your monitor at eye level',
        'Keep your shoulders relaxed, not raised to your ears',
        'Keep your feet flat on the floor, knees at 90°',
        'Use lumbar support for your lower back',
        'Drink water — it helps you remember to take breaks',
      ],
    },
    
    // Progress
    progress: {
      title: 'Progress',
      subtitle: 'Track your achievements',
      today: 'Today',
      week: 'Week',
      month: 'Month',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      dailyGoal: 'Daily Goal',
      completed: 'completed',
      weeklyChart: 'Weekly Stats',
      totalMinutes: 'Total minutes',
      avgScore: 'Avg Score',
      currentStreak: 'Current streak',
      goalsAchieved: 'Goals achieved',
      streakTitle: 'Your streak',
      streakDescription: 'You have been active for {{days}} days in a row',
      bestStreak: 'Best',
      sessionsToday: 'Sessions today',
      minutesToday: 'Minutes today',
      avgScoreToday: 'Average score',
      exercisesToday: 'Exercises',
      achievementsEarned: 'Achievements',
      unlocked: 'unlocked',
      chart: {
        title: 'Weekly Stats',
        goodPosture: 'Good posture',
        attention: 'Needs attention',
        poor: 'Poor posture',
      },
      stats: {
        totalMinutes: 'Total minutes',
        sessions: 'Sessions',
        avgScore: 'Avg Score',
        bestDay: 'Best day',
      },
      streaks: {
        title: 'Streaks',
        current: 'Current streak',
        longest: 'Best streak',
        days: 'days',
      },
      history: {
        title: 'History',
        noData: 'No data for this period',
      },
    },
    
    // Exercises
    exercises: {
      title: 'Exercises',
      subtitle: 'Stretch and improve your posture',
      todayProgress: 'Completed today',
      exercisesDone: 'exercises',
      categories: {
        all: 'All',
        neck: 'Neck',
        back: 'Back',
        shoulders: 'Shoulders',
        eyes: 'Eyes',
        full_body: 'Full Body',
      },
      difficulty: {
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard',
      },
      duration: 'min',
      xpReward: 'XP',
      start: 'Start',
      complete: 'Complete',
      step: 'Step',
      of: 'of',
      completed: 'Exercise completed! 🎉',
      xpEarned: 'XP Earned',
      recommendedTitle: 'Recommended',
      allExercises: 'All Exercises',
      
      items: {
        neck_rolls: {
          title: 'Neck Rolls',
          description: 'Gentle circular motions to relax neck muscles',
        },
        neck_stretch: {
          title: 'Neck Stretch',
          description: 'Side-to-side head tilts',
        },
        shoulder_shrugs: {
          title: 'Shoulder Shrugs',
          description: 'Raise and lower your shoulders',
        },
        shoulder_rolls: {
          title: 'Shoulder Rolls',
          description: 'Circular shoulder movements',
        },
        back_stretch: {
          title: 'Back Stretch',
          description: 'Forward bends from seated position',
        },
        cat_cow: {
          title: 'Cat-Cow',
          description: 'Arching and rounding your back',
        },
        eye_rest: {
          title: 'Eye Rest',
          description: '20-20-20 rule for eye health',
        },
        full_stretch: {
          title: 'Full Body Stretch',
          description: 'Complete stretching routine',
        },
      },
    },
    
    // Achievements
    achievements: {
      title: 'Achievements',
      subtitle: 'Collect rewards for your progress',
      unlocked: 'Unlocked',
      locked: 'Locked',
      progress: 'Progress',
      earned: 'Earned',
      almostThere: 'Almost there!',
      complete: 'complete',
      keepGoing: 'Keep going!',
      rarity: 'Rarity',
      rarities: {
        common: 'Common',
        uncommon: 'Uncommon',
        rare: 'Rare',
        epic: 'Epic',
        legendary: 'Legendary',
      },
      categories: {
        all: 'All',
        beginner: 'Beginner',
        consistency: 'Consistency',
        posture: 'Posture',
        exercise: 'Exercise',
        social: 'Social',
        special: 'Special',
      },
      
      items: {
        first_session: {
          title: 'First Steps',
          description: 'Complete your first tracking session',
        },
        first_exercise: {
          title: 'Warm Up',
          description: 'Complete your first exercise',
        },
        connected: {
          title: 'Connected',
          description: 'Connect your PostureGuard device',
        },
        streak_3: {
          title: 'Three Day Streak',
          description: 'Track posture for 3 consecutive days',
        },
        streak_7: {
          title: 'Week of Power',
          description: '7 day streak',
        },
        streak_30: {
          title: 'Month of Habit',
          description: '30 day streak',
        },
        perfect_hour: {
          title: 'Perfect Hour',
          description: 'Maintain good posture for an hour',
        },
        perfect_day: {
          title: 'Perfect Day',
          description: '100% good posture for a day',
        },
        exercise_master: {
          title: 'Exercise Master',
          description: 'Complete all exercises',
        },
        level_5: {
          title: 'Level 5',
          description: 'Reach level 5',
        },
        level_10: {
          title: 'Level 10',
          description: 'Reach level 10',
        },
        early_bird: {
          title: 'Early Bird',
          description: 'Start a session before 7 AM',
        },
      },
      unlockedModal: {
        badge: 'Achievement Unlocked!',
        button: 'Awesome!',
      },
    },

    // Settings
    settings: {
      title: 'Settings',
      subtitle: 'Manage your app',
      profile: {
        title: 'Profile',
        name: 'Name',
        level: 'Level',
        totalXp: 'Total XP',
      },
      device: {
        title: 'Device',
        status: 'Status',
        connected: 'Connected',
        notConnected: 'Not connected',
        disconnected: 'Disconnected',
        battery: 'Battery',
        firmware: 'Firmware',
        calibrate: 'Calibrate',
        calibration: 'Calibration',
        calibrated: 'Calibration complete',
        needsCalibration: 'Needs calibration',
        calibrating: 'Calibrating...',
        connect: 'Connect',
        disconnect: 'Disconnect',
        led: 'LED Indicator',
        brightness: 'Brightness',
        ledEnabled: 'LED Indicator',
        ledBrightness: 'LED Brightness',
        sensitivity: 'Sensitivity',
        sensitivityLevels: {
          low: 'Low',
          medium: 'Medium',
          high: 'High',
        },
      },
      notifications: {
        title: 'Notifications',
        enabled: 'Notifications',
        enabledDesc: 'Receive posture notifications',
        sound: 'Sound',
        haptic: 'Haptic feedback',
        postureAlerts: 'Posture alerts',
        breakReminders: 'Break reminders',
        reminderInterval: 'Reminder interval',
        minutes: 'minutes',
      },
      appearance: {
        title: 'Appearance',
        language: 'Language',
        theme: 'Theme',
        themes: {
          light: 'Light',
          dark: 'Dark',
          system: 'System',
        },
        sound: 'Sound',
        haptic: 'Haptic',
      },
      goals: {
        title: 'Goals',
        daily: 'Daily goal (minutes)',
        dailyGoal: 'Daily goal',
        reminderInterval: 'Reminder interval',
        reminderDesc: 'How often to remind about breaks',
        workSession: 'Work session',
        breakDuration: 'Break duration',
      },
      debug: {
        title: '🛠 Debug Mode',
        enabled: 'Enabled',
        description: 'Show buttons for testing',
        actions: 'Debug Panel',
        warning: 'These actions are for testing only',
        postureControl: 'Posture Control',
        postureStatus: 'Posture status',
        toggleDevice: 'Device',
        deviceStatus: 'Device status',
        connected: 'Connected',
        disconnected: 'Disconnected',
        connect: 'Connect',
        disconnect: 'Disconnect',
        addXp: 'Add XP',
        unlockAchievement: 'Achievement',
        unlockRandom: 'Unlock random',
        unlock: 'Unlock',
        resetAll: 'Reset All',
        resetWarning: 'Deletes all progress',
        reset: 'Reset',
        resetConfirm: 'Confirm Reset',
        resetConfirmText: 'Are you sure? This action cannot be undone.',
        resetData: 'Reset data',
        simulateAchievement: 'Unlock achievement',
        toggleSession: 'Toggle session',
      },
      about: {
        title: 'About',
        version: 'Version',
        description: 'Smart assistant for improving posture',
        developer: 'Developer',
        contact: 'Contact',
        support: 'Support',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
      },
      danger: {
        title: 'Danger Zone',
        resetProgress: 'Reset Progress',
        resetWarning: 'This action cannot be undone',
        deleteAccount: 'Delete Account',
      },
    },
    
    // Device / Calibration
    device: {
      connect: {
        title: 'Connect Device',
        searching: 'Searching for device...',
        found: 'Device found',
        connecting: 'Connecting...',
        connected: 'Connected!',
        failed: 'Connection failed',
        retry: 'Try again',
        instructions: 'Make sure your device is turned on and nearby',
      },
      calibration: {
        title: 'Calibration',
        step1: {
          title: 'Sit up straight',
          description: 'Get comfortable and straighten your back',
        },
        step2: {
          title: 'Chin parallel to floor',
          description: 'Look straight ahead',
        },
        step3: {
          title: 'Relax your shoulders',
          description: 'Drop your shoulders, don\'t tense them',
        },
        calibrating: 'Calibrating...',
        success: 'Calibration complete!',
        failed: 'Calibration failed',
      },
    },
    
    // Leaderboard
    leaderboard: {
      title: 'Leaderboard',
      tabs: {
        daily: 'Day',
        weekly: 'Week',
        allTime: 'All Time',
      },
      yourRank: 'Your rank',
      points: 'points',
      empty: 'No data yet',
    },
    
    // Notifications / Alerts
    alerts: {
      postureWarning: 'Straighten up! Your posture is getting worse 📐',
      breakReminder: 'Break time! Do some stretches 🧘',
      goalReached: 'Goal reached! Great work! 🎉',
      streakMaintained: 'Streak maintained! {{days}} days in a row 🔥',
      newAchievement: 'New achievement: {{title}} 🏆',
      levelUp: 'Level up! You are now level {{level}} 🌟',
    },

    // Random posture events
    events: {
      goodPosture: 'Great posture! +5 XP',
      attentionPosture: 'Straighten your back!',
      poorPosture: 'Warning: slouching!',
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.ru;
