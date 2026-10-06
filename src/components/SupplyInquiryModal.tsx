import React, { useState } from 'react';
import { Product, ContactEnquiry } from '../types';
import { getStoredEnquiries, saveEnquiries } from '../utils/storage';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface SupplyInquiryModalProps {
  product: Product | null;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const SupplyInquiryModal: React.FC<SupplyInquiryModalProps> = ({
  product,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: product ? `Trade Supply Inquiry: ${product.name}` : 'General Supply Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please provide your name, valid email, and phone number.');
      return;
    }

    const newEnquiry: ContactEnquiry = {
      id: `enq-${Date.now()}`,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim(),
      productOfInterest: product.name,
      message: formData.message.trim() || `Inquiry for distribution/supply of ${product.name}.`,
      submittedAt: new Date().toISOString(),
    };

    const current = getStoredEnquiries();
    saveEnquiries([newEnquiry, ...current]);

    setSubmitted(true);
    onSuccess('Thank you! Your product supply inquiry has been recorded and submitted to RELATION INDIA.');
    setTimeout(() => {
      onClose();
    }, 1400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                Trade & Supply Inquiry
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                → rohitkumarq05102020@gmail.com
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-slate-900">Inquiry Received & Stored</h4>
              <p className="text-xs text-slate-600">
                Your trade inquiry has been stored in the RELATION INDIA console and routed to <strong className="font-mono text-teal-800">rohitkumarq05102020@gmail.com</strong>.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-2">
              <a
                href={`mailto:rohitkumarq05102020@gmail.com?subject=${encodeURIComponent(
                  `Trade Supply Inquiry: ${product.name} from ${formData.fullName}`
                )}&body=${encodeURIComponent(
                  `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProduct: ${product.name}\nMessage: ${formData.message}`
                )}`}
                className="py-2 px-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-lg shadow-sm"
              >
                Send Direct Email to rohitkumarq05102020@gmail.com
              </a>
              <button
                onClick={onClose}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Your Name / Business Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Anand Sharma or Anand Medicos"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Mobile / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10-digit mobile"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Quantity or Distribution Territory
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention expected batch quantity, territory (e.g. Dhanbad, Bokaro, Giridih), or chemist network details."
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
              <a
                href={`https://wa.me/917004223942?text=${encodeURIComponent(
                  `Hello RELATION INDIA, I am inquiring about trade supply for ${product.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-colors"
                title="Send inquiry directly via WhatsApp"
              >
                <span>WhatsApp: 7004223942</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-3 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 py-2 px-4 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
