'use client'

import { useAuth } from '@/context/AuthContext'
import Header from '@/components/Header'
import Link from 'next/link'
import Script from 'next/script'

export default function HomeLoans() {
    const articleStructuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Home Loans: A Complete Guide to Understanding and Applying",
        "description": "Learn everything about home loans, from understanding the basics to the application process and tips for getting the best rates.",
        "author": {
            "@type": "Organization",
            "name": "Financial Health"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Financial Health",
            "logo": {
                "@type": "ImageObject",
                "url": "https://financialhealth.in/logo.png"
            }
        },
        "datePublished": "2024-03-20",
        "dateModified": "2024-03-20"
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Add structured data script */}
            <Script
                id="article-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
            />

            <Header />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Home Loans: A Complete Guide to Understanding and Applying</h1>
                    <div className="flex items-center text-sm">
                        <span className="mr-4">12 min read</span>
                        <span className="bg-blue-500 px-3 py-1 rounded-full text-xs">Home Loans</span>
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
                    A home loan is one of the most significant financial commitments you'll make in your life. Understanding how home loans work, the different types available, and the application process can help you make an informed decision and secure the best possible terms for your dream home.
                </p>

                <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">What is a Home Loan?</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                    <p className="text-gray-700 leading-relaxed">
                        A home loan is a long-term loan provided by financial institutions to help you purchase or construct a residential property. The property itself serves as collateral for the loan, and you repay the amount borrowed plus interest over a specified period, typically 15-30 years.
                    </p>
                </div>

                <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">Types of Home Loans</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold mb-4 text-blue-800">Purchase Home Loan</h3>
                        <p className="text-gray-700 leading-relaxed">
                            The most common type of home loan, used to purchase a ready-to-move-in property from a builder or seller.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold mb-4 text-blue-800">Construction Home Loan</h3>
                        <p className="text-gray-700 leading-relaxed">
                            For those who want to build their own house on a plot they own or purchase.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold mb-4 text-blue-800">Home Improvement Loan</h3>
                        <p className="text-gray-700 leading-relaxed">
                            For renovating or upgrading an existing property.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold mb-4 text-blue-800">Balance Transfer</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Transferring your existing home loan to another lender for better interest rates or terms.
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">Key Factors to Consider</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                    <ul className="list-disc pl-6 space-y-4 text-gray-700">
                        <li>
                            <strong>Interest Rate:</strong> Compare fixed and floating rates, and understand how they affect your EMI.
                        </li>
                        <li>
                            <strong>Loan Tenure:</strong> Longer tenures mean lower EMIs but higher total interest payments.
                        </li>
                        <li>
                            <strong>Down Payment:</strong> Typically 20% of the property value, though it can vary.
                        </li>
                        <li>
                            <strong>Processing Fees:</strong> One-time charges for loan processing and documentation.
                        </li>
                        <li>
                            <strong>Pre-closure Charges:</strong> Fees for paying off the loan before the end of the tenure.
                        </li>
                    </ul>
                </div>

                <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">Application Process</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                    <ol className="list-decimal pl-6 space-y-4 text-gray-700">
                        <li>Check your eligibility using online calculators</li>
                        <li>Compare loan offers from different lenders</li>
                        <li>Submit required documents (ID proof, income proof, property documents)</li>
                        <li>Undergo property verification and valuation</li>
                        <li>Sign the loan agreement and complete disbursement formalities</li>
                    </ol>
                </div>

                <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">Tips for Getting the Best Home Loan</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                    <ul className="list-disc pl-6 space-y-4 text-gray-700">
                        <li>Maintain a good credit score (750+)</li>
                        <li>Save for a larger down payment to reduce loan amount</li>
                        <li>Compare offers from multiple lenders</li>
                        <li>Read the fine print, especially regarding charges and penalties</li>
                        <li>Consider opting for a shorter tenure if you can afford higher EMIs</li>
                    </ul>
                </div>

                <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">Conclusion</h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                    <p className="text-gray-700 leading-relaxed">
                        A home loan is a significant financial commitment that requires careful planning and consideration. By understanding the different types of loans, comparing offers, and maintaining good financial health, you can secure the best possible terms for your dream home. Remember to read all documents carefully and seek professional advice if needed.
                    </p>
                </div>

                {/* FAQ Section */}
                <section aria-label="Frequently Asked Questions" className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-indigo-800">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold mb-2 text-blue-800">What is the minimum credit score required for a home loan?</h3>
                            <p className="text-gray-700">Most lenders require a minimum credit score of 750 for the best interest rates. However, some may approve loans with scores as low as 650, but with higher interest rates.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold mb-2 text-blue-800">How much down payment is required?</h3>
                            <p className="text-gray-700">Typically, lenders require a minimum down payment of 20% of the property value. However, this can vary based on the property type, loan amount, and your profile.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold mb-2 text-blue-800">What documents are needed for a home loan?</h3>
                            <p className="text-gray-700">Common documents include ID proof, address proof, income proof, bank statements, property documents, and photographs. The exact list may vary by lender.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}