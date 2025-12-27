import { View, Text, StyleSheet } from 'react-native';

const CallScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Call Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '600' },
});

export { CallScreen };
