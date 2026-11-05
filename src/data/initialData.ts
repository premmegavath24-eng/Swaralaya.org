import { Course, Tutor, Student, Booking, Payment, AttendanceRecord, Enquiry, FeePlan, Setting } from '../types/academy';

export const INITIAL_COURSES: Course[] = [
  {
    Course_ID: 'CRS-001',
    Course_Name: 'Carnatic Vocal — Foundation & Geethams',
    Level: 'Beginner',
    Description: 'Immerse into the bedrock of Carnatic vocal music. Covers Sarali Varisas, Janta Varisas, Dhatu Varisas, Alankaram in 7 basic Talas, and introductory Pillari Geethams.',
    Default_Duration_Minutes: 60,
    Classes_Per_Month: 8,
    Monthly_Fee: 2000,
    Registration_Fee: 300,
    Teaching_Modes: ['Online', 'In-person', 'Hybrid'],
    Active_Status: true,
    Image_Url: '/src/assets/images/tutor_carnatic_vocalist_1793901617367.jpg',
    Syllabus: [
      'Śruti alignment & Tanpura tuning practice',
      'Sarali Varisai & Mayamalavagowla basics',
      'Janta Varisai (Spuritam & heavy oscillations)',
      'Alankarams across 7 Tala families',
      'Pillari Geethams in Malahari & Mohanam'
    ]
  },
  {
    Course_ID: 'CRS-002',
    Course_Name: 'Carnatic Vocal — Varnams & Kritis',
    Level: 'Intermediate',
    Description: 'Mastery of Adi Tala & Ata Tala Varnams in two speeds, classical Kritis of the Trinity (Tyagaraja, Dikshitar, Syama Sastri), and introduction to Kalpanaswaram.',
    Default_Duration_Minutes: 60,
    Classes_Per_Month: 8,
    Monthly_Fee: 2400,
    Registration_Fee: 300,
    Teaching_Modes: ['Online', 'In-person', 'Hybrid'],
    Active_Status: true,
    Image_Url: '/src/assets/images/hero_carnatic_trinity_1793901617522.jpg',
    Syllabus: [
      'Adi Tala Varnams in Shankarabharanam, Kalyani & Mohanam',
      'Two-speed singing with Tala precision',
      'Fundamental Trinity Kritis with Sahitya Bhāva',
      'Introductory Kalpanaswaram phrasing at Madhyamakala',
      'Voice cultivation & breath endurance techniques'
    ]
  },
  {
    Course_ID: 'CRS-003',
    Course_Name: 'Saraswati Veena — Tantri & Meettu Technique',
    Level: 'Beginner to Intermediate',
    Description: 'Traditional Mysuru and Thanjavur bani instrumental training on the divine 24-fret Saraswati Veena. Learn fret navigation, pluck phrasing, and Gamaka pulling.',
    Default_Duration_Minutes: 60,
    Classes_Per_Month: 8,
    Monthly_Fee: 2200,
    Registration_Fee: 300,
    Teaching_Modes: ['Online', 'In-person', 'Hybrid'],
    Active_Status: true,
    Image_Url: '/src/assets/images/instrument_saraswati_veena_1793901619022.jpg',
    Syllabus: [
      'Veena posture, Plectrum (meetlu) placement, and Tala string dampening',
      'Swarasthana location and finger coordination exercises',
      'Kampita and Nokku gamakas pulled from brass frets',
      'Geethams and Swarajathis arranged for Veena',
      'Instrument maintenance, wax fretboard care, and string replacement'
    ]
  },
  {
    Course_ID: 'CRS-004',
    Course_Name: 'Carnatic Violin — Gayaki Anga Style',
    Level: 'All Levels',
    Description: 'Fingering and bowing methods tailored to accompany classical vocal performances. Emphasizes pure pitch stability, microtonal nuances, and gamakas.',
    Default_Duration_Minutes: 60,
    Classes_Per_Month: 8,
    Monthly_Fee: 2200,
    Registration_Fee: 300,
    Teaching_Modes: ['Online', 'In-person', 'Hybrid'],
    Active_Status: true,
    Image_Url: '/src/assets/images/hero_carnatic_trinity_1793901617522.jpg',
    Syllabus: [
      'Posture: seated floor rest with violin scroll against chest/foot',
      'Smooth bow articulation without scraping or accents',
      'Gliding finger slides (Jaaru) and Kampita gamaka control',
      'Speed transitions and Akshara bowing',
      'Vocal accompaniment principles & echoing sangathis'
    ]
  },
  {
    Course_ID: 'CRS-005',
    Course_Name: 'Mridangam — Laya, Solkattu & Nada',
    Level: 'All Levels',
    Description: 'The rhythmic king of South Indian classical percussion. Master Tha-Dhi-Thom-Nam finger placements, Chapu tones, and Korvai structures in Adi and Rupaka talas.',
    Default_Duration_Minutes: 60,
    Classes_Per_Month: 8,
    Monthly_Fee: 2100,
    Registration_Fee: 300,
    Teaching_Modes: ['In-person', 'Hybrid'],
    Active_Status: true,
    Image_Url: '/src/assets/images/instrument_mridangam_1793901619101.jpg',
    Syllabus: [
      'Fundamental strokes: Tha, Dhi, Thom, Nam, Chapu, Arai Chapu',
      'Konnakol (solkattu vocal recitation) of rhythm cycles',
      'Speed variations in Tisra, Chatusra, and Misra Gatis',
      'Sarvalaghu accompaniment for Adi and Rupaka Tala Kritis',
      'Arudi endings, Moras, and structured Korvais'
    ]
  },
  {
    Course_ID: 'CRS-006',
    Course_Name: 'Carnatic Music Theory & Raga Lakshanas',
    Level: 'Intermediate to Advanced',
    Description: 'Rigorous theoretical exploration of the 72 Melakarta scheme, 22 Shrutis, Tala Dasa Pranas, Vaggeyakara biographies, and notation transcription.',
    Default_Duration_Minutes: 45,
    Classes_Per_Month: 4,
    Monthly_Fee: 1400,
    Registration_Fee: 300,
    Teaching_Modes: ['Online'],
    Active_Status: true,
    Image_Url: '/src/assets/images/hero_carnatic_trinity_1793901617522.jpg',
    Syllabus: [
      'Venkatamakhin 72 Melakarta system & Katapayadi Sankhya',
      'Janya Ragas: Varja, Vakra, Upanga, Bhashanga classifications',
      'The 35 Tala scheme of Purandara Dasa',
      'Deciphering traditional lipi / Telugu & Tamil palm leaf notations',
      'Analysis of musical forms: Kriti, Padam, Javali, Ragamalika'
    ]
  }
];

export const INITIAL_TUTORS: Tutor[] = [
  {
    Tutor_ID: 'TUT-001',
    Tutor_Name: 'Vidwan K. R. Ramaswamy',
    Email: 'ramaswamy.k@swaralaya-academy.org',
    Phone: '+91 94441 23091',
    Specialisation: 'Carnatic Vocal & Manodharma Sangeetham',
    Course_IDs: ['CRS-001', 'CRS-002'],
    Qualifications: 'Sangeetha Vidwan (TTC Music College), ' + 'M.A. Carnatic Music (Madras University)',
    Experience: '24 years of concert performance and international teaching',
    Languages: ['English', 'Tamil', 'Telugu'],
    Teaching_Modes: ['Online', 'In-person', 'Hybrid'],
    Weekly_Capacity: 20,
    Availability_Notes: 'Morning slots: 06:30 - 08:30 IST; Evening: 17:30 - 20:30 IST (Mon-Sat)',
    Active_Status: true,
    Rating: 4.9,
    Image_Url: '/src/assets/images/tutor_carnatic_vocalist_1793901617367.jpg'
  },
  {
    Tutor_ID: 'TUT-002',
    Tutor_Name: 'Vidushi S. Gayathri Devi',
    Email: 'gayathri.devi@swaralaya-academy.org',
    Phone: '+91 98840 55123',
    Specialisation: 'Saraswati Veena & Gamaka Articulation',
    Course_IDs: ['CRS-003'],
    Qualifications: 'A-Grade AIR Artist, Disciple of Mysore Bani lineage',
    Experience: '18 years teaching across India, USA, and Singapore',
    Languages: ['English', 'Kannada', 'Tamil'],
    Teaching_Modes: ['Online', 'In-person', 'Hybrid'],
    Weekly_Capacity: 15,
    Availability_Notes: 'Weekday afternoons & weekend mornings',
    Active_Status: true,
    Rating: 5.0,
    Image_Url: '/src/assets/images/instrument_saraswati_veena_1793901619022.jpg'
  },
  {
    Tutor_ID: 'TUT-003',
    Tutor_Name: 'Vidwan V. Soundararajan',
    Email: 'soundar.violin@swaralaya-academy.org',
    Phone: '+91 97908 41209',
    Specialisation: 'Carnatic Violin Solo & Accompaniment',
    Course_IDs: ['CRS-004'],
    Qualifications: 'Gold Medalist, S.V. College of Music, Tirupati',
    Experience: '15 years performing in Chennai December Season',
    Languages: ['English', 'Telugu', 'Tamil'],
    Teaching_Modes: ['Online', 'In-person', 'Hybrid'],
    Weekly_Capacity: 18,
    Availability_Notes: 'Evenings 16:00 - 20:00 IST (Tue, Thu, Sat, Sun)',
    Active_Status: true,
    Rating: 4.8,
    Image_Url: '/src/assets/images/hero_carnatic_trinity_1793901617522.jpg'
  },
  {
    Tutor_ID: 'TUT-004',
    Tutor_Name: 'Vidwan M. N. Balasubramanian',
    Email: 'mridangam.bala@swaralaya-academy.org',
    Phone: '+91 94452 77810',
    Specialisation: 'Mridangam, Konnakol & Laya Vinyasam',
    Course_IDs: ['CRS-005'],
    Qualifications: 'Palani Subramania Pillai lineage disciple',
    Experience: '20 years training students in percussion acoustics',
    Languages: ['English', 'Malayalam', 'Tamil'],
    Teaching_Modes: ['In-person', 'Hybrid'],
    Weekly_Capacity: 14,
    Availability_Notes: 'Weekend batches and weekday twilight slots',
    Active_Status: true,
    Rating: 4.9,
    Image_Url: '/src/assets/images/instrument_mridangam_1793901619101.jpg'
  },
  {
    Tutor_ID: 'TUT-005',
    Tutor_Name: 'Dr. Radha Sundaram',
    Email: 'radha.theory@swaralaya-academy.org',
    Phone: '+91 98402 11984',
    Specialisation: 'Musicology, 72 Melakartas & Manuscript Studies',
    Course_IDs: ['CRS-006'],
    Qualifications: 'Ph.D. in Musicology, Madras Music Academy Senior Fellow',
    Experience: '28 years scholarly author and faculty',
    Languages: ['English', 'Tamil', 'Telugu', 'Hindi'],
    Teaching_Modes: ['Online'],
    Weekly_Capacity: 12,
    Availability_Notes: 'Saturdays & Sundays 10:00 - 13:00 IST',
    Active_Status: true,
    Rating: 5.0,
    Image_Url: '/src/assets/images/tutor_carnatic_vocalist_1793901617367.jpg'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    Student_ID: 'STU-2026-001',
    Registration_Date: '2026-10-15',
    Full_Name: 'Ananya Raghavan',
    Email: 'ananya.raghavan@gmail.com',
    Phone: '+91 98410 44556',
    Age_Group: '18 and above',
    Preferred_Language: 'English',
    Course_ID: 'CRS-001',
    Level: 'Beginner',
    Preferred_Mode: 'Hybrid',
    Preferred_Tutor_ID: 'TUT-001',
    Student_Status: 'Active',
    Start_Date: '2026-10-20',
    Notes: 'Student has natural pitch alignment; eager to learn Mayamalavagowla alankaram.',
    Classes_Per_Month: 8,
    Duration_Minutes: 60
  },
  {
    Student_ID: 'STU-2026-002',
    Registration_Date: '2026-10-18',
    Full_Name: 'Aditya Narayanan',
    Email: 'aditya.narayanan@yahoo.com',
    Phone: '+91 99620 11223',
    Age_Group: '13–17',
    Guardian_Name: 'K. Narayanan',
    Guardian_Contact: '+91 99620 99887',
    Preferred_Language: 'Tamil',
    Course_ID: 'CRS-003',
    Level: 'Beginner',
    Preferred_Mode: 'Online',
    Preferred_Tutor_ID: 'TUT-002',
    Student_Status: 'Active',
    Start_Date: '2026-10-22',
    Notes: 'Owns a Thanjavur Saraswati Veena, practicing 45 minutes daily.',
    Classes_Per_Month: 8,
    Duration_Minutes: 60
  },
  {
    Student_ID: 'STU-2026-003',
    Registration_Date: '2026-10-24',
    Full_Name: 'Srinidhi Venkatesh',
    Email: 'srinidhi.v@outlook.com',
    Phone: '+91 91760 77889',
    Age_Group: '18 and above',
    Preferred_Language: 'Telugu',
    Course_ID: 'CRS-002',
    Level: 'Intermediate',
    Preferred_Mode: 'Online',
    Preferred_Tutor_ID: 'TUT-001',
    Student_Status: 'Active',
    Start_Date: '2026-11-01',
    Notes: 'Has prior 3 years vocal training; starting Mohanam Varnam.',
    Classes_Per_Month: 8,
    Duration_Minutes: 60
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    Booking_ID: 'BKG-101',
    Student_ID: 'STU-2026-001',
    Tutor_ID: 'TUT-001',
    Course_ID: 'CRS-001',
    Session_Date: '2026-11-07',
    Start_Time: '07:00 AM',
    End_Time: '08:00 AM',
    Time_Zone: 'IST (UTC+05:30)',
    Teaching_Mode: 'Hybrid',
    Meeting_Location: 'Studio Hall 1 / Online',
    Meeting_Link_Restricted: 'https://meet.google.com/swara-laya-voc1',
    Booking_Status: 'Confirmed',
    Calendar_Event_ID: 'cal_evt_77182901',
    Created_Date: '2026-10-20',
    Last_Updated: '2026-10-20'
  },
  {
    Booking_ID: 'BKG-102',
    Student_ID: 'STU-2026-002',
    Tutor_ID: 'TUT-002',
    Course_ID: 'CRS-003',
    Session_Date: '2026-11-08',
    Start_Time: '10:00 AM',
    End_Time: '11:00 AM',
    Time_Zone: 'IST (UTC+05:30)',
    Teaching_Mode: 'Online',
    Meeting_Location: 'Online Google Meet',
    Meeting_Link_Restricted: 'https://meet.google.com/swara-veena-gayathri',
    Booking_Status: 'Confirmed',
    Calendar_Event_ID: 'cal_evt_8829104',
    Created_Date: '2026-10-22',
    Last_Updated: '2026-10-22'
  },
  {
    Booking_ID: 'BKG-103',
    Student_ID: 'STU-2026-003',
    Tutor_ID: 'TUT-001',
    Course_ID: 'CRS-002',
    Session_Date: '2026-11-09',
    Start_Time: '06:00 PM',
    End_Time: '07:00 PM',
    Time_Zone: 'IST (UTC+05:30)',
    Teaching_Mode: 'Online',
    Meeting_Location: 'Online Google Meet',
    Meeting_Link_Restricted: 'https://meet.google.com/swara-kritis-rama',
    Booking_Status: 'Confirmed',
    Calendar_Event_ID: 'cal_evt_991204',
    Created_Date: '2026-10-24',
    Last_Updated: '2026-10-24'
  }
];

export const INITIAL_PAYMENTS: Payment[] = [
  {
    Payment_ID: 'PAY-2026-001',
    Student_ID: 'STU-2026-001',
    Student_Name: 'Ananya Raghavan',
    Course_Name: 'Carnatic Vocal — Foundation & Geethams',
    Billing_Period: 'November 2026',
    Invoice_Date: '2026-10-15',
    Due_Date: '2026-10-20',
    Fee_Type: 'Registration + Monthly Tuition',
    Amount_Due: 2300,
    Amount_Received: 2300,
    Discount_Applied: 0,
    Payment_Date: '2026-10-16',
    Payment_Method: 'UPI',
    Transaction_Reference: 'UPI/HDFC/2026101689234',
    Verification_Status: 'Verified',
    Verified_By: 'Admin - Prem M.',
    Receipt_Reference: 'RCP-SWARA-2026-001',
    Notes: 'Paid via Google Pay UPI. Bank reference verified.'
  },
  {
    Payment_ID: 'PAY-2026-002',
    Student_ID: 'STU-2026-002',
    Student_Name: 'Aditya Narayanan',
    Course_Name: 'Saraswati Veena — Tantri & Meettu Technique',
    Billing_Period: 'November 2026',
    Invoice_Date: '2026-10-18',
    Due_Date: '2026-10-22',
    Fee_Type: 'Registration + Monthly Tuition',
    Amount_Due: 2500,
    Amount_Received: 2500,
    Discount_Applied: 0,
    Payment_Date: '2026-10-19',
    Payment_Method: 'Card',
    Transaction_Reference: 'CARD/RAZOR/99081293',
    Verification_Status: 'Verified',
    Verified_By: 'Automated Gateway',
    Receipt_Reference: 'RCP-SWARA-2026-002',
    Notes: 'Visa Card ending in 4112.'
  },
  {
    Payment_ID: 'PAY-2026-003',
    Student_ID: 'STU-2026-003',
    Student_Name: 'Srinidhi Venkatesh',
    Course_Name: 'Carnatic Vocal — Varnams & Kritis',
    Billing_Period: 'November 2026',
    Invoice_Date: '2026-10-24',
    Due_Date: '2026-11-01',
    Fee_Type: 'Monthly Tuition (SWARA10 applied)',
    Amount_Due: 2460,
    Amount_Received: 2460,
    Discount_Applied: 240,
    Payment_Date: '2026-10-25',
    Payment_Method: 'Net Banking',
    Transaction_Reference: 'NB/SBI/202610257761',
    Verification_Status: 'Verified',
    Verified_By: 'Admin - Prem M.',
    Receipt_Reference: 'RCP-SWARA-2026-003',
    Notes: 'SBI Internet Banking. Promo code SWARA10 applied 10% tuition discount.'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    Attendance_ID: 'ATT-001',
    Booking_ID: 'BKG-098',
    Student_ID: 'STU-2026-001',
    Student_Name: 'Ananya Raghavan',
    Tutor_ID: 'TUT-001',
    Tutor_Name: 'Vidwan K. R. Ramaswamy',
    Session_Date: '2026-10-24',
    Attendance_Status: 'Present',
    Lesson_Completed: true,
    Makeup_Required: false,
    Tutor_Notes: 'Completed Sarali Varisai 1 to 7 in 3 speeds. Commendable talam alignment.',
    Follow_Up_Status: 'None'
  },
  {
    Attendance_ID: 'ATT-002',
    Booking_ID: 'BKG-099',
    Student_ID: 'STU-2026-001',
    Student_Name: 'Ananya Raghavan',
    Tutor_ID: 'TUT-001',
    Tutor_Name: 'Vidwan K. R. Ramaswamy',
    Session_Date: '2026-10-31',
    Attendance_Status: 'Present',
    Lesson_Completed: true,
    Makeup_Required: false,
    Tutor_Notes: 'Janta Varisai 1 & 2 introduced. Advised 20 minutes daily Mandra Sthayi practice.',
    Follow_Up_Status: 'Practicing'
  },
  {
    Attendance_ID: 'ATT-003',
    Booking_ID: 'BKG-100',
    Student_ID: 'STU-2026-002',
    Student_Name: 'Aditya Narayanan',
    Tutor_ID: 'TUT-002',
    Tutor_Name: 'Vidushi S. Gayathri Devi',
    Session_Date: '2026-10-29',
    Attendance_Status: 'Present',
    Lesson_Completed: true,
    Makeup_Required: false,
    Tutor_Notes: 'Tantri string dampening mastered; beginning Mohanam Geetham.',
    Follow_Up_Status: 'None'
  }
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    Enquiry_ID: 'ENQ-001',
    Date_Received: '2026-10-28',
    Name: 'Meenakshi Sundaram',
    Email: 'meena.sundar@gmail.com',
    Phone: '+91 98409 33221',
    Course_Interest: 'Carnatic Vocal — Advanced',
    Learning_Level: 'Advanced',
    Preferred_Mode: 'Online',
    Enquiry_Message: 'Seeking mentorship for Neraval and Raga Alapana in Thodi and Kalyani.',
    Follow_Up_Date: '2026-11-02',
    Follow_Up_Status: 'Tutor Assigned for Audition',
    Assigned_Staff: 'Admin Desk',
    Outcome: 'Trial Slot Scheduled'
  },
  {
    Enquiry_ID: 'ENQ-002',
    Date_Received: '2026-10-30',
    Name: 'Rohan Sharma',
    Email: 'rohan.sharma@gmail.com',
    Phone: '+91 97110 54321',
    Course_Interest: 'Mridangam — Laya & Solkattu',
    Learning_Level: 'Beginner',
    Preferred_Mode: 'Hybrid',
    Enquiry_Message: 'Interested in weekend batches in Chennai; does academy provide practice mridangam in hall?',
    Follow_Up_Date: '2026-11-03',
    Follow_Up_Status: 'Information Sent',
    Assigned_Staff: 'Admin Desk',
    Outcome: 'Awaiting Response'
  }
];

export const INITIAL_FEE_PLANS: FeePlan[] = [
  {
    Plan_ID: 'PLN-BASIC',
    Plan_Name: 'Basic Package',
    Course_ID: 'ALL',
    Classes_Per_Month: 4,
    Duration_Minutes: 30,
    Registration_Fee: 300,
    Monthly_Fee: 1200,
    Mode_Adjustment: 0,
    Discount_Rules: 'Quarterly prepayment gets 5% discount',
    Effective_From: '2026-01-01',
    Active_Status: true
  },
  {
    Plan_ID: 'PLN-STANDARD',
    Plan_Name: 'Standard Package (Recommended)',
    Course_ID: 'ALL',
    Classes_Per_Month: 8,
    Duration_Minutes: 60,
    Registration_Fee: 300,
    Monthly_Fee: 2000,
    Mode_Adjustment: 0,
    Discount_Rules: 'Code SWARA10 gives 10% off first month tuition',
    Effective_From: '2026-01-01',
    Active_Status: true
  },
  {
    Plan_ID: 'PLN-INTENSIVE',
    Plan_Name: 'Intensive Package',
    Course_ID: 'ALL',
    Classes_Per_Month: 12,
    Duration_Minutes: 60,
    Registration_Fee: 300,
    Monthly_Fee: 2800,
    Mode_Adjustment: 0,
    Discount_Rules: 'Includes free masterclass access',
    Effective_From: '2026-01-01',
    Active_Status: true
  },
  {
    Plan_ID: 'PLN-CUSTOM',
    Plan_Name: 'Private Mentorship',
    Course_ID: 'CRS-002',
    Classes_Per_Month: 8,
    Duration_Minutes: 90,
    Registration_Fee: 500,
    Monthly_Fee: 3600,
    Mode_Adjustment: 200,
    Discount_Rules: 'Direct 1-on-1 with Senior Vidwan',
    Effective_From: '2026-01-01',
    Active_Status: true
  }
];

export const INITIAL_SETTINGS: Setting[] = [
  {
    Setting_Key: 'ACADEMY_NAME',
    Setting_Value: 'Swaralaya Carnatic Music Academy',
    Description: 'Institutional registered legal brand name',
    Last_Updated: '2026-10-01',
    Updated_By: 'Administrator'
  },
  {
    Setting_Key: 'DEFAULT_TIMEZONE',
    Setting_Value: 'IST (UTC+05:30)',
    Description: 'Primary time zone for lesson scheduling and calendar sync',
    Last_Updated: '2026-10-01',
    Updated_By: 'Administrator'
  },
  {
    Setting_Key: 'ONE_TIME_REG_FEE',
    Setting_Value: '300',
    Description: 'Default one-time student registration fee in INR',
    Last_Updated: '2026-10-01',
    Updated_By: 'Administrator'
  },
  {
    Setting_Key: 'STANDARD_MONTHLY_TUITION',
    Setting_Value: '2000',
    Description: 'Standard monthly fee for 8 x 60 min classes in INR',
    Last_Updated: '2026-10-01',
    Updated_By: 'Administrator'
  },
  {
    Setting_Key: 'GSTIN_NUMBER',
    Setting_Value: '33AABCS1429B1Z2',
    Description: 'Academy GST Identification Number for Tax Invoices',
    Last_Updated: '2026-10-01',
    Updated_By: 'Accounts Desk'
  },
  {
    Setting_Key: 'CONTACT_EMAIL',
    Setting_Value: 'admissions@swaralaya-academy.org',
    Description: 'Central enquiry and admissions inbox',
    Last_Updated: '2026-10-01',
    Updated_By: 'Administrator'
  },
  {
    Setting_Key: 'STUDIO_ADDRESS',
    Setting_Value: 'No. 14, Raga Malika Enclave, TTK Road, Alwarpet, Chennai, Tamil Nadu 600018',
    Description: 'Physical teaching studio and administrative office location',
    Last_Updated: '2026-10-01',
    Updated_By: 'Administrator'
  }
];

const STORAGE_KEYS = {
  COURSES: 'swaralaya_courses_v1',
  TUTORS: 'swaralaya_tutors_v1',
  STUDENTS: 'swaralaya_students_v1',
  BOOKINGS: 'swaralaya_bookings_v1',
  PAYMENTS: 'swaralaya_payments_v1',
  ATTENDANCE: 'swaralaya_attendance_v1',
  ENQUIRIES: 'swaralaya_enquiries_v1',
  FEE_PLANS: 'swaralaya_fee_plans_v1',
  SETTINGS: 'swaralaya_settings_v1'
};

export function loadStoredData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

export function saveStoredData<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export { STORAGE_KEYS };
