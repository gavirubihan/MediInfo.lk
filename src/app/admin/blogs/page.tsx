'use client';

import React from 'react';
import { BookOpen, PlusCircle, Sparkles, FileText, Calendar, User, Eye, Edit3 } from 'lucide-react';
import Link from 'next/link';

export default function AdminBlogsPage() {
  const sampleBlogs = [
    {
      id: 'blog-01',
      title: 'Understanding Dengue Fever Symptoms & Home Care Guidelines in Sri Lanka',
      category: 'Public Health',
      author: 'Dr. Saman Perera',
      date: '2026-08-05',
      status: 'Published',
      languages: ['EN', 'SI', 'TA'],
    },
    {
      id: 'blog-02',
      title: 'Safe Paracetamol Dosage Rules for Infants and Children',
      category: 'Pediatric Care',
      author: 'Dr. Nimali Silva',
      date: '2026-08-02',
      status: 'Under Review',
      languages: ['EN', 'SI'],
    },
    {
      id: 'blog-03',
      title: 'Antibiotic Resistance: Why Completing Your Amoxicillin Course Matters',
      category: 'Pharmacology',
      author: 'Kavinda Bandara (Pharmacist)',
      date: '2026-07-28',
      status: 'Draft',
      languages: ['EN'],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-light-gray shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-plus-jakarta text-near-black tracking-tight m-0 flex items-center gap-2.5">
            <BookOpen className="text-blue" size={26} />
            <span>Medical Blogs & Health Articles</span>
          </h1>
          <p className="text-xs sm:text-sm text-mid-gray m-0 mt-0.5">
            Publish educational articles and multi-language health guides for Sri Lanka
          </p>
        </div>

        <Link href="/admin/blogs/write" className="px-5 py-2.5 bg-blue hover:bg-blue/90 text-white font-bold text-xs rounded-xl shadow-md shadow-blue/20 transition-all flex items-center gap-2 cursor-pointer no-underline">
          <PlusCircle size={16} />
          <span>Create New Blog Post</span>
        </Link>
      </div>

      {/* Blogs Table */}
      <div className="bg-white border border-light-gray rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead>
              <tr className="bg-off-white border-b border-light-gray text-mid-gray font-bold uppercase tracking-wider">
                <th className="py-3.5 px-6">Article Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Languages</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-gray/60">
              {sampleBlogs.map((b) => (
                <tr key={b.id} className="hover:bg-off-white/60 transition-colors">
                  <td className="py-4 px-6 font-bold text-near-black">{b.title}</td>
                  <td className="py-4 px-4 font-semibold text-blue">{b.category}</td>
                  <td className="py-4 px-4 font-medium text-dark-gray">{b.author}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-1">
                      {b.languages.map((l) => (
                        <span key={l} className="bg-blue-light text-blue text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue/15">
                          {l}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        b.status === 'Published'
                          ? 'bg-teal/10 text-teal border border-teal/20'
                          : b.status === 'Under Review'
                          ? 'bg-amber-500/10 text-amber-800 border border-amber-500/20'
                          : 'bg-light-gray text-mid-gray'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-mid-gray hover:text-blue hover:bg-off-white rounded-lg transition-colors cursor-pointer">
                        <Edit3 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
