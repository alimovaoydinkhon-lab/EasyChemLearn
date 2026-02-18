import React from 'react';
import { Language } from '../types';

interface Props {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'KZ', label: 'Қазақ' },
  { code: 'RU', label: 'Русский' },
  { code: 'EN', label: 'English' },
];

export const LanguageSwitcher: React.FC<Props> = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="flex items-center bg-gray-100 p-1 rounded-lg">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => onLanguageChange(code)}
          className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200 ${
            currentLang === code
              ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5 scale-105'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="hidden sm:inline">{label}</span>
          <span className="sm:hidden">{code}</span>
        </button>
      ))}
    </div>
  );
};