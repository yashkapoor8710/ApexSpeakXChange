import { View, Text, FlatList, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../theme/ThemeProvider';

const MOCK_CALLS = [
  {
    id: '1',
    name: 'John Doe',
    language: 'EN → HI',
    time: '10:42 AM',
    type: 'outgoing',
  },
  {
    id: '2',
    name: 'Maria',
    language: 'ES → EN',
    time: 'Yesterday',
    type: 'incoming',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },

  left: {
    marginRight: 14,
  },

  center: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },

  language: {
    fontSize: 13,
    marginTop: 2,
  },

  time: {
    fontSize: 12,
  },

  contentContainer: {
    padding: 16,
  },
});

export function CallHistoryScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={MOCK_CALLS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.left}>
              <Ionicons
                name={item.type === 'outgoing' ? 'call-outline' : 'call'}
                size={20}
                color={colors.primary}
              />
            </View>

            <View style={styles.center}>
              <Text style={[styles.name, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.language, { color: colors.muted }]}>
                {item.language}
              </Text>
            </View>

            <Text style={[styles.time, { color: colors.muted }]}>
              {item.time}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
