// Supabase Profiles jadval turi
export interface Profile {
  id: string;
  email: string;
  nickname: string;
  age: number;
  weight: number;
  weekly_plan: string;
  created_at?: string;
  updated_at?: string;
}

// Ro'yxatga olish formasi turi
export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  age: string;
  weight: string;
  weeklyPlan: string;
}

// Form xatoliklari
export interface FormErrors {
  [key: string]: string;
}

// Registration step
export type RegisterStep = 'credentials' | 'profile';

// Supabase Auth natijasi
export interface AuthResponse {
  user: {
    id: string;
    email: string;
  } | null;
  error: Error | null;
}
