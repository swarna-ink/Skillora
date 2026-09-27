// frontend/src/app/jobs/create/page.tsx
// নতুন জব পোস্ট ফরম পেজ
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateJob() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salaryRange: '',
    category: '',
    description: '',
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [API_URL]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Job posted successfully!');
      router.push('/');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#161B22] p-8 rounded-2xl border border-slate-800">
      <h2 className="text-2xl font-bold text-white mb-6">Create a New Job Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-slate-300 mb-1 text-sm">Job Title</label>
          <input
            required
            className="w-full bg-[#0D1117] border border-slate-700 rounded-lg p-3 text-white"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 mb-1 text-sm">Company Name</label>
            <input
              required
              className="w-full bg-[#0D1117] border border-slate-700 rounded-lg p-3 text-white"
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-1 text-sm">Location</label>
            <input
              required
              className="w-full bg-[#0D1117] border border-slate-700 rounded-lg p-3 text-white"
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 mb-1 text-sm">Salary Range</label>
            <input
              placeholder="e.g. $500 - $800 / month"
              className="w-full bg-[#0D1117] border border-slate-700 rounded-lg p-3 text-white"
              onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-1 text-sm">Category</label>
            <select
              required
              className="w-full bg-[#0D1117] border border-slate-700 rounded-lg p-3 text-white"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map((cat: any) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-slate-300 mb-1 text-sm">Job Description</label>
          <textarea
            required
            rows={4}
            className="w-full bg-[#0D1117] border border-slate-700 rounded-lg p-3 text-white"
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Publish Job
        </button>
      </form>
    </div>
  );
}