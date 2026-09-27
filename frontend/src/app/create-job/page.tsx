// frontend/src/app/create-job/page.tsx
// নতুন জব ক্রিয়েট করার পেজ
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/types';

export default function CreateJobPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [salary, setSalary] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const [newCatName, setNewCatName] = useState('');

  const loadCategories = async () => {
    const res = await fetch('http://localhost:5000/api/categories');
    const data = await res.json();
    setCategories(data);
    if (data.length > 0) setCategory(data[0]._id);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    await fetch('http://localhost:5000/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCatName }),
    });
    setNewCatName('');
    loadCategories();
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        companyName,
        location,
        jobType,
        salary,
        category,
        description,
      }),
    });

    if (res.ok) {
      router.push('/');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-[#1c2541] p-6 rounded-xl border border-[#3a506b]">
        <h2 className="text-lg font-bold text-white mb-3">Add New Category</h2>
        <form onSubmit={handleAddCategory} className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. Web Development"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="flex-grow p-2.5 bg-[#0b132b] border border-[#3a506b] rounded text-white focus:outline-none"
          />
          <button type="submit" className="bg-[#023e8a] hover:bg-[#0077b6] text-white font-medium px-4 py-2.5 rounded">
            Add
          </button>
        </form>
      </div>

      <form onSubmit={handleJobSubmit} className="bg-[#1c2541] p-6 rounded-xl border border-[#3a506b] space-y-4">
        <h1 className="text-2xl font-bold text-white">Post a New Job</h1>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Job Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 bg-[#0b132b] border border-[#3a506b] rounded text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Company Name</label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2.5 bg-[#0b132b] border border-[#3a506b] rounded text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Location</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 bg-[#0b132b] border border-[#3a506b] rounded text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Job Type</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full p-2.5 bg-[#0b132b] border border-[#3a506b] rounded text-white"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 bg-[#0b132b] border border-[#3a506b] rounded text-white"
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-[#e0e1dd] mb-1">Salary Range</label>
            <input
              type="text"
              placeholder="$500 - $1000/mo"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full p-2.5 bg-[#0b132b] border border-[#3a506b] rounded text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Job Description</label>
          <textarea
            rows={5}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2.5 bg-[#0b132b] border border-[#3a506b] rounded text-white"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#48cae4] text-[#0b132b] font-bold py-3 rounded hover:bg-[#90e0ef] transition-all"
        >
          Publish Job
        </button>
      </form>
    </div>
  );
}