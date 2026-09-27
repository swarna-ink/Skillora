// frontend/src/components/JobCard.tsx
// জব কার্ডের UI উপাদান
import Link from 'next/link';

interface JobProps {
  _id: string;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  category: { name: string };
}

export default function JobCard({ job }: { job: JobProps }) {
  return (
    <div className="bg-[#1E2640] border border-slate-700/60 rounded-xl p-5 hover:border-blue-500/50 transition shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-900/50 text-blue-300 border border-blue-700/50">
            {job.category?.name || 'General'}
          </span>
          <h3 className="text-xl font-bold text-white mt-2">{job.title}</h3>
          <p className="text-slate-400 text-sm">{job.company} • {job.location}</p>
        </div>
        <span className="text-sm font-medium text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-md border border-emerald-800/40">
          {job.salaryRange}
        </span>
      </div>
      
      <div className="mt-5 flex justify-end">
        <Link
          href={`/jobs/${job._id}`}
          className="text-sm bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white px-4 py-2 rounded-lg font-medium transition border border-slate-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}