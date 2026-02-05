import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../theme/ThemeProvider';
import { useLanguage } from '../../language/LanguageProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  connectedText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },

  languageText: {
    fontSize: 14,
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 24,
  },

  control: {
    alignItems: 'center',
  },

  controlIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },

  controlLabel: {
    fontSize: 12,
  },

  endCallButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qualityIndicator: {
    marginBottom: 12,
  },

  qualityText: {
    fontSize: 13,
    fontWeight: '600',
  },

  callSummary: {
    marginTop: 20,
    alignItems: 'center',
  },

  durationText: {
    marginTop: 4,
  },

  controlButtonActive: {
    opacity: 1,
  },

  controlButtonDisabled: {
    opacity: 0.4,
  },
});

type CallScreenProps = NativeStackScreenProps<any, 'Call'>;
type CallStatus = 'connecting' | 'connected' | 'ended';
type CallQuality = 'poor' | 'good' | 'excellent';

const getQualityColor = (quality: CallQuality): string => {
  switch (quality) {
    case 'excellent':
      return '#2ecc71';
    case 'good':
      return '#f1c40f';
    case 'poor':
      return '#e74c3c';
    default:
      return '#f1c40f';
  }
};

export function CallScreen({ navigation, route }: Readonly<CallScreenProps>) {
  const { colors } = useTheme();
  const { language: fallbackLanguage } = useLanguage();
  const language = route?.params?.language ?? fallbackLanguage;

  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(false);

  const [status, setStatus] = useState<CallStatus>('connecting');
  const [quality, setQuality] = useState<CallQuality>('good');
  const [showSummary, setShowSummary] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const connectTimeout = setTimeout(() => {
      setStatus('connected');
    }, 2000);

    return () => clearTimeout(connectTimeout);
  }, []);

  useEffect(() => {
    if (status === 'connected') {
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  useEffect(() => {
    if (status !== 'connected') return;

    const qualities: CallQuality[] = ['poor', 'good', 'excellent'];

    const interval = setInterval(() => {
      const random = qualities[Math.floor(Math.random() * qualities.length)];
      setQuality(random);
    }, 4000);

    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const endCall = () => {
    setStatus('ended');

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setShowSummary(true);

    // Auto exit after 2s
    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* CENTER CONTENT */}
      <View style={styles.center}>
        <View style={styles.qualityIndicator}>
          <Text
            style={[
              styles.qualityText,
              {
                color: getQualityColor(quality),
              },
            ]}
          >
            Network: {quality.toUpperCase()}
          </Text>
        </View>

        <View style={[styles.avatar, { backgroundColor: colors.card }]}>
          <Ionicons name="person" size={42} color={colors.text} />
        </View>

        <Text style={[styles.connectedText, { color: colors.muted }]}>
          {status === 'connecting' && 'Connecting…'}
          {status === 'connected' && formatTime(seconds)}
          {status === 'ended' && 'Call Ended'}
        </Text>

        <Text style={[styles.languageText, { color: colors.muted }]}>
          Language: {language.toUpperCase()}
        </Text>
      </View>

      {showSummary && (
        <View style={styles.callSummary}>
          <Text style={[styles.durationText, { color: colors.muted }]}>
            Duration: {formatTime(seconds)}
          </Text>
        </View>
      )}

      {/* CONTROLS */}
      <View style={styles.controls}>
        <ControlButton
          icon={muted ? 'mic-off' : 'mic'}
          label="Mute"
          active={muted}
          disabled={status !== 'connected'}
          onPress={() => setMuted(!muted)}
          colors={colors}
        />

        <ControlButton
          icon={speakerOn ? 'volume-high' : 'volume-medium'}
          label="Speaker"
          active={speakerOn}
          disabled={status !== 'connected'}
          onPress={() => setSpeakerOn(!speakerOn)}
          colors={colors}
        />

        <TouchableOpacity style={styles.endCallButton} onPress={endCall}>
          <Ionicons name="call" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

interface ControlButtonProps {
  icon: string;
  label: string;
  active: boolean;
  onPress: () => void;
  colors: any;
  disabled?: boolean;
}

function ControlButton({
  icon,
  label,
  active,
  onPress,
  colors,
  disabled,
}: Readonly<ControlButtonProps>) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.control,
        disabled ? styles.controlButtonDisabled : styles.controlButtonActive,
      ]}
    >
      <View
        style={[
          styles.controlIcon,
          { backgroundColor: active ? colors.primary : colors.card },
        ]}
      >
        <Ionicons name={icon} size={22} color={active ? '#fff' : colors.text} />
      </View>

      <Text style={[styles.controlLabel, { color: colors.muted }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
