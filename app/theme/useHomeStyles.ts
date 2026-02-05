import { StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';

export const useHomeStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 24,
    },
    header: {
      marginTop: 20,
      marginBottom: 40,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
    },
    subtitle: {
      fontSize: 16,
      color: colors.muted,
      marginTop: 6,
    },
    primaryButton: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: 'center',
      marginTop: 30,
    },
    primaryButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
    card: {
      backgroundColor: colors.card,
      padding: 18,
      borderRadius: 14,
      marginTop: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '500',
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 24,
    },
    logoutButton: {
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    logoutText: {
      color: '#FF3B30',
      fontWeight: '600',
    },
  });
};
