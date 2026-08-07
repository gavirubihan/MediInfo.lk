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
  Scale, 
  Users, 
  ClipboardList,
  Languages,
  ArrowLeft,
  X,
  FileCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { AITranslateModal } from './AITranslateModal';

export interface DosageRow {
  ageGroup: string;
  dose: string;
  frequency: string;
  maxPerDay: string;
}

export interface WarningCard {
  title: string;
  text: string;
}

export interface DrugInteraction {
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
  warningsAlcohol: string;
  warningsLiver: string;
  warningsOverdose: string;
}

export interface MedicineFormData {
  brandName: string;
  genericName: string;
  slug: string;
  category: string;
  form: string[];
  strength: string;
  ageGroup: string;
  prescriptionRequired: boolean;
  verified: boolean;
  maxDailyDoseAdults: string;

  // Global dosage rows (structured)
  dosageRows: DosageRow[];
  drugInteractions: DrugInteraction[];

  // Safety flags
  safety: {
    pregnancy: 'safe' | 'caution' | 'unsafe';
    breastfeeding: 'safe' | 'caution' | 'unsafe';
    elderly: 'safe' | 'caution' | 'unsafe';
    children: 'safe' | 'caution' | 'unsafe';
  };

  // Localized 3-Language Content
  localizedContent: {
    en: LanguageContent;
    si: LanguageContent;
    ta: LanguageContent;
  };
}

const initialFormState: MedicineFormData = {
  brandName: 'Paracetamol',
  genericName: 'Acetaminophen',
  slug: 'paracetamol',
  category: 'Painkiller',
  form: ['Tablet', 'Syrup'],
  strength: '500mg / 1000mg',
  ageGroup: 'Adults & Children',
  prescriptionRequired: false,
  verified: true,
  maxDailyDoseAdults: '4000mg',

  dosageRows: [
    { ageGroup: 'Adults (≥18 yrs)', dose: '500–1000mg', frequency: 'Every 4–6 hours', maxPerDay: '4000mg' },
    { ageGroup: 'Elderly (≥65 yrs)', dose: '500mg', frequency: 'Every 6–8 hours', maxPerDay: '2000mg' },
    { ageGroup: 'Children (6–12 yrs)', dose: '250–500mg', frequency: 'Every 4–6 hours', maxPerDay: '2000mg' },
  ],

  drugInteractions: [
    { drug: 'Warfarin', note: 'May enhance anticoagulant effect. Monitor INR closely.' },
    { drug: 'Carbamazepine / Phenytoin', note: 'May increase liver toxicity of paracetamol.' },
  ],

  safety: {
    pregnancy: 'caution',
    breastfeeding: 'safe',
    elderly: 'safe',
    children: 'safe',
  },

  localizedContent: {
    en: {
      description: 'Paracetamol (also known as acetaminophen) is one of the most widely used medicines in the world. It belongs to the analgesic (pain reliever) and antipyretic (fever reducer) class of medications.',
      usedFor: [
        'Mild to moderate pain (headache, toothache, back pain)',
        'Fever reduction in adults and children',
        'Post-vaccination fever and discomfort',
      ],
      howItWorks: 'Paracetamol works by blocking pain signals in the brain and reducing fever by acting on the hypothalamus.',
      dosageNotes: 'Always follow your doctor’s prescription. Do not exceed the maximum daily dose. Leave at least 4 hours between doses.',
      sideEffectsCommon: ['Generally very well tolerated at recommended doses', 'Mild nausea in some patients (rare)'],
      sideEffectsLessCommon: ['Skin rash or itching', 'Stomach upset or discomfort'],
      sideEffectsSerious: ['Signs of liver damage (jaundice, dark urine, severe nausea)', 'Severe allergic reaction'],
      warningsAlcohol: 'Do not take paracetamol if you regularly consume alcohol.',
      warningsLiver: 'Patients with liver disease should use paracetamol only under medical supervision.',
      warningsOverdose: 'Paracetamol overdose is a major cause of acute liver failure. Never exceed 4g/day.',
    },
    si: {
      description: 'පැරසිටමෝල් (ඇසිටමිනෝෆෙන්) යනු ලෝකයේ වඩාත්ම බහුලව භාවිතා වන ඖෂධවලින් එකකි. එය වේදනා නාශක සහ උණ අඩු කරන ඖෂධ කාණ්ඩයට අයත් වේ.',
      usedFor: [
        'සුළු හා මධ්‍යස්ථ වේදනාවන් (හිසරදය, දත් කැක්කුම, කොන්දේ කැක්කුම)',
        'වැඩිහිටියන්ගේ සහ ළමයින්ගේ උණ පාලනය',
        'එන්නත් කිරීමෙන් පසු ඇතිවන උණ සහ අපහසුතාව',
      ],
      howItWorks: 'පැරසිටමෝල් මගින් මොළයේ වේදනා සංඥා අවහිර කරන අතර ශරීර උෂ්ණත්වය පාලනය කරන හයිපොතලමසයට බලපෑම් කර උණ අඩු කරයි.',
      dosageNotes: 'සෑම විටම ඔබේ වෛද්‍යවරයාගේ උපදෙස් පිළිපදින්න. උපරිම දෛනික මාත්‍රාව ඉක්මවා නොයන්න.',
      sideEffectsCommon: ['නිර්දේශිත මාත්‍රාවලින් භාවිතයේදී අතුරු ආබාධ ඉතා අවමය'],
      sideEffectsLessCommon: ['සමේ කුෂ්ඨ හෝ කැසීම'],
      sideEffectsSerious: ['අක්මා හානියේ ලක්ෂණ (සම කහ වීම, තද පැහැති මුත්‍රා, දැඩි වමනය)'],
      warningsAlcohol: 'ඔබ නිතිපතා මත්පැන් පානය කරන්නේ නම් පැරසිටමෝල් නොගන්න.',
      warningsLiver: 'අක්මා රෝග හෝ හෙපටයිටිස් ඇති රෝගීන් වෛද්‍ය අධීක්ෂණය යටතේ පමණක් භාවිතා කළ යුතුය.',
      warningsOverdose: 'පැරසිටමෝල් අධිමාත්‍රාව අක්මාව අක්‍රිය වීමට ප්‍රධාන හේතුවකි.',
    },
    ta: {
      description: 'பாரசிட்டமால் (அசிடமினோஃபென்) உலகில் மிகவும் பரவலாகப் பயன்படுத்தப்படும் மருந்துகளில் ஒன்றாகும்.',
      usedFor: [
        'மிதமான வலி (தலைவலி, பல் வலி, முதுகு வலி)',
        'பெரியவர்கள் மற்றும் குழந்தைகளில் காய்ச்சலைக் குறைத்தல்',
      ],
      howItWorks: 'பாரசிட்டமால் மூளையில் உள்ள வலி சமிக்ஞைகளைத் தடுப்பதன் மூலம் செயல்படுகிறது.',
      dosageNotes: 'எப்போதும் உங்கள் மருத்துவரின் பரிந்துரையைப் பின்பற்றவும்.',
      sideEffectsCommon: ['பரிந்துரைக்கப்பட்ட அளவுகளில் பயன்படுத்தும்போது பக்கவிளைவுகள் மிகக் குறைவு'],
      sideEffectsLessCommon: ['தோல் சொறி அல்லது அரிப்பு'],
      sideEffectsSerious: ['கல்லீரல் பாதிப்பின் அறிகுறிகள் (மஞ்சள் காமாலை)'],
      warningsAlcohol: 'நீங்கள் தவறாமல் மது அருந்தினால் பாரசிட்டமால் சாப்பிட வேண்டாம்.',
      warningsLiver: 'கல்லீரல் நோய் உள்ள நோயாளிகள் மருத்துவ மேற்பார்வையின் கீழ் மட்டுமே பயன்படுத்த வேண்டும்.',
      warningsOverdose: 'பாரசிட்டமால் அதிகப்படியான அளவு கல்லீரல் செயலிழப்புக்கு ஒரு முக்கிய காரணமாகும்.',
    },
  },
};

export function MedicineForm() {
  const [formData, setFormData] = useState<MedicineFormData>(initialFormState);
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'si' | 'ta'>('en');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const availableForms = ['Tablet', 'Syrup', 'Capsule', 'Injection', 'Ointment', 'Drops', 'Inhaler'];

  // Handle General Metadata Changes
  const handleGeneralChange = (field: keyof MedicineFormData, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'brandName') {
        updated.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return updated;
    });
  };

  // Handle Localized Field Changes
  const handleLocalizedTextChange = (field: keyof LanguageContent, value: string) => {
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

  // Handle Dynamic List Fields (Used For, Side Effects)
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

  // Dosage Table Rows
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

  // Form Submitting / Save Simulation
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3500);
  };

  const currentLocalized = formData.localizedContent[activeLangTab];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-20 right-6 z-50 bg-near-black text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-teal/40 animate-fade-up">
          <div className="w-7 h-7 rounded-full bg-teal text-white flex items-center justify-center font-bold">
            <Check size={16} />
          </div>
          <div>
            <div className="font-bold text-sm">Medicine Saved Successfully!</div>
            <div className="text-xs text-white/70">Published in English, Sinhala, & Tamil</div>
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
            Fill in medical parameters and localized content for 3 languages.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              isPreviewMode
                ? 'bg-near-black text-white'
                : 'bg-off-white text-dark-gray hover:bg-light-gray border border-light-gray'
            }`}
          >
            <Eye size={15} />
            <span>{isPreviewMode ? 'Exit Live Preview' : 'Live Preview'}</span>
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

      {/* Live Preview Mode Rendering */}
      {isPreviewMode ? (
        <div className="bg-white border-2 border-blue/30 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-light-gray">
            <span className="text-xs font-bold uppercase tracking-wider text-blue bg-blue-light px-3 py-1 rounded-full border border-blue/20">
              Live Preview Mode ({activeLangTab.toUpperCase()})
            </span>
            <div className="flex bg-off-white rounded-full p-1 border border-light-gray">
              {(['en', 'si', 'ta'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setActiveLangTab(lang)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    activeLangTab === lang ? 'bg-blue text-white' : 'text-mid-gray'
                  }`}
                >
                  {lang === 'en' ? 'English' : lang === 'si' ? 'සිංහල' : 'தமிழ்'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 font-sans">
            <div>
              <h2 className="text-3xl font-extrabold text-near-black font-plus-jakarta m-0">
                {formData.brandName || 'Medicine Name'}
              </h2>
              <p className="text-base font-semibold text-mid-gray m-0 mt-1">
                {formData.genericName} <span className="font-normal opacity-75">(Generic Name)</span>
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <span className="bg-blue-light text-blue text-xs font-bold px-3 py-1 rounded-md">
                {formData.category}
              </span>
              {formData.verified && (
                <span className="bg-teal/10 text-teal text-xs font-bold px-3 py-1 rounded-md flex items-center gap-1 border border-teal/20">
                  <Check size={12} /> Doctor Verified
                </span>
              )}
            </div>

            {/* Quick Strip Preview */}
            <div className="bg-gradient-to-r from-blue to-blue-dark rounded-2xl p-5 text-white grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-[10px] uppercase font-bold text-white/70">Form</div>
                <div className="text-sm font-bold">{formData.form.join(' / ')}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-white/70">Strength</div>
                <div className="text-sm font-bold font-jetbrains">{formData.strength}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-white/70">Age Group</div>
                <div className="text-sm font-bold">{formData.ageGroup}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-white/70">Prescription</div>
                <div className="text-sm font-bold">{formData.prescriptionRequired ? 'Required' : 'Not Required'}</div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-near-black font-plus-jakarta m-0">What is {formData.brandName}?</h3>
              <p className={`text-sm text-dark-gray leading-relaxed ${activeLangTab === 'si' ? 'font-noto-sinhala' : ''}`}>
                {currentLocalized.description || 'Description text...'}
              </p>

              <h4 className="text-sm font-bold text-near-black m-0">Used For:</h4>
              <ul className="space-y-2 list-none p-0">
                {currentLocalized.usedFor.map((item, idx) => (
                  <li
                    key={idx}
                    className={`flex items-center gap-2 text-xs p-2.5 rounded-xl bg-teal/5 text-dark-gray border border-teal/10 ${
                      activeLangTab === 'si' ? 'font-noto-sinhala' : ''
                    }`}
                  >
                    <Check size={14} className="text-teal shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8">
          {/* Section 1: General Information & Metadata */}
          <div className="bg-white border border-light-gray rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-light-gray">
              <Info className="text-blue" size={18} />
              <h2 className="text-base font-bold text-near-black font-plus-jakarta m-0">
                1. General Medicine Metadata
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-dark-gray mb-1.5">Trade / Brand Name *</label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => handleGeneralChange('brandName', e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-light-gray text-sm text-near-black font-bold focus:border-blue outline-none transition-all"
                  placeholder="e.g. Paracetamol"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark-gray mb-1.5">Generic Name / Active Ingredient *</label>
                <input
                  type="text"
                  value={formData.genericName}
                  onChange={(e) => handleGeneralChange('genericName', e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-light-gray text-sm text-dark-gray focus:border-blue outline-none transition-all"
                  placeholder="e.g. Acetaminophen"
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

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-teal">
                <input
                  type="checkbox"
                  checked={formData.verified}
                  onChange={(e) => handleGeneralChange('verified', e.target.checked)}
                  className="w-4 h-4 rounded text-teal accent-teal cursor-pointer"
                />
                <span>Doctor Verified Status</span>
              </label>
            </div>
          </div>

          {/* Section 2: Multi-Language Content Tabbed Editor */}
          <div className="bg-white border border-light-gray rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-light-gray">
              <div>
                <div className="flex items-center gap-2">
                  <Languages className="text-teal" size={20} />
                  <h2 className="text-base font-bold text-near-black font-plus-jakarta m-0">
                    2. Multi-Language Content Editor
                  </h2>
                </div>
                <p className="text-xs text-mid-gray m-0 mt-0.5">
                  Enter localized content for English, Sinhala (සිංහල), or Tamil (தமிழ்), or use AI auto-translation.
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
                      <span>{lang === 'en' ? 'English 🇬🇧' : lang === 'si' ? 'සිංහල 🇱🇰' : 'தமிழ் 🇱🇰'}</span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(true)}
                  className="px-3.5 py-2 bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Auto-Fill 3-Langs</span>
                </button>
              </div>
            </div>

            {/* Active Language Editor Panel */}
            <div className="space-y-6">
              <div className="p-3 bg-blue-light/40 border border-blue/15 rounded-xl text-xs text-blue font-semibold flex items-center justify-between">
                <span>Editing language content for: <strong>{activeLangTab.toUpperCase()}</strong></span>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-dark-gray mb-1.5">Overview / Description</label>
                <textarea
                  rows={3}
                  value={currentLocalized.description}
                  onChange={(e) => handleLocalizedTextChange('description', e.target.value)}
                  className={`w-full p-3.5 rounded-xl border border-light-gray text-xs text-dark-gray focus:border-blue outline-none transition-all ${
                    activeLangTab === 'si' ? 'font-noto-sinhala text-sm' : ''
                  }`}
                  placeholder="Enter medical overview description..."
                />
              </div>

              {/* Used For List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-dark-gray">Indications / Used For (Bullet points)</label>
                  <button
                    type="button"
                    onClick={() => addListItem('usedFor')}
                    className="text-xs font-bold text-blue hover:underline flex items-center gap-1"
                  >
                    <Plus size={13} /> Add Item
                  </button>
                </div>

                <div className="space-y-2">
                  {currentLocalized.usedFor.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleListFieldChange('usedFor', idx, e.target.value)}
                        className={`flex-1 h-10 px-3 rounded-xl border border-light-gray text-xs text-dark-gray focus:border-blue outline-none ${
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

              {/* How it Works */}
              <div>
                <label className="block text-xs font-bold text-dark-gray mb-1.5">Mechanism of Action (How It Works)</label>
                <textarea
                  rows={2}
                  value={currentLocalized.howItWorks}
                  onChange={(e) => handleLocalizedTextChange('howItWorks', e.target.value)}
                  className={`w-full p-3.5 rounded-xl border border-light-gray text-xs text-dark-gray focus:border-blue outline-none ${
                    activeLangTab === 'si' ? 'font-noto-sinhala text-sm' : ''
                  }`}
                  placeholder="Explain how medicine acts in body..."
                />
              </div>

              {/* Warnings & Safety text */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-red mb-1.5">Alcohol Warning Text</label>
                  <textarea
                    rows={2}
                    value={currentLocalized.warningsAlcohol}
                    onChange={(e) => handleLocalizedTextChange('warningsAlcohol', e.target.value)}
                    className="w-full p-3 rounded-xl border border-red/30 bg-red/5 text-xs text-dark-gray focus:border-red outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-red mb-1.5">Overdose Risk Warning Text</label>
                  <textarea
                    rows={2}
                    value={currentLocalized.warningsOverdose}
                    onChange={(e) => handleLocalizedTextChange('warningsOverdose', e.target.value)}
                    className="w-full p-3 rounded-xl border border-red/30 bg-red/5 text-xs text-dark-gray focus:border-red outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Structured Dosage Table Builder */}
          <div className="bg-white border border-light-gray rounded-2xl p-6 shadow-sm space-y-4">
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
                          value={row.ageGroup}
                          onChange={(e) => updateDosageRow(idx, 'ageGroup', e.target.value)}
                          className="w-full h-9 px-2.5 rounded-lg border border-light-gray text-xs font-bold outline-none focus:border-blue"
                          placeholder="e.g. Adults (≥18 yrs)"
                        />
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
          </div>

          {/* Form Submit Footer */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsPreviewMode(true)}
              className="px-5 py-3 rounded-xl text-xs font-bold bg-off-white text-dark-gray hover:bg-light-gray border border-light-gray"
            >
              Preview Live Page
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
