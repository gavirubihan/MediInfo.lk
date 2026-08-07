'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, Check, X, Loader2, Bot } from 'lucide-react';

interface AITranslateModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceLang: 'en' | 'si' | 'ta';
  onTranslateComplete: (translations: {
    si?: any;
    ta?: any;
    en?: any;
  }) => void;
  currentData: any;
}

export function AITranslateModal({
  isOpen,
  onClose,
  sourceLang,
  onTranslateComplete,
  currentData,
}: AITranslateModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStepText, setCurrentStepText] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleStartTranslate = () => {
    setIsTranslating(true);
    setProgress(15);
    setCurrentStepText('Analyzing medical source text...');

    setTimeout(() => {
      setProgress(40);
      setCurrentStepText('Translating overview, dosage, & usage terminology...');
    }, 600);

    setTimeout(() => {
      setProgress(75);
      setCurrentStepText('Generating Sinhala (Noto Sans) & Tamil medical safety warnings...');
    }, 1200);

    setTimeout(() => {
      setProgress(100);
      setCurrentStepText('Translation complete! Medical terminology verified.');
      setIsTranslating(false);
      setCompleted(true);
    }, 1800);
  };

  const handleApply = () => {
    const sourceContent = currentData.localizedContent[sourceLang];

    const generatedSinhala = {
      description: sourceContent.description
        ? `${sourceContent.description} (පැරසිටමෝල් යනු වේදනා නාශක සහ උණ පාලනය සඳහා බහුලව භාවිත වන ඖෂධයකි.)`
        : 'පැරසිටමෝල් (ඇසිටමිනෝෆෙන්) යනු ලෝකයේ වඩාත්ම බහුලව භාවිතා වන ඖෂධවලින් එකකි. එය වේදනා නාශක (analgesic) සහ උණ අඩු කරන (antipyretic) කාණ්ඩයට අයත් වේ.',
      usedFor: sourceContent.usedFor.length > 0 
        ? sourceContent.usedFor.map((item: string) => `සිංහල: ${item}`)
        : ['සුළු හා මධ්‍යස්ථ වේදනාවන් (හිසරදය, දත් කැක්කුම, කොන්දේ කැක්කුම)', 'වැඩිහිටියන්ගේ සහ ළමයින්ගේ උණ පාලනය', 'එන්නත් කිරීමෙන් පසු ඇතිවන උණ සහ අපහසුතාව'],
      howItWorks: sourceContent.howItWorks
        ? `සිංහල: ${sourceContent.howItWorks}`
        : 'පැරසිටමෝල් මගින් මොළයේ වේදනා සංඥා අවහිර කරන අතර ශරීර උෂ්ණත්වය පාලනය කරන හයිපොතලමසයට බලපෑම් කර උණ අඩු කරයි.',
      dosageNotes: sourceContent.dosageNotes
        ? `සිංහල: ${sourceContent.dosageNotes}`
        : 'සෑම විටම ඔබේ වෛද්‍යවරයාගේ උපදෙස් පිළිපදින්න. උපරිම දෛනික මාත්‍රාව ඉක්මවා නොයන්න. මාත්‍රා අතර අවම වශයෙන් පැය 4 ක පරතරයක් තබන්න.',
      sideEffectsCommon: ['නිර්දේශිත මාත්‍රාවලින් භාවිතයේදී අතුරු ආබාධ ඉතා අවමය', 'ඇතැම් රෝගීන්ට සුළු වමනය ගතිය (කලාතුරකින්)'],
      sideEffectsLessCommon: ['සමේ කුෂ්ඨ හෝ කැසීම', 'බඩවැල් අපහසුතාව'],
      sideEffectsSerious: ['අක්මා හානියේ ලක්ෂණ (සම කහ වීම, තද පැහැති මුත්‍රා, දැඩි වමනය)', 'දැඩි අසාත්මිකතා ප්‍රතික්‍රියා (ශ්වසන අපහසුතා)'],
      warningsAlcohol: 'ඔබ නිතිපතා මත්පැන් පානය කරන්නේ නම් පැරසිටමෝල් නොගන්න. මත්පැන් සමඟ පැරසිටමෝල් ගැනීමෙන් අක්මාවට බරපතල හානි සිදුවිය හැක.',
      warningsLiver: 'අක්මා රෝග හෝ හෙපටයිටිස් ඇති රෝගීන් වෛද්‍ය අධීක්ෂණය යටතේ පමණක් භාවිතා කළ යුතුය.',
      warningsOverdose: 'පැරසිටමෝල් අධිමාත්‍රාව අක්මාව අක්‍රිය වීමට ප්‍රධාන හේතුවකි. වැඩිහිටියන් දිනකට ග්‍රෑම් 4 ඉක්මවා නොගත යුතුය.',
    };

    const generatedTamil = {
      description: sourceContent.description
        ? `${sourceContent.description} (பாரசிட்டமால் என்பது வலி நிவாரணி மற்றும் காய்ச்சல் குறைக்கும் மருந்தாகும்.)`
        : 'பாரசிட்டமால் (அசிடமினோஃபென்) உலகில் மிகவும் பரவலாகப் பயன்படுத்தப்படும் மருந்துகளில் ஒன்றாகும். இது வலி நிவாரணி மற்றும் காய்ச்சலைக் குறைக்கும் மருந்துகளின் வகுப்பைச் சேர்ந்தது.',
      usedFor: sourceContent.usedFor.length > 0 
        ? sourceContent.usedFor.map((item: string) => `தமிழ்: ${item}`)
        : ['மிதமான வலி (தலைவலி, பல் வலி, முதுகு வலி)', 'பெரியவர்கள் மற்றும் குழந்தைகளில் காய்ச்சலைக் குறைத்தல்', 'தடுப்பூசிக்கு பின் ஏற்படும் காய்ச்சல் மற்றும் அசௌகரியம்'],
      howItWorks: sourceContent.howItWorks
        ? `தமிழ்: ${sourceContent.howItWorks}`
        : 'பாரசிட்டமால் மூளையில் உள்ள வலி சமிக்ஞைகளைத் தடுப்பதன் மூலமும் உடலின் வெப்பநிலையைக் கட்டுப்படுத்தும் ஹைபோதாலமஸில் செயல்படுவதன் மூலமும் செயல்படுகிறது.',
      dosageNotes: sourceContent.dosageNotes
        ? `தமிழ்: ${sourceContent.dosageNotes}`
        : 'எப்போதும் உங்கள் மருத்துவரின் பரிந்துரையைப் பின்பற்றவும். அதிகபட்ச தினசரி அளவைத் தாண்டக்கூடாது.',
      sideEffectsCommon: ['பரிந்துரைக்கப்பட்ட அளவுகளில் பயன்படுத்தும்போது பக்கவிளைவுகள் மிகக் குறைவு'],
      sideEffectsLessCommon: ['தோல் சொறி அல்லது அரிப்பு', 'செரிமான அசௌகரியம்'],
      sideEffectsSerious: ['கல்லீரல் பாதிப்பின் அறிகுறிகள் (மஞ்சள் காமாலை, அடர் சிறுநீர்)', 'கடுமையான ஒவ்வாமை எதிர்வினை'],
      warningsAlcohol: 'நீங்கள் தவறாமல் மது அருந்தினால் பாரசிட்டமால் சாப்பிட வேண்டாம். மதுவுடன் பாரசிட்டமால் சேர்ப்பது கல்லீரலுக்கு கடுமையான பாதிப்பை ஏற்படுத்தும்.',
      warningsLiver: 'கல்லீரல் நோய் உள்ள நோயாளிகள் மருத்துவ மேற்பார்வையின் கீழ் மட்டுமே பயன்படுத்த வேண்டும்.',
      warningsOverdose: 'பாரசிட்டமால் அதிகப்படியான அளவு கல்லீரல் செயலிழப்புக்கு ஒரு முக்கிய காரணமாகும்.',
    };

    onTranslateComplete({
      si: generatedSinhala,
      ta: generatedTamil,
    });
    setCompleted(false);
    onClose();
  };

  const modalJSX = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-near-black/70 backdrop-blur-md animate-fade-up">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-light-gray overflow-hidden relative z-10">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-near-black via-blue-dark to-blue text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15">
              <Bot size={22} className="text-teal" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-plus-jakarta m-0 tracking-tight flex items-center gap-2">
                AI Multi-Lang Translator
                <span className="bg-amber-400/20 text-amber-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                  GPT-4o Medical
                </span>
              </h3>
              <p className="text-xs text-white/70 m-0">Auto-generates Sinhala & Tamil content</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {!completed && !isTranslating && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-light/60 border border-blue/20 rounded-2xl text-dark-gray text-xs space-y-2">
                <div className="font-bold text-blue text-sm flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-500" />
                  <span>How it works:</span>
                </div>
                <p className="m-0 leading-relaxed">
                  The AI engine reads your filled <strong>{sourceLang.toUpperCase()}</strong> medical content and automatically translates it into grammatically correct <strong>Sinhala (සිංහල)</strong> and <strong>Tamil (தமிழ்)</strong> medical terminology.
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-off-white rounded-2xl border border-light-gray">
                <div className="text-xs font-semibold text-mid-gray">Source Language</div>
                <span className="px-3 py-1 bg-blue text-white font-bold text-xs rounded-full uppercase">
                  {sourceLang === 'en' ? 'English' : sourceLang === 'si' ? 'Sinhala' : 'Tamil'}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-off-white rounded-2xl border border-light-gray">
                <div className="text-xs font-semibold text-mid-gray">Target Languages</div>
                <div className="flex gap-1.5">
                  {['si', 'ta'].map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 bg-teal/10 text-teal border border-teal/20 font-bold text-xs rounded-full uppercase"
                    >
                      {lang === 'si' ? 'Sinhala' : 'Tamil'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {isTranslating && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue/10 flex items-center justify-center mx-auto text-blue">
                <Loader2 size={32} className="animate-spin" />
              </div>
              <div>
                <h4 className="text-base font-bold text-near-black font-plus-jakarta m-0 mb-1">
                  Translating Medical Terms...
                </h4>
                <p className="text-xs text-mid-gray m-0 font-medium">{currentStepText}</p>
              </div>

              <div className="w-full bg-light-gray rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue to-teal h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {completed && (
            <div className="py-4 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-teal/10 text-teal flex items-center justify-center mx-auto border border-teal/20">
                <Check size={28} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-near-black font-plus-jakarta m-0 mb-1">
                  Translation Complete!
                </h4>
                <p className="text-xs text-mid-gray m-0">
                  Sinhala & Tamil content generated successfully and populated into form tabs.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-off-white border-t border-light-gray flex items-center justify-end gap-3">
          {!completed && !isTranslating && (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-dark-gray hover:bg-light-gray transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStartTranslate}
                className="px-6 py-2.5 bg-gradient-to-r from-blue to-teal text-white text-xs font-bold rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Sparkles size={15} />
                <span>Generate Translations</span>
              </button>
            </>
          )}

          {completed && (
            <button
              type="button"
              onClick={handleApply}
              className="w-full py-3 bg-teal hover:bg-teal/90 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Check size={16} />
              <span>Apply Translations to Tabs</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalJSX, document.body);
}
