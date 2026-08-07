import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Heart,
  Globe,
  ShieldCheck,
  Users,
  Stethoscope,
  BookOpen,
  Lightbulb,
  Target,
  Award,
  Code2,
  Mail,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const teamMembers = [
  {
    initials: 'MI',
    name: 'Matheesha Induwara',
    role: 'Full-Stack Developer & Project Lead',
    color: 'bg-blue',
    desc: 'Leads architecture, development, and overall vision of MediInfo.LK.',
  },
  {
    initials: 'PP',
    name: 'Pixel Pirates Team',
    role: 'Design & Development',
    color: 'bg-teal',
    desc: 'A passionate team of developers from Sabaragamuwa University of Sri Lanka.',
  },
];

const values = [
  {
    icon: <ShieldCheck size={24} className="text-blue" />,
    title: 'Accuracy First',
    desc: 'Every medicine entry is reviewed and verified by licensed healthcare professionals before going live.',
  },
  {
    icon: <Globe size={24} className="text-blue" />,
    title: 'Language Inclusion',
    desc: 'We believe in a Sri Lanka where every citizen can access health information in their mother tongue.',
  },
  {
    icon: <Heart size={24} className="text-blue" />,
    title: 'Community Care',
    desc: 'Built for Sri Lankan families — from rural villages to urban hospitals, our platform serves everyone.',
  },
  {
    icon: <Lightbulb size={24} className="text-blue" />,
    title: 'Innovation',
    desc: 'Harnessing AI and modern technology to make complex medical information simple and accessible.',
  },
  {
    icon: <Users size={24} className="text-blue" />,
    title: 'Doctor Partnership',
    desc: 'We collaborate with verified medical professionals to ensure our content is clinically sound.',
  },
  {
    icon: <BookOpen size={24} className="text-blue" />,
    title: 'Health Literacy',
    desc: 'Empowering Sri Lankans with the knowledge to ask better questions and make safer health choices.',
  },
];

const stats = [
  { value: '500+', label: 'Medicines Listed', icon: <Stethoscope size={20} className="text-blue" /> },
  { value: '3', label: 'Languages Supported', icon: <Globe size={20} className="text-teal" /> },
  { value: '100%', label: 'Doctor Verified', icon: <ShieldCheck size={20} className="text-blue" /> },
  { value: 'Free', label: 'For Everyone', icon: <Heart size={20} className="text-red" /> },
];

export default function AboutPage() {
  const t = useTranslations('AboutPage');

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-36 pb-20 before:content-[''] before:absolute before:-top-20 before:-right-30 before:w-[600px] before:h-[600px] before:bg-[radial-gradient(ellipse,rgba(232,243,252,0.9)_0%,transparent_70%)] before:pointer-events-none after:content-[''] after:absolute after:-bottom-10 after:-left-20 after:w-[400px] after:h-[400px] after:bg-[radial-gradient(ellipse,rgba(23,169,142,0.06)_0%,transparent_70%)] after:pointer-events-none">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center relative z-10">
          <div className="mb-5 flex justify-center">
            <Badge variant="hero">
              <Heart size={14} className="text-blue" /> {t('badge')}
            </Badge>
          </div>
          <h1 className="text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.1] font-plus-jakarta text-near-black mb-5 max-w-[760px] mx-auto">
            {t('heroTitle1')}{' '}
            <em className="not-italic text-blue">{t('heroTitle2')}</em>{' '}
            {t('heroTitle3')}
          </h1>
          <p className="text-[17px] leading-[1.7] text-dark-gray mb-9 max-w-[600px] mx-auto">
            {t('heroDesc')}
          </p>
          <div className="flex gap-3.5 flex-wrap justify-center">
            <Link href="/search" className="no-underline">
              <Button variant="primary">{t('heroCta1')}</Button>
            </Link>
            <Link href="/blogs" className="no-underline">
              <Button variant="secondary">{t('heroCta2')}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 text-center shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-light-gray transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="w-12 h-12 bg-blue-light rounded-xl flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="text-[32px] font-extrabold font-plus-jakarta text-near-black leading-none">
                  {stat.value}
                </div>
                <div className="text-[13px] font-semibold text-mid-gray uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Story */}
            <div>
              <div className="mb-4">
                <Badge variant="blue">
                  <Target size={12} /> {t('missionBadge')}
                </Badge>
              </div>
              <h2 className="text-[clamp(28px,3.5vw,40px)] font-bold leading-[1.2] font-plus-jakarta text-near-black mb-5">
                {t('missionTitle')}
              </h2>
              <p className="text-[16px] leading-[1.8] text-dark-gray mb-5">
                {t('missionP1')}
              </p>
              <p className="text-[16px] leading-[1.8] text-dark-gray mb-5">
                {t('missionP2')}
              </p>
              <p className="text-[16px] leading-[1.8] text-dark-gray">
                {t('missionP3')}
              </p>
            </div>

            {/* Right: Visual card */}
            <div className="relative flex items-center justify-center min-h-[400px]">
              {/* Background glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,243,252,0.8)_0%,transparent_70%)] rounded-3xl" />

              {/* Main card */}
              <div className="relative z-10 bg-white rounded-3xl border border-light-gray shadow-[0_24px_80px_rgba(26,111,191,0.15)] p-8 w-full max-w-[360px]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue rounded-2xl flex items-center justify-center shadow-[0_4px_16px_rgba(26,111,191,0.3)]">
                    <Code2 size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-plus-jakarta font-bold text-near-black text-[17px]">Pixel Pirates</div>
                    <div className="text-[12px] text-mid-gray">Sabaragamuwa University of Sri Lanka</div>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {[
                    { label: 'Platform Type', value: 'Health Information' },
                    { label: 'Year Founded', value: '2025' },
                    { label: 'Languages', value: 'EN · සි · த' },
                    { label: 'Target Region', value: 'Sri Lanka 🇱🇰' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center text-sm border-b border-light-gray pb-3">
                      <span className="text-mid-gray font-medium">{item.label}</span>
                      <span className="font-semibold text-near-black font-jetbrains">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-blue-light rounded-xl p-4 flex items-center gap-3">
                  <ShieldCheck size={20} className="text-teal shrink-0" />
                  <span className="text-[13px] font-semibold text-near-black">
                    All content medically reviewed &amp; verified
                  </span>
                </div>
              </div>

              {/* Floating accent card */}
              <div className="hidden md:flex absolute -top-4 -right-6 bg-white rounded-xl py-3 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-light-gray items-center gap-2.5 text-[13px] font-semibold text-near-black whitespace-nowrap z-20 animate-float">
                <div className="w-8 h-8 rounded-lg bg-[rgba(23,169,142,0.12)] flex items-center justify-center">
                  <Award size={16} className="text-teal" />
                </div>
                <div>
                  <div className="text-[11px] text-mid-gray font-normal">Commitment</div>
                  Free Forever
                </div>
              </div>

              {/* Floating bottom card */}
              <div className="hidden md:flex absolute -bottom-4 -left-6 bg-white rounded-xl py-3 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-light-gray items-center gap-2.5 text-[13px] font-semibold text-near-black whitespace-nowrap z-20 animate-float-delay-1">
                <div className="w-8 h-8 rounded-lg bg-blue-light flex items-center justify-center">
                  <MapPin size={16} className="text-blue" />
                </div>
                <div>
                  <div className="text-[11px] text-mid-gray font-normal">Based in</div>
                  Sri Lanka 🇱🇰
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <Badge variant="blue" className="mb-4">
              <Heart size={12} /> {t('valuesBadge')}
            </Badge>
            <h2 className="text-[clamp(26px,3vw,36px)] font-bold leading-[1.25] font-plus-jakarta text-near-black mt-4">
              {t('valuesTitle')}
            </h2>
            <p className="text-mid-gray mt-3 max-w-[520px] mx-auto text-[15px]">
              {t('valuesSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <div
                key={i}
                className="bg-blue-light rounded-2xl p-7 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="w-[52px] h-[52px] bg-white rounded-[14px] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                  {val.icon}
                </div>
                <h4 className="text-[17px] font-semibold font-plus-jakarta text-near-black">
                  {val.title}
                </h4>
                <p className="text-[15px] text-dark-gray">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <Badge variant="blue" className="mb-4">
              <Users size={12} /> {t('teamBadge')}
            </Badge>
            <h2 className="text-[clamp(26px,3vw,36px)] font-bold leading-[1.25] font-plus-jakarta text-near-black mt-4">
              {t('teamTitle')}
            </h2>
            <p className="text-mid-gray mt-3 max-w-[520px] mx-auto text-[15px]">
              {t('teamSubtitle')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-[760px] mx-auto">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="flex-1 bg-white border border-light-gray rounded-2xl p-7 flex flex-col gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-lg hover:-translate-y-1 text-center items-center"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0 ${member.color} shadow-[0_4px_16px_rgba(26,111,191,0.25)]`}
                >
                  {member.initials}
                </div>
                <div>
                  <div className="font-plus-jakarta font-bold text-near-black text-[17px] mb-1">
                    {member.name}
                  </div>
                  <div className="text-[13px] font-semibold text-blue mb-3">{member.role}</div>
                  <p className="text-[14px] text-dark-gray leading-[1.6]">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Get in Touch */}
      <section className="py-20 bg-off-white">
        <div className="max-w-[720px] mx-auto px-6 md:px-12 text-center">
          <Badge variant="blue" className="mb-4">
            <Mail size={12} /> {t('contactBadge')}
          </Badge>
          <h2 className="text-[clamp(26px,3vw,36px)] font-bold leading-[1.25] font-plus-jakarta text-near-black mt-4 mb-4">
            {t('contactTitle')}
          </h2>
          <p className="text-[16px] text-dark-gray leading-[1.7] mb-8 max-w-[560px] mx-auto">
            {t('contactDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:contact@mediinfo.lk"
              className="flex items-center gap-2.5 bg-white border border-light-gray rounded-xl px-5 py-3.5 text-[14px] font-semibold text-near-black hover:border-blue hover:shadow-[0_4px_16px_rgba(26,111,191,0.15)] transition-all duration-200 no-underline"
            >
              <Mail size={18} className="text-blue" />
              contact@mediinfo.lk
            </a>
            <a
              href="https://sab.ac.lk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-white border border-light-gray rounded-xl px-5 py-3.5 text-[14px] font-semibold text-near-black hover:border-blue hover:shadow-[0_4px_16px_rgba(26,111,191,0.15)] transition-all duration-200 no-underline"
            >
              <MapPin size={18} className="text-teal" />
              Sabaragamuwa University, Sri Lanka
            </a>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <div className="bg-gradient-to-br from-blue to-blue-dark py-20 text-center relative overflow-hidden before:content-[''] before:absolute before:-top-[40%] before:-right-[10%] before:w-[400px] before:h-[400px] before:bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-[clamp(24px,3vw,34px)] font-bold leading-[1.25] font-plus-jakarta text-white mb-2">
            {t('ctaTitle')}
          </h2>
          <p className="text-[17px] text-white/80">{t('ctaSubtitle')}</p>
          <div className="flex gap-3.5 justify-center flex-wrap mt-8">
            <Link href="/search" className="no-underline">
              <Button variant="white">{t('ctaBtn1')}</Button>
            </Link>
            <Link href="/blogs" className="no-underline">
              <Button variant="outline-white">
                {t('ctaBtn2')} <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
