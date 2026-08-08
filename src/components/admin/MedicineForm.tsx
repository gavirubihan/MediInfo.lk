'use client';
import React, { useState } from 'react';
import { 
  Pill, 
  Sparkles, 
  Check, 
  Plus, 
  Trash2, 
  Eye, 
  Save, 
  AlertTriangle, 
  AlertOctagon,
  Scale, 
  Users, 
  ClipboardList,
  Languages,
  X,
  Info,
  Share2,
  ShieldAlert,
  Activity,
  Tag
} from 'lucide-react';
import { AITranslateModal } from './AITranslateModal';
import { DoctorEmailModal } from './DoctorEmailModal';
import { addOrUpdateMedicine, MedicineRecord } from '@/data/medicinesData';

export interface DosageRow {
  ageGroup: string;
  dose: string;
  frequency: string;
  maxPerDay: string;
}

export interface WarningCard {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'info';
  text: string;
}

export interface DrugInteraction {
  id: string;
  drug: string;
  note: string;
}

export interface LanguageContent {
  description: string;
  usedFor: string[];
  howItWorks: string;
  dosageNotes: string;
  sideEffectsCommon: string[];
  sideEffectsLessCommon: string[];
  sideEffectsSerious: string[];
  warningCards: WarningCard[];
}

export interface MedicineFormData {
  genericName: string;
  chemicalName: string;
  brandNames: string[];
  slug: string;
  category: string;
  form: string[];
  strength: string;
  ageGroup: string;
  prescriptionRequired: boolean;
  verified: boolean;
  maxDailyDoseAdults: string;

  dosageRows: DosageRow[];
  drugInteractions: DrugInteraction[];

  safety: {
    pregnancy: 'safe' | 'caution' | 'unsafe';
    breastfeeding: 'safe' | 'caution' | 'unsafe';
    elderly: 'safe' | 'caution' | 'unsafe';
    children: 'safe' | 'caution' | 'unsafe';
  };

  localizedContent: {
    en: LanguageContent;
    si: LanguageContent;
    ta: LanguageContent;
  };
}

const initialFormState: MedicineFormData = {
  genericName: 'Paracetamol',
  chemicalName: 'Acetaminophen',
  brandNames: ['Panadol', 'Calpol', 'Disprol', 'Febrex', 'P-500', 'Crocin', 'Metacin', 'SPC Paracetamol'],
  slug: 'paracetamol',
  category: 'Painkiller',
  form: ['Tablet', 'Syrup'],
  strength: '500mg / 1000mg',
  ageGroup: 'Adults & Children',
  prescriptionRequired: false,
  verified: false,
  maxDailyDoseAdults: '4000mg',

  dosageRows: [
    { ageGroup: 'Adults (18–64 yrs)', dose: '500–1000mg', frequency: 'Every 4–6 hours', maxPerDay: '4000mg' },
    { ageGroup: 'Elderly (≥65 yrs)', dose: '500mg', frequency: 'Every 6–8 hours', maxPerDay: '2000mg' },
    { ageGroup: 'Adolescents (12–17 yrs)', dose: '500mg', frequency: 'Every 4–6 hours', maxPerDay: '3000mg' },
    { ageGroup: 'Children (6–11 yrs)', dose: '250–500mg', frequency: 'Every 4–6 hours', maxPerDay: '2000mg' },
    { ageGroup: 'Young Children (2–5 yrs)', dose: '120–250mg (Syrup)', frequency: 'Every 4–6 hours', maxPerDay: '1000mg' },
    { ageGroup: 'Infants (1–23 months)', dose: '60–120mg (Infant Drops)', frequency: 'Every 6 hours (Doctor advised)', maxPerDay: '480mg' },
    { ageGroup: 'Neonates (0–28 days)', dose: 'Consult Doctor', frequency: 'Medical Supervision Only', maxPerDay: 'Specialist Specified' },
  ],

  drugInteractions: [
    { id: '1', drug: 'Warfarin', note: 'May enhance anticoagulant effect. Monitor INR closely.' },
    { id: '2', drug: 'Carbamazepine / Phenytoin', note: 'May increase liver toxicity of paracetamol.' },
  ],

  safety: {
    pregnancy: 'caution',
    breastfeeding: 'safe',
    elderly: 'safe',
    children: 'safe',
  },

  localizedContent: {
    en: {
      description: 'Paracetamol (also known as acetaminophen) is one of the most widely used medicines in the world. It belongs to the analgesic (pain reliever) and antipyretic (fever reducer) class of medications. It is available over the counter in most countries without a prescription.',
      usedFor: [
        'Mild to moderate pain (headache, toothache, back pain)',
        'Fever reduction in adults and children',
        'Post-vaccination fever and discomfort',
        'Muscle aches and cold/flu symptoms',
      ],
      howItWorks: 'Paracetamol works by blocking pain signals in the brain and reducing fever by acting on the hypothalamus — the part of the brain that regulates body temperature.',
      dosageNotes: 'Always follow your doctor’s prescription. Do not exceed the maximum daily dose. Leave at least 4 hours between doses.',
      sideEffectsCommon: [
        'Generally very well tolerated at recommended doses',
        'Mild nausea in some patients (rare)',
      ],
      sideEffectsLessCommon: [
        'Skin rash or itching',
        'Stomach upset or digestive discomfort',
      ],
      sideEffectsSerious: [
        'Signs of liver damage (jaundice, dark urine, severe nausea)',
        'Severe allergic reaction (rash, swelling, difficulty breathing)',
        'Blood in urine or unusual bruising',
      ],
      warningCards: [
        {
          id: 'w1',
          title: 'Alcohol Warning',
          severity: 'high',
          text: 'Do not take paracetamol if you regularly consume alcohol. Combining alcohol with paracetamol significantly increases the risk of severe liver damage.',
        },
        {
          id: 'w2',
          title: 'Liver Disease & Hepatitis',
          severity: 'high',
          text: 'Patients with liver disease or impaired liver function should use paracetamol only under strict medical supervision.',
        },
        {
          id: 'w3',
          title: 'Overdose Risk',
          severity: 'high',
          text: 'Paracetamol overdose is a major cause of acute liver failure. Never exceed 4g (4000mg) per day in adults.',
        },
      ],
    },
    si: {
      description: 'පැරසිටමෝල් (ඇසිටමිනෝෆෙන්) යනු ලෝකයේ වඩාත්ම බහුලව භාවිතා වන ඖෂධවලින් එකකි. එය වේදනා නාශක (analgesic) සහ උණ අඩු කරන (antipyretic) කාණ්ඩයට අයත් වේ. බොහෝ රටවල වෛද්‍ය නිර්දේශයක් නොමැතිව ලබාගත හැක.',
      usedFor: [
        'සුළු හා මධ්‍යස්ථ වේදනාවන් (හිසරදය, දත් කැක්කුම, කොන්දේ කැක්කුම)',
        'වැඩිහිටියන්ගේ සහ ළමයින්ගේ උණ පාලනය',
        'එන්නත් කිරීමෙන් පසු ඇතිවන උණ සහ අපහසුතාව',
        'කැක්කුම සහ සෙම්ප්‍රතිශ්‍යාව',
      ],
      howItWorks: 'පැරසිටමෝල් මගින් මොළයේ වේදනා සංඥා අවහිර කරන අතර ශරීර උෂ්ණත්වය පාලනය කරන හයිපොතලමසයට බලපෑම් කර උණ අඩු කරයි.',
      dosageNotes: 'සෑම විටම ඔබේ වෛද්‍යවරයාගේ උපදෙස් පිළිපදින්න. උපරිම දෛනික මාත්‍රාව ඉක්මවා නොයන්න. මාත්‍රා අතර අවම වශයෙන් පැය 4 ක පරතරයක් තබන්න.',
      sideEffectsCommon: [
        'නිර්දේශිත මාත්‍රාවලින් භාවිතයේදී අතුරු ආබාධ ඉතා අවමය',
        'ඇතැම් රෝගීන්ට සුළු වමනය ගතිය (කලාතුරකින්)',
      ],
      sideEffectsLessCommon: [
        'සමේ කුෂ්ඨ හෝ කැසීම',
        'බඩවැල් අපහසුතාව',
      ],
      sideEffectsSerious: [
        'අක්මා හානියේ ලක්ෂණ (සම කහ වීම, තද පැහැති මුත්‍රා, දැඩි වමනය)',
        'දැඩි අසාත්මිකතා ප්‍රතික්‍රියා (ශ්වසන අපහසුතා)',
      ],
      warningCards: [
        {
          id: 'w1',
          title: 'මත්පැන් භාවිතය පිළිබඳ අවවාදය',
          severity: 'high',
          text: 'ඔබ නිතිපතා මත්පැන් පානය කරන්නේ නම් පැරසිටමෝල් නොගන්න. මත්පැන් සමඟ පැරසිටමෝල් ගැනීමෙන් අක්මාවට බරපතල හානි සිදුවිය හැක.',
        },
        {
          id: 'w2',
          title: 'අක්මා රෝග අවදානම',
          severity: 'high',
          text: 'අක්මා රෝග හෝ හෙපටයිටිස් ඇති රෝගීන් වෛද්‍ය අධීක්ෂණය යටතේ පමණක් භාවිතා කළ යුතුය.',
        },
        {
          id: 'w3',
          title: 'අධිමාත්‍රා අවදානම',
          severity: 'high',
          text: 'පැරසිටමෝල් අධිමාත්‍රාව අක්මාව අක්‍රිය වීමට ප්‍රධාන හේතුවකි. වැඩිහිටියන් දිනකට ග්‍රෑම් 4 ඉක්මවා නොගත යුතුය.',
        },
      ],
    },
    ta: {
      description: 'பாரசிட்டமால் (அசிடமினோஃபென்) உலகில் மிகவும் பரவலாகப் பயன்படுத்தப்படும் மருந்துகளில் ஒன்றாகும். இது வலி நிவாரணி மற்றும் காய்ச்சலைக் குறைக்கும் மருந்துகளின் வகுப்பைச் சேர்ந்தது.',
      usedFor: [
        'மிதமான வலி (தலைவலி, பல் வலி, முதுகு வலி)',
        'பெரியவர்கள் மற்றும் குழந்தைகளில் காய்ச்சலைக் குறைத்தல்',
        'தடுப்பூசிக்கு பின் ஏற்படும் காய்ச்சல் மற்றும் அசௌகரியம்',
      ],
      howItWorks: 'பாரசிட்டமால் மூளையில் உள்ள வலி சமிக்ஞைகளைத் தடுப்பதன் மூலமும் உடலின் வெப்பநிலையைக் கட்டுப்படுத்தும் ஹைபோதாலமஸில் செயல்படுவதன் மூலமும் செயல்படுகிறது.',
      dosageNotes: 'எப்போதும் உங்கள் மருத்துவரின் பரிந்துரையைப் பின்பற்றவும். அதிகபட்ச தினசரி அளவைத் தாண்டக்கூடாது.',
      sideEffectsCommon: [
        'பரிந்துரைக்கப்பட்ட அளவுகளில் பயன்படுத்தும்போது பக்கவிளைவுகள் மிகக் குறைவு',
      ],
      sideEffectsLessCommon: [
        'தோல் சொறி அல்லது அரிப்பு',
        'செரிமான அசௌகரியம்',
      ],
      sideEffectsSerious: [
        'கல்லீரல் பாதிப்பின் அறிகுறிகள் (மஞ்சள் காமாலை, அடர் சிறுநீர்)',
        'கடுமையான ஒவ்வாமை எதிர்வினை',
      ],
      warningCards: [
        {
          id: 'w1',
          title: 'மதுபான எச்சரிக்கை',
          severity: 'high',
          text: 'நீங்கள் தவறாமல் மது அருந்தினால் பாரசிட்டமால் சாப்பிட வேண்டாம். மதுவுடன் பாரசிட்டமால் சேர்ப்பது கல்லீரலுக்கு கடுமையான பாதிப்பை ஏற்படுத்தும்.',
        },
        {
          id: 'w2',
          title: 'கல்லீரல் நோய் எச்சரிக்கை',
          severity: 'high',
          text: 'கல்லீரல் நோய் உள்ள நோயாளிகள் மருத்துவ மேற்பார்வையின் கீழ் மட்டுமே பயன்படுத்த வேண்டும்.',
        },
      ],
    },
  },
};

export function MedicineForm() {
  const [formData, setFormData] = useState<MedicineFormData>(initialFormState);
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'si' | 'ta'>('en');
  const [activePreviewTab, setActivePreviewTab] = useState<string>('overview');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [savedMedicineForEmail, setSavedMedicineForEmail] = useState<MedicineRecord | null>(null);
  const [newBrandInput, setNewBrandInput] = useState('');

  const handleAddBrandName = () => {
    if (!newBrandInput.trim()) return;
    const trimmed = newBrandInput.trim();
    if (!formData.brandNames.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        brandNames: [...prev.brandNames, trimmed],
      }));
    }
    setNewBrandInput('');
  };

  const handleRemoveBrandName = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      brandNames: prev.brandNames.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const availableForms = ['Tablet', 'Syrup', 'Capsule', 'Injection', 'Ointment', 'Drops', 'Inhaler'];

  const warningPresetTitles = [
    'Alcohol Warning',
    'Liver Disease',
    'Kidney Impairment',
    'Pregnancy & Breastfeeding',
    'Driving & Machinery Caution',
    'Overdose Risk',
    'Heart / Blood Pressure',
    'Diabetes Warning',
    'Stomach Ulcers / Bleeding',
  ];

  const handleGeneralChange = (field: keyof MedicineFormData, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'genericName') {
        updated.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return updated;
    });
  };

  const handleLocalizedTextChange = (field: keyof LanguageContent, value: any) => {
    setFormData((prev) => ({
      ...prev,
      localizedContent: {
        ...prev.localizedContent,
        [activeLangTab]: {
          ...prev.localizedContent[activeLangTab],
          [field]: value,
        },
      },
    }));
  };

  // Dynamic Lists (Used For, Common Side Effects, Less Common, Serious)
  const handleListFieldChange = (
    field: 'usedFor' | 'sideEffectsCommon' | 'sideEffectsLessCommon' | 'sideEffectsSerious',
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const currentList = [...prev.localizedContent[activeLangTab][field]];
      currentList[index] = value;
      return {
        ...prev,
        localizedContent: {
          ...prev.localizedContent,
          [activeLangTab]: {
            ...prev.localizedContent[activeLangTab],
            [field]: currentList,
          },
        },
      };
    });
  };

  const addListItem = (field: 'usedFor' | 'sideEffectsCommon' | 'sideEffectsLessCommon' | 'sideEffectsSerious') => {
    setFormData((prev) => ({
      ...prev,
      localizedContent: {
        ...prev.localizedContent,
        [activeLangTab]: {
          ...prev.localizedContent[activeLangTab],
          [field]: [...prev.localizedContent[activeLangTab][field], ''],
        },
      },
    }));
  };

  const removeListItem = (
    field: 'usedFor' | 'sideEffectsCommon' | 'sideEffectsLessCommon' | 'sideEffectsSerious',
    index: number
  ) => {
    setFormData((prev) => {
      const currentList = prev.localizedContent[activeLangTab][field].filter((_, i) => i !== index);
      return {
        ...prev,
        localizedContent: {
          ...prev.localizedContent,
          [activeLangTab]: {
            ...prev.localizedContent[activeLangTab],
            [field]: currentList,
          },
        },
      };
    });
  };

  // Warning Cards Builder
  const addWarningCard = () => {
    const newCard: WarningCard = {
      id: Date.now().toString(),
      title: 'New Safety Warning',
      severity: 'high',
      text: '',
    };
    setFormData((prev) => ({
      ...prev,
      localizedContent: {
        ...prev.localizedContent,
        [activeLangTab]: {
          ...prev.localizedContent[activeLangTab],
          warningCards: [...prev.localizedContent[activeLangTab].warningCards, newCard],
        },
      },
    }));
  };

  const updateWarningCard = (id: string, key: keyof WarningCard, value: string) => {
    setFormData((prev) => {
      const cards = prev.localizedContent[activeLangTab].warningCards.map((card) =>
        card.id === id ? { ...card, [key]: value } : card
      );
      return {
        ...prev,
        localizedContent: {
          ...prev.localizedContent,
          [activeLangTab]: {
            ...prev.localizedContent[activeLangTab],
            warningCards: cards,
          },
        },
      };
    });
  };

  const removeWarningCard = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      localizedContent: {
        ...prev.localizedContent,
        [activeLangTab]: {
          ...prev.localizedContent[activeLangTab],
          warningCards: prev.localizedContent[activeLangTab].warningCards.filter((card) => card.id !== id),
        },
      },
    }));
  };

  // Drug Interactions Builder
  const addDrugInteraction = () => {
    setFormData((prev) => ({
      ...prev,
      drugInteractions: [
        ...prev.drugInteractions,
        { id: Date.now().toString(), drug: '', note: '' },
      ],
    }));
  };

  const updateDrugInteraction = (id: string, key: 'drug' | 'note', value: string) => {
    setFormData((prev) => ({
      ...prev,
      drugInteractions: prev.drugInteractions.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      ),
    }));
  };

  const removeDrugInteraction = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      drugInteractions: prev.drugInteractions.filter((item) => item.id !== id),
    }));
  };

  // Dosage Rows
  const addDosageRow = () => {
    setFormData((prev) => ({
      ...prev,
      dosageRows: [...prev.dosageRows, { ageGroup: '', dose: '', frequency: '', maxPerDay: '' }],
    }));
  };

  const updateDosageRow = (index: number, key: keyof DosageRow, val: string) => {
    setFormData((prev) => {
      const rows = [...prev.dosageRows];
      rows[index][key] = val;
      return { ...prev, dosageRows: rows };
    });
  };

  const removeDosageRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      dosageRows: prev.dosageRows.filter((_, i) => i !== index),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 4500);

    const medRecord: MedicineRecord = {
      id: `med-${Date.now()}`,
      slug: formData.slug || formData.genericName.toLowerCase().replace(/\s+/g, '-'),
      genericName: formData.genericName,
      chemicalName: formData.chemicalName,
      brandNames: formData.brandNames,
      category: formData.category,
      coverImage: '/images/medicine/paracetamol-cover.png',
      form: formData.form,
      strength: formData.strength,
      ageGroup: formData.ageGroup,
      prescriptionRequired: formData.prescriptionRequired,
      verified: false, // Default unverified until 2 doctor verifications
      verifications: [],
      createdDate: new Date().toISOString().split('T')[0],
      maxDailyDoseAdults: formData.maxDailyDoseAdults,
      rating: '4.9',
      reviewCount: 'Pending Review',
      dosageRows: formData.dosageRows,
      drugInteractions: formData.drugInteractions,
      localized: {
        en: formData.localizedContent.en,
        si: formData.localizedContent.si,
        ta: formData.localizedContent.ta,
      },
    };

    addOrUpdateMedicine(medRecord);
  };

  const currentLocalized = formData.localizedContent[activeLangTab];

  const previewTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'dosage', label: 'Dosage & Usage' },
    { id: 'side-effects', label: 'Side Effects' },
    { id: 'warnings', label: 'Warnings & Interactions' },
    { id: 'reviews', label: 'Doctor Reviews' },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-20 right-6 z-50 bg-near-black text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-teal/40 animate-fade-up">
          <div className="w-8 h-8 rounded-full bg-teal text-near-black flex items-center justify-center font-bold shrink-0">
            <Check size={18} />
          </div>
          <div>
            <div className="font-bold text-sm">Medicine Saved Successfully!</div>
            <div className="text-xs text-teal font-medium">Verification email dispatched to registered doctors. Status: Details Not Verified (0/2).</div>
          </div>
        </div>
      )}

      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-light-gray shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-plus-jakarta text-near-black tracking-tight m-0 flex items-center gap-2.5">
            <Pill className="text-blue" size={26} />
            <span>Add New Medicine Record</span>
          </h1>
          <p className="text-xs sm:text-sm text-mid-gray m-0 mt-0.5">
            Fill in medical parameters, side effects, warnings, and localized content for 3 languages.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              isPreviewMode
                ? 'bg-near-black text-white shadow-md'
                : 'bg-off-white text-dark-gray hover:bg-light-gray border border-light-gray'
            }`}
          >
            <Eye size={15} />
            <span>{isPreviewMode ? 'Exit Live Preview' : 'Live Preview (Full Site View)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAiModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-blue to-teal text-white font-bold text-xs rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Sparkles size={15} className="text-amber-300" />
            <span>AI Auto-Translate (3-Lang)</span>
          </button>

          <button
            onClick={handleSave}
            type="button"
            className="px-5 py-2.5 bg-teal hover:bg-teal/90 text-white font-bold text-xs rounded-xl shadow-md shadow-teal/20 transition-all flex items-center gap-2"
          >
            <Save size={15} />
            <span>Save & Publish</span>
          </button>
        </div>
      </div>

      {/* Live Preview Mode (FULL PUBLIC SITE REPLICA) */}
      {isPreviewMode ? (
        <div className="bg-white border-2 border-blue/40 rounded-3xl overflow-hidden shadow-2xl animate-fade-up">
          {/* Control Banner */}
          <div className="bg-gradient-to-r from-near-black to-blue-dark text-white px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal">
                Public Detail Page Preview ({activeLangTab.toUpperCase()})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-white/70 font-semibold">Switch Preview Language:</span>
              <div className="flex bg-white/10 p-1 rounded-full border border-white/15">
                {(['en', 'si', 'ta'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setActiveLangTab(lang)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      activeLangTab === lang ? 'bg-blue text-white shadow-sm' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? 'English' : lang === 'si' ? 'සිංහල' : 'தமிழ்'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white">
            {/* Breadcrumb Strip */}
            <div className="pt-6 pb-4 bg-off-white border-b border-light-gray/60 px-6 sm:px-12">
              <div className="max-w-[1200px] mx-auto flex items-center gap-1.5 text-xs text-mid-gray font-medium">
                <span className="text-blue cursor-pointer">Home</span>
                <span>›</span>
                <span className="text-blue cursor-pointer">Search</span>
                <span>›</span>
                <span className="text-dark-gray font-bold">{formData.genericName || 'Paracetamol'}</span>
              </div>
            </div>

            <div className="py-8 px-6 sm:px-12">
              <div className="max-w-[1200px] mx-auto flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14">
                {/* Main Content */}
                <div className={activeLangTab === 'si' ? 'font-noto-sinhala' : ''}>
                  <h1 className="text-[34px] sm:text-[42px] font-extrabold leading-[1.1] font-plus-jakarta text-near-black mb-1.5 tracking-tight">
                    {formData.genericName || 'Paracetamol'}
                  </h1>
                  <p className="text-[17px] sm:text-[19px] font-semibold leading-[1.4] text-mid-gray mb-4">
                    {formData.chemicalName || 'Acetaminophen'}{' '}
                    <span className="font-normal opacity-80 text-[15px]">Active Ingredient</span>
                  </p>

                  <div className="flex gap-2.5 flex-wrap mb-5 items-center">
                    <span className="bg-blue-light text-blue text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                      {formData.category}
                    </span>
                    {formData.verified && (
                      <span className="bg-teal/10 text-teal border border-teal/20 text-xs font-bold px-3 py-1 rounded-md flex items-center gap-1">
                        <Check size={12} strokeWidth={3} /> Doctor Verified
                      </span>
                    )}
                    <span className="bg-teal/10 text-teal border border-teal/20 text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-md">
                      {formData.prescriptionRequired ? 'Prescription Required' : 'No Prescription Required'}
                    </span>
                  </div>

                  {/* Banner */}
                  <div className="bg-gradient-to-br from-blue to-blue-dark rounded-2xl py-6 px-6 sm:px-8 my-6 flex flex-col sm:flex-row gap-6 sm:gap-10 flex-wrap shadow-lg text-white">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                        <Pill size={20} />
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-wider opacity-80 font-bold mb-0.5">Form</div>
                        <div className="text-[15px] font-bold">{formData.form.join(' / ')}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                        <Scale size={20} />
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-wider opacity-80 font-bold mb-0.5">Strength</div>
                        <div className="text-[15px] font-bold font-jetbrains">{formData.strength}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                        <Users size={20} />
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-wider opacity-80 font-bold mb-0.5">Age Group</div>
                        <div className="text-[15px] font-bold">{formData.ageGroup}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                        <ClipboardList size={20} />
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-wider opacity-80 font-bold mb-0.5">Prescription</div>
                        <div className="text-[15px] font-bold">
                          {formData.prescriptionRequired ? 'Required' : 'Not Required'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Popular Brand Names Available in Sri Lanka (Live Preview) */}
                  {formData.brandNames && formData.brandNames.length > 0 && (
                    <div className="my-6 bg-gradient-to-r from-blue-light/50 to-white border border-blue/20 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
                      <div className="flex items-center gap-2">
                        <Tag size={18} className="text-blue" />
                        <h3 className="text-sm font-bold uppercase tracking-wider text-near-black m-0 font-plus-jakarta">
                          Popular Brand Names Available in Sri Lanka:
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {formData.brandNames.map((brand, idx) => (
                          <span
                            key={idx}
                            className="px-3.5 py-1.5 bg-white border border-light-gray rounded-xl text-xs font-bold text-dark-gray flex items-center gap-2 shadow-sm"
                          >
                            <span className="w-2 h-2 rounded-full bg-teal shrink-0" />
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Public Tabs Nav */}
                  <div className="relative mb-7 border-b-2 border-light-gray">
                    <div className="flex gap-2 overflow-x-auto">
                      {previewTabs.map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActivePreviewTab(tab.id)}
                          className={`px-5 py-3 border-none bg-transparent text-[15px] font-semibold cursor-pointer relative transition-colors ${
                            activePreviewTab === tab.id ? 'text-blue font-bold' : 'text-mid-gray hover:text-dark-gray'
                          }`}
                        >
                          {tab.label}
                          {activePreviewTab === tab.id && (
                            <span className="absolute -bottom-[2px] left-0 right-0 h-[2.5px] bg-blue" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Tab Contents */}
                  <div>
                    {activePreviewTab === 'overview' && (
                      <div className="space-y-4">
                        <h3 className="text-[20px] font-bold font-plus-jakarta text-near-black">
                          What is {formData.genericName}?
                        </h3>
                        <p className="text-[15px] leading-[1.65] text-dark-gray">
                          {currentLocalized.description || 'Description not provided.'}
                        </p>

                        <h4 className="text-[17px] font-semibold font-plus-jakarta text-near-black">Used For:</h4>
                        <ul className="list-none flex flex-col gap-2 p-0">
                          {currentLocalized.usedFor.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm px-3.5 py-2.5 rounded-xl bg-teal/10 text-dark-gray">
                              <Check size={16} className="text-teal shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <h4 className="text-[17px] font-semibold font-plus-jakarta text-near-black pt-2">How It Works:</h4>
                        <p className="text-[15px] leading-[1.65] text-dark-gray">
                          {currentLocalized.howItWorks || 'Mechanism details not provided.'}
                        </p>
                      </div>
                    )}

                    {activePreviewTab === 'dosage' && (
                      <div className="space-y-4">
                        <h3 className="text-[20px] font-bold font-plus-jakarta text-near-black">Recommended Dosage</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse my-2 text-sm min-w-[500px]">
                            <thead>
                              <tr className="bg-blue-light text-blue font-bold font-plus-jakarta text-xs uppercase">
                                <th className="p-3 text-left rounded-tl-lg">Age Group</th>
                                <th className="p-3 text-left">Dose</th>
                                <th className="p-3 text-left">Frequency</th>
                                <th className="p-3 text-left rounded-tr-lg">Max Per Day</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-light-gray">
                              {formData.dosageRows.map((row, idx) => (
                                <tr key={idx} className="hover:bg-off-white">
                                  <td className="p-3 font-bold">{row.ageGroup}</td>
                                  <td className="p-3 font-jetbrains">{row.dose}</td>
                                  <td className="p-3">{row.frequency}</td>
                                  <td className="p-3 font-jetbrains font-bold">{row.maxPerDay}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="bg-blue-light border-l-4 border-blue rounded-r-xl p-4 text-sm text-dark-gray">
                          <strong>ℹ️ Important Note:</strong> {currentLocalized.dosageNotes || 'Follow doctor prescription.'}
                        </div>
                      </div>
                    )}

                    {activePreviewTab === 'side-effects' && (
                      <div className="space-y-6">
                        <h3 className="text-[20px] font-bold font-plus-jakarta text-near-black">Side Effects</h3>
                        
                        <div>
                          <h4 className="text-[17px] font-semibold text-teal m-0 mb-2">Common (usually mild)</h4>
                          <ul className="list-none flex flex-col gap-2 p-0">
                            {currentLocalized.sideEffectsCommon.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm p-3 rounded-xl bg-teal/10 text-dark-gray">
                                <Check size={16} className="text-teal shrink-0" /> <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-[17px] font-semibold text-amber-600 m-0 mb-2">Less Common</h4>
                          <ul className="list-none flex flex-col gap-2 p-0">
                            {currentLocalized.sideEffectsLessCommon.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm p-3 rounded-xl bg-amber-500/10 text-dark-gray">
                                <AlertTriangle size={16} className="text-amber-500 shrink-0" /> <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-red/10 border-l-4 border-red rounded-r-xl p-5 mt-4">
                          <h4 className="flex items-center gap-2 text-base font-bold text-red m-0 mb-2">
                            <AlertOctagon size={18} /> Serious — Seek Medical Help Immediately
                          </h4>
                          <ul className="list-none flex flex-col gap-2 p-0">
                            {currentLocalized.sideEffectsSerious.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm p-2.5 bg-white/70 rounded-lg text-dark-gray">
                                <X size={16} className="text-red font-bold shrink-0" /> <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {activePreviewTab === 'warnings' && (
                      <div className="space-y-6">
                        <h3 className="text-[20px] font-bold font-plus-jakarta text-near-black">Warnings & Precautions</h3>
                        
                        <div className="space-y-3">
                          {currentLocalized.warningCards.map((card) => (
                            <div
                              key={card.id}
                              className={`p-4 border-l-4 rounded-r-xl ${
                                card.severity === 'high'
                                  ? 'bg-red/10 border-red text-dark-gray'
                                  : card.severity === 'medium'
                                  ? 'bg-amber-500/10 border-amber-500 text-dark-gray'
                                  : 'bg-blue-light border-blue text-dark-gray'
                              }`}
                            >
                              <h4 className={`flex items-center gap-1.5 text-base font-bold m-0 mb-1 ${
                                card.severity === 'high' ? 'text-red' : card.severity === 'medium' ? 'text-amber-600' : 'text-blue'
                              }`}>
                                <AlertTriangle size={18} /> {card.title}
                              </h4>
                              <p className="text-sm m-0 leading-relaxed">{card.text}</p>
                            </div>
                          ))}
                        </div>

                        <h4 className="text-[17px] font-semibold text-near-black pt-2 m-0">Drug Interactions</h4>
                        <div className="flex flex-col gap-2.5">
                          {formData.drugInteractions.map((item) => (
                            <div key={item.id} className="bg-blue-light border-l-4 border-blue rounded-r-xl p-4 text-sm text-dark-gray">
                              <strong>{item.drug}</strong> — {item.note}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activePreviewTab === 'reviews' && (
                      <div className="space-y-4">
                        <h3 className="text-[20px] font-bold font-plus-jakarta text-near-black">Doctor Reviews</h3>
                        <div className="bg-white border border-light-gray rounded-2xl p-5 shadow-sm space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue text-white font-bold flex items-center justify-center">DK</div>
                            <div>
                              <div className="font-bold text-sm text-near-black">Dr. Kasun Perera</div>
                              <div className="text-xs text-mid-gray">MBBS — General Practitioner, Colombo</div>
                            </div>
                          </div>
                          <p className="text-xs text-dark-gray leading-relaxed m-0">
                            Excellent safety profile when taken strictly as prescribed. Always verify that patients do not combine it with other acetaminophen-containing cold remedies.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sticky Right Sidebar */}
                <div className="bg-white border border-light-gray rounded-[24px] p-6 shadow-md h-fit space-y-4">
                  <div className="font-plus-jakarta font-extrabold text-xl text-near-black">
                    {formData.genericName || 'Paracetamol'}
                  </div>
                  <div className="text-amber-500 text-sm">
                    ★★★★☆ <span className="text-xs text-mid-gray font-normal ml-1">(12 Verified Dr Reviews)</span>
                  </div>

                  <div className="h-px bg-light-gray w-full" />

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between"><span className="text-mid-gray font-semibold">Category</span><span className="font-bold text-near-black">{formData.category}</span></div>
                    <div className="flex justify-between"><span className="text-mid-gray font-semibold">Form</span><span className="font-bold text-near-black">{formData.form.join(' / ')}</span></div>
                    <div className="flex justify-between"><span className="text-mid-gray font-semibold">Prescription</span><span className="text-teal font-bold">{formData.prescriptionRequired ? 'Required' : 'Not Required'}</span></div>
                    {(() => {
                      const isElderlySafe = formData.dosageRows && formData.dosageRows.some((row) => 
                        /elderly|senior|65|geriatric/i.test(row.ageGroup)
                      );
                      const isChildrenSafe = formData.dosageRows && formData.dosageRows.some((row) => 
                        /child|children|infant|pediatric|kid|baby|adolescent|teen|neonate|toddler/i.test(row.ageGroup)
                      );
                      return (
                        <>
                          <div className="flex justify-between">
                            <span className="text-mid-gray font-semibold">Elderly Safe</span>
                            {isElderlySafe ? (
                              <span className="text-teal font-bold">✓ Yes</span>
                            ) : (
                              <span className="text-red-500 font-bold">✗ No</span>
                            )}
                          </div>
                          <div className="flex justify-between">
                            <span className="text-mid-gray font-semibold">Children Safe</span>
                            {isChildrenSafe ? (
                              <span className="text-teal font-bold">✓ Yes</span>
                            ) : (
                              <span className="text-red-500 font-bold">✗ No</span>
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  <div className="h-px bg-light-gray w-full" />

                  <div className="bg-off-white p-4 rounded-xl text-center border border-light-gray">
                    <div className="text-[10px] uppercase font-bold text-mid-gray mb-1">Max Daily Dose (Adults)</div>
                    <div className="text-2xl font-extrabold text-blue font-jetbrains">{formData.maxDailyDoseAdults || '4000mg'}</div>
                  </div>

                  <button type="button" className="w-full py-3 bg-off-white border border-light-gray rounded-xl text-xs font-bold text-dark-gray flex items-center justify-center gap-2">
                    <Share2 size={16} />
                    <span>Share Page</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8">
          {/* Section 1: General Information & Metadata */}
          <div className="bg-white border border-light-gray/50 rounded-3xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-light-gray">
              <Info className="text-blue" size={18} />
              <h2 className="text-base font-bold text-near-black font-plus-jakarta m-0">
                1. General Medicine Metadata
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-dark-gray mb-1.5">Generic / Common Name *</label>
                <input
                  type="text"
                  value={formData.genericName}
                  onChange={(e) => handleGeneralChange('genericName', e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-light-gray text-sm text-near-black font-bold focus:border-blue outline-none transition-all"
                  placeholder="e.g. Paracetamol or Amoxicillin"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark-gray mb-1.5">Chemical Name / Active Ingredient (Salt) *</label>
                <input
                  type="text"
                  value={formData.chemicalName}
                  onChange={(e) => handleGeneralChange('chemicalName', e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-light-gray text-sm text-dark-gray focus:border-blue outline-none transition-all"
                  placeholder="e.g. Acetaminophen or Amoxicillin Trihydrate"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark-gray mb-1.5">URL Slug (Auto-generated)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleGeneralChange('slug', e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-light-gray bg-off-white text-xs font-jetbrains text-mid-gray outline-none"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark-gray mb-1.5">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleGeneralChange('category', e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-light-gray text-xs font-bold text-dark-gray focus:border-blue outline-none bg-white"
                >
                  <option value="Painkiller">Painkiller</option>
                  <option value="Antipyretic">Antipyretic</option>
                  <option value="Antibiotic">Antibiotic</option>
                  <option value="Antihistamine">Antihistamine</option>
                  <option value="Antacid">Antacid</option>
                  <option value="Antidiabetic">Antidiabetic</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-dark-gray mb-1.5">Dosage Strengths *</label>
                <input
                  type="text"
                  value={formData.strength}
                  onChange={(e) => handleGeneralChange('strength', e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-light-gray text-xs font-jetbrains font-bold text-dark-gray focus:border-blue outline-none"
                  placeholder="e.g. 500mg / 1000mg"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark-gray mb-1.5">Max Adult Daily Dose</label>
                <input
                  type="text"
                  value={formData.maxDailyDoseAdults}
                  onChange={(e) => handleGeneralChange('maxDailyDoseAdults', e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-light-gray text-xs font-jetbrains text-dark-gray focus:border-blue outline-none"
                  placeholder="e.g. 4000mg"
                />
              </div>
            </div>

            {/* Popular Brand Names in Sri Lanka */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-dark-gray mb-1.5 flex items-center justify-between">
                <span>Popular Commercial Brand Names (Available in Sri Lanka)</span>
                <span className="text-[11px] text-mid-gray font-normal">Add trade brands like Panadol, Amoxil, Augmentin, etc.</span>
              </label>
              
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newBrandInput}
                  onChange={(e) => setNewBrandInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddBrandName();
                    }
                  }}
                  className="flex-1 h-11 px-3.5 rounded-xl border border-light-gray text-xs font-bold text-dark-gray focus:border-blue outline-none transition-all"
                  placeholder="Type commercial brand name (e.g. Panadol, Amoxil) and click Add or press Enter..."
                />
                <button
                  type="button"
                  onClick={handleAddBrandName}
                  className="px-4 h-11 bg-blue hover:bg-blue-dark text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Plus size={15} />
                  <span>Add Brand</span>
                </button>
              </div>

              {/* Brand Name Badges */}
              {formData.brandNames.length > 0 ? (
                <div className="flex flex-wrap gap-2 p-3 bg-off-white border border-light-gray/60 rounded-xl">
                  {formData.brandNames.map((brand, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-white border border-light-gray rounded-lg text-xs font-bold text-near-black flex items-center gap-2 shadow-xs group"
                    >
                      <span className="w-2 h-2 rounded-full bg-teal shrink-0" />
                      <span>{brand}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveBrandName(idx)}
                        className="text-mid-gray hover:text-red-500 transition-colors p-0.5 rounded-full hover:bg-red-50"
                        title="Remove brand"
                      >
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-mid-gray italic m-0">No commercial brand names added yet.</p>
              )}
            </div>

            {/* Medicine Forms Checkboxes */}
            <div>
              <label className="block text-xs font-bold text-dark-gray mb-2">Medicine Dosage Form(s)</label>
              <div className="flex flex-wrap gap-2">
                {availableForms.map((item) => {
                  const checked = formData.form.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        const newForms = checked
                          ? formData.form.filter((f) => f !== item)
                          : [...formData.form, item];
                        handleGeneralChange('form', newForms);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        checked
                          ? 'bg-blue text-white border-blue'
                          : 'bg-off-white text-dark-gray border-light-gray hover:bg-light-gray'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Verification & Prescription Flags */}
            <div className="flex flex-wrap gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-dark-gray">
                <input
                  type="checkbox"
                  checked={formData.prescriptionRequired}
                  onChange={(e) => handleGeneralChange('prescriptionRequired', e.target.checked)}
                  className="w-4 h-4 rounded text-blue accent-blue cursor-pointer"
                />
                <span>Prescription Required</span>
              </label>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-xl border border-amber-500/20 text-xs font-bold text-amber-800">
                <ShieldAlert size={15} className="text-amber-600 shrink-0" />
                <span>Verification: Requires 2 Doctor Approvals via Review Workspace</span>
              </div>
            </div>
          </div>

          {/* Section 2: Multi-Language Content Tabbed Editor */}
          <div className="bg-white border border-light-gray/50 rounded-[24px] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-light-gray">
              <div>
                <div className="flex items-center gap-2">
                  <Languages className="text-teal" size={20} />
                  <h2 className="text-base font-bold text-near-black font-plus-jakarta m-0">
                    2. Multi-Language Content & Safety Editor
                  </h2>
                </div>
                <p className="text-xs text-mid-gray m-0 mt-0.5">
                  Enter localized overview, side effects, warnings, and drug interactions for 3 languages.
                </p>
              </div>

              {/* Language Switcher Tabs & AI Action */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex bg-off-white p-1 rounded-2xl border border-light-gray">
                  {(['en', 'si', 'ta'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveLangTab(lang)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        activeLangTab === lang
                          ? 'bg-blue text-white shadow-sm'
                          : 'text-dark-gray hover:text-near-black'
                      }`}
                    >
                      <span>{lang === 'en' ? 'English' : lang === 'si' ? 'සිංහල' : 'தமிழ்'}</span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(true)}
                  className="px-3.5 py-2 bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Auto-Fill 3-Langs with AI</span>
                </button>
              </div>
            </div>

            {/* Active Language Editor Panel */}
            <div className="space-y-8">
              <div className="p-3.5 bg-blue-light/40 border border-blue/15 rounded-xl text-xs text-blue font-semibold flex items-center justify-between">
                <span>Editing localized medical content for: <strong>{activeLangTab.toUpperCase()}</strong></span>
              </div>

              {/* A. Overview & Indications */}
              <div className="space-y-4 p-5 bg-off-white/50 border border-light-gray/80 rounded-2xl">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-mid-gray m-0">
                  A. Overview & Mechanism of Action
                </h3>

                <div>
                  <label className="block text-xs font-bold text-dark-gray mb-1.5">Medicine Description / Overview</label>
                  <textarea
                    rows={3}
                    value={currentLocalized.description}
                    onChange={(e) => handleLocalizedTextChange('description', e.target.value)}
                    className={`w-full p-3.5 rounded-xl border border-light-gray bg-white text-xs text-dark-gray focus:border-blue outline-none transition-all ${
                      activeLangTab === 'si' ? 'font-noto-sinhala text-sm' : ''
                    }`}
                    placeholder="Enter detailed medical description..."
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-dark-gray">Used For / Indications (Bullet points)</label>
                    <button
                      type="button"
                      onClick={() => addListItem('usedFor')}
                      className="text-xs font-bold text-blue hover:underline flex items-center gap-1"
                    >
                      <Plus size={13} /> Add Indication Item
                    </button>
                  </div>

                  <div className="space-y-2">
                    {currentLocalized.usedFor.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleListFieldChange('usedFor', idx, e.target.value)}
                          className={`flex-1 h-10 px-3 rounded-xl border border-light-gray bg-white text-xs text-dark-gray focus:border-blue outline-none ${
                            activeLangTab === 'si' ? 'font-noto-sinhala text-sm' : ''
                          }`}
                          placeholder="e.g. Mild to moderate pain relief..."
                        />
                        <button
                          type="button"
                          onClick={() => removeListItem('usedFor', idx)}
                          className="p-2 text-mid-gray hover:text-red transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-dark-gray mb-1.5">How It Works (Mechanism of Action)</label>
                  <textarea
                    rows={2}
                    value={currentLocalized.howItWorks}
                    onChange={(e) => handleLocalizedTextChange('howItWorks', e.target.value)}
                    className={`w-full p-3.5 rounded-xl border border-light-gray bg-white text-xs text-dark-gray focus:border-blue outline-none ${
                      activeLangTab === 'si' ? 'font-noto-sinhala text-sm' : ''
                    }`}
                    placeholder="Explain how medicine acts in the body..."
                  />
                </div>
              </div>

              {/* B. Side Effects Section (Common, Less Common, Serious) */}
              <div className="space-y-6 p-5 bg-off-white/50 border border-light-gray/80 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Activity className="text-teal" size={18} />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-mid-gray m-0">
                    B. Side Effects Management (3 Severity Levels)
                  </h3>
                </div>

                {/* 1. Common Side Effects */}
                <div className="p-4 bg-white border border-teal/20 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal flex items-center gap-1.5">
                      <Check size={14} /> Common Side Effects (Usually Mild)
                    </span>
                    <button
                      type="button"
                      onClick={() => addListItem('sideEffectsCommon')}
                      className="text-xs font-bold text-teal hover:underline flex items-center gap-1"
                    >
                      <Plus size={13} /> Add Item
                    </button>
                  </div>

                  <div className="space-y-2">
                    {currentLocalized.sideEffectsCommon.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleListFieldChange('sideEffectsCommon', idx, e.target.value)}
                          className={`flex-1 h-9 px-3 rounded-lg border border-light-gray text-xs outline-none focus:border-teal ${
                            activeLangTab === 'si' ? 'font-noto-sinhala' : ''
                          }`}
                          placeholder="e.g. Mild nausea in rare cases..."
                        />
                        <button
                          type="button"
                          onClick={() => removeListItem('sideEffectsCommon', idx)}
                          className="p-1.5 text-mid-gray hover:text-red"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Less Common Side Effects */}
                <div className="p-4 bg-white border border-amber-500/20 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
                      <AlertTriangle size={14} /> Less Common Side Effects
                    </span>
                    <button
                      type="button"
                      onClick={() => addListItem('sideEffectsLessCommon')}
                      className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
                    >
                      <Plus size={13} /> Add Item
                    </button>
                  </div>

                  <div className="space-y-2">
                    {currentLocalized.sideEffectsLessCommon.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleListFieldChange('sideEffectsLessCommon', idx, e.target.value)}
                          className={`flex-1 h-9 px-3 rounded-lg border border-light-gray text-xs outline-none focus:border-amber-500 ${
                            activeLangTab === 'si' ? 'font-noto-sinhala' : ''
                          }`}
                          placeholder="e.g. Skin rash or itching..."
                        />
                        <button
                          type="button"
                          onClick={() => removeListItem('sideEffectsLessCommon', idx)}
                          className="p-1.5 text-mid-gray hover:text-red"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Serious Side Effects */}
                <div className="p-4 bg-white border border-red/20 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red flex items-center gap-1.5">
                      <AlertOctagon size={14} /> Serious — Immediate Medical Attention Needed
                    </span>
                    <button
                      type="button"
                      onClick={() => addListItem('sideEffectsSerious')}
                      className="text-xs font-bold text-red hover:underline flex items-center gap-1"
                    >
                      <Plus size={13} /> Add Item
                    </button>
                  </div>

                  <div className="space-y-2">
                    {currentLocalized.sideEffectsSerious.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleListFieldChange('sideEffectsSerious', idx, e.target.value)}
                          className={`flex-1 h-9 px-3 rounded-lg border border-red/30 bg-red/5 text-xs outline-none focus:border-red ${
                            activeLangTab === 'si' ? 'font-noto-sinhala' : ''
                          }`}
                          placeholder="e.g. Signs of liver damage (jaundice, dark urine)..."
                        />
                        <button
                          type="button"
                          onClick={() => removeListItem('sideEffectsSerious', idx)}
                          className="p-1.5 text-mid-gray hover:text-red"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* C. Dynamic Safety Warning Cards Builder (Various Warning Types) */}
              <div className="space-y-4 p-5 bg-off-white/50 border border-light-gray/80 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="text-red" size={18} />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-mid-gray m-0">
                      C. Safety Warning Cards Builder (Alcohol, Liver, Kidney, Pregnancy, Overdose, etc.)
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={addWarningCard}
                    className="px-3 py-1.5 bg-red/10 text-red hover:bg-red/20 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Warning Card
                  </button>
                </div>

                <div className="space-y-4">
                  {currentLocalized.warningCards.map((card) => (
                    <div key={card.id} className="p-4 bg-white border border-light-gray rounded-2xl space-y-3 shadow-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-mid-gray mb-1">Warning Title / Type</label>
                          <input
                            type="text"
                            list="warningPresets"
                            value={card.title}
                            onChange={(e) => updateWarningCard(card.id, 'title', e.target.value)}
                            className="w-full h-9 px-3 rounded-lg border border-light-gray text-xs font-bold outline-none focus:border-blue"
                            placeholder="e.g. Alcohol Warning"
                          />
                          <datalist id="warningPresets">
                            {warningPresetTitles.map((title) => (
                              <option key={title} value={title} />
                            ))}
                          </datalist>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-mid-gray mb-1">Alert Severity Level</label>
                          <select
                            value={card.severity}
                            onChange={(e) => updateWarningCard(card.id, 'severity', e.target.value as any)}
                            className="w-full h-9 px-3 rounded-lg border border-light-gray text-xs font-bold outline-none bg-white"
                          >
                            <option value="high">High Risk (Red Alert)</option>
                            <option value="medium">Medium Caution (Amber)</option>
                            <option value="info">General Info (Blue)</option>
                          </select>
                        </div>

                        <div className="flex items-end justify-end">
                          <button
                            type="button"
                            onClick={() => removeWarningCard(card.id)}
                            className="px-3 py-2 text-xs font-bold text-red hover:bg-red/10 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Trash2 size={14} /> Remove Card
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-mid-gray mb-1">Warning Content Description</label>
                        <textarea
                          rows={2}
                          value={card.text}
                          onChange={(e) => updateWarningCard(card.id, 'text', e.target.value)}
                          className={`w-full p-2.5 rounded-xl border border-light-gray text-xs text-dark-gray outline-none focus:border-blue ${
                            activeLangTab === 'si' ? 'font-noto-sinhala' : ''
                          }`}
                          placeholder="Describe warning details for patients..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* D. Drug Interactions Builder */}
              <div className="space-y-4 p-5 bg-off-white/50 border border-light-gray/80 rounded-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-mid-gray m-0">
                    D. Drug Interactions Builder
                  </h3>

                  <button
                    type="button"
                    onClick={addDrugInteraction}
                    className="px-3 py-1.5 bg-blue-light text-blue hover:bg-blue/15 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Interaction
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.drugInteractions.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-white border border-light-gray rounded-xl">
                      <input
                        type="text"
                        value={item.drug}
                        onChange={(e) => updateDrugInteraction(item.id, 'drug', e.target.value)}
                        className="w-full sm:w-1/3 h-9 px-3 rounded-lg border border-light-gray text-xs font-bold outline-none focus:border-blue"
                        placeholder="Interacting Drug (e.g. Warfarin)"
                      />
                      <input
                        type="text"
                        value={item.note}
                        onChange={(e) => updateDrugInteraction(item.id, 'note', e.target.value)}
                        className="w-full sm:flex-1 h-9 px-3 rounded-lg border border-light-gray text-xs outline-none focus:border-blue"
                        placeholder="Interaction note / instructions..."
                      />
                      <button
                        type="button"
                        onClick={() => removeDrugInteraction(item.id)}
                        className="p-1.5 text-mid-gray hover:text-red shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Structured Dosage Table Builder */}
          <div className="bg-white border border-light-gray/50 rounded-[24px] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-light-gray">
              <div className="flex items-center gap-2">
                <Scale className="text-blue" size={20} />
                <h2 className="text-base font-bold text-near-black font-plus-jakarta m-0">
                  3. Recommended Dosage Table
                </h2>
              </div>

              <button
                type="button"
                onClick={addDosageRow}
                className="px-3 py-1.5 bg-blue-light text-blue hover:bg-blue/15 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
              >
                <Plus size={14} /> Add Dosage Row
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left min-w-[600px]">
                <thead>
                  <tr className="bg-off-white text-mid-gray font-bold uppercase tracking-wider">
                    <th className="p-3">Age Group</th>
                    <th className="p-3">Dose</th>
                    <th className="p-3">Frequency</th>
                    <th className="p-3">Max Per Day</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-gray">
                  {formData.dosageRows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-2">
                        <input
                          type="text"
                          list="ageGroupPresets"
                          value={row.ageGroup}
                          onChange={(e) => updateDosageRow(idx, 'ageGroup', e.target.value)}
                          className="w-full h-9 px-2.5 rounded-lg border border-light-gray text-xs font-bold outline-none focus:border-blue"
                          placeholder="e.g. Young Children (2–5 yrs)"
                        />
                        <datalist id="ageGroupPresets">
                          <option value="Adults (18–64 yrs)" />
                          <option value="Elderly (≥65 yrs)" />
                          <option value="Adolescents (12–17 yrs)" />
                          <option value="Children (6–11 yrs)" />
                          <option value="Young Children (2–5 yrs)" />
                          <option value="Infants (1–23 months)" />
                          <option value="Neonates (0–28 days)" />
                        </datalist>
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.dose}
                          onChange={(e) => updateDosageRow(idx, 'dose', e.target.value)}
                          className="w-full h-9 px-2.5 rounded-lg border border-light-gray text-xs font-jetbrains outline-none focus:border-blue"
                          placeholder="e.g. 500-1000mg"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.frequency}
                          onChange={(e) => updateDosageRow(idx, 'frequency', e.target.value)}
                          className="w-full h-9 px-2.5 rounded-lg border border-light-gray text-xs outline-none focus:border-blue"
                          placeholder="e.g. Every 4-6 hrs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.maxPerDay}
                          onChange={(e) => updateDosageRow(idx, 'maxPerDay', e.target.value)}
                          className="w-full h-9 px-2.5 rounded-lg border border-light-gray text-xs font-jetbrains font-bold outline-none focus:border-blue"
                          placeholder="e.g. 4000mg"
                        />
                      </td>
                      <td className="p-2 text-right">
                        <button
                          type="button"
                          onClick={() => removeDosageRow(idx)}
                          className="p-1.5 text-mid-gray hover:text-red"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Important Dosage Note (Multi-language) */}
            <div className="pt-4 border-t border-light-gray space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="block text-xs font-bold text-dark-gray flex items-center gap-1.5">
                  <Info size={15} className="text-blue" />
                  <span>Important Dosage Note ({activeLangTab.toUpperCase()}) *</span>
                </label>
                <span className="text-[11px] text-mid-gray">Displays as the blue alert banner below the dosage table for patients</span>
              </div>

              <textarea
                rows={2}
                value={currentLocalized.dosageNotes}
                onChange={(e) => handleLocalizedTextChange('dosageNotes', e.target.value)}
                className={`w-full p-3 rounded-xl border border-light-gray text-xs text-dark-gray outline-none focus:border-blue transition-all ${
                  activeLangTab === 'si' ? 'font-noto-sinhala' : ''
                }`}
                placeholder="e.g. Always follow your doctor's prescription. Do not exceed maximum daily dose. Leave at least 4 hours between doses..."
              />
            </div>
          </div>

          {/* Form Submit Footer */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsPreviewMode(true)}
              className="px-5 py-3 rounded-xl text-xs font-bold bg-off-white text-dark-gray hover:bg-light-gray border border-light-gray"
            >
              Preview Live Page (Full View)
            </button>

            <button
              type="submit"
              className="px-8 py-3.5 bg-teal hover:bg-teal/90 text-white font-bold text-sm rounded-2xl shadow-lg shadow-teal/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Save size={18} />
              <span>Save & Publish Medicine</span>
            </button>
          </div>
        </form>
      )}

      {/* AI Translation Modal Component */}
      <AITranslateModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        sourceLang={activeLangTab}
        currentData={formData}
        onTranslateComplete={(translations) => {
          setFormData((prev) => ({
            ...prev,
            localizedContent: {
              ...prev.localizedContent,
              si: { ...prev.localizedContent.si, ...translations.si },
              ta: { ...prev.localizedContent.ta, ...translations.ta },
            },
          }));
        }}
      />
    </div>
  );
}
