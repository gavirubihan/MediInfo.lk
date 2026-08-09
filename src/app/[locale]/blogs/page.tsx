'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchInput } from '@/components/ui/SearchInput';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Check, Languages, Globe, Filter } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SampleArticle {
  slug: string;
  tag: string;
  lang: string;
  langCode: 'en' | 'si' | 'ta';
  date: string;
  read: string;
  title: string;
  excerpt: string;
  coverImage: string;
  avatar: string;
  color: string;
  name: string;
}

export default function BlogsPage() {
  const t = useTranslations('BlogsPage');
  const [selectedLang, setSelectedLang] = useState<'all' | 'en' | 'si' | 'ta'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sampleArticles: SampleArticle[] = [
    {
      slug: 'safe-use-of-antibiotics-sri-lanka',
      tag: 'Medicine Guide',
      lang: 'English',
      langCode: 'en',
      date: '5 Aug 2026',
      read: '6 min',
      title: 'Safe Use of Antibiotics: What Every Sri Lankan Patient Should Know',
      excerpt: 'Antibiotic resistance is fast becoming one of the most critical public health threats. Learn how to complete prescriptions safely.',
      coverImage: '/images/blog/antibiotics-cover.png',
      avatar: 'DK',
      color: 'bg-blue',
      name: 'Dr. Kasun Perera, MBBS',
    },
    {
      slug: 'diabetes-management-sinhala',
      tag: 'Diabetes Care',
      lang: 'සිංහල',
      langCode: 'si',
      date: '6 Aug 2026',
      read: 'මිනිත්තු 8',
      title: 'ශ්‍රී ලංකාවේ දියවැඩියා රෝගීන් සඳහා නිවැරදි ඖෂධ භාවිතය සහ ආහාර පාලනය',
      excerpt: 'දියවැඩියාව පාලනය කිරීම, ඉන්සියුලින් සහ මෙට්ෆොමින් (Metformin) භාවිතයේදී සැලකිලිමත් විය යුතු කරුණු පිළිබඳ වෛද්‍ය උපදෙස්.',
      coverImage: '/images/blog/diabetes-cover.png',
      avatar: 'DW',
      color: 'bg-teal',
      name: 'වෛද්‍ය වසන්ත සිල්වා',
    },
    {
      slug: 'pediatric-fever-care-tamil',
      tag: 'Pediatric Care',
      lang: 'தமிழ்',
      langCode: 'ta',
      date: '4 Aug 2026',
      read: '6 நிமிடங்கள்',
      title: 'குழந்தைகளில் காய்ச்சல்: பெற்றோர்கள் அறிய வேண்டிய முக்கியமான வழிகாட்டி',
      excerpt: 'குழந்தைகளுக்கு காய்ச்சல் வரும்போது பாரசிட்டமால் மருந்தளவை எவ்வாறு சரியாக வழங்குவது மற்றும் அவசர உதவிகள்.',
      coverImage: '/images/blog/pediatric-cover.png',
      avatar: 'DR',
      color: 'bg-red',
      name: 'டாக்டர் ரவி ஜெயசிங்க',
    },
  ];

  const languages = [
    { code: 'all', label: 'All Languages' },
    { code: 'en', label: 'English' },
    { code: 'si', label: 'සිංහල' },
    { code: 'ta', label: 'தமிழ்' },
  ] as const;

  const categories = [
    'all',
    'Medicine Guide',
    'Diabetes Care',
    'Pediatric Care',
    'Elderly Care',
    'Drug Interactions',
  ];

  // Dynamic Filtering Logic
  const filteredArticles = sampleArticles.filter((article) => {
    const matchesLang = selectedLang === 'all' || article.langCode === selectedLang;
    const matchesCat = selectedCategory === 'all' || article.tag === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLang && matchesCat && matchesSearch;
  });

  return (
    <>
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-near-black via-blue-dark to-blue pt-36 pb-12 text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          <p className="text-[13px] text-teal uppercase tracking-[1px] font-bold mb-3">{t('tag')}</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-plus-jakarta text-white tracking-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-[15px] sm:text-[17px] text-white/85 max-w-2xl leading-relaxed mb-8">
            {t('subtitle')}
          </p>

          <div className="max-w-[560px] pt-1">
            <SearchInput
              placeholder={t('placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Combined Language & Category Quick Filters */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-white/80">
              <Languages size={15} className="text-teal" />
              <span>Filter by Language:</span>
            </div>

            <div className="flex gap-2 flex-wrap">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code as any)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedLang === lang.code
                      ? 'bg-teal text-white shadow-md border border-teal'
                      : 'bg-white/10 text-white/90 border border-white/20 hover:bg-white/20'
                  }`}
                >
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-off-white/40">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          
          {/* Featured Article Card */}
          <div className="bg-white border border-light-gray rounded-3xl overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-2 mb-12 transition-all hover:shadow-xl group">
            <div className="relative min-h-[300px] sm:min-h-[360px] overflow-hidden">
              <Image
                src="/images/blog/antibiotics-cover.png"
                alt="Safe Antibiotic Use in Sri Lanka"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-near-black/60 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 bg-teal text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Featured Article (English)
              </span>
            </div>

            <div className="p-8 sm:p-10 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="blue">Medicine Guide</Badge>
                <span className="text-xs text-mid-gray font-semibold">• 6 min read</span>
              </div>
              <h2 className="font-plus-jakarta font-extrabold text-[22px] sm:text-[26px] text-near-black leading-[1.3] m-0">
                Safe Use of Antibiotics: What Every Sri Lankan Patient Should Know
              </h2>
              <p className="text-[15px] text-dark-gray leading-[1.65] m-0">
                Antibiotic resistance is fast becoming one of the most critical public health threats in Sri Lanka. This comprehensive guide explains when antibiotics are needed, which ones treat what infections, and how to complete your course safely.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-light-gray">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white bg-blue shrink-0">DK</div>
                  <div>
                    <div className="text-[13px] font-bold text-near-black">Dr. Kasun Perera, MBBS</div>
                    <span className="bg-teal text-white text-[9px] font-bold uppercase px-1.5 py-[2px] rounded inline-flex items-center gap-0.5 mt-0.5"><Check size={10} /> VERIFIED DR.</span>
                  </div>
                </div>
                <Link href="/blogs/safe-use-of-antibiotics-sri-lanka" className="no-underline">
                  <Button variant="primary">{t('readArticle')}</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            {/* Main Multi-Language Articles Grid */}
            <div className="space-y-6">
              
              {/* Filter Control Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white border border-light-gray rounded-2xl shadow-sm">
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-blue" />
                  <span className="text-sm font-bold text-near-black font-plus-jakarta">
                    Article Language Filter:
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLang(lang.code as any)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedLang === lang.code
                          ? 'bg-blue text-white shadow-sm'
                          : 'bg-off-white text-dark-gray hover:bg-light-gray border border-light-gray'
                      }`}
                    >
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Articles Counter */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-plus-jakarta text-near-black m-0">
                  {selectedLang === 'all'
                    ? 'All Articles (English, සිංහල, தமிழ்)'
                    : selectedLang === 'en'
                    ? 'English Articles'
                    : selectedLang === 'si'
                    ? 'සිංහල ලිපි (Sinhala Articles)'
                    : 'தமிழ் கட்டுரைகள் (Tamil Articles)'}
                </h3>
                <span className="text-xs font-bold text-blue bg-blue-light px-3 py-1 rounded-full border border-blue/15">
                  {filteredArticles.length} Article{filteredArticles.length === 1 ? '' : 's'}
                </span>
              </div>

              {/* Grid or Empty State */}
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredArticles.map((blog) => (
                    <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="no-underline text-inherit block">
                      <div className="bg-white border border-light-gray rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full group">
                        
                        {/* Article Cover Image */}
                        <div className="relative w-full h-48 overflow-hidden">
                          <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-3 right-3 bg-near-black/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase">
                            {blog.lang}
                          </span>
                          <span className="absolute top-3 left-3 bg-blue/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                            {blog.tag}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1 space-y-3">
                          <div className="flex justify-between items-center text-xs text-mid-gray font-medium">
                            <span>{blog.date}</span>
                            <span>{blog.read}</span>
                          </div>

                          <h3 className={`text-[17px] font-bold font-plus-jakarta text-near-black leading-[1.35] m-0 ${
                            blog.langCode === 'si' ? 'font-noto-sinhala' : ''
                          }`}>
                            {blog.title}
                          </h3>

                          <p className={`text-[14px] text-dark-gray leading-[1.6] line-clamp-2 m-0 ${
                            blog.langCode === 'si' ? 'font-noto-sinhala' : ''
                          }`}>
                            {blog.excerpt}
                          </p>

                          <div className="flex items-center gap-2.5 mt-auto pt-3 border-t border-light-gray">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${blog.color}`}>
                              {blog.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-bold text-near-black">{blog.name}</div>
                              <span className="bg-teal text-white text-[9px] font-bold uppercase px-1.5 py-[1px] rounded inline-flex items-center gap-0.5 mt-0.5">
                                <Check size={9} /> VERIFIED DR.
                              </span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-light-gray rounded-3xl p-12 text-center space-y-3 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-blue-light text-blue flex items-center justify-center mx-auto font-bold text-xl">
                    <Globe size={24} />
                  </div>
                  <h4 className="text-base font-bold text-near-black m-0 font-plus-jakarta">
                    No articles found for selected language
                  </h4>
                  <p className="text-xs text-mid-gray m-0">
                    Try switching back to <strong>"All Languages"</strong> or reset your search query.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedLang('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-blue text-white text-xs font-bold rounded-xl shadow-md hover:bg-blue-dark transition-all mt-2"
                  >
                    Reset Language Filter
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white border border-light-gray rounded-3xl p-6 shadow-sm">
                <div className="font-plus-jakarta font-bold text-base text-near-black mb-4">{t('popular')}</div>
                {[
                  { num: '01', title: 'Safe Use of Antibiotics in Sri Lanka', views: '12 min read · 4.2k views' },
                  { num: '02', title: 'ශ්‍රී ලංකාවේ දියවැඩියා රෝගීන් සඳහා ඖෂධ භාවිතය', views: 'මිනිත්තු 8 · 5.1k views' },
                  { num: '03', title: 'குழந்தைகளில் காய்ச்சல்: மருத்துவ வழிகாட்டி', views: '6 நிமிடங்கள் · 3.8k views' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 py-3 border-b border-light-gray last:border-b-0 items-start">
                    <span className="text-lg font-extrabold text-blue-light font-plus-jakarta leading-none w-6 shrink-0">{item.num}</span>
                    <div>
                      <div className="text-[13px] font-semibold text-near-black leading-[1.4]">{item.title}</div>
                      <div className="text-[11px] text-mid-gray mt-1">{item.views}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-light-gray rounded-3xl p-6 shadow-sm">
                <div className="font-plus-jakarta font-bold text-base text-near-black mb-4">{t('browse')}</div>
                <div className="flex flex-wrap gap-2">
                  {categories.filter(c => c !== 'all').map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? 'all' : cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer border-none font-sans transition-all ${
                        selectedCategory === cat ? 'bg-blue text-white' : 'bg-blue-light text-blue hover:bg-blue hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue to-blue-dark border border-blue rounded-3xl p-6 shadow-md text-white space-y-3">
                <div className="font-plus-jakarta font-bold text-base">{t('doctorTitle')}</div>
                <p className="text-[13px] text-white/85 leading-relaxed m-0">{t('doctorDesc')}</p>
                <Button variant="white" className="w-full justify-center !text-[13px] !py-2.5">
                  {t('doctorBtn')}
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
