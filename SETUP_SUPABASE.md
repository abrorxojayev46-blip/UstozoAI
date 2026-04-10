# Supabase Konfiguratsiya bo'yicha Ko'rsatmalar

## 1. Supabase Konfiguratsiyasini Tayarlash

### Qadam 1: Supabase Account Yaratish
1. [supabase.com](https://supabase.com) ga kiring
2. "New Project" tugmasini bosing
3. Loyiha nomini kiriting va ma'lumotlar bazasi parolini yaratadi

### Qadam 2: API Kalitlarini Olish
1. Settings → API bo'limiga o'ting
2. **supabaseUrl** va **supabaseAnonKey'ni** ko'chib oling
3. `supabase.js` faylida quyidagi o'rinlarni to'ldiring:
   - `supabaseUrl`: sizning Supabase URL manzili
   - `supabaseAnonKey`: sizning Supabase Anon Key

### Qadam 3: Profiles Jadvali Yaratish
1. Supabase Dashboard'ga o'ting
2. SQL Editor bo'limiga kirib `supabase_migration.sql` faylning kodnini copy-paste qiling
3. Run tugmasini bosing

## 2. RegisterScreen Komponentasining Xususiyatlari

### Dizayn Ranglari:
- **Fon rangi**: `#181A20` (Qora)
- **Tugma rangi**: `#FFA500` (To'q Sariq/Apelsin)
- **Belgili ranglar**: `#FFA500`

### Form Maydanlari:
- **Email**: O'ziga xos email manzili
- **Parol**: Kamida 6 ta belgi
- **Parol Tasdiqlash**: Parolni qayta kiritish
- **Nickname**: Unikal foydalanuvchi nomi
- **Yosh**: 13 - 120 yoshning orasida
- **Vazn**: Kilogramm (kg)
- **Haftalik Reja**: Mashq/o'quv rejasi

### Ma'lumot Validatsiyasi:
- Email va parol bo'sh bo'lmasligi kerak
- Parollar mos kelishi kerak
- Parol kamida 6 ta belgidan iborat bo'lishi kerak
- Nickname bo'sh bo'lmasligi kerak
- Yosh sonli qiymat bo'lishi kerak (13-120)
- Vazn sonli qiymat bo'lishi kerak

## 3. Supabase Security (RLS)

Barcha users o'zlariga tegishli ma'lumotlarni ko'rishi, tahrirlashi va o'chirishi mumkin.

## 4. Loyihani O'rnatish

```bash
# Loyihaning asosiy papkasida
npm install

# Yoki Yarn orqali
yarn install

# Supabase paketi allaqachon package.json'da mavjud: @supabase/supabase-js
```

## 5. Ilovani Ishga Tushirish

```bash
# Expo bilan
expo start

# Android uchun
expo start --android

# iOS uchun
expo start --ios

# Web uchun
expo start --web
```

## 6. Foydalanish

1. Ilovani ishga tushiring
2. "Ro'yxatga Olish" formasi paydo bo'ladi
3. Barcha maydonlarni to'ldiring
4. "Ro'yxatga Olish" tugmasini bosing
5. Ro'yxatga olish muvaffaqiyyat bilan tugatilsa, asosiy ekranga o'tasiz

## Qo'shimcha Izohlar

- RegisterScreen komponenti ScrollView bilan o'ralgan, shuning uchun telefon 
ekrani kichik bo'lsa ham barcha maydonlari ko'rinadi
- Loading holatida tugmada ActivityIndicator ko'rsatiladi
- Barcha xatolar Alert orqali ko'rsatiladi
- Ma'lumotlar Supabase 'profiles' jadvaliga saqlanadi

## Muammolar yuzasidan

Agar Supabase bilan ulanishda muammolar bo'lsa:
1. API kalitlarini to'g'ri kiritganingizni tekshiring
2. Internet ulanishingizni tekshiring
3. Supabase proyektining "Authentication" bo'limida "Email" autentifikatsiyasini yoqganingizni tekshiring
