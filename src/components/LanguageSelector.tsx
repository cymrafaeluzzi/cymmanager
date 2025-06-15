import React from 'react';
import { useLanguage, Language } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' }
  ];

  return (
    <div className="relative inline-block w-full">
      <div className="flex items-center space-x-3 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
        <Globe className="w-5 h-5 text-gray-500" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-transparent border-none outline-none text-sm font-medium text-gray-700 cursor-pointer flex-1"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
               {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;