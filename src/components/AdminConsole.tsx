import React, { useState } from 'react';
import {
  Student,
  Tutor,
  Course,
  Booking,
  Payment,
  AttendanceRecord,
  Enquiry,
  FeePlan,
  Setting,
  PaymentStatus,
  BookingStatus,
  StudentStatus
} from '../types/academy';
import {
  Users,
  Calendar,
  CreditCard,
  BookOpen,
  Settings as SettingsIcon,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  Search,
  Filter,
  Check,
  Edit2,
  DollarSign
} from 'lucide-react';

interface AdminConsoleProps {
  students: Student[];
  onUpdateStudents: (students: Student[]) => void;
  tutors: Tutor[];
  courses: Course[];
  bookings: Booking[];
  onUpdateBookings: (bookings: Booking[]) => void;
  payments: Payment[];
  onUpdatePayments: (payments: Payment[]) => void;
  attendanceRecords: AttendanceRecord[];
  enquiries: Enquiry[];
  feePlans: FeePlan[];
  settings: Setting[];
  onUpdateSettings: (settings: Setting[]) => void;
  regFee: number;
  monthlyTuition: number;
  onSaveFeeSettings: (newRegFee: number, newMonthlyTuition: number) => void;
  onViewInvoice: (payment: Payment) => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  students,
  onUpdateStudents,
  tutors,
  courses,
  bookings,
  onUpdateBookings,
  payments,
  onUpdatePayments,
  attendanceRecords,
  enquiries,
  feePlans,
  settings,
  onUpdateSettings,
  regFee,
  monthlyTuition,
  onSaveFeeSettings,
  onViewInvoice
}) => {
  const [activeTab, setActiveTab] = useState<
    'students' | 'bookings' | 'payments' | 'attendance' | 'tutors' | 'courses' | 'enquiries' | 'fee_plans' | 'settings'
  >('students');

  const [searchQuery, setSearchQuery] = useState('');
  const [tempRegFee, setTempRegFee] = useState(regFee);
  const [tempMonthlyTuition, setTempMonthlyTuition] = useState(monthlyTuition);
  const [feeSettingsSavedMsg, setFeeSettingsSavedMsg] = useState(false);

  // Stats calculation
  const totalRevenue = payments.reduce((acc, p) => acc + (p.Verification_Status === 'Verified' ? p.Amount_Received : 0), 0);
  const totalVerifiedPayments = payments.filter((p) => p.Verification_Status === 'Verified').length;
  const activeBookingsCount = bookings.filter((b) => b.Booking_Status === 'Confirmed').length;

  const handleSaveFees = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveFeeSettings(tempRegFee, tempMonthlyTuition);
    setFeeSettingsSavedMsg(true);
    setTimeout(() => setFeeSettingsSavedMsg(false), 2500);
  };

  const handleExportCSV = (sheetName: string, data: object[]) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((field) => {
            const val = (row as Record<string, unknown>)[field];
            const str = Array.isArray(val) ? val.join('; ') : typeof val === 'object' ? JSON.stringify(val) : String(val ?? '');
            return `"${str.replace(/"/g, '""')}"`;
          })
          .join(',')
      )
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Swaralaya_${sheetName}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Status updaters
  const handleStudentStatusChange = (studentId: string, newStatus: StudentStatus) => {
    const updated = students.map((s) => (s.Student_ID === studentId ? { ...s, Student_Status: newStatus } : s));
    onUpdateStudents(updated);
  };

  const handleBookingStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    const updated = bookings.map((b) => (b.Booking_ID === bookingId ? { ...b, Booking_Status: newStatus } : b));
    onUpdateBookings(updated);
  };

  const handlePaymentStatusChange = (paymentId: string, newStatus: PaymentStatus) => {
    const updated = payments.map((p) => (p.Payment_ID === paymentId ? { ...p, Verification_Status: newStatus } : p));
    onUpdatePayments(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner & KPI Row */}
      <div className="bg-white rounded-xl shadow-xs border border-[#E5DFD5] p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#642B3B] uppercase tracking-wider">
              <span>Admin Management</span>
              <span>·</span>
              <span className="text-[#C49A52]">Operations Manual Console</span>
            </div>
            <h1 className="text-2xl font-serif-title font-bold text-[#642B3B] mt-0.5">
              Swaralaya Academy Management
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Connected operational Google Sheets database engine. Records persist in local session storage and synchronize across the Public Site and Student Hub.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Sheets Sync Active
            </span>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          <div className="p-4 bg-[#FBF7F0] rounded-lg border border-[#E5DFD5]">
            <span className="text-[11px] text-stone-500 uppercase tracking-wider font-medium">
              Registered Students
            </span>
            <p className="text-2xl font-bold font-mono-nums text-[#642B3B] mt-1">
              {students.length}
            </p>
            <span className="text-[10px] text-stone-400">Total active profiles</span>
          </div>

          <div className="p-4 bg-[#FBF7F0] rounded-lg border border-[#E5DFD5]">
            <span className="text-[11px] text-stone-500 uppercase tracking-wider font-medium">
              Monthly Tuition Set
            </span>
            <p className="text-2xl font-bold font-mono-nums text-[#642B3B] mt-1">
              ₹{monthlyTuition.toLocaleString('en-IN')}
            </p>
            <span className="text-[10px] text-stone-400">For 8 × 60 min classes</span>
          </div>

          <div className="p-4 bg-[#FBF7F0] rounded-lg border border-[#E5DFD5]">
            <span className="text-[11px] text-stone-500 uppercase tracking-wider font-medium">
              Tuition Collected
            </span>
            <p className="text-2xl font-bold font-mono-nums text-emerald-700 mt-1">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </p>
            <span className="text-[10px] text-emerald-600 font-medium">
              {totalVerifiedPayments} verified receipts
            </span>
          </div>

          <div className="p-4 bg-[#FBF7F0] rounded-lg border border-[#E5DFD5]">
            <span className="text-[11px] text-stone-500 uppercase tracking-wider font-medium">
              Active Bookings
            </span>
            <p className="text-2xl font-bold font-mono-nums text-[#642B3B] mt-1">
              {activeBookingsCount}
            </p>
            <span className="text-[10px] text-stone-400">Scheduled Google Meet classes</span>
          </div>
        </div>
      </div>

      {/* Operations Checklist & Pricing Config Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Operations Checklist (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl shadow-xs border border-[#E5DFD5] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h2 className="text-sm font-serif-title font-semibold text-[#642B3B]">
              Operations Checklist
            </h2>
            <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Operational
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2.5 p-2.5 bg-stone-50 rounded border border-stone-200">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900">Course and fee plan configuration</strong>
                <p className="text-stone-500 text-[11px]">
                  Disciplines (Vocal, Veena, Violin, Mridangam, Theory) mapped to duration multipliers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 bg-stone-50 rounded border border-stone-200">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900">Tutor assignment workflow</strong>
                <p className="text-stone-500 text-[11px]">
                  5 accredited vidwans and vidushis with language, mode, and rating profiles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 bg-stone-50 rounded border border-stone-200">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900">Class calendar & Google Meet links</strong>
                <p className="text-stone-500 text-[11px]">
                  Timetable matrix synced in IST with one-click direct Google Meet room launch.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 bg-stone-50 rounded border border-stone-200">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900">Payment ledger & receipt workflow</strong>
                <p className="text-stone-500 text-[11px]">
                  Simulated multi-channel checkout (UPI, Card, Net Banking) with GST invoice download.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Configure Fee Plan Box (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl shadow-xs border border-[#E5DFD5] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h2 className="text-sm font-serif-title font-semibold text-[#642B3B]">
              Configure Fee Plan
            </h2>
            <span className="text-[10px] text-stone-500 font-medium">
              Administrator Access
            </span>
          </div>

          <form onSubmit={handleSaveFees} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  One-time registration fee (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono-nums">₹</span>
                  <input
                    type="number"
                    value={tempRegFee}
                    onChange={(e) => setTempRegFee(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none font-mono-nums font-semibold text-stone-900"
                    min={0}
                    step={50}
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Monthly tuition for 8 × 60 min (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono-nums">₹</span>
                  <input
                    type="number"
                    value={tempMonthlyTuition}
                    onChange={(e) => setTempMonthlyTuition(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none font-mono-nums font-semibold text-stone-900"
                    min={500}
                    step={100}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-stone-500">
                Updates live tuition rates for all new student registrations.
              </span>
              <button
                type="submit"
                className="px-4 py-2 bg-[#642B3B] hover:bg-[#401B29] text-white font-medium rounded transition-colors text-xs flex items-center gap-1.5"
              >
                <DollarSign className="w-3.5 h-3.5 text-[#C49A52]" />
                <span>Save Demo Fee Settings</span>
              </button>
            </div>

            {feeSettingsSavedMsg && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Fee structure updated successfully in active session memory.</span>
              </div>
            )}
          </form>
        </div>

      </div>

      {/* Google Sheets Database Tabs Section */}
      <div className="bg-white rounded-xl shadow-xs border border-[#E5DFD5] overflow-hidden">
        
        {/* Sheets Tab Bar (10 Tabs from Section 5 Spec) */}
        <div className="bg-stone-50 border-b border-stone-200 px-4 pt-3 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-1">
            {[
              { id: 'students', label: 'Tab 1 — Students', count: students.length },
              { id: 'bookings', label: 'Tab 4 — Bookings', count: bookings.length },
              { id: 'payments', label: 'Tab 5 — Payments', count: payments.length },
              { id: 'attendance', label: 'Tab 6 — Attendance', count: attendanceRecords.length },
              { id: 'tutors', label: 'Tab 2 — Tutors', count: tutors.length },
              { id: 'courses', label: 'Tab 3 — Courses', count: courses.length },
              { id: 'enquiries', label: 'Tab 7 — Enquiries', count: enquiries.length },
              { id: 'fee_plans', label: 'Tab 8 — Fee Plans', count: feePlans.length },
              { id: 'settings', label: 'Tab 10 — Settings', count: settings.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-2 px-3 text-xs rounded-t font-medium border-t-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-white text-[#642B3B] border-[#642B3B] shadow-xs'
                    : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>{tab.label}</span>
                <span className="px-1.5 py-0.2 bg-stone-200 text-stone-700 rounded-full text-[10px] font-mono-nums">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              const dataMap = {
                students,
                bookings,
                payments,
                attendance: attendanceRecords,
                tutors,
                courses,
                enquiries,
                fee_plans: feePlans,
                settings
              };
              handleExportCSV(activeTab, dataMap[activeTab]);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 mb-2 bg-[#FBF7F0] hover:bg-stone-200 text-stone-800 rounded border border-stone-300 text-xs font-semibold whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 text-[#642B3B]" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Tab Search Filter */}
        <div className="p-4 bg-white border-b border-stone-200 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTab}...`}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#642B3B]"
            />
          </div>
          <span className="text-xs text-stone-400 font-mono-nums">
            Displaying live synchronized records
          </span>
        </div>

        {/* Tab Content Display */}
        <div className="overflow-x-auto p-4">
          
          {/* Tab 1: Students */}
          {activeTab === 'students' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider bg-stone-50">
                  <th className="py-2.5 px-3">Student_ID</th>
                  <th className="py-2.5 px-3">Full_Name</th>
                  <th className="py-2.5 px-3">Email & Phone</th>
                  <th className="py-2.5 px-3">Age / Language</th>
                  <th className="py-2.5 px-3">Course_ID</th>
                  <th className="py-2.5 px-3">Mode</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Start_Date</th>
                  <th className="py-2.5 px-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {students
                  .filter((s) => s.Full_Name.toLowerCase().includes(searchQuery.toLowerCase()) || s.Student_ID.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((s) => (
                    <tr key={s.Student_ID} className="hover:bg-stone-50/60">
                      <td className="py-3 px-3 font-mono-nums font-semibold text-stone-900">
                        {s.Student_ID}
                      </td>
                      <td className="py-3 px-3 font-medium text-stone-900">{s.Full_Name}</td>
                      <td className="py-3 px-3">
                        <div>{s.Email}</div>
                        <div className="text-[11px] text-stone-400 font-mono-nums">{s.Phone}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div>{s.Age_Group}</div>
                        <div className="text-[11px] text-stone-400">{s.Preferred_Language}</div>
                      </td>
                      <td className="py-3 px-3 font-mono-nums">{s.Course_ID}</td>
                      <td className="py-3 px-3">{s.Preferred_Mode}</td>
                      <td className="py-3 px-3">
                        <select
                          value={s.Student_Status}
                          onChange={(e) => handleStudentStatusChange(s.Student_ID, e.target.value as StudentStatus)}
                          className="px-2 py-1 text-[11px] font-semibold rounded bg-stone-100 border border-stone-200 text-stone-800 focus:outline-none"
                        >
                          <option value="Active">Active</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Awaiting Payment">Awaiting Payment</option>
                          <option value="Paused">Paused</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 font-mono-nums">{s.Start_Date}</td>
                      <td className="py-3 px-3">
                        <span className="text-[11px] text-emerald-700 font-medium">Enrolled</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* Tab 4: Bookings */}
          {activeTab === 'bookings' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider bg-stone-50">
                  <th className="py-2.5 px-3">Booking_ID</th>
                  <th className="py-2.5 px-3">Student_ID</th>
                  <th className="py-2.5 px-3">Tutor_ID</th>
                  <th className="py-2.5 px-3">Session_Date & Time</th>
                  <th className="py-2.5 px-3">Mode & Location</th>
                  <th className="py-2.5 px-3">Google Meet Link</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {bookings.map((b) => (
                  <tr key={b.Booking_ID} className="hover:bg-stone-50/60">
                    <td className="py-3 px-3 font-mono-nums font-semibold text-stone-900">{b.Booking_ID}</td>
                    <td className="py-3 px-3 font-mono-nums">{b.Student_ID}</td>
                    <td className="py-3 px-3 font-mono-nums">{b.Tutor_ID}</td>
                    <td className="py-3 px-3">
                      <span className="font-mono-nums font-medium text-stone-900">{b.Session_Date}</span>
                      <span className="block text-[11px] text-stone-500 font-mono-nums">{b.Start_Time} - {b.End_Time}</span>
                    </td>
                    <td className="py-3 px-3">{b.Teaching_Mode} · {b.Meeting_Location}</td>
                    <td className="py-3 px-3">
                      <a href={b.Meeting_Link_Restricted} target="_blank" rel="noreferrer" className="text-[#642B3B] hover:underline font-mono text-[11px] truncate max-w-[160px] block">
                        {b.Meeting_Link_Restricted}
                      </a>
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={b.Booking_Status}
                        onChange={(e) => handleBookingStatusChange(b.Booking_ID, e.target.value as BookingStatus)}
                        className="px-2 py-1 text-[11px] font-semibold rounded bg-stone-100 border border-stone-200 text-stone-800"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Requested">Requested</option>
                        <option value="Completed">Completed</option>
                        <option value="Reschedule Requested">Reschedule Requested</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Tab 5: Payments */}
          {activeTab === 'payments' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider bg-stone-50">
                  <th className="py-2.5 px-3">Payment_ID</th>
                  <th className="py-2.5 px-3">Receipt_Ref</th>
                  <th className="py-2.5 px-3">Student_Name</th>
                  <th className="py-2.5 px-3">Amount_Received</th>
                  <th className="py-2.5 px-3">Method & Txn_Ref</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Verification</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {payments.map((p) => (
                  <tr key={p.Payment_ID} className="hover:bg-stone-50/60">
                    <td className="py-3 px-3 font-mono-nums">{p.Payment_ID}</td>
                    <td className="py-3 px-3 font-mono-nums font-bold text-stone-900">{p.Receipt_Reference}</td>
                    <td className="py-3 px-3 font-medium text-stone-900">{p.Student_Name}</td>
                    <td className="py-3 px-3 font-mono-nums font-bold text-[#642B3B]">₹{p.Amount_Received.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3">
                      <span>{p.Payment_Method}</span>
                      <span className="block text-[10px] text-stone-400 font-mono-nums">{p.Transaction_Reference}</span>
                    </td>
                    <td className="py-3 px-3 font-mono-nums">{p.Payment_Date}</td>
                    <td className="py-3 px-3">
                      <select
                        value={p.Verification_Status}
                        onChange={(e) => handlePaymentStatusChange(p.Payment_ID, e.target.value as PaymentStatus)}
                        className="px-2 py-1 text-[11px] font-semibold rounded bg-stone-100 border border-stone-200 text-emerald-800"
                      >
                        <option value="Verified">Verified</option>
                        <option value="Pending">Pending</option>
                        <option value="Partially Paid">Partially Paid</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onViewInvoice(p)}
                        className="px-2.5 py-1 bg-[#642B3B] text-white rounded text-[11px] hover:bg-[#401B29] transition-colors"
                      >
                        Print Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Tab 6: Attendance */}
          {activeTab === 'attendance' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider bg-stone-50">
                  <th className="py-2.5 px-3">Attendance_ID</th>
                  <th className="py-2.5 px-3">Student_Name</th>
                  <th className="py-2.5 px-3">Tutor_Name</th>
                  <th className="py-2.5 px-3">Session_Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Tutor_Notes</th>
                  <th className="py-2.5 px-3">Makeup_Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {attendanceRecords.map((a) => (
                  <tr key={a.Attendance_ID} className="hover:bg-stone-50/60">
                    <td className="py-3 px-3 font-mono-nums">{a.Attendance_ID}</td>
                    <td className="py-3 px-3 font-medium text-stone-900">{a.Student_Name}</td>
                    <td className="py-3 px-3">{a.Tutor_Name}</td>
                    <td className="py-3 px-3 font-mono-nums">{a.Session_Date}</td>
                    <td className="py-3 px-3 font-semibold text-emerald-700">{a.Attendance_Status}</td>
                    <td className="py-3 px-3 text-stone-600 max-w-xs">{a.Tutor_Notes}</td>
                    <td className="py-3 px-3">{a.Makeup_Required ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Tab 2: Tutors */}
          {activeTab === 'tutors' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider bg-stone-50">
                  <th className="py-2.5 px-3">Tutor_ID</th>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Specialisation</th>
                  <th className="py-2.5 px-3">Weekly_Capacity</th>
                  <th className="py-2.5 px-3">Languages</th>
                  <th className="py-2.5 px-3">Rating</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {tutors.map((t) => (
                  <tr key={t.Tutor_ID} className="hover:bg-stone-50/60">
                    <td className="py-3 px-3 font-mono-nums font-semibold text-stone-900">{t.Tutor_ID}</td>
                    <td className="py-3 px-3 font-medium text-stone-900">{t.Tutor_Name}</td>
                    <td className="py-3 px-3">{t.Specialisation}</td>
                    <td className="py-3 px-3 font-mono-nums">{t.Weekly_Capacity} hrs/week</td>
                    <td className="py-3 px-3">{t.Languages.join(', ')}</td>
                    <td className="py-3 px-3 text-[#C49A52] font-semibold">★ {t.Rating}</td>
                    <td className="py-3 px-3 text-emerald-700 font-semibold">{t.Active_Status ? 'Active' : 'Inactive'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Tab 3: Courses */}
          {activeTab === 'courses' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider bg-stone-50">
                  <th className="py-2.5 px-3">Course_ID</th>
                  <th className="py-2.5 px-3">Course_Name</th>
                  <th className="py-2.5 px-3">Level</th>
                  <th className="py-2.5 px-3">Classes/Month</th>
                  <th className="py-2.5 px-3">Monthly_Fee (₹)</th>
                  <th className="py-2.5 px-3">Reg_Fee (₹)</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {courses.map((c) => (
                  <tr key={c.Course_ID} className="hover:bg-stone-50/60">
                    <td className="py-3 px-3 font-mono-nums font-semibold text-stone-900">{c.Course_ID}</td>
                    <td className="py-3 px-3 font-medium text-stone-900">{c.Course_Name}</td>
                    <td className="py-3 px-3">{c.Level}</td>
                    <td className="py-3 px-3 font-mono-nums">{c.Classes_Per_Month} × {c.Default_Duration_Minutes}m</td>
                    <td className="py-3 px-3 font-mono-nums font-bold text-[#642B3B]">₹{c.Monthly_Fee.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 font-mono-nums">₹{c.Registration_Fee}</td>
                    <td className="py-3 px-3 text-emerald-700 font-semibold">{c.Active_Status ? 'Active' : 'Inactive'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Tab 7: Enquiries */}
          {activeTab === 'enquiries' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider bg-stone-50">
                  <th className="py-2.5 px-3">Enquiry_ID</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Name & Contact</th>
                  <th className="py-2.5 px-3">Course_Interest</th>
                  <th className="py-2.5 px-3">Message</th>
                  <th className="py-2.5 px-3">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {enquiries.map((e) => (
                  <tr key={e.Enquiry_ID} className="hover:bg-stone-50/60">
                    <td className="py-3 px-3 font-mono-nums font-semibold text-stone-900">{e.Enquiry_ID}</td>
                    <td className="py-3 px-3 font-mono-nums">{e.Date_Received}</td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-stone-900">{e.Name}</div>
                      <div className="text-[11px] text-stone-400 font-mono-nums">{e.Email} · {e.Phone}</div>
                    </td>
                    <td className="py-3 px-3">{e.Course_Interest} ({e.Learning_Level})</td>
                    <td className="py-3 px-3 text-stone-600 max-w-xs">{e.Enquiry_Message}</td>
                    <td className="py-3 px-3 text-emerald-700 font-medium">{e.Outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Tab 8: Fee Plans */}
          {activeTab === 'fee_plans' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider bg-stone-50">
                  <th className="py-2.5 px-3">Plan_ID</th>
                  <th className="py-2.5 px-3">Plan_Name</th>
                  <th className="py-2.5 px-3">Sessions</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Registration_Fee</th>
                  <th className="py-2.5 px-3">Monthly_Fee</th>
                  <th className="py-2.5 px-3">Discount Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {feePlans.map((fp) => (
                  <tr key={fp.Plan_ID} className="hover:bg-stone-50/60">
                    <td className="py-3 px-3 font-mono-nums font-semibold text-stone-900">{fp.Plan_ID}</td>
                    <td className="py-3 px-3 font-medium text-stone-900">{fp.Plan_Name}</td>
                    <td className="py-3 px-3 font-mono-nums">{fp.Classes_Per_Month} / month</td>
                    <td className="py-3 px-3 font-mono-nums">{fp.Duration_Minutes} min</td>
                    <td className="py-3 px-3 font-mono-nums">₹{fp.Registration_Fee}</td>
                    <td className="py-3 px-3 font-mono-nums font-bold text-[#642B3B]">₹{fp.Monthly_Fee}</td>
                    <td className="py-3 px-3 text-stone-500">{fp.Discount_Rules}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Tab 10: Settings */}
          {activeTab === 'settings' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider bg-stone-50">
                  <th className="py-2.5 px-3">Setting_Key</th>
                  <th className="py-2.5 px-3">Setting_Value</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Last_Updated</th>
                  <th className="py-2.5 px-3">Updated_By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {settings.map((st) => (
                  <tr key={st.Setting_Key} className="hover:bg-stone-50/60">
                    <td className="py-3 px-3 font-mono-nums font-semibold text-stone-900">{st.Setting_Key}</td>
                    <td className="py-3 px-3 font-mono text-stone-800 max-w-xs">{st.Setting_Value}</td>
                    <td className="py-3 px-3 text-stone-500">{st.Description}</td>
                    <td className="py-3 px-3 font-mono-nums">{st.Last_Updated}</td>
                    <td className="py-3 px-3">{st.Updated_By}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>

      </div>

    </div>
  );
};
