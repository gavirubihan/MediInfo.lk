import React from 'react';
import Link from 'next/link';
import { SearchInput } from '@/components/ui/SearchInput';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function BlogsPage() {
  const t = useTranslations('BlogsPage');
  return (
    <>
      <div className="bg-blue pt-36 pb-10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <p className="text-[13px] text-white/70 uppercase tracking-[1px] mb-2 font-semibold">{t('tag')}</p>
          <h1 className="text-[36px] font-bold leading-[1.2] font-plus-jakarta text-white mb-2">{t('title')}</h1>
          <p className="text-[15px] text-white/80 mb-5">{t('subtitle')}</p>
          <div className="max-w-[560px]">
            <SearchInput placeholder={t('placeholder')} />
          </div>
          <div className="flex gap-2 flex-wrap mt-3.5">
            <button className="px-4 py-1.5 rounded-full text-[13px] font-semibold bg-white text-blue border border-white cursor-pointer font-sans transition-all">{t('allBtn')}</button>
            {['Medicine Guide', 'Health Tips', 'Drug Interactions', 'Elderly Care', 'Pediatric'].map(cat => (
              <button key={cat} className="px-4 py-1.5 rounded-full text-[13px] font-semibold bg-white/15 text-white border border-white/30 cursor-pointer font-sans transition-all hover:bg-white/25">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          
          {/* Featured Article */}
          <div className="bg-white border border-light-gray rounded-3xl overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-2 mb-12 transition-shadow hover:shadow-lg">
            <div className="bg-gradient-to-br from-blue to-blue-dark p-12 flex flex-col items-start justify-end min-h-[320px] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,%3Csvg_width=%2260%22_height=%2260%22_viewBox=%220_0_60_60%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22none%22_fill-rule=%22evenodd%22%3E%3Cg_fill=%22%23ffffff%22_fill-opacity=%220.04%22%3E%3Ccircle_cx=%2230%22_cy=%2230%22_r=%2230%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]">
              <div className="text-[11px] font-bold uppercase text-white/70 tracking-[1px] mb-2 relative z-10">Featured Article</div>
              <div className="font-plus-jakarta font-extrabold text-[22px] text-white leading-[1.3] relative z-10">Safe Antibiotic Use in Sri Lanka: The Complete Guide</div>
            </div>
            <div className="p-10 flex flex-col justify-center">
              <div className="mb-3.5"><Badge variant="blue">Medicine Guide</Badge></div>
              <div className="font-plus-jakarta font-extrabold text-[24px] text-near-black leading-[1.3] mb-3.5">Safe Use of Antibiotics: What Every Sri Lankan Should Know</div>
              <p className="text-[15px] text-dark-gray leading-[1.65] mb-6">Antibiotic resistance is one of the biggest threats to global health. In Sri Lanka, antibiotics are often misused — taken without prescriptions, or stopped early when symptoms improve. This comprehensive guide explains when antibiotics are needed, which ones treat what infections, and how to complete your course safely.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white bg-blue shrink-0">DK</div>
                  <div>
                    <div className="text-[13px] font-semibold text-near-black">Dr. Kasun Perera, MBBS</div>
                    <span className="bg-teal text-white text-[10px] font-bold uppercase px-1.5 py-[2px] rounded flex items-center gap-0.5 mt-1 w-fit"><Check size={10} /> VERIFIED DR.</span>
                  </div>
                </div>
                <Link href="/blogs/safe-use-of-antibiotics-sri-lanka" className="no-underline">
                  <Button variant="primary">{t('readArticle')}</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            {/* Main Blog Grid */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { tag: 'Elderly Care', date: '8 Jun 2025', title: 'Managing Multiple Medications Safely in Older Adults', excerpt: 'Polypharmacy risks are real. A geriatric specialist explains how to review and simplify medication regimens for elderly patients.', avatar: 'DF', color: 'bg-teal', name: 'Dr. Fatima Aslam', read: '7 min', slug: 'elderly-medication-safety' },
                  { tag: 'Drug Interactions', date: '3 Jun 2025', title: '5 Common Drug Interactions You Might Not Know About', excerpt: 'Some everyday medicines can interact dangerously. Discover the most common combinations to avoid.', avatar: 'DN', color: 'bg-[#7B5EA7]', name: 'Dr. Nimal Bandara', read: '4 min', slug: 'drug-interactions-guide' },
                  { tag: 'Pediatric', date: '28 May 2025', title: 'Fever in Children: When to Medicate and When to Wait', excerpt: 'A pediatrician\'s guide to managing childhood fever, including when paracetamol is appropriate and when to seek emergency care.', avatar: 'DR', color: 'bg-red', name: 'Dr. Ravi Jayasinghe', read: '6 min', slug: 'fever-in-children' },
                  { tag: 'Health Tips', date: '20 May 2025', title: 'Reading Medicine Labels: A Complete Guide for Patients', excerpt: 'Understanding your medicine label can prevent dangerous mistakes. This guide walks through every section of a Sri Lankan drug label.', avatar: 'DS', color: 'bg-[#7B5EA7]', name: 'Dr. Sithara Mendis', read: '5 min', slug: 'reading-medicine-labels' },
                  { tag: 'Medicine Guide', date: '15 May 2025', title: 'Diabetes Medicines in Sri Lanka: Types, Uses, and Costs', excerpt: 'A practical overview of antidiabetic medications available in Sri Lanka, including both government hospital and private pharmacy options.', avatar: 'DW', color: 'bg-blue', name: 'Dr. Wasantha Silva', read: '8 min', slug: 'diabetes-medicines-sri-lanka' },
                  { tag: 'Health Tips', date: '10 May 2025', title: 'Storing Medicines at Home: The Dos and Don\'ts', excerpt: 'Heat, light, and humidity can destroy medicines. Learn how to store your medications correctly to maintain their effectiveness.', avatar: 'DA', color: 'bg-teal', name: 'Dr. Anoma Wijeratne', read: '3 min', slug: 'storing-medicines-home' },
                ].map((blog, i) => (
                  <Link key={i} href={`/blogs/${blog.slug}`} className="no-underline text-inherit block">
                    <div className="bg-white border border-light-gray rounded-2xl p-6 flex flex-col gap-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-lg hover:-translate-y-1 h-full">
                      <div className="flex justify-between items-center">
                        <Badge variant="blue">{blog.tag}</Badge>
                        <span className="text-xs text-mid-gray">{blog.date}</span>
                      </div>
                      <div className="text-[17px] font-bold font-plus-jakarta text-near-black leading-[1.35]">{blog.title}</div>
                      <div className="text-[14px] text-dark-gray leading-[1.6] line-clamp-2">{blog.excerpt}</div>
                      <div className="flex items-center gap-2.5 mt-auto pt-2">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 ${blog.color}`}>{blog.avatar}</div>
                        <div className="flex-1">
                          <div className="text-[13px] font-semibold text-near-black">{blog.name}</div>
                          <span className="bg-teal text-white text-[10px] font-bold uppercase px-1.5 py-[2px] rounded flex items-center gap-0.5 mt-0.5 w-fit"><Check size={10} /> VERIFIED DR.</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[13px] text-mid-gray">{blog.read} read</span>
                        <Button variant="text" className="!text-[13px]">{t('readMore')}</Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex gap-1.5 justify-center mt-10">
                <button className="px-3.5 h-10 border-[1.5px] border-light-gray bg-white rounded-lg text-sm font-semibold font-sans text-dark-gray cursor-pointer transition-colors hover:border-blue hover:text-blue">← Prev</button>
                <button className="w-10 h-10 border-[1.5px] border-blue bg-blue rounded-lg text-sm font-semibold font-sans text-white cursor-pointer">1</button>
                <button className="w-10 h-10 border-[1.5px] border-light-gray bg-white rounded-lg text-sm font-semibold font-sans text-dark-gray cursor-pointer transition-colors hover:border-blue hover:text-blue">2</button>
                <button className="w-10 h-10 border-[1.5px] border-light-gray bg-white rounded-lg text-sm font-semibold font-sans text-dark-gray cursor-pointer transition-colors hover:border-blue hover:text-blue">3</button>
                <button className="px-3.5 h-10 border-[1.5px] border-light-gray bg-white rounded-lg text-sm font-semibold font-sans text-dark-gray cursor-pointer transition-colors hover:border-blue hover:text-blue">Next →</button>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white border border-light-gray rounded-2xl p-6 mb-6 shadow-sm">
                <div className="font-plus-jakarta font-bold text-base text-near-black mb-4">{t('popular')}</div>
                {[
                  { num: '01', title: 'Safe Use of Antibiotics in Sri Lanka', views: '12 min read · 4.2k views' },
                  { num: '02', title: '5 Drug Interactions You Might Not Know', views: '4 min read · 3.8k views' },
                  { num: '03', title: 'Reading Medicine Labels: A Complete Guide', views: '5 min read · 2.9k views' },
                  { num: '04', title: 'Fever in Children: When to Medicate', views: '6 min read · 2.5k views' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 py-2.5 border-b border-light-gray last:border-b-0 items-start">
                    <span className="text-lg font-extrabold text-blue-light font-plus-jakarta leading-none w-6 shrink-0">{item.num}</span>
                    <div>
                      <div className="text-[13px] font-semibold text-near-black leading-[1.4]">{item.title}</div>
                      <div className="text-[11px] text-mid-gray mt-1">{item.views}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-light-gray rounded-2xl p-6 mb-6 shadow-sm">
                <div className="font-plus-jakarta font-bold text-base text-near-black mb-4">{t('browse')}</div>
                <div className="flex flex-wrap gap-2">
                  {['Medicine Guide', 'Health Tips', 'Drug Interactions', 'Elderly Care', 'Pediatric', 'Diabetes', 'Cardiology', 'Mental Health'].map(cat => (
                    <button key={cat} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-light text-blue cursor-pointer border-none font-sans transition-all hover:bg-blue hover:text-white">
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-blue border border-blue rounded-2xl p-6 shadow-sm text-white">
                <div className="font-plus-jakarta font-bold text-base mb-2">{t('doctorTitle')}</div>
                <p className="text-[14px] text-white/85 mb-4">{t('doctorDesc')}</p>
                <Button variant="white" className="w-full justify-center !text-[14px]">{t('doctorBtn')}</Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
