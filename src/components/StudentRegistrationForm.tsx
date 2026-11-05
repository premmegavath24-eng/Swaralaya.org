import React, { useState } from 'react';
import { Course, TeachingMode, LearningLevel, AgeGroup, Student } from '../types/academy';
import { Tag, Check, ShieldCheck, ArrowRight, Music, Clock, Calendar, AlertCircle } from 'lucide-react';

interface StudentRegistrationFormProps {
  courses: Course[];
  baseRegFee: number;
  baseTuition: number;
  onInitiatePayment: (data: {
    student: Student;
    course: Course;
    totalAmount: number;
    discountAmount: number;
  }) => void;
  onNavigateToPortal?: () => void;
}

export const StudentRegistrationForm: React.FC<StudentRegistrationFormProps> = ({
  courses,
  baseRegFee,
  baseTuition,
  onInitiatePayment,
  onNavigateToPortal
}) => {
  // Step 1: Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('18 and above');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('English');

  // Step 2: Learning Plan
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.Course_ID || 'CRS-001');
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel>('Beginner');
  const [classesPerMonth, setClassesPerMonth] = useState<number>(8);
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [teachingMode, setTeachingMode] = useState<TeachingMode>('Hybrid');
  const [preferredDays, setPreferredDays] = useState<string[]>(['Saturday', 'Sunday']);
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('6:00–7:00 PM IST');

  // Step 3: Account & Consent
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Discount Code
  const [discountCode, setDiscountCode] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState('');
  const [formError, setFormError] = useState('');

  const selectedCourse = courses.find((c) => c.Course_ID === selectedCourseId) || courses[0];

  // Dynamic fee calculation based on class frequency & duration
  const durationMultiplier = durationMinutes / 60; // 0.5, 0.75, 1, 1.5
  const frequencyMultiplier = classesPerMonth / 8; // 0.5, 1, 1.5
  const rawTuition = Math.round((baseTuition || selectedCourse.Monthly_Fee) * durationMultiplier * frequencyMultiplier);
  const regFee = baseRegFee || 300;
  const discountAmount = isDiscountApplied ? Math.round(rawTuition * 0.1) : 0;
  const totalAmount = rawTuition + regFee - discountAmount;
  const totalLessonHours = Math.round((classesPerMonth * durationMinutes) / 60);

  const handleApplyDiscount = () => {
    if (discountCode.trim().toUpperCase() === 'SWARA10') {
      setIsDiscountApplied(true);
      setDiscountError('');
    } else {
      setDiscountError('Invalid code. Use demo code SWARA10 for 10% off.');
      setIsDiscountApplied(false);
    }
  };

  const toggleDay = (day: string) => {
    if (preferredDays.includes(day)) {
      if (preferredDays.length > 1) {
        setPreferredDays(preferredDays.filter((d) => d !== day));
      }
    } else {
      setPreferredDays([...preferredDays, day]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter the student full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (ageGroup !== '18 and above' && !guardianName.trim()) {
      setFormError('Please enter the parent/guardian name for students under 18.');
      return;
    }
    if (!password || password.length < 6) {
      setFormError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match. Please re-enter.');
      return;
    }
    if (!agreeTerms) {
      setFormError('Please agree to the Terms of Service and Privacy Policy to proceed.');
      return;
    }

    const newStudent: Student = {
      Student_ID: `STU-2026-${Math.floor(100 + Math.random() * 900)}`,
      Registration_Date: new Date().toISOString().split('T')[0],
      Full_Name: fullName.trim(),
      Email: email.trim(),
      Phone: phone.trim() || '+91 98400 00000',
      Age_Group: ageGroup,
      Guardian_Name: guardianName.trim() || undefined,
      Guardian_Contact: guardianPhone.trim() || undefined,
      Preferred_Language: preferredLanguage,
      Course_ID: selectedCourse.Course_ID,
      Level: selectedLevel,
      Preferred_Mode: teachingMode,
      Student_Status: 'Active',
      Start_Date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      Classes_Per_Month: classesPerMonth,
      Duration_Minutes: durationMinutes,
      Notes: `Preferred days: ${preferredDays.join(', ')} at ${preferredTimeSlot}.`
    };

    onInitiatePayment({
      student: newStudent,
      course: selectedCourse,
      totalAmount,
      discountAmount
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="mb-8 border-b border-[#E5DFD5] pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#642B3B] text-xs font-semibold uppercase tracking-widest">
              <span>♪ SWARALAYA CARNATIC MUSIC ACADEMY</span>
              <span>·</span>
              <span className="text-[#C49A52]">Enrolment Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#642B3B] mt-1">
              Student Registration
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
              Create your learner profile to begin your Carnatic Vocal or Instrumental journey. Choose your learning plan, schedule your lessons, and follow your progress in one place.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1 bg-[#642B3B]/10 text-[#642B3B] rounded-full font-medium">
              ONLINE · IN-PERSON · HYBRID
            </span>
            <span className="text-[#C49A52] font-serif-classic font-semibold italic hidden sm:inline">
              ♫ Śruti · Laya · Bhāva
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 3-Step Registration Form (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-xs border border-[#E5DFD5] p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 01: Your Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                <span className="text-xs font-mono font-bold text-[#C49A52] px-2 py-0.5 bg-[#C49A52]/10 rounded">
                  01
                </span>
                <h2 className="text-base font-serif-title font-semibold text-[#642B3B]">
                  Your Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Student Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Meera Sundaresan"
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Phone Number (with WhatsApp)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98400 12345"
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none font-mono-nums"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Age Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none bg-white"
                  >
                    <option value="18 and above">18 and above (Adult Learner)</option>
                    <option value="13–17">13–17 (Youth / High School)</option>
                    <option value="Under 13">Under 13 (Child / Junior)</option>
                  </select>
                </div>

                {ageGroup !== '18 and above' && (
                  <>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">
                        Parent / Guardian Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={guardianName}
                        onChange={(e) => setGuardianName(e.target.value)}
                        placeholder="Parent / Guardian Name"
                        className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">
                        Parent / Guardian Contact
                      </label>
                      <input
                        type="tel"
                        value={guardianPhone}
                        onChange={(e) => setGuardianPhone(e.target.value)}
                        placeholder="+91 98400 54321"
                        className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none font-mono-nums"
                      />
                    </div>
                  </>
                )}

                <div className="sm:col-span-2">
                  <label className="block font-medium text-stone-700 mb-1">
                    Preferred Language of Instruction
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[
                      { code: 'English', label: 'English' },
                      { code: 'Telugu', label: 'తెలుగు (Telugu)' },
                      { code: 'Tamil', label: 'தமிழ் (Tamil)' },
                      { code: 'Kannada', label: 'ಕನ್ನಡ (Kannada)' },
                      { code: 'Malayalam', label: 'മലയാളം (Malayalam)' },
                      { code: 'Hindi', label: 'हिन्दी (Hindi)' }
                    ].map((lang) => (
                      <button
                        type="button"
                        key={lang.code}
                        onClick={() => setPreferredLanguage(lang.code)}
                        className={`py-1.5 px-2 text-[11px] rounded border transition-all text-center ${
                          preferredLanguage === lang.code
                            ? 'bg-[#642B3B] text-white border-[#642B3B] font-semibold'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 02: Your Learning Plan */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                <span className="text-xs font-mono font-bold text-[#C49A52] px-2 py-0.5 bg-[#C49A52]/10 rounded">
                  02
                </span>
                <h2 className="text-base font-serif-title font-semibold text-[#642B3B]">
                  Your Learning Plan
                </h2>
              </div>

              <div className="space-y-4 text-xs">
                {/* Course Selection */}
                <div>
                  <label className="block font-medium text-stone-700 mb-1.5">
                    Select Discipline / Course <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {courses.map((c) => (
                      <div
                        key={c.Course_ID}
                        onClick={() => setSelectedCourseId(c.Course_ID)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedCourseId === c.Course_ID
                            ? 'border-[#642B3B] bg-[#642B3B]/5 ring-1 ring-[#642B3B]'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-stone-900 text-xs">{c.Course_Name}</span>
                          {selectedCourseId === c.Course_ID && (
                            <Check className="w-3.5 h-3.5 text-[#642B3B]" />
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500 mt-1 line-clamp-1">{c.Level}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Level & Mode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Learning Level
                    </label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value as LearningLevel)}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none bg-white"
                    >
                      <option value="Beginner">Beginner (Foundation & Geethams)</option>
                      <option value="Intermediate">Intermediate (Varnams & Kritis)</option>
                      <option value="Advanced">Advanced (Manodharma & Pallavi)</option>
                      <option value="Unsure; need guidance">Unsure; need guidance / audition</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Teaching Mode
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Online', 'In-person', 'Hybrid'] as TeachingMode[]).map((mode) => (
                        <button
                          type="button"
                          key={mode}
                          onClick={() => setTeachingMode(mode)}
                          className={`py-2 text-xs rounded border transition-colors ${
                            teachingMode === mode
                              ? 'bg-[#642B3B] text-white border-[#642B3B] font-semibold'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Classes per month & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Classes Per Month
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[4, 8, 12].map((num) => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => setClassesPerMonth(num)}
                          className={`py-2 text-xs rounded border transition-colors ${
                            classesPerMonth === num
                              ? 'bg-[#642B3B] text-white border-[#642B3B] font-semibold'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {num} classes
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Duration Per Class
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[30, 45, 60, 90].map((mins) => (
                        <button
                          type="button"
                          key={mins}
                          onClick={() => setDurationMinutes(mins)}
                          className={`py-2 text-xs rounded border transition-colors ${
                            durationMinutes === mins
                              ? 'bg-[#642B3B] text-white border-[#642B3B] font-semibold'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {mins} min
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Days and Time slots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Preferred Lesson Days
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                        const fullDay = {
                          Mon: 'Monday',
                          Tue: 'Tuesday',
                          Wed: 'Wednesday',
                          Thu: 'Thursday',
                          Fri: 'Friday',
                          Sat: 'Saturday',
                          Sun: 'Sunday'
                        }[day]!;
                        const isSelected = preferredDays.includes(fullDay);
                        return (
                          <button
                            type="button"
                            key={day}
                            onClick={() => toggleDay(fullDay)}
                            className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                              isSelected
                                ? 'bg-[#C49A52] text-white border-[#C49A52] font-semibold'
                                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Preferred IST Time Slot
                    </label>
                    <select
                      value={preferredTimeSlot}
                      onChange={(e) => setPreferredTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none bg-white font-mono-nums"
                    >
                      <option value="6:00–7:00 AM IST">6:00–7:00 AM IST (Morning Riaz)</option>
                      <option value="7:00–8:00 AM IST">7:00–8:00 AM IST</option>
                      <option value="9:00–10:00 AM IST">9:00–10:00 AM IST</option>
                      <option value="4:00–5:00 PM IST">4:00–5:00 PM IST</option>
                      <option value="5:00–6:00 PM IST">5:00–6:00 PM IST</option>
                      <option value="6:00–7:00 PM IST">6:00–7:00 PM IST (Evening Twilight)</option>
                      <option value="7:00–8:00 PM IST">7:00–8:00 PM IST</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 03: Secure Account & Consent */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                <span className="text-xs font-mono font-bold text-[#C49A52] px-2 py-0.5 bg-[#C49A52]/10 rounded">
                  03
                </span>
                <h2 className="text-base font-serif-title font-semibold text-[#642B3B]">
                  Secure Account & Consent
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Create Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Use 8+ characters"
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none"
                    required
                  />
                  <span className="text-[10px] text-stone-400 mt-0.5 block">
                    Use 8+ characters; never reuse an important password.
                  </span>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-stone-300 text-[#642B3B] focus:ring-[#642B3B]"
                  />
                  <span>
                    I agree to the Terms of Service and Privacy Policy and consent to Swaralaya Carnatic Music Academy using my details to manage classes and enrolment.
                  </span>
                </label>
              </div>

              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}
            </div>

            {/* Mobile Submit Button */}
            <div className="lg:hidden pt-4">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#642B3B] hover:bg-[#401B29] text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <span>Proceed to Tuition Payment (₹{totalAmount.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

        {/* Right: Selected Plan & Live Fee Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl shadow-xs border border-[#E5DFD5] overflow-hidden sticky top-6">
            
            {/* Header Box */}
            <div className="p-6 bg-[#642B3B] text-white">
              <span className="text-xs uppercase tracking-wider text-[#C49A52] font-semibold">
                Your selected plan
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono-nums">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-white/80">Illustrative first-month total</span>
              </div>
            </div>

            {/* Fee Summary Breakdown */}
            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="font-semibold text-stone-900 uppercase tracking-wide text-[11px]">
                  Fee Summary
                </span>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider">
                  Live Pricing
                </span>
              </div>

              <div className="space-y-2 text-stone-600">
                <div className="flex justify-between">
                  <span>Course</span>
                  <span className="font-semibold text-stone-900 text-right">{selectedCourse.Course_Name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Classes / month</span>
                  <span className="font-semibold text-stone-900">{classesPerMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration / class</span>
                  <span className="font-semibold text-stone-900">{durationMinutes} min</span>
                </div>
                <div className="flex justify-between">
                  <span>Total lesson time</span>
                  <span className="font-semibold text-stone-900">{totalLessonHours} hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Teaching mode</span>
                  <span className="font-semibold text-stone-900">{teachingMode}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 space-y-2 text-stone-600">
                <div className="flex justify-between">
                  <span>One-time registration</span>
                  <span className="font-mono-nums font-semibold text-stone-900">
                    ₹{regFee.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly tuition</span>
                  <span className="font-mono-nums font-semibold text-stone-900">
                    ₹{rawTuition.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Discount Code */}
                <div className="pt-2">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Promo code (e.g. SWARA10)"
                      className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyDiscount}
                      className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white font-medium rounded text-xs whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-1">
                    Demo code <strong className="text-[#642B3B]">SWARA10</strong> applies 10% off tuition.
                  </p>
                  {discountError && (
                    <p className="text-[10px] text-red-600 mt-0.5">{discountError}</p>
                  )}
                </div>

                {isDiscountApplied && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount (SWARA10)</span>
                    <span className="font-mono-nums">−₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              {/* Total Row */}
              <div className="pt-3 border-t-2 border-[#642B3B] flex justify-between items-baseline text-sm font-bold text-[#642B3B]">
                <span>Estimated total</span>
                <span className="text-xl font-mono-nums">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>

              {/* Desktop Submit Button */}
              <div className="pt-2 hidden lg:block">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-3 px-4 bg-[#642B3B] hover:bg-[#401B29] text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <span>Review registration →</span>
                </button>
              </div>

              <p className="text-[10px] text-stone-400 text-center leading-relaxed">
                These prices reflect current fee schedules approved by the academy administrator.
              </p>
            </div>

          </div>

          {/* Quick Info Box */}
          <div className="p-4 bg-[#FBF7F0] rounded-xl border border-[#E5DFD5] text-xs space-y-2">
            <div className="flex items-center gap-2 text-[#642B3B] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#C49A52]" />
              <span>What happens next?</span>
            </div>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              Upon payment confirmation, your student record is generated immediately in the Academy Database, your Google Meet links are issued in your Student Hub, and a GST tax invoice is available for download.
            </p>
            {onNavigateToPortal && (
              <button
                type="button"
                onClick={onNavigateToPortal}
                className="text-[11px] text-[#642B3B] font-semibold hover:underline block pt-1"
              >
                Already enrolled? Access Student Hub →
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
