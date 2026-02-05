import { StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';

export const useLanguageStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 15,
      color: colors.muted,
      marginBottom: 20,
    },
    card: {
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      marginBottom: 12,
    },
    selected: {
      borderColor: colors.primary,
    },
    cardText: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: 'center',
      marginTop: 30,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
  });
};
