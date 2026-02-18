import React, { useState, useEffect } from 'react';
import { User, Role, Language, Course, Lesson, Problem, Group, Attachment, Assignment } from './types';
import { TRANSLATIONS, MOCK_COURSES, MOTIVATIONAL_QUOTES } from './constants';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { getAIHint } from './services/geminiService';
import { auth, db } from './services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment, 
  collection,
  query,
  where,
  getDocs,
  addDoc
} from 'firebase/firestore';

import { 
  Beaker, 
  GraduationCap, 
  Users, 
  BarChart3, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Lightbulb, 
  LogOut, 
  Award,
  Shield,
  Plus,
  Mail,
  Lock,
  Menu,
  X,
  FileText,
  Upload,
  Trash2,
  Edit2,
  Save,
  File,
  Download,
  ChevronRight,
  ChevronLeft,
  FileVideo,
  FileImage,
  FileArchive,
  MoreVertical,
  PieChart as PieChartIcon,
  Activity,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Custom Logo Component
const ChemLogo: React.FC<{ size?: string, className?: string }> = ({ size = "w-12 h-12", className = "" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${size} ${className}`}
  >
    <path d="M4.5 9l7.5-4.5 7.5 4.5v9l-7.5 4.5-7.5-4.5z" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 7.5v-3" />
    <circle cx="12" cy="3" r="1.5" fill="currentColor" />
  </svg>
);

// 1. Auth Component
const AuthScreen: React.FC<{ 
  lang: Language; 
  onLanguageChange: (lang: Language) => void;
}> = ({ lang, onLanguageChange }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegister) {
        // Register flow
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Save extra user details to Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: name,
          email: email,
          role: selectedRole,
          createdAt: new Date(),
          stats: { correct: 0, wrong: 0 }
        });
      } else {
        // Login flow
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential') {
        setError(lang === 'RU' ? 'Неверный email или пароль' : lang === 'KZ' ? 'Email немесе құпиясөз қате' : 'Invalid email or password');
      } else if (err.code === 'auth/email-already-in-use') {
        setError(lang === 'RU' ? 'Email уже используется' : lang === 'KZ' ? 'Email тіркелген' : 'Email already in use');
      } else if (err.code === 'auth/weak-password') {
         setError(lang === 'RU' ? 'Пароль слишком слабый' : lang === 'KZ' ? 'Құпиясөз тым әлсіз' : 'Password is too weak');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-500 p-4 relative">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher currentLang={lang} onLanguageChange={onLanguageChange} />
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full shadow-inner">
            <ChemLogo className="text-indigo-600" size="w-16 h-16" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">EasyChemLearn</h1>
        <p className="text-center text-gray-500 mb-8">{TRANSLATIONS.welcome[lang]}</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center font-medium border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <div className="relative">
                 <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="John Doe"
                  required
                />
                <Users className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
          )}

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
             <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="student@example.com"
                  required
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
             </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
             <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="••••••••"
                  required
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
             </div>
          </div>

          {isRegister && (
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{TRANSLATIONS.roleSelect[lang]}</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    type="button"
                    onClick={() => setSelectedRole('student')}
                    className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                      selectedRole === 'student' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    <GraduationCap className="w-6 h-6" />
                    <span>{TRANSLATIONS.student[lang]}</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setSelectedRole('teacher')}
                    className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                      selectedRole === 'teacher' ? 'border-teal-600 bg-teal-50 text-teal-600' : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    <Users className="w-6 h-6" />
                    <span>{TRANSLATIONS.teacher[lang]}</span>
                  </button>
                </div>
             </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 rounded-lg transition-colors mt-6 shadow-md flex justify-center items-center"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isRegister ? TRANSLATIONS.register[lang] : TRANSLATIONS.login[lang])}
          </button>
        </form>
        
        <div className="mt-4 text-center">
            <button 
                onClick={() => setIsRegister(!isRegister)}
                className="text-sm text-indigo-600 hover:underline"
            >
                {isRegister ? 'Already have an account? Log In' : 'Need an account? Register'}
            </button>
        </div>
      </div>
    </div>
  );
};

// 2. Student Dashboard
const StudentDashboard: React.FC<{
  user: User;
  lang: Language;
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}> = ({ user, lang, courses, onSelectCourse }) => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{TRANSLATIONS.welcome[lang]}, {user.name}!</h2>
        <div className="h-2 w-32 bg-indigo-500 rounded-full"></div>
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5" /> {TRANSLATIONS.courses[lang]}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 group">
            <div className="h-40 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <ChemLogo className="text-white/80" size="w-20 h-20" />
            </div>
            <div className="p-5">
              <h4 className="font-bold text-lg text-gray-800 mb-2">{course.title[lang]}</h4>
              <p className="text-sm text-gray-500 mb-4 h-12 overflow-hidden">{course.description[lang]}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded">
                  {course.lessons.length} Lessons
                </span>
                <button 
                  onClick={() => onSelectCourse(course)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  {TRANSLATIONS.start[lang]}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Course/Lesson View
const LessonView: React.FC<{
  user: User;
  course: Course;
  lang: Language;
  onComplete: () => void;
  onBack: () => void;
}> = ({ user, course, lang, onComplete, onBack }) => {
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [currentProblemIdx, setCurrentProblemIdx] = useState(0);
  const [viewState, setViewState] = useState<'theory' | 'practice'>('theory');
  const [userAnswer, setUserAnswer] = useState('');
  
  // New State for numeric inputs
  const [userNumericValue, setUserNumericValue] = useState('');
  const [userUnit, setUserUnit] = useState('');

  // States for Problem Solving Logic
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect' | 'failed' | 'unit_error' | 'value_error'>('none');
  const [attempts, setAttempts] = useState(0);
  const [showMotivational, setShowMotivational] = useState(false);
  const [hasUsedHint, setHasUsedHint] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  
  const [aiHint, setAiHint] = useState<string | null>(null);
  const [loadingHint, setLoadingHint] = useState(false);

  // Local stats state for immediate UI feedback (also synced to DB)
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });

  const lesson = course.lessons[currentLessonIdx];
  
  if (!lesson) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl">No lessons available.</h2>
        <button onClick={onBack} className="mt-4 text-indigo-600 underline">Back</button>
      </div>
    );
  }

  const problem = lesson.problems[currentProblemIdx];
  const motivationalQuote = MOTIVATIONAL_QUOTES[lang][Math.floor(Math.random() * MOTIVATIONAL_QUOTES[lang].length)];

  // Helper to update Firestore
  const updateProgress = async (isCorrect: boolean) => {
    try {
        const userRef = doc(db, "users", user.id);
        if (isCorrect) {
            await updateDoc(userRef, {
                "stats.correct": increment(1),
                [`progress.${course.id}`]: increment(5) // Example increment
            });
        } else {
            await updateDoc(userRef, {
                "stats.wrong": increment(1)
            });
        }
    } catch (e) {
        console.error("Failed to update progress", e);
    }
  };

  const handleCheckAnswer = async () => {
    let isCorrect = false;
    let specificError: 'none' | 'unit' | 'value' = 'none';

    // 1. Validation Logic based on Type
    if (problem.type === 'numeric_with_unit') {
        if (!userNumericValue || !userUnit) return;
        
        const val = parseFloat(userNumericValue.replace(',', '.'));
        const correctVal = problem.numericAnswer || 0;
        const margin = problem.acceptableError || 5; // Default 5%
        
        const min = correctVal * (1 - margin / 100);
        const max = correctVal * (1 + margin / 100);
        
        const isValueCorrect = val >= min && val <= max;
        const isUnitCorrect = userUnit === problem.correctUnit;

        if (isValueCorrect && isUnitCorrect) {
            isCorrect = true;
        } else if (isValueCorrect && !isUnitCorrect) {
            specificError = 'unit';
        } else {
            specificError = 'value';
        }
    } else {
        // Classic Text/Choice Logic
        isCorrect = userAnswer.toLowerCase().trim() === problem.correctAnswer.toLowerCase().trim();
    }
    
    // 2. Scoring & Feedback Logic
    if (isCorrect) {
      // Calculate Points
      let points = 0;
      if (hasUsedHint) {
          points = 0.3;
      } else if (attempts === 0) {
          points = 1.0;
      } else {
          points = 0.5;
      }
      setEarnedPoints(points);

      setFeedback('correct');
      setStats(s => ({ ...s, correct: s.correct + 1 }));
      await updateProgress(true); // In real app, send specific 'points' too
      
      // Show motivational screen
      setTimeout(() => setShowMotivational(true), 800);
    } else {
      // Handle Failure
      if (attempts === 0) {
        setAttempts(1);
        setStats(s => ({ ...s, wrong: s.wrong + 1 }));
        
        if (specificError === 'unit') {
            setFeedback('unit_error');
        } else if (specificError === 'value') {
            setFeedback('value_error');
        } else {
            setFeedback('incorrect');
        }
        await updateProgress(false);
      } 
      else {
        // Second wrong attempt (Fail condition)
        setFeedback('failed');
        setStats(s => ({ ...s, wrong: s.wrong + 1 }));
        await updateProgress(false);
        
        // Auto-load similar task after delay
        setTimeout(() => {
             handleNext(true); // true = force similar/next task due to failure
        }, 2500);
      }
    }
  };

  const handleNext = (isFailureSwap = false) => {
    setFeedback('none');
    setUserAnswer('');
    setUserNumericValue('');
    setUserUnit('');
    setAiHint(null);
    setShowMotivational(false);
    setAttempts(0); // Reset attempts for new problem
    setHasUsedHint(false);
    setEarnedPoints(0);

    if (currentProblemIdx < lesson.problems.length - 1) {
      setCurrentProblemIdx(prev => prev + 1);
    } else {
      // End of problems for this lesson
      if (currentLessonIdx < course.lessons.length - 1) {
        setCurrentLessonIdx(prev => prev + 1);
        setCurrentProblemIdx(0);
        setViewState('theory');
      } else {
        onComplete();
      }
    }
  };

  const handleGetHint = async () => {
    if (loadingHint) return;
    setLoadingHint(true);
    setHasUsedHint(true); // Mark hint as used for scoring
    if (!aiHint) {
        const promptText = problem.type === 'numeric_with_unit' 
            ? `Value: ${userNumericValue}, Unit: ${userUnit}` 
            : userAnswer;

        const hint = await getAIHint(
            problem.question[lang],
            promptText,
            problem.correctAnswer,
            lang
        );
        setAiHint(hint);
    }
    setLoadingHint(false);
  };

  if (showMotivational) {
      return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-600/95 backdrop-blur-sm animate-fade-in text-white cursor-pointer" onClick={() => handleNext()}>
              <div className="text-center p-8 max-w-lg">
                  <div className="bg-white/20 p-6 rounded-full inline-block mb-6 animate-bounce">
                      <Award className="w-16 h-16" />
                  </div>
                  <h2 className="text-4xl font-bold mb-6">{TRANSLATIONS.correct[lang]}</h2>
                  <p className="text-2xl font-bold text-yellow-300 mb-2">+{earnedPoints} {TRANSLATIONS.points[lang]}</p>
                  <p className="text-xl italic opacity-90 leading-relaxed">"{motivationalQuote}"</p>
                  <div className="mt-12 flex items-center justify-center gap-2 opacity-70 text-sm uppercase tracking-widest animate-pulse">
                      <span>Click to continue</span> <ArrowRight className="w-4 h-4" />
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700 mr-4">
          &larr; Back
        </button>
        <h2 className="text-xl font-bold text-gray-800 flex-1">{course.title[lang]}</h2>
        <div className="text-sm font-medium text-gray-500 flex gap-4">
            <span className="text-green-600 flex items-center gap-1"><CheckCircle className="w-4 h-4"/> {stats.correct}</span>
            <span className="text-red-500 flex items-center gap-1"><XCircle className="w-4 h-4"/> {stats.wrong}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col border border-gray-100 relative">
        {/* Loading Overlay for Similar Task */}
        {feedback === 'failed' && (
            <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center animate-fade-in backdrop-blur-sm">
                <RefreshCw className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <h3 className="text-xl font-bold text-gray-800">{TRANSLATIONS.loadingSimilar[lang]}</h3>
                <p className="text-gray-500">Generating new challenge...</p>
            </div>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2">
            <div 
              className="bg-indigo-500 h-2 transition-all duration-300" 
              style={{ width: `${((currentLessonIdx * 100) + ((currentProblemIdx + (viewState === 'practice' ? 1 : 0)) / (lesson.problems.length + 1) * 100)) / course.lessons.length}%` }}
            ></div>
        </div>

        <div className="p-6 md:p-8 flex-1 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4 gap-4">
                <h3 className="text-xl font-bold text-indigo-700">{lesson.title[lang]}</h3>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setViewState('theory')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewState === 'theory' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {TRANSLATIONS.theory[lang]}
                    </button>
                    <button 
                         onClick={() => setViewState('practice')}
                         className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewState === 'practice' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {TRANSLATIONS.practice[lang]}
                    </button>
                </div>
            </div>

            {viewState === 'theory' ? (
                <div className="prose max-w-none animate-fade-in flex-1 overflow-y-auto pr-2">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-6 border border-blue-100">
                         <h4 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            {TRANSLATIONS.theory[lang]}
                         </h4>
                         <p className="text-gray-700 whitespace-pre-line leading-relaxed">{lesson.theory[lang]}</p>
                    </div>

                    {lesson.formula && (
                        <div className="bg-amber-50 p-6 rounded-xl mb-6 border border-amber-100">
                             <h4 className="font-bold text-amber-800 mb-3">{TRANSLATIONS.formula[lang]}</h4>
                             <div className="bg-white p-4 rounded-lg border border-amber-200 font-mono text-center text-lg text-gray-800 shadow-sm">
                                 {lesson.formula[lang]}
                             </div>
                        </div>
                    )}

                    {lesson.algorithm && (
                        <div className="bg-purple-50 p-6 rounded-xl mb-6 border border-purple-100">
                             <h4 className="font-bold text-purple-800 mb-3">{TRANSLATIONS.algorithm[lang]}</h4>
                             <p className="text-gray-700 whitespace-pre-line font-medium">{lesson.algorithm[lang]}</p>
                        </div>
                    )}

                    <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                        <h4 className="font-bold text-green-800 mb-3">Example</h4>
                        <div className="bg-white/60 p-4 rounded-lg">
                             <p className="text-gray-700">{lesson.example[lang]}</p>
                        </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                        <button 
                            onClick={() => setViewState('practice')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-lg shadow-indigo-200 transition-all hover:scale-105"
                        >
                            {TRANSLATIONS.practice[lang]} <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="animate-fade-in flex flex-col flex-1 max-w-2xl mx-auto w-full">
                    <div className="mb-8 text-center">
                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-wide bg-indigo-50 px-3 py-1 rounded-full">
                            Problem {currentProblemIdx + 1} of {lesson.problems.length}
                        </span>
                        <p className="text-xl font-medium text-gray-800 mt-6 leading-relaxed">{problem.question[lang]}</p>
                    </div>

                    <div className="mb-8 space-y-4">
                        {problem.type === 'choice' && problem.options ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {problem.options.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setUserAnswer(opt)}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                                            userAnswer === opt 
                                            ? 'border-indigo-500 bg-indigo-50 shadow-md' 
                                            : 'border-gray-100 hover:border-indigo-200 bg-gray-50'
                                        } ${feedback !== 'none' && feedback !== 'incorrect' && feedback !== 'unit_error' && feedback !== 'value_error' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={feedback === 'correct' || feedback === 'failed'}
                                    >
                                        <span className="font-medium text-gray-700">{opt}</span>
                                    </button>
                                ))}
                            </div>
                        ) : problem.type === 'numeric_with_unit' ? (
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-bold text-gray-600 mb-1">{TRANSLATIONS.enterValue[lang]}</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={userNumericValue}
                                        onChange={(e) => setUserNumericValue(e.target.value)}
                                        disabled={feedback === 'correct' || feedback === 'failed'}
                                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none text-xl placeholder-gray-300 transition-colors"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="w-1/3">
                                    <label className="block text-sm font-bold text-gray-600 mb-1">{TRANSLATIONS.selectUnit[lang]}</label>
                                    <select 
                                        value={userUnit}
                                        onChange={(e) => setUserUnit(e.target.value)}
                                        disabled={feedback === 'correct' || feedback === 'failed'}
                                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none text-xl bg-white transition-colors"
                                    >
                                        <option value="">...</option>
                                        {problem.options?.map(u => (
                                            <option key={u} value={u}>{u}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <input
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                disabled={feedback === 'correct' || feedback === 'failed'}
                                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none text-xl text-center placeholder-gray-300 transition-colors"
                                placeholder="Type your answer..."
                            />
                        )}
                    </div>

                    {/* Feedback Section (Hint on 1st fail) */}
                    {(feedback === 'incorrect' || feedback === 'unit_error' || feedback === 'value_error') && (
                        <div className="bg-red-50 border border-red-200 p-6 rounded-xl mb-6 animate-fade-in shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <XCircle className="w-6 h-6 text-red-600" />
                                <div className="flex-1">
                                    <p className="font-bold text-red-800 text-lg">
                                        {feedback === 'unit_error' ? TRANSLATIONS.wrongUnit[lang] : 
                                         feedback === 'value_error' ? TRANSLATIONS.wrongValue[lang] : 
                                         TRANSLATIONS.incorrect[lang]}
                                    </p>
                                    <p className="text-sm text-red-600 font-medium">{TRANSLATIONS.attemptsLeft[lang]}: 1</p>
                                </div>
                            </div>
                            <div className="pl-0 md:pl-9">
                                <p className="text-gray-700 mb-4 bg-white p-3 rounded-lg border border-red-100">
                                    <span className="font-bold text-red-500">{TRANSLATIONS.hint[lang]}:</span> {problem.hint[lang]}
                                </p>
                                {aiHint && (
                                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-4">
                                        <div className="flex items-center gap-2 text-indigo-700 text-sm font-bold mb-2">
                                            <Lightbulb className="w-4 h-4" /> AI Assistance:
                                        </div>
                                        <p className="text-gray-700 italic text-sm leading-relaxed">{aiHint}</p>
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-4 mt-4">
                                    <button 
                                        onClick={() => {
                                            // Keep attempts state, just clear feedback to allow re-input
                                            setFeedback('none');
                                        }}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-bold shadow-sm"
                                    >
                                        {TRANSLATIONS.tryAgain[lang]}
                                    </button>
                                    {!aiHint && (
                                        <button 
                                            onClick={handleGetHint}
                                            disabled={loadingHint}
                                            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium hover:bg-indigo-200 flex items-center gap-2"
                                        >
                                           {loadingHint ? 'Thinking...' : <><Lightbulb className="w-4 h-4" /> {TRANSLATIONS.aiHint[lang]}</>}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-auto flex justify-center">
                        {feedback === 'none' && (
                            <button
                                onClick={handleCheckAnswer}
                                disabled={
                                    problem.type === 'numeric_with_unit' 
                                    ? (!userNumericValue || !userUnit) 
                                    : !userAnswer
                                }
                                className="w-full md:w-auto bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-12 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                {TRANSLATIONS.check[lang]} ({attempts === 0 ? '1' : '2'}/2)
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

// 4. Certificate Component (Rest of file remains unchanged)
const Certificate: React.FC<{
    user: User;
    course: Course;
    lang: Language;
    onClose: () => void;
}> = ({ user, course, lang, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-white p-2 max-w-3xl w-full rounded-xl shadow-2xl animate-fade-in relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
                    <X className="w-6 h-6" />
                </button>
                <div className="border-8 border-double border-indigo-200 p-8 md:p-12 text-center rounded-lg relative overflow-hidden bg-[#fffdf5]">
                    {/* Watermark */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                        <ChemLogo size="w-96 h-96" />
                    </div>
                    
                    <div className="flex justify-center mb-8">
                        <Award className="w-20 h-20 text-yellow-500 drop-shadow-lg" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 uppercase tracking-widest">{TRANSLATIONS.certificate[lang]}</h2>
                    
                    <p className="text-xl text-gray-600 mb-2 font-serif italic">This certifies that</p>
                    <h3 className="text-4xl font-bold text-indigo-800 mb-2 font-serif border-b-2 border-gray-300 inline-block px-8 py-2">{user.name}</h3>
                    <p className="text-lg text-gray-600 mt-4">{TRANSLATIONS.courseCompleted[lang]}</p>

                    <div className="my-10">
                        <span className="text-2xl font-bold text-gray-800 block">{course.title[lang]}</span>
                        <span className="text-gray-500">at EasyChemLearn Platform</span>
                    </div>

                    <div className="flex justify-between items-end mt-12 border-t-2 border-gray-200 pt-8 px-8">
                        <div className="text-left">
                            <p className="text-sm text-gray-400 uppercase tracking-wider">Date</p>
                            <p className="text-gray-700 font-medium font-serif text-lg">{new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                             <div className="h-16 w-32 border-b border-gray-400 mb-2 mx-auto flex items-end justify-center">
                                 <span className="font-script text-2xl text-indigo-900">Dr. Chem</span>
                             </div>
                             <p className="text-sm text-gray-400 uppercase tracking-wider">EasyChemLearn Director</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Teacher Components ---

// Problem Creator Modal
const ProblemModal: React.FC<{ 
    onSave: (problem: Problem) => void; 
    onClose: () => void; 
    lang: Language; 
}> = ({ onSave, onClose, lang }) => {
    const [qRU, setQRU] = useState('');
    const [qKZ, setQKZ] = useState('');
    const [qEN, setQEN] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [hRU, setHRU] = useState('');
    const [hKZ, setHKZ] = useState('');
    const [hEN, setHEN] = useState('');
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

    const handleSave = () => {
        const newProblem: Problem = {
            id: `p-${Date.now()}`,
            type: 'text',
            question: { RU: qRU, KZ: qKZ, EN: qEN },
            correctAnswer,
            hint: { RU: hRU, KZ: hKZ, EN: hEN },
            difficulty
        };
        onSave(newProblem);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <h3 className="font-bold text-lg text-gray-800">{TRANSLATIONS.addProblem[lang]}</h3>
                    <button onClick={onClose}><X className="w-5 h-5" /></button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 block">{TRANSLATIONS.question[lang]} (RU/KZ/EN)</label>
                        <input className="w-full border p-2 rounded" placeholder="RU" value={qRU} onChange={e => setQRU(e.target.value)} />
                        <input className="w-full border p-2 rounded" placeholder="KZ" value={qKZ} onChange={e => setQKZ(e.target.value)} />
                        <input className="w-full border p-2 rounded" placeholder="EN" value={qEN} onChange={e => setQEN(e.target.value)} />
                    </div>
                    
                    <div>
                         <label className="text-sm font-bold text-gray-600 block mb-1">{TRANSLATIONS.answer[lang]}</label>
                         <input className="w-full border p-2 rounded" value={correctAnswer} onChange={e => setCorrectAnswer(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 block">{TRANSLATIONS.hint[lang]} (RU/KZ/EN)</label>
                        <input className="w-full border p-2 rounded" placeholder="RU" value={hRU} onChange={e => setHRU(e.target.value)} />
                        <input className="w-full border p-2 rounded" placeholder="KZ" value={hKZ} onChange={e => setHKZ(e.target.value)} />
                        <input className="w-full border p-2 rounded" placeholder="EN" value={hEN} onChange={e => setHEN(e.target.value)} />
                    </div>
                    
                    <div>
                         <label className="text-sm font-bold text-gray-600 block mb-1">{TRANSLATIONS.difficulty[lang]}</label>
                         <select className="w-full border p-2 rounded bg-white" value={difficulty} onChange={e => setDifficulty(e.target.value as any)}>
                             <option value="easy">{TRANSLATIONS.easy[lang]}</option>
                             <option value="medium">{TRANSLATIONS.medium[lang]}</option>
                             <option value="hard">{TRANSLATIONS.hard[lang]}</option>
                         </select>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button onClick={handleSave} className="flex-1 bg-indigo-600 text-white p-3 rounded-lg font-bold">{TRANSLATIONS.save[lang]}</button>
                        <button onClick={onClose} className="flex-1 bg-gray-200 text-gray-700 p-3 rounded-lg font-bold">{TRANSLATIONS.cancel[lang]}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Course Management Component
const CourseManager: React.FC<{ lang: Language; courses: Course[]; onUpdateCourses: () => void }> = ({ lang, courses, onUpdateCourses }) => {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
    const [showProblemModal, setShowProblemModal] = useState(false);
    
    // New Course State
    const [isCreatingCourse, setIsCreatingCourse] = useState(false);
    const [newCourseTitleRU, setNewCourseTitleRU] = useState('');
    const [newCourseTitleKZ, setNewCourseTitleKZ] = useState('');
    const [newCourseTitleEN, setNewCourseTitleEN] = useState('');
    const [newCourseDesc, setNewCourseDesc] = useState('');

    const handleCreateCourse = async () => {
        if (!newCourseTitleRU) return;
        
        const newCourse = {
            title: { RU: newCourseTitleRU, KZ: newCourseTitleKZ || newCourseTitleRU, EN: newCourseTitleEN || newCourseTitleRU },
            description: { RU: newCourseDesc, KZ: newCourseDesc, EN: newCourseDesc },
            lessons: []
        };
        
        await addDoc(collection(db, "courses"), newCourse);
        setIsCreatingCourse(false);
        setNewCourseTitleRU('');
        onUpdateCourses();
    };

    // Note: To fully implement saving lessons/problems, we would need to fetch the doc ref
    // For MVP we will just mock the update local flow but now connected to creating new courses

    // Handlers
    const handleAddLesson = () => {
        if (!selectedCourse) return;
        // In a real app, we would update Firestore here
        alert("Lesson creation connected to Firestore would go here. For demo, only Course creation is fully wired to DB.");
    };

    // Generic File Upload Handler
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
         // Placeholder
    };

    const getFileIcon = (type: Attachment['type']) => {
        switch(type) {
            case 'video': return <FileVideo className="w-5 h-5 text-red-500" />;
            case 'image': return <FileImage className="w-5 h-5 text-purple-500" />;
            case 'archive': return <FileArchive className="w-5 h-5 text-yellow-600" />;
            case 'pdf': return <FileText className="w-5 h-5 text-red-600" />;
            case 'doc': return <FileText className="w-5 h-5 text-blue-600" />;
            default: return <File className="w-5 h-5 text-gray-500" />;
        }
    };

    // 1. Course List View
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
             {courses.map(course => (
                 <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedCourse(course)}>
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{course.title[lang]}</h3>
                      <p className="text-sm text-gray-500">{course.lessons.length} topics</p>
                 </div>
             ))}
             
             {!isCreatingCourse ? (
                 <button 
                    onClick={() => setIsCreatingCourse(true)}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors"
                 >
                     <Plus className="w-8 h-8 mb-2" />
                     <span className="font-bold">New Course</span>
                 </button>
             ) : (
                 <div className="bg-white rounded-xl shadow-md border border-indigo-200 p-6 flex flex-col gap-3">
                     <h3 className="font-bold text-gray-800">New Course</h3>
                     <input className="border p-2 rounded" placeholder="Title (RU)" value={newCourseTitleRU} onChange={e => setNewCourseTitleRU(e.target.value)} />
                     <input className="border p-2 rounded" placeholder="Title (KZ)" value={newCourseTitleKZ} onChange={e => setNewCourseTitleKZ(e.target.value)} />
                     <input className="border p-2 rounded" placeholder="Title (EN)" value={newCourseTitleEN} onChange={e => setNewCourseTitleEN(e.target.value)} />
                     <textarea className="border p-2 rounded" placeholder="Description" value={newCourseDesc} onChange={e => setNewCourseDesc(e.target.value)} />
                     <div className="flex gap-2">
                         <button onClick={handleCreateCourse} className="flex-1 bg-indigo-600 text-white py-2 rounded font-bold text-sm">Create</button>
                         <button onClick={() => setIsCreatingCourse(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-bold text-sm">Cancel</button>
                     </div>
                 </div>
             )}
        </div>
    );
};

// 5. Teacher Dashboard
const TeacherDashboard: React.FC<{ lang: Language; courses: Course[]; onUpdateCourses: () => void }> = ({ lang, courses, onUpdateCourses }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'content'>('overview');
    const [students, setStudents] = useState<any[]>([]);
    const [loadingStats, setLoadingStats] = useState(false);

    // Fetch real students from Firestore
    useEffect(() => {
        const fetchStudents = async () => {
            setLoadingStats(true);
            try {
                const q = query(collection(db, "users"), where("role", "==", "student"));
                const querySnapshot = await getDocs(q);
                // Fix: cast to any to allow spread on potential unknown type
                const studentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
                setStudents(studentsList);
            } catch (e) {
                console.error("Error fetching students:", e);
            } finally {
                setLoadingStats(false);
            }
        };

        if (activeTab === 'students' || activeTab === 'overview') {
            fetchStudents();
        }
    }, [activeTab]);

    // Calculate real stats
    const avgScore = students.length > 0 
        ? Math.round(students.reduce((acc, s) => acc + (s.stats?.correct || 0) / ( (s.stats?.correct || 0) + (s.stats?.wrong || 0) || 1) * 100, 0) / students.length)
        : 0;

    const comparativeData = students.slice(0, 5).map(s => ({
        name: s.name, 
        score: Math.round((s.stats?.correct || 0) / ((s.stats?.correct || 0) + (s.stats?.wrong || 0) || 1) * 100),
        classAvg: avgScore
    }));
    
    // Mock error data for now as we don't track error types in DB yet
    const errorFreqData = [
        { name: 'Formula', value: 45, color: '#6366f1' }, 
        { name: 'Unit', value: 30, color: '#ec4899' },   
        { name: 'Logic', value: 25, color: '#eab308' },  
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto h-full flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 shrink-0">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <Users className="w-8 h-8 text-indigo-600" /> {TRANSLATIONS.teacherDashboard[lang]}
                </h2>
                <div className="flex bg-white rounded-lg p-1 shadow-sm mt-4 md:mt-0">
                    {['overview', 'students', 'content'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-2 rounded-md capitalize font-medium transition-all ${activeTab === tab ? 'bg-indigo-100 text-indigo-800' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {TRANSLATIONS[tab] ? (TRANSLATIONS[tab] as any)[lang] : tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* OVERVIEW TAB - IMPROVED STATS */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                    
                    {/* Comparative Analysis */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-indigo-600" />
                            {TRANSLATIONS.comparativeAnalysis[lang]}
                        </h3>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={comparativeData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                                    <Tooltip cursor={{fill: '#f3f4f6'}} />
                                    <Legend />
                                    <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} name="Score" />
                                    <Bar dataKey="classAvg" fill="#94a3b8" radius={[4, 4, 0, 0]} name={TRANSLATIONS.classAverage[lang]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Error Frequency */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                         <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
                            <PieChartIcon className="w-5 h-5 text-indigo-600" />
                            {TRANSLATIONS.errorFrequency[lang]}
                        </h3>
                        <div className="h-72 flex justify-center items-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie 
                                        data={errorFreqData} 
                                        dataKey="value" 
                                        nameKey="name" 
                                        cx="50%" 
                                        cy="50%" 
                                        innerRadius={60} 
                                        outerRadius={80} 
                                        paddingAngle={5}
                                    >
                                        {errorFreqData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Quick Stats Cards */}
                    <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-green-100 text-green-600 rounded-full"><Activity className="w-6 h-6" /></div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase">{TRANSLATIONS.averageScore[lang]}</p>
                                <p className="text-2xl font-bold text-gray-800">{avgScore}%</p>
                            </div>
                        </div>
                         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-full"><Users className="w-6 h-6" /></div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase">{TRANSLATIONS.studentsList[lang]}</p>
                                <p className="text-2xl font-bold text-gray-800">{students.length} Active</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-red-100 text-red-600 rounded-full"><XCircle className="w-6 h-6" /></div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase">{TRANSLATIONS.dominantError[lang]}</p>
                                <p className="text-2xl font-bold text-gray-800">Formula</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* STUDENTS TAB - INDIVIDUAL STATS */}
            {activeTab === 'students' && (
                <div className="animate-fade-in bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-700">{TRANSLATIONS.individualStats[lang]}</h3>
                        <button className="text-indigo-600 text-sm font-bold border border-indigo-200 px-3 py-1 rounded hover:bg-indigo-50">
                            {TRANSLATIONS.exportCSV[lang]}
                        </button>
                    </div>
                    {loadingStats ? (
                        <div className="p-12 text-center text-gray-500">Loading student data...</div>
                    ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase">
                            <tr>
                                <th className="p-4">Student</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Correct</th>
                                <th className="p-4">Wrong</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {students.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-400">No students registered yet.</td></tr>
                            ) : students.map((s) => (
                                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-800">{s.name}</td>
                                    <td className="p-4 text-gray-600 text-sm">{s.email}</td>
                                    <td className="p-4 text-green-600 font-bold">{s.stats?.correct || 0}</td>
                                    <td className="p-4 text-red-500 font-bold">{s.stats?.wrong || 0}</td>
                                    <td className="p-4 text-right">
                                        <button className="text-gray-400 hover:text-indigo-600"><MoreVertical className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
                </div>
            )}
            
            {activeTab === 'content' && (
                 <CourseManager lang={lang} courses={courses} onUpdateCourses={onUpdateCourses} />
            )}
        </div>
    );
};

// 6. Admin Dashboard (Same as before)
const AdminDashboard: React.FC<{ lang: Language }> = ({ lang }) => {
    return (
        <div className="p-6 max-w-7xl mx-auto">
             <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <Shield className="w-8 h-8 text-red-600" /> {TRANSLATIONS.adminDashboard[lang]}
            </h2>
            {/* ... Admin content omitted for brevity, keeping structure ... */}
             <div className="bg-white p-12 text-center rounded-xl border border-gray-200 text-gray-400">
                Admin Panel Placeholder
            </div>
        </div>
    );
};

// --- Main App Component ---
const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  
  // Initialize lang from localStorage, default to 'RU'
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('appLanguage');
    return (saved === 'RU' || saved === 'KZ' || saved === 'EN') ? saved : 'RU';
  });

  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // Save language preference whenever it changes
  useEffect(() => {
    localStorage.setItem('appLanguage', lang);
  }, [lang]);
  
  // Fetch Courses from Firebase
  const fetchCourses = async () => {
      try {
          const querySnapshot = await getDocs(collection(db, "courses"));
          // Fix: cast to any to allow spread on potential unknown type
          const fetchedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) } as Course));
          if (fetchedCourses.length > 0) {
              // Merge with MOCK or replace? Let's just append for now to ensure base content exists
              // Or better, prefer DB courses but keep MOCK if DB is empty for demo purposes
              setCourses([...MOCK_COURSES, ...fetchedCourses]);
          }
      } catch (e) {
          console.error("Error fetching courses", e);
      }
  };

  useEffect(() => {
      fetchCourses();
  }, []);

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        try {
            if (firebaseUser) {
                // Fetch extra user details from Firestore
                const userRef = doc(db, "users", firebaseUser.uid);
                const userSnap = await getDoc(userRef);
                
                if (userSnap.exists()) {
                    // Fix: cast to any to access properties safely on unknown type
                    const userData = userSnap.data() as any;
                    setUser({
                        id: firebaseUser.uid,
                        name: userData.name || firebaseUser.email?.split('@')[0] || 'User',
                        email: firebaseUser.email || '',
                        role: userData.role || 'student',
                        progress: userData.progress
                    });
                } else {
                    // Fallback for users not in DB (shouldn't happen with app registration)
                    setUser({
                        id: firebaseUser.uid,
                        name: firebaseUser.email?.split('@')[0] || 'User',
                        email: firebaseUser.email || '',
                        role: 'student'
                    });
                }
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setIsAuthLoading(false);
        }
    }, (error) => {
        console.error("Firebase Connection Error:", error);
        setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (isAuthLoading) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
              <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 animate-pulse">Loading EasyChemLearn...</h2>
          </div>
      );
  }
  
  if (!user) {
    return (
        <AuthScreen 
            lang={lang} 
            onLanguageChange={setLang}
        />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-40 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-800 cursor-pointer" onClick={() => setActiveCourse(null)}>
            <ChemLogo size="w-8 h-8" /> EasyChem
        </div>
        <div className="flex gap-4 items-center">
            <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
            <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500 uppercase">{user.role}</p>
            </div>
            <button onClick={handleLogout}><LogOut className="w-5 h-5 text-gray-500 hover:text-red-500" /></button>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto">
        {user.role === 'admin' ? (
            <AdminDashboard lang={lang} />
        ) : user.role === 'teacher' ? (
            <TeacherDashboard lang={lang} courses={courses} onUpdateCourses={fetchCourses} />
        ) : (
            activeCourse ? (
                <LessonView 
                    user={user}
                    course={activeCourse} 
                    lang={lang} 
                    onBack={() => setActiveCourse(null)}
                    onComplete={() => setShowCertificate(true)}
                />
            ) : (
                <StudentDashboard user={user} lang={lang} courses={courses} onSelectCourse={setActiveCourse} />
            )
        )}
      </main>
      
      {showCertificate && activeCourse && user && (
          <Certificate user={user} course={activeCourse} lang={lang} onClose={() => { setShowCertificate(false); setActiveCourse(null); }} />
      )}
    </div>
  );
};

export default App;