import {
  INITIAL_PRODUCTS,
  INITIAL_JOBS,
  INITIAL_NEWS,
  INITIAL_EMPLOYEES,
  INITIAL_APPLICATIONS,
  INITIAL_ENQUIRIES
} from '../data/initialData';
import { Product, JobOpening, NewsArticle, Employee, JobApplication, ContactEnquiry } from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'relation_india_products_v3',
  JOBS: 'relation_india_jobs_v1',
  NEWS: 'relation_india_news_v1',
  EMPLOYEES: 'relation_india_employees_v1',
  APPLICATIONS: 'relation_india_applications_v1',
  ENQUIRIES: 'relation_india_enquiries_v1',
  AUTH_ADMIN: 'relation_india_admin_auth_v1',
  AUTH_EMPLOYEE: 'relation_india_emp_auth_v1',
};

export const getStoredProducts = (): Product[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load products from storage', e);
    return INITIAL_PRODUCTS;
  }
};

export const saveProducts = (products: Product[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error('Failed to save products to storage', e);
  }
};

export const getStoredJobs = (): JobOpening[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.JOBS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_JOBS));
      return INITIAL_JOBS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_JOBS;
  }
};

export const saveJobs = (jobs: JobOpening[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  } catch (e) {
    console.error('Failed to save jobs', e);
  }
};

export const getStoredNews = (): NewsArticle[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NEWS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
      return INITIAL_NEWS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_NEWS;
  }
};

export const saveNews = (news: NewsArticle[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
  } catch (e) {
    console.error('Failed to save news', e);
  }
};

export const getStoredEmployees = (): Employee[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(INITIAL_EMPLOYEES));
      return INITIAL_EMPLOYEES;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_EMPLOYEES;
  }
};

export const saveEmployees = (employees: Employee[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
  } catch (e) {
    console.error('Failed to save employees', e);
  }
};

export const getStoredApplications = (): JobApplication[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_APPLICATIONS;
  }
};

export const saveApplications = (applications: JobApplication[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  } catch (e) {
    console.error('Failed to save applications', e);
  }
};

export const getStoredEnquiries = (): ContactEnquiry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_ENQUIRIES));
      return INITIAL_ENQUIRIES;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_ENQUIRIES;
  }
};

export const saveEnquiries = (enquiries: ContactEnquiry[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  } catch (e) {
    console.error('Failed to save enquiries', e);
  }
};

export const resetAllDataToDefault = () => {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_JOBS));
  localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
  localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(INITIAL_EMPLOYEES));
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
  localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_ENQUIRIES));
};
