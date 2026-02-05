import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useHomeStyles } from '../../theme/useHomeStyles';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export function HomeScreen({ navigation }: Readonly<HomeScreenProps>) {
  const styles = useHomeStyles();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>SpeakXChange</Text>
        <Text style={styles.subtitle}>
          Real-time multilingual conversations
        </Text>
      </View>

      {/* Start Call */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Call')}
      >
        <Text style={styles.primaryButtonText}>Start a Call</Text>
      </TouchableOpacity>

      {/* Cards */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CallHistory')}
      >
        <Text style={styles.cardText}>📞 Call History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.cardText}>👤 Profile & Settings</Text>
      </TouchableOpacity>
    </View>
  );
}
