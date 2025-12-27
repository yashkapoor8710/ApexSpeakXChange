import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export function OTPScreen({ navigation }) {
  const [otp, setOtp] = useState('');

  const verify = () => {
    if (otp.length === 6) navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 6 digit code sent to your number
      </Text>

      <TextInput
        style={styles.input}
        placeholder="______"
        placeholderTextColor="#777"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity
        style={[styles.button, otp.length !== 6 && { opacity: 0.4 }]}
        disabled={otp.length !== 6}
        onPress={verify}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 28,
    justifyContent: 'center',
  },
  title: { fontSize: 30, fontWeight: '700', marginBottom: 10, color: '#111' },
  subtitle: { fontSize: 15, color: '#666', marginBottom: 40 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    fontSize: 22,
    letterSpacing: 8,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
