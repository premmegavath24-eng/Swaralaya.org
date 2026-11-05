# Swaralaya Carnatic Music Academy — Web Portal & Operations Platform

A comprehensive, production-grade Carnatic music academy web application inspired by the academy's Google Sites architecture, featuring a public academy website, multi-step student registration with live fee calculation, a simulated secure payment gateway (Card, UPI, Net Banking), instant PDF invoice generation, an interactive student hub with Google Meet class access and attendance records, and an administrative management console with synchronized Google Sheets database views.

### User Review & Critical Decisions

> [!IMPORTANT]
> The implementation aligns directly with your confirmed preferences from Phase 1:
> - **Payment Processing**: Full multi-method checkout modal (Credit/Debit Card, UPI QR/ID, Net Banking) paired with instant receipt verification and styled PDF tax invoice download.
> - **Default View & Navigation**: A unified portal architecture providing seamless tab-based switching between the **Public Academy Site** (matching the visual identity from the Google Sites reference), the **Student Hub**, and the **Admin Console**.
> - **Student Experience**: Highlighting scheduled upcoming sessions with one-click Google Meet joins, lesson attendance status, makeup tracking, and downloadable tuition fee receipts.

- **Confirmed Decision 1**: Implemented unified navigation bar with immediate role-switch affordances (Public Website, Student Hub, Admin Management).
- **Confirmed Decision 2**: Local browser persistence (localStorage) powering two-way synchronization: any student registering and paying immediately populates the Admin Google Sheets database (Students, Bookings, Payments) and becomes accessible in the Student Hub.
- **Confirmed Decision 3**: Carnatic cultural visual identity using authentic South Indian classical palette: Rich Maroon (`#642B3B`), Deep Burgandy (`#401B29`), Temple Gold (`#C49A52`), Alabaster Cream (`#FBF7F0`), and Charcoal Ink (`#28242A`) with refined serif and geometric typography.

---

## 1. Overview & Core Concept

**Swaralaya Carnatic Music Academy** bridges centuries of South Indian classical music tradition (*Śruti, Laya, Bhāva*) with modern digital management. Built to embody the exact 10-page structure and operational workflow outlined in the Academy Implementation Manual, the platform delivers:

1. **Public Academy Experience (Google Sites Inspiration)**: Complete institutional presence covering the Trinity heritage, vocal & instrumental disciplines (Veena, Violin, Mridangam, Carnatic Theory), tutor credentials, class schedules, and interactive fee package calculators.
2. **Interactive 3-Step Registration Engine**: Structured student intake with real-time fee recalculation based on course, frequency (4/8/12 classes/month), duration (30/45/60/90 mins), mode (Online, In-Person, Hybrid), and coupon validation (`SWARA10`).
3. **Tuition Payment Gateway & Invoicing**: Streamlined simulated payment gateway supporting Indian payment methods (UPI, Rupay/Visa/Mastercard, Net Banking), real-time transaction reference generation, and print/downloadable formal GST-compliant PDF invoice receipts.
4. **Student Learning Portal**: Personal dashboard displaying upcoming lessons, assigned tutor information, Google Meet link launcher, attendance records with status filters (Present, Makeup Required), and payment history.
5. **Administrative Console & Operational Google Sheets**: Interactive replicas of the 10 core administrative Google Sheets tabs (Students, Tutors, Courses, Bookings, Payments, Attendance, Enquiries, Fee Plans, Availability, Settings) with status editing, search/filter, and export features.

---

## 2. User Experience & Visual Design

### Key User Flows

```
[ Visitor / Prospective Student ]
        │
        ├──► Explores Courses, Tutors, Fee Calculator & Timings
        │
        └──► 3-Step Enrolment Form:
                 1. Personal & Guardian Details + Language
                 2. Course (Vocal, Veena, Violin, Mridangam) + Mode + Slots
                 3. Live Fee Breakdown + SWARA10 Promo Code + Consent
                        │
                        ▼
             [ Secure Payment Gateway ]
             (Card / UPI QR / Net Banking)
                        │
                        ▼
             [ Instant Confirmation & PDF Invoice Download ]
                        │
                        ▼
[ Student Portal ] ◄────┴────► [ Admin Management Console ]
• Google Meet Class Launcher     • 10 Google Sheets Database Tabs
• Attendance Tracker             • Tutor Assignment & Booking Engine
• Lesson Material & Audio Notes  • Fee Plan Pricing Configuration
• Downloadable Past Receipts     • Operational Readiness Checklist
```

### Visual Identity & Theme Tokens

- **Dominant Neutral Canvas (60%)**: Archival Cream (`#FBF7F0` / `stone-50`) paired with Crisp Studio White cards.
- **Structural Surfaces & Headers (30%)**: Royal Temple Maroon (`#642B3B`), Deep Royal Wine (`#401B29`), hairline borders (`#E5DFD5`), and Antique Charcoal (`#28242A`) body text.
- **Focal Accents (10%)**: Classical Temple Gold (`#C49A52`), Emerald verification badges (`#059669`), and Deep Lapis links.
- **Typography**:
  - **Display / Headings**: Cormorant Garamond / Playfair Display inspired classical serif styling.
  - **Interface & Form Controls**: Plus Jakarta Sans for crisp legibility and effortless data entry.
  - **Pricing & Schedule Tables**: Tabular figures (`tabular-nums font-mono`) ensuring neat vertical alignment.
- **Zero-Pill Restraint**: Metadata rendered with quiet typographic bullets (`·`), clear natural section labels (`01. Your details`, `02. Learning plan`), and no decorative pseudo-code clutter.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Unified Interactive Portal vs. Separate Fragmented Apps**
  - *Chosen Approach*: Single cohesive web application with a persistent top navigation bar allowing instant switching between the **Academy Public Site**, **Student Hub**, and **Admin Console**.
  - *Why*: Eliminates context loss during evaluation, allowing administrators and students to test end-to-end registration, payment, booking creation, and attendance in real time.
- **Decision 2: Local Storage Synchronized State vs. Hardcoded Static Data**
  - *Chosen Approach*: Seeded initial master records (courses, expert tutors, demo bookings, fee structures) stored in reactive state backed by `localStorage`.
  - *Why*: Any new student registration immediately updates the live booking calendar, payment ledger, and student records, demonstrating real system behavior without requiring third-party credentials.
- **Decision 3: Client-Side Vector PDF Invoice Generator**
  - *Chosen Approach*: Clean browser-native print and download engine rendering professional invoices with Academy header, GST/Tax breakdown, student ID, transaction reference, course details, and signature seal.
  - *Why*: Works hermetically in sandboxed iframe environments with zero external network dependencies.

---

## 4. Technical Architecture & Data Strategy

### System & Component Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Root (src/App.tsx)                          │
│  - Active View State (Public Site / Student Portal / Admin Console)    │
│  - Central Academy Data Store (localStorage synced)                    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          ▼                         ▼                         ▼
┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐
│   Public Academy  │     │   Student Portal  │     │   Admin Console   │
│   Site (10 Pages) │     │     Dashboard     │     │   & Operations    │
├───────────────────┤     ├───────────────────┤     ├───────────────────┤
│ • Header & Nav    │     │ • Active Enrolment│     │ • KPI Overview    │
│ • Trinity Banner  │     │ • Upcoming Classes│     │ • 10 Google Sheets│
│ • Courses Catalog │     │ • Google Meet CTA │     │   Database Tabs   │
│ • Tutor Profiles  │     │ • Attendance Log  │     │ • Fee Plan Config │
│ • Fee Calculator  │     │ • Payment History │     │ • Booking Approver│
│ • Registration    │     │ • Invoice Viewer  │     │ • Operations      │
│   Wizard (3 steps)│     │ • Change Request  │     │   Checklist       │
│ • Contact & Maps  │     └───────────────────┘     └───────────────────┘
└─────────┬─────────┘
          │
          ▼
┌───────────────────────────────────────────────────────────────────────┐
│                 Payment Modal & Invoice Subsystem                     │
│  - Gateway Dialog: Card / UPI QR / Net Banking simulator             │
│  - Instant Transaction Reference & Receipt Verification               │
│  - Printable / Downloadable Formal PDF Invoice Component              │
└───────────────────────────────────────────────────────────────────────┘
```

### Data Schema (Aligned with Section 5 Google Sheets Spec)

- **Students**: `Student_ID`, `Full_Name`, `Email`, `Phone`, `Age_Group`, `Guardian_Name`, `Language`, `Course_ID`, `Level`, `Mode`, `Tutor_ID`, `Status`, `StartDate`.
- **Courses**: `Course_ID`, `Course_Name`, `Level`, `Description`, `Duration`, `Monthly_Fee`, `Registration_Fee`, `Modes`.
- **Tutors**: `Tutor_ID`, `Name`, `Specialisation`, `Qualifications`, `Experience`, `Languages`, `Weekly_Capacity`, `Rating`.
- **Bookings**: `Booking_ID`, `Student_ID`, `Tutor_ID`, `Course_ID`, `Session_Date`, `Time_Slot`, `Mode`, `Meet_Link`, `Status`.
- **Payments**: `Payment_ID`, `Student_ID`, `Amount_Due`, `Amount_Received`, `Date`, `Method`, `Txn_Ref`, `Status`, `Receipt_Ref`.
- **Attendance**: `Attendance_ID`, `Booking_ID`, `Student_ID`, `Tutor_ID`, `Date`, `Status`, `Tutor_Notes`.
- **Enquiries**: `Enquiry_ID`, `Date`, `Name`, `Email`, `Course_Interest`, `Status`, `Message`.
- **Fee Plans**: `Plan_ID`, `Plan_Name`, `Classes_Per_Month`, `Duration`, `Registration_Fee`, `Monthly_Fee`.

---

## 5. Implementation Sequence

1. **Metadata & Entry Setup**: Update `metadata.json` and `index.html` with title "Swaralaya Carnatic Music Academy", authentic typography fonts (Cinzel / Playfair & Plus Jakarta Sans), and responsive viewport tags.
2. **Design Tokens & Theme Styling**: Configure classical Carnatic color palette (`maroon`, `deep-maroon`, `gold`, `cream`, `ink`) in Tailwind CSS with hairline border discipline.
3. **Core Data Repository & Types**: Create comprehensive TypeScript definitions for all 10 Google Sheets tabs and seeded data (courses: Vocal, Veena, Violin, Mridangam, Theory; verified tutors; sample bookings; fee matrix).
4. **Interactive Registration & Live Tuition Calculator**: Implement the 3-step registration flow with instant fee updates, frequency selection, promo code validation, and validation checks.
5. **Simulated Payment Gateway & PDF Invoice**:
   - Realistic multi-tab checkout dialog (UPI with instant QR code & UPI ID, Credit/Debit card with CVV validation, Net Banking list).
   - Instant receipt generation with downloadable/printable GST invoice view.
6. **Student Hub**: Active student view with next scheduled class countdown, direct Google Meet link launcher, attendance history table, and downloadable receipts.
7. **Admin Management Console & Sheets Viewer**: Multi-tab management view displaying live filtered tables for all Google Sheets tabs (Students, Bookings, Payments, Attendance, Tutors, Enquiries, Settings), allowing inline status changes and fee adjustments.
8. **Verification**: Run `compile_applet` and verify zero TypeScript or styling errors across desktop and mobile screens.
