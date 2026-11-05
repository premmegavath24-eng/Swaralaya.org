import React, { useState } from 'react';
import { Course, Tutor, Enquiry } from '../types/academy';
import {
  Music,
  Calendar,
  Users,
  Compass,
  MapPin,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface PublicWebsiteProps {
  courses: Course[];
  tutors: Tutor[];
  onNavigateToRegistration: () => void;
  onNavigateToStudentHub: () => void;
  onNavigateToAdmin: () => void;
  onSubmitEnquiry: (enquiry: Partial<Enquiry>) => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({
  courses,
  tutors,
  onNavigateToRegistration,
  onNavigateToStudentHub,
  onNavigateToAdmin,
  onSubmitEnquiry
}) => {
  const [activePage, setActivePage] = useState<
    'home' | 'about' | 'courses' | 'tutors' | 'fees' | 'timings' | 'contact' | 'policies'
  >('home');

  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);

  // General Enquiry Form State (Form B)
  const [enqName, setEnqName] = useState('');
  const [enqEmail, setEnqEmail] = useState('');
  const [enqPhone, setEnqPhone] = useState('');
  const [enqCourse, setEnqCourse] = useState('Carnatic Vocal');
  const [enqLevel, setEnqLevel] = useState('Beginner');
  const [enqMode, setEnqMode] = useState('Hybrid');
  const [enqMessage, setEnqMessage] = useState('');
  const [enqSuccess, setEnqSuccess] = useState(false);

  // Google Sites editor mockup drawer toggle
  const [showSitesEditorDrawer, setShowSitesEditorDrawer] = useState(false);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitEnquiry({
      Name: enqName,
      Email: enqEmail,
      Phone: enqPhone,
      Course_Interest: enqCourse,
      Learning_Level: enqLevel,
      Preferred_Mode: enqMode,
      Enquiry_Message: enqMessage
    });
    setEnqSuccess(true);
    setEnqName('');
    setEnqEmail('');
    setEnqPhone('');
    setEnqMessage('');
    setTimeout(() => setEnqSuccess(false), 4000);
  };

  return (
    <div className="relative min-h-screen bg-[#FBF7F0] text-[#28242A]">
      
      {/* Google Sites Mode Toggle Ribbon */}
      <div className="bg-[#401B29] text-white px-4 py-2 border-b border-[#642B3B] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-stone-400">sites.google.com/d/swaralaya-academy</span>
          <span className="hidden sm:inline px-2 py-0.5 bg-[#C49A52]/20 text-[#C49A52] rounded text-[10px] font-semibold">
            Google Sites Framework
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSitesEditorDrawer(!showSitesEditorDrawer)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded text-stone-200 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-[#C49A52]" />
            <span>{showSitesEditorDrawer ? 'Hide Google Sites Tools' : 'Inspect Google Sites Sidebar'}</span>
          </button>
        </div>
      </div>

      {/* Main Container Layout (Split if Google Sites editor sidebar is toggled) */}
      <div className="flex">
        
        {/* Main Public Website Area */}
        <div className="flex-1 max-w-full overflow-hidden">
          
          {/* Top Classical Header & Wordmark */}
          <header className="bg-[#642B3B] text-white border-b-4 border-[#C49A52] sticky top-0 z-40 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
                
                {/* Brand Identity */}
                <div
                  onClick={() => setActivePage('home')}
                  className="flex items-center gap-3 cursor-pointer select-none shrink-0"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#C49A52] bg-[#401B29] overflow-hidden flex items-center justify-center shadow-sm shrink-0">
                    <img
                      src="/src/assets/images/hero_carnatic_trinity_1793901617522.jpg"
                      alt="Swaralaya Crest"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="font-serif-title text-base sm:text-xl font-bold tracking-widest text-[#FBF7F0] block leading-none">
                      SWARALAYA
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#C49A52] font-semibold block mt-0.5">
                      Carnatic Music Academy
                    </span>
                  </div>
                </div>

                {/* Primary Single-Line Nav Links */}
                <nav className="hidden lg:flex items-center gap-5 text-xs font-medium tracking-wide text-[#FBF7F0]/90">
                  <button
                    onClick={() => setActivePage('home')}
                    className={`hover:text-[#C49A52] transition-colors ${activePage === 'home' ? 'text-[#C49A52] font-bold border-b border-[#C49A52]' : ''}`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => setActivePage('about')}
                    className={`hover:text-[#C49A52] transition-colors ${activePage === 'about' ? 'text-[#C49A52] font-bold border-b border-[#C49A52]' : ''}`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setActivePage('courses')}
                    className={`hover:text-[#C49A52] transition-colors ${activePage === 'courses' ? 'text-[#C49A52] font-bold border-b border-[#C49A52]' : ''}`}
                  >
                    Courses
                  </button>
                  <button
                    onClick={() => setActivePage('tutors')}
                    className={`hover:text-[#C49A52] transition-colors ${activePage === 'tutors' ? 'text-[#C49A52] font-bold border-b border-[#C49A52]' : ''}`}
                  >
                    Tutors
                  </button>
                  <button
                    onClick={() => setActivePage('fees')}
                    className={`hover:text-[#C49A52] transition-colors ${activePage === 'fees' ? 'text-[#C49A52] font-bold border-b border-[#C49A52]' : ''}`}
                  >
                    Fees & Plans
                  </button>
                  <button
                    onClick={() => setActivePage('timings')}
                    className={`hover:text-[#C49A52] transition-colors ${activePage === 'timings' ? 'text-[#C49A52] font-bold border-b border-[#C49A52]' : ''}`}
                  >
                    Class Timings
                  </button>
                  <button
                    onClick={() => setActivePage('contact')}
                    className={`hover:text-[#C49A52] transition-colors ${activePage === 'contact' ? 'text-[#C49A52] font-bold border-b border-[#C49A52]' : ''}`}
                  >
                    Contact & Enquiries
                  </button>
                  <button
                    onClick={() => setActivePage('policies')}
                    className={`hover:text-[#C49A52] transition-colors ${activePage === 'policies' ? 'text-[#C49A52] font-bold border-b border-[#C49A52]' : ''}`}
                  >
                    Policies
                  </button>
                </nav>

                {/* Primary CTA */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={onNavigateToRegistration}
                    className="px-4 py-2 bg-[#C49A52] hover:bg-[#b08742] text-[#401B29] font-serif-title font-bold text-xs rounded transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <span>Register for Classes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Mobile Submenu Bar */}
              <div className="lg:hidden flex items-center gap-4 py-2.5 overflow-x-auto text-[11px] text-white/80 border-t border-white/10 scrollbar-none">
                <button onClick={() => setActivePage('home')} className="whitespace-nowrap">Home</button>
                <button onClick={() => setActivePage('about')} className="whitespace-nowrap">About</button>
                <button onClick={() => setActivePage('courses')} className="whitespace-nowrap">Courses</button>
                <button onClick={() => setActivePage('tutors')} className="whitespace-nowrap">Tutors</button>
                <button onClick={() => setActivePage('fees')} className="whitespace-nowrap">Fees</button>
                <button onClick={() => setActivePage('timings')} className="whitespace-nowrap">Timings</button>
                <button onClick={() => setActivePage('contact')} className="whitespace-nowrap">Contact</button>
                <button onClick={() => setActivePage('policies')} className="whitespace-nowrap">Policies</button>
              </div>
            </div>
          </header>

          {/* PAGE 01: HOME */}
          {activePage === 'home' && (
            <div className="space-y-16 pb-16">
              
              {/* Hero Banner with Authentic Carnatic Art & Trinity */}
              <section className="relative bg-[#401B29] text-white overflow-hidden border-b border-[#642B3B]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Hero Text (7 cols) */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex items-center gap-2 text-[#C49A52] text-xs font-semibold uppercase tracking-widest">
                        <span>Learn with tradition • Grow with practice</span>
                      </div>
                      
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold leading-tight text-[#FBF7F0] text-balance">
                        Discover the Beauty of Carnatic Music
                      </h1>

                      <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
                        Learn Carnatic music through structured lessons, personalised guidance and consistent practice. Explore courses, meet our tutors and find a learning plan that suits your goals.
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          onClick={onNavigateToRegistration}
                          className="px-6 py-3 bg-[#C49A52] hover:bg-[#b08742] text-[#401B29] font-serif-title font-bold text-xs rounded transition-all shadow-md flex items-center gap-2"
                        >
                          <span>Register for Classes</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActivePage('courses')}
                          className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded border border-white/20 transition-all"
                        >
                          Explore Courses
                        </button>
                        <button
                          onClick={() => setActivePage('tutors')}
                          className="px-5 py-3 bg-transparent hover:bg-white/5 text-white/80 hover:text-white font-medium text-xs rounded transition-all"
                        >
                          Meet Our Tutors
                        </button>
                      </div>

                      {/* Triad of Classical Pillars */}
                      <div className="pt-6 border-t border-white/10 flex items-center gap-6 text-xs text-stone-300">
                        <div>
                          <strong className="text-[#C49A52] block font-serif-title">Śruti</strong>
                          <span>Pure Acoustic Pitch</span>
                        </div>
                        <span className="text-white/20">·</span>
                        <div>
                          <strong className="text-[#C49A52] block font-serif-title">Laya</strong>
                          <span>Rhythmic Discipline</span>
                        </div>
                        <span className="text-white/20">·</span>
                        <div>
                          <strong className="text-[#C49A52] block font-serif-title">Bhāva</strong>
                          <span>Expressive Soul</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Hero Image: Carnatic Trinity Painting Banner (5 cols) */}
                    <div className="lg:col-span-5">
                      <div className="relative rounded-2xl overflow-hidden border-2 border-[#C49A52] shadow-2xl bg-stone-900 group">
                        <img
                          src="/src/assets/images/hero_carnatic_trinity_1793901617522.jpg"
                          alt="The Carnatic Trinity: Saint Tyagaraja, Muthuswami Dikshitar, Syama Sastri"
                          className="w-full h-80 lg:h-96 object-cover transform group-hover:scale-102 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                          <p className="text-xs font-serif-classic font-semibold text-[#FBF7F0]">
                            Revering the Holy Trinity of Carnatic Music
                          </p>
                          <p className="text-[10px] text-stone-300">
                            Saint Tyagaraja · Muthuswami Dikshitar · Syama Sastri
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Maestro Concert Spotlight & Teaching Approach */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white rounded-2xl border border-[#E5DFD5] p-6 sm:p-10 shadow-xs">
                  
                  <div className="md:col-span-5">
                    <div className="rounded-xl overflow-hidden border border-stone-200 shadow-sm relative">
                      <img
                        src="/src/assets/images/tutor_carnatic_vocalist_1793901617367.jpg"
                        alt="Carnatic Maestro in Concert"
                        className="w-full h-72 sm:h-80 object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs p-3 text-white text-[11px]">
                        <span className="font-semibold block">Concert-Grade Mentorship</span>
                        <span className="text-stone-300">Individual voice grooming with Tanpura alignment</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <span className="text-xs uppercase tracking-wider text-[#C49A52] font-bold">
                      Teaching Philosophy
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#642B3B]">
                      Authentic Guru-Shishya Tradition Meets Modern Access
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      At Swaralaya, Carnatic music is not merely an art form; it is a spiritual discipline of conscious listening, breath mastery, and Sahitya understanding. Whether you are learning your first Sarali Varisai or mastering a 4-kalai Pallavi, our faculty personalises every lesson to your voice register and artistic temperament.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="p-3 bg-[#FBF7F0] rounded-lg border border-[#E5DFD5]">
                        <strong className="text-[#642B3B] block">Personalised 1-on-1 Guidance</strong>
                        <span className="text-stone-600 text-[11px]">Tutors focus solely on your vocal timbre, posture, and intonation.</span>
                      </div>
                      <div className="p-3 bg-[#FBF7F0] rounded-lg border border-[#E5DFD5]">
                        <strong className="text-[#642B3B] block">Flexible Modes (Online & Studio)</strong>
                        <span className="text-stone-600 text-[11px]">Join high-fidelity Google Meet classes or in-person sessions in Chennai.</span>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* Course Disciplines Showcase */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5DFD5] pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#C49A52] font-semibold">
                      Curriculum Offerings
                    </span>
                    <h2 className="text-2xl font-serif-title font-bold text-[#642B3B] mt-0.5">
                      Explore Course Categories
                    </h2>
                  </div>
                  <button
                    onClick={() => setActivePage('courses')}
                    className="text-xs text-[#642B3B] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View all syllabi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.slice(0, 3).map((course) => (
                    <div
                      key={course.Course_ID}
                      className="bg-white rounded-xl border border-[#E5DFD5] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-44 overflow-hidden relative">
                          <img
                            src={course.Image_Url}
                            alt={course.Course_Name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 bg-[#401B29]/90 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                            {course.Level}
                          </div>
                        </div>
                        <div className="p-5 space-y-2">
                          <h3 className="font-serif-title font-bold text-base text-[#642B3B]">
                            {course.Course_Name}
                          </h3>
                          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                            {course.Description}
                          </p>
                          <div className="pt-2 flex items-center gap-3 text-[11px] text-stone-500 font-mono-nums">
                            <span>{course.Classes_Per_Month} classes/mo</span>
                            <span>·</span>
                            <span>{course.Default_Duration_Minutes} min/class</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-stone-400 uppercase font-medium">Monthly Tuition</span>
                          <p className="text-base font-bold text-[#642B3B] font-mono-nums">
                            ₹{course.Monthly_Fee.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedCourseForModal(course)}
                          className="px-3 py-1.5 bg-[#FBF7F0] hover:bg-stone-200 text-[#401B29] text-xs font-semibold rounded border border-[#E5DFD5] transition-colors"
                        >
                          Syllabus Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Featured Tutors Carousel / Grid */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#C49A52] font-semibold">
                      Faculty Roster
                    </span>
                    <h2 className="text-2xl font-serif-title font-bold text-[#642B3B] mt-0.5">
                      Distinguished Gurus & Vidwans
                    </h2>
                  </div>
                  <button
                    onClick={() => setActivePage('tutors')}
                    className="text-xs text-[#642B3B] font-semibold hover:underline"
                  >
                    All Faculty →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tutors.slice(0, 3).map((tutor) => (
                    <div
                      key={tutor.Tutor_ID}
                      className="bg-white rounded-xl border border-[#E5DFD5] p-5 shadow-xs flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={tutor.Image_Url}
                            alt={tutor.Tutor_Name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-[#C49A52] shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="text-[10px] text-[#C49A52] font-bold uppercase tracking-wider">
                              {tutor.Tutor_ID}
                            </span>
                            <h3 className="font-serif-title font-bold text-sm text-[#642B3B]">
                              {tutor.Tutor_Name}
                            </h3>
                            <p className="text-[11px] text-stone-500 font-medium">
                              {tutor.Specialisation}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                          {tutor.Experience}
                        </p>

                        <div className="text-[11px] text-stone-500 space-y-0.5 pt-1">
                          <p>Languages: <strong>{tutor.Languages.join(', ')}</strong></p>
                          <p>Modes: <strong>{tutor.Teaching_Modes.join(', ')}</strong></p>
                        </div>
                      </div>

                      <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-xs text-[#C49A52] font-semibold">★ {tutor.Rating} / 5.0</span>
                        <button
                          onClick={onNavigateToRegistration}
                          className="text-xs text-[#642B3B] font-semibold hover:underline"
                        >
                          Enrol with Tutor →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Location & Google Map Embed (Matching user screenshot) */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl border border-[#E5DFD5] p-6 sm:p-8 shadow-xs">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    <div className="lg:col-span-5 space-y-4">
                      <span className="text-xs uppercase tracking-wider text-[#C49A52] font-bold">
                        Academy Campus & Studio
                      </span>
                      <h2 className="text-2xl font-serif-title font-bold text-[#642B3B]">
                        Visit Swaralaya in Chennai
                      </h2>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Centrally located in Alwarpet, Chennai—the cultural heartland of Carnatic music. Featuring sound-treated riaz chambers, an acoustic concert hall, and dedicated Tanpura drone facilities.
                      </p>
                      
                      <div className="space-y-2 text-xs text-stone-700 pt-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-[#642B3B] shrink-0 mt-0.5" />
                          <span>No. 14, Raga Malika Enclave, TTK Road, Alwarpet, Chennai 600018</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#642B3B] shrink-0" />
                          <span>Academy Hours: 06:00 AM – 08:30 PM IST (Mon to Sun)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#642B3B] shrink-0" />
                          <span className="font-mono-nums">+91 94441 23091 / +91 44 2499 1800</span>
                        </div>
                      </div>
                    </div>

                    {/* Map Visual (Stylized to match Google Sites map embed from screenshot) */}
                    <div className="lg:col-span-7">
                      <div className="relative rounded-xl overflow-hidden border border-stone-300 shadow-sm bg-stone-100">
                        {/* Map visual background with coordinate pins */}
                        <div className="h-64 sm:h-72 w-full bg-[#E8ECEF] relative flex flex-col justify-between p-4">
                          {/* Map road lines simulation */}
                          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#642B3B_1px,transparent_1px)] [background-size:16px_16px]" />
                          
                          {/* Waterbody & park simulation */}
                          <div className="absolute right-0 top-0 w-1/2 h-full bg-[#C5E8F8] opacity-60 rounded-l-3xl" />
                          
                          {/* Marker Pin */}
                          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                              <MapPin className="w-5 h-5 fill-white" />
                            </div>
                            <span className="mt-1 px-2 py-0.5 bg-white text-stone-900 font-bold text-[10px] rounded shadow-sm border border-stone-200">
                              Swaralaya Music Academy
                            </span>
                          </div>

                          <div className="z-10 flex justify-between items-start">
                            <span className="bg-white/90 px-2 py-1 rounded text-[10px] font-semibold text-stone-800 shadow-xs">
                              TTK Road · Alwarpet, Chennai
                            </span>
                          </div>

                          <div className="z-10 flex justify-between items-end text-[10px] text-stone-600 bg-white/80 p-1.5 rounded backdrop-blur-xs">
                            <span>Google Maps Embed Preview</span>
                            <span className="font-mono">13.0336° N, 80.2520° E</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                <div className="text-center space-y-1">
                  <span className="text-xs uppercase tracking-wider text-[#C49A52] font-semibold">
                    Admissions FAQ
                  </span>
                  <h2 className="text-2xl font-serif-title font-bold text-[#642B3B]">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-3 pt-4 text-xs">
                  {[
                    {
                      q: 'I am a complete adult beginner with no music background. Can I join?',
                      a: 'Absolutely! Our Carnatic Vocal Foundation course begins from fundamental pitch alignment (Śruti Sadhana) and Sarali Varisais. Adult learners progress comfortably with personalized paced coaching.'
                    },
                    {
                      q: 'How are online classes conducted?',
                      a: 'Online lessons take place 1-on-1 via high-definition Google Meet with high-fidelity stereo audio settings tuned specifically for acoustic vocal and instrument resonances.'
                    },
                    {
                      q: 'Can I reschedule a class if I have travel or exams?',
                      a: 'Yes. Students submit a reschedule request via their Student Hub with 24 hours prior notice to mutually agree on an alternative slot with their tutor.'
                    },
                    {
                      q: 'How does tuition payment work?',
                      a: 'Tuition is billed monthly based on your selected frequency. Payments are handled through our secure instant checkout (UPI, Card, Net Banking), and a verified GST tax receipt is immediately generated.'
                    }
                  ].map((faq, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-lg border border-[#E5DFD5] space-y-1">
                      <h4 className="font-semibold text-stone-900 text-xs sm:text-sm">
                        {faq.q}
                      </h4>
                      <p className="text-stone-600 leading-relaxed text-xs">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          )}

          {/* PAGE 02: ABOUT THE ACADEMY */}
          {activePage === 'about' && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
              <div className="border-b border-[#E5DFD5] pb-6">
                <span className="text-xs uppercase tracking-wider text-[#C49A52] font-semibold">
                  Heritage & Mission
                </span>
                <h1 className="text-3xl font-serif-title font-bold text-[#642B3B] mt-1">
                  About Swaralaya Carnatic Music Academy
                </h1>
                <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                  Founded with the sacred aspiration to preserve and propagate the pristine traditions of Dakshinadi Sangeetham (South Indian Classical Music).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed text-stone-700">
                <div className="p-6 bg-white rounded-xl border border-[#E5DFD5] space-y-3">
                  <h3 className="font-serif-title font-bold text-base text-[#642B3B]">
                    Our Mission
                  </h3>
                  <p>
                    To make structured Carnatic music learning accessible to earnest seekers worldwide through rigorous individual guidance, systematic swara-laya practice, and a warm, supportive learning environment.
                  </p>
                  <p>
                    We uphold the classical Trinity compositions (Saint Tyagaraja, Muthuswami Dikshitar, and Syama Sastri) alongside the rich legacy of Purandara Dasa, Swathi Thirunal, and Papanasam Sivan.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl border border-[#E5DFD5] space-y-3">
                  <h3 className="font-serif-title font-bold text-base text-[#642B3B]">
                    Our Pedagogical Vision
                  </h3>
                  <p>
                    Carnatic music is deeply rooted in oral transmission (*Guru-Shishya Parampara*). Swaralaya combines this sacred personal mentorship with structured digital lesson tracking, automated Google Calendar schedules, and immediate feedback.
                  </p>
                  <p>
                    We guide students not just to memorize notes, but to cultivate *Manodharma* (spontaneous improvisation), *Raga Bhāva*, and deep spiritual resonance.
                  </p>
                </div>
              </div>

              {/* Approach to Online & In-person */}
              <div className="p-6 bg-white rounded-xl border border-[#E5DFD5] space-y-4">
                <h3 className="font-serif-title font-bold text-lg text-[#642B3B]">
                  Online, In-Person & Hybrid Arrangements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-stone-50 rounded-lg">
                    <strong className="text-stone-900 block mb-1">Online Mode</strong>
                    <p className="text-stone-600 text-[11px]">
                      High-fidelity Google Meet video sessions. Ideal for overseas learners in North America, Europe, Australia, and GCC countries.
                    </p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-lg">
                    <strong className="text-stone-900 block mb-1">In-Person Studio</strong>
                    <p className="text-stone-600 text-[11px]">
                      Traditional classroom riaz at our TTK Road studio in Alwarpet, Chennai, surrounded by acoustic Tanpuras and Veena instruments.
                    </p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-lg">
                    <strong className="text-stone-900 block mb-1">Hybrid Mode</strong>
                    <p className="text-stone-600 text-[11px]">
                      Flexible combination: attend studio sessions when in Chennai and continue seamlessly online during travel or weekdays.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 03: COURSES */}
          {activePage === 'courses' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
              <div className="border-b border-[#E5DFD5] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#C49A52] font-semibold">
                    Curriculum & Disciplines
                  </span>
                  <h1 className="text-3xl font-serif-title font-bold text-[#642B3B] mt-1">
                    Academic Course Offerings
                  </h1>
                  <p className="text-stone-600 text-xs sm:text-sm mt-1">
                    Structured syllabus progression verified by the Academic Council.
                  </p>
                </div>
                <button
                  onClick={onNavigateToRegistration}
                  className="px-4 py-2 bg-[#642B3B] hover:bg-[#401B29] text-white text-xs font-semibold rounded"
                >
                  Apply for Enrolment →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div
                    key={course.Course_ID}
                    className="bg-white rounded-xl border border-[#E5DFD5] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-44 relative">
                        <img
                          src={course.Image_Url}
                          alt={course.Course_Name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-3 left-3 bg-[#642B3B] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          {course.Course_ID}
                        </span>
                      </div>
                      <div className="p-5 space-y-2">
                        <span className="text-[10px] text-[#C49A52] uppercase font-bold tracking-wider">
                          {course.Level}
                        </span>
                        <h3 className="font-serif-title font-bold text-base text-[#642B3B]">
                          {course.Course_Name}
                        </h3>
                        <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                          {course.Description}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-stone-100 mt-2 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono-nums">
                        <span className="text-stone-500">{course.Classes_Per_Month} classes/month ({course.Default_Duration_Minutes}m)</span>
                        <span className="font-bold text-[#642B3B]">₹{course.Monthly_Fee.toLocaleString('en-IN')}/mo</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedCourseForModal(course)}
                          className="flex-1 py-1.5 bg-[#FBF7F0] hover:bg-stone-200 text-[#401B29] text-xs font-semibold rounded border border-[#E5DFD5]"
                        >
                          View Syllabus
                        </button>
                        <button
                          onClick={onNavigateToRegistration}
                          className="flex-1 py-1.5 bg-[#642B3B] hover:bg-[#401B29] text-white text-xs font-semibold rounded"
                        >
                          Enrol
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGE 04: TUTORS */}
          {activePage === 'tutors' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
              <div className="border-b border-[#E5DFD5] pb-6">
                <span className="text-xs uppercase tracking-wider text-[#C49A52] font-semibold">
                  Faculty Directory
                </span>
                <h1 className="text-3xl font-serif-title font-bold text-[#642B3B] mt-1">
                  Our Faculty of Gurus & Vidwans
                </h1>
                <p className="text-stone-600 text-xs sm:text-sm mt-1">
                  Senior performing artists with decades of stage excellence and pedagogical dedication.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutors.map((tutor) => (
                  <div
                    key={tutor.Tutor_ID}
                    className="bg-white rounded-xl border border-[#E5DFD5] p-6 shadow-xs flex flex-col sm:flex-row gap-5 items-start"
                  >
                    <img
                      src={tutor.Image_Url}
                      alt={tutor.Tutor_Name}
                      className="w-24 h-24 rounded-full object-cover border-2 border-[#C49A52] shadow-sm shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-2 flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#C49A52] font-bold font-mono">
                          {tutor.Tutor_ID}
                        </span>
                        <span className="text-[#C49A52] font-semibold">★ {tutor.Rating}</span>
                      </div>
                      <h3 className="text-base font-serif-title font-bold text-[#642B3B]">
                        {tutor.Tutor_Name}
                      </h3>
                      <p className="text-stone-800 font-semibold">{tutor.Specialisation}</p>
                      <p className="text-stone-600 text-[11px] font-medium">{tutor.Qualifications}</p>
                      <p className="text-stone-500 leading-relaxed">{tutor.Experience}</p>
                      
                      <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-3 text-[11px] text-stone-600">
                        <span>Languages: <strong>{tutor.Languages.join(', ')}</strong></span>
                        <span>·</span>
                        <span>Capacity: <strong>{tutor.Weekly_Capacity} hrs/wk</strong></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGE 05: FEES & PACKAGES */}
          {activePage === 'fees' && (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
              <div className="border-b border-[#E5DFD5] pb-6">
                <span className="text-xs uppercase tracking-wider text-[#C49A52] font-semibold">
                  Tuition Structure
                </span>
                <h1 className="text-3xl font-serif-title font-bold text-[#642B3B] mt-1">
                  Fees & Class Packages
                </h1>
                <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl">
                  Transparent, non-commercial fee schedules calibrated to lesson frequency and duration.
                </p>
              </div>

              {/* 4 Packages comparison cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: 'Basic Package',
                    classes: '4 classes / month',
                    duration: '30 min duration',
                    fee: '₹1,200',
                    desc: 'Ideal for young children (under 10) starting Sarali Varisais or leisure hobbyists.'
                  },
                  {
                    name: 'Standard Package',
                    badge: 'Recommended',
                    classes: '8 classes / month',
                    duration: '60 min duration',
                    fee: '₹2,000',
                    desc: 'The optimal frequency for steady progression through Geethams, Varnams and Kritis.'
                  },
                  {
                    name: 'Intensive Package',
                    classes: '12 classes / month',
                    duration: '60 min duration',
                    fee: '₹2,800',
                    desc: 'For dedicated aspirants preparing for concert debuts (Arangetram) and exams.'
                  },
                  {
                    name: 'Private Mentorship',
                    classes: '8 classes / month',
                    duration: '90 min duration',
                    fee: '₹3,600',
                    desc: 'Direct advanced 1-on-1 coaching in Ragam Tanam Pallavi with senior Vidwans.'
                  }
                ].map((pkg, idx) => (
                  <div
                    key={idx}
                    className={`bg-white rounded-xl border p-6 flex flex-col justify-between shadow-xs ${
                      pkg.badge ? 'border-[#642B3B] ring-1 ring-[#642B3B]' : 'border-[#E5DFD5]'
                    }`}
                  >
                    <div className="space-y-3">
                      {pkg.badge && (
                        <span className="px-2 py-0.5 bg-[#642B3B] text-white text-[10px] font-bold rounded uppercase tracking-wider inline-block">
                          {pkg.badge}
                        </span>
                      )}
                      <h3 className="font-serif-title font-bold text-base text-[#642B3B]">
                        {pkg.name}
                      </h3>
                      <div className="text-2xl font-bold font-mono-nums text-stone-900">
                        {pkg.fee} <span className="text-xs font-normal text-stone-500">/ month</span>
                      </div>
                      <div className="text-xs text-stone-700 font-medium space-y-0.5">
                        <p>{pkg.classes}</p>
                        <p>{pkg.duration}</p>
                      </div>
                      <p className="text-xs text-stone-500 leading-relaxed">{pkg.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 mt-4">
                      <button
                        onClick={onNavigateToRegistration}
                        className="w-full py-2 bg-[#642B3B] hover:bg-[#401B29] text-white rounded text-xs font-semibold transition-colors"
                      >
                        Select Plan
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Policy Highlights */}
              <div className="p-6 bg-white rounded-xl border border-[#E5DFD5] space-y-3 text-xs text-stone-600">
                <h4 className="font-serif-title font-bold text-sm text-[#642B3B]">
                  Tuition Payment Policy Details
                </h4>
                <p>
                  • <strong>One-time Registration Fee:</strong> ₹300 payable at first enrolment for syllabus and registration paperwork.
                </p>
                <p>
                  • <strong>Accepted Payment Gateways:</strong> UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (RuPay, Visa, Mastercard), and Net Banking.
                </p>
                <p>
                  • <strong>Payment Due Date:</strong> By the 5th of every billing cycle. An official GST tax invoice is generated for each transaction.
                </p>
              </div>
            </div>
          )}

          {/* PAGE 06: CLASS TIMINGS */}
          {activePage === 'timings' && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
              <div className="border-b border-[#E5DFD5] pb-6">
                <span className="text-xs uppercase tracking-wider text-[#C49A52] font-semibold">
                  Schedules & Availability
                </span>
                <h1 className="text-3xl font-serif-title font-bold text-[#642B3B] mt-1">
                  Class Timings & Time Slots
                </h1>
                <p className="text-stone-600 text-xs sm:text-sm mt-1">
                  All timetable schedules are calibrated to India Standard Time (IST, UTC+05:30).
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#E5DFD5] p-6 shadow-xs space-y-6">
                <h3 className="font-serif-title font-bold text-base text-[#642B3B]">
                  Weekly Session Slot Matrix
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-stone-50 rounded-lg space-y-2">
                    <span className="font-bold text-stone-900 block font-serif-title">
                      Morning Sessions (Prātaḥkāla Riaz)
                    </span>
                    <ul className="space-y-1.5 text-stone-600 font-mono-nums">
                      <li>• 06:00 AM – 07:00 AM IST (Tanpura Śruti Alignment)</li>
                      <li>• 07:00 AM – 08:00 AM IST (Sarali & Janta Varisais)</li>
                      <li>• 09:00 AM – 10:00 AM IST (Varnams & Kritis)</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-lg space-y-2">
                    <span className="font-bold text-stone-900 block font-serif-title">
                      Evening Sessions (Sāyankāla Sandhya)
                    </span>
                    <ul className="space-y-1.5 text-stone-600 font-mono-nums">
                      <li>• 04:00 PM – 05:00 PM IST (Junior / Youth batches)</li>
                      <li>• 05:00 PM – 06:00 PM IST (Veena & Violin instrumental)</li>
                      <li>• 06:00 PM – 07:00 PM IST (Advanced Kritis & Manodharma)</li>
                      <li>• 07:00 PM – 08:00 PM IST (Adult & International online learners)</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-[#FBF7F0] rounded-lg border border-[#E5DFD5] text-xs text-stone-600 space-y-1">
                  <strong className="text-stone-900 block">How to Request a Slot:</strong>
                  <p>
                    Submit your preferred days and time slots via the Student Registration form. The academy administrator checks tutor availability and issues your confirmed Google Calendar and Google Meet link within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 09: CONTACT & ENQUIRIES */}
          {activePage === 'contact' && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
              <div className="border-b border-[#E5DFD5] pb-6">
                <span className="text-xs uppercase tracking-wider text-[#C49A52] font-semibold">
                  Get in Touch
                </span>
                <h1 className="text-3xl font-serif-title font-bold text-[#642B3B] mt-1">
                  Contact & Admissions Enquiries
                </h1>
                <p className="text-stone-600 text-xs sm:text-sm mt-1">
                  Reach out for course placement questions, trial auditions, or studio visits.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Form B: General Enquiry (7 cols) */}
                <div className="md:col-span-7 bg-white rounded-xl border border-[#E5DFD5] p-6 shadow-xs">
                  <h3 className="font-serif-title font-bold text-base text-[#642B3B] mb-4">
                    Submit an Enquiry (Form B)
                  </h3>

                  <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={enqName}
                        onChange={(e) => setEnqName(e.target.value)}
                        placeholder="e.g. Radhika Sundaram"
                        className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={enqEmail}
                          onChange={(e) => setEnqEmail(e.target.value)}
                          placeholder="email@example.com"
                          className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">
                          Mobile / WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={enqPhone}
                          onChange={(e) => setEnqPhone(e.target.value)}
                          placeholder="+91 98400 12345"
                          className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none font-mono-nums"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Course</label>
                        <select
                          value={enqCourse}
                          onChange={(e) => setEnqCourse(e.target.value)}
                          className="w-full px-2.5 py-2 border border-stone-300 rounded bg-white"
                        >
                          <option value="Carnatic Vocal">Carnatic Vocal</option>
                          <option value="Saraswati Veena">Saraswati Veena</option>
                          <option value="Carnatic Violin">Carnatic Violin</option>
                          <option value="Mridangam">Mridangam</option>
                          <option value="Carnatic Theory">Carnatic Theory</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Level</label>
                        <select
                          value={enqLevel}
                          onChange={(e) => setEnqLevel(e.target.value)}
                          className="w-full px-2.5 py-2 border border-stone-300 rounded bg-white"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Mode</label>
                        <select
                          value={enqMode}
                          onChange={(e) => setEnqMode(e.target.value)}
                          className="w-full px-2.5 py-2 border border-stone-300 rounded bg-white"
                        >
                          <option value="Online">Online</option>
                          <option value="In-person">In-person</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">
                        Enquiry Message
                      </label>
                      <textarea
                        value={enqMessage}
                        onChange={(e) => setEnqMessage(e.target.value)}
                        placeholder="Tell us about your learning background and questions..."
                        rows={3}
                        className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-[#642B3B] focus:outline-none"
                      />
                    </div>

                    {enqSuccess && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Enquiry received! Our academic coordinator will contact you within 24 hours.</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#642B3B] hover:bg-[#401B29] text-white font-medium rounded transition-colors text-xs"
                    >
                      Submit Admissions Enquiry
                    </button>
                  </form>
                </div>

                {/* Direct Coordinates (5 cols) */}
                <div className="md:col-span-5 space-y-4">
                  <div className="bg-white rounded-xl border border-[#E5DFD5] p-6 shadow-xs space-y-4 text-xs">
                    <h3 className="font-serif-title font-bold text-sm text-[#642B3B]">
                      Academy Administrative Office
                    </h3>

                    <div className="space-y-3 text-stone-700">
                      <div>
                        <strong className="block text-stone-900">Address:</strong>
                        <span>No. 14, Raga Malika Enclave, TTK Road, Alwarpet, Chennai, Tamil Nadu 600018</span>
                      </div>
                      <div>
                        <strong className="block text-stone-900">Admissions Inbox:</strong>
                        <span className="font-mono">admissions@swaralaya-academy.org</span>
                      </div>
                      <div>
                        <strong className="block text-stone-900">Phone & WhatsApp:</strong>
                        <span className="font-mono">+91 94441 23091 / +91 44 2499 1800</span>
                      </div>
                      <div>
                        <strong className="block text-stone-900">Operating Hours:</strong>
                        <span>Mon – Sat: 06:00 AM – 08:30 PM IST</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#FBF7F0] rounded-xl border border-[#E5DFD5] text-xs space-y-2">
                    <strong className="text-[#642B3B] block font-serif-title">Ready to Begin?</strong>
                    <p className="text-stone-600 text-[11px]">
                      Skip the wait and create your student profile immediately with our streamlined registration and tuition payment workflow.
                    </p>
                    <button
                      onClick={onNavigateToRegistration}
                      className="text-xs text-[#642B3B] font-bold hover:underline block pt-1"
                    >
                      Go to Registration Form →
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* PAGE 10: POLICIES */}
          {activePage === 'policies' && (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
              <div className="border-b border-[#E5DFD5] pb-6">
                <span className="text-xs uppercase tracking-wider text-[#C49A52] font-semibold">
                  Institutional Governance
                </span>
                <h1 className="text-3xl font-serif-title font-bold text-[#642B3B] mt-1">
                  Academy Policies & Terms
                </h1>
                <p className="text-stone-600 text-xs sm:text-sm mt-1">
                  Clear operational agreements ensuring quality instruction and safeguarding.
                </p>
              </div>

              <div className="space-y-4 text-xs text-stone-700 leading-relaxed">
                <div className="p-5 bg-white rounded-xl border border-[#E5DFD5] space-y-2">
                  <h3 className="font-serif-title font-bold text-sm text-[#642B3B]">
                    1. Fee and Refund Policy
                  </h3>
                  <p>
                    Monthly tuition fees are payable in advance on or before the 5th of each calendar month. One-time registration fees are non-refundable. Monthly tuition may be refunded pro-rata or carried forward as class credits if notice is provided before the start of the billing period.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5DFD5] space-y-2">
                  <h3 className="font-serif-title font-bold text-sm text-[#642B3B]">
                    2. Cancellation and Rescheduling Policy
                  </h3>
                  <p>
                    Students may reschedule up to 2 classes per monthly cycle provided at least 24 hours written notice is submitted via the Student Hub or email. Missed sessions without prior notice are logged as "No Show" and are not eligible for makeup credits.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5DFD5] space-y-2">
                  <h3 className="font-serif-title font-bold text-sm text-[#642B3B]">
                    3. Online Class Etiquette
                  </h3>
                  <p>
                    Students must connect from a quiet, well-lit room with Tanpura or Śruti box tuned to their basic pitch (Adhara Shadjam). Stable high-speed internet and external microphones or headphones are recommended for optimal pitch fidelity.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E5DFD5] space-y-2">
                  <h3 className="font-serif-title font-bold text-sm text-[#642B3B]">
                    4. Child & Student Safeguarding
                  </h3>
                  <p>
                    For learners under 18 years of age, parent/guardian contact details are mandatory. Parents are invited to observe online lessons at any time. All faculty members undergo rigorous identity and academic background verification.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="bg-[#401B29] text-white border-t-2 border-[#642B3B] py-12 mt-16 text-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#C49A52] text-lg">♫</span>
                    <span className="font-serif-title text-base font-bold tracking-wider">SWARALAYA</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    Dedicated to the timeless traditions of South Indian Classical Music. Śruti · Laya · Bhāva.
                  </p>
                  <p className="text-[10px] text-stone-400">
                    Alwarpet, Chennai, Tamil Nadu 600018
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-serif-title font-bold text-[#C49A52] block text-[11px] uppercase tracking-wider">
                    Quick Navigation
                  </span>
                  <p><button onClick={() => setActivePage('about')} className="hover:text-[#C49A52]">About the Academy</button></p>
                  <p><button onClick={() => setActivePage('courses')} className="hover:text-[#C49A52]">Courses & Syllabi</button></p>
                  <p><button onClick={() => setActivePage('tutors')} className="hover:text-[#C49A52]">Faculty Profiles</button></p>
                  <p><button onClick={() => setActivePage('fees')} className="hover:text-[#C49A52]">Tuition Packages</button></p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-serif-title font-bold text-[#C49A52] block text-[11px] uppercase tracking-wider">
                    Portal Access
                  </span>
                  <p><button onClick={onNavigateToRegistration} className="hover:text-[#C49A52]">Student Registration</button></p>
                  <p><button onClick={onNavigateToStudentHub} className="hover:text-[#C49A52]">Student Hub & Meet Links</button></p>
                  <p><button onClick={onNavigateToAdmin} className="hover:text-[#C49A52]">Admin Sheets Console</button></p>
                  <p><button onClick={() => setActivePage('policies')} className="hover:text-[#C49A52]">Terms & Policies</button></p>
                </div>

                <div className="space-y-2">
                  <span className="font-serif-title font-bold text-[#C49A52] block text-[11px] uppercase tracking-wider">
                    Accreditation & GST
                  </span>
                  <p className="text-stone-300 text-[11px]">
                    GSTIN: 33AABCS1429B1Z2<br />
                    SAC: 999293 (Classical Arts Education)
                  </p>
                  <p className="text-[10px] text-stone-400">
                    © {new Date().getFullYear()} Swaralaya Carnatic Music Academy. All rights reserved.
                  </p>
                </div>

              </div>
            </div>
          </footer>

        </div>

        {/* Google Sites Style Tool Drawer (Matching the user screenshot!) */}
        {showSitesEditorDrawer && (
          <aside className="w-72 bg-white border-l border-stone-300 p-4 shrink-0 hidden md:block overflow-y-auto max-h-screen text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <span className="font-semibold text-stone-800">Google Sites Editor Mockup</span>
              <button
                onClick={() => setShowSitesEditorDrawer(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>

            {/* Tabs: Insert, Pages, Themes */}
            <div className="grid grid-cols-3 border-b border-stone-200 text-center pb-2 font-medium text-stone-600">
              <span className="text-blue-600 border-b-2 border-blue-600 pb-1">Insert</span>
              <span>Pages</span>
              <span>Themes</span>
            </div>

            {/* Quick Insert Icons */}
            <div className="grid grid-cols-2 gap-2 text-center text-[11px] text-stone-700">
              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <span className="font-bold text-blue-600 block text-base">Tt</span>
                <span>Text box</span>
              </div>
              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <span className="font-bold text-red-600 block text-base">🖼</span>
                <span>Images</span>
              </div>
              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <span className="font-bold text-amber-600 block text-base">&lt;&gt;</span>
                <span>Embed</span>
              </div>
              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <span className="font-bold text-emerald-600 block text-base">▲</span>
                <span>Drive</span>
              </div>
            </div>

            {/* Content Blocks */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <span className="text-[10px] uppercase font-bold text-stone-400">Content Blocks</span>
              <div className="p-2 bg-stone-50 rounded border border-stone-200 text-[11px] text-stone-600">
                ✓ Trinity Hero Marquee (Connected)
              </div>
              <div className="p-2 bg-stone-50 rounded border border-stone-200 text-[11px] text-stone-600">
                ✓ Maestro Concert Spotlight (Connected)
              </div>
              <div className="p-2 bg-stone-50 rounded border border-stone-200 text-[11px] text-stone-600">
                ✓ Google Maps Location (Connected)
              </div>
            </div>

            {/* Google Integrations Checklist */}
            <div className="space-y-1.5 pt-2 border-t border-stone-200 text-[11px] text-stone-600">
              <span className="text-[10px] uppercase font-bold text-stone-400">Google Workspace Integrations</span>
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Google Meet (1-Click Class Rooms)</span>
              </p>
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Google Sheets (10 Operational Tabs)</span>
              </p>
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Google Forms (Registration, Enquiry, Change)</span>
              </p>
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Google Maps Grounding (Chennai Campus)</span>
              </p>
            </div>
          </aside>
        )}

      </div>

      {/* Course Syllabus Modal */}
      {selectedCourseForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-stone-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-bold text-[#C49A52] uppercase tracking-wider">
                  {selectedCourseForModal.Course_ID} · {selectedCourseForModal.Level}
                </span>
                <h3 className="font-serif-title font-bold text-base text-[#642B3B]">
                  {selectedCourseForModal.Course_Name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourseForModal(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              {selectedCourseForModal.Description}
            </p>

            <div className="space-y-2">
              <span className="font-serif-title font-bold text-xs text-stone-900 block">
                Syllabus Topics & Practice Goals:
              </span>
              <div className="space-y-1.5 text-xs text-stone-700">
                {selectedCourseForModal.Syllabus.map((syl, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#642B3B] text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{syl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400">Monthly Tuition</span>
                <p className="font-bold text-[#642B3B] text-sm font-mono-nums">
                  ₹{selectedCourseForModal.Monthly_Fee.toLocaleString('en-IN')}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCourseForModal(null);
                  onNavigateToRegistration();
                }}
                className="px-4 py-2 bg-[#642B3B] hover:bg-[#401B29] text-white text-xs font-semibold rounded"
              >
                Register for this Course →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
