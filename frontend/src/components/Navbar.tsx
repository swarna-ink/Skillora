// frontend/src/components/Navbar.tsx
// Royal Dark Theme সম্বলিত হেডার এবং Skillora লোগো Component
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#161B22] border-b border-slate-800 text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Skillora Brand Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/30">
            S
          </div>
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
            Skillora
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-slate-300 hover:text-blue-400 transition">
            Browse Jobs
          </Link>
          <Link
            href="/jobs/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-md shadow-blue-600/20"
          >
            + Post a Job
          </Link>
        </div>
      </div>
    </nav>
  );
}