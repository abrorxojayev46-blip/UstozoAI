import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const ONBOARDING_KEY = 'ustoz-ai-onboarded';
const INTERESTS = [
  { key: 'math', label: 'Matematika' },
  { key: 'biology', label: 'Biologiya' },
  { key: 'physics', label: 'Fizika' },
  { key: 'english', label: 'Inglizcha' },
  { key: 'ielts', label: 'IELTS' },
];
const LEVELS = ['Yangi Boshg\'ichni', 'O\'rta Darajali', 'Murakkab'] as const;

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [loaded, setLoaded] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);
  const [level, setLevel] = useState<typeof LEVELS[number]>('Yangi Boshg\'ichni');

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY).then((value) => {
      setOnboarded(value === 'true');
      setLoaded(true);
    });
  }, []);

  const finishOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setOnboarded(true);
  };

  const toggleInterest = (key: string) => {
    setInterests((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );
  };

  if (!loaded) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}> 
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

  if (!onboarded) {
    return (
      <SafeAreaView style={[styles.page, { backgroundColor: theme.background }]}> 
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>Ustoz AI ga xush kelibsiz</Text>
          <Text style={styles.subtitle}>24/7 shaxsiy o'qituvchingiz bo'lib, har narsani sodda tushuntiradi.</Text>

          {step === 0 && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Boshlaylik 👋</Text>
              <Text style={styles.cardText}>O'qish sohangizi va tafsir darajangizni tanlang.</Text>
            </View>
          )}

          {step === 1 && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Nima o'rganmoqchisiz?</Text>
              <Text style={styles.cardText}>Sevimli fanningizni tanlang.</Text>
              <View style={styles.tagGroup}>
                {INTERESTS.map((item) => {
                  const active = interests.includes(item.key);
                  return (
                    <TouchableOpacity
                      key={item.key}
                      onPress={() => toggleInterest(item.key)}
                      style={[styles.tag, active && { backgroundColor: theme.tint }]}
                    >
                      <Text style={[styles.tagText, active && { color: '#fff' }]}>{item.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {step === 2 && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Sizning darajangiz</Text>
              <Text style={styles.cardText}>Ustoz tafsir darajasini tanlang.</Text>
              <View style={styles.tagGroup}>
                {LEVELS.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setLevel(item)}
                    style={[styles.tag, level === item && { backgroundColor: theme.tint }]}
                  >
                    <Text style={[styles.tagText, level === item && { color: '#fff' }]}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View style={styles.pagination}>
            <Text style={styles.stepLabel}>Qadami {step + 1} / 3</Text>
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: theme.tint }]}
            onPress={() => {
              if (step < 2) {
                setStep((current) => current + 1);
                return;
              }
              finishOnboarding();
            }}
          >
            <Text style={styles.primaryButtonText}>{step < 2 ? 'Keyingi' : 'O\'qishni boshlash'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.page, { backgroundColor: theme.background }]}> 
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}> 
          <View>
            <Text style={[styles.title, { color: theme.text }]}>Bugun nima o'rganamiz?</Text>
            <Text style={styles.subtitle}>Kategoriyavni tanlang yoki suhbatni boshlang.</Text>
          </View>
          <IconSymbol name="books.vertical.fill" size={34} color={theme.tint} />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.cardTitle}>Tez kategoriyalar</Text>
          <View style={styles.grid}>
            <TouchableOpacity style={styles.categoryCard}>
              <Text style={styles.categoryEmoji}>📘</Text>
              <Text style={styles.categoryTitle}>Maktab</Text>
              <Text style={styles.categorySubtitle}>Matematika, Fizika, Biologiya</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <Text style={styles.categoryEmoji}>🌍</Text>
              <Text style={styles.categoryTitle}>Inglizcha</Text>
              <Text style={styles.categorySubtitle}>Grammtika, yozish, so'z</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <Text style={styles.categoryEmoji}>🎯</Text>
              <Text style={styles.categoryTitle}>IELTS</Text>
              <Text style={styles.categorySubtitle}>Ko'chma, o'qish, yozish</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.cardTitle}>AI Suhbat</Text>
          <Text style={styles.cardText}>Har qanday savolni qo'ying va Ustoz sodda tushuntirma bilan javob beradi.</Text>
          <Link href="./chat" style={[styles.primaryButton, { backgroundColor: theme.tint }]}> 
            <Text style={styles.primaryButtonText}>Suhbat Ochish</Text>
          </Link>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.cardTitle}>Tez Orada</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>📸</Text>
            <Text style={styles.featureText}>Kamera yordamida masala yechish</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>📝</Text>
            <Text style={styles.featureText}>Testlar va imtixonlar</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>📊</Text>
            <Text style={styles.featureText}>O'qish progessi</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🏆</Text>
            <Text style={styles.featureText}>Balllar va leaderboard</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  hero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    fontWeight: '500',
  },
  card: {
    borderRadius: 24,
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    color: '#1F2937',
  },
  cardText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    fontWeight: '500',
  },
  tagGroup: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    marginRight: 8,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4B5563',
  },
  pagination: {
    marginBottom: 16,
    alignItems: 'center',
  },
  stepLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
  },
  primaryButton: {
    borderRadius: 18,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
    marginTop: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  sectionCard: {
    borderRadius: 24,
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 14,
    gap: 10,
  },
  categoryCard: {
    width: '48%',
    borderRadius: 20,
    backgroundColor: '#F0F4FF',
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  categoryEmoji: {
    fontSize: 24,
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 6,
    color: '#1F2937',
  },
  categorySubtitle: {
    color: '#6B7280',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    gap: 12,
  },
  featureEmoji: {
    fontSize: 20,
  },
  featureText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    fontWeight: '500',
  },
});
