import React, { useState } from 'react';
import { PaymentMethod, Payment } from '../types/academy';
import { ShieldCheck, QrCode, CreditCard, Building2, Lock, CheckCircle2, ArrowRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentModalProps {
  studentName: string;
  studentId: string;
  studentEmail: string;
  courseName: string;
  amount: number;
  discount: number;
  onSuccess: (payment: Payment) => void;
  onCancel: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  studentName,
  studentId,
  studentEmail,
  courseName,
  amount,
  discount,
  onSuccess,
  onCancel
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepMessage, setStepMessage] = useState('');
  
  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState(studentName || '');

  // UPI State
  const [upiId, setUpiId] = useState(studentEmail ? `${studentEmail.split('@')[0]}@okhdfcbank` : 'student@okhdfcbank');

  // Net Banking State
  const [selectedBank, setSelectedBank] = useState('State Bank of India');

  const popularBanks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Canara Bank',
    'Kotak Mahindra Bank'
  ];

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2, 4)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const executePayment = () => {
    setIsProcessing(true);
    setStepMessage('Connecting to secure banking gateway...');

    setTimeout(() => {
      setStepMessage('Verifying 256-bit tokenized credentials...');
    }, 900);

    setTimeout(() => {
      setStepMessage('Finalizing tuition settlement with Swaralaya Reserve...');
    }, 1800);

    setTimeout(() => {
      setIsProcessing(false);

      // Fire celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback gracefully if confetti fails
      }

      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const generatedTxnRef = selectedMethod === 'UPI' 
        ? `UPI/HDFC/${randomSuffix}` 
        : selectedMethod === 'Card' 
        ? `CARD/GATEWAY/${randomSuffix}` 
        : `NB/${selectedBank.replace(/\s+/g, '')}/${randomSuffix}`;

      const receiptRef = `RCP-SWARA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newPayment: Payment = {
        Payment_ID: `PAY-${Date.now()}`,
        Student_ID: studentId,
        Student_Name: studentName,
        Course_Name: courseName,
        Billing_Period: 'First Month Tuition & Enrolment',
        Invoice_Date: new Date().toISOString().split('T')[0],
        Due_Date: new Date().toISOString().split('T')[0],
        Fee_Type: discount > 0 ? 'Enrolment + Tuition (Promo SWARA10)' : 'Enrolment + Tuition',
        Amount_Due: amount + discount,
        Amount_Received: amount,
        Discount_Applied: discount,
        Payment_Date: new Date().toISOString().split('T')[0],
        Payment_Method: selectedMethod,
        Transaction_Reference: generatedTxnRef,
        Verification_Status: 'Verified',
        Verified_By: 'Swaralaya Automated Gateway',
        Receipt_Reference: receiptRef,
        Notes: `Streamlined tuition transaction authorized via ${selectedMethod}.`
      };

      onSuccess(newPayment);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#642B3B] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#C49A52] text-lg">♫</span>
              <h3 className="font-serif-title font-semibold tracking-wide text-base">
                Secure Tuition Checkout
              </h3>
            </div>
            <p className="text-xs text-[#FBF7F0]/80 mt-0.5">
              Swaralaya Carnatic Music Academy · Payment Gateway
            </p>
          </div>
          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="p-1.5 text-white/70 hover:text-white rounded hover:bg-white/10 transition-colors"
            aria-label="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Summary Strip */}
        <div className="px-6 py-3.5 bg-[#FBF7F0] border-b border-[#E5DFD5] flex items-center justify-between">
          <div>
            <p className="text-xs text-stone-500 font-medium">Payable for {courseName}</p>
            <p className="text-xs text-stone-700">
              Student: <span className="font-semibold">{studentName}</span> ({studentId})
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-stone-400 uppercase font-medium">Total Payable</span>
            <p className="text-xl font-bold text-[#642B3B] font-mono-nums">
              ₹{amount.toLocaleString('en-IN')}
            </p>
            {discount > 0 && (
              <span className="text-[10px] text-emerald-700 font-semibold block">
                Saved ₹{discount} with SWARA10
              </span>
            )}
          </div>
        </div>

        {/* Payment Methods Tabs */}
        <div className="grid grid-cols-3 border-b border-stone-200 bg-stone-50 text-xs font-medium">
          <button
            type="button"
            onClick={() => setSelectedMethod('UPI')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              selectedMethod === 'UPI'
                ? 'border-[#642B3B] text-[#642B3B] bg-white font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>UPI / QR</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedMethod('Card')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              selectedMethod === 'Card'
                ? 'border-[#642B3B] text-[#642B3B] bg-white font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Cards</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedMethod('Net Banking')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              selectedMethod === 'Net Banking'
                ? 'border-[#642B3B] text-[#642B3B] bg-white font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Net Banking</span>
          </button>
        </div>

        {/* Method Panels */}
        <div className="p-6">
          {selectedMethod === 'UPI' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-stone-50 rounded-lg border border-stone-200">
                {/* Simulated dynamic UPI QR code */}
                <div className="relative p-2 bg-white rounded-lg border border-stone-300 shadow-xs flex-shrink-0">
                  <div className="w-28 h-28 bg-[#FBF7F0] border-2 border-[#642B3B] rounded flex flex-col items-center justify-center p-2 text-center">
                    <QrCode className="w-16 h-16 text-[#642B3B]" />
                    <span className="text-[9px] font-mono-nums font-bold text-[#642B3B] mt-1">
                      ₹{amount}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#C49A52] text-[9px] font-semibold text-white px-1.5 py-0.2 rounded-full whitespace-nowrap">
                    Instant Scan
                  </div>
                </div>

                <div className="text-xs space-y-1.5 text-center sm:text-left">
                  <p className="font-semibold text-stone-800">Scan with any UPI App</p>
                  <p className="text-stone-500 text-[11px]">
                    Google Pay · PhonePe · Paytm · BHIM · Cred
                  </p>
                  <div className="pt-1">
                    <span className="text-[10px] text-stone-400 uppercase font-medium">Academy VPA</span>
                    <p className="font-mono text-stone-800 font-medium bg-white px-2 py-1 rounded border border-stone-200 inline-block">
                      swaralaya.academy@hdfcbank
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Or enter your UPI ID (VPA)
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="name@okhdfcbank"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#642B3B] font-mono"
                />
              </div>
            </div>
          )}

          {selectedMethod === 'Card' && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="4123 4567 8901 2345"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#642B3B] font-mono-nums tracking-wider"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-bold text-stone-400">
                    <span>RuPay</span>
                    <span>·</span>
                    <span>VISA</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="Name as on Card"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#642B3B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#642B3B] font-mono-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.slice(0, 3))}
                    placeholder="•••"
                    maxLength={3}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#642B3B] font-mono-nums tracking-widest"
                  />
                </div>
              </div>
            </div>
          )}

          {selectedMethod === 'Net Banking' && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-stone-700">
                Select your Bank for Net Banking
              </label>
              <div className="grid grid-cols-2 gap-2">
                {popularBanks.map((bank) => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => setSelectedBank(bank)}
                    className={`p-2.5 text-xs text-left rounded border transition-all ${
                      selectedBank === bank
                        ? 'border-[#642B3B] bg-[#642B3B]/5 text-[#642B3B] font-semibold'
                        : 'border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {bank}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              256-bit Bank Grade Encrypted Session
            </span>
            <span>Zero Payment Gateway Surcharge</span>
          </div>

          {/* Action Button */}
          <div className="mt-5">
            <button
              type="button"
              onClick={executePayment}
              disabled={isProcessing}
              className="w-full py-3 px-4 bg-[#642B3B] hover:bg-[#401B29] disabled:bg-stone-400 text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2 text-sm"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{stepMessage}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#C49A52]" />
                  <span>Pay ₹{amount.toLocaleString('en-IN')} & Generate Tax Invoice</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
