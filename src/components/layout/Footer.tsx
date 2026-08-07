import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Heart } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-near-black text-white/75 pt-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12">
          
          <div>
            <div className="font-plus-jakarta font-bold text-xl text-white mb-3">
              MediInfo<span className="text-teal">.LK</span>
            </div>
            <p className="text-[14px] leading-[1.6] mb-5">
              Medicine for everyone — clear, trusted, local. Helping Sri Lankan families understand their medicines safely.
            </p>
            <div className="flex gap-2.5">
              <button className="w-9 h-9 rounded-lg bg-white/10 border-none text-white cursor-pointer flex items-center justify-center transition-colors hover:bg-blue"><FaTwitter size={16} /></button>
              <button className="w-9 h-9 rounded-lg bg-white/10 border-none text-white cursor-pointer flex items-center justify-center transition-colors hover:bg-blue"><FaFacebook size={16} /></button>
              <button className="w-9 h-9 rounded-lg bg-white/10 border-none text-white cursor-pointer flex items-center justify-center transition-colors hover:bg-blue"><FaLinkedin size={16} /></button>
              <button className="w-9 h-9 rounded-lg bg-white/10 border-none text-white cursor-pointer flex items-center justify-center transition-colors hover:bg-blue"><FaYoutube size={16} /></button>
            </div>
          </div>

          <div>
            <div className="font-plus-jakarta font-bold text-sm text-white mb-4 uppercase tracking-[0.5px]">Quick Links</div>
            <ul className="list-none flex flex-col gap-2.5 p-0 m-0">
              <li><Link href="/" className="text-white/65 no-underline text-sm transition-colors hover:text-white">Home</Link></li>
              <li><Link href="/search" className="text-white/65 no-underline text-sm transition-colors hover:text-white">Search Medicines</Link></li>
              <li><Link href="/blogs" className="text-white/65 no-underline text-sm transition-colors hover:text-white">Health Blogs</Link></li>
              <li><Link href="/about" className="text-white/65 no-underline text-sm transition-colors hover:text-white">About Us</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-plus-jakarta font-bold text-sm text-white mb-4 uppercase tracking-[0.5px]">Support</div>
            <ul className="list-none flex flex-col gap-2.5 p-0 m-0">
              <li><Link href="#" className="text-white/65 no-underline text-sm transition-colors hover:text-white">FAQ</Link></li>
              <li><Link href="#" className="text-white/65 no-underline text-sm transition-colors hover:text-white">Contact Us</Link></li>
              <li><Link href="#" className="text-white/65 no-underline text-sm transition-colors hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="text-white/65 no-underline text-sm transition-colors hover:text-white">Terms of Use</Link></li>
              <li><Link href="#" className="text-white/65 no-underline text-sm transition-colors hover:text-white">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-plus-jakarta font-bold text-sm text-white mb-4 uppercase tracking-[0.5px]">Stay Updated</div>
            <div className="mb-5">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-3.5 py-2.5 border border-white/15 rounded-lg bg-white/10 text-white text-sm font-sans mb-2.5 outline-none transition-colors placeholder:text-white/40 focus:border-blue"
              />
              <Button variant="primary" className="w-full justify-center text-sm min-h-[42px]">
                Subscribe →
              </Button>
            </div>
            
            <div className="mt-5">
              <div className="font-plus-jakarta font-bold text-sm text-white mb-2.5 uppercase tracking-[0.5px]">Language</div>
              <div className="flex bg-white/10 rounded-full p-[3px] gap-[2px] w-fit">
                <button className="px-3 py-1.5 bg-blue text-white border-none rounded-[17px] text-[13px] font-semibold">EN</button>
                <button className="px-3 py-1.5 bg-transparent text-white/70 border-none cursor-pointer rounded-[17px] text-[13px] font-semibold transition-colors hover:text-white">සිංහල</button>
                <button className="px-3 py-1.5 bg-transparent text-white/70 border-none cursor-pointer rounded-[17px] text-[13px] font-semibold transition-colors hover:text-white">தமிழ்</button>
              </div>
            </div>
          </div>

        </div>
        
        <div className="mt-12 py-5 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-[13px] text-white/45">
          <span>© 2025 MediInfo.LK — Pixel Pirates, Sabaragamuwa University</span>
          <span className="flex items-center gap-1.5">Made with <Heart size={14} className="text-red" fill="currentColor" /> for Sri Lanka</span>
        </div>
      </div>
    </footer>
  );
};
