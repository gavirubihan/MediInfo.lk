'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Check, 
  Clock, 
  Calendar, 
  Eye, 
  Bookmark, 
  ThumbsUp, 
  MessageSquare, 
  AlertTriangle,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Copy,
  AlertOctagon,
  Languages
} from 'lucide-react';

interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  language: 'en' | 'si' | 'ta';
  category: string;
  coverImage: string;
  publishedDate: string;
  readTime: string;
  viewsCount: string;
  author: {
    name: string;
    qualification: string;
    specialty: string;
    hospital: string;
    avatar: string;
    color: string;
    bio: string;
  };
  labels: string[];
  contentHtml: React.ReactNode;
}

const articlesDatabase: Record<string, BlogPostData> = {
  // 1. ENGLISH ARTICLE
  'safe-use-of-antibiotics-sri-lanka': {
    id: 'blog-101',
    slug: 'safe-use-of-antibiotics-sri-lanka',
    title: 'Safe Use of Antibiotics: What Every Sri Lankan Patient Should Know',
    subtitle: 'A doctor’s guide to understanding antibiotic resistance, completing prescriptions, and preventing dangerous drug misuse.',
    language: 'en',
    category: 'Medicine Guide',
    coverImage: '/images/blog/antibiotics-cover.png',
    publishedDate: 'August 5, 2026',
    readTime: '6 min read',
    viewsCount: '4,280 views',
    author: {
      name: 'Dr. Kasun Perera',
      qualification: 'MBBS, MD (General Medicine)',
      specialty: 'General Physician & Clinical Pharmacology',
      hospital: 'Colombo National Hospital',
      avatar: 'DK',
      color: 'bg-blue',
      bio: 'Dr. Kasun Perera is a senior general practitioner with over 12 years of experience in Sri Lanka. He specializes in clinical pharmacology and rational drug prescribing.',
    },
    labels: ['Medicine Guide', 'Antibiotics', 'Sri Lanka Health', 'Prescriptions'],
    contentHtml: (
      <div className="space-y-6 text-[16px] text-dark-gray leading-[1.75]">
        <p>
          Antibiotic resistance is fast becoming one of the most critical public health threats in Sri Lanka and worldwide. Every year, thousands of patients take antibiotics inappropriately for viral illnesses like the common cold or flu — conditions that antibiotics are completely ineffective against.
        </p>

        <div className="bg-blue-light/70 border-l-4 border-blue rounded-r-2xl p-5 text-near-black space-y-2">
          <h4 className="font-bold text-blue font-plus-jakarta text-base m-0 flex items-center gap-2">
            <Sparkles size={18} className="text-amber-500" />
            <span>Key Takeaway:</span>
          </h4>
          <p className="text-sm m-0 leading-relaxed font-semibold">
            Antibiotics kill bacteria, not viruses. Taking an antibiotic for a cough or fever caused by a virus will not cure you, and it increases your body's resistance to future infections.
          </p>
        </div>

        <h2 id="when-needed" className="text-2xl font-bold font-plus-jakarta text-near-black pt-4 tracking-tight">
          1. When Are Antibiotics Really Needed?
        </h2>
        <p>
          Antibiotics are life-saving medications specifically designed to destroy or slow down the growth of <strong>bacteria</strong>. They are essential for treating bacterial pneumonia, urinary tract infections (UTIs), strep throat, and severe skin infections.
        </p>
        <p>
          However, upper respiratory tract infections — such as running noses, viral sore throats, dengue, and influenza — are caused by viruses. Taking amoxicillin or ciprofloxacin for these conditions will not speed up your recovery.
        </p>

        <h2 id="golden-rules" className="text-2xl font-bold font-plus-jakarta text-near-black pt-4 tracking-tight">
          2. The 4 Golden Rules of Antibiotic Use in Sri Lanka
        </h2>
        <ul className="space-y-3 list-none p-0">
          <li className="flex items-start gap-3 p-4 bg-off-white rounded-2xl border border-light-gray">
            <div className="w-7 h-7 rounded-full bg-teal text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
            <div>
              <strong className="text-near-black block mb-0.5">Never buy antibiotics over-the-counter without a doctor's prescription.</strong>
              <span>Always consult a registered MBBS doctor before starting any antibiotic regimen.</span>
            </div>
          </li>
          <li className="flex items-start gap-3 p-4 bg-off-white rounded-2xl border border-light-gray">
            <div className="w-7 h-7 rounded-full bg-teal text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
            <div>
              <strong className="text-near-black block mb-0.5">Complete the full prescribed course.</strong>
              <span>Even if your symptoms disappear after 2 or 3 days, complete the entire 5 to 7 day course prescribed by your physician. Stopping early allows surviving bacteria to mutate and become resistant.</span>
            </div>
          </li>
          <li className="flex items-start gap-3 p-4 bg-off-white rounded-2xl border border-light-gray">
            <div className="w-7 h-7 rounded-full bg-teal text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
            <div>
              <strong className="text-near-black block mb-0.5">Never save leftover antibiotics for next time.</strong>
              <span>Discard unused capsules safely or return them to a pharmacy. Taking partial leftover doses is a primary driver of superbug development.</span>
            </div>
          </li>
          <li className="flex items-start gap-3 p-4 bg-off-white rounded-2xl border border-light-gray">
            <div className="w-7 h-7 rounded-full bg-teal text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</div>
            <div>
              <strong className="text-near-black block mb-0.5">Never share your prescription with family or friends.</strong>
              <span>What worked for your urinary infection will not work for your family member’s chest infection.</span>
            </div>
          </li>
        </ul>

        <h2 id="resistance-risks" className="text-2xl font-bold font-plus-jakarta text-near-black pt-4 tracking-tight">
          3. Understanding Antibiotic Resistance
        </h2>
        <p>
          When bacteria are exposed to antibiotics repeatedly or in incomplete doses, they adapt. They develop mechanisms to neutralize the medicine. When this happens, common infections that used to be easily cured become untreatable.
        </p>

        <div className="p-6 bg-red/10 border-l-4 border-red rounded-r-2xl space-y-2">
          <h4 className="flex items-center gap-2 font-bold text-red text-base m-0">
            <AlertOctagon size={18} /> Emergency Warning Signals
          </h4>
          <p className="text-sm text-dark-gray m-0 leading-relaxed">
            If you develop severe skin rashes, facial swelling, persistent diarrhea, or difficulty breathing while taking an antibiotic, stop taking the medication immediately and seek emergency medical care.
          </p>
        </div>
      </div>
    ),
  },

  // 2. SINHALA ARTICLE
  'diabetes-management-sinhala': {
    id: 'blog-102',
    slug: 'diabetes-management-sinhala',
    title: 'ශ්‍රී ලංකාවේ දියවැඩියා රෝගීන් සඳහා නිවැරදි ඖෂධ භාවිතය සහ ආහාර පාලනය',
    subtitle: 'දියවැඩියාව පාලනය කිරීම, ඉන්සියුලින් සහ මෙට්ෆොමින් (Metformin) භාවිතයේදී සැලකිලිමත් විය යුතු කරුණු පිළිබඳ වෛද්‍ය උපදෙස්.',
    language: 'si',
    category: 'Diabetes Care',
    coverImage: '/images/blog/diabetes-cover.png',
    publishedDate: 'අගෝස්තු 6, 2026',
    readTime: 'මිනිත්තු 8 යි',
    viewsCount: '5,120 නැරඹුම්',
    author: {
      name: 'වෛද්‍ය වසන්ත සිල්වා',
      qualification: 'MBBS, MD (Endocrinology)',
      specialty: 'අන්තරාසර්ග පද්ධති සහ දියවැඩියා විශේෂඥ වෛද්‍ය',
      hospital: 'ජාතික රෝහල - කොළඹ',
      avatar: 'DW',
      color: 'bg-teal',
      bio: 'වෛද්‍ය වසන්ත සිල්වා කොළඹ ජාතික රෝහලේ අන්තරාසර්ග රෝග පිළිබඳ ජ්‍යෙෂ්ඨ විශේෂඥ වෛද්‍යවරයෙකි. දියවැඩියා රෝග පාලනය සහ රෝගී දැනුවත්භාවය පිළිබඳ විශේෂඥතාවයක් දක්වයි.',
    },
    labels: ['දියවැඩියාව', 'ඖෂධ පාලනය', 'සෞඛ්‍ය උපදෙස්', 'මෙට්ෆොමින්'],
    contentHtml: (
      <div className="space-y-6 text-[16px] text-dark-gray leading-[1.8] font-noto-sinhala">
        <p>
          ශ්‍රී ලංකාවේ වැඩිහිටි ජනගහනයෙන් සැලකිය යුතු ප්‍රතිශතයක් දියවැඩියා (Diabetes Mellitus) රෝගයෙන් පීඩා විඳිති. දියවැඩියාව යනු නිවැරදිව පාලනය කළ හැකි රෝගයක් වන අතර, ඒ සඳහා ඖෂධ වේලාවට ගැනීම සහ ආහාර රටාව පාලනය කිරීම අත්‍යවශ්‍ය වේ.
        </p>

        <div className="bg-teal/10 border-l-4 border-teal rounded-r-2xl p-5 text-near-black space-y-2">
          <h4 className="font-bold text-teal font-plus-jakarta text-base m-0 flex items-center gap-2">
            <Sparkles size={18} className="text-amber-500" />
            <span>වැදගත් පණිවිඩය:</span>
          </h4>
          <p className="text-sm m-0 leading-relaxed font-semibold">
            දියවැඩියා ඖෂධ මගින් රුධිරයේ සීනි මට්ටම පාලනය කරන නමුත්, එය සාර්ථක වන්නේ ඔබ පෝෂ්‍යදායී ආහාර රටාවක් සහ ක්‍රියාශීලී ජීවන රටාවක් පවත්වා ගන්නේ නම් පමණි.
          </p>
        </div>

        <h2 id="metformin-guide" className="text-2xl font-bold text-near-black pt-4 tracking-tight">
          1. මෙට්ෆොමින් (Metformin) ඖෂධය නිවැරදිව භාවිත කරන්නේ කෙසේද?
        </h2>
        <p>
          මෙට්ෆොමින් යනු දෙවන වර්ගයේ දියවැඩියාව සඳහා ලබා දෙන ප්‍රධානතම ඖෂධයයි. බොහෝ රෝගීන් මෙම ඖෂධය ගැනීමේදී බඩේ අපහසුතා හෝ වමනය ගතිය ඇතිවන බව පවසති. මෙය වළක්වා ගැනීමට ඖෂධය <strong>ප්‍රධාන ආහාර වේලක් අතරතුර හෝ ආහාර වේල අවසන් වූ වහාම</strong> ලබා ගැනීම සුදුසුය.
        </p>

        <h2 id="lifestyle-rules" className="text-2xl font-bold text-near-black pt-4 tracking-tight">
          2. දියවැඩියා රෝගීන් සඳහා රන් රීති 4 ක්
        </h2>
        <ul className="space-y-3 list-none p-0">
          <li className="flex items-start gap-3 p-4 bg-off-white rounded-2xl border border-light-gray">
            <div className="w-7 h-7 rounded-full bg-blue text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
            <div>
              <strong className="text-near-black block mb-0.5">රුධිර ග්ලූකෝස් මට්ටම පරීක්ෂා කිරීම (FBS / HbA1c)</strong>
              <span>අවම වශයෙන් මාස 3 කට වරක්වත් HbA1c පරීක්ෂණය සිදු කර ඔබේ වෛද්‍යවරයා හමු වන්න.</span>
            </div>
          </li>
          <li className="flex items-start gap-3 p-4 bg-off-white rounded-2xl border border-light-gray">
            <div className="w-7 h-7 rounded-full bg-blue text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
            <div>
              <strong className="text-near-black block mb-0.5">පාද ආරක්ෂාව සහ පරීක්ෂාව</strong>
              <span>දියවැඩියා රෝගීන් දිනපතා තම පාදවල තුවාල හෝ කපීම් තිබේදැයි පරීක්ෂා කළ යුතුය. කුඩා තුවාලයක් වුවද වෛද්‍යවරයෙකුට පෙන්වන්න.</span>
            </div>
          </li>
          <li className="flex items-start gap-3 p-4 bg-off-white rounded-2xl border border-light-gray">
            <div className="w-7 h-7 rounded-full bg-blue text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
            <div>
              <strong className="text-near-black block mb-0.5">අඩු සීනි තත්ත්වය (Hypoglycemia) හඳුනා ගැනීම</strong>
              <span>තදින් දහඩිය දැමීම, වෙව්ලීම, හිසරදය හෝ කරකැවිල්ල ඇති වුවහොත් වහාම සීනි සහිත පානයක් හෝ පැණිරස කැවිල්ලක් ලබා ගන්න.</span>
            </div>
          </li>
        </ul>

        <div className="p-6 bg-red/10 border-l-4 border-red rounded-r-2xl space-y-2">
          <h4 className="flex items-center gap-2 font-bold text-red text-base m-0">
            <AlertTriangle size={18} /> හදිසි අවස්ථා අවවාදය
          </h4>
          <p className="text-sm text-dark-gray m-0 leading-relaxed">
            ඔබට අධික ලෙස පිපාසය, නිතර නිතර මුත්‍රා පිටවීම සහ සිහිමද ගතිය ඇති වන්නේ නම් එය රුධිරයේ සීනි මට්ටම ඉතා ඉහළ යාමේ ලක්ෂණයක් විය හැක. වහාම ආසන්නතම රෝහල වෙත යන්න.
          </p>
        </div>
      </div>
    ),
  },

  // 3. TAMIL ARTICLE
  'pediatric-fever-care-tamil': {
    id: 'blog-103',
    slug: 'pediatric-fever-care-tamil',
    title: 'குழந்தைகளில் காய்ச்சல்: பெற்றோர்கள் அறிய வேண்டிய முக்கியமான மருத்துவ வழிகாட்டி',
    subtitle: 'குழந்தைகளுக்கு காய்ச்சல் வரும்போது பாரசிட்டமால் மருந்தளவை எவ்வாறு சரியாக வழங்குவது மற்றும் எப்போது உடனடியாக மருத்துவ உதவியை நாடுவது.',
    language: 'ta',
    category: 'Pediatric Care',
    coverImage: '/images/blog/pediatric-cover.png',
    publishedDate: 'ஆகஸ்ட் 4, 2026',
    readTime: '6 நிமிடங்கள்',
    viewsCount: '3,890 பார்வைகள்',
    author: {
      name: 'டாக்டர் ரவி ஜெயசிங்க',
      qualification: 'MBBS, DCH (Pediatrics)',
      specialty: 'குழந்தை நல மருத்துவ நிபுணர்',
      hospital: 'லேடி ரிட்ஜ்வே குழந்தை மருத்துவமனை',
      avatar: 'DR',
      color: 'bg-red',
      bio: 'டாக்டர் ரவி ஜெயசிங்க கொழும்பு லேடி ரிட்ஜ்வே குழந்தை மருத்துவமனையில் 15 ஆண்டுகளுக்கும் மேலாக பணியாற்றும் முன்னணி குழந்தை நல நிபுணர் ஆவார்.',
    },
    labels: ['குழந்தை மருத்துவம்', 'காய்ச்சல்', 'பாரசிட்டமால்', 'பெற்றோர் வழிகாட்டி'],
    contentHtml: (
      <div className="space-y-6 text-[16px] text-dark-gray leading-[1.8]">
        <p>
          குழந்தைகளுக்கு காய்ச்சல் ஏற்படுவது பெற்றோர்களுக்கு மிகுந்த கவலையை அளிக்கும் ஒரு விஷயமாகும். காய்ச்சல் என்பது உடலின் நோய் எதிர்ப்பு சக்தி தொற்றுநோய்களை எதிர்த்துப் போராடுகிறது என்பதற்கான அறிகுறியாகும்.
        </p>

        <div className="bg-red/10 border-l-4 border-red rounded-r-2xl p-5 text-near-black space-y-2">
          <h4 className="font-bold text-red font-plus-jakarta text-base m-0 flex items-center gap-2">
            <Sparkles size={18} className="text-amber-500" />
            <span>முக்கியமான விஷயம்:</span>
          </h4>
          <p className="text-sm m-0 leading-relaxed font-semibold">
            குழந்தையின் உடல் எடைக் கேற்பவே பாரசிட்டமால் அளவை தீர்மானிக்க வேண்டும், வயதின் அடிப்படையில் மட்டும் வழங்கக் கூடாது.
          </p>
        </div>

        <h2 id="dosage-guide" className="text-2xl font-bold font-plus-jakarta text-near-black pt-4 tracking-tight">
          1. பாரசிட்டமால் மருந்தை சரியான அளவில் வழங்குவது எப்படி?
        </h2>
        <p>
          குழந்தைகளுக்கு காய்ச்சல் நிவாரணியாக பாரசிட்டமால் சிரப் வழங்கும்போது, எப்போதும் மருந்தகத்தில் வழங்கப்படும் அளவிடும் கரண்டி அல்லது சிரிஞ்சைப் பயன்படுத்தவும். 4 முதல் 6 மணி நேரத்திற்கு ஒரு முறை மட்டுமே மருந்து கொடுக்க வேண்டும்.
        </p>

        <h2 id="warning-signs" className="text-2xl font-bold font-plus-jakarta text-near-black pt-4 tracking-tight">
          2. எப்போது உடனடியாக மருத்துவமனைக்குச் செல்ல வேண்டும்?
        </h2>
        <ul className="space-y-3 list-none p-0">
          <li className="flex items-start gap-3 p-4 bg-off-white rounded-2xl border border-light-gray">
            <div className="w-7 h-7 rounded-full bg-red text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">!</div>
            <div>
              <strong className="text-near-black block mb-0.5">3 மாதங்களுக்கும் குறைவான குழந்தைகள்</strong>
              <span>3 மாதத்திற்குட்பட்ட குழந்தைக்கு 100.4°F (38°C) க்கும் அதிகமான காய்ச்சல் இருந்தால் உடனடியாக மருத்துவரிடம் அழைத்துச் செல்லவும்.</span>
            </div>
          </li>
          <li className="flex items-start gap-3 p-4 bg-off-white rounded-2xl border border-light-gray">
            <div className="w-7 h-7 rounded-full bg-red text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">!</div>
            <div>
              <strong className="text-near-black block mb-0.5">வலிப்பு அல்லது சுருக்கம் (Febrile Seizures)</strong>
              <span>காய்ச்சலினால் குழந்தை வலிப்பு அடைந்தால் அல்லது மயக்கமடைந்தால் தாமதிக்காமல் அவசர பிரிவுக்குச் செல்லவும்.</span>
            </div>
          </li>
        </ul>
      </div>
    ),
  },
};

export default function BlogArticleDetailPage() {
  const params = useParams();
  const slugParam = (params?.slug as string) || 'safe-use-of-antibiotics-sri-lanka';
  
  // Resolve article from slug parameter or fallback to antibiotics guide
  const article = articlesDatabase[slugParam] || articlesDatabase['safe-use-of-antibiotics-sri-lanka'];

  const [currentArticle, setCurrentArticle] = useState<BlogPostData>(article);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(142);
  const [bookmarked, setBookmarked] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const isSinhala = currentArticle.language === 'si';

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed top-20 right-6 z-50 bg-near-black text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-teal/40 animate-fade-up">
          <Check size={18} className="text-teal font-bold" />
          <span className="text-xs font-bold">Article Link Copied to Clipboard!</span>
        </div>
      )}

      {/* Hero Sub-header */}
      <div className="bg-gradient-to-br from-near-black via-blue-dark to-blue pt-36 pb-14 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 space-y-5">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-white/70 font-medium flex-wrap">
            <Link href="/" className="hover:text-white no-underline transition-colors">Home</Link>
            <span>›</span>
            <Link href="/blogs" className="hover:text-white no-underline transition-colors">Health Articles</Link>
            <span>›</span>
            <span className="text-teal font-semibold">{currentArticle.category}</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap pt-1">
            <Badge variant="blue" className="!bg-teal !text-white border-none shadow-md">
              {currentArticle.category}
            </Badge>
            <span className="text-xs text-white/80 font-semibold flex items-center gap-1">
              <Calendar size={13} /> {currentArticle.publishedDate}
            </span>
            <span className="text-xs text-white/80 font-semibold flex items-center gap-1">
              <Clock size={13} /> {currentArticle.readTime}
            </span>
            <span className="text-xs text-white/80 font-semibold flex items-center gap-1">
              <Eye size={13} /> {currentArticle.viewsCount}
            </span>
          </div>

          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold font-plus-jakarta leading-[1.18] tracking-tight max-w-4xl ${isSinhala ? 'font-noto-sinhala' : ''}`}>
            {currentArticle.title}
          </h1>

          <p className={`text-base sm:text-lg text-white/85 max-w-3xl leading-relaxed font-normal m-0 ${isSinhala ? 'font-noto-sinhala' : ''}`}>
            {currentArticle.subtitle}
          </p>

          {/* Author Header Bar */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/15 max-w-xl">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-md text-base shrink-0 ${currentArticle.author.color}`}>
              {currentArticle.author.avatar}
            </div>
            <div>
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <span>{currentArticle.author.name}</span>
                <span className="bg-teal text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <Check size={10} strokeWidth={3} /> VERIFIED DR.
                </span>
              </div>
              <div className="text-xs text-white/70">{currentArticle.author.qualification} — {currentArticle.author.hospital}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="py-12 bg-off-white/40">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
            
            {/* Main Content Area */}
            <article className="space-y-8 animate-fade-up">
              
              {/* Featured Cover Image Banner */}
              <div className="relative w-full h-[280px] sm:h-[380px] rounded-3xl overflow-hidden shadow-xl border border-light-gray">
                <Image
                  src={currentArticle.coverImage}
                  alt={currentArticle.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/40 to-transparent" />
              </div>

              {/* Doctor Medical Disclaimer Banner */}
              <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-2xl text-xs text-dark-gray flex items-start gap-3">
                <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={18} />
                <div>
                  <strong className="text-amber-900 block font-bold mb-0.5">Verified Medical Information</strong>
                  <span>This article has been authored & reviewed by a licensed Sri Lankan doctor. It is intended for educational purposes and does not replace personal medical advice.</span>
                </div>
              </div>

              {/* Article Content Container */}
              <div className={`bg-white border border-light-gray rounded-3xl p-6 sm:p-10 shadow-sm ${isSinhala ? 'font-noto-sinhala' : ''}`}>
                {currentArticle.contentHtml}
              </div>

              {/* Article Labels / Tags (Blogger API compatible) */}
              <div className="flex items-center gap-2 flex-wrap pt-2">
                <span className="text-xs font-bold text-mid-gray uppercase tracking-wider mr-1">Tags:</span>
                {currentArticle.labels.map((label) => (
                  <span key={label} className="bg-blue-light text-blue text-xs font-bold px-3 py-1.5 rounded-full border border-blue/15 hover:bg-blue hover:text-white transition-all cursor-pointer">
                    #{label}
                  </span>
                ))}
              </div>

              {/* Engagement Toolbar & Reaction Stats */}
              <div className="bg-white border border-light-gray p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLike}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      liked ? 'bg-blue text-white shadow-md' : 'bg-off-white text-dark-gray hover:bg-light-gray'
                    }`}
                  >
                    <ThumbsUp size={16} />
                    <span>{liked ? 'Liked' : 'Helpful'} ({likesCount})</span>
                  </button>

                  <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      bookmarked ? 'bg-teal text-white shadow-md' : 'bg-off-white text-dark-gray hover:bg-light-gray'
                    }`}
                  >
                    <Bookmark size={16} />
                    <span>{bookmarked ? 'Saved' : 'Bookmark'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2.5 bg-off-white hover:bg-light-gray text-dark-gray text-xs font-bold rounded-xl transition-all flex items-center gap-2 border border-light-gray"
                  >
                    <Copy size={15} />
                    <span>Share Link</span>
                  </button>
                </div>
              </div>

              {/* Author Biography Box */}
              <div className="bg-white border border-light-gray p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start gap-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-white shadow-md text-xl shrink-0 ${currentArticle.author.color}`}>
                  {currentArticle.author.avatar}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold font-plus-jakarta text-near-black m-0">
                      Written by {currentArticle.author.name}
                    </h3>
                    <span className="bg-teal text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Check size={10} strokeWidth={3} /> VERIFIED DR.
                    </span>
                  </div>
                  <div className="text-xs font-bold text-blue">{currentArticle.author.qualification} — {currentArticle.author.specialty}</div>
                  <p className="text-xs text-mid-gray leading-relaxed m-0">{currentArticle.author.bio}</p>
                </div>
              </div>

              {/* Questions / Comments Form */}
              <div className="bg-white border border-light-gray p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
                <h3 className="text-lg font-bold font-plus-jakarta text-near-black m-0 flex items-center gap-2">
                  <MessageSquare size={20} className="text-blue" />
                  <span>Community Comments</span>
                </h3>

                {/* Comment Input */}
                <div className="space-y-3">
                  <textarea
                    rows={3}
                    placeholder="Have a question about this article or medication? Ask our medical team..."
                    className="w-full p-4 rounded-2xl border border-light-gray text-xs text-dark-gray focus:border-blue outline-none"
                  />
                  <div className="flex justify-end">
                    <Button variant="primary" className="!py-2.5 !text-xs !rounded-xl">
                      Submit Question
                    </Button>
                  </div>
                </div>
              </div>

            </article>

            {/* Right Sticky Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-[120px]">
              
              {/* Doctor Card */}
              <div className="bg-white border border-light-gray p-6 rounded-3xl shadow-sm text-center space-y-3">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-white shadow-md text-xl mx-auto ${currentArticle.author.color}`}>
                  {currentArticle.author.avatar}
                </div>
                <div>
                  <h4 className="font-bold font-plus-jakarta text-near-black text-base m-0">
                    {currentArticle.author.name}
                  </h4>
                  <div className="text-xs text-mid-gray font-medium mt-0.5">{currentArticle.author.specialty}</div>
                </div>
                <div className="inline-flex items-center gap-1 bg-teal/10 text-teal text-[11px] font-bold px-3 py-1 rounded-full border border-teal/20">
                  <Check size={12} strokeWidth={3} /> Verified Practitioner
                </div>
              </div>

              {/* Related Articles Box */}
              <div className="bg-white border border-light-gray p-6 rounded-3xl shadow-sm space-y-4">
                <h4 className="font-bold font-plus-jakarta text-near-black text-sm uppercase tracking-wider text-mid-gray m-0">
                  Related Medical Articles
                </h4>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setCurrentArticle(articlesDatabase['safe-use-of-antibiotics-sri-lanka'])}
                    className="w-full text-left p-3.5 bg-off-white hover:bg-light-gray/60 rounded-2xl transition-all border border-light-gray/60 group cursor-pointer"
                  >
                    <div className="text-[10px] uppercase font-bold text-blue">Medicine Guide</div>
                    <div className="text-xs font-bold text-near-black group-hover:text-blue transition-colors leading-snug">
                      Safe Use of Antibiotics: What Every Sri Lankan Patient Should Know
                    </div>
                    <div className="text-[11px] text-mid-gray">English · 6 min read</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentArticle(articlesDatabase['diabetes-management-sinhala'])}
                    className="w-full text-left p-3.5 bg-off-white hover:bg-light-gray/60 rounded-2xl transition-all border border-light-gray/60 group cursor-pointer"
                  >
                    <div className="text-[10px] uppercase font-bold text-teal">Diabetes Care</div>
                    <div className="text-xs font-bold text-near-black group-hover:text-blue transition-colors leading-snug font-noto-sinhala">
                      ශ්‍රී ලංකාවේ දියවැඩියා රෝගීන් සඳහා නිවැරදි ඖෂධ භාවිතය
                    </div>
                    <div className="text-[11px] text-mid-gray">සිංහල · මිනිත්තු 8</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentArticle(articlesDatabase['pediatric-fever-care-tamil'])}
                    className="w-full text-left p-3.5 bg-off-white hover:bg-light-gray/60 rounded-2xl transition-all border border-light-gray/60 group cursor-pointer"
                  >
                    <div className="text-[10px] uppercase font-bold text-red">Pediatric Care</div>
                    <div className="text-xs font-bold text-near-black group-hover:text-blue transition-colors leading-snug">
                      குழந்தைகளில் காய்ச்சல்: பெற்றோர்கள் அறிய வேண்டிய வழிகாட்டி
                    </div>
                    <div className="text-[11px] text-mid-gray">தமிழ் · 6 நிமிடங்கள்</div>
                  </button>
                </div>
              </div>

              {/* Back to All Blogs Button */}
              <Link
                href="/blogs"
                className="flex items-center justify-center gap-2 p-3.5 bg-white border border-light-gray hover:bg-off-white text-dark-gray text-xs font-bold rounded-2xl transition-all no-underline shadow-sm"
              >
                <ArrowLeft size={16} />
                <span>Back to All Health Articles</span>
              </Link>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}
