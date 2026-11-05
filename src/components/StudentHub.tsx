import React, { useState } from 'react';
import { Student, Booking, Payment, AttendanceRecord, Course, Tutor } from '../types/academy';
import { Video, Calendar, Clock, Download, CheckCircle, AlertTriangle, RefreshCw, Volume2, VolumeX, ShieldCheck, User } from 'lucide-react';

interface StudentHubProps {
  currentStudent: Student;
  allStudents: Student[];
  onSelectStudent: (student: Student) => void;
  bookings: Booking[];
  payments: Payment[];
  attendanceRecords: AttendanceRecord[];
  courses: Course[];
  tutors: Tutor[];
  onViewInvoice: (payment: Payment) => void;
  onRequestReschedule: (booking: Booking, reason: string, altDate: string, altTime: string) => void;
}

export const StudentHub: React.FC<StudentHubProps> = ({
  currentStudent,
  allStudents,
  onSelectStudent,
  bookings,
  payments,
  attendanceRecords,
  courses,
  tutors,
  onViewInvoice,
  onRequestReschedule
}) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'attendance' | 'payments' | 'practice'>('schedule');
  const [selectedBookingForReschedule, setSelectedBookingForReschedule] = useState<Booking | null>(null);
  const [rescheduleReason, setRescheduleReason] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('06:00 PM IST');
  const [rescheduleSuccess, setRescheduleSuccess] = useState('');

  // Tanpura Audio Drone State (Web Audio API)
  const [isTanpuraPlaying, setIsTanpuraPlaying] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [droneOscillators, setDroneOscillators] = useState<OscillatorNode[]>([]);
  const [selectedPitch, setSelectedPitch] = useState<'C' | 'C#' | 'D' | 'D#' | 'G'>('C#');

  const studentBookings = bookings.filter((b) => b.Student_ID === currentStudent.Student_ID);
  const studentPayments = payments.filter((p) => p.Student_ID === currentStudent.Student_ID);
  const studentAttendance = attendanceRecords.filter((a) => a.Student_ID === currentStudent.Student_ID);

  const studentCourse = courses.find((c) => c.Course_ID === currentStudent.Course_ID);
  const assignedTutor = tutors.find((t) => t.Tutor_ID === currentStudent.Preferred_Tutor_ID) || tutors[0];

  // Tanpura Synthesizer using Web Audio API (Sa - Pa - Sa' drone)
  const toggleTanpura = () => {
    if (isTanpuraPlaying) {
      droneOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // Ignore
        }
      });
      setDroneOscillators([]);
      setIsTanpuraPlaying(false);
      return;
    }

    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      setAudioCtx(ctx);

      // Pitch mapping (frequencies in Hz)
      const pitchMap = {
        'C': { sa: 130.81, pa: 196.00, saHigh: 261.63 },
        'C#': { sa: 138.59, pa: 207.65, saHigh: 277.18 }, // Standard Carnatic female/male pitch
        'D': { sa: 146.83, pa: 220.00, saHigh: 293.66 },
        'D#': { sa: 155.56, pa: 233.08, saHigh: 311.13 },
        'G': { sa: 98.00, pa: 146.83, saHigh: 196.00 }
      };

      const freqs = pitchMap[selectedPitch] || pitchMap['C#'];

      const gain = ctx.createGain();
      gain.gain.value = 0.15;
      gain.connect(ctx.destination);

      const oscs: OscillatorNode[] = [];

      // 1st Pa string
      const oscPa = ctx.createOscillator();
      oscPa.type = 'sawtooth';
      oscPa.frequency.setValueAtTime(freqs.pa, ctx.currentTime);
      oscPa.connect(gain);
      oscPa.start();
      oscs.push(oscPa);

      // 2nd Sa high string
      const oscSa1 = ctx.createOscillator();
      oscSa1.type = 'triangle';
      oscSa1.frequency.setValueAtTime(freqs.saHigh, ctx.currentTime);
      oscSa1.connect(gain);
      oscSa1.start();
      oscs.push(oscSa1);

      // 3rd Kharaj Sa string
      const oscKharaj = ctx.createOscillator();
      oscKharaj.type = 'sine';
      oscKharaj.frequency.setValueAtTime(freqs.sa, ctx.currentTime);
      oscKharaj.connect(gain);
      oscKharaj.start();
      oscs.push(oscKharaj);

      setDroneOscillators(oscs);
      setIsTanpuraPlaying(true);
    } catch (e) {
      console.error('AudioContext failed:', e);
    }
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForReschedule) return;

    onRequestReschedule(
      selectedBookingForReschedule,
      rescheduleReason,
      rescheduleDate,
      rescheduleTime
    );

    setRescheduleSuccess('Your class change request has been sent to the administrator and tutor for approval.');
    setTimeout(() => {
      setSelectedBookingForReschedule(null);
      setRescheduleSuccess('');
      setRescheduleReason('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Student Welcome Header */}
      <div className="bg-[#401B29] text-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#642B3B]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#642B3B] border-2 border-[#C49A52] flex items-center justify-center text-xl font-bold font-serif-title text-[#FBF7F0] shadow-inner">
              {currentStudent.Full_Name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#C49A52] font-semibold">
                  Enrolled Learner
                </span>
                <span className="text-white/40">·</span>
                <span className="text-xs text-white/80 font-mono-nums">
                  {currentStudent.Student_ID}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-white mt-0.5">
                {currentStudent.Full_Name}
              </h1>
              <p className="text-xs sm:text-sm text-[#FBF7F0]/80 mt-1">
                {studentCourse?.Course_Name || 'Carnatic Music Discipline'} · {currentStudent.Level} · Mode: {currentStudent.Preferred_Mode}
              </p>
            </div>
          </div>

          {/* Quick Stats & Student Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {allStudents.length > 1 && (
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 text-xs">
                <User className="w-3.5 h-3.5 text-[#C49A52]" />
                <span className="text-white/70">Switch Student:</span>
                <select
                  value={currentStudent.Student_ID}
                  onChange={(e) => {
                    const st = allStudents.find((s) => s.Student_ID === e.target.value);
                    if (st) onSelectStudent(st);
                  }}
                  className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                >
                  {allStudents.map((s) => (
                    <option key={s.Student_ID} value={s.Student_ID} className="bg-stone-900 text-white">
                      {s.Full_Name} ({s.Student_ID})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Tanpura Quick Launcher */}
            <button
              onClick={toggleTanpura}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                isTanpuraPlaying
                  ? 'bg-[#C49A52] text-[#401B29] animate-pulse'
                  : 'bg-[#642B3B] text-white hover:bg-[#642B3B]/80 border border-white/20'
              }`}
            >
              {isTanpuraPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{isTanpuraPlaying ? `Tanpura Drone (${selectedPitch}) Active` : 'Tanpura Drone'}</span>
            </button>
          </div>
        </div>

        {/* Tanpura Pitch bar if active */}
        {isTanpuraPlaying && (
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-stone-300">Acoustic Śruti Drone Pitch:</span>
            <div className="flex items-center gap-1.5">
              {(['C', 'C#', 'D', 'D#', 'G'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setSelectedPitch(p);
                    if (isTanpuraPlaying) {
                      toggleTanpura();
                      setTimeout(toggleTanpura, 100);
                    }
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                    selectedPitch === p ? 'bg-[#C49A52] text-black font-bold' : 'bg-white/10 text-white'
                  }`}
                >
                  {p} (Kattai)
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5DFD5] pb-2 text-xs font-medium">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`py-2 px-4 rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'schedule'
              ? 'bg-[#642B3B] text-white font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Class Schedule & Meet Links</span>
          <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
            {studentBookings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('attendance')}
          className={`py-2 px-4 rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'attendance'
              ? 'bg-[#642B3B] text-white font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Attendance Tracker</span>
          <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
            {studentAttendance.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`py-2 px-4 rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'payments'
              ? 'bg-[#642B3B] text-white font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Receipts & Tax Invoices</span>
          <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
            {studentPayments.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`py-2 px-4 rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'practice'
              ? 'bg-[#642B3B] text-white font-semibold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Syllabus & Lesson Riaz</span>
        </button>
      </div>

      {/* Tab 1: Schedule & Google Meet */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-xs border border-[#E5DFD5] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-serif-title font-semibold text-[#642B3B]">
                  Upcoming Confirmed Lessons
                </h3>
                <p className="text-xs text-stone-500">
                  Google Meet links become active 10 minutes prior to session start.
                </p>
              </div>
              <span className="text-xs text-[#C49A52] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                Time Zone: IST (UTC+05:30)
              </span>
            </div>

            {studentBookings.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-lg border border-dashed border-stone-200 text-xs text-stone-500">
                No active bookings currently scheduled. Administrator will allocate your tutor slots shortly.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {studentBookings.map((b) => (
                  <div
                    key={b.Booking_ID}
                    className="p-5 rounded-xl border border-stone-200 bg-[#FBF7F0]/40 hover:border-[#642B3B]/40 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-200">
                        <span className="font-mono-nums font-semibold">{b.Session_Date}</span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded text-[10px] border border-emerald-200">
                          {b.Booking_Status}
                        </span>
                      </div>

                      <div className="mt-3">
                        <h4 className="font-semibold text-stone-900 text-sm">
                          {assignedTutor?.Tutor_Name}
                        </h4>
                        <p className="text-xs text-stone-500 mt-0.5">{assignedTutor?.Specialisation}</p>
                        <p className="text-xs text-[#642B3B] font-semibold mt-2 flex items-center gap-1.5 font-mono-nums">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{b.Start_Time} – {b.End_Time}</span>
                        </p>
                        <p className="text-xs text-stone-600 mt-1">
                          Mode: <span className="font-medium">{b.Teaching_Mode}</span> · {b.Meeting_Location}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
                      <a
                        href={b.Meeting_Link_Restricted}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 bg-[#642B3B] hover:bg-[#401B29] text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      >
                        <Video className="w-3.5 h-3.5 text-[#C49A52]" />
                        <span>Join Google Meet Class</span>
                      </a>
                      <button
                        onClick={() => setSelectedBookingForReschedule(b)}
                        className="py-1 px-2 text-[11px] text-stone-600 hover:text-stone-900 hover:underline flex items-center justify-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Request Reschedule</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Assigned Tutor Card */}
          <div className="bg-white rounded-xl shadow-xs border border-[#E5DFD5] p-6 flex flex-col sm:flex-row items-center gap-6">
            <img
              src={assignedTutor.Image_Url}
              alt={assignedTutor.Tutor_Name}
              className="w-24 h-24 rounded-full object-cover border-2 border-[#C49A52] shadow-sm shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#C49A52] font-semibold">
                Your Assigned Guru / Tutor
              </span>
              <h3 className="text-lg font-serif-title font-bold text-[#642B3B]">
                {assignedTutor.Tutor_Name}
              </h3>
              <p className="text-stone-700 font-medium">{assignedTutor.Qualifications}</p>
              <p className="text-stone-500 leading-relaxed">{assignedTutor.Experience}</p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-stone-600">
                <span>Languages: <strong>{assignedTutor.Languages.join(', ')}</strong></span>
                <span>·</span>
                <span>Rating: <strong>★ {assignedTutor.Rating}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Attendance Tracker */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-xl shadow-xs border border-[#E5DFD5] p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-serif-title font-semibold text-[#642B3B]">
                Session Attendance & Progress Tracker
              </h3>
              <p className="text-xs text-stone-500">
                Official attendance records verified after each conducted session.
              </p>
            </div>
            
            {/* Quick Summary Pill */}
            <div className="flex items-center gap-3 text-xs">
              <div className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded border border-emerald-200">
                Completed: <strong>{studentAttendance.filter((a) => a.Attendance_Status === 'Present').length} classes</strong>
              </div>
              <div className="px-3 py-1 bg-amber-50 text-amber-800 rounded border border-amber-200">
                Makeup Required: <strong>{studentAttendance.filter((a) => a.Makeup_Required).length}</strong>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider bg-stone-50">
                  <th className="py-2.5 px-3 font-semibold">Date</th>
                  <th className="py-2.5 px-3 font-semibold">Tutor</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold">Tutor Notes & Riaz Instruction</th>
                  <th className="py-2.5 px-3 font-semibold">Makeup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {studentAttendance.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-stone-400">
                      No past completed sessions recorded yet.
                    </td>
                  </tr>
                ) : (
                  studentAttendance.map((rec) => (
                    <tr key={rec.Attendance_ID} className="hover:bg-stone-50/60">
                      <td className="py-3 px-3 font-mono-nums font-medium text-stone-900">
                        {rec.Session_Date}
                      </td>
                      <td className="py-3 px-3">{rec.Tutor_Name}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded ${
                            rec.Attendance_Status === 'Present'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {rec.Attendance_Status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-stone-600 max-w-xs">{rec.Tutor_Notes}</td>
                      <td className="py-3 px-3">
                        {rec.Makeup_Required ? (
                          <span className="text-amber-700 font-semibold flex items-center gap-1 text-[11px]">
                            <AlertTriangle className="w-3 h-3" /> Scheduled
                          </span>
                        ) : (
                          <span className="text-stone-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Receipts & Tax Invoices */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-xl shadow-xs border border-[#E5DFD5] p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif-title font-semibold text-[#642B3B]">
                Tuition Payment Receipts & Invoices
              </h3>
              <p className="text-xs text-stone-500">
                Official GST-compliant receipts generated upon online tuition settlement.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider bg-stone-50">
                  <th className="py-2.5 px-3 font-semibold">Receipt Ref</th>
                  <th className="py-2.5 px-3 font-semibold">Billing Period</th>
                  <th className="py-2.5 px-3 font-semibold">Date</th>
                  <th className="py-2.5 px-3 font-semibold">Method</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Amount (₹)</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {studentPayments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-stone-400">
                      No payment records found.
                    </td>
                  </tr>
                ) : (
                  studentPayments.map((p) => (
                    <tr key={p.Payment_ID} className="hover:bg-stone-50/60">
                      <td className="py-3 px-3 font-mono-nums font-semibold text-stone-900">
                        {p.Receipt_Reference}
                      </td>
                      <td className="py-3 px-3">{p.Billing_Period}</td>
                      <td className="py-3 px-3 font-mono-nums">{p.Payment_Date}</td>
                      <td className="py-3 px-3">
                        <span className="font-medium text-stone-800">{p.Payment_Method}</span>
                        <span className="block text-[10px] text-stone-400 font-mono-nums">
                          {p.Transaction_Reference}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono-nums font-bold text-stone-900">
                        ₹{p.Amount_Received.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-semibold rounded text-[10px] border border-emerald-200">
                          {p.Verification_Status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => onViewInvoice(p)}
                          className="px-2.5 py-1 bg-[#642B3B] hover:bg-[#401B29] text-white rounded font-medium text-[11px] transition-colors inline-flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>View Invoice</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Practice & Syllabus */}
      {activeTab === 'practice' && (
        <div className="bg-white rounded-xl shadow-xs border border-[#E5DFD5] p-6 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs uppercase tracking-wider text-[#C49A52] font-semibold">
              Curriculum Roadmap
            </span>
            <h3 className="text-lg font-serif-title font-bold text-[#642B3B]">
              {studentCourse?.Course_Name}
            </h3>
            <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
              {studentCourse?.Description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {studentCourse?.Syllabus.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-stone-50 rounded-lg border border-stone-200 flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-[#642B3B] text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900">{item}</h4>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    Recommended daily riaz: 30–45 mins with Tanpura drone.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reschedule Modal (Form C Workflow) */}
      {selectedBookingForReschedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-stone-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-serif-title font-semibold text-base text-[#642B3B]">
                Request Class Reschedule (Form C)
              </h3>
              <button
                onClick={() => setSelectedBookingForReschedule(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600">
              Rescheduling session on <strong>{selectedBookingForReschedule.Session_Date}</strong> ({selectedBookingForReschedule.Start_Time}).
              Changes are subject to tutor calendar confirmation.
            </p>

            <form onSubmit={handleRescheduleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Reason for Rescheduling <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  placeholder="e.g. Travel, academic exam, health reason"
                  rows={2}
                  className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Preferred Alternative Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Preferred Alternative Time Slot
                </label>
                <select
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none bg-white font-mono-nums"
                >
                  <option value="07:00 AM IST">07:00 AM IST</option>
                  <option value="10:00 AM IST">10:00 AM IST</option>
                  <option value="05:00 PM IST">05:00 PM IST</option>
                  <option value="06:00 PM IST">06:00 PM IST</option>
                  <option value="07:00 PM IST">07:00 PM IST</option>
                </select>
              </div>

              {rescheduleSuccess && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs">
                  {rescheduleSuccess}
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedBookingForReschedule(null)}
                  className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#642B3B] hover:bg-[#401B29] text-white font-medium rounded transition-colors"
                >
                  Submit Change Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
