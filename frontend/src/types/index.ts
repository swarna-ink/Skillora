// frontend/src/types/index.ts
// TypeScript Types Definition

export interface Category {
  _id: string;
  name: string;
  description?: string;
}

export interface Job {
  _id: string;
  title: string;
  companyName: string;
  location: string;
  jobType: string;
  description: string;
  salary?: string;
  category: Category;
  createdAt: string;
}