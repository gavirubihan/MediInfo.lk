export interface DosageRow {
  ageGroup: string;
  dose: string;
  frequency: string;
  maxPerDay: string;
}

export interface DrugInteraction {
  drug: string;
  note: string;
}

export interface WarningCard {
  title: string;
  severity: 'high' | 'medium' | 'info';
  text: string;
}

export interface LocalizedMedicineContent {
  description: string;
  usedFor: string[];
  howItWorks: string;
  dosageNotes: string;
  sideEffectsCommon: string[];
  sideEffectsLessCommon: string[];
  sideEffectsSerious: string[];
  warningCards: WarningCard[];
}

export interface MedicineRecord {
  id: string;
  slug: string;
  genericName: string; // Common Generic Name (e.g. Paracetamol, Amoxicillin)
  chemicalName: string; // Active Ingredient / Chemical Salt Name (e.g. Acetaminophen, Amoxicillin Trihydrate)
  brandNames: string[]; // Commercial brand names in Sri Lanka (e.g. Panadol, Amoxil, Augmentin)
  category: string;
  coverImage: string;
  form: string[];
  strength: string;
  ageGroup: string;
  prescriptionRequired: boolean;
  verified: boolean;
  maxDailyDoseAdults: string;
  rating: string;
  reviewCount: string;
  dosageRows: DosageRow[];
  drugInteractions: DrugInteraction[];
  localized: {
    en: LocalizedMedicineContent;
    si: LocalizedMedicineContent;
    ta: LocalizedMedicineContent;
  };
}

export const sampleMedicines: MedicineRecord[] = [
  // 1. PARACETAMOL
  {
    id: 'med-01',
    slug: 'paracetamol',
    genericName: 'Paracetamol',
    chemicalName: 'Acetaminophen (Paracetamol)',
    brandNames: ['Panadol', 'Calpol', 'Disprol', 'Febrex', 'P-500', 'Crocin', 'Metacin', 'SPC Paracetamol'],
    category: 'Painkiller & Antipyretic',
    coverImage: '/images/medicine/paracetamol-cover.png',
    form: ['Tablet', 'Syrup', 'Suppository'],
    strength: '500mg / 1000mg / 120mg/5ml',
    ageGroup: 'Adults & Children',
    prescriptionRequired: false,
    verified: true,
    maxDailyDoseAdults: '4000mg',
    rating: '4.8',
    reviewCount: '124 Verified Dr Reviews',
    dosageRows: [
      { ageGroup: 'Adults (≥18 yrs)', dose: '500mg–1000mg', frequency: 'Every 4–6 hours', maxPerDay: '4000mg' },
      { ageGroup: 'Elderly (≥65 yrs)', dose: '500mg', frequency: 'Every 6 hours', maxPerDay: '2000mg' },
      { ageGroup: 'Children (6–12 yrs)', dose: '250mg–500mg', frequency: 'Every 4–6 hours', maxPerDay: '2000mg' },
      { ageGroup: 'Infants (1–5 yrs)', dose: '120mg–250mg (Syrup)', frequency: 'Every 6 hours', maxPerDay: '1000mg' },
    ],
    drugInteractions: [
      { drug: 'Warfarin', note: 'May enhance anticoagulant effect with prolonged daily use. Monitor INR closely.' },
      { drug: 'Carbamazepine / Phenytoin', note: 'May increase risk of liver toxicity by accelerating acetaminophen metabolism.' },
      { drug: 'Alcohol', note: 'Chronic alcohol consumption combined with paracetamol markedly increases severe hepatotoxicity risk.' },
    ],
    localized: {
      en: {
        description: 'Paracetamol (Acetaminophen) is a widely used pain reliever and fever reducer in Sri Lanka. It is indicated for mild to moderate pain relief such as headaches, muscle aches, toothaches, post-vaccination fever, and cold symptoms.',
        usedFor: [
          'Mild to moderate pain relief (headache, backache, toothache)',
          'Reduction of fever in adults, children, and infants',
          'Post-vaccination fever and body soreness',
          'Joint pain relief in osteoarthritis',
        ],
        howItWorks: 'Paracetamol acts primarily in the central nervous system by inhibiting prostaglandin synthesis in the brain and adjusting the hypothalamic heat-regulating center to lower fever.',
        dosageNotes: 'Do not exceed 4000mg in 24 hours. Leave at least 4 hours between doses. Check cough and cold medicines to ensure they do not also contain paracetamol.',
        sideEffectsCommon: [
          'Generally well tolerated at recommended doses',
          'Mild nausea in rare sensitive individuals',
        ],
        sideEffectsLessCommon: [
          'Mild skin rash or itching',
          'Digestive discomfort',
        ],
        sideEffectsSerious: [
          'Signs of liver toxicity (yellowing skin/eyes, dark urine, severe right upper abdominal pain)',
          'Severe allergic anaphylaxis (facial swelling, throat tightness, breathing difficulty)',
          'Unusual bleeding or dark tarry stools',
        ],
        warningCards: [
          { title: 'Alcohol & Liver Warning', severity: 'high', text: 'Do not consume alcohol while taking paracetamol. Chronic alcohol intake combined with paracetamol increases the risk of severe acute liver failure.' },
          { title: 'Overdose Hazard', severity: 'high', text: 'Taking more than the recommended daily limit (4g/day for adults) can cause fatal liver damage. Seek emergency poison center help immediately if overdose occurs.' },
          { title: 'Combination Medicines', severity: 'medium', text: 'Many over-the-counter cold, flu, and cough syrups already contain paracetamol. Taking them together leads to accidental overdose.' },
        ],
      },
      si: {
        description: 'පැරසිටමෝල් (ඇසිටමිනෝෆෙන්) යනු ශ්‍රී ලංකාවේ වේදනා සමනය කිරීමට සහ උණ පාලනය කිරීමට බහුලවම භාවිතා වන ඖෂධයකි. හිසරදය, ඇඟපත වේදනාව, දත් කැක්කුම, එන්නත් කිරීමෙන් පසු උණ සහ සෙම්ප්‍රතිශ්‍යාව සඳහා සුදුසු වේ.',
        usedFor: [
          'සුළු හා මධ්‍යස්ථ වේදනා පාලනය (හිසරදය, කොන්දේ කැක්කුම, දත් කැක්කුම)',
          'වැඩිහිටියන්ගේ සහ කුඩා ළමයින්ගේ උණ අඩු කිරීම',
          'එන්නත් දීමෙන් පසු ඇතිවන උණ සහ අපහසුතාවයන්',
          'සන්ධි වේදනා පාලනය',
        ],
        howItWorks: 'පැරසිටමෝල් මගින් මොළයේ වේදනා සංඥා අවහිර කරන අතර ශරීර උෂ්ණත්වය පාලනය කරන හයිපොතලමසයට බලපෑම් කර උණ අඩු කරයි.',
        dosageNotes: 'පැය 24 ක් තුළ ග්‍රෑම් 4 (මිලිග්‍රෑම් 4000) ඉක්මවා නොයන්න. මාත්‍රා දෙකක් අතර පැය 4 ක අවම පරතරයක් තබන්න.',
        sideEffectsCommon: [
          'නිර්දේශිත මාත්‍රාවලින් භාවිතයේදී අතුරු ආබාධ ඉතා අවමය',
          'කලාතුරකින් සුළු වමනය ගතිය',
        ],
        sideEffectsLessCommon: [
          'සමේ සුළු කැසීම හෝ කුෂ්ඨ',
          'බඩවැල් අපහසුතාව',
        ],
        sideEffectsSerious: [
          'අක්මා හානියේ ලක්ෂණ (සම කහ වීම, තද පැහැති මුත්‍රා, බඩේ තද කැක්කුම)',
          'දැඩි අසාත්මිකතා (ශ්වසන අපහසුතා, මුහුණ සහ තොල් ඉදිමීම)',
        ],
        warningCards: [
          { title: 'මත්පැන් සහ අක්මා අවදානම', severity: 'high', text: 'පැරසිටමෝල් ගන්නා විට මත්පැන් පානය නොකරන්න. මත්පැන් සහ පැරසිටමෝල් එකට ගැනීමෙන් අක්මාවට බරපතල හානි සිදුවේ.' },
          { title: 'අධිමාත්‍රා අවදානම', severity: 'high', text: 'දිනකට ග්‍රෑම් 4 ට වඩා ගැනීමෙන් අක්මාව අක්‍රිය විය හැක. අධික ලෙස ගතහොත් වහාම ආසන්නතම රෝහල වෙත යන්න.' },
          { title: 'මිශ්‍ර ඖෂධ පිළිබඳ සැලකිලිමත් වන්න', severity: 'medium', text: 'බොහෝ සෙම්ප්‍රතිශ්‍යා සහ උගුරේ කැක්කුම සඳහා ගන්නා පැණි වර්ගවල පැරසිටමෝල් අඩංගු වේ.' },
        ],
      },
      ta: {
        description: 'பாரசிட்டமால் (அசிடமினோஃபென்) இலங்கையில் வலி நிவாரணி மற்றும் காய்ச்சலைக் குறைக்க பரவலாகப் பயன்படுத்தப்படும் ஒரு மருந்தாகும். தலைவலி, உடல் வலி, பல் வலி மற்றும் காய்ச்சலுக்கு இது உகந்தது.',
        usedFor: [
          'மிதமான வலி நிவாரணம் (தலைவலி, முதுகு வலி, பல் வலி)',
          'பெரியவர்கள் மற்றும் குழந்தைகளில் காய்ச்சலைக் குறைத்தல்',
          'தடுப்பூசிக்கு பின் ஏற்படும் காய்ச்சல்',
        ],
        howItWorks: 'பாரசிட்டமால் மூளையில் உள்ள வலி சமிக்ஞைகளைத் தடுப்பதன் மூலமும் உடலின் வெப்பநிலையைக் கட்டுப்படுத்தும் அமைப்பில் செயல்படுவதன் மூலமும் காய்ச்சலைக் குறைக்கிறது.',
        dosageNotes: '24 மணி நேரத்தில் 4000 மிகி அளவுக்கு மேல் சாப்பிட வேண்டாம். அளவுகளுக்கு இடையே 4 மணி நேர இடைவெளி இருக்க வேண்டும்.',
        sideEffectsCommon: [
          'பரிந்துரைக்கப்பட்ட அளவுகளில் பக்கவிளைவுகள் மிகக் குறைவு',
        ],
        sideEffectsLessCommon: [
          'தோல் சொறி அல்லது அரிப்பு',
        ],
        sideEffectsSerious: [
          'கல்லீரல் பாதிப்பின் அறிகுறிகள் (மஞ்சள் காமாலை, அடர் சிறுநீர்)',
          'கடுமையான ஒவ்வாமை எதிர்வினைகள் (மூச்சு திணறல், முகம் வீக்கம்)',
        ],
        warningCards: [
          { title: 'மதுபான எச்சரிக்கை', severity: 'high', text: 'பாரசிட்டமால் சாப்பிடும்போது மது அருந்த வேண்டாம். இது கடுமையான கல்லீரல் பாதிப்பை ஏற்படுத்தும்.' },
          { title: 'அதிகப்படியான அளவு எச்சரிக்கை', severity: 'high', text: 'ஒரு நாளைக்கு 4 கிராமுக்கு மேல் சாப்பிடுவது உயிருக்கு ஆபத்தான கல்லீரல் பாதிப்பை ஏற்படுத்தும்.' },
        ],
      },
    },
  },

  // 2. AMOXICILLIN
  {
    id: 'med-02',
    slug: 'amoxicillin',
    genericName: 'Amoxicillin',
    chemicalName: 'Amoxicillin Trihydrate',
    brandNames: ['Amoxil', 'Augmentin', 'Mox', 'Curam', 'Ospamox', 'SPC Amoxicillin'],
    category: 'Antibiotic (Penicillin Derivative)',
    coverImage: '/images/medicine/amoxicillin-cover.png',
    form: ['Capsule', 'Syrup', 'Dispersible Tablet'],
    strength: '250mg / 500mg / 125mg/5ml',
    ageGroup: 'Adults & Children',
    prescriptionRequired: true,
    verified: true,
    maxDailyDoseAdults: '3000mg',
    rating: '4.7',
    reviewCount: '98 Verified Dr Reviews',
    dosageRows: [
      { ageGroup: 'Adults (≥18 yrs)', dose: '250mg–500mg', frequency: 'Every 8 hours (TID)', maxPerDay: '3000mg' },
      { ageGroup: 'Children (2–12 yrs)', dose: '125mg–250mg', frequency: 'Every 8 hours', maxPerDay: '1500mg' },
      { ageGroup: 'Infants (<2 yrs)', dose: '62.5mg–125mg', frequency: 'Every 8 hours', maxPerDay: '750mg' },
    ],
    drugInteractions: [
      { drug: 'Allopurinol', note: 'Increased incidence of skin rash when taken concurrently with amoxicillin.' },
      { drug: 'Oral Anticoagulants (Warfarin)', note: 'May prolong bleeding time and INR. Frequent monitoring required.' },
      { drug: 'Oral Contraceptives', note: 'May slightly reduce birth control efficacy. Additional barrier protection recommended.' },
    ],
    localized: {
      en: {
        description: 'Amoxicillin is a broad-spectrum penicillin antibiotic used to treat bacterial infections including respiratory tract infections, ear/nose/throat infections, urinary tract infections, and skin bacterial infections.',
        usedFor: [
          'Bacterial tonsillitis, sinusitis, and bronchitis',
          'Middle ear infections (Otitis media)',
          'Uncomplicated urinary tract infections (UTIs)',
          'Dental infections and abscesses',
        ],
        howItWorks: 'Amoxicillin inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins, causing bacterial lysis and cell death.',
        dosageNotes: 'Must be taken for the full duration prescribed by your doctor (usually 5–7 days). Do not stop even if you feel better.',
        sideEffectsCommon: [
          'Mild diarrhea or loose stools',
          'Mild nausea or vomiting',
        ],
        sideEffectsLessCommon: [
          'Mild urticarial skin rash',
          'Oral thrush or fungal overgrowth',
        ],
        sideEffectsSerious: [
          'Severe anaphylactic shock (difficulty breathing, severe facial swelling)',
          'Clostridium difficile severe watery diarrhea',
          'Jaundice or hepatitis symptoms',
        ],
        warningCards: [
          { title: 'Penicillin Allergy Warning', severity: 'high', text: 'Do not take amoxicillin if you have a known history of severe penicillin or cephalosporin allergy. Can trigger life-threatening anaphylaxis.' },
          { title: 'Prescription Only', severity: 'high', text: 'This is a prescription-only antibiotic. Taking it for viral colds or flu will not work and contributes to global antibiotic resistance.' },
          { title: 'Complete Course', severity: 'medium', text: 'Stopping amoxicillin early allows resistant bacterial superbugs to survive and multiply.' },
        ],
      },
      si: {
        description: 'ඇමොක්සිසිලින් (Amoxicillin) යනු බැක්ටීරියා මගින් ඇතිවන රෝග සඳහා ලබා දෙන ප්‍රධාන ඇන්ටිබයොටික් ඖෂධයකි. ශ්වසන පද්ධතියේ ආසාදන, කන් සහ උගුරේ ආසාදන, සහ මුත්‍රා මාර්ගයේ ආසාදන සඳහා වෛද්‍ය නිර්දේශය මත ලබා දෙනු ලැබේ.',
        usedFor: [
          'ශ්වසන පද්ධතියේ බැක්ටීරියා ආසාදන (ටොන්සිලයිටිස්, බ්‍රොන්කයිටිස්)',
          'කන් සහ උගුරේ ආසාදන',
          'මුත්‍රා මාර්ගයේ ආසාදන',
          'දත් ආසාදන සහ සැරව ගෙඩි',
        ],
        howItWorks: 'ඇමොක්සිසිලින් මගින් බැක්ටීරියාවල සෛල බිත්තිය ගොඩනැගීම අවහිර කර බැක්ටීරියා විනාශ කරයි.',
        dosageNotes: 'වෛද්‍යවරයා නිර්දේශ කළ දින ගණන (සාමාන්‍යයෙන් දින 5-7) සම්පූර්ණයෙන්ම ලබා ගන්න. සුවයක් දැනුනද මැදදී නතර නොකරන්න.',
        sideEffectsCommon: [
          'සුළු පාචනය හෝ බඩ බුරුල් වී යාම',
          'සුළු වමනය ගතිය',
        ],
        sideEffectsLessCommon: [
          'සමේ සුළු රතු පැහැති කුෂ්ඨ',
        ],
        sideEffectsSerious: [
          'දැඩි අසාත්මිකතා ප්‍රතික්‍රියා (ශ්වසන අපහසුතා, මුහුණ ඉදිමීම)',
          'දැඩි පාචන තත්ත්වයන් (C. difficile infection)',
        ],
        warningCards: [
          { title: 'පෙනිසිලින් අසාත්මිකතා අවවාදය', severity: 'high', text: 'ඔබට පෙනිසිලින් (Penicillin) අසාත්මිකතාවයක් ඇත්නම් කිසිවිටෙකත් ඇමොක්සිසිලින් නොගන්න.' },
          { title: 'වෛද්‍ය නිර්දේශය මත පමණි', severity: 'high', text: 'මෙය වෛද්‍ය නිර්දේශයක් මත පමණක් ගත යුතු ඖෂධයකි. වෛරස් උණ හෝ සෙම්ප්‍රතිශ්‍යාවට නිකරුණේ නොගන්න.' },
        ],
      },
      ta: {
        description: 'அமோக்சிசில்லிளன் (Amoxicillin) என்பது பாக்டீரியா தொற்றுகளுக்கு சிகிச்சையளிக்கப் பயன்படும் ஒரு நுண்ணுயிர் எதிர்ப்பி (Antibiotic) மருந்தாகும். மூச்சுக்குழாய், காது, தொண்டை மற்றும் சிறுநீர் பாதை தொற்றுகளுக்கு இது பரிந்துரைக்கப்படுகிறது.',
        usedFor: [
          'சுவாசப் பாதை பாக்டீரியா தொற்றுகள்',
          'காது மற்றும் தொண்டை தொற்றுகள்',
          'சிறுநீர் பாதை தொற்றுகள்',
        ],
        howItWorks: 'அமோக்சிசில்லிளன் பாக்டீரியாக்களின் செல் சுவரை அழித்து அவற்றை அழிக்கிறது.',
        dosageNotes: 'மருத்துவர் பரிந்துரைத்த நாட்களுக்கு (5-7 நாட்கள்) முழுமையாக மருந்தைச் சாப்பிட வேண்டும்.',
        sideEffectsCommon: [
          'மிதமான வயிற்றுப்போக்கு',
          'குமட்டல்',
        ],
        sideEffectsLessCommon: [
          'தோல் சொறி',
        ],
        sideEffectsSerious: [
          'கடுமையான ஒவ்வாமை (மூச்சுத் திணறல், முகம் வீக்கம்)',
        ],
        warningCards: [
          { title: 'பெனிசிலின் ஒவ்வாமை எச்சரிக்கை', severity: 'high', text: 'பெனிசிலின் ஒவ்வாமை உள்ளவர்கள் இந்த மருந்தைச் சாப்பிடக் கூடாது.' },
        ],
      },
    },
  },

  // 3. METFORMIN
  {
    id: 'med-03',
    slug: 'metformin',
    genericName: 'Metformin',
    chemicalName: 'Metformin Hydrochloride',
    brandNames: ['Glucophage', 'Glycomet', 'Metfor', 'Formin', 'Metfor-XR', 'SPC Metformin'],
    category: 'Antidiabetic (Biguanide)',
    coverImage: '/images/medicine/metformin-cover.png',
    form: ['Tablet', 'Extended Release (XR) Tablet'],
    strength: '500mg / 850mg / 1000mg',
    ageGroup: 'Adults (≥10 yrs)',
    prescriptionRequired: true,
    verified: true,
    maxDailyDoseAdults: '2550mg',
    rating: '4.9',
    reviewCount: '156 Verified Dr Reviews',
    dosageRows: [
      { ageGroup: 'Adults Type 2 Diabetes', dose: '500mg–850mg', frequency: 'Twice or thrice daily with meals', maxPerDay: '2550mg' },
      { ageGroup: 'Metformin XR (Extended Release)', dose: '500mg–1000mg', frequency: 'Once daily with evening meal', maxPerDay: '2000mg' },
    ],
    drugInteractions: [
      { drug: 'Iodinated Radiocontrast Agents', note: 'Must withhold metformin prior to or at time of imaging procedure due to lactic acidosis risk.' },
      { drug: 'Cimetidine', note: 'Increases peak plasma metformin concentrations. Dose adjustment may be needed.' },
      { drug: 'Alcohol', note: 'Significantly potentiates the risk of severe lactic acidosis.' },
    ],
    localized: {
      en: {
        description: 'Metformin is the first-line oral antidiabetic medication for managing Type 2 Diabetes Mellitus. It lowers blood glucose levels without causing hypoglycemia and helps improve insulin sensitivity.',
        usedFor: [
          'First-line treatment for Type 2 Diabetes Mellitus',
          'Polycystic Ovary Syndrome (PCOS) insulin resistance management',
          'Prediabetes glucose control in high-risk individuals',
        ],
        howItWorks: 'Metformin decreases hepatic glucose production, decreases intestinal absorption of glucose, and improves insulin sensitivity by increasing peripheral glucose uptake and utilization.',
        dosageNotes: 'Take with or immediately after main meals to minimize stomach upset. Swallow XR tablets whole without crushing or chewing.',
        sideEffectsCommon: [
          'Mild abdominal discomfort or bloating',
          'Nausea, vomiting, or diarrhea (usually subsides after 1–2 weeks)',
          'Metallic taste in mouth',
        ],
        sideEffectsLessCommon: [
          'Vitamin B12 deficiency with long-term use',
          'Loss of appetite',
        ],
        sideEffectsSerious: [
          'Lactic Acidosis (rare, life-threatening metabolic emergency: muscle cramps, severe fatigue, cold extremities, hyperventilation)',
        ],
        warningCards: [
          { title: 'Lactic Acidosis Risk', severity: 'high', text: 'Metformin can cause rare but fatal lactic acidosis in severe kidney disease, severe liver failure, or acute heart failure.' },
          { title: 'Renal Function Monitoring', severity: 'high', text: 'Kidney function (eGFR / Serum Creatinine) must be evaluated before starting and periodically during treatment.' },
          { title: 'Alcohol Caution', severity: 'medium', text: 'Avoid heavy alcohol consumption while on Metformin as it dramatically increases lactic acidosis risk.' },
        ],
      },
      si: {
        description: 'මෙට්ෆොමින් (Metformin) යනු දෙවන වර්ගයේ දියවැඩියාව පාලනය කිරීම සඳහා ලබා දෙන ප්‍රධානතම ඖෂධයයි. එය රුධිරයේ සීනි මට්ටම ක්‍රමවත්ව අඩු කරන අතර ඉන්සියුලින් පාලනය පහසු කරයි.',
        usedFor: [
          'දෙවන වර්ගයේ දියවැඩියාව (Type 2 Diabetes) පාලනය',
          'ඩිම්බකෝෂ බහු කෝෂික සින්ඩ්‍රෝමය (PCOS) සඳහා',
          'පූර්ව දියවැඩියා තත්ත්ව පාලනය',
        ],
        howItWorks: 'මෙට්ෆොමින් මගින් අක්මාවෙන් ග්ලූකෝස් නිපදවීම අඩු කරන අතර පටක මගින් ඉන්සියුලින් ලබා ගැනීම වැඩි කරයි.',
        dosageNotes: 'ආහාර වේලක් අතරතුර හෝ ආහාර වේල අවසන් වූ වහාම ලබා ගන්න. එමගින් බඩේ අපහසුතා වළක්වා ගත හැක.',
        sideEffectsCommon: [
          'බඩේ අපහසුතා, බඩ පිපීම හෝ බඩ බුරුල් වී යාම',
          'මුඛයේ ලෝහමය රසයක් දැනීම',
        ],
        sideEffectsLessCommon: [
          'කාලාන්තරයක් භාවිතයේදී විටමින් B12 ඌනතාවය',
        ],
        sideEffectsSerious: [
          'ලැක්ටික් ඇසිඩෝසිස් (Lactic Acidosis - කලාතුරකින් සිදුවන දැඩි තත්ත්වයකි. අධික මහන්සිය, වමනය, ශ්වසන අපහසුතා ඇතිවේ)',
        ],
        warningCards: [
          { title: 'වකුගඩු පරීක්ෂාව අත්‍යවශ්‍යයි', severity: 'high', text: 'වකුගඩු ආබාධ ඇති රෝගීන් මෙට්ෆොමින් භාවිතයට පෙර වෛද්‍යවරයා හමු වී Serum Creatinine පරීක්ෂා කළ යුතුය.' },
          { title: 'මත්පැන් භාවිතය සූදානම් නොවන්න', severity: 'high', text: 'මෙට්ෆොමින් ගන්නා අතරතුර මත්පැන් ගැනීමෙන් ලැක්ටික් ඇසිඩෝසිස් අවදානම දැඩි ලෙස ඉහළ යයි.' },
        ],
      },
      ta: {
        description: 'மெட்ஃபோர்மின் (Metformin) என்பது வகை 2 நீரிழிவு நோயைக் கட்டுப்படுத்தப் பயன்படும் முதன்மை வாய்வழி மருந்தாகும். இது இரத்த சர்க்கரை அளவைக் திறம்பட குறைக்கிறது.',
        usedFor: [
          'வகை 2 நீரிழிவு நோய் சிகிச்சை',
          'PCOS இன்சுலின் எதிர்ப்பு மேலாண்மை',
        ],
        howItWorks: 'மெட்ஃபோர்மின் கல்லீரலில் குளுக்கோஸ் உற்பத்தியைக் குறைத்து இன்சுலின் உணர்திறனை மேம்படுத்துகிறது.',
        dosageNotes: 'வயிற்று அசௌகரியத்தைத் தவிர்க்க உணவுடன் அல்லது உணவுக்குப் பின் மருந்தைச் சாப்பிட வேண்டும்.',
        sideEffectsCommon: [
          'வயிற்று அசௌகரியம், குமட்டல், வயிற்றுப்போக்கு',
        ],
        sideEffectsLessCommon: [
          'வைட்டமின் B12 குறைபாடு',
        ],
        sideEffectsSerious: [
          'லாக்டிக் அசிடோசிஸ் (Lactic Acidosis)',
        ],
        warningCards: [
          { title: 'சிறுநீரக செயல்பாடு கண்காணிப்பு', severity: 'high', text: 'சிறுநீரக நோய் உள்ளவர்கள் மருத்துவ மேற்பார்வையின் கீழ் மட்டுமே பயன்படுத்த வேண்டும்.' },
        ],
      },
    },
  },

  // 4. CETIRIZINE
  {
    id: 'med-04',
    slug: 'cetirizine',
    genericName: 'Cetirizine',
    chemicalName: 'Cetirizine Dihydrochloride',
    brandNames: ['Zyrtec', 'Cetriz', 'Alerid', 'Histazine', 'Cetzine', 'SPC Cetirizine'],
    category: 'Antihistamine (2nd Generation)',
    coverImage: '/images/medicine/cetirizine-cover.png',
    form: ['Tablet', 'Syrup'],
    strength: '10mg / 5mg/5ml',
    ageGroup: 'Adults & Children (≥2 yrs)',
    prescriptionRequired: false,
    verified: true,
    maxDailyDoseAdults: '10mg',
    rating: '4.7',
    reviewCount: '84 Verified Dr Reviews',
    dosageRows: [
      { ageGroup: 'Adults & Teens (≥12 yrs)', dose: '10mg', frequency: 'Once daily (preferably evening)', maxPerDay: '10mg' },
      { ageGroup: 'Children (6–11 yrs)', dose: '5mg–10mg', frequency: 'Once daily or 5mg twice daily', maxPerDay: '10mg' },
      { ageGroup: 'Children (2–5 yrs)', dose: '2.5mg–5mg (Syrup)', frequency: 'Once daily', maxPerDay: '5mg' },
    ],
    drugInteractions: [
      { drug: 'CNS Depressants / Sedatives', note: 'May increase drowsiness when taken with sedative medications or alcohol.' },
      { drug: 'Theophylline', note: 'High doses of theophylline slightly decrease cetirizine clearance.' },
    ],
    localized: {
      en: {
        description: 'Cetirizine is a non-drowsy 2nd generation antihistamine widely prescribed for relief of allergic rhinitis (hay fever), sneezing, runny nose, watery eyes, and chronic allergic skin hives (urticaria).',
        usedFor: [
          'Allergic rhinitis, sneezing, and runny nose',
          'Itchy, watery eyes caused by allergies',
          'Skin hives, itching, and insect bite allergic reactions',
        ],
        howItWorks: 'Cetirizine selectively blocks peripheral H1 histamine receptors, preventing histamine-mediated allergic inflammatory responses.',
        dosageNotes: 'Take once daily with water. Can be taken with or without food. Evening administration is recommended if mild drowsiness occurs.',
        sideEffectsCommon: [
          'Mild drowsiness or fatigue in sensitive individuals',
          'Dry mouth',
        ],
        sideEffectsLessCommon: [
          'Headache or dizziness',
          'Mild stomach pain',
        ],
        sideEffectsSerious: [
          'Severe allergic skin swelling or angioedema (rare)',
        ],
        warningCards: [
          { title: 'Driving & Machinery Caution', severity: 'medium', text: 'Although non-drowsy for most people, cetirizine can cause mild sedation in sensitive individuals. Test reaction before driving.' },
          { title: 'Alcohol Avoidance', severity: 'medium', text: 'Avoid combining cetirizine with alcohol as it enhances central nervous system depression.' },
        ],
      },
      si: {
        description: 'සෙටිරිසින් (Cetirizine) යනු ශ්‍රී ලංකාවේ අසාත්මිකතා (Allergies) සඳහා බහුලවම ලබා දෙන ඇන්ටිහිස්ටමීන් ඖෂධයකි. කිවිසුම් යාම, සොටු දියර ගැලීම, ඇස් කැසීම සහ සමේ පෙනෙන පලු/කුෂ්ඨ සඳහා භාවිත වේ.',
        usedFor: [
          'අසාත්මිකතාවයන් (සෙම්ප්‍රතිශ්‍යාව, කිවිසුම් යාම, සොටු දියර ගැලීම)',
          'ඇස් කැසීම සහ කඳුළු ගැලීම',
          'සමේ පලු දැමීම සහ කැසීම (Hives / Urticaria)',
        ],
        howItWorks: 'සෙටිරිසින් මගින් සිරුරේ අසාත්මිකතා ඇති කරන හිස්ටමීන් (Histamine) රසායනය අවහිර කරයි.',
        dosageNotes: 'දිනකට එක් වරක් පමණක් වතුර සමඟ ලබා ගන්න. රාත්‍රී කාලයේදී ලබා ගැනීම වඩාත් සුදුසුය.',
        sideEffectsCommon: [
          'සුළු නිදිමත ගතිය හෝ මහන්සිය',
          'කට වියළීම',
        ],
        sideEffectsLessCommon: [
          'හිසරදය හෝ කරකැවිල්ල',
        ],
        sideEffectsSerious: [
          'දැඩි සමේ ඉදිමුම් (Angioedema)',
        ],
        warningCards: [
          { title: 'රිය පැදවීමේදී සැලකිලිමත් වන්න', severity: 'medium', text: 'ඇතැම් පුද්ගලයින්ට සුළු නිදිමත ගතියක් ඇතිවිය හැක. රිය පැදවීමට පෙර ඔබේ ප්‍රතික්‍රියාව පරීක්ෂා කරන්න.' },
        ],
      },
      ta: {
        description: 'செட்டிரிசின் (Cetirizine) என்பது ஒவ்வாமை (Allergies), தும்மல், மூக்கு ஒழுகுதல் மற்றும் தோல் அரிப்புகளுக்கு நிவாரணம் அளிக்கும் ஒரு மருந்தாகும்.',
        usedFor: [
          'ஒவ்வாமை, தும்மல் மற்றும் மூக்கு ஒழுகுதல்',
          'கண் அரிப்பு மற்றும் நீர் வடிதல்',
          'தோல் அரிப்பு மற்றும் தடிப்புகள்',
        ],
        howItWorks: 'செட்டிரிசின் உடலில் ஒவ்வாமையை ஏற்படுத்தும் ஹிஸ்டமைன் கெமிக்கலைத் தடுக்கிறது.',
        dosageNotes: 'ஒரு நாளைக்கு ஒரு முறை மட்டுமே சாப்பிட வேண்டும். இரவு நேரத்தில் சாப்பிடுவது சிறந்தது.',
        sideEffectsCommon: [
          'லேசான தூக்கக் கலக்கம்',
          'வாய் வறட்சி',
        ],
        sideEffectsLessCommon: [
          'தலைவலி',
        ],
        sideEffectsSerious: [
          'கடுமையான தோல் வீக்கம்',
        ],
        warningCards: [
          { title: 'வாகன ஓட்டிகளுக்கு எச்சரிக்கை', severity: 'medium', text: 'சிலருக்கு லேசான தூக்கம் வரலாம். வாகனம் ஓட்டுவதற்கு முன் கவனமாக இருக்கவும்.' },
        ],
      },
    },
  },
];

export function getMedicineBySlug(slug: string): MedicineRecord {
  const found = sampleMedicines.find((m) => m.slug.toLowerCase() === slug.toLowerCase());
  return found || sampleMedicines[0];
}
