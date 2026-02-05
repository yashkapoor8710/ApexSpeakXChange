import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AppLanguage = 'system' | 'en' | 'hi';

interface LanguageContextValue {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
}

const LanguageContext = createContext<LanguageContextValue>(null as any);

const STORAGE_KEY = 'APP_LANGUAGE';

export function LanguageProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [currentLanguage, setCurrentLanguage] = useState<AppLanguage>('system');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(saved => {
      if (saved === 'system' || saved === 'en' || saved === 'hi') {
        setCurrentLanguage(saved);
      }
    });
  }, []);

  const setLanguage = (value: AppLanguage) => {
    setCurrentLanguage(value);
    AsyncStorage.setItem(STORAGE_KEY, value);
  };

  const contextValue = useMemo(
    () => ({ language: currentLanguage, setLanguage }),
    [currentLanguage],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
