// frontend/src/app/page.tsx
// সম্পূর্ণ ইন্টারেক্টিভ মডাল, ফিল্টারিং ও ডায়নামিক ফিচার সহ হোম পেজ
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Job, Category } from '@/types';

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  // Modals States for Preview-like Interactivity
  const [activeJobModal, setActiveJobModal] = useState<Job | null>(null);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [showSchemaModal, setShowSchemaModal] = useState(false);

  // Application Form States in Modal
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      let query = `http://localhost:5000/api/jobs?search=${search}`;
      if (selectedCategory) {
        query += `&category=${selectedCategory}`;
      }
      const res = await fetch(query);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJobModal) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${activeJobModal._id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicantName, applicantEmail, resumeLink, coverLetter }),
      });
      if (res.ok) {
        setApplySuccess(true);
        setApplicantName('');
        setApplicantEmail('');
        setResumeLink('');
        setCoverLetter('');
        setTimeout(() => setApplySuccess(false), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 relative">
      
      {/* Top Interactive Feature Quick-Bar */}
      <div className="flex flex-wrap justify-end gap-3 text-xs font-semibold">
        <button
          onClick={() => setShowCategoriesModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f172a] border border-[#1e293b] hover:border-[#38bdf8]/50 text-slate-300 hover:text-white transition-all shadow-sm"
        >
          <span>🏷️</span> All Categories ({categories.length})
        </button>
        <button
          onClick={() => setShowSchemaModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f172a] border border-[#1e293b] hover:border-[#38bdf8]/50 text-slate-300 hover:text-white transition-all shadow-sm"
        >
          <span>📊</span> Mongo DB Schema
        </button>
      </div>

      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-b from-[#1e293b]/60 to-[#0f172a]/80 p-8 sm:p-10 rounded-2xl border border-[#334155]/60 text-center space-y-5 shadow-2xl backdrop-blur-xl max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-medium">
          <span>✨</span> Next-Gen Career Portal
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Find Your Dream IT Job with <span className="text-[#38bdf8]">Skillora</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Browse top tech positions in Bangladesh, apply with one click, and manage developer jobs efficiently.
        </p>

        {/* Search Bar & Filter Form */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto pt-2">
          <div className="relative flex-grow">
            <span className="absolute left-4 top-3.5 text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search job title or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0f172a]/90 border border-[#334155] rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#38bdf8] transition-all"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-[#0f172a]/90 border border-[#334155] rounded-xl text-white text-sm focus:outline-none focus:border-[#38bdf8] transition-all min-w-[160px]"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-[#0284c7] hover:bg-[#38bdf8] text-white hover:text-[#090d16] font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-sky-900/20 active:scale-95"
          >
            Search
          </button>
        </form>
      </section>

      {/* Available Positions Heading */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-white tracking-wide">Available Positions</h2>
          <span className="bg-[#0284c7]/20 text-[#38bdf8] border border-[#0284c7]/30 text-xs px-2.5 py-0.5 rounded-full font-semibold">
            {jobs.length}
          </span>
        </div>

        {loading ? (
          <p className="text-slate-400 text-sm animate-pulse">Loading positions from database...</p>
        ) : jobs.length === 0 ? (
          <div className="bg-[#0f172a]/80 p-8 rounded-xl border border-[#1e293b] text-center text-slate-400 text-sm">
            No jobs found matching your criteria. Try posting a new job from the navbar!
          </div>
        ) : (
          /* Job Cards Grid */
          <div className="grid md:grid-cols-2 gap-5">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-[#0f172a]/70 p-6 rounded-xl border border-[#1e293b] hover:border-[#38bdf8]/50 transition-all flex flex-col justify-between group space-y-4 hover:shadow-xl hover:shadow-cyan-950/20"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                      {job.title}
                    </h3>
                    <span className="text-[11px] bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 px-2.5 py-1 rounded-md font-medium whitespace-nowrap">
                      {job.category?.name || 'General'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                    🏢 <span>{job.companyName}</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">📍 {job.location}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">💼 {job.jobType}</span>
                    {job.salary && (
                      <>
                        <span>•</span>
                        <span className="text-[#38bdf8] font-medium">💰 {job.salary}</span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1e293b] flex justify-between items-center text-xs text-slate-500">
                  <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                  
                  {/* Interactive Modal Launcher Button */}
                  <button
                    onClick={() => setActiveJobModal(job)}
                    className="bg-[#0284c7] hover:bg-[#38bdf8] text-white hover:text-[#090d16] px-4 py-2 rounded-lg font-medium transition-all shadow-sm active:scale-95 flex items-center gap-1"
                  >
                    View Details &gt;
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==================== INTERACTIVE MODALS ==================== */}

      {/* 1. Job Details & Application Modal */}
      {activeJobModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-[#334155] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveJobModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-[#1e293b] p-2 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
            >
              ✕
            </button>

            <div className="space-y-3">
              <span className="text-xs bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 px-3 py-1 rounded-md font-semibold">
                {activeJobModal.category?.name || 'General'}
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">{activeJobModal.title}</h2>
              <p className="text-sm text-slate-300 font-medium">🏢 {activeJobModal.companyName} — 📍 {activeJobModal.location}</p>
              
              <div className="flex flex-wrap gap-2 text-xs text-slate-400 pt-1">
                <span className="bg-[#1e293b] px-3 py-1 rounded-md border border-[#334155]">💼 {activeJobModal.jobType}</span>
                {activeJobModal.salary && (
                  <span className="bg-[#1e293b] text-[#38bdf8] px-3 py-1 rounded-md border border-[#334155]">💰 {activeJobModal.salary}</span>
                )}
              </div>
            </div>

            <hr className="border-[#1e293b]" />

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white">Job Description</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {activeJobModal.description}
              </p>
            </div>

            <hr className="border-[#1e293b]" />

            {/* Application Form */}
            <form onSubmit={handleApplySubmit} className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>📝</span> Apply for this Position
              </h3>

              {applySuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-lg font-medium">
                  ✅ Application submitted successfully to backend database!
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full p-2.5 bg-[#090d16] border border-[#334155] rounded-lg text-white text-xs focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full p-2.5 bg-[#090d16] border border-[#334155] rounded-lg text-white text-xs focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Resume / Portfolio Link</label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/yourprofile or Google Drive link"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                  className="w-full p-2.5 bg-[#090d16] border border-[#334155] rounded-lg text-white text-xs focus:outline-none focus:border-[#38bdf8]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Cover Note / Remarks</label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe why you are a good fit for this role..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full p-2.5 bg-[#090d16] border border-[#334155] rounded-lg text-white text-xs focus:outline-none focus:border-[#38bdf8]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#090d16] font-bold py-3 rounded-lg text-xs transition-all shadow-md active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application Now'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Categories Modal */}
      {showCategoriesModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-[#334155] rounded-2xl max-w-md w-full p-6 space-y-4 relative shadow-2xl">
            <button
              onClick={() => setShowCategoriesModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-[#1e293b] p-2 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🏷️</span> Active Job Categories
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  onClick={() => {
                    setSelectedCategory(cat._id);
                    setShowCategoriesModal(false);
                  }}
                  className="p-3 bg-[#090d16] border border-[#1e293b] hover:border-[#38bdf8] rounded-lg flex justify-between items-center cursor-pointer transition-all"
                >
                  <span className="text-xs font-semibold text-white">{cat.name}</span>
                  <span className="text-[10px] text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded">Filter Jobs</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. MongoDB Schema Modal (As shown in original preview) */}
      {showSchemaModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-[#334155] rounded-2xl max-w-xl w-full p-6 space-y-4 relative shadow-2xl">
            <button
              onClick={() => setShowSchemaModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-[#1e293b] p-2 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📊</span> MongoDB Collections & Relationships
            </h3>
            <div className="bg-[#090d16] p-4 rounded-xl border border-[#1e293b] text-xs font-mono text-slate-300 space-y-3 overflow-x-auto">
              <div>
                <span className="text-[#38bdf8] font-bold">1. Category Collection:</span>
                <p className="text-slate-400 pl-3">{`{ _id, name: String, description: String }`}</p>
              </div>
              <div>
                <span className="text-[#38bdf8] font-bold">2. Job Collection (Ref: Category):</span>
                <p className="text-slate-400 pl-3">{`{ _id, title, companyName, category: ObjectId('Ref: Category'), ... }`}</p>
              </div>
              <div>
                <span className="text-[#38bdf8] font-bold">3. Application Collection (Ref: Job):</span>
                <p className="text-slate-400 pl-3">{`{ _id, job: ObjectId('Ref: Job'), applicantName, resumeLink }`}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}