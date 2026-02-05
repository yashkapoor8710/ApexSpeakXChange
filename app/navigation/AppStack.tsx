import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeProvider';
import { TabNavigator } from './TabNavigator';
import { CallHistoryScreen } from '../screens/Calls/CallHistoryScreen';
import { CallScreen } from '../screens/Calls/CallScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Call"
        component={CallScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CallHistory"
        component={CallHistoryScreen}
        options={{ title: 'Call History' }}
      />
    </Stack.Navigator>
  );
}
