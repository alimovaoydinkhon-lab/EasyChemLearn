import { Course, Language, TranslationDictionary } from './types';

export const TRANSLATIONS: TranslationDictionary = {
  welcome: {
    RU: 'Добро пожаловать в EasyChemLearn',
    KZ: 'EasyChemLearn-ге қош келдіңіз',
    EN: 'Welcome to EasyChemLearn',
  },
  login: {
    RU: 'Войти',
    KZ: 'Кіру',
    EN: 'Log In',
  },
  register: {
    RU: 'Регистрация',
    KZ: 'Тіркелу',
    EN: 'Register',
  },
  roleSelect: {
    RU: 'Выберите роль',
    KZ: 'Рөлді таңдаңыз',
    EN: 'Select Role',
  },
  student: {
    RU: 'Студент',
    KZ: 'Студент',
    EN: 'Student',
  },
  teacher: {
    RU: 'Учитель',
    KZ: 'Мұғалім',
    EN: 'Teacher',
  },
  admin: {
    RU: 'Администратор',
    KZ: 'Әкімші',
    EN: 'Administrator',
  },
  courses: {
    RU: 'Курсы',
    KZ: 'Курстар',
    EN: 'Courses',
  },
  groups: {
    RU: 'Группы',
    KZ: 'Топтар',
    EN: 'Groups',
  },
  users: {
    RU: 'Пользователи',
    KZ: 'Пайдаланушылар',
    EN: 'Users',
  },
  progress: {
    RU: 'Прогресс',
    KZ: 'Прогресс',
    EN: 'Progress',
  },
  start: {
    RU: 'Начать',
    KZ: 'Бастау',
    EN: 'Start',
  },
  theory: {
    RU: 'Теория',
    KZ: 'Теория',
    EN: 'Theory',
  },
  practice: {
    RU: 'Практика',
    KZ: 'Тәжірибе',
    EN: 'Practice',
  },
  check: {
    RU: 'Проверить',
    KZ: 'Тексеру',
    EN: 'Check',
  },
  next: {
    RU: 'Далее',
    KZ: 'Келесі',
    EN: 'Next',
  },
  hint: {
    RU: 'Подсказка',
    KZ: 'Кеңес',
    EN: 'Hint',
  },
  aiHint: {
    RU: 'Спросить AI',
    KZ: 'AI сұрау',
    EN: 'Ask AI',
  },
  correct: {
    RU: 'Верно!',
    KZ: 'Дұрыс!',
    EN: 'Correct!',
  },
  incorrect: {
    RU: 'Неверно. Попробуй еще раз.',
    KZ: 'Қате. Қайтадан байқап көріңіз.',
    EN: 'Incorrect. Try again.',
  },
  certificate: {
    RU: 'Сертификат',
    KZ: 'Сертификат',
    EN: 'Certificate',
  },
  congrats: {
    RU: 'Поздравляем!',
    KZ: 'Құттықтаймыз!',
    EN: 'Congratulations!',
  },
  courseCompleted: {
    RU: 'Вы успешно завершили курс',
    KZ: 'Сіз курсты сәтті аяқтадыңыз',
    EN: 'You have successfully completed the course',
  },
  teacherDashboard: {
    RU: 'Панель учителя',
    KZ: 'Мұғалім тақтасы',
    EN: 'Teacher Dashboard',
  },
  adminDashboard: {
    RU: 'Панель администратора',
    KZ: 'Әкімші тақтасы',
    EN: 'Admin Dashboard',
  },
  studentsList: {
    RU: 'Список студентов',
    KZ: 'Студенттер тізімі',
    EN: 'Students List',
  },
  averageScore: {
    RU: 'Средний балл',
    KZ: 'Орташа балл',
    EN: 'Average Score',
  },
  exportCSV: {
    RU: 'Экспорт в CSV',
    KZ: 'CSV-ге экспорттау',
    EN: 'Export to CSV',
  },
  formula: {
    RU: 'Формула',
    KZ: 'Формула',
    EN: 'Formula',
  },
  algorithm: {
    RU: 'Алгоритм решения',
    KZ: 'Шешу алгоритмі',
    EN: 'Solution Algorithm',
  },
  // New translations
  manageCourses: {
    RU: 'Управление курсами',
    KZ: 'Курстарды басқару',
    EN: 'Manage Courses',
  },
  addTopic: {
    RU: 'Добавить тему',
    KZ: 'Тақырып қосу',
    EN: 'Add Topic',
  },
  editTopic: {
    RU: 'Редактировать тему',
    KZ: 'Тақырыпты өңдеу',
    EN: 'Edit Topic',
  },
  files: {
    RU: 'Файлы',
    KZ: 'Файлдар',
    EN: 'Files',
  },
  tasks: {
    RU: 'Задачи',
    KZ: 'Есептер',
    EN: 'Tasks',
  },
  assignments: {
    RU: 'Задания',
    KZ: 'Тапсырмалар',
    EN: 'Assignments',
  },
  stats: {
    RU: 'Статистика',
    KZ: 'Статистика',
    EN: 'Statistics',
  },
  addProblem: {
    RU: 'Добавить задачу',
    KZ: 'Есеп қосу',
    EN: 'Add Problem',
  },
  addAssignment: {
    RU: 'Добавить задание',
    KZ: 'Тапсырма қосу',
    EN: 'Add Assignment',
  },
  uploadFile: {
    RU: 'Загрузить файл',
    KZ: 'Файл жүктеу',
    EN: 'Upload File',
  },
  uploadDesc: {
    RU: 'Любой тип, любой размер',
    KZ: 'Кез келген түр, кез келген өлшем',
    EN: 'Any type, any size',
  },
  question: {
    RU: 'Вопрос',
    KZ: 'Сұрақ',
    EN: 'Question',
  },
  answer: {
    RU: 'Ответ',
    KZ: 'Жауап',
    EN: 'Answer',
  },
  difficulty: {
    RU: 'Сложность',
    KZ: 'Қиындық',
    EN: 'Difficulty',
  },
  easy: { RU: 'Легкий', KZ: 'Оңай', EN: 'Easy' },
  medium: { RU: 'Средний', KZ: 'Орташа', EN: 'Medium' },
  hard: { RU: 'Сложный', KZ: 'Қиын', EN: 'Hard' },
  save: { RU: 'Сохранить', KZ: 'Сақтау', EN: 'Save' },
  cancel: { RU: 'Отмена', KZ: 'Болдырмау', EN: 'Cancel' },
  delete: { RU: 'Удалить', KZ: 'Жою', EN: 'Delete' },
  edit: { RU: 'Редактировать', KZ: 'Өңдеу', EN: 'Edit' },
  
  // Advanced Stats
  groupStats: { RU: 'Статистика группы', KZ: 'Топ статистикасы', EN: 'Group Statistics' },
  individualStats: { RU: 'Индивидуальная статистика', KZ: 'Жеке статистика', EN: 'Individual Statistics' },
  errorFrequency: { RU: 'Частота ошибок', KZ: 'Қателер жиілігі', EN: 'Error Frequency' },
  comparativeAnalysis: { RU: 'Сравнительный анализ', KZ: 'Салыстырмалы талдау', EN: 'Comparative Analysis' },
  classAverage: { RU: 'Среднее по классу', KZ: 'Сынып орташа', EN: 'Class Average' },
  dominantError: { RU: 'Частая ошибка', KZ: 'Жиі қате', EN: 'Frequent Error' },

  // Problem Flow
  tryAgain: { RU: 'Попробуй еще раз', KZ: 'Қайталап көріңіз', EN: 'Try again' },
  loadingSimilar: { RU: 'Ответ неверный. Загружаем похожую задачу...', KZ: 'Жауап қате. Ұқсас тапсырма жүктелуде...', EN: 'Incorrect. Loading similar task...' },
  attemptsLeft: { RU: 'Попыток осталось', KZ: 'Қалған әрекеттер', EN: 'Attempts left' },
  
  // New Numeric Flow
  enterValue: { RU: 'Введите число', KZ: 'Санды енгізіңіз', EN: 'Enter value' },
  selectUnit: { RU: 'Ед. измерения', KZ: 'Өлшем бірлігі', EN: 'Unit' },
  points: { RU: 'Баллы', KZ: 'Ұпай', EN: 'Points' },
  wrongUnit: { RU: 'Неверная единица измерения', KZ: 'Өлшем бірлігі қате', EN: 'Incorrect unit' },
  wrongValue: { RU: 'Неверное значение', KZ: 'Мән қате', EN: 'Incorrect value' },
};

export const MOTIVATIONAL_QUOTES: Record<Language, string[]> = {
  RU: [
    "Отлично, продолжаем!",
    "Не сдавайся, попробуй ещё раз!",
    "Ты делаешь успехи!",
    "Прекрасная работа!",
    "Каждая ошибка — это шаг к знанию!"
  ],
  KZ: [
    "Өте жақсы, жалғастырамыз!",
    "Берілме, қайта көр!",
    "Сен жақсы нәтиже көрсетіп жатырсың!",
    "Тамаша жұмыс!",
    "Әр қателік — білімге қадам!"
  ],
  EN: [
    "Great, let's continue!",
    "Don't give up, try again!",
    "You are making progress!",
    "Excellent work!",
    "Every mistake is a step towards knowledge!"
  ]
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: {
      RU: 'Растворы и концентрации',
      KZ: 'Ерітінділер және концентрациялар',
      EN: 'Solutions and Concentrations',
    },
    description: {
      RU: 'Изучите основы приготовления растворов, молярность и массовую долю.',
      KZ: 'Ерітінділерді дайындау негіздерін, молярлықты және массалық үлесті үйреніңіз.',
      EN: 'Learn the basics of solution preparation, molarity, and mass percentage.',
    },
    lessons: [
      {
        id: 'l1',
        title: {
          RU: 'Массовая доля растворенного вещества',
          KZ: 'Еріген заттың массалық үлесі',
          EN: 'Mass Percentage of Solute',
        },
        theory: {
          RU: 'Массовая доля (w) показывает отношение массы растворенного вещества к общей массе раствора.',
          KZ: 'Массалық үлес (w) еріген зат массасының ерітіндінің жалпы массасына қатынасын көрсетеді.',
          EN: 'Mass fraction (w) shows the ratio of the mass of the solute to the total mass of the solution.',
        },
        formula: {
          RU: 'w = m(в-ва) / m(р-ра) * 100%',
          KZ: 'w = m(зат) / m(ерітінді) * 100%',
          EN: 'w = m(solute) / m(solution) * 100%',
        },
        algorithm: {
          RU: '1. Найти массу вещества.\n2. Найти массу раствора (вода + вещество).\n3. Разделить массу вещества на массу раствора.',
          KZ: '1. Заттың массасын табыңыз.\n2. Ерітіндінің массасын табыңыз (су + зат).\n3. Заттың массасын ерітіндінің массасына бөліңіз.',
          EN: '1. Find the mass of the solute.\n2. Find the mass of the solution (water + solute).\n3. Divide the mass of the solute by the mass of the solution.',
        },
        example: {
          RU: 'Пример: Если растворить 10г соли в 90г воды, масса раствора = 100г. w = 10/100 = 0.1 или 10%.',
          KZ: 'Мысал: Егер 10г тұзды 90г суда ерітсе, ерітінді массасы = 100г. w = 10/100 = 0.1 немесе 10%.',
          EN: 'Example: If you dissolve 10g of salt in 90g of water, solution mass = 100g. w = 10/100 = 0.1 or 10%.',
        },
        problems: [
          {
            id: 'p1',
            difficulty: 'easy',
            type: 'text',
            question: {
              RU: 'Смешали 5г сахара и 45г воды. Какова массовая доля сахара в процентах?',
              KZ: '5г қант пен 45г су араластырылды. Қанттың массалық үлесі пайызбен қандай?',
              EN: 'Mixed 5g of sugar and 45g of water. What is the mass percentage of sugar?',
            },
            correctAnswer: '10',
            hint: {
              RU: 'Сложите массу сахара и воды, чтобы получить массу раствора.',
              KZ: 'Ерітінді массасын алу үшін қант пен судың массасын қосыңыз.',
              EN: 'Add the mass of sugar and water to get the solution mass.',
            },
          },
          {
            id: 'p2',
            difficulty: 'medium',
            type: 'choice',
            options: ['20%', '25%', '15%', '30%'],
            question: {
              RU: 'Сколько грамм соли нужно добавить к 80г воды, чтобы получить 20% раствор?',
              KZ: '20% ерітінді алу үшін 80г суға қанша грамм тұз қосу керек?',
              EN: 'How many grams of salt need to be added to 80g of water to make a 20% solution?',
            },
            correctAnswer: '20%',
            hint: {
              RU: 'Пусть x - масса соли. Тогда x / (80 + x) = 0.2',
              KZ: 'x - тұздың массасы болсын. Сонда x / (80 + x) = 0.2',
              EN: 'Let x be the mass of salt. Then x / (80 + x) = 0.2',
            },
          },
        ],
        attachments: [],
        assignments: []
      }
    ]
  },
  {
    id: 'c3',
    title: {
      RU: 'Химия растворов: Расчеты',
      KZ: 'Ерітінділер химиясы: Есептеулер',
      EN: 'Solution Chemistry: Calculations',
    },
    description: {
      RU: 'Задачи на молярность, нормальность и приготовление растворов.',
      KZ: 'Молярлыққа, нормальдыққа және ерітінділерді дайындауға арналған есептер.',
      EN: 'Problems on molarity, normality, and solution preparation.',
    },
    lessons: [
      {
        id: 'l3_1',
        title: {
          RU: 'Практические задачи',
          KZ: 'Практикалық есептер',
          EN: 'Practical Problems',
        },
        theory: {
          RU: 'Молярность (M) = моль/л. Нормальность (N) = экв/л. \n\n Формулы:\n m = C_M * V * M_w\n m = C_N * V * Eq',
          KZ: 'Молярлық (M) = моль/л. Нормальдық (N) = экв/л. \n\n Формулалар:\n m = C_M * V * M_w\n m = C_N * V * Eq',
          EN: 'Molarity (M) = mol/L. Normality (N) = eq/L. \n\n Formulas:\n m = C_M * V * M_w\n m = C_N * V * Eq',
        },
        example: {
            RU: 'Для 1л 1М NaCl нужно 58.5г соли.',
            KZ: '1л 1М NaCl үшін 58.5г тұз қажет.',
            EN: 'For 1L of 1M NaCl, 58.5g of salt is needed.',
        },
        problems: [
            // EASY
            {
                id: 'p_sol_1',
                difficulty: 'easy',
                type: 'numeric_with_unit',
                question: {
                    RU: 'Для приготовления 250 мл 0,20 М раствора NaOH, сколько грамм NaOH необходимо?',
                    KZ: '250 мл көлемдегі 0,20 М NaOH ерітіндісін дайындау үшін қанша грамм NaOH қажет?',
                    EN: 'How many grams of NaOH are needed to prepare 250 ml of a 0.20 M NaOH solution?',
                },
                correctAnswer: '2',
                numericAnswer: 2,
                acceptableError: 5,
                correctUnit: 'g',
                options: ['g', 'mg', 'kg', 'mol', 'ml'],
                hint: {
                    RU: 'Используйте формулу m = M * V * MolarMass. M(NaOH) = 40 г/моль.',
                    KZ: 'm = M * V * MolarMass формуласын қолданыңыз. M(NaOH) = 40 г/моль.',
                    EN: 'Use formula m = M * V * MolarMass. M(NaOH) = 40 g/mol.',
                }
            },
            {
                id: 'p_sol_2',
                difficulty: 'easy',
                type: 'numeric_with_unit',
                question: {
                    RU: 'Сколько грамм H₂SO₄ нужно для приготовления 150 мл 0,6 Н раствора?',
                    KZ: '150 мл көлемдегі 0,6 Н H₂SO₄ ерітіндісін дайындау үшін қанша грамм H₂SO₄ керек?',
                    EN: 'How many grams of H₂SO₄ are needed to prepare 150 ml of a 0.6 N solution?',
                },
                correctAnswer: '4.41',
                numericAnswer: 4.41,
                acceptableError: 5,
                correctUnit: 'g',
                options: ['g', 'mg', 'mol', 'L'],
                hint: {
                    RU: 'Эквивалентная масса H₂SO₄ = 98/2 = 49 г/экв. m = N * V * Eq.',
                    KZ: 'H₂SO₄ эквиваленттік массасы = 98/2 = 49 г/экв. m = N * V * Eq.',
                    EN: 'Equivalent mass of H₂SO₄ = 98/2 = 49 g/eq. m = N * V * Eq.',
                }
            },
            // MEDIUM
            {
                id: 'p_sol_3',
                difficulty: 'medium',
                type: 'numeric_with_unit',
                question: {
                    RU: '400 мл раствора содержат 2,45 г H₃PO₄. Найдите нормальность раствора.',
                    KZ: '400 мл ерітінді құрамында 2,45 г H₃PO₄ бар. Ерітіндінің нормалдық концентрациясын табыңдар:',
                    EN: '400 ml of solution contains 2.45 g of H₃PO₄. Find the normality of the solution.',
                },
                correctAnswer: '0.1875',
                numericAnswer: 0.1875,
                acceptableError: 10,
                correctUnit: 'N',
                options: ['M', 'N', 'g/mol', '%', 'mol/L'],
                hint: {
                    RU: 'N = m / (Eq * V). Eq(H₃PO₄) ≈ 32.7 г/экв.',
                    KZ: 'N = m / (Eq * V). Eq(H₃PO₄) ≈ 32.7 г/экв.',
                    EN: 'N = m / (Eq * V). Eq(H₃PO₄) ≈ 32.7 g/eq.',
                }
            },
            {
                id: 'p_sol_4',
                difficulty: 'medium',
                type: 'numeric_with_unit',
                question: {
                    RU: 'Сколько грамм Ca(OH)₂ нужно для 500 мл 0,15 Н раствора?',
                    KZ: '500 мл көлемдегі 0,15 Н Ca(OH)₂ ерітіндісін дайындау үшін қанша грамм Ca(OH)₂ қажет?',
                    EN: 'How many grams of Ca(OH)₂ are needed for 500 ml of 0.15 N solution?',
                },
                correctAnswer: '2.775',
                numericAnswer: 2.775,
                acceptableError: 5,
                correctUnit: 'g',
                options: ['g', 'kg', 'mg', 'mol'],
                hint: {
                    RU: 'Eq(Ca(OH)₂) = 74/2 = 37. m = N * V * Eq.',
                    KZ: 'Eq(Ca(OH)₂) = 74/2 = 37. m = N * V * Eq.',
                    EN: 'Eq(Ca(OH)₂) = 74/2 = 37. m = N * V * Eq.',
                }
            },
            {
                id: 'p_sol_5',
                difficulty: 'medium',
                type: 'numeric_with_unit',
                question: {
                    RU: 'Смешали 200 мл 0,3 Н NaOH и 100 мл 0,6 Н NaOH. Найдите нормальность смеси.',
                    KZ: '200 мл 0,30 Н NaOH ерітіндісін және 100 мл 0,60 Н NaOH ерітіндісін араластырды. Қоспаның нормалдық концентрациясын табыңдар.',
                    EN: 'Mixed 200 ml of 0.3 N NaOH and 100 ml of 0.6 N NaOH. Find the normality of the mixture.',
                },
                correctAnswer: '0.4',
                numericAnswer: 0.4,
                acceptableError: 5,
                correctUnit: 'N',
                options: ['M', 'N', 'mol', '%'],
                hint: {
                    RU: 'Найдите общее количество эквивалентов и разделите на общий объем.',
                    KZ: 'Жалпы эквиваленттер санын тауып, жалпы көлемге бөліңіз.',
                    EN: 'Find total equivalents and divide by total volume.',
                }
            },
            // HARD
            {
                id: 'p_sol_6',
                difficulty: 'hard',
                type: 'numeric_with_unit',
                question: {
                    RU: 'Сколько мл концентрированной H₂SO₄ (98%, 1,84 г/мл) нужно для приготовления 250 мл 2,0 Н раствора?',
                    KZ: 'Концентрлі H₂SO₄: массалық үлесі 98%, тығыздығы 1,84 г/мл. Осындай концентрлі қышқылдан 250 мл 2,0 Н H₂SO₄ ерітіндісін дайындау үшін қанша мл концентрлі H₂SO₄ алу керек?',
                    EN: 'How many ml of concentrated H₂SO₄ (98%, 1.84 g/ml) are needed to prepare 250 ml of 2.0 N solution?',
                },
                correctAnswer: '13.6',
                numericAnswer: 13.6,
                acceptableError: 5,
                correctUnit: 'ml',
                options: ['ml', 'L', 'g', 'cm3'],
                hint: {
                    RU: 'Найдите массу чистого вещества, затем массу раствора 98%, затем объем через плотность.',
                    KZ: 'Таза заттың массасын, содан кейін 98% ерітіндінің массасын, содан кейін тығыздық арқылы көлемді табыңыз.',
                    EN: 'Find mass of pure substance, then mass of 98% solution, then volume via density.',
                }
            },
            {
                id: 'p_sol_7',
                difficulty: 'hard',
                type: 'numeric_with_unit',
                question: {
                    RU: 'Смешали 100 мл 0,5 М H₂SO₄ и 200 мл 0,3 М H₃PO₄. Найдите общую нормальность смеси.',
                    KZ: '100 мл 0,50 М H₂SO₄ және 200 мл 0,30 М H₃PO₄ ерітінділерін араластырды. Қоспаның жалпы нормалдық концентрациясын есептеңдер.',
                    EN: 'Mixed 100 ml 0.5 M H₂SO₄ and 200 ml 0.3 M H₃PO₄. Calculate total normality.',
                },
                correctAnswer: '0.933',
                numericAnswer: 0.933,
                acceptableError: 5,
                correctUnit: 'N',
                options: ['M', 'N', 'eq/L', 'mol/L'],
                hint: {
                    RU: 'H₂SO₄ (f=2), H₃PO₄ (f=3). Сложите все эквиваленты и разделите на 300 мл.',
                    KZ: 'H₂SO₄ (f=2), H₃PO₄ (f=3). Барлық эквиваленттерді қосып, 300 мл-ге бөліңіз.',
                    EN: 'H₂SO₄ (f=2), H₃PO₄ (f=3). Sum all equivalents and divide by 300 ml.',
                }
            }
        ],
        attachments: [],
        assignments: []
      }
    ]
  },
  {
    id: 'c2',
    title: {
      RU: 'Органическая химия: Алканы',
      KZ: 'Органикалық химия: Алкандар',
      EN: 'Organic Chemistry: Alkanes',
    },
    description: {
      RU: 'Введение в насыщенные углеводороды.',
      KZ: 'Қаныққан көмірсутектерге кіріспе.',
      EN: 'Introduction to saturated hydrocarbons.',
    },
    lessons: []
  }
];