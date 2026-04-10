import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../supabase';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  age: string;
  weight: string;
  weeklyPlan: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function RegisterScreen({ onRegistered }: { onRegistered: () => void }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    age: '',
    weight: '',
    weeklyPlan: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email talab';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email noto\'g\'ri';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Parol talab';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Min 6 ta belgi';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Tasdiq talab';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mos emas';
    }

    // Nickname validation
    if (!formData.nickname.trim()) {
      newErrors.nickname = 'Nickname talab';
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = 'Yosh talab';
    } else {
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
        newErrors.age = '13-120';
      }
    }

    // Weight validation
    if (!formData.weight) {
      newErrors.weight = 'Vazn talab';
    } else if (isNaN(parseFloat(formData.weight))) {
      newErrors.weight = 'Sonli';
    }

    // Weekly plan validation
    if (!formData.weeklyPlan.trim()) {
      newErrors.weeklyPlan = 'Reja talab';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password.trim(),
      });

      if (authError) {
        console.error('Auth error:', authError);
        setErrors({ form: authError.message || 'Kirish xatosi' });
        setLoading(false);
        return;
      }

      const user = authData.user;
      if (!user) {
        setErrors({ form: 'Foydalanuvchi yaratilmadi' });
        setLoading(false);
        return;
      }

      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: user.id,
          email: formData.email.trim(),
          nickname: formData.nickname.trim(),
          age: parseInt(formData.age),
          weight: parseFloat(formData.weight),
          weekly_plan: formData.weeklyPlan.trim(),
          created_at: new Date().toISOString(),
        },
      ]);

      if (profileError) {
        console.error('Profile error:', profileError);
        setErrors({ form: profileError.message || 'Profil xatosi' });
        setLoading(false);
        return;
      }

      Alert.alert('Muvaffaqiyat!', 'Ro\'yxatga olish muvaffaqiyyatli tamamlandi', [
        {
          text: 'OK',
          onPress: () => onRegistered(),
        },
      ]);
    } catch (error: any) {
      console.error('Unexpected error:', error);
      setErrors({ form: error.message || 'Noma\'lum xato' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Ro'yxatga Olish</Text>
            </View>

            {/* Error message */}
            {errors.form && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>⚠ {errors.form}</Text>
              </View>
            )}

            {/* Form fields */}
            <View style={styles.formContainer}>
              {/* Row 1: Email */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="email"
                  placeholderTextColor="#5a7a8f"
                  value={formData.email}
                  onChangeText={(text) => updateField('email', text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
                {errors.email && <Text style={styles.fieldError}>{errors.email}</Text>}
              </View>

              {/* Row 2: Password & Confirm */}
              <View style={styles.rowContainer}>
                <View style={[styles.inputWrapper, styles.halfInput]}>
                  <Text style={styles.label}>Parol</Text>
                  <TextInput
                    style={[styles.input, errors.password && styles.inputError]}
                    placeholder="••••••"
                    placeholderTextColor="#5a7a8f"
                    value={formData.password}
                    onChangeText={(text) => updateField('password', text)}
                    secureTextEntry
                    editable={!loading}
                  />
                  {errors.password && <Text style={styles.fieldError}>{errors.password}</Text>}
                </View>

                <View style={[styles.inputWrapper, styles.halfInput]}>
                  <Text style={styles.label}>Tasdiqlash</Text>
                  <TextInput
                    style={[styles.input, errors.confirmPassword && styles.inputError]}
                    placeholder="••••••"
                    placeholderTextColor="#5a7a8f"
                    value={formData.confirmPassword}
                    onChangeText={(text) => updateField('confirmPassword', text)}
                    secureTextEntry
                    editable={!loading}
                  />
                  {errors.confirmPassword && <Text style={styles.fieldError}>{errors.confirmPassword}</Text>}
                </View>
              </View>

              {/* Row 3: Nickname */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Nickname</Text>
                <TextInput
                  style={[styles.input, errors.nickname && styles.inputError]}
                  placeholder="Nom"
                  placeholderTextColor="#5a7a8f"
                  value={formData.nickname}
                  onChangeText={(text) => updateField('nickname', text)}
                  autoCapitalize="none"
                  editable={!loading}
                />
                {errors.nickname && <Text style={styles.fieldError}>{errors.nickname}</Text>}
              </View>

              {/* Row 4: Age & Weight */}
              <View style={styles.rowContainer}>
                <View style={[styles.inputWrapper, styles.halfInput]}>
                  <Text style={styles.label}>Yosh</Text>
                  <TextInput
                    style={[styles.input, errors.age && styles.inputError]}
                    placeholder="25"
                    placeholderTextColor="#5a7a8f"
                    value={formData.age}
                    onChangeText={(text) => updateField('age', text)}
                    keyboardType="number-pad"
                    editable={!loading}
                  />
                  {errors.age && <Text style={styles.fieldError}>{errors.age}</Text>}
                </View>

                <View style={[styles.inputWrapper, styles.halfInput]}>
                  <Text style={styles.label}>Vazn (kg)</Text>
                  <TextInput
                    style={[styles.input, errors.weight && styles.inputError]}
                    placeholder="75"
                    placeholderTextColor="#5a7a8f"
                    value={formData.weight}
                    onChangeText={(text) => updateField('weight', text)}
                    keyboardType="decimal-pad"
                    editable={!loading}
                  />
                  {errors.weight && <Text style={styles.fieldError}>{errors.weight}</Text>}
                </View>
              </View>

              {/* Row 5: Weekly Plan */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Haftalik Reja</Text>
                <TextInput
                  style={[styles.input, styles.textArea, errors.weeklyPlan && styles.inputError]}
                  placeholder="Reja..."
                  placeholderTextColor="#5a7a8f"
                  value={formData.weeklyPlan}
                  onChangeText={(text) => updateField('weeklyPlan', text)}
                  multiline
                  numberOfLines={2}
                  editable={!loading}
                />
                {errors.weeklyPlan && <Text style={styles.fieldError}>{errors.weeklyPlan}</Text>}
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, loading && styles.submitButtonLoading]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Ro'yxatga Olish</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a1628',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 320,
    alignSelf: 'center',
  },
  header: {
    marginBottom: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  errorBanner: {
    backgroundColor: 'rgba(220, 53, 69, 0.12)',
    borderLeftWidth: 3,
    borderLeftColor: '#1a4d7a',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  errorText: {
    color: '#1a4d7a',
    fontSize: 11,
    fontWeight: '500',
  },
  formContainer: {
    marginBottom: 10,
  },
  inputWrapper: {
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  halfInput: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#0d2540',
    borderWidth: 1.2,
    borderColor: '#1a4d7a',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: '#ffffff',
    fontSize: 13,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      web: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }),
  },
  textArea: {
    height: 45,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#e74c3c',
    backgroundColor: 'rgba(231, 76, 60, 0.08)',
  },
  fieldError: {
    fontSize: 10,
    color: '#e74c3c',
    marginTop: 3,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#1a4d7a',
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  submitButtonLoading: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
