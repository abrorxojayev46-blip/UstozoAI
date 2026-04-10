import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.page, { backgroundColor: theme.background }]}> 
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>O'qish Progessi</Text>
          <Text style={[styles.subtitle, { color: theme.text }]}>O'qish streakingiz va ko'nikmalar bo'yichagini kuzatib turing.</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#F0F4FF' }]}>
            <IconSymbol name="flame.fill" size={28} color="#7C3AED" />
            <Text style={styles.statValue}>4 kun</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#F0FDF4' }]}>
            <IconSymbol name="checkmark.seal.fill" size={28} color="#16A34A" />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Tugallangan Mavzular</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Ko'nikma Suratlama</Text>
          <Text style={styles.sectionText}>AI robotingiz siz darajangizga mos tushuntirishlarni beradi. Tez o'rganish uchun ko'proq savollar so'rang.</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Tez Orada</Text>
          <View style={styles.featureItem}>
            <IconSymbol name="camera.fill" size={22} color="#7C3AED" />
            <Text style={styles.featureText}>Kamera bilan masala yechish</Text>
          </View>
          <View style={styles.featureItem}>
            <IconSymbol name="doc.text.fill" size={22} color="#16A34A" />
            <Text style={styles.featureText}>Testlar va imtixonlar</Text>
          </View>
          <View style={styles.featureItem}>
            <IconSymbol name="sparkles" size={22} color="#F59E0B" />
            <Text style={styles.featureText}>Gamifikatsiya bahodilari</Text>
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
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 22,
    padding: 16,
    justifyContent: 'space-between',
    minHeight: 140,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '800',
    marginTop: 10,
    color: '#1F2937',
  },
  statLabel: {
    marginTop: 8,
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    color: '#1F2937',
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#4B5563',
    fontWeight: '500',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 14,
  },
  featureText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
});
