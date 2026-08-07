import type Metadata from "next";
import { Plus_Jakarta_Sans, Nunito, JetBrains_Mono, Noto_Sans_Sinhala } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const notoSansSinhala = Noto_Sans_Sinhala({
  variable: "--font-noto-sans-sinhala",
  subsets: ["sinhala"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MediInfo.LK — Trusted Medicine Information",
  description: "Search medicine information, upload prescriptions, and read trusted health articles — in Sinhala, Tamil, and English.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${plusJakartaSans.variable} ${nunito.variable} ${jetBrainsMono.variable} ${notoSansSinhala.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
