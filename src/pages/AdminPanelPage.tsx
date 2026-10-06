import React, { useState } from 'react';
import {
  Product,
  JobOpening,
  JobApplication,
  NewsArticle,
  Employee,
  ContactEnquiry,
} from '../types';
import {
  Shield,
  Lock,
  User,
  Eye,
  EyeOff,
  LogOut,
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  FileText,
  Users,
  Briefcase,
  FileCheck,
  Newspaper,
  Globe,
  KeyRound,
  Mail,
  Plus,
  Trash2,
  Edit2,
  Search,
  Upload,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface AdminPanelPageProps {
  products: Product[];
  jobs: JobOpening[];
  applications: JobApplication[];
  news: NewsArticle[];
  employees: Employee[];
  enquiries: ContactEnquiry[];
  isLoggedIn: boolean;
  onLoginStateChange: (loggedIn: boolean) => void;
  onUpdateProducts: (products: Product[]) => void;
  onUpdateJobs: (jobs: JobOpening[]) => void;
  onUpdateApplications: (apps: JobApplication[]) => void;
  onUpdateNews: (news: NewsArticle[]) => void;
  onUpdateEmployees: (emps: Employee[]) => void;
  onResetAllData: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

type AdminSection =
  | 'dashboard'
  | 'products'
  | 'product-images'
  | 'product-details'
  | 'employees'
  | 'jobs'
  | 'applications'
  | 'newsroom'
  | 'content'
  | 'accounts'
  | 'enquiries';

export const AdminPanelPage: React.FC<AdminPanelPageProps> = ({
  products,
  jobs,
  applications,
  news,
  employees,
  enquiries,
  isLoggedIn,
  onLoginStateChange,
  onUpdateProducts,
  onUpdateJobs,
  onUpdateApplications,
  onUpdateNews,
  onUpdateEmployees,
  onResetAllData,
  onShowToast,
}) => {
  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('relation@admin');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active Section
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  // Search filter inside admin
  const [adminSearch, setAdminSearch] = useState('');

  // Modal / Form state for Product
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    shortDescription: '',
    fullDescription: '',
    packSize: '',
    composition: '',
    featuresText: '',
    storageInstructions: '',
    isFeatured: false,
    image: '',
  });

  // Modal / Form state for Job
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    location: 'Topchanchi, Dhanbad, Jharkhand',
    experience: '',
    qualification: '',
    description: '',
    responsibilitiesText: '',
  });

  // Modal / Form state for News
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Company News' as NewsArticle['category'],
    summary: '',
    content: '',
  });

  // Modal / Form state for Employee
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [employeeForm, setEmployeeForm] = useState({
    employeeId: '',
    fullName: '',
    department: 'Sales & Field Distribution',
    designation: '',
    email: '',
    phone: '',
  });

  // Authentication handlers
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setLoginError('Please enter username and password.');
      return;
    }
    onLoginStateChange(true);
    setLoginError('');
    onShowToast('Admin authentication granted. Welcome to RELATION INDIA Console.', 'success');
  };

  const handle1ClickLogin = () => {
    setUsername('admin');
    setPassword('relation@admin');
    onLoginStateChange(true);
    onShowToast('Logged in as System Administrator.', 'success');
  };

  const handleAdminLogout = () => {
    onLoginStateChange(false);
    onShowToast('Logged out of Admin Console.', 'success');
  };

  // Product CRUD
  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Personal Hygiene & Sanitary Care',
      shortDescription: '',
      fullDescription: '',
      packSize: 'Standard Sealed Pack',
      composition: '',
      featuresText: 'High absorption\nTamper-evident packaging\nTested quality',
      storageInstructions: 'Store in a cool dry place.',
      isFeatured: false,
      image: '',
    });
    setProductModalOpen(true);
  };

  const openEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      category: p.category,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription,
      packSize: p.packSize,
      composition: p.composition || '',
      featuresText: (p.features || []).join('\n'),
      storageInstructions: p.storageInstructions || '',
      isFeatured: !!p.isFeatured,
      image: p.image || '',
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      onShowToast('Product name is required.', 'error');
      return;
    }

    const featuresArray = productForm.featuresText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProduct) {
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: productForm.name.trim(),
              category: productForm.category.trim(),
              shortDescription: productForm.shortDescription.trim(),
              fullDescription: productForm.fullDescription.trim(),
              packSize: productForm.packSize.trim(),
              composition: productForm.composition.trim(),
              features: featuresArray,
              storageInstructions: productForm.storageInstructions.trim(),
              isFeatured: productForm.isFeatured,
              image: productForm.image,
            }
          : p
      );
      onUpdateProducts(updated);
      onShowToast(`Updated product: ${productForm.name}`, 'success');
    } else {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: productForm.name.trim(),
        category: productForm.category.trim(),
        shortDescription: productForm.shortDescription.trim(),
        fullDescription: productForm.fullDescription.trim(),
        packSize: productForm.packSize.trim(),
        composition: productForm.composition.trim(),
        features: featuresArray,
        storageInstructions: productForm.storageInstructions.trim(),
        isFeatured: productForm.isFeatured,
        image: productForm.image,
      };
      onUpdateProducts([newProduct, ...products]);
      onShowToast(`Created new product: ${productForm.name}`, 'success');
    }
    setProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      onUpdateProducts(products.filter((p) => p.id !== id));
      onShowToast(`Product "${name}" deleted.`, 'success');
    }
  };

  // Image Upload handler for products
  const handleProductImageUpload = (
    productId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onShowToast('Please select a valid image file (JPG, PNG, WebP).', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      const updated = products.map((p) =>
        p.id === productId ? { ...p, image: dataUrl } : p
      );
      onUpdateProducts(updated);
      onShowToast(`Original product image uploaded and attached!`, 'success');
    };
    reader.readAsDataURL(file);
  };

  // Job CRUD
  const openAddJob = () => {
    setEditingJob(null);
    setJobForm({
      title: '',
      department: 'Sales & Distribution',
      location: 'Dhanbad / Bokaro / Ranchi, Jharkhand',
      experience: '1 - 3 Years',
      qualification: 'Graduate (B.Pharm / B.Sc / B.Com)',
      description: '',
      responsibilitiesText: 'Expand pharmacy coverage\nCoordinate with stockists\nMaintain compliance logs',
    });
    setJobModalOpen(true);
  };

  const openEditJob = (j: JobOpening) => {
    setEditingJob(j);
    setJobForm({
      title: j.title,
      department: j.department,
      location: j.location,
      experience: j.experience,
      qualification: j.qualification,
      description: j.description,
      responsibilitiesText: (j.responsibilities || []).join('\n'),
    });
    setJobModalOpen(true);
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title.trim()) return;

    const respArray = jobForm.responsibilitiesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingJob) {
      const updated = jobs.map((j) =>
        j.id === editingJob.id
          ? {
              ...j,
              title: jobForm.title.trim(),
              department: jobForm.department.trim(),
              location: jobForm.location.trim(),
              experience: jobForm.experience.trim(),
              qualification: jobForm.qualification.trim(),
              description: jobForm.description.trim(),
              responsibilities: respArray,
            }
          : j
      );
      onUpdateJobs(updated);
      onShowToast(`Updated opening: ${jobForm.title}`, 'success');
    } else {
      const newJob: JobOpening = {
        id: `job-${Date.now()}`,
        title: jobForm.title.trim(),
        department: jobForm.department.trim(),
        location: jobForm.location.trim(),
        experience: jobForm.experience.trim(),
        qualification: jobForm.qualification.trim(),
        description: jobForm.description.trim(),
        responsibilities: respArray,
        isActive: true,
        postedDate: new Date().toISOString().split('T')[0],
      };
      onUpdateJobs([newJob, ...jobs]);
      onShowToast(`Created opening: ${jobForm.title}`, 'success');
    }
    setJobModalOpen(false);
  };

  const handleDeleteJob = (id: string, title: string) => {
    if (window.confirm(`Delete opening "${title}"?`)) {
      onUpdateJobs(jobs.filter((j) => j.id !== id));
      onShowToast(`Job opening deleted.`, 'success');
    }
  };

  // News CRUD
  const openAddNews = () => {
    setEditingNews(null);
    setNewsForm({
      title: '',
      category: 'Company News',
      summary: '',
      content: '',
    });
    setNewsModalOpen(true);
  };

  const openEditNews = (item: NewsArticle) => {
    setEditingNews(item);
    setNewsForm({
      title: item.title,
      category: item.category,
      summary: item.summary,
      content: item.content,
    });
    setNewsModalOpen(true);
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title.trim()) return;

    if (editingNews) {
      const updated = news.map((n) =>
        n.id === editingNews.id
          ? {
              ...n,
              title: newsForm.title.trim(),
              category: newsForm.category,
              summary: newsForm.summary.trim(),
              content: newsForm.content.trim(),
            }
          : n
      );
      onUpdateNews(updated);
      onShowToast('News article updated.', 'success');
    } else {
      const newArticle: NewsArticle = {
        id: `news-${Date.now()}`,
        title: newsForm.title.trim(),
        category: newsForm.category,
        date: new Date().toISOString().split('T')[0],
        summary: newsForm.summary.trim(),
        content: newsForm.content.trim(),
        readTime: '3 min read',
      };
      onUpdateNews([newArticle, ...news]);
      onShowToast('Published news article.', 'success');
    }
    setNewsModalOpen(false);
  };

  const handleDeleteNews = (id: string, title: string) => {
    if (window.confirm(`Delete article "${title}"?`)) {
      onUpdateNews(news.filter((n) => n.id !== id));
      onShowToast('Article deleted.', 'success');
    }
  };

  // Employee CRUD
  const openAddEmployee = () => {
    setEditingEmployee(null);
    setEmployeeForm({
      employeeId: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: '',
      department: 'Sales & Field Distribution',
      designation: '',
      email: '',
      phone: '',
    });
    setEmployeeModalOpen(true);
  };

  const openEditEmployee = (emp: Employee) => {
    setEditingEmployee(emp);
    setEmployeeForm({
      employeeId: emp.employeeId,
      fullName: emp.fullName,
      department: emp.department,
      designation: emp.designation,
      email: emp.email,
      phone: emp.phone,
    });
    setEmployeeModalOpen(true);
  };

  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeForm.fullName.trim()) return;

    if (editingEmployee) {
      const updated = employees.map((emp) =>
        emp.id === editingEmployee.id
          ? {
              ...emp,
              employeeId: employeeForm.employeeId,
              fullName: employeeForm.fullName,
              department: employeeForm.department,
              designation: employeeForm.designation,
              email: employeeForm.email,
              phone: employeeForm.phone,
            }
          : emp
      );
      onUpdateEmployees(updated);
      onShowToast('Employee details updated.', 'success');
    } else {
      const newEmp: Employee = {
        id: `emp-${Date.now()}`,
        employeeId: employeeForm.employeeId,
        fullName: employeeForm.fullName,
        department: employeeForm.department,
        designation: employeeForm.designation,
        email: employeeForm.email,
        phone: employeeForm.phone,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        leaveBalance: 15,
      };
      onUpdateEmployees([newEmp, ...employees]);
      onShowToast('New employee onboarded.', 'success');
    }
    setEmployeeModalOpen(false);
  };

  const handleToggleEmployeeStatus = (empId: string) => {
    const updated = employees.map((emp) => {
      if (emp.id === empId) {
        const nextStatus = emp.status === 'Active' ? 'Disabled' : 'Active';
        return { ...emp, status: nextStatus as any };
      }
      return emp;
    });
    onUpdateEmployees(updated);
    onShowToast('Employee account status toggled.', 'success');
  };

  const handleUpdateAppStatus = (
    appId: string,
    status: JobApplication['status']
  ) => {
    const updated = applications.map((a) =>
      a.id === appId ? { ...a, status } : a
    );
    onUpdateApplications(updated);
    onShowToast(`Application status updated to ${status}.`, 'success');
  };

  // If not logged in, show Admin Login view
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 space-y-8">
        <div className="text-center space-y-2">
          <div className="h-16 w-14 mx-auto flex items-center justify-center">
            <img
              src="/images/rhc-logo.svg"
              alt="RELATION INDIA RHC Logo"
              referrerPolicy="no-referrer"
              className="h-full w-full object-contain drop-shadow"
            />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
            Corporate Administration
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            ADMIN PANEL LOGIN
          </h1>
          <p className="text-xs text-slate-500">
            Administrative control center for RELATION INDIA web portal.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-5">
          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full text-xs pl-9 pr-9 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-teal-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
            >
              Sign In to Admin Console
            </button>
          </form>

          {/* 1-Click Demo Login */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-2">
            <p className="text-[11px] text-slate-500">
              Front-End Evaluation Mode:
            </p>
            <button
              type="button"
              onClick={handle1ClickLogin}
              className="w-full py-2 px-3 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-lg text-xs font-semibold transition-colors"
            >
              1-Click Admin Access (Demo Mode)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard View
  const navItems = [
    { id: 'dashboard' as AdminSection, label: '1. Dashboard Overview', icon: LayoutDashboard },
    { id: 'products' as AdminSection, label: '2. Products Management', icon: Package },
    { id: 'product-images' as AdminSection, label: '3. Product Image Management', icon: ImageIcon },
    { id: 'product-details' as AdminSection, label: '4. Product Details Management', icon: FileText },
    { id: 'employees' as AdminSection, label: '5. Employee Management', icon: Users },
    { id: 'jobs' as AdminSection, label: '6. Career/Job Management', icon: Briefcase },
    { id: 'applications' as AdminSection, label: '7. Job Applications', icon: FileCheck },
    { id: 'newsroom' as AdminSection, label: '8. Newsroom Management', icon: Newspaper },
    { id: 'content' as AdminSection, label: '9. Website Content', icon: Globe },
    { id: 'accounts' as AdminSection, label: '10. Employee Accounts', icon: KeyRound },
    { id: 'enquiries' as AdminSection, label: '11. Contact/Enquiries', icon: Mail },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-9 shrink-0 flex items-center justify-center">
            <img
              src="/images/rhc-logo.svg"
              alt="RELATION INDIA RHC Logo"
              referrerPolicy="no-referrer"
              className="h-full w-full object-contain drop-shadow"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display">
              RELATION INDIA Administrator Console
            </h1>
            <p className="text-xs text-slate-300">
              AT-MANTAND, POST-TOPCHANCHI, DIST-DHANBAD, JHARKHAND, PIN – 828402
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset all products, jobs, and news to initial default data?')) {
                onResetAllData();
                onShowToast('All data reset to initial defaults.', 'success');
              }
            }}
            className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 flex items-center gap-1.5"
            title="Reset to default data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleAdminLogout}
            className="px-3.5 py-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900 rounded-lg border border-rose-800/60 flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Admin Notice */}
      <div className="bg-teal-50 border border-teal-200 p-3.5 rounded-xl text-xs text-teal-900 flex items-start gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <div>
          <strong>Functional Front-End Interface:</strong> Changes are saved to browser storage and instantly reflect on the public website. Ready for permanent database / REST API backend binding.
        </div>
      </div>

      {/* Main Grid: Sidebar Navigation + Content Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-3 space-y-1">
          <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Console Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setAdminSearch('');
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="lg:col-span-9 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          {/* 1. DASHBOARD OVERVIEW */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                System Overview & Key Metrics
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Total Products</span>
                  <p className="text-2xl font-bold font-mono text-slate-900">{products.length}</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Active Jobs</span>
                  <p className="text-2xl font-bold font-mono text-slate-900">
                    {jobs.filter((j) => j.isActive).length}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Applications</span>
                  <p className="text-2xl font-bold font-mono text-slate-900">{applications.length}</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Trade Inquiries</span>
                  <p className="text-2xl font-bold font-mono text-slate-900">{enquiries.length}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Quick Actions
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={openAddProduct}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Product</span>
                  </button>
                  <button
                    onClick={openAddJob}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Post Job Opening</span>
                  </button>
                  <button
                    onClick={openAddNews}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Publish News Article</span>
                  </button>
                </div>
              </div>

              {/* Recent Applications Feed */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Recent Candidate Submissions
                </h3>
                {applications.length > 0 ? (
                  <div className="divide-y divide-slate-100 text-xs">
                    {applications.slice(0, 3).map((app) => (
                      <div key={app.id} className="py-2.5 flex items-center justify-between">
                        <div>
                          <strong className="text-slate-900">{app.fullName}</strong> applied for{' '}
                          <span className="text-teal-700 font-semibold">{app.jobTitle}</span>
                          <span className="text-slate-400 block text-[11px]">
                            {app.mobileNumber} · {app.qualification}
                          </span>
                        </div>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium text-slate-700">
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No applications received yet.</p>
                )}
              </div>
            </div>
          )}

          {/* 2. PRODUCTS MANAGEMENT */}
          {activeSection === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    Products Management ({products.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Add, edit, delete, and control product listing on the website.
                  </p>
                </div>
                <button
                  onClick={openAddProduct}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  placeholder="Filter products by name or category..."
                  className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 border-y border-slate-200 text-slate-600 uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">Product Name</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Pack Format</th>
                      <th className="py-2.5 px-3">Featured</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {products
                      .filter((p) =>
                        !adminSearch ||
                        p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
                        p.category.toLowerCase().includes(adminSearch.toLowerCase())
                      )
                      .map((p) => (
                        <tr key={p.id}>
                          <td className="py-2.5 px-3 font-semibold text-slate-900">{p.name}</td>
                          <td className="py-2.5 px-3 text-teal-700">{p.category}</td>
                          <td className="py-2.5 px-3 text-slate-500">{p.packSize}</td>
                          <td className="py-2.5 px-3">
                            {p.isFeatured ? (
                              <span className="text-[10px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded font-semibold">
                                Yes
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-400">No</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-right space-x-1">
                            <button
                              onClick={() => openEditProduct(p)}
                              className="p-1.5 text-slate-600 hover:text-teal-700 rounded hover:bg-slate-100"
                              title="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-1.5 text-slate-600 hover:text-rose-600 rounded hover:bg-slate-100"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. PRODUCT IMAGE MANAGEMENT */}
          {activeSection === 'product-images' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Product Image Management
                </h2>
                <p className="text-xs text-slate-500">
                  Upload and preserve original product packaging images exactly as provided without altering packaging, colors, or typography.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900">{p.name}</h4>
                        <span className="text-[10px] text-teal-700 font-semibold">{p.category}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Current Image Asset: {p.image ? 'Custom Upload Attached' : 'Standard Authentic Visual'}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-800 rounded-lg border border-slate-300 shadow-sm transition-colors">
                        <Upload className="w-3.5 h-3.5 text-teal-700" />
                        <span>Upload Original Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleProductImageUpload(p.id, e)}
                          className="hidden"
                        />
                      </label>

                      {p.image && (
                        <button
                          onClick={() => {
                            const updated = products.map((item) =>
                              item.id === p.id ? { ...item, image: '' } : item
                            );
                            onUpdateProducts(updated);
                            onShowToast(`Reset image for ${p.name}.`, 'success');
                          }}
                          className="text-xs text-rose-600 hover:underline"
                        >
                          Remove Upload
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. PRODUCT DETAILS MANAGEMENT */}
          {activeSection === 'product-details' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Product Details & Technical Specifications
                </h2>
                <p className="text-xs text-slate-500">
                  Update packaging information, composition (if provided), displayed features, and storage directions.
                </p>
              </div>

              <div className="space-y-4">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                      <button
                        onClick={() => openEditProduct(p)}
                        className="text-xs font-semibold text-teal-700 hover:underline"
                      >
                        Edit All Details
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                      <div>
                        <span className="font-semibold text-slate-700 block">Pack Size:</span>
                        <span>{p.packSize}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700 block">Storage:</span>
                        <span>{p.storageInstructions || 'Standard guidelines'}</span>
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <span className="font-semibold text-slate-700 block">Features:</span>
                        <span>{p.features?.join(' · ') || 'None listed'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. EMPLOYEE MANAGEMENT */}
          {activeSection === 'employees' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    Employee Directory & Personnel Management
                  </h2>
                  <p className="text-xs text-slate-500">
                    Add, edit, view, and disable employee records.
                  </p>
                </div>
                <button
                  onClick={openAddEmployee}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Employee</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 border-y border-slate-200 text-slate-600 uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">Emp ID</th>
                      <th className="py-2.5 px-3">Name</th>
                      <th className="py-2.5 px-3">Department</th>
                      <th className="py-2.5 px-3">Designation</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {employees.map((emp) => (
                      <tr key={emp.id}>
                        <td className="py-2.5 px-3 font-mono font-semibold text-teal-800">
                          {emp.employeeId}
                        </td>
                        <td className="py-2.5 px-3 font-medium text-slate-900">{emp.fullName}</td>
                        <td className="py-2.5 px-3">{emp.department}</td>
                        <td className="py-2.5 px-3 text-slate-500">{emp.designation}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                              emp.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {emp.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right space-x-2">
                          <button
                            onClick={() => openEditEmployee(emp)}
                            className="text-teal-700 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleToggleEmployeeStatus(emp.id)}
                            className="text-slate-500 hover:text-slate-800"
                          >
                            {emp.status === 'Active' ? 'Disable' : 'Enable'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. CAREER / JOB MANAGEMENT */}
          {activeSection === 'jobs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    Career Vacancies & Job Management
                  </h2>
                  <p className="text-xs text-slate-500">
                    Publish, update, or remove job postings shown on the Careers page.
                  </p>
                </div>
                <button
                  onClick={openAddJob}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Post Opening</span>
                </button>
              </div>

              <div className="space-y-3">
                {jobs.map((j) => (
                  <div
                    key={j.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{j.title}</h4>
                      <p className="text-slate-500">
                        {j.department} · {j.location} · {j.experience}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditJob(j)}
                        className="py-1 px-3 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteJob(j.id, j.title)}
                        className="py-1 px-3 bg-rose-50 hover:bg-rose-100 rounded text-rose-700 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. JOB APPLICATIONS */}
          {activeSection === 'applications' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Submitted Candidate Applications ({applications.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Resumes and profiles submitted by candidates via the Careers application form.
                </p>
              </div>

              {applications.length > 0 ? (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 text-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{app.fullName}</h4>
                          <span className="text-teal-700 font-semibold">{app.jobTitle}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-[11px]">{app.submittedAt.split('T')[0]}</span>
                          <select
                            value={app.status}
                            onChange={(e) =>
                              handleUpdateAppStatus(app.id, e.target.value as any)
                            }
                            className="p-1 text-xs border border-slate-300 rounded bg-white font-medium"
                          >
                            <option>Pending</option>
                            <option>Reviewed</option>
                            <option>Shortlisted</option>
                            <option>Archived</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600">
                        <div>
                          <strong>Phone:</strong> {app.mobileNumber}
                        </div>
                        <div>
                          <strong>Email:</strong> {app.email}
                        </div>
                        <div>
                          <strong>Experience:</strong> {app.experience}
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                          <strong>Qualification:</strong> {app.qualification}
                        </div>
                        <div>
                          <strong>Attached Resume:</strong> {app.resumeFileName}
                        </div>
                      </div>

                      {app.message && (
                        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 italic">
                          "{app.message}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-6 text-center">
                  No applications received yet.
                </p>
              )}
            </div>
          )}

          {/* 8. NEWSROOM MANAGEMENT */}
          {activeSection === 'newsroom' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    Newsroom & Press Releases ({news.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Publish and update company articles, events, and health news.
                  </p>
                </div>
                <button
                  onClick={openAddNews}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Article</span>
                </button>
              </div>

              <div className="space-y-3">
                {news.map((n) => (
                  <div
                    key={n.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-teal-700">{n.category}</span>
                        <span className="text-slate-400">· {n.date}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mt-0.5">{n.title}</h4>
                      <p className="text-slate-500 line-clamp-1 mt-0.5">{n.summary}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openEditNews(n)}
                        className="py-1 px-3 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNews(n.id, n.title)}
                        className="py-1 px-3 bg-rose-50 hover:bg-rose-100 rounded text-rose-700 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. WEBSITE CONTENT MANAGEMENT */}
          {activeSection === 'content' && (
            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Corporate Website Content Management
                </h2>
                <p className="text-xs text-slate-500">
                  Review verified corporate identity details and address information.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div>
                  <label className="font-bold text-slate-900 block">Registered Company Name</label>
                  <p className="font-mono text-slate-800 mt-0.5">RELATION INDIA</p>
                </div>
                <div>
                  <label className="font-bold text-slate-900 block">Official Address</label>
                  <p className="text-slate-800 mt-0.5">
                    AT-MANTAND, POST-TOPCHANCHI, DIST-DHANBAD, JHARKHAND, PIN – 828402
                  </p>
                </div>
                <div>
                  <label className="font-bold text-slate-900 block">Support Inquiries Email</label>
                  <p className="font-mono text-slate-800 mt-0.5">relationhealthcare@gmail.com</p>
                </div>
              </div>
            </div>
          )}

          {/* 10. EMPLOYEE ACCOUNTS */}
          {activeSection === 'accounts' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Employee Portal Credentials & Access Controls
                </h2>
                <p className="text-xs text-slate-500">
                  Manage login privileges for the staff portal.
                </p>
              </div>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-y border-slate-200 text-slate-600 uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">Employee ID</th>
                      <th className="py-2.5 px-3">Staff Name</th>
                      <th className="py-2.5 px-3">Access Level</th>
                      <th className="py-2.5 px-3">Portal Status</th>
                      <th className="py-2.5 px-3 text-right">Reset Token</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {employees.map((emp) => (
                      <tr key={emp.id}>
                        <td className="py-2.5 px-3 font-mono font-semibold">{emp.employeeId}</td>
                        <td className="py-2.5 px-3">{emp.fullName}</td>
                        <td className="py-2.5 px-3">Standard Staff</td>
                        <td className="py-2.5 px-3">
                          <span className="text-emerald-700 font-semibold">{emp.status}</span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() =>
                              onShowToast(`Generated temporary pass for ${emp.employeeId}`, 'success')
                            }
                            className="text-teal-700 hover:underline"
                          >
                            Reset Password
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 11. CONTACT / ENQUIRY MANAGEMENT */}
          {activeSection === 'enquiries' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Trade Supply & Chemist Inquiries ({enquiries.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Direct commercial inquiries submitted through the product catalogue.
                </p>
              </div>

              {enquiries.length > 0 ? (
                <div className="space-y-3">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 text-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <h4 className="font-bold text-slate-900 text-sm">{enq.fullName}</h4>
                        <span className="text-slate-400 text-[11px]">{enq.submittedAt.split('T')[0]}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                        <div>
                          <strong>Phone:</strong> {enq.phone}
                        </div>
                        <div>
                          <strong>Email:</strong> {enq.email}
                        </div>
                        {enq.productOfInterest && (
                          <div className="col-span-1 sm:col-span-2">
                            <strong>Product of Interest:</strong>{' '}
                            <span className="text-teal-700 font-semibold">{enq.productOfInterest}</span>
                          </div>
                        )}
                      </div>
                      <p className="p-2 bg-slate-50 rounded border border-slate-200 text-slate-700">
                        {enq.message}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-6 text-center">
                  No inquiries received yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal: Add/Edit Product */}
      {productModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setProductModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-slate-900 font-display">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pack Size / Format *</label>
                <input
                  type="text"
                  required
                  value={productForm.packSize}
                  onChange={(e) => setProductForm({ ...productForm, packSize: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Description</label>
                <textarea
                  rows={2}
                  value={productForm.fullDescription}
                  onChange={(e) => setProductForm({ ...productForm, fullDescription: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Composition (if supplied)</label>
                <input
                  type="text"
                  value={productForm.composition}
                  onChange={(e) => setProductForm({ ...productForm, composition: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Features (one per line)
                </label>
                <textarea
                  rows={3}
                  value={productForm.featuresText}
                  onChange={(e) => setProductForm({ ...productForm, featuresText: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={productForm.isFeatured}
                  onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-teal-600 rounded"
                />
                <label htmlFor="featured-check" className="font-semibold text-slate-700">
                  Feature this product on Homepage
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="py-2 px-4 bg-slate-100 text-slate-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-800"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add/Edit Job */}
      {jobModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setJobModalOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-slate-900 font-display">
              {editingJob ? 'Edit Job Opening' : 'Post New Job Opening'}
            </h3>

            <form onSubmit={handleSaveJob} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Experience</label>
                  <input
                    type="text"
                    required
                    value={jobForm.experience}
                    onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    required
                    value={jobForm.qualification}
                    onChange={(e) => setJobForm({ ...jobForm, qualification: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Description</label>
                <textarea
                  rows={2}
                  required
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setJobModalOpen(false)}
                  className="py-2 px-4 bg-slate-100 text-slate-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-800"
                >
                  Save Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add/Edit News */}
      {newsModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setNewsModalOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-slate-900 font-display">
              {editingNews ? 'Edit News Article' : 'Publish News Article'}
            </h3>

            <form onSubmit={handleSaveNews} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Headline *</label>
                <input
                  type="text"
                  required
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={newsForm.category}
                  onChange={(e) =>
                    setNewsForm({ ...newsForm, category: e.target.value as any })
                  }
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option>Company News</option>
                  <option>Product Updates</option>
                  <option>Healthcare</option>
                  <option>Careers</option>
                  <option>Events</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Summary</label>
                <textarea
                  rows={2}
                  required
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Article Content</label>
                <textarea
                  rows={4}
                  required
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewsModalOpen(false)}
                  className="py-2 px-4 bg-slate-100 text-slate-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-800"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add/Edit Employee */}
      {employeeModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setEmployeeModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-slate-900 font-display">
              {editingEmployee ? 'Edit Employee Details' : 'Onboard New Employee'}
            </h3>

            <form onSubmit={handleSaveEmployee} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Employee Code</label>
                  <input
                    type="text"
                    required
                    value={employeeForm.employeeId}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, employeeId: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={employeeForm.fullName}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, fullName: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={employeeForm.department}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, department: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    value={employeeForm.designation}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, designation: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={employeeForm.email}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    required
                    value={employeeForm.phone}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, phone: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEmployeeModalOpen(false)}
                  className="py-2 px-4 bg-slate-100 text-slate-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-800"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
