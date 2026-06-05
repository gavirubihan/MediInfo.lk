import React from 'react';
import Link from 'next/link';
import { SearchInput } from '@/components/ui/SearchInput';
import { Badge } from '@/components/ui/Badge';
import { Pill, Syringe, Circle, AlertCircle } from 'lucide-react';

export default function SearchPage() {
  return (
    <>
      {/* Search Header */}
      <div className="bg-blue pt-36 pb-10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <p className="text-[13px] text-white/70 uppercase tracking-[1px] mb-2 font-semibold">Medicine Database</p>
          <h1 className="text-[36px] font-bold leading-[1.2] font-plus-jakarta text-white mb-2">Search Medicines</h1>
          <p className="text-[15px] text-white/80 mb-5">Search our verified database of 500+ medicines</p>
          <div className="max-w-[700px]">
            <SearchInput placeholder="Search medicine name, generic name... e.g. Paracetamol, Amoxicillin" />
          </div>
          <div className="flex gap-2 flex-wrap mt-3.5 items-center">
            <span className="text-[13px] text-white/60 mr-1">Popular:</span>
            {['Paracetamol', 'Amoxicillin', 'Metformin', 'Omeprazole', 'Cetirizine'].map(med => (
              <button key={med} className="px-3.5 py-1.5 rounded-full text-[13px] font-semibold bg-white/15 text-white border border-white/30 cursor-pointer font-sans transition-colors hover:bg-white/25">
                {med}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 py-10">
          
          {/* Sidebar Filters */}
          <aside className="bg-white border border-light-gray rounded-2xl p-6 h-fit shadow-sm">
            <div className="font-plus-jakarta font-bold text-base text-near-black mb-5">Filter Results</div>
            
            <div className="mb-6">
              <div className="text-[13px] font-bold uppercase text-mid-gray tracking-[0.5px] mb-2.5">Category</div>
              {['Antibiotic', 'Painkiller', 'Antihistamine', 'Antacid', 'Vitamin', 'Antidiabetic'].map((cat, i) => (
                <label key={cat} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input type="checkbox" defaultChecked={i < 2} className="accent-blue w-4 h-4 cursor-pointer" />
                  <span className="text-sm text-dark-gray">{cat}</span>
                </label>
              ))}
            </div>
            <div className="h-px bg-light-gray mb-5" />

            <div className="mb-6">
              <div className="text-[13px] font-bold uppercase text-mid-gray tracking-[0.5px] mb-2.5">Language Available</div>
              {['English', 'සිංහල (Sinhala)', 'தமிழ் (Tamil)'].map((lang, i) => (
                <label key={lang} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input type="checkbox" defaultChecked={i < 2} className="accent-blue w-4 h-4 cursor-pointer" />
                  <span className="text-sm text-dark-gray">{lang}</span>
                </label>
              ))}
            </div>
            <div className="h-px bg-light-gray mb-5" />

            <div className="mb-6">
              <div className="text-[13px] font-bold uppercase text-mid-gray tracking-[0.5px] mb-2.5">Age Group</div>
              {['All Ages', 'Adults Only', 'Children Safe', 'Elderly Friendly'].map((age, i) => (
                <label key={age} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input type="radio" name="age" defaultChecked={i === 0} className="accent-blue w-4 h-4 cursor-pointer" />
                  <span className="text-sm text-dark-gray">{age}</span>
                </label>
              ))}
            </div>
            <div className="h-px bg-light-gray mb-5" />

            <div className="mb-6">
              <div className="text-[13px] font-bold uppercase text-mid-gray tracking-[0.5px] mb-2.5">Prescription</div>
              {['All', 'Required', 'Not Required'].map((rx, i) => (
                <label key={rx} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input type="radio" name="rx" defaultChecked={i === 0} className="accent-blue w-4 h-4 cursor-pointer" />
                  <span className="text-sm text-dark-gray">{rx}</span>
                </label>
              ))}
            </div>

            <button className="bg-transparent border-none text-red mt-2 text-[13px] font-semibold cursor-pointer p-0 hover:underline">
              Clear All Filters
            </button>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <div className="text-sm text-mid-gray">Showing <strong className="text-near-black font-bold">24 results</strong> for &quot;All Medicines&quot;</div>
              <select className="px-3.5 py-2 border-[1.5px] border-light-gray rounded-lg text-sm font-sans text-dark-gray outline-none cursor-pointer bg-white focus:border-blue">
                <option>Sort: Relevance</option>
                <option>A–Z</option>
                <option>Z–A</option>
                <option>By Category</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { name: 'Paracetamol', generic: 'Acetaminophen', icon: <Pill size={24} className="text-blue" />, tag: 'Painkiller', tagColor: 'blue', desc: 'Used for mild to moderate pain relief and fever reduction. Safe for most age groups.', req: '✓ VERIFIED', reqColor: 'bg-[rgba(23,169,142,0.12)] text-teal' },
                { name: 'Amoxicillin', generic: 'Amoxicillin Trihydrate', icon: <Syringe size={24} className="text-blue" />, tag: 'Antibiotic', tagColor: 'blue', desc: 'Broad-spectrum antibiotic for bacterial infections including ear, throat, and urinary infections.', req: 'Prescription', reqColor: 'bg-[#FFF8E8] text-[#B87A00]' },
                { name: 'Metformin', generic: 'Metformin Hydrochloride', icon: <Circle size={24} className="text-blue" />, tag: 'Antidiabetic', tagColor: 'blue', desc: 'First-line treatment for type 2 diabetes. Helps control blood sugar levels effectively.', req: 'Prescription', reqColor: 'bg-[#FFF8E8] text-[#B87A00]' },
                { name: 'Omeprazole', generic: 'Omeprazole Magnesium', icon: <Circle size={24} className="text-amber-500" />, tag: 'Antacid', tagColor: 'blue', desc: 'Proton pump inhibitor that reduces stomach acid. Used for ulcers and acid reflux.', req: '✓ VERIFIED', reqColor: 'bg-[rgba(23,169,142,0.12)] text-teal' },
                { name: 'Cetirizine', generic: 'Cetirizine Hydrochloride', icon: <Circle size={24} className="text-teal" />, tag: 'Antihistamine', tagColor: 'blue', desc: 'Second-generation antihistamine for allergy relief including hay fever and urticaria.', req: '✓ VERIFIED', reqColor: 'bg-[rgba(23,169,142,0.12)] text-teal' },
                { name: 'Warfarin', generic: 'Warfarin Sodium', icon: <AlertCircle size={24} className="text-red" />, tag: 'Warning', tagColor: 'red', desc: 'Blood thinner (anticoagulant) used to prevent blood clots. Requires careful monitoring.', req: 'Prescription', reqColor: 'bg-[#FFF8E8] text-[#B87A00]' },
                { name: 'Amlodipine', generic: 'Amlodipine Besylate', icon: <Pill size={24} className="text-blue" />, tag: 'Antihypertensive', tagColor: 'blue', desc: 'Calcium channel blocker used to treat high blood pressure and chest pain (angina).', req: '✓ VERIFIED', reqColor: 'bg-[rgba(23,169,142,0.12)] text-teal' },
                { name: 'Vitamin D3', generic: 'Cholecalciferol', icon: <Circle size={24} className="text-amber-500" />, tag: 'Vitamin', tagColor: 'blue', desc: 'Essential vitamin for bone health, immune function, and calcium absorption. Safe for most.', req: '✓ VERIFIED', reqColor: 'bg-[rgba(23,169,142,0.12)] text-teal' },
                { name: 'Azithromycin', generic: 'Azithromycin Dihydrate', icon: <Syringe size={24} className="text-blue" />, tag: 'Antibiotic', tagColor: 'blue', desc: 'Macrolide antibiotic for respiratory, skin, and soft tissue infections. Short course treatment.', req: 'Prescription', reqColor: 'bg-[#FFF8E8] text-[#B87A00]' },
              ].map((med, i) => (
                <Link key={i} href={`/medicine/${med.name.toLowerCase()}`} className="no-underline text-current">
                  <div className="bg-white border border-light-gray rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex flex-col gap-3 h-full transition-all duration-200 hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)] hover:-translate-y-0.5">
                    <div className="flex justify-between items-start">
                      <div className="w-11 h-11 bg-blue-light rounded-xl flex items-center justify-center">{med.icon}</div>
                      <Badge variant={med.tagColor as "blue" | "teal" | "red" | "amber" | "hero" | "outline" | "default"}>{med.tag}</Badge>
                    </div>
                    <div>
                      <div className="font-plus-jakarta font-bold text-base text-near-black">{med.name}</div>
                      <div className="text-xs text-mid-gray mt-0.5">{med.generic}</div>
                    </div>
                    <div className="h-px bg-light-gray" />
                    <div className="text-[13px] text-dark-gray leading-[1.5] line-clamp-2">{med.desc}</div>
                    <div className="flex justify-between items-center mt-auto pt-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-[3px] rounded ${med.reqColor}`}>{med.req}</span>
                      <span className="text-blue text-[13px] font-semibold font-sans group-hover:underline">View Details →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex gap-1.5 justify-center mt-10 flex-wrap">
              <button className="px-3.5 h-10 border-[1.5px] border-light-gray bg-white rounded-lg text-sm font-semibold font-sans text-dark-gray cursor-pointer transition-colors hover:border-blue hover:text-blue">← Prev</button>
              <button className="w-10 h-10 border-[1.5px] border-blue bg-blue rounded-lg text-sm font-semibold font-sans text-white cursor-pointer">1</button>
              <button className="w-10 h-10 border-[1.5px] border-light-gray bg-white rounded-lg text-sm font-semibold font-sans text-dark-gray cursor-pointer transition-colors hover:border-blue hover:text-blue">2</button>
              <button className="hidden sm:inline-block w-10 h-10 border-[1.5px] border-light-gray bg-white rounded-lg text-sm font-semibold font-sans text-dark-gray cursor-pointer transition-colors hover:border-blue hover:text-blue">3</button>
              <button className="hidden sm:inline-block w-10 h-10 border-[1.5px] border-light-gray bg-white rounded-lg text-sm font-semibold font-sans text-dark-gray cursor-pointer transition-colors hover:border-blue hover:text-blue">...</button>
              <button className="w-10 h-10 border-[1.5px] border-light-gray bg-white rounded-lg text-sm font-semibold font-sans text-dark-gray cursor-pointer transition-colors hover:border-blue hover:text-blue">8</button>
              <button className="px-3.5 h-10 border-[1.5px] border-light-gray bg-white rounded-lg text-sm font-semibold font-sans text-dark-gray cursor-pointer transition-colors hover:border-blue hover:text-blue">Next →</button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
