import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useThemedStyles } from '../../theme/useThemeStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export function LoginScreen({ navigation }: Readonly<LoginScreenProps>) {
  const [phone, setPhone] = useState('');
  const styles = useThemedStyles();

  const disabledButtonStyle = { opacity: 0.4 };

  const handleContinue = () => {
    if (phone.length === 10) navigation.navigate('OTP');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Enter your phone number to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#777"
        keyboardType="number-pad"
        maxLength={10}
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity
        style={[styles.button, phone.length !== 10 && disabledButtonStyle]}
        disabled={phone.length !== 10}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
