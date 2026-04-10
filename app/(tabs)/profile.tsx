import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.page, { backgroundColor: theme.background }]}> 
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: theme.text }]}>Ustoz AI</Text>
            <Text style={[styles.subtitle, { color: theme.text }]}>Sizning do'stona o'qish assistenti.</Text>
          </View>
          <IconSymbol name="person.crop.circle.fill" size={36} color={theme.tint} />
        </View>

        <View style={styles.badgeCard}>
          <Text style={styles.badgeTitle}>Tavsif</Text>
          <Text style={styles.badgeText}>
            Ustoz AI — har narsani sodda va tez tushuntiradigan aqlli o'qituvchi.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>O'qish uslubi</Text>
          <Text style={styles.sectionText}>Do'stona, qadamsham va yangi boshlangan uchun oson. Maktab, Ingliz tili va IELTS uchun misollari adaptatsiyalandi.</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Premium Taklif</Text>
          <Text style={styles.sectionText}>Tezroq javoblar, chuqur tushuntirishlar va IELTS kontenti.</Text>
          <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.tint }]}> 
            <Text style={styles.primaryButtonText}>Premium Sinang</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Kelajak Asboblar</Text>
          <View style={styles.featureItem}>
            <IconSymbol name="camera.fill" size={22} color="#7C3AED" />
            <Text style={styles.featureText}>Rasm asosidagi masala yechuvchi</Text>
          </View>
          <View style={styles.featureItem}>
            <IconSymbol name="doc.text.fill" size={22} color="#16A34A" />
            <Text style={styles.featureText}>Testlar va imtixonlar</Text>
          </View>
          <View style={styles.featureItem}>
            <IconSymbol name="sparkles" size={22} color="#F59E0B" />
            <Text style={styles.featureText}>Leaderboard va streaklar</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '500',
  },
  badgeCard: {
    borderRadius: 24,
    backgroundColor: '#F0F4FF',
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  badgeTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
    color: '#1F2937',
  },
  badgeText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 21,
    fontWeight: '500',
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
    color: '#4B5563',
    lineHeight: 21,
    marginBottom: 12,
    fontWeight: '500',
  },
  primaryButton: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
  },
  featureText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
});
