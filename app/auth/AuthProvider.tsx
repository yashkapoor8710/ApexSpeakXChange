import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextValue {
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  initializing: boolean;
}

const AuthContext = createContext<AuthContextValue>(null as any);

const STORAGE_KEY = 'APP_AUTH';

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // Restore auth state on app start
  useEffect(() => {
    const restoreAuth = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      setIsLoggedIn(stored === 'true');
      setInitializing(false);
    };

    restoreAuth();
  }, []);

  const login = async () => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem(STORAGE_KEY, 'true');
  };

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({ isLoggedIn, login, logout, initializing }),
    [initializing, isLoggedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
