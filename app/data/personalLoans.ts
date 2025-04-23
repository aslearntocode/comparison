export interface UserFeedback {
  comment: string;
  rating: number;
  date: string;
  userId: string;
  userName: string;
  loanId: string;
  loanName: string;
}

export interface PersonalLoan {
  id: string;
  name: string;
  bank: string;
  image: string;
  interestRate: string;
  processingFee: string;
  loanAmount: string;
  tenure: string;
  emi: string;
  features: string[];
  feedback: UserFeedback[];
  additionalDetails?: {
    eligibilityCriteria?: string[];
    documentsRequired?: string[];
    prepaymentCharges?: string;
    latePaymentCharges?: string;
    insuranceCover?: string[];
    additionalBenefits?: string[];
    minimumIncome?: string;
    maximumLoanAmount?: string;
    minimumLoanAmount?: string;
    maximumTenure?: string;
    minimumTenure?: string;
    additionalServices?: string;
    idealFor?: string[];
    notIdealFor?: string[];
    summary?: string;
  };
}

export const personalLoans: PersonalLoan[] = [
  {
    id: 'hdfc-personal',
    name: 'HDFC Bank Personal Loan',
    bank: 'HDFC Bank',
    image: '/loans/hdfc-personal.png',
    interestRate: '10.75% p.a.',
    processingFee: '1%',
    loanAmount: '₹5,00,000',
    tenure: '36 months',
    emi: '₹16,289',
    features: [
      'Quick Disbursal',
      'No Collateral Required',
      'Flexible Tenure',
      'Competitive Interest Rates',
      'Online Application',
      'Minimal Documentation'
    ],
    feedback: [
      { comment: "Very quick approval process!", rating: 9, date: "2024-03-15", userId: "user123", userName: "John Doe", loanId: "hdfc-personal", loanName: "HDFC Bank Personal Loan" },
      { comment: "Good interest rates and flexible terms", rating: 8, date: "2024-03-10", userId: "user456", userName: "Jane Smith", loanId: "hdfc-personal", loanName: "HDFC Bank Personal Loan" },
      { comment: "Excellent customer service throughout the process", rating: 9, date: "2024-03-05", userId: "user789", userName: "Bob Johnson", loanId: "hdfc-personal", loanName: "HDFC Bank Personal Loan" }
    ],
    additionalDetails: {
      eligibilityCriteria: [
        'Age: 21-60 years',
        'Minimum Income: ₹25,000 per month',
        'Minimum Work Experience: 2 years',
        'Good Credit Score: 750+'
      ],
      documentsRequired: [
        'Identity Proof (Aadhaar/PAN)',
        'Address Proof',
        'Income Proof (Salary Slips/Bank Statements)',
        'Employment Proof'
      ],
      prepaymentCharges: '2% of outstanding amount',
      latePaymentCharges: '2% per month on overdue amount',
      insuranceCover: [
        'Personal Accident Insurance',
        'Critical Illness Cover',
        'Job Loss Protection'
      ],
      additionalBenefits: [
        'Zero Foreclosure Charges after 12 EMIs',
        'Flexible EMI Options',
        'Online Account Management',
        '24/7 Customer Support'
      ],
      minimumIncome: '₹25,000 per month',
      maximumLoanAmount: '₹40,00,000',
      minimumLoanAmount: '₹50,000',
      maximumTenure: '60 months',
      minimumTenure: '12 months',
      additionalServices: '24x7 online loan management portal with real-time EMI calculator and payment tracking',
      idealFor: [
        'Salaried Professionals: With stable income and good credit history',
        'Business Owners: Looking for quick funding without collateral',
        'Home Renovation: For those planning to upgrade their living space',
        'Wedding Expenses: For families planning big celebrations',
        'Medical Emergencies: For unexpected healthcare expenses'
      ],
      notIdealFor: [
        'Individuals with poor credit history',
        'Those with unstable income',
        'People looking for very long-term loans',
        'Those who cannot afford the EMI payments'
      ],
      summary: 'A versatile personal loan option with competitive rates, quick processing, and flexible terms, ideal for various personal needs.'
    }
  },
  {
    id: 'icici-personal',
    name: 'ICICI Bank Personal Loan',
    bank: 'ICICI Bank',
    image: '/loans/icici-personal.png',
    interestRate: '11.25% p.a.',
    processingFee: '1.5%',
    loanAmount: '₹3,00,000',
    tenure: '24 months',
    emi: '₹14,000',
    features: [
      'Instant Approval',
      'No Security Required',
      'Competitive Rates',
      'Easy Documentation',
      'Online Process',
      'Quick Disbursal'
    ],
    feedback: [
      { comment: "Super fast approval and disbursal!", rating: 9.5, date: "2024-03-12", userId: "user123", userName: "John Doe", loanId: "icici-personal", loanName: "ICICI Bank Personal Loan" },
      { comment: "Good customer service and transparent process", rating: 8, date: "2024-03-08", userId: "user456", userName: "Jane Smith", loanId: "icici-personal", loanName: "ICICI Bank Personal Loan" }
    ],
    additionalDetails: {
      eligibilityCriteria: [
        'Age: 23-58 years',
        'Minimum Income: ₹30,000 per month',
        'Minimum Work Experience: 3 years',
        'Credit Score: 700+'
      ],
      documentsRequired: [
        'PAN Card',
        'Aadhaar Card',
        'Salary Slips (Last 3 months)',
        'Bank Statements (Last 6 months)',
        'Employment Proof'
      ],
      prepaymentCharges: '3% of outstanding amount',
      latePaymentCharges: '2.5% per month on overdue amount',
      insuranceCover: [
        'Personal Accident Insurance',
        'Critical Illness Cover',
        'Job Loss Protection'
      ],
      additionalBenefits: [
        'No Foreclosure Charges after 24 EMIs',
        'Flexible EMI Options',
        'Online Account Management',
        '24/7 Customer Support'
      ],
      minimumIncome: '₹30,000 per month',
      maximumLoanAmount: '₹30,00,000',
      minimumLoanAmount: '₹50,000',
      maximumTenure: '48 months',
      minimumTenure: '12 months',
      additionalServices: 'Mobile app for loan management with real-time EMI calculator and payment tracking',
      idealFor: [
        'Salaried Professionals: With stable income and good credit history',
        'Business Owners: Looking for quick funding without collateral',
        'Home Renovation: For those planning to upgrade their living space',
        'Wedding Expenses: For families planning big celebrations',
        'Medical Emergencies: For unexpected healthcare expenses'
      ],
      notIdealFor: [
        'Individuals with poor credit history',
        'Those with unstable income',
        'People looking for very long-term loans',
        'Those who cannot afford the EMI payments'
      ],
      summary: 'A reliable personal loan option with competitive rates, quick processing, and flexible terms, ideal for various personal needs.'
    }
  }
]; 