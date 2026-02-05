import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import AlternateIcons from 'react-native-alternate-icons';
import { Appearance, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './app/theme/ThemeProvider';
import { LanguageProvider } from './app/language/LanguageProvider';
import { AuthProvider } from './app/auth/AuthProvider';
import { RootNavigator } from './app/navigation/RootNavigator';

export default function App() {
  const isDark = Appearance.getColorScheme() === 'dark';

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  useEffect(() => {
    AlternateIcons.setIconName(isDark ? 'AppIconDark' : null);
  }, [isDark]);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <StatusBar barStyle={isDark ? 'dark-content' : 'light-content'} />
          <AuthProvider>
            <RootNavigator />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
