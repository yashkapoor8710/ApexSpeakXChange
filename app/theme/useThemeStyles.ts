import { StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';

export const useThemedStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 28,
      justifyContent: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      marginBottom: 10,
      color: colors.text,
    },
    subtitle: {
      fontSize: 16,
      color: colors.muted,
      marginBottom: 40,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      padding: 14,
      fontSize: 18,
      marginBottom: 20,
      color: colors.text,
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
  });
};
