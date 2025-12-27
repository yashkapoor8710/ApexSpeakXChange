import { View, Text, StyleSheet } from 'react-native';

const LanguageSelectionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Language Selection Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '600' },
});

export { LanguageSelectionScreen };
