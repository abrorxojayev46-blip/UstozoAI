import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState } from 'react';
import {
    Alert,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type Difficulty = 'Yangi Boshg\'ichni' | 'O\'rta Darajali' | 'Murakkab';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  saved?: boolean;
};

const CATEGORIES = [
  { key: 'school', label: 'Maktab Fanlari' },
  { key: 'english', label: 'Ingliz Tili' },
  { key: 'ielts', label: 'IELTS Tayyorgarlik' },
];
const DIFFICULTIES: Difficulty[] = ['Yangi Boshg\'ichni', 'O\'rta Darajali', 'Murakkab'] as const;

const createMockResponse = (question: string, category: string, difficulty: Difficulty) => {
  const responses: { [key: string]: { [key: string]: string[] } } = {
    school: {
      'Yangi Boshg\'ichni': [
        `📚 Qo'shish degani nima?\n\n1️⃣ Asosiy tushuncha:\nQo'shish - bu bir nechta narsani birgalikda jami qilish demak. Misol uchun, agar sizda 3 ta kitob bor, va do'stingizga 2 ta kitob bor, hammasi birgalikda 5 ta kitob bo'ladi.\n\n2️⃣ Qanday qilish kerak:\n- Avval birinchi raqamni aytish kerak: 3\n- Keyin "qo'shish" belgisini qo'yish: +\n- Unda ikkinchi raqamni aytish: 2\n- Oxirida javob: = 5\n\n3️⃣ Amaliy misollar:\n- 1 + 1 = 2 (bir qo'shni bir = ikki)\n- 2 + 3 = 5 (ikki qo'shni uch = besh)\n- 4 + 4 = 8 (to'rt qo'shni to'rt = sakkiz)\n\n4️⃣ Amaliyot qiling:\nSiz agar 5 ta olma olasiz, va yana 3 ta olma olsangiz, jami nechta olma bo'ladi? O'ylab ko'ring!`,
        `📖 Ko'paytirish haqida darslik\n\n1️⃣ Birinchi bilish kerak narsalar:\nKo'paytirish - bu bir xil narsalarni bir necha marta jami qilish demak. Misol qilib, agar sizda 3 ta quti bor va har bir qutida 2 ta koneta bor, jami nechtadan koneta bo'ladi?\n\n2️⃣ Foydali tip:\nQo'shish o'rniga ko'paytirish ishlatasiz:\n- 2 + 2 + 2 = 6 (qo'shish orqali)\n- 2 × 3 = 6 (ko'paytirish orqali, tezroq!)\n\n3️⃣ To'g'ri yozish:\n- 2 × 3 yoki 2 * 3 yoki 2 · 3 - hammasi bir xil ma'noni anglatadi\n- "Ikki ko'paytirni uch" deb o'qiydi\n\n4️⃣ Oson misollar:\n- 2 × 4 = 8 (2 ta narsani 4 marta = 8)\n- 3 × 3 = 9\n- 5 × 2 = 10`,
        `✏️ Ayirish - qanday sodir bo'ladi?\n\n1️⃣ Qisqa tushuncha:\nAyirish - bu katta sondan kichik sonni olib tashlash demak. Agar sizda 10 ta pul bor va 3 ta pul ishlatib qo'ysangiz, 7 ta pul qoladi.\n\n2️⃣ Amaliy misol bilan:\n- Aytaylik, sizda 10 ta konfeta bor\n- Do'stingizga 3 ta konfeta bersangiz\n- Sizda 10 - 3 = 7 ta konfeta qoladi\n\n3️⃣ Yozish usuli:\n- 10 - 3 = 7\n- "O'n chegirmani uch = yetti" deb o'qiydi\n- Minus belgisi (-) ayirish belgisidir\n\n4️⃣ Ko'proq misollar:\n- 20 - 5 = 15\n- 8 - 2 = 6\n- 15 - 10 = 5`
      ],
      'O\'rta Darajali': [
        `📊 Kasrlar - butun sonlar bo'lmagan raqamlar\n\n1️⃣ Kasrlar degani nima:\nKasr - bu biror narsaning bir qismini anglatadi. Misol uchun, agar sizda bir olma bor va uni ikki qismga bo'lsangiz, har bir qism olma kasrida aylanadi. Uni 1/2 deb yozamiz - "bir ikkinchi" yoki "yarim" demak.\n\n2️⃣ Kasrning qismlari:\n- Yuqorida bo'ladigan raqam: Raxs (numerator) - bu nechta qism\n- Pastda bo'ladigan raqam: Maxraj (denominator) - bu jami nechta qismga bo'lingan\n- Masalan 3/4 da: 3 ta qism olgan, 4 ta qismga bo'lingan\n\n3️⃣ Amaliy misollar:\n- 1/2 = yarim (bir qismning ikki qismidan biri)\n- 1/3 = uchinshisi (bir qismning uch qismidan biri)\n- 2/5 = besh qismning ikki qismi\n\n4️⃣ Kasrlarni solishtirlash:\n- 1/2 katta 1/4 dan (yarim katta chorekdan)\n- 3/4 katta 2/4 dan`,
        `🔬 Foizlar - yuzdan bir qism\n\n1️⃣ Foiz degani nima:\nFoiz (%) - bu narsaning yuzdan bir qismini anglatadi. Masalan, 100 ta tan bor deb tasavvur qiling. 50% demak 100 taning 50 tasi - yarim demak.\n\n2️⃣ Asosiy qoidalar:\n- 100% = barchasi (butun narsaning 100 qismi)\n- 50% = yarimi (butun narsaning 50 qismi)\n- 25% = chorek (butun narsaning 25 qismi)\n- 0% = hech biri (butun narsaning 0 qismi)\n\n3️⃣ Haqiqiy misol:\n- Agar kitob 100 som turgan, va chegirma 20% bo'lsa\n- Chegirma = 100 ning 20 qismi = 20 som\n- Yangi narx = 100 - 20 = 80 som\n\n4️⃣ Ko'proq misollar:\n- Agar test 50 ta savoldan iborat, va siz 40 ta savolga javob bersangiz: 40/50 × 100% = 80%\n- Agar 200 ta talaba bor, va 30% yurt tashqarida, bu 60 ta talaba demak`,
        `💡 Nisbat va proportsiya\n\n1️⃣ Nisbat degani:\nNisbat - bu ikki yoki undan ko'p narsaning o'zaro bog'lanishini ko'rsatadi. Misol: agar 2 ta qiz va 3 ta o'g'il bor, nisbat 2:3, yoki "ikki dan uch" deb o'qiydi.\n\n2️⃣ Nisbatdan foydalaish:\n- Agar sinfda o'g'il va qizlar soni 2:3 bo'lsa\n- Va sinfda jami 25 ta talaba bor\n- O'g'il: 25 × 2/5 = 10 ta\n- Qiz: 25 × 3/5 = 15 ta\n\n3️⃣ Proportsiya nima:\nProportsiya - bu ikki nisbat bir-biriga teng bo'lishi. Masalan: 2/3 = 4/6 proportsiya deyiladi.\n\n4️⃣ Amaldan foydalanish:\n- Agar reseptda 2 kubok un va 1 kubok suv bo'lsa\n- Va siz 6 kubok un ishlatmoqchi bo'lsangiz\n- Suvni nechta kubok ishlatish kerak? Ko'proq - uch kubok!`
      ],
      'Murakkab': [
        `🚀 Raqamlar sistemasi va turli asoslar\n\n1️⃣ O'nlik sistema (asosiy):\nBiz kunlik hayotda 10 asosli sistemani ishlatamiz - 0 dan 9 gacha raqamlar. Har bir o'ringa 10 marta ko'p qiymati bor. Misalga 25 = 2×10 + 5×1. Buni 100 + 20 + 5 deb bo'lib yo'zish mumkin, lekin 10 asosida bu 25 demak.\n\n2️⃣ Ikkilik sistema (binary):\nKompyuterlar ikkilik sistemani ishlatadi - faqat 0 va 1. Bir o'ringa 2 marta ko'p qiymati bor. Masalga:\n- 1010 ikkilikda = 1×8 + 0×4 + 1×2 + 0×1 = 10 o'nlikda\n- Har bir o'rin o'nchasining 2 marta ko'p qiymati\n\n3️⃣ O'n oltislik sistema (hexadecimal):\nHexadecimal - 0-9 va A-F gacha (16 ta belgini ishlatadi). Talaba va mutaxassislarda qo'llaniladi. FF = 15×16 + 15×1 = 255 o'nlikda.\n\n4️⃣ Nega kerak:\n- O'nlik - odam fikirlashga qulay\n- Ikkilik - kompyuter tushunishiga qulay\n- O'n oltislik - qisqaroq yozishga qulay`,
        `🔍 Algebraik tenglamalarni yechish\n\n1️⃣ Tenglama degani:\nTenglama - bu ikkita narsa bir-biriga teng demak, ammo birida noma'lum (bilinmagan) raqam bor. Masalga: x + 5 = 12. Bunda x nima ekanini topish kerak.\n\n2️⃣ Yechish qoidasi:\nTenglama yechishda, noma'lumni o'z-o'ziga qoldirish kerak. Buning uchun:\n- Ikkala tarafga bir xil amallarni qo'llanish kerak\n- Misalga x + 5 = 12 ni yechish:\n  - Ikkala tarafdan 5 ni ayirish: x + 5 - 5 = 12 - 5\n  - Natija: x = 7\n\n3️⃣ Murakkab misollar:\n- 2x + 3 = 11\n- Avval: 2x + 3 - 3 = 11 - 3 → 2x = 8\n- Keyin: 2x ÷ 2 = 8 ÷ 2 → x = 4\n\n4️⃣ Tekshirish:\nSizning javobingizni asl tenglamaga qo'yib tekshiring: 2×4 + 3 = 8 + 3 = 11 ✓`,
        `⚡ Qadriy va o'zgaruvchilar\n\n1️⃣ Qadriy degani:\nQadriy - bu o'lchanishi mumkin bo'lgan biror narsaning miqdori. Masalga: balandlik, og'irlik, vaqt, narx. Har bir qadriga birlik bor: metr, kilogramm, soat, som.\n\n2️⃣ O'zgaruvchi degani:\nO'zgaruvchi - bu qadriy o'zgarib turadigan narsaga yordam beradi. Misalga: y = 2x tenglamada, x o'zgaruvchi bo'lib u o'zgarsa, y ham o'zgaradi.\n\n3️⃣ Funksiya nima:\nFunksiya - bu ikkita qadriy o'rtasidagi bog'lanish. Agar x bergan bo'lsangiz, u y ni aytib beradi. Misalga f(x) = x + 5:\n- Agar x = 1, f(1) = 1 + 5 = 6\n- Agar x = 10, f(10) = 10 + 5 = 15\n\n4️⃣ Grafikda qanday ko'rinadi:\nGrafikda x va y qiymatlari nuqta sifatida joylanadi. O'zgaruvchi o'zgarsa, grafik chiziq yoki egri chiziq hosil bo'ladi.`
      ]
    },
    english: {
      'Yangi Boshg\'ichni': [
        `🌍 "Be" verbi (Am, Is, Are)\n\n1️⃣ Birinch bilish kerak:\n"Be" - bu eng muhim verb. U ko'p joyda ishlatiladi. Uch shakli bor:\n- I am = men bo'laman\n- He/She/It is = u bo'ladi\n- You/We/They are = ular bo'ladilar\n\n2️⃣ Qanday ishlatiladi:\n- "I am a student" = Men talaba bo'laman\n- "She is happy" = U baxtli\n- "They are friends" = Ular do'stlar\n\n3️⃣ Salbiy shakli:\n- "I am not tall" = Men baland emasman\n- "He is not 10 years old" = U 10 yoshli emas\n\n4️⃣ Savollar qo'yish:\n- "Are you happy?" = Siz baxtlisizmi?\n- "Is she your friend?" = U sizning do'stomni?\n- "Are they students?" = Ularmi talabalar?\n\n5️⃣ Amaliy ish:\nOz haqingizda 5 ta gapga yozing (I am..., You are..., We are...)`,
        `✅ Hozirgi vaqt (Present Simple)\n\n1️⃣ Nima uchun kerak:\nPresent Simple - bu har kuni qilishimiz ishlar uchun. Misalga: Men har kuni maktabga boran, siz o'z uyida oyin oynamoq.\n\n2️⃣ Qanday qo'llaniladi:\n- I/You/We/They play football = Men/Siz/Biz futbol o'ynamiz\n- He/She plays football = U futbol o'ynaydi\n- Fark: He/She da -s yoki -es qo'shiladi!\n\n3️⃣ Salbiy:\n- "I don't play football" = Men futbol o'ynamanman\n- "He doesn't play football" = U futbol o'ynamaydi\n\n4️⃣ Savol:\n- "Do you play football?" = Siz futbol o'ynamasizmi?\n- "Does he play football?" = U futbol o'ynamadimi?\n\n5️⃣ Ko'proq misollar:\n- I go to school (Men maktabga boraman)\n- She eats breakfast (U nonushta yiydi)\n- They sleep at night (Ular kechasi uyquydi)\n- We study English (Biz ingliz tilini o'rganamiz)`,
        `📝 Shaxsiy haqida gap qo'yish\n\n1️⃣ Asosiy savollar:\nKim haqida bilmoqchi bo'lganda quyidagi savollarni bersangiz bo'ladi:\n- "What is your name?" = Sizning ismingiz nima?\n- "How old are you?" = Siz nechta yoshsiz?\n- "Where do you live?" = Siz qayerda yasaysiz?\n\n2️⃣ Javob berish:\n- "My name is Ahmed" = Mening ismim Ahmed\n- "I am 15 years old" = Men 15 yoshman\n- "I live in Tashkent" = Men Toshkentda yasaymanman\n\n3️⃣ Yanada murakkab savollar:\n- "What is your favorite color?" = Sizning sevimli rangingiz nima?\n- "Do you have brothers or sisters?" = Sizda aka-uka yoki singlishlar bormi?\n- "What do you like to do?" = Siz nima qilishni yoqtirasiz?\n\n4️⃣ Shaxsiy ma'lumot:\n- I like soccer = Men futbolni yoqtiraman\n- My best friend is Ahmed = Mening eng yaxshi do'stim Ahmed\n- I want to be a doctor = Men doktor bo'lmoqchiman`
      ],
      'O\'rta Darajali': [
        `🎯 O'tgan vaqt (Past Simple)\n\n1️⃣ Qachon ishlatiladi:\nPast Simple - bu kemaga bo'lgan voqealarni anglatadi. Masalga: "Mingina men futbol o'ynadi" yoki "U kecha kitob o'qidi".\n\n2️⃣ Regulyar fe'llar:\nAksariyat fe'llarni o'tgan vaqtda -ed qo'shib aytamiz:\n- Play → Played (o'ynadi)\n- Walk → Walked (yurdi)\n- Study → Studied (o'rganadi)\n- Work → Worked (ishladi)\n- Watch → Watched (tomosha qildi)\n\n3️⃣ Noto'g'ri (irregular) fe'llar:\nBa'zi fe'llar o'zgarib ketadi:\n- Go → Went (ketdi)\n- See → Saw (ko'rdi)\n- Eat → Ate (yedi)\n- Have → Had (ega bo'ldi)\n- Do → Did (qildi)\n\n4️⃣ Salbiy va savollar:\n- "I didn't go to school" = Men maktabga bormadim\n- "Did you play football yesterday?" = Siz kecha futbol o'ynadi?" \n- "She didn't eat breakfast" = U nonushta yimadi\n\n5️⃣ Amaliy hikoya:\nO'zingiz haqida o'tgan haftaga qanday narsalar qildingiz yozing`,
        `🗣️ Hozirgi davriy vaqt (Present Continuous)\n\n1️⃣ Bu vaqt nimani anglatadi:\nPresent Continuous - bu hozir shu paytda qilayotgan ishlar uchun. "I am sitting in the classroom" = Men shuness o'qish xonasida o'tiryapman.\n\n2️⃣ Qanday tuziladi:\nAm/Is/Are + fe'l + ing\n- I am playing football = Men futbol o'ynayotganman\n- He is reading a book = U kitob o'qiyotmoqda\n- They are studying = Ular o'rganayotganlar\n\n3️⃣ Ema'not va savollar:\n- "I am not sleeping" = Men uyquda qilmayman\n- "Is she studying?" = U o'rganayotmidimi?\n- "Are you listening?" = Siz tinglayotganmisiz?\n\n4️⃣ Present Simple vs Continuous:\n- Present Simple: "I play football on weekends" (har hafta oxirida)\n- Continuous: "I am playing football now" (hozir shu payt)\n\n5️⃣ Odatiy kamchiliklar:\n- "I am going to school" = Men maktabga borayotganman\n- "We are eating lunch" = Biz tushlik jami ishlayotganlar\n- "She is watching TV" = U televiziyor tomosha qilayotmoqda`,
        `💬 Konversasiyalar juda oson\n\n1️⃣ Uchrashuv salomi:\n- "Hi! How are you?" = Salom! Siz qandasiz?\n- "I'm fine, thank you. And you?" = Yaxshi, rahmat. Siz?\n- "I'm good too, thanks!" = Menim ham yaxshi, rahmat!\n\n2️⃣ Do'st bilan suhbat:\n- "What did you do yesterday?" = Siz kecha nima qildingiz?\n- "I played football and watched a movie" = Men futbol o'yndim va film tomosha qildim\n- "That sounds fun! Can I join next time?" = Bu qiziq! Keyingi marta men ham qo'shila olamanmi?\n\n3️⃣ Sinfda muloqat:\n- "Can I help you?" = Men sizga yordam bera olamanmi?\n- "Yes, please. I don't understand this question" = Albatta. Men bu savolni tushunmayapman\n- "Sure, let me explain it to you" = Aniq, men sizga tushuntirtap beraman\n\n4️⃣ Telefon suhbati:\n- "Hello, can I speak to Ahmed?" = Salom, Ahmed bilan gapirisham bo'ladimi?\n- "Just a moment, please" = Bir payt kutib tur, iltimos\n- "This is Ahmed speaking. How can I help?" = Men Ahmed. Qanday yordam bera olamn?`
      ],
      'Murakkab': [
        `🏆 Conditional (Shartli) gaplar\n\n1️⃣ Birinchi shartli (Possible future):\nAgar hozir nima qilsak, kelajakda nima bo'ladi deb o'ylaymiz.\n- "If you study hard, you will pass the exam" = Agar siz qat'iy o'rgansan, imtihondan o'tasiz\n- "If it rains, we won't go to the park" = Agar yomg'ir yog'sa, biz parkga bormayapman\n\n2️⃣ Ikkinchi shartli (Imaginary/Unlikely):\nAga hozir nima qilsak, u mavqud emas ammo tasavvur qilamiz nima bo'ladi.\n- "If I were rich, I would travel around the world" = Agar men boyaka bo'lsam, men dunyo atrofida sayohat qilardim\n- "If she studied more, she would get better grades" = Agar u ko'proq o'rgansa, u yaxshiroq ball olardi\n\n3️⃣ Uchinchi shartli (Past regret):\nO'tganda nima qilgan bo'lsak, nima bo'lgan bo'lardi.\n- "If he had studied, he would have passed the exam" = Agar u o'rganib olgan bo'lsa, imtihondan o'tib olardi\n- "If I had known, I wouldn't have made that mistake" = Agar bilgan bo'lsam, men bu xatoli qilmab bo'lardim\n\n4️⃣ Real misollar:\n- First: "If you arrive early, we can have coffee" = Erkali kelsa, biz qahve ichishimiz mumkin\n- Second: "If I knew her, I would help" = Agar men uni tanisam, men yordam berarman\n- Third: "If we had left earlier, we wouldn't have missed the bus" = Agar biz erta ketgan bo'lsak, biz avtobuisni qachirib olmas edik`,
        `📚 Idioms va Phrasal Verbs\n\n1️⃣ Phrasal verbs degani:\nBu verb + preposition yoki adverb birgalikda yangi ma'no beradi.\n- "Look after" = G'amallashmoq (Qanday bolalar look after mother = Bolalar onasiga g'amallashadi)\n- "Give up" = Rag'batini yutqazmoq ("Don't give up!" = Rag'batni yutqazma!)\n- "Break down" = Ishdan chiqmoq (The car broke down = Mashinasoma ishdan chiqdi)\n\n2️⃣ Idioms nima:\nIdiomlar - bu so'zlarni harfiy ma'nosi bilan emas, balki butun jumla bilan ma'no beradi.\n- "It rains cats and dogs" = Qat'iy yomg'ir yog'adi (literal emas - mushuklar va itlar yog'adi emas!)\n- "Piece of cake" = Oson, noqulay emas (Asl cakes - non emas)\n- "Spill the beans" = Siri aymoq, gapini qo'yib bermoq\n- "Break a leg" = Omad tilamoq (sho'udan oldin, literal emas)\n\n3️⃣ Ko'proq phrasal verblar:\n- "Fill in" = To'ldirmoq (Fill in the form = Shaklni to'ldirish)\n- "Put off" = Ertalashtirmoq (Don't put it off = Uni ertalashtirma)\n- "Get along" = Yaxshi munosabatlarda bo'lmoq (We get along well = Biz yaxshi munosabatlardamiz)\n\n4️⃣ Amaldan foydalanish:\nBir gapda bir phrasal verb yoki idiomni ishlatib, ona tilida tarjima qilish o'rganing`,
        `🔐 Advanced tenses va moods\n\n1️⃣ Present Perfect (Hozir qism vaqt):\nO'tganda qilgan ammo hozirga ta'sir etayotgan ishlar.\n- "I have finished my homework" = Men o'z ishimni yakunlgan (va hozir tayyor)\n- "She has lived here for 5 years" = U 5 yil davom bu yerda yasayotgan\n- "Have you ever been to Paris?" = Siz Paris shahriga borganmisiz hech?\n\n2️⃣ Present Perfect Continuous:\nO'tganda boshlangan va hozir ham davom etayotgan ishlar.\n- "I have been studying for 2 hours" = Men 2 soatdir o'rganayotganman\n- "She has been working there since 2020" = U 2020 dan beri u yerda ishlayotgan\n\n3️⃣ Past Perfect (O'tgan vaqt qismi):\nIkki o'tgan voqea bor va qaysi birinchi bo'lganini ko'rsatish.\n- "When I arrived, she had already left" = Men kelganida, u talashay ketib bo'lgan edi\n- "He had finished the work before the boss came" = Xoji ishni tamomlash oldin o'qituvchi keldi\n\n4️⃣ Subjunctive Mood (Tilakli shakllar):\n- "I wish I were taller" = Voy, men baa baland bo'lsam\n- "I suggest that he study more" = Men tavsiya qilaman u ko'proq o'rgansin\n- "It is important that you be on time" = Muhimki, siz vaqtida keling`
      ]
    }
  };

  const categoryKey = category === 'ielts' ? 'english' : category;
  const responseList = responses[categoryKey]?.[difficulty] || responses.school['Yangi Boshg\'ichni'];
  const randomResponse = responseList[Math.floor(Math.random() * responseList.length)];
  
  return `${randomResponse}\n\n✨ Bu javob ${difficulty.toLowerCase()} darajasida. Yana savol bor bo'lsa, so'rab turing!`;
};

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].key);
  const [difficulty, setDifficulty] = useState<Difficulty>('Yangi Boshg\'ichni');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Salom! Men Ustoz AI, o\'quvchilarga javob beradigan AI yordamchisi. Har qanday savolni berib qo\'ying, men uni oddiy va bosqichma-bosqich tushuntirib beraman. Yuqorida qiyinchilik darajasini va fanni tanlang!',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    const question = inputValue.trim();
    if (!question) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: question,
    };

    setMessages((current) => [...current, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = createMockResponse(question, selectedCategory, difficulty);
      const botMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: responseText,
      };
      setMessages((current) => [...current, botMessage]);
      setIsTyping(false);
    }, 1100);
  };

  const handleSave = (id: string) => {
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, saved: !message.saved } : message
      )
    );
  };

  const handleCopy = (text: string) => {
    Alert.alert('Nusxa olingan', 'Javob matni nusxa olingan.');
  };

  return (
    <SafeAreaView style={[styles.page, { backgroundColor: theme.background }]}> 
      <View style={styles.header}>
        <View>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Ustoz AI Suhbat</Text>
          <Text style={[styles.subtitle, { color: theme.text }]}>Har qanday savolga javob oling.</Text>
        </View>
        <IconSymbol name="bubble.left.and.bubble.right.fill" size={32} color={theme.tint} />
      </View>

      <View style={styles.filterRow}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.filterButton,
              selectedCategory === category.key && { backgroundColor: theme.tint },
            ]}
            onPress={() => setSelectedCategory(category.key)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedCategory === category.key && { color: '#fff' },
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.difficultyRow}>
        {DIFFICULTIES.map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.difficultyButton,
              difficulty === level && { borderColor: theme.tint, backgroundColor: theme.tint + '20' },
            ]}
            onPress={() => setDifficulty(level)}
          >
            <Text style={[styles.difficultyText, { color: theme.text }]}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.messageArea} contentContainerStyle={styles.messageContent}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.role === 'assistant' ? styles.assistantBubble : styles.userBubble,
            ]}
          >
            <Text style={[styles.messageText, { color: message.role === 'assistant' ? '#111' : '#fff' }]}>
              {message.text}
            </Text>
            {message.role === 'assistant' && (
              <View style={styles.messageActions}>
                <TouchableOpacity onPress={() => handleCopy(message.text)}>
                  <Text style={styles.actionText}>Nusxa</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSave(message.id)}>
                  <Text style={styles.actionText}>{message.saved ? 'Saqlandi' : 'Saqlash'}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
        {isTyping && (
          <View style={[styles.messageBubble, styles.assistantBubble, styles.typingBubble]}>
            <Text style={styles.messageText}>Ustoz yozmoqda...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Savol yozing..."
          placeholderTextColor="#7f8fa4"
          style={[styles.input, { borderColor: theme.tint, color: theme.text }]}
          multiline
        />
        <TouchableOpacity style={[styles.sendButton, { backgroundColor: theme.tint }]} onPress={handleSend}>
          <IconSymbol name="arrow.up" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
  },
  difficultyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 8,
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#DDD6FE',
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
  },
  messageArea: {
    flex: 1,
    marginBottom: 14,
  },
  messageContent: {
    paddingBottom: 10,
  },
  messageBubble: {
    borderRadius: 20,
    padding: 14,
    marginBottom: 10,
    maxWidth: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  assistantBubble: {
    backgroundColor: '#EEF2FF',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  userBubble: {
    backgroundColor: '#7C3AED',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 18,
  },
  actionText: {
    color: '#7C3AED',
    fontWeight: '700',
    fontSize: 12,
  },
  typingBubble: {
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    marginBottom: Platform.OS === 'ios' ? 24 : 16,
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    fontWeight: '500',
    fontSize: 15,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
});
