'use client'

import { useState, useMemo } from 'react'
import Header from "@/components/Header"
import Image from 'next/image'
import Link from 'next/link'

interface UserFeedback {
  comment: string;
  rating: number;
  date: string;
}

interface AutoLoan {
  id: string;
  bankName: string;
  logo: string;
  interestRate: string;
  processingFee: string;
  maxLoanToValue: string;
  maxAmount: string;
  minAmount: string;
  maxTenure: string;
  minTenure: string;
  features: string[];
  feedback: UserFeedback[];
  additionalDetails: {
    vehicleTypes: string[];
    prepaymentCharges: string;
    foreclosureCharges: string;
    disbursalTime: string;
    vehicleAge: string;
    insuranceRequirement: string;
    hypothecationCharges: string;
    requiredDocuments: string[];
    eligibility: {
      minIncome: string;
      minAge: string;
      maxAge: string;
      employmentType: string[];
      creditScore: string;
      vehicleValue: string;
    };
  };
}

// Sample auto loan data
const autoLoans: AutoLoan[] = [
  {
    id: 'loan1',
    bankName: 'ABC Bank',
    logo: '/bank-logos/abc-bank.png',
    interestRate: '7.50% p.a.',
    processingFee: '0.5% of loan amount',
    maxLoanToValue: '90%',
    maxAmount: '₹75,00,000',
    minAmount: '₹1,00,000',
    maxTenure: '7 years',
    minTenure: '1 year',
    features: ['Quick Approval', 'Zero Foreclosure Charges', 'Flexible Tenure'],
    feedback: [
      { comment: "Quick loan approval process", rating: 9, date: "2024-03-15" },
      { comment: "Competitive interest rates", rating: 8.5, date: "2024-03-10" }
    ],
    additionalDetails: {
      vehicleTypes: ['New Cars', 'Used Cars', 'Electric Vehicles'],
      prepaymentCharges: 'Nil',
      foreclosureCharges: 'Nil after 6 months',
      disbursalTime: '24-48 hours',
      vehicleAge: 'Up to 7 years at loan maturity',
      insuranceRequirement: 'Comprehensive insurance mandatory',
      hypothecationCharges: '₹1,500',
      requiredDocuments: [
        'Identity Proof',
        'Address Proof',
        'Income Proof',
        'Vehicle Quotation',
        'Bank Statements (3 months)',
        'Form 16/ITR'
      ],
      eligibility: {
        minIncome: '₹25,000 per month',
        minAge: '21 years',
        maxAge: '65 years at loan maturity',
        employmentType: ['Salaried', 'Self-Employed'],
        creditScore: '700+',
        vehicleValue: 'Up to ₹83,00,000'
      }
    }
  },
  {
    id: 'loan2',
    bankName: 'XYZ Bank',
    logo: '/bank-logos/xyz-bank.png',
    interestRate: '7.75% p.a.',
    processingFee: '0.75% of loan amount',
    maxLoanToValue: '85%',
    maxAmount: '₹50,00,000',
    minAmount: '₹2,00,000',
    maxTenure: '8 years',
    minTenure: '2 years',
    features: ['Digital Process', 'Door-step Service', 'Special Rates for Electric Vehicles'],
    feedback: [
      { comment: "Excellent digital experience", rating: 9, date: "2024-03-14" },
      { comment: "Good customer service", rating: 8, date: "2024-03-09" }
    ],
    additionalDetails: {
      vehicleTypes: ['New Cars', 'Electric Vehicles'],
      prepaymentCharges: '2% of prepaid amount',
      foreclosureCharges: '3% of outstanding amount',
      disbursalTime: '2-3 working days',
      vehicleAge: 'Only new vehicles',
      insuranceRequirement: 'Comprehensive insurance with zero dep cover',
      hypothecationCharges: '₹2,000',
      requiredDocuments: [
        'PAN Card',
        'Aadhaar Card',
        'Salary Slips (3 months)',
        'Vehicle Proforma Invoice',
        'Bank Statements (6 months)',
        'Photographs'
      ],
      eligibility: {
        minIncome: '₹35,000 per month',
        minAge: '23 years',
        maxAge: '60 years at loan maturity',
        employmentType: ['Salaried'],
        creditScore: '750+',
        vehicleValue: 'Up to ₹60,00,000'
      }
    }
  }
];

export default function AutoLoans() {
  const [searchQuery, setSearchQuery] = useState('')

  // Calculate average rating from feedback
  const getAverageRating = (feedback: UserFeedback[]): number => {
    if (feedback.length === 0) return 0;
    const sum = feedback.reduce((acc, curr) => acc + curr.rating, 0);
    return Math.round((sum / feedback.length) * 10) / 10;
  }

  // Get sentiment color based on rating
  const getSentimentColor = (rating: number): string => {
    if (rating >= 8) return 'text-green-600';
    if (rating >= 6) return 'text-blue-600';
    if (rating >= 4) return 'text-yellow-600';
    return 'text-red-600';
  }

  // Filter loans based on search query
  const filteredLoans = useMemo(() => {
    const query = searchQuery.toLowerCase()
    return autoLoans.filter(loan => 
      loan.bankName.toLowerCase().includes(query) ||
      loan.features.some(feature => feature.toLowerCase().includes(query)) ||
      loan.interestRate.toLowerCase().includes(query) ||
      loan.processingFee.toLowerCase().includes(query) ||
      loan.maxAmount.toLowerCase().includes(query) ||
      loan.feedback.some(f => f.comment.toLowerCase().includes(query))
    )
  }, [searchQuery])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-[160px] bg-gradient-to-r from-blue-600 to-blue-700" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-10">
            <h1 className="text-4xl font-bold text-white mb-3 font-serif tracking-wide">
              Auto Loan Comparison
            </h1>
            
            <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8 font-sans">
              Compare auto loans from top banks and find the best rates for your dream vehicle
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative z-10">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by bank, interest rate, features, etc..."
                  className="w-full px-6 py-3 rounded-xl bg-white shadow-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Loans Grid */}
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            {/* Table Header */}
            <div className="grid grid-cols-8 gap-4 mb-6 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="col-span-2 font-semibold text-gray-700">Bank Details</div>
              <div className="font-semibold text-gray-700">Interest Rate</div>
              <div className="font-semibold text-gray-700">Max LTV</div>
              <div className="font-semibold text-gray-700">Loan Amount</div>
              <div className="font-semibold text-gray-700">Tenure</div>
              <div className="font-semibold text-gray-700">Features</div>
              <div className="font-semibold text-gray-700">User Rating</div>
            </div>

            {/* Loans List */}
            <div className="space-y-4">
              {filteredLoans.map((loan) => (
                <Link
                  key={loan.id}
                  href={`/loans/auto/${loan.id}`}
                  className="block hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="grid grid-cols-8 gap-4 items-center px-4 py-4">
                    <div className="col-span-2 flex items-center gap-4">
                      <div className="w-16 h-16 relative bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-700">
                          {loan.bankName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{loan.bankName}</h3>
                        <p className="text-sm text-gray-500">Auto Loan</p>
                      </div>
                    </div>
                    <div className="text-gray-900">{loan.interestRate}</div>
                    <div className="text-gray-900">{loan.maxLoanToValue}</div>
                    <div className="text-gray-900">
                      <div>{loan.maxAmount}</div>
                      <div className="text-sm text-gray-500">Max Amount</div>
                    </div>
                    <div className="text-gray-900">
                      <div>{loan.maxTenure}</div>
                      <div className="text-sm text-gray-500">Max Tenure</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {loan.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold ${getSentimentColor(getAverageRating(loan.feedback))}`}>
                          {getAverageRating(loan.feedback)}
                        </span>
                        <span className="text-sm text-gray-500">/ 10</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-sm text-blue-600">
                          {loan.feedback.length} reviews
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* No Results Message */}
            {filteredLoans.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No auto loans found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 