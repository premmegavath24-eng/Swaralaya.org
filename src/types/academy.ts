export type TeachingMode = 'Online' | 'In-person' | 'Hybrid';
export type LearningLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Unsure; need guidance';
export type AgeGroup = 'Under 13' | '13–17' | '18 and above';
export type StudentStatus = 
  | 'New Application' 
  | 'Under Review' 
  | 'Awaiting Payment' 
  | 'Awaiting Tutor' 
  | 'Active' 
  | 'Paused' 
  | 'Completed' 
  | 'Rejected' 
  | 'Withdrawn';

export type BookingStatus = 
  | 'Requested' 
  | 'Confirmed' 
  | 'Completed' 
  | 'Reschedule Requested' 
  | 'Cancelled' 
  | 'No Show';

export type PaymentMethod = 'UPI' | 'Card' | 'Net Banking' | 'Bank Transfer';
export type PaymentStatus = 'Pending' | 'Verified' | 'Partially Paid' | 'Rejected' | 'Refunded';

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Cancelled' | 'Makeup Completed';

export interface Course {
  Course_ID: string;
  Course_Name: string;
  Level: string;
  Description: string;
  Default_Duration_Minutes: number;
  Classes_Per_Month: number;
  Monthly_Fee: number;
  Registration_Fee: number;
  Teaching_Modes: TeachingMode[];
  Active_Status: boolean;
  Image_Url: string;
  Syllabus: string[];
}

export interface Tutor {
  Tutor_ID: string;
  Tutor_Name: string;
  Email: string;
  Phone: string;
  Specialisation: string;
  Course_IDs: string[];
  Qualifications: string;
  Experience: string;
  Languages: string[];
  Teaching_Modes: TeachingMode[];
  Weekly_Capacity: number;
  Availability_Notes: string;
  Active_Status: boolean;
  Rating: number;
  Image_Url: string;
}

export interface Student {
  Student_ID: string;
  Registration_Date: string;
  Full_Name: string;
  Email: string;
  Phone: string;
  Age_Group: AgeGroup;
  Guardian_Name?: string;
  Guardian_Contact?: string;
  Preferred_Language: string;
  Course_ID: string;
  Level: LearningLevel;
  Preferred_Mode: TeachingMode;
  Preferred_Tutor_ID?: string;
  Student_Status: StudentStatus;
  Start_Date: string;
  Notes?: string;
  Classes_Per_Month: number;
  Duration_Minutes: number;
}

export interface Booking {
  Booking_ID: string;
  Student_ID: string;
  Tutor_ID: string;
  Course_ID: string;
  Session_Date: string;
  Start_Time: string;
  End_Time: string;
  Time_Zone: string;
  Teaching_Mode: TeachingMode;
  Meeting_Location: string;
  Meeting_Link_Restricted: string;
  Booking_Status: BookingStatus;
  Calendar_Event_ID: string;
  Created_Date: string;
  Last_Updated: string;
  Change_Reason?: string;
}

export interface Payment {
  Payment_ID: string;
  Student_ID: string;
  Student_Name: string;
  Course_Name: string;
  Billing_Period: string;
  Invoice_Date: string;
  Due_Date: string;
  Fee_Type: string;
  Amount_Due: number;
  Amount_Received: number;
  Discount_Applied: number;
  Payment_Date: string;
  Payment_Method: PaymentMethod;
  Transaction_Reference: string;
  Verification_Status: PaymentStatus;
  Verified_By: string;
  Receipt_Reference: string;
  Notes: string;
}

export interface AttendanceRecord {
  Attendance_ID: string;
  Booking_ID: string;
  Student_ID: string;
  Student_Name: string;
  Tutor_ID: string;
  Tutor_Name: string;
  Session_Date: string;
  Attendance_Status: AttendanceStatus;
  Lesson_Completed: boolean;
  Makeup_Required: boolean;
  Tutor_Notes: string;
  Follow_Up_Status: string;
}

export interface Enquiry {
  Enquiry_ID: string;
  Date_Received: string;
  Name: string;
  Email: string;
  Phone: string;
  Course_Interest: string;
  Learning_Level: string;
  Preferred_Mode: string;
  Enquiry_Message: string;
  Follow_Up_Date: string;
  Follow_Up_Status: string;
  Assigned_Staff: string;
  Outcome: string;
}

export interface FeePlan {
  Plan_ID: string;
  Plan_Name: string;
  Course_ID: string;
  Classes_Per_Month: number;
  Duration_Minutes: number;
  Registration_Fee: number;
  Monthly_Fee: number;
  Mode_Adjustment: number;
  Discount_Rules: string;
  Effective_From: string;
  Active_Status: boolean;
}

export interface Setting {
  Setting_Key: string;
  Setting_Value: string;
  Description: string;
  Last_Updated: string;
  Updated_By: string;
}
