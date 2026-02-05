import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useThemedStyles } from '../../theme/useThemeStyles';
import { useAuth } from '../../auth/AuthProvider';

export function OTPScreen() {
  const { login } = useAuth();
  const [otp, setOtp] = useState('');
  const styles = useThemedStyles();

  const disabledButtonStyle = { opacity: 0.4 };
  const inputStyle: { letterSpacing: number; textAlign: 'center' } = {
    letterSpacing: 8,
    textAlign: 'center',
  };

  const verify = () => {
    if (otp.length === 6) login();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 6 digit code sent to your number
      </Text>

      <TextInput
        style={[styles.input, inputStyle]}
        placeholder="______"
        placeholderTextColor="#777"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity
        style={[styles.button, otp.length !== 6 && disabledButtonStyle]}
        disabled={otp.length !== 6}
        onPress={verify}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}
