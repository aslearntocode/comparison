'use client'

import Header from '@/components/Header'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

export default function InvestmentOptionsPage() {
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Investment Options for Retail Investors in India",
    "description": "Understand what financial instruments you can invest in India for long term wealth creation.",
    "author": {"@type": "Organization", "name": "Financial Health"},
    "publisher": {"@type": "Organization", "name": "Financial Health"},
    "datePublished": "2025-02-24",
    "dateModified": "2025-02-24",
    "image": "https://financialhealth.co.in/images/investment-options.jpg",
    "articleSection": "Personal Finance",
    "url": "https://financialhealth.co.in/learning-center/personal-finance/investment-options",
    "keywords": "investment options, personal finance, India, retail investors, fixed income, market-linked, alternative investments",
    "articleBody": "Understand what financial instruments you can invest in India for long term wealth creation."
  }
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the safest investment options for retail investors in India?",
        "acceptedAnswer": {"@type": "Answer", "text": "Fixed Deposits, PPF, and government bonds are considered among the safest investment options for retail investors in India."}
      },
      {
        "@type": "Question",
        "name": "What are market-linked investments?",
        "acceptedAnswer": {"@type": "Answer", "text": "Market-linked investments include stocks, mutual funds, ETFs, and index funds, whose returns depend on market performance."}
      }
    ]
  }
  return (
    <>
      <Head>
        <title>Investment Options for Retail Investors in India | Financial Health</title>
        <meta name="description" content="Understand what financial instruments you can invest in India for long term wealth creation." />
        <meta name="keywords" content="investment options, personal finance, India, retail investors, fixed income, market-linked, alternative investments" />
        <meta property="og:title" content="Investment Options for Retail Investors in India" />
        <meta property="og:description" content="Understand what financial instruments you can invest in India for long term wealth creation." />
        <meta property="og:url" content="https://financialhealth.co.in/learning-center/personal-finance/investment-options" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://financialhealth.co.in/learning-center/personal-finance/investment-options" />
      </Head>
      <Script id="article-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }} />
      <Script id="faq-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Header />
        <main>
          <section aria-label="Article Header" className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
            <div className="max-w-6xl mx-auto px-4">
              <h1 className="text-4xl font-bold mb-4">Investment Options for Retail Investors in India</h1>
              <div className="flex items-center text-sm">
                <span className="bg-blue-500 px-3 py-1 rounded-full text-xs">Personal Finance</span>
              </div>
            </div>
          </section>
          <article className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                <p className="text-lg leading-relaxed">
                  For a comprehensive guide on investment options in India, we recommend reading this excellent article on Groww:{' '}
                  <a 
                    href="https://groww.in/blog/best-investment-options-in-india" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Best Investment Options in India
                  </a>
                </p>
              </div>
              <p className="text-lg leading-relaxed mb-8">
                As a retail investor in India, you have access to various investment options that can help you achieve your financial goals. Each investment type comes with its own risk-return profile and is suitable for different investment horizons.
              </p>
              <h2 className="text-2xl font-bold text-indigo-800 mt-12 mb-6">Key Investment Categories</h2>
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Fixed Income Investments</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
                <li><strong>Fixed Deposits:</strong> Safe investments with guaranteed returns</li>
                <li><strong>Public Provident Fund (PPF):</strong> Government-backed long-term savings scheme</li>
                <li><strong>Government Bonds:</strong> Low-risk debt instruments issued by the government</li>
                <li><strong>Corporate Bonds:</strong> Debt securities issued by companies</li>
              </ul>
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Market-Linked Investments</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
                <li><strong>Stocks:</strong> Direct equity investments in companies</li>
                <li><strong>Mutual Funds:</strong> Professionally managed investment portfolios</li>
                <li><strong>ETFs:</strong> Exchange-traded funds that track indices</li>
                <li><strong>Index Funds:</strong> Passive funds tracking market indices</li>
              </ul>
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Alternative Investments</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
                <li><strong>Real Estate:</strong> Property investments for rental income and appreciation</li>
                <li><strong>REITs:</strong> Real Estate Investment Trusts for property exposure</li>
                <li><strong>Gold:</strong> Physical gold, gold ETFs, and Sovereign Gold Bonds</li>
              </ul>
              <div className="bg-gray-50 rounded-lg p-6 mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Important Note</h3>
                <p className="text-lg leading-relaxed text-gray-600">
                  All investments carry some form of risk. It's important to understand these risks and consult with a financial advisor before making investment decisions. The information provided here is for educational purposes only and should not be considered as financial advice.
                </p>
              </div>
            </div>
            <section aria-label="Frequently Asked Questions" className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-indigo-800">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-lg mb-2">What are the safest investment options for retail investors in India?</h3>
                  <p className="text-gray-700">Fixed Deposits, PPF, and government bonds are considered among the safest investment options for retail investors in India.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-lg mb-2">What are market-linked investments?</h3>
                  <p className="text-gray-700">Market-linked investments include stocks, mutual funds, ETFs, and index funds, whose returns depend on market performance.</p>
                </div>
              </div>
            </section>
          </article>

          {/* Back Button */}
          <div className="max-w-6xl mx-auto px-4 mt-4">
            <Link href="/learning-center" className="inline-flex items-center text-blue-600 hover:underline font-medium mb-4">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Learning Center
            </Link>
          </div>
        </main>
      </div>
    </>
  )
} 