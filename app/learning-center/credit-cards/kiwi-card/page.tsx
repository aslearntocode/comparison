'use client'

import Header from '@/components/Header'
import Link from 'next/link'

export default function KiwiCardLearningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Kiwi's UPI-Enabled Credit Card: A Smarter Way to Use Credit in India</h1>
          <div className="flex items-center text-sm">
            <span className="mr-4">5 min read</span>
            <span className="bg-blue-500 px-3 py-1 rounded-full text-xs">Credit Cards</span>
          </div>
        </div>
      </div>
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <Link href="/learning-center" className="inline-flex items-center text-blue-600 hover:underline font-medium mb-4">
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Learning Center
        </Link>
      </div>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          At Financial Health, we're always looking for products that simplify personal finance for users—and Kiwi's RuPay credit card is a strong step in that direction. By combining UPI convenience with the power of credit, Kiwi has addressed some of the most common pain points consumers face with traditional credit cards.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-6 text-indigo-800">What Makes Kiwi Different?</h2>
        <ol className="list-decimal pl-6 space-y-6 text-gray-800">
          <li>
            <span className="font-semibold">Instant Digital Onboarding</span>
            <p className="mt-1 text-gray-700">Kiwi allows users to apply for a credit card digitally through their app. With video KYC and Aadhaar-based verification, most users can get access to a virtual credit card in minutes—no physical documents or card delivery delays required.</p>
          </li>
          <li>
            <span className="font-semibold">Works on UPI</span>
            <p className="mt-1 text-gray-700">Once issued, the card can be linked to Google Pay, PhonePe, Paytm, or used directly via Kiwi's own app. This means users can "Scan & Pay" with UPI, but the money is charged to their credit card instead of a bank account—making it one of the first seamless ways to use credit on UPI.</p>
          </li>
          <li>
            <span className="font-semibold">Lifetime-Free and Transparent</span>
            <p className="mt-1 text-gray-700">There are no joining or annual fees, and users enjoy an interest-free period of up to 50 days. This transparency makes it easier for users to manage repayments without hidden surprises.</p>
          </li>
          <li>
            <span className="font-semibold">Cashback and Rewards</span>
            <p className="mt-1 text-gray-700">Users earn cashback on eligible UPI transactions. For example, Kiwi offers 1% cashback on QR-code spends. There are even paid plans like Kiwi Neon that offer higher cashback and benefits such as lounge access.</p>
          </li>
          <li>
            <span className="font-semibold">Full App Control</span>
            <p className="mt-1 text-gray-700">The Kiwi app provides spend tracking, instant card block/unblock features, credit limit management, and transaction alerts—putting users in full control of their credit.</p>
          </li>
        </ol>
        <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">Should You Apply?</h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          If you're looking for an easier way to start using credit—and want the flexibility of UPI payments—Kiwi is a smart, digital-first option.
        </p>
        <div className="mt-8 flex flex-col items-center">
          <a
            href="https://www.financialhealth.co.in/credit?category=virtual"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            👉 Apply now on www.financialhealth.co.in and get guaranteed Amazon Voucher
          </a>
        </div>
      </div>
    </div>
  )
}

