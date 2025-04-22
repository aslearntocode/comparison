'use client'

import { useState, use } from 'react'
import Header from "@/components/Header"
import Link from 'next/link'

interface UserFeedback {
  comment: string;
  rating: number;
  date: string;
}

interface PersonalLoan {
  id: string;
  bankName: string;
  logo: string;
  interestRate: string;
  processingFee: string;
  maxAmount: string;
  minAmount: string;
  maxTenure: string;
  minTenure: string;
  features: string[];
  feedback: UserFeedback[];
  additionalDetails: {
    prepaymentCharges: string;
    foreclosureCharges: string;
    disbursalTime: string;
    requiredDocuments: string[];
    eligibility: {
      minIncome: string;
      minAge: string;
      maxAge: string;
      employmentType: string[];
      creditScore: string;
    };
  };
}

// Sample personal loan data - in a real app, this would come from an API or database
const personalLoans: { [key: string]: PersonalLoan } = {
  'loan1': {
    id: 'loan1',
    bankName: 'ABC Bank',
    logo: '/bank-logos/abc-bank.png',
    interestRate: '10.75% p.a.',
    processingFee: '1% of loan amount',
    maxAmount: '₹25,00,000',
    minAmount: '₹50,000',
    maxTenure: '60 months',
    minTenure: '12 months',
    features: ['Quick Approval', 'Minimal Documentation', 'No Collateral Required'],
    feedback: [
      { comment: "Quick processing and minimal documentation", rating: 8.5, date: "2024-03-15" },
      { comment: "Good interest rates but high processing fees", rating: 7, date: "2024-03-10" }
    ],
    additionalDetails: {
      prepaymentCharges: 'Nil for floating rate loans',
      foreclosureCharges: '2% of outstanding amount',
      disbursalTime: '24-48 hours',
      requiredDocuments: [
        'Identity Proof',
        'Address Proof',
        'Income Proof',
        'Bank Statements (3 months)',
        'Salary Slips (3 months)'
      ],
      eligibility: {
        minIncome: '₹25,000 per month',
        minAge: '21 years',
        maxAge: '60 years',
        employmentType: ['Salaried', 'Self-Employed'],
        creditScore: '700+'
      }
    }
  },
  'loan2': {
    id: 'loan2',
    bankName: 'XYZ Bank',
    logo: '/bank-logos/xyz-bank.png',
    interestRate: '11.25% p.a.',
    processingFee: '0.75% of loan amount',
    maxAmount: '₹20,00,000',
    minAmount: '₹1,00,000',
    maxTenure: '72 months',
    minTenure: '12 months',
    features: ['Zero Prepayment Charges', 'Flexible Tenure', 'Digital Process'],
    feedback: [
      { comment: "Excellent digital process, very convenient", rating: 9, date: "2024-03-14" },
      { comment: "Competitive interest rates", rating: 8, date: "2024-03-09" }
    ],
    additionalDetails: {
      prepaymentCharges: 'Nil',
      foreclosureCharges: 'Nil after 12 months',
      disbursalTime: '72 hours',
      requiredDocuments: [
        'PAN Card',
        'Aadhaar Card',
        'Income Tax Returns (2 years)',
        'Bank Statements (6 months)',
        'Salary Slips (3 months)'
      ],
      eligibility: {
        minIncome: '₹30,000 per month',
        minAge: '23 years',
        maxAge: '58 years',
        employmentType: ['Salaried'],
        creditScore: '725+'
      }
    }
  }
};

export default function PersonalLoanDetail({ params }: { params: Promise<{ loanId: string }> }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview')
  
  const { loanId } = use(params)
  const loan = personalLoans[loanId]
  
  if (!loan) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Loan Not Found</h2>
            <Link href="/loans/personal" className="text-blue-600 hover:text-blue-800">
              Back to Personal Loans
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const getAverageRating = (feedback: UserFeedback[]): number => {
    if (feedback.length === 0) return 0;
    const sum = feedback.reduce((acc, curr) => acc + curr.rating, 0);
    return Math.round((sum / feedback.length) * 10) / 10;
  }

  const getSentimentColor = (rating: number): string => {
    if (rating >= 8) return 'text-green-600';
    if (rating >= 6) return 'text-blue-600';
    if (rating >= 4) return 'text-yellow-600';
    return 'text-red-600';
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-[160px] bg-gradient-to-r from-blue-600 to-blue-700" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="pt-10 mb-4">
            <Link href="/loans/personal" className="text-white/80 hover:text-white flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Personal Loans
            </Link>
          </div>

          {/* Loan Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-8">
              <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-700">
                  {loan.bankName.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{loan.bankName}</h1>
                    <p className="text-xl text-gray-600 mb-4">Personal Loan</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-3xl font-bold ${getSentimentColor(getAverageRating(loan.feedback))}`}>
                        {getAverageRating(loan.feedback)}
                      </span>
                      <span className="text-gray-500">/ 10</span>
                    </div>
                    <p className="text-sm text-gray-500">{loan.feedback.length} reviews</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Interest Rate</p>
                    <p className="text-lg font-semibold text-gray-900">{loan.interestRate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Processing Fee</p>
                    <p className="text-lg font-semibold text-gray-900">{loan.processingFee}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'overview'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'reviews'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reviews
                </button>
              </div>
            </div>

            <div className="p-8">
              {activeTab === 'overview' ? (
                <div className="space-y-8">
                  {/* Key Features */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Key Features</h2>
                    <div className="flex flex-wrap gap-3">
                      {loan.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Loan Details */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Loan Details</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Loan Amount Range</h3>
                        <p className="text-gray-600">₹{loan.minAmount} - {loan.maxAmount}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Tenure Range</h3>
                        <p className="text-gray-600">{loan.minTenure} - {loan.maxTenure}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Prepayment Charges</h3>
                        <p className="text-gray-600">{loan.additionalDetails.prepaymentCharges}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Foreclosure Charges</h3>
                        <p className="text-gray-600">{loan.additionalDetails.foreclosureCharges}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Disbursal Time</h3>
                        <p className="text-gray-600">{loan.additionalDetails.disbursalTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Required Documents */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {loan.additionalDetails.requiredDocuments.map((doc, index) => (
                        <li key={index}>{doc}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Eligibility */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Income Requirement</h3>
                        <p className="text-gray-600">{loan.additionalDetails.eligibility.minIncome}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Age</h3>
                        <p className="text-gray-600">{loan.additionalDetails.eligibility.minAge} - {loan.additionalDetails.eligibility.maxAge}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Employment Type</h3>
                        <p className="text-gray-600">{loan.additionalDetails.eligibility.employmentType.join(', ')}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Credit Score</h3>
                        <p className="text-gray-600">{loan.additionalDetails.eligibility.creditScore}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {loan.feedback.map((review, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`text-lg font-bold ${getSentimentColor(review.rating)}`}>
                          {review.rating} / 10
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 