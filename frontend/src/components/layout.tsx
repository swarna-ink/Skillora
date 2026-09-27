// frontend/src/app/layout.tsx
// Global Layout File
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Skillora | Royal Job Board',
  description: 'Find your next career opportunity in IT',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0D1117] text-slate-100 min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow max-w-6xl w-full mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  );
}