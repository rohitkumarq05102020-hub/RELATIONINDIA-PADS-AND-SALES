import React, { useState, useEffect } from 'react';
import { Header, PageId } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { CareersPage } from './pages/CareersPage';
import { AboutPage } from './pages/AboutPage';
import { NewsroomPage } from './pages/NewsroomPage';
import { EmployeeLoginPage } from './pages/EmployeeLoginPage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import { ProductModal } from './components/ProductModal';
import { SupplyInquiryModal } from './components/SupplyInquiryModal';
import { Toast } from './components/Toast';
import {
  getStoredProducts,
  saveProducts,
  getStoredJobs,
  saveJobs,
  getStoredApplications,
  saveApplications,
  getStoredNews,
  saveNews,
  getStoredEmployees,
  saveEmployees,
  getStoredEnquiries,
  resetAllDataToDefault,
} from './utils/storage';
import { Product, JobOpening, JobApplication, NewsArticle, Employee, ContactEnquiry } from './types';

export default function App() {
  // Page Navigation State
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Shared Data State (persisted in localStorage)
  const [products, setProducts] = useState<Product[]>([]);
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);

  // Authentication State
  const [isEmployeeLoggedIn, setIsEmployeeLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Initialize data on mount & bind URL Hash routing
  useEffect(() => {
    setProducts(getStoredProducts());
    setJobs(getStoredJobs());
    setApplications(getStoredApplications());
    setNews(getStoredNews());
    setEmployees(getStoredEmployees());
    setEnquiries(getStoredEnquiries());

    const readHash = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'products',
        'careers',
        'about',
        'newsroom',
        'employee-login',
        'admin',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    readHash();
    window.addEventListener('hashchange', readHash);
    return () => window.removeEventListener('hashchange', readHash);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
  };

  // Data update handlers
  const handleUpdateProducts = (updated: Product[]) => {
    setProducts(updated);
    saveProducts(updated);
  };

  const handleUpdateJobs = (updated: JobOpening[]) => {
    setJobs(updated);
    saveJobs(updated);
  };

  const handleUpdateApplications = (updated: JobApplication[]) => {
    setApplications(updated);
    saveApplications(updated);
  };

  const handleUpdateNews = (updated: NewsArticle[]) => {
    setNews(updated);
    saveNews(updated);
  };

  const handleUpdateEmployees = (updated: Employee[]) => {
    setEmployees(updated);
    saveEmployees(updated);
  };

  const handleResetAllData = () => {
    resetAllDataToDefault();
    setProducts(getStoredProducts());
    setJobs(getStoredJobs());
    setApplications(getStoredApplications());
    setNews(getStoredNews());
    setEmployees(getStoredEmployees());
    setEnquiries(getStoredEnquiries());
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-teal-700 selection:text-white">
      {/* Top Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isEmployeeLoggedIn={isEmployeeLoggedIn}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            products={products}
            news={news}
            onNavigate={handleNavigate}
            onViewProduct={(p) => setSelectedProduct(p)}
            onRequestSupply={(p) => setInquiryProduct(p)}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            products={products}
            onViewProduct={(p) => setSelectedProduct(p)}
            onRequestSupply={(p) => setInquiryProduct(p)}
          />
        )}

        {currentPage === 'careers' && (
          <CareersPage jobs={jobs} onShowToast={showToast} />
        )}

        {currentPage === 'about' && <AboutPage />}

        {currentPage === 'newsroom' && (
          <NewsroomPage news={news} onShowToast={showToast} />
        )}

        {currentPage === 'employee-login' && (
          <EmployeeLoginPage
            employees={employees}
            news={news}
            isLoggedIn={isEmployeeLoggedIn}
            onLoginStateChange={setIsEmployeeLoggedIn}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPanelPage
            products={products}
            jobs={jobs}
            applications={applications}
            news={news}
            employees={employees}
            enquiries={enquiries}
            isLoggedIn={isAdminLoggedIn}
            onLoginStateChange={setIsAdminLoggedIn}
            onUpdateProducts={handleUpdateProducts}
            onUpdateJobs={handleUpdateJobs}
            onUpdateApplications={handleUpdateApplications}
            onUpdateNews={handleUpdateNews}
            onUpdateEmployees={handleUpdateEmployees}
            onResetAllData={handleResetAllData}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequestSupply={(p) => {
          setSelectedProduct(null);
          setInquiryProduct(p);
        }}
      />

      {/* Trade Supply Inquiry Modal */}
      <SupplyInquiryModal
        product={inquiryProduct}
        onClose={() => setInquiryProduct(null)}
        onSuccess={(msg) => showToast(msg, 'success')}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
