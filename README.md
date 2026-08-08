# 🏥 MediInfo.LK — Sri Lanka's Verified Medical & Medicine Information Platform

![Next.js 16](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css)
![i18n Multilingual](https://img.shields.io/badge/i18n-EN%20%7C%20%E0%B6%BB%E0%B6%B0%E0%B6%B4%E0%B6%BD%20%7C%20%E0%AE%A4%E0%AE%AE%E0%AE%BF%E0%AE%B4%E0%AE%BF%E0%AE%A4%E0%AF%8D-17A98E?style=for-the-badge)
![Google Noto Sans Sinhala](https://img.shields.io/badge/Font-Noto_Sans_Sinhala-FF6B6B?style=for-the-badge)

**MediInfo.LK** is a Sri Lankan healthcare web application engineered to deliver verified, doctor-reviewed medicine details, safety precautions, and health guides to patients across Sri Lanka in **English**, **Sinhala (සිංහල)**, and **Tamil (தமிழ்)**.

---

## 🌟 Key Features

### 💊 1. Trilingual Medicine Information Hub
* **100% Comprehensive Medical Records**: Includes Brand Name, Active Generic Ingredient, Category, Form (Tablet, Syrup, Injection), Strength, Age Group recommendations, and Prescription requirements.
* **Structured Dosage Table**: Interactive age-bracket dosage recommendations (*Adults*, *Elderly*, *Children*, *Infants*).
* **3-Level Side Effects Classification**:
  * 🟢 **Common (Mild)** — Generally well-tolerated effects.
  * 🟡 **Less Common** — Skin rash or digestive discomfort.
  * 🔴 **Serious (Emergency)** — Liver toxicity, anaphylaxis, or dark urine warnings requiring immediate hospital care.
* **Dynamic Safety Warning Cards**: Customizable alerts for *Alcohol Caution*, *Liver Disease*, *Kidney Impairment*, *Pregnancy & Breastfeeding*, *Driving Safety*, and *Overdose Risk*.
* **Drug Interactions Tracker**: Highlights critical drug-to-drug contraindications (e.g. *Warfarin*, *Carbamazepine*, *Alcohol*).

### 🤖 2. Admin Management Panel (`/admin`)
* **Dedicated Top-Level Route**: Clean, English-only admin control center located under `/admin`.
* **3-Language Content Editor**: Tabbed input interface allowing admins to manually curate or auto-fill medicine records in English, Sinhala, and Tamil.
* **✨ 1-Click AI Auto-Translation Modal**: Built-in AI translation portal using `React.createPortal` to generate accurate Sinhala and Tamil medical terminology from English source text.
* **1-to-1 Live Preview Mode**: Real-time full-site replica mode letting admins inspect the exact public view before publishing.
* **Medicine Catalog & Prescription Tracking**: Catalog search table and prescription upload queue.

### 📰 3. Healthcare Articles Blog (`/blogs` & `/blogs/[slug]`)
* **Native Language Articles**: Health articles published in their default native language (**English**, **Sinhala**, or **Tamil**) with automatic `Noto Sans Sinhala` font rendering.
* **Interactive Language Filter Bar**: Instantly filter articles by language (**All Languages**, **English**, **සිංහල**, **தமிழ்**).
* **Doctor Verification Badges**: Verified practitioner badge (`✓ VERIFIED DR.`) guaranteeing medical accuracy.
* **Rich Article Layout**: Hero banner images, key takeaway callouts (`✨ Key Takeaway`), emergency warning signals, Blogger API tag compatibility, community comments, and social sharing tools.
* **Medical Professional Invitation**: Open callout widget inviting all government-approved healthcare professionals to contribute articles.

---

## 🎨 Design System & Aesthetics

MediInfo.LK is crafted following modern UI/UX design standards:
* **Primary Palette**: Deep Royal Blue (`#1A6FBF`), Healing Teal (`#17A98E`), Dark Slate Charcoal (`#1F2937`), Light Gray (`#E5E7EB`), and Soft Background Tint (`#F8FAFC`).
* **Typography**:
  * **Headings**: `Plus Jakarta Sans` (Google Fonts)
  * **Sinhala Content**: `Noto Sans Sinhala` (Google Fonts)
  * **Code / Strengths**: `JetBrains Mono`
* **Micro-Animations**: Glassmorphism, smooth tab transitions, and animated modal backdrops (`animate-fade-up`).

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router + Turbopack) |
| **Language** | TypeScript 5.0 |
| **Styling** | Tailwind CSS 3.4 + Vanilla CSS Variables |
| **Localization (i18n)** | `next-intl` (Middleware + JSON Message Bundles) |
| **Icons** | Lucide React |
| **Fonts** | `next/font/google` (`Noto_Sans_Sinhala`, `Plus_Jakarta_Sans`, `Inter`) |

---

## 📁 Directory Structure

```
MediInfo.LK/
├── messages/                   # i18n Localization Dictionaries
│   ├── en.json                 # English Translations
│   ├── si.json                 # Sinhala Translations
│   └── ta.json                 # Tamil Translations
├── public/                     # Static Assets & Cover Images
│   └── images/
│       └── blog/               # Blog Cover Banners
├── src/
│   ├── app/
│   │   ├── [locale]/           # Localized Public Route Group (/[locale])
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── search/         # Public Medicine Search Page
│   │   │   ├── medicine/[slug]/# Public 3-Language Medicine Detail Page
│   │   │   ├── blogs/          # Health Articles Catalog (with Language Filter)
│   │   │   │   └── [slug]/     # Article Detail Page
│   │   │   ├── login/          # Healthcare Professional Login
│   │   │   └── layout.tsx      # Root Localized Layout + Noto Sans Sinhala setup
│   │   ├── admin/              # Top-Level English Admin Panel (/admin)
│   │   │   ├── layout.tsx      # Admin Root Layout (<html>/<body>)
│   │   │   ├── page.tsx        # Admin Dashboard Home
│   │   │   ├── medicine/
│   │   │   │   ├── add/        # Add Medicine Form + AI Auto-Translate + Live Preview
│   │   │   │   └── list/       # Medicine Catalog Management Table
│   │   │   └── prescriptions/  # Uploaded Prescriptions Queue
│   │   └── globals.css         # Custom CSS Design Tokens & :lang(si) font rules
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminShell.tsx  # Admin Sidebar & Header Shell
│   │   │   ├── MedicineForm.tsx# Multi-Language Medicine Form Component
│   │   │   └── AITranslateModal.tsx # Portal AI Translation Overlay
│   │   ├── layout/             # Header & Footer Navigation
│   │   └── ui/                 # Badge, Button, SearchInput UI Primitives
│   ├── data/
│   │   └── medicinesData.ts    # Centralized Sample Medicines Dataset (3 Languages)
│   └── middleware.ts           # next-intl Middleware (Excludes /admin)
├── next.config.ts              # Next.js Config with next-intl Plugin
├── tailwind.config.js          # Tailwind Color Tokens & Keyframes
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/gavirubihan/MediInfo.lk.git
   cd MediInfo.LK
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   * **Public Website**: [http://localhost:3000/en](http://localhost:3000/en)
   * **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

### 🔐 Demo Test Credentials
Use the main public login page (`/login`) to access the system with these credentials:
* **👑 Super Admin**: `admin@mediinfo.lk` (Password: any)
* **🩺 Registered Doctor**: `doctor@mediinfo.lk` (Password: any)
* **💊 Medical Staff**: `staff@mediinfo.lk` (Password: any)
* **👤 Normal User**: Any other email (Redirects to homepage)

---

## 🧪 Verification & Production Build

To test TypeScript types and compile an optimized production bundle:

```bash
npm run build
```

---

## 📜 License

Distributed under the **MIT License**. Created with ❤️ for Sri Lankan Healthcare by **MediInfo.LK Team**.