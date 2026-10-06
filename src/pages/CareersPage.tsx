import React, { useState, useRef } from 'react';
import { JobOpening, JobApplication } from '../types';
import { getStoredApplications, saveApplications } from '../utils/storage';
import {
  Briefcase,
  MapPin,
  GraduationCap,
  Clock,
  ArrowRight,
  CheckCircle2,
  Upload,
  Send,
  Building,
  Award,
  BookOpen,
} from 'lucide-react';

interface CareersPageProps {
  jobs: JobOpening[];
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ jobs, onShowToast }) => {
  const formRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    positionAppliedFor: jobs.length > 0 ? jobs[0].title : '',
    qualification: '',
    experience: '',
    resumeFileName: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleApplyClick = (jobTitle: string) => {
    setFormData((prev) => ({
      ...prev,
      positionAppliedFor: jobTitle,
    }));
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          resume: 'File size must be under 5MB.',
        }));
        return;
      }
      setFormData((prev) => ({
        ...prev,
        resumeFileName: file.name,
      }));
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy.resume;
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name.';
    }

    const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      errors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.positionAppliedFor.trim()) {
      errors.positionAppliedFor = 'Please select the position you are applying for.';
    }

    if (!formData.qualification.trim()) {
      errors.qualification = 'Please specify your highest educational qualification.';
    }

    if (!formData.experience.trim()) {
      errors.experience = 'Please mention your total relevant experience.';
    }

    if (!formData.resumeFileName) {
      errors.resume = 'Please upload your resume document (PDF or DOC).';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      onShowToast('Please correct the highlighted fields in the application form.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newApp: JobApplication = {
        id: `app-${Date.now()}`,
        jobId: 'applied-role',
        jobTitle: formData.positionAppliedFor,
        fullName: formData.fullName.trim(),
        mobileNumber: formData.mobileNumber.trim(),
        email: formData.email.trim(),
        qualification: formData.qualification.trim(),
        experience: formData.experience.trim(),
        resumeFileName: formData.resumeFileName,
        message: formData.message.trim(),
        submittedAt: new Date().toISOString(),
        status: 'Pending',
      };

      const current = getStoredApplications();
      saveApplications([newApp, ...current]);

      setIsSubmitting(false);
      setSubmittedSuccess(true);
      onShowToast('Application successfully submitted! Our hiring team will review your profile.', 'success');

      // Reset form
      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        positionAppliedFor: jobs.length > 0 ? jobs[0].title : '',
        qualification: '',
        experience: '',
        resumeFileName: '',
        message: '',
      });
    }, 600);
  };

  return (
    <div className="space-y-16 py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
          Career Opportunities
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
          Build Your Career with RELATION INDIA
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Join an enthusiastic team committed to advancing healthcare and personal hygiene across Jharkhand. We value integrity, diligence, and professional growth.
        </p>
      </div>

      {/* Sections: Why Join, Employee Growth, L&D, Professional Environment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Why Join Relation India</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Be part of a homegrown healthcare organization rooted in Dhanbad, creating essential impact in regional distribution and pharmaceutical access.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Employee Growth</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clear pathways for promotion and performance recognition for field executives, quality controllers, and operational coordinators.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Learning & Development</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hands-on training in pharmaceutical inventory standards, chemist network relations, compliance protocols, and product knowledge.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Professional Environment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ethical workplace culture with transparent communication, fair compensation, and respectful employee welfare policies.
            </p>
          </div>
        </div>
      </section>

      {/* Current Job Openings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              Current Openings ({jobs.filter((j) => j.isActive).length})
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Apply directly to open positions across Jharkhand territories.
            </p>
          </div>
          <span className="text-xs text-slate-500">
            Head Office: Topchanchi, Dhanbad, Jharkhand (PIN 828402)
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {jobs
            .filter((j) => j.isActive)
            .map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                    <p className="text-xs font-semibold text-teal-700 mt-0.5">{job.department}</p>
                  </div>
                  <button
                    onClick={() => handleApplyClick(job.title)}
                    className="self-start sm:self-auto inline-flex items-center gap-1.5 py-2 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-lg transition-colors"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                    <span><strong>Location:</strong> {job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                    <span><strong>Experience:</strong> {job.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-teal-600 shrink-0" />
                    <span><strong>Qualification:</strong> {job.qualification}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {job.description}
                </p>

                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Key Responsibilities:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                      {job.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
        </div>
      </section>

      {/* Application Form */}
      <section ref={formRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Recruitment Form
            </span>
            <h2 className="text-2xl font-bold text-slate-900 font-display mt-1">
              Submit Your Job Application
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Complete the form below to apply for positions at RELATION INDIA. Your details are securely submitted to our human resources team.
            </p>
          </div>

          {submittedSuccess && (
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-start gap-3 text-teal-900 text-xs">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Application Received Successfully!</p>
                <p className="mt-1">
                  Thank you for your interest in joining RELATION INDIA. Our recruitment team will review your qualifications and contact shortlisted candidates via phone or email.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className={`w-full text-xs px-3.5 py-2.5 rounded-lg border ${
                    formErrors.fullName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                />
                {formErrors.fullName && (
                  <p className="text-[11px] text-rose-600 mt-1">{formErrors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  placeholder="10-digit mobile number"
                  className={`w-full text-xs px-3.5 py-2.5 rounded-lg border ${
                    formErrors.mobileNumber ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                />
                {formErrors.mobileNumber && (
                  <p className="text-[11px] text-rose-600 mt-1">{formErrors.mobileNumber}</p>
                )}
              </div>
            </div>

            {/* Email & Position */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className={`w-full text-xs px-3.5 py-2.5 rounded-lg border ${
                    formErrors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                />
                {formErrors.email && (
                  <p className="text-[11px] text-rose-600 mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Position Applied For *
                </label>
                <select
                  value={formData.positionAppliedFor}
                  onChange={(e) => setFormData({ ...formData, positionAppliedFor: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {jobs.map((j) => (
                    <option key={j.id} value={j.title}>
                      {j.title} ({j.department})
                    </option>
                  ))}
                  <option value="General Field Representative">General Field Representative</option>
                  <option value="General Warehouse Staff">General Warehouse Staff</option>
                  <option value="Other Open Application">Other Open Application</option>
                </select>
                {formErrors.positionAppliedFor && (
                  <p className="text-[11px] text-rose-600 mt-1">{formErrors.positionAppliedFor}</p>
                )}
              </div>
            </div>

            {/* Qualification & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Qualification *
                </label>
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="e.g. B.Pharm, D.Pharm, B.Sc, B.Com, MBA, etc."
                  className={`w-full text-xs px-3.5 py-2.5 rounded-lg border ${
                    formErrors.qualification ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                />
                {formErrors.qualification && (
                  <p className="text-[11px] text-rose-600 mt-1">{formErrors.qualification}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Experience *
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g. Fresher or 2 Years in Pharma Sales"
                  className={`w-full text-xs px-3.5 py-2.5 rounded-lg border ${
                    formErrors.experience ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                />
                {formErrors.experience && (
                  <p className="text-[11px] text-rose-600 mt-1">{formErrors.experience}</p>
                )}
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Resume Upload (PDF / DOC / DOCX - Max 5MB) *
              </label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-300 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-slate-600" />
                  <span>Choose File</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-slate-500 truncate">
                  {formData.resumeFileName || 'No file chosen yet'}
                </span>
              </div>
              {formErrors.resume && (
                <p className="text-[11px] text-rose-600 mt-1">{formErrors.resume}</p>
              )}
            </div>

            {/* Message / Cover Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Message / Brief Profile Summary
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention your key experience, preferred work district in Jharkhand, or previous distributor coverage."
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Submit Application */}
            <div className="pt-2 flex items-center justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 py-3 px-6 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application'}</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
