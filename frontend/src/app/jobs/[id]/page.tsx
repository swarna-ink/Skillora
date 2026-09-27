// frontend/src/app/jobs/[id]/page.tsx
// সিঙ্গেল জব ডিটেইলস পেজ
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Job } from '@/types';

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/jobs/${id}`)
        .then((res) => res.json())
        .then((data) => setJob(data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicantName, applicantEmail, resumeLink, coverLetter }),
      });
      if (res.ok) {
        setMessage('Application submitted successfully!');
        setApplicantName('');
        setApplicantEmail('');
        setResumeLink('');
        setCoverLetter('');
      }
    } catch (err) {
      console.error(err);
      setMessage('Failed to submit application.');
    }
  };

  if (!job) return <p className="text-gray-400">Loading details...</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-[#1c2541] p-6 rounded-xl border border-[#3a506b] space-y-4">
        <h1 className="text-2xl font-bold text-white">{job.title}</h1>
        <p className="text-[#48cae4] font-semibold">{job.companyName} — {job.location}</p>
        <div className="flex gap-2">
          <span className="text-xs bg-[#0b132b] border border-[#3a506b] px-3 py-1 rounded text-gray-300">
            {job.jobType}
          </span>
          <span className="text-xs bg-[#0b132b] border border-[#3a506b] px-3 py-1 rounded text-gray-300">
            Category: {job.category?.name}
          </span>
        </div>
        <hr className="border-[#3a506b]" />
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">Description</h2>
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">{job.description}</p>
        </div>
      </div>

      <div className="bg-[#1c2541] p-6 rounded-xl border border-[#3a506b] h-fit space-y-4">
        <h2 className="text-xl font-bold text-white">Apply for this position</h2>

        {message && <p className="text-sm p-2 bg-[#0b132b] text-[#48cae4] border border-[#3a506b] rounded">{message}</p>}

        <form onSubmit={handleApply} className="space-y-3">
          <div>
            <label className="block text-xs text-gray-300 mb-1">Your Name</label>
            <input
              type="text"
              required
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              className="w-full p-2.5 bg-[#0b132b] border border-[#3a506b] rounded text-white focus:outline-none focus:border-[#48cae4]"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={applicantEmail}
              onChange={(e) => setApplicantEmail(e.target.value)}
              className="w-full p-2.5 bg-[#0b132b] border border-[#3a506b] rounded text-white focus:outline-none focus:border-[#48cae4]"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-300 mb-1">Resume Link</label>
            <input
              type="url"
              required
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
              className="w-full p-2.5 bg-[#0b132b] border border-[#3a506b] rounded text-white focus:outline-none focus:border-[#48cae4]"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-300 mb-1">Cover Letter</label>
            <textarea
              rows={3}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full p-2.5 bg-[#0b132b] border border-[#3a506b] rounded text-white focus:outline-none focus:border-[#48cae4]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#48cae4] text-[#0b132b] font-bold py-2.5 rounded hover:bg-[#90e0ef] transition-all"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}