'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Image as ImageIcon,
  Tag,
  FolderTree,
  Globe2
} from 'lucide-react';
import { RichTextEditor } from '@/components/admin/RichTextEditor';

export default function WriteBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('en');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const handleSaveDraft = () => {
    // Logic to save as draft using Blogger API or internal state
    alert('Draft saved locally! (API Integration Pending)');
  };

  const handlePublish = () => {
    // Logic to publish using Blogger API
    if (!title || !content) {
      alert('Please provide a title and content before publishing.');
      return;
    }
    alert('Published successfully! (API Integration Pending)');
  };

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/blogs"
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white hover:bg-off-white text-dark-gray border border-light-gray transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-extrabold font-plus-jakarta text-near-black tracking-tight m-0">Write New Article</h1>
            <p className="text-xs text-mid-gray m-0 mt-0.5">Draft or publish educational health content</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleSaveDraft}
            className="px-4 py-2 bg-white hover:bg-off-white text-dark-gray font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 border border-light-gray"
          >
            <Save size={14} />
            <span>Save Draft</span>
          </button>
          <button 
            onClick={handlePublish}
            className="px-4 py-2 bg-blue hover:bg-blue/90 text-white font-bold text-xs rounded-xl shadow-sm shadow-blue/20 transition-all flex items-center gap-1.5"
          >
            <Send size={14} />
            <span>Publish</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Editor Canvas (Left) */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-light-gray/60 rounded-2xl flex flex-col min-h-[550px]">
            {/* Title Input */}
            <div className="p-5 border-b border-light-gray/60">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article Title..."
                className="w-full text-2xl font-extrabold font-plus-jakarta text-near-black placeholder:text-light-gray outline-none bg-transparent"
              />
            </div>
            
            {/* Rich Text Editor */}
            <div className="flex-1 flex flex-col">
              <RichTextEditor content={content} onChange={setContent} />
            </div>
          </div>
        </div>

        {/* Metadata Sidebar (Right) */}
        <div>
          <div className="bg-white border border-light-gray/60 rounded-2xl p-5 space-y-4 sticky top-24">
            <h3 className="text-xs font-bold text-near-black font-plus-jakarta m-0 border-b border-light-gray pb-3">
              Publishing Settings
            </h3>

            {/* Language */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-dark-gray flex items-center gap-2">
                <Globe2 size={16} className="text-blue" />
                Language
              </label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-light-gray text-xs font-bold text-dark-gray focus:border-blue outline-none bg-off-white"
              >
                <option value="en">English (Default)</option>
                <option value="si">Sinhala (සිංහල)</option>
                <option value="ta">Tamil (தமிழ்)</option>
              </select>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-dark-gray flex items-center gap-2">
                <FolderTree size={16} className="text-teal" />
                Category
              </label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-light-gray text-xs font-bold text-dark-gray focus:border-teal outline-none bg-off-white"
              >
                <option value="">Select Category...</option>
                <option value="nutrition">Nutrition & Diet</option>
                <option value="mental_health">Mental Health</option>
                <option value="disease_prevention">Disease Prevention</option>
                <option value="child_care">Child Care</option>
                <option value="fitness">Fitness & Exercise</option>
              </select>
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-dark-gray flex items-center gap-2">
                <ImageIcon size={16} className="text-amber-500" />
                Cover Image URL
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full h-11 px-3.5 rounded-xl border border-light-gray text-xs font-jetbrains text-mid-gray focus:border-amber-500 outline-none bg-off-white"
              />
              {coverImage && (
                <div className="mt-3 rounded-xl overflow-hidden border border-light-gray">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coverImage} alt="Cover Preview" className="w-full h-32 object-cover" />
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-dark-gray flex items-center gap-2">
                <Tag size={16} className="text-red" />
                Tags (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="e.g. healthy, heart, diet"
                className="w-full h-11 px-3.5 rounded-xl border border-light-gray text-xs text-dark-gray focus:border-red outline-none bg-off-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
