export interface Product {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image?: string; // Data URL or asset path
  packSize: string;
  composition?: string;
  features: string[];
  storageInstructions?: string;
  isFeatured?: boolean;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  qualification: string;
  description: string;
  responsibilities: string[];
  isActive: boolean;
  postedDate: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  qualification: string;
  experience: string;
  resumeFileName: string;
  message: string;
  submittedAt: string;
  status: 'Pending' | 'Reviewed' | 'Shortlisted' | 'Archived';
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Company News' | 'Product Updates' | 'Healthcare' | 'Careers' | 'Events';
  date: string;
  summary: string;
  content: string;
  readTime: string;
  image?: string;
}

export interface Employee {
  id: string;
  employeeId: string;
  fullName: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Disabled';
  leaveBalance: number;
}

export interface ContactEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  productOfInterest?: string;
  message: string;
  submittedAt: string;
}
