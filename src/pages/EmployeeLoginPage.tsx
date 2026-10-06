import React, { useState } from 'react';
import { Employee, NewsArticle } from '../types';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Calendar,
  Clock,
  FileText,
  DollarSign,
  Bell,
  Download,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Briefcase,
  Layers,
} from 'lucide-react';

interface EmployeeLoginPageProps {
  employees: Employee[];
  news: NewsArticle[];
  isLoggedIn: boolean;
  onLoginStateChange: (loggedIn: boolean) => void;
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export const EmployeeLoginPage: React.FC<EmployeeLoginPageProps> = ({
  employees,
  news,
  isLoggedIn,
  onLoginStateChange,
  onShowToast,
}) => {
  // Login form state
  const [empId, setEmpId] = useState('EMP-1024');
  const [password, setPassword] = useState('Relation@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [forgotModal, setForgotModal] = useState(false);

  // Portal tab
  const [portalTab, setPortalTab] = useState<
    'profile' | 'attendance' | 'leave' | 'payroll' | 'notices' | 'documents' | 'news'
  >('profile');

  // Interactive Attendance punch state
  const [punchedIn, setPunchedIn] = useState(true);
  const [punchTime, setPunchTime] = useState('09:12 AM');

  // Current logged in demo employee
  const currentEmp = employees[0] || {
    id: 'emp-1',
    employeeId: 'EMP-1024',
    fullName: 'Rajesh Kumar Mahato',
    department: 'Sales & Field Distribution',
    designation: 'Senior Area Executive',
    email: 'rajesh.kumar@relationindia.com',
    phone: '+91 98765 43210',
    joinDate: '2024-03-15',
    status: 'Active',
    leaveBalance: 14,
  };

  // Leave application state
  const [leaveDays, setLeaveDays] = useState(1);
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveBalance, setLeaveBalance] = useState(currentEmp.leaveBalance || 14);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empId.trim()) {
      setLoginError('Please enter your Employee ID.');
      return;
    }
    if (!password.trim()) {
      setLoginError('Please enter your password.');
      return;
    }

    // Front-end authentication check
    onLoginStateChange(true);
    setLoginError('');
    onShowToast(`Welcome back, ${currentEmp.fullName}! Employee session initialized.`, 'success');
  };

  const handleOneClickDemo = () => {
    setEmpId('EMP-1024');
    setPassword('Relation@2026');
    onLoginStateChange(true);
    onShowToast(`Logged into Demo Employee Portal as ${currentEmp.fullName}.`, 'success');
  };

  const handleLogout = () => {
    onLoginStateChange(false);
    onShowToast('You have been logged out of the Employee Portal.', 'success');
  };

  const handlePunchToggle = () => {
    if (punchedIn) {
      setPunchedIn(false);
      onShowToast('Punched Out recorded at ' + new Date().toLocaleTimeString(), 'success');
    } else {
      setPunchedIn(true);
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setPunchTime(timeStr);
      onShowToast(`Punched In recorded successfully at ${timeStr}.`, 'success');
    }
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (leaveDays > leaveBalance) {
      onShowToast('Requested days exceed current leave balance.', 'error');
      return;
    }
    setLeaveBalance((prev) => prev - leaveDays);
    onShowToast(`Leave application for ${leaveDays} day(s) submitted to HR.`, 'success');
    setLeaveReason('');
  };

  // If already logged in, show Employee Dashboard Portal
  if (isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Portal Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-teal-500 text-slate-950 font-black text-2xl flex items-center justify-center shrink-0">
              {currentEmp.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-display">{currentEmp.fullName}</h1>
                <span className="text-[11px] bg-teal-500/20 text-teal-300 font-mono px-2 py-0.5 rounded border border-teal-500/30">
                  {currentEmp.employeeId}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {currentEmp.designation} · {currentEmp.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={handlePunchToggle}
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors ${
                punchedIn
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/40'
                  : 'bg-teal-500 text-slate-950 hover:bg-teal-400 font-bold'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{punchedIn ? `Punched In (${punchTime})` : 'Punch In Now'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-rose-950/50 hover:text-rose-300 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Demo Disclaimer notice */}
        <div className="bg-amber-50/80 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Demonstration Employee Portal:</strong> Connected to client-side state. Prepared for enterprise REST / GraphQL API or corporate Active Directory integration.
          </div>
        </div>

        {/* Portal Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200">
          {[
            { id: 'profile', label: 'Employee Profile', icon: User },
            { id: 'attendance', label: 'Attendance', icon: Clock },
            { id: 'leave', label: 'Leave & Balance', icon: Calendar },
            { id: 'payroll', label: 'Salary & Payroll', icon: DollarSign },
            { id: 'notices', label: 'Notices & Circulars', icon: Bell },
            { id: 'documents', label: 'Documents & SOPs', icon: FileText },
            { id: 'news', label: 'Company News', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = portalTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setPortalTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm font-semibold'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Profile */}
        {portalTab === 'profile' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Personal & Employment Particulars
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Full Legal Name</span>
                <span className="text-sm font-bold text-slate-800 mt-0.5 block">{currentEmp.fullName}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Employee Code</span>
                <span className="text-sm font-bold text-slate-800 font-mono mt-0.5 block">{currentEmp.employeeId}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Department</span>
                <span className="text-sm font-bold text-slate-800 mt-0.5 block">{currentEmp.department}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Designation</span>
                <span className="text-sm font-bold text-slate-800 mt-0.5 block">{currentEmp.designation}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Official Email</span>
                <span className="text-sm font-bold text-slate-800 mt-0.5 block">{currentEmp.email}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Work Location</span>
                <span className="text-sm font-bold text-slate-800 mt-0.5 block">Topchanchi, Dhanbad Facility</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Date of Joining</span>
                <span className="text-sm font-bold text-slate-800 mt-0.5 block">{currentEmp.joinDate}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">Employment Status</span>
                <span className="text-sm font-bold text-emerald-700 mt-0.5 block flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {currentEmp.status}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Attendance */}
        {portalTab === 'attendance' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  October 2026 Monthly Attendance
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Standard shifts: 09:00 AM – 06:00 PM (Monday through Saturday)
                </p>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-lg font-semibold">
                Monthly Presence: 96%
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-y border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-2.5 px-4">Date</th>
                    <th className="py-2.5 px-4">In Time</th>
                    <th className="py-2.5 px-4">Out Time</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4">Work Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                  <tr>
                    <td className="py-3 px-4 font-sans font-medium">06 Oct 2026 (Today)</td>
                    <td className="py-3 px-4 text-teal-700">{punchTime}</td>
                    <td className="py-3 px-4 text-slate-400">{punchedIn ? 'In Progress' : '06:05 PM'}</td>
                    <td className="py-3 px-4 font-sans text-emerald-700 font-medium">Present</td>
                    <td className="py-3 px-4">Active</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-sans font-medium">05 Oct 2026</td>
                    <td className="py-3 px-4">08:58 AM</td>
                    <td className="py-3 px-4">06:08 PM</td>
                    <td className="py-3 px-4 font-sans text-emerald-700 font-medium">Present</td>
                    <td className="py-3 px-4">9h 10m</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-sans font-medium">04 Oct 2026</td>
                    <td className="py-3 px-4">09:05 AM</td>
                    <td className="py-3 px-4">06:00 PM</td>
                    <td className="py-3 px-4 font-sans text-emerald-700 font-medium">Present</td>
                    <td className="py-3 px-4">8h 55m</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-sans font-medium">03 Oct 2026</td>
                    <td className="py-3 px-4">09:00 AM</td>
                    <td className="py-3 px-4">06:15 PM</td>
                    <td className="py-3 px-4 font-sans text-emerald-700 font-medium">Present</td>
                    <td className="py-3 px-4">9h 15m</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Leave */}
        {portalTab === 'leave' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Available Leave Balance
                </h3>
                <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-center">
                  <span className="text-3xl font-extrabold text-teal-800 font-mono">
                    {leaveBalance}
                  </span>
                  <span className="text-xs text-teal-900 block mt-1 font-medium">
                    Total Paid Days Remaining
                  </span>
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Casual Leave (CL):</span>
                    <strong className="font-mono">8 Days</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Sick Leave (SL):</span>
                    <strong className="font-mono">4 Days</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Earned Privilege (PL):</span>
                    <strong className="font-mono">{leaveBalance - 12} Days</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Apply for Leave
                </h3>
                <form onSubmit={handleApplyLeave} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Leave Type</label>
                      <select
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                      >
                        <option>Casual Leave</option>
                        <option>Sick / Medical Leave</option>
                        <option>Privilege / Annual Leave</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Number of Days</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={leaveDays}
                        onChange={(e) => setLeaveDays(Number(e.target.value))}
                        className="w-full p-2.5 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Reason for Leave</label>
                    <textarea
                      rows={3}
                      required
                      value={leaveReason}
                      onChange={(e) => setLeaveReason(e.target.value)}
                      placeholder="Specify reason for leave..."
                      className="w-full p-2.5 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-800 transition-colors"
                  >
                    Submit Leave Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Salary & Payroll */}
        {portalTab === 'payroll' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Payroll & Payslip History
                </h3>
                <p className="text-xs text-slate-500">
                  Electronic salary statements generated by RELATION INDIA Finance Dept.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-y border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-2.5 px-4">Pay Period</th>
                    <th className="py-2.5 px-4">Gross Earnings</th>
                    <th className="py-2.5 px-4">Deductions (EPF/Tax)</th>
                    <th className="py-2.5 px-4">Net Take-Home</th>
                    <th className="py-2.5 px-4">Disbursement Status</th>
                    <th className="py-2.5 px-4 text-right">Statement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                  <tr>
                    <td className="py-3 px-4 font-sans font-medium">September 2026</td>
                    <td className="py-3 px-4">₹ 42,500</td>
                    <td className="py-3 px-4 text-rose-600">- ₹ 3,600</td>
                    <td className="py-3 px-4 font-bold text-slate-900">₹ 38,900</td>
                    <td className="py-3 px-4 font-sans text-emerald-700">Credited (HDFC)</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onShowToast('Downloaded demo payslip: Payslip_Sep_2026.pdf', 'success')}
                        className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 font-sans font-semibold text-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Slip</span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-sans font-medium">August 2026</td>
                    <td className="py-3 px-4">₹ 42,500</td>
                    <td className="py-3 px-4 text-rose-600">- ₹ 3,600</td>
                    <td className="py-3 px-4 font-bold text-slate-900">₹ 38,900</td>
                    <td className="py-3 px-4 font-sans text-emerald-700">Credited (HDFC)</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onShowToast('Downloaded demo payslip: Payslip_Aug_2026.pdf', 'success')}
                        className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 font-sans font-semibold text-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Slip</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Notices */}
        {portalTab === 'notices' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Official Company Notices & Circulars
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Circular #RI-2026-09: Festival Holiday Schedule (Durga Puja & Diwali)</span>
                  <span className="text-slate-400 font-normal">01 Oct 2026</span>
                </div>
                <p className="text-slate-600">
                  Topchanchi facility and administrative office will observe declared festival holidays. Dispatch operations will maintain essential roster.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Circular #RI-2026-08: Batch Documentation Quality Training</span>
                  <span className="text-slate-400 font-normal">14 Sep 2026</span>
                </div>
                <p className="text-slate-600">
                  All field representatives and warehouse assistants are invited to the hygiene packaging handling webinar on Saturday.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Documents */}
        {portalTab === 'documents' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Company Documents & Standard Operating Procedures
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {[
                { title: 'Employee Code of Conduct & Ethics', size: '1.2 MB PDF' },
                { title: 'Standard Warehouse & Dispatch Procedures (SOP-04)', size: '2.8 MB PDF' },
                { title: 'Healthcare Product Handling & Hygiene Guide', size: '1.5 MB PDF' },
                { title: 'Workplace Safety & Medical Leave Policy', size: '890 KB PDF' },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-teal-700 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">{doc.title}</p>
                      <p className="text-slate-400 text-[11px]">{doc.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onShowToast(`Accessing document: ${doc.title}`, 'success')}
                    className="p-2 text-teal-700 hover:bg-slate-200 rounded-lg"
                    title="Download document"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: News feed */}
        {portalTab === 'news' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Internal Feed: Company Announcements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {news.map((item) => (
                <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                  <span className="font-semibold text-teal-700">{item.category} · {item.date}</span>
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="text-slate-600 line-clamp-2">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Login View
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
          Internal Staff Gateway
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          EMPLOYEE LOGIN
        </h1>
        <p className="text-xs text-slate-500">
          Authorized personnel portal for staff of RELATION INDIA.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-5">
        {loginError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Employee ID
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
                placeholder="e.g. EMP-1024"
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
                placeholder="Enter your password"
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

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-400">Topchanchi Office</span>
            <button
              type="button"
              onClick={() => setForgotModal(true)}
              className="text-teal-700 hover:underline font-medium"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-teal-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
          >
            Login to Employee Portal
          </button>
        </form>

        {/* 1-Click Demo Login Helper */}
        <div className="pt-4 border-t border-slate-100 text-center space-y-2">
          <p className="text-[11px] text-slate-500">
            Evaluating front-end demo? Use instant access:
          </p>
          <button
            type="button"
            onClick={handleOneClickDemo}
            className="w-full py-2 px-3 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-lg text-xs font-semibold transition-colors"
          >
            1-Click Demo Login (Rajesh Kumar, EMP-1024)
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setForgotModal(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-xl p-6 shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-slate-900 font-display">
              Reset Password Request
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In accordance with company security policy, employee credential resets are managed by the IT & HR Desk at our Topchanchi facility. Please reach out to <code className="bg-slate-100 px-1 py-0.5 rounded text-teal-800">relationhealthcare@gmail.com</code> or consult your supervisor.
            </p>
            <button
              onClick={() => setForgotModal(false)}
              className="w-full py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
