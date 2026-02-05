import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkColors, lightColors } from './colors';

export type ThemeMode = 'system' | 'light' | 'dark';

type ThemeContextType = {
  colors: typeof lightColors;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType>(null as any);

export const ThemeProvider = ({ children }: any) => {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');

  useEffect(() => {
    AsyncStorage.getItem('themeMode').then(saved => {
      if (saved) setMode(saved as ThemeMode);
    });
  }, []);

  const setModeState = (newMode: ThemeMode) => {
    setMode(newMode);
    AsyncStorage.setItem('themeMode', newMode);

    if (newMode === 'light') Appearance.setColorScheme('light');
    if (newMode === 'dark') Appearance.setColorScheme('dark');
  };

  const effectiveMode = mode === 'system' ? systemScheme : mode;

  const colors = effectiveMode === 'dark' ? darkColors : lightColors;

  const value = useMemo(
    () => ({ colors, mode, setMode: setModeState }),
    [colors, mode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
