import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Nunito, JetBrains_Mono, Noto_Sans_Sinhala } from "next/font/google";
import "../globals.css";
import { AdminShell } from "@/components/admin/AdminShell";

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
  title: "MediInfo Admin Panel — Medicine Management",
  description: "Admin panel to add and manage localized medicine records.",
};

import { AdminRoleProvider } from "@/components/admin/AdminRoleContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${nunito.variable} ${jetBrainsMono.variable} ${notoSansSinhala.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F4F7FA]">
        <AdminRoleProvider>
          <AdminShell>{children}</AdminShell>
        </AdminRoleProvider>
      </body>
    </html>
  );
}
