import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useLanguageStyles } from '../../theme/useLanguageStyles';
import { Language, LANGUAGES } from '../../utils/language';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type LanguageSelectionScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export function LanguageSelectionScreen({
  navigation,
}: Readonly<LanguageSelectionScreenProps>) {
  const styles = useLanguageStyles();
  const [from, setFrom] = useState<Language | null>(null);
  const [to, setTo] = useState<Language | null>(null);

  const renderItem = (
    item: Language,
    selected: Language | null,
    onSelect: (lang: Language) => void,
  ) => (
    <TouchableOpacity
      style={[styles.card, selected?.code === item.code && styles.selected]}
      onPress={() => onSelect(item)}
    >
      <Text style={styles.cardText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const subtitleWithMargin = [styles.subtitle, { marginTop: 16 }];
  const disabledButtonStyle = { opacity: 0.4 };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Languages</Text>
      <Text style={styles.subtitle}>Select who speaks what</Text>

      <Text style={styles.subtitle}>You speak</Text>
      <FlatList
        data={LANGUAGES}
        keyExtractor={item => item.code}
        renderItem={({ item }) => renderItem(item, from, setFrom)}
      />

      <Text style={subtitleWithMargin}>Other person hears</Text>
      <FlatList
        data={LANGUAGES}
        keyExtractor={item => item.code}
        renderItem={({ item }) => renderItem(item, to, setTo)}
      />

      <TouchableOpacity
        style={[styles.button, !(from && to) && disabledButtonStyle]}
        disabled={!(from && to)}
        onPress={() => navigation.navigate('Call', { from, to })}
      >
        <Text style={styles.buttonText}>Start Call</Text>
      </TouchableOpacity>
    </View>
  );
}
