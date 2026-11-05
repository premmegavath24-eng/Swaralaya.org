import React from 'react';
import { Payment, Student } from '../types/academy';
import { Printer, Download, CheckCircle, ShieldCheck, X } from 'lucide-react';

interface InvoiceModalProps {
  payment: Payment;
  student?: Student;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ payment, student, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCopy = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      invoice_number: payment.Receipt_Reference,
      transaction_id: payment.Transaction_Reference,
      student_name: payment.Student_Name,
      student_id: payment.Student_ID,
      course: payment.Course_Name,
      amount_received: payment.Amount_Received,
      discount_applied: payment.Discount_Applied,
      payment_method: payment.Payment_Method,
      date: payment.Payment_Date,
      verification_status: payment.Verification_Status,
      issued_by: 'Swaralaya Carnatic Music Academy, Chennai'
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Invoice_${payment.Receipt_Reference}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FBF7F0] rounded-xl shadow-2xl border border-[#E5DFD5] overflow-hidden my-8">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-[#642B3B] text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C49A52]" />
            <span className="font-serif-title font-semibold tracking-wide text-sm sm:text-base">
              Official Tuition Receipt & Tax Invoice
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#401B29] hover:bg-black/30 rounded border border-white/20 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={handleDownloadCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#401B29] bg-[#C49A52] hover:bg-[#b08742] rounded transition-colors font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Record</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white rounded-md hover:bg-white/10 ml-2"
              aria-label="Close invoice"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div id="printable-invoice" className="invoice-paper p-8 sm:p-10 bg-white text-[#28242A]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between border-b-2 border-[#642B3B] pb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#642B3B]">
                <span className="text-xl">♫</span>
                <span className="font-serif-title text-xl sm:text-2xl font-bold tracking-wider">
                  SWARALAYA
                </span>
              </div>
              <p className="text-xs uppercase tracking-widest text-[#642B3B]/80 font-medium mt-0.5">
                Carnatic Music Academy
              </p>
              <p className="text-xs text-stone-600 mt-2 max-w-sm leading-relaxed">
                No. 14, Raga Malika Enclave, TTK Road, Alwarpet, Chennai, Tamil Nadu 600018<br />
                GSTIN: 33AABCS1429B1Z2 · SAC: 999293 (Classical Arts Education)
              </p>
            </div>
            <div className="sm:text-right">
              <span className="inline-block px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                Payment Verified
              </span>
              <p className="text-sm font-bold text-stone-900 mt-2 font-mono-nums">
                Receipt #{payment.Receipt_Reference}
              </p>
              <p className="text-xs text-stone-500 font-mono-nums">
                Date: {payment.Payment_Date}
              </p>
            </div>
          </div>

          {/* Student & Payment Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-stone-200 text-xs">
            <div>
              <h4 className="font-bold text-stone-800 uppercase tracking-wider mb-2 text-[11px]">
                Billed To (Student)
              </h4>
              <p className="text-sm font-semibold text-stone-900">{payment.Student_Name}</p>
              <p className="text-stone-600 font-mono-nums">ID: {payment.Student_ID}</p>
              {student && (
                <>
                  <p className="text-stone-600">{student.Email}</p>
                  <p className="text-stone-600 font-mono-nums">{student.Phone}</p>
                  <p className="text-stone-600 mt-1">
                    Learning Mode: <span className="font-medium">{student.Preferred_Mode}</span>
                  </p>
                </>
              )}
            </div>
            <div className="sm:text-right">
              <h4 className="font-bold text-stone-800 uppercase tracking-wider mb-2 text-[11px]">
                Payment Transaction Details
              </h4>
              <p className="text-stone-600">
                Payment Method: <span className="font-semibold text-stone-900">{payment.Payment_Method}</span>
              </p>
              <p className="text-stone-600 font-mono-nums break-all">
                Ref: {payment.Transaction_Reference}
              </p>
              <p className="text-stone-600">
                Billing Cycle: <span className="font-medium text-stone-800">{payment.Billing_Period}</span>
              </p>
              <p className="text-stone-600">
                Verified By: <span className="font-medium text-stone-800">{payment.Verified_By}</span>
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="py-6">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-300 text-stone-600 uppercase text-[10px] tracking-wider">
                  <th className="py-2 font-semibold">Description</th>
                  <th className="py-2 text-center font-semibold">Classes / Duration</th>
                  <th className="py-2 text-right font-semibold">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800">
                <tr>
                  <td className="py-3">
                    <p className="font-semibold text-stone-900">{payment.Course_Name}</p>
                    <p className="text-[11px] text-stone-500">Curriculum: South Indian Classical Tradition</p>
                  </td>
                  <td className="py-3 text-center text-stone-600">
                    {student ? `${student.Classes_Per_Month} sessions · ${student.Duration_Minutes}m` : '8 sessions · 60m'}
                  </td>
                  <td className="py-3 text-right font-mono-nums">
                    ₹{(payment.Amount_Due + payment.Discount_Applied - 300).toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr>
                  <td className="py-3">
                    <p className="font-semibold text-stone-900">One-time Academy Enrolment Fee</p>
                    <p className="text-[11px] text-stone-500">Student ID generation & syllabus packet</p>
                  </td>
                  <td className="py-3 text-center text-stone-600">One-time</td>
                  <td className="py-3 text-right font-mono-nums">₹300</td>
                </tr>
                {payment.Discount_Applied > 0 && (
                  <tr className="text-emerald-700">
                    <td className="py-3">
                      <p className="font-medium">Promotional Discount (Promo Code SWARA10)</p>
                      <p className="text-[11px] text-emerald-600">10% First-month Tuition Waiver</p>
                    </td>
                    <td className="py-3 text-center">—</td>
                    <td className="py-3 text-right font-mono-nums">−₹{payment.Discount_Applied.toLocaleString('en-IN')}</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Calculations Box */}
            <div className="mt-6 pt-4 border-t border-stone-300 flex flex-col items-end text-xs">
              <div className="w-full sm:w-64 space-y-1.5">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal:</span>
                  <span className="font-mono-nums">₹{payment.Amount_Received.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-500 text-[11px]">
                  <span>GST (CGST 0% + SGST 0%):</span>
                  <span className="font-mono-nums">Exempt</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#642B3B] pt-2 border-t border-stone-200">
                  <span>Total Amount Paid:</span>
                  <span className="font-mono-nums">₹{payment.Amount_Received.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seal & Signatory Footer */}
          <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#C49A52] flex flex-col items-center justify-center text-[8px] font-serif-title font-bold text-[#642B3B] text-center p-1 leading-tight">
                <span>SWARALAYA</span>
                <span className="text-[6px] text-[#C49A52]">VERIFIED</span>
              </div>
              <div>
                <p className="text-stone-700 font-medium">Computer Generated Digital Invoice</p>
                <p className="text-[10px]">No physical signature required · Authorized by Academic Council</p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <div className="h-8 flex items-end justify-center sm:justify-end">
                <span className="font-serif-classic italic text-base text-[#642B3B] font-semibold">
                  Prem Megavath
                </span>
              </div>
              <p className="text-[10px] text-stone-600 uppercase font-medium">
                Registrar & Financial Controller
              </p>
            </div>
          </div>

          {/* Policy Note */}
          <div className="mt-6 p-3 bg-stone-50 rounded text-[10px] text-stone-500 leading-relaxed border border-stone-200">
            <strong>Tuition Policy Notice:</strong> Tuition covers regular monthly sessions per the academy timetable. Rescheduling requires 24 hours prior notice to your assigned tutor. For questions regarding payments or receipt records, write to admissions@swaralaya-academy.org.
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="no-print p-4 bg-[#FBF7F0] border-t border-[#E5DFD5] flex justify-between items-center text-xs">
          <span className="text-stone-600 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Instant copy saved to your Student Hub receipts ledger.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#642B3B] hover:bg-[#401B29] text-white font-medium rounded-md transition-colors"
          >
            Close Invoice
          </button>
        </div>

      </div>
    </div>
  );
};
