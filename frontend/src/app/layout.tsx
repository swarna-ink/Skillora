// frontend/src/app/layout.tsx
// সম্পূর্ণ ইন্টারেক্টিভ হেড সহ লেআউট
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skillora - Job Board & Planner",
  description: "Browse top tech positions in Bangladesh and apply with one click",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#090d16] text-[#e2e8f0] min-h-screen flex flex-col font-sans antialiased">
        {/* Navigation Bar */}
        <header className="bg-[#0f172a]/90 backdrop-blur-md border-b border-[#1e293b] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#38bdf8] to-[#0284c7] text-[#090d16] font-black flex items-center justify-center rounded-xl text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-none">
                  Skill<span className="text-[#38bdf8]">ora</span>
                </span>
                <span className="text-[10px] tracking-widest text-[#64748b] font-semibold uppercase mt-0.5">
                  JOB BOARD & PLANNER
                </span>
              </div>
            </Link>

            {/* Navigation Menu */}
            <nav className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-[#1e293b] transition-all"
              >
                <span>🌐</span> Jobs
              </Link>
              <Link
                href="/create-job"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-[#0284c7] hover:bg-[#38bdf8] text-white hover:text-[#090d16] transition-all shadow-md shadow-sky-900/30 active:scale-95"
              >
                <span>➕</span> Post a Job
              </Link>
            </nav>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-[#0f172a] border-t border-[#1e293b] py-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Skillora Job Board. All rights reserved.
        </footer>
      </body>
    </html>
  );
}