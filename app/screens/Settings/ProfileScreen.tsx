import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import { useHomeStyles } from '../../theme/useHomeStyles';
import { useAuth } from '../../auth/AuthProvider';

const languages = [
  { label: 'System Default', value: 'system' },
  { label: 'English', value: 'en' },
  { label: 'Hindi', value: 'hi' },
];

const appearanceOptions = [
  { label: 'System Default', value: 'system' },
  { label: 'Light Mode', value: 'light' },
  { label: 'Dark Mode', value: 'dark' },
];

const scrollViewStyles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
  },
  logoutButtonContainer: {
    marginTop: 12,
  },
});

interface OptionProps<T> {
  label: string;
  value: T;
  mode: T;
  styles: any;
  onPress: (value: T) => void;
}

function Option<T>({
  label,
  value,
  mode,
  styles,
  onPress,
}: Readonly<OptionProps<T>>) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        mode === value && {
          borderColor: styles.primaryButton.backgroundColor,
          borderWidth: 2 as any,
        },
      ]}
      onPress={() => onPress(value)}
      activeOpacity={0.7}
    >
      <Text style={styles.cardText}>
        {mode === value ? '✓ ' : ''}
        {label}
      </Text>
    </TouchableOpacity>
  );
}

interface OptionsListProps<T> {
  title: string;
  subtitle: string;
  options: { label: string; value: T }[];
  mode: T;
  onSelect: (value: T) => void;
  styles: any;
}
function OptionsList<T>({
  title,
  subtitle,
  options,
  mode,
  onSelect,
  styles,
}: Readonly<OptionsListProps<T>>) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {options.map(opt => (
        <Option
          key={opt.value as any}
          label={opt.label}
          value={opt.value}
          mode={mode}
          styles={styles}
          onPress={onSelect}
        />
      ))}
      <View style={styles.divider} />
    </View>
  );
}

export function ProfileScreen() {
  const { logout } = useAuth();
  const { mode, setMode } = useTheme();
  const styles = useHomeStyles();
  const [language, setLanguage] = useState('system');

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, scrollViewStyles.container]}>
      <ScrollView
        contentContainerStyle={scrollViewStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Appearance Section */}
        <OptionsList
          title="Appearance"
          subtitle="Choose app theme"
          options={appearanceOptions}
          mode={mode}
          onSelect={value => setMode(value as any)}
          styles={styles}
        />

        {/* Language Section */}
        <OptionsList
          title="Language"
          subtitle="Choose app language"
          options={languages}
          mode={language}
          onSelect={setLanguage}
          styles={styles}
        />

        {/* Account Section */}
        <Text style={styles.title}>Account</Text>
        <TouchableOpacity
          style={[styles.logoutButton, scrollViewStyles.logoutButtonContainer]}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
