import React, { useState, useEffect } from 'react';
import {
  INITIAL_COURSES,
  INITIAL_TUTORS,
  INITIAL_STUDENTS,
  INITIAL_BOOKINGS,
  INITIAL_PAYMENTS,
  INITIAL_ATTENDANCE,
  INITIAL_ENQUIRIES,
  INITIAL_FEE_PLANS,
  INITIAL_SETTINGS,
  STORAGE_KEYS,
  loadStoredData,
  saveStoredData
} from './data/initialData';
import {
  Course,
  Tutor,
  Student,
  Booking,
  Payment,
  AttendanceRecord,
  Enquiry,
  FeePlan,
  Setting
} from './types/academy';
import { PublicWebsite } from './components/PublicWebsite';
import { StudentRegistrationForm } from './components/StudentRegistrationForm';
import { StudentHub } from './components/StudentHub';
import { AdminConsole } from './components/AdminConsole';
import { PaymentModal } from './components/PaymentModal';
import { InvoiceModal } from './components/InvoiceModal';
import { Globe, User, ShieldCheck, PenTool, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<'public' | 'register' | 'student' | 'admin'>('public');

  // Core Data Stores
  const [courses, setCourses] = useState<Course[]>(() =>
    loadStoredData(STORAGE_KEYS.COURSES, INITIAL_COURSES)
  );
  const [tutors, setTutors] = useState<Tutor[]>(() =>
    loadStoredData(STORAGE_KEYS.TUTORS, INITIAL_TUTORS)
  );
  const [students, setStudents] = useState<Student[]>(() =>
    loadStoredData(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS)
  );
  const [bookings, setBookings] = useState<Booking[]>(() =>
    loadStoredData(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS)
  );
  const [payments, setPayments] = useState<Payment[]>(() =>
    loadStoredData(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS)
  );
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() =>
    loadStoredData(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE)
  );
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() =>
    loadStoredData(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES)
  );
  const [feePlans, setFeePlans] = useState<FeePlan[]>(() =>
    loadStoredData(STORAGE_KEYS.FEE_PLANS, INITIAL_FEE_PLANS)
  );
  const [settings, setSettings] = useState<Setting[]>(() =>
    loadStoredData(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS)
  );

  // Active student in Student Hub
  const [activeStudent, setActiveStudent] = useState<Student>(() => students[0] || INITIAL_STUDENTS[0]);

  // Fee configuration
  const [regFee, setRegFee] = useState<number>(300);
  const [monthlyTuition, setMonthlyTuition] = useState<number>(2000);

  // Active Modals
  const [pendingPayment, setPendingPayment] = useState<{
    student: Student;
    course: Course;
    totalAmount: number;
    discountAmount: number;
  } | null>(null);

  const [activeInvoicePayment, setActiveInvoicePayment] = useState<Payment | null>(null);

  // Sync to localStorage
  useEffect(() => {
    saveStoredData(STORAGE_KEYS.STUDENTS, students);
  }, [students]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.BOOKINGS, bookings);
  }, [bookings]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.PAYMENTS, payments);
  }, [payments]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.ENQUIRIES, enquiries);
  }, [enquiries]);

  // Handle successful registration payment
  const handlePaymentSuccess = (newPayment: Payment) => {
    if (!pendingPayment) return;

    const { student, course } = pendingPayment;

    // 1. Add student to students list
    const updatedStudents = [student, ...students];
    setStudents(updatedStudents);
    setActiveStudent(student);

    // 2. Add payment record
    const updatedPayments = [newPayment, ...payments];
    setPayments(updatedPayments);

    // 3. Create initial booking with meeting link
    const initialBooking: Booking = {
      Booking_ID: `BKG-${Math.floor(100 + Math.random() * 900)}`,
      Student_ID: student.Student_ID,
      Tutor_ID: student.Preferred_Tutor_ID || 'TUT-001',
      Course_ID: course.Course_ID,
      Session_Date: student.Start_Date,
      Start_Time: '06:00 PM',
      End_Time: '07:00 PM',
      Time_Zone: 'IST (UTC+05:30)',
      Teaching_Mode: student.Preferred_Mode,
      Meeting_Location: student.Preferred_Mode === 'In-person' ? 'Alwarpet Studio Hall 1' : 'Google Meet Video Room',
      Meeting_Link_Restricted: `https://meet.google.com/swara-${student.Student_ID.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      Booking_Status: 'Confirmed',
      Calendar_Event_ID: `cal_evt_${Date.now()}`,
      Created_Date: new Date().toISOString().split('T')[0],
      Last_Updated: new Date().toISOString().split('T')[0]
    };

    setBookings([initialBooking, ...bookings]);

    // Close payment modal and launch the invoice modal
    setPendingPayment(null);
    setActiveInvoicePayment(newPayment);
    setCurrentView('student');
  };

  const handleEnquirySubmit = (newEnquiryData: Partial<Enquiry>) => {
    const newEnq: Enquiry = {
      Enquiry_ID: `ENQ-00${enquiries.length + 1}`,
      Date_Received: new Date().toISOString().split('T')[0],
      Name: newEnquiryData.Name || 'Anonymous',
      Email: newEnquiryData.Email || 'unknown@domain.com',
      Phone: newEnquiryData.Phone || '',
      Course_Interest: newEnquiryData.Course_Interest || 'Carnatic Vocal',
      Learning_Level: newEnquiryData.Learning_Level || 'Beginner',
      Preferred_Mode: newEnquiryData.Preferred_Mode || 'Hybrid',
      Enquiry_Message: newEnquiryData.Enquiry_Message || '',
      Follow_Up_Date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      Follow_Up_Status: 'Pending Review',
      Assigned_Staff: 'Admissions Desk',
      Outcome: 'Under Review'
    };

    setEnquiries([newEnq, ...enquiries]);
  };

  const handleRescheduleRequest = (booking: Booking, reason: string, altDate: string, altTime: string) => {
    const updated = bookings.map((b) =>
      b.Booking_ID === booking.Booking_ID
        ? {
            ...b,
            Booking_Status: 'Reschedule Requested' as const,
            Change_Reason: `Requested: ${altDate} at ${altTime}. Reason: ${reason}`
          }
        : b
    );
    setBookings(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F0] text-[#28242A]">
      
      {/* Top Persistent Unified Role Switcher Bar */}
      <nav className="no-print bg-[#401B29] text-white border-b border-[#642B3B] px-4 py-2.5 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-2.5">
            <span className="text-[#C49A52] text-lg leading-none">♫</span>
            <div className="flex items-center gap-1.5">
              <span className="font-serif-title font-bold tracking-wider text-sm">
                SWARALAYA
              </span>
              <span className="text-stone-400 text-[11px] hidden md:inline">
                · Carnatic Music Academy
              </span>
            </div>
          </div>

          {/* View Switcher Controls */}
          <div className="flex items-center p-1 bg-black/30 rounded-lg border border-white/10">
            <button
              onClick={() => setCurrentView('public')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                currentView === 'public'
                  ? 'bg-[#642B3B] text-white shadow-xs font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#C49A52]" />
              <span>Public Website</span>
            </button>

            <button
              onClick={() => setCurrentView('register')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                currentView === 'register'
                  ? 'bg-[#642B3B] text-white shadow-xs font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <PenTool className="w-3.5 h-3.5 text-[#C49A52]" />
              <span>Register (01-03)</span>
            </button>

            <button
              onClick={() => setCurrentView('student')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                currentView === 'student'
                  ? 'bg-[#642B3B] text-white shadow-xs font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#C49A52]" />
              <span>Student Hub</span>
            </button>

            <button
              onClick={() => setCurrentView('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                currentView === 'admin'
                  ? 'bg-[#642B3B] text-white shadow-xs font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C49A52]" />
              <span>Admin Console</span>
            </button>
          </div>

          {/* Quick Enrolment Status Indicator */}
          <div className="hidden lg:flex items-center gap-3 text-[11px] text-stone-300">
            <span>
              Students: <strong className="text-white font-mono-nums">{students.length}</strong>
            </span>
            <span>·</span>
            <span>
              Bookings: <strong className="text-white font-mono-nums">{bookings.length}</strong>
            </span>
          </div>

        </div>
      </nav>

      {/* Main Content Area Based on Active View */}
      <main className="flex-1">
        {currentView === 'public' && (
          <PublicWebsite
            courses={courses}
            tutors={tutors}
            onNavigateToRegistration={() => setCurrentView('register')}
            onNavigateToStudentHub={() => setCurrentView('student')}
            onNavigateToAdmin={() => setCurrentView('admin')}
            onSubmitEnquiry={handleEnquirySubmit}
          />
        )}

        {currentView === 'register' && (
          <StudentRegistrationForm
            courses={courses}
            baseRegFee={regFee}
            baseTuition={monthlyTuition}
            onInitiatePayment={(data) => setPendingPayment(data)}
            onNavigateToPortal={() => setCurrentView('student')}
          />
        )}

        {currentView === 'student' && (
          <StudentHub
            currentStudent={activeStudent}
            allStudents={students}
            onSelectStudent={(st) => setActiveStudent(st)}
            bookings={bookings}
            payments={payments}
            attendanceRecords={attendanceRecords}
            courses={courses}
            tutors={tutors}
            onViewInvoice={(pmt) => setActiveInvoicePayment(pmt)}
            onRequestReschedule={handleRescheduleRequest}
          />
        )}

        {currentView === 'admin' && (
          <AdminConsole
            students={students}
            onUpdateStudents={setStudents}
            tutors={tutors}
            courses={courses}
            bookings={bookings}
            onUpdateBookings={setBookings}
            payments={payments}
            onUpdatePayments={setPayments}
            attendanceRecords={attendanceRecords}
            enquiries={enquiries}
            feePlans={feePlans}
            settings={settings}
            onUpdateSettings={setSettings}
            regFee={regFee}
            monthlyTuition={monthlyTuition}
            onSaveFeeSettings={(newReg, newTuition) => {
              setRegFee(newReg);
              setMonthlyTuition(newTuition);
            }}
            onViewInvoice={(pmt) => setActiveInvoicePayment(pmt)}
          />
        )}
      </main>

      {/* Payment Gateway Modal */}
      {pendingPayment && (
        <PaymentModal
          studentName={pendingPayment.student.Full_Name}
          studentId={pendingPayment.student.Student_ID}
          studentEmail={pendingPayment.student.Email}
          courseName={pendingPayment.course.Course_Name}
          amount={pendingPayment.totalAmount}
          discount={pendingPayment.discountAmount}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setPendingPayment(null)}
        />
      )}

      {/* Tax Invoice & Receipt Modal */}
      {activeInvoicePayment && (
        <InvoiceModal
          payment={activeInvoicePayment}
          student={students.find((s) => s.Student_ID === activeInvoicePayment.Student_ID) || activeStudent}
          onClose={() => setActiveInvoicePayment(null)}
        />
      )}

    </div>
  );
}
