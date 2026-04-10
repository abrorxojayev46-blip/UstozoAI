# MyGymApp - Supabase Ro'yxatga Olish Tizimi (Premium Design)

## 📋 Xulosa

Supabase bilan integratsiya qilgan, modern va premium vook RegisterScreen komponentasi yaratildi. Tizim ikki bosqichga bo'linadi (multi-step form).

---

## 🎨 Dizayn Xususiyatlari

### Rang Palitra:
- **Fon**: Qora (`#0f0f0f`)
- **Ikkinchi daraja fon**: To'q kulrang (`#1a1a1a`)
- **Aksent rang**: Burnt Orange (`#c77d3d`) - chuqur, o'chiqlangan sariq-olovrang
- **Matn**: Oq (`#ffffff`)
- **Ikkinchi daraja matn**: Och kulrang (`#888`)
- **Border**: Nozik to'q kulrang (`#3a3a3a`)

### Tipografiya:
- **Sarlavhalar**: 32pt, 600 weight, oq rang, letter-spacing 0.5
- **Label'lar**: 13pt, 600 weight, oq rang, letter-spacing 0.3
- **Input matn**: 15pt, sans-serif (System/Roboto/Web)
- **Boshqa matn**: 13-15pt, regular/500 weight

### Komponent Elementlari:

#### Input Maydonlari:
- Yaxlitlangan qirrali (borderRadius: 10)
- Fon: `#1a1a1a`
- Border: 1px `#3a3a3a`
- Focus: border rang o'zgaradi `#c77d3d` ga
- Error: fon rangi changed to `rgba(199, 125, 61, 0.08)`
- Placeholder: `#888`
- Padding: 14px (horizontal), 13px (vertical)

#### Tugmalar:
- **Asosiy tugma** (Davom etish / Ro'yxatga Olish):
  - Fon: `#c77d3d`
  - Matn: Oq, 15pt, 600 weight
  - Padding: 14px (vertical)
  - borderRadius: 10
  - Hover/Press: opacity 0.75

- **Ikkinchi daraja tugma** (Orqaga):
  - Fon: Transparent
  - Border: 1px `#3a3a3a`
  - Matn: Och kulrang, 15pt, 600 weight
  - borderRadius: 10

#### Progress Bar:
- Umumiy: 2px qalın, `#2a2a2a` fon
- Fill: Burnt Orange, animatsiya orqali o'sadi (50% → 100%)

#### Error Display:
- **Field Level**: Qizil/Burnt Orange oraliq matn, 12pt
- **Form Level**: Banner with left border, icon (optional)

#### Spacing (Padding/Margin):
- Horizontal padding: 20px
- Vertical padding: 40px (top/bottom)
- Input wrapper spacing: 20px (bottom)
- Button container gap: 12px
- Progress bar margin: 28px (bottom)

---

## 📱 Multi-Step Form Tizimi

### Step 1: Akkaunt (Credentials)
```
Email
Parol
Parol Tasdiqlash
[Davom etish tugmasi]
```

### Step 2: Profil (Profile)
```
Nickname
Yosh | Vazn (2 column)
Haftalik Reja
[Orqaga] [Ro'yxatga Olish]
```

---

## 🔑 Texnik Xususiyatlari

### State Management:
- `step`: 'credentials' | 'profile'
- `formData`: Barcha maydoni uchun bitta state object
- `errors`: Field-level va form-level xatolar
- `loading`: Async operatsiya holati

### Validatsiya:
- **Email**: Required + Regex test
- **Parol**: Min 6 ta belgi
- **Parol Tasdiqlash**: Parollar mos kelishi kerak
- **Nickname**: Non-empty
- **Yosh**: 13-120 orasida
- **Vazn**: Valid number
- **Haftalik Reja**: Non-empty

### User Experience:
- Real-time error clearing saat field o'zgartirilsa
- Inline field errors (3-line distance)
- Form-level error banner top-da
- Progress indicator animatsiyasi
- Keyboard handling (KeyboardAvoidingView)
- ScrollView for smaller screens
- Loading indicator on button

---

## 🚀 O'rnatish va Ishga Tushirish

```bash
# 1. Paketlarni o'rnatish
npm install
# yoki
yarn install

# 2. Supabase konfiguratsiya (SETUP_SUPABASE.md)
# supabase.js'da API kalitlarini kiritish
# SQL migratsiyasini Supabase Dashboard'da bajarish

# 3. Ilovani ishga tushirish
expo start

# 4. Platform tanlang
expo start --android
expo start --ios
expo start --web
```

---

## 📚 Fayllar Tuzilmasi

```
components/
  └─ RegisterScreen.tsx (Multi-step premium form)
types/
  └─ supabase.ts (TypeScript definitions)
supabase.js (Client configuration)
SETUP_SUPABASE.md (Konfiguratsiya qo'llanmasi)
supabase_migration.sql (Database schema + RLS)
```

---

## 🎯 Premium Design Principles

1. **Minimalism**: Keraksiz elementlar o'chirilgan
2. **Modern Aesthetics**: Clean typography, subtle shadows
3. **User Feedback**: Real-time validation, clear error messages
4. **Accessibility**: Good contrast, readable fonts
5. **Performance**: Efficient re-renders, smooth transitions
6. **Consistency**: Uniform spacing, color palette, typography

---

## ⚙️ Customization

### Ranglarni O'zgartirish:
1. `styles.ts` faylda color variables:
   - `#0f0f0f` → Background
   - `#c77d3d` → Accent color
   - `#888` → Secondary text

### Spacing O'zgartirish:
- `scrollContainer`: paddingHorizontal/Vertical
- `inputWrapper`: marginBottom
- `buttonContainer`: gap

### Typography O'zgartirish:
- `title`: fontSize, fontWeight
- `label`: fontSize, color
- `input`: fontSize, fontFamily

---

## 🧪 Sinovdan O'tish

1. **Step 1 Validation**:
   - Xato Email kiriting → Error ko'rsatiladi
   - Short parol → Error ko'rsatiladi
   - Toʻg'ri kiritish → "Davom etish" bosiladi

2. **Step 2 Validation**:
   - Faqat Nickname kiriting → Error
   - Yosh 12 → Error (13 dan katta)
   - Barcha to'kin qilgach → "Ro'yxatga Olish" bosiladi

3. **Registration**:
   - Muvaffaqiyatli → Success Alert
   - Xato → Form-level error banner

---

## 📞 Muhim Eslatmalar

- Supabase URL va Anon Key'ni [supabase.js](supabase.js) faylida kiritish talab etiladi
- Email authentication Supabase'da yoqilgan bo'lishi kerak
- Profiles jadvali SQL migratsiyasi orqali yaratilishi kerak
- RLS politikalari foydalanuvchilarning ma'lumotlarini himoya qiladi

---

## ✅ Implementatsiya Holati

**Dizayn**: TUGATILGAN ✓
**Multi-step Form**: TUGATILGAN ✓
**Validatsiya**: TUGATILGAN ✓
**Supabase Integratsiya**: TUGATILGAN ✓
**Error Handling**: TUGATILGAN ✓
**TypeScript Types**: TUGATILGAN ✓

**Loyiha Tayyorligi**: 100% ✅
