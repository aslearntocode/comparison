'use client'

import { useAuth } from '@/context/AuthContext'
import Header from '@/components/Header'
import Script from 'next/script'
import { JSX } from 'react'
import Head from 'next/head'
import Link from 'next/link'

// import { Metadata } from "next";
// import { Article } from "@/components/Article";

// export const metadata: Metadata = {
//   title: "Types of Mutual Funds: Which One is Right for You?",
//   description: "Learn about different types of mutual funds and how to choose the right one for your investment goals. Understand equity funds, debt funds, hybrid funds, and more.",
// };

export default function MutualFundTypes(): JSX.Element {
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Types of Mutual Funds: Which One is Right for You?",
    "description": "Learn about different types of mutual funds and how to choose the right one for your investment goals. Understand equity funds, debt funds, hybrid funds, and more.",
    "author": {
      "@type": "Organization",
      "name": "Financial Health"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Financial Health",
      "logo": {
        "@type": "ImageObject",
        "url": "https://financialhealth.co.in/Logo_Final3.jpeg"
      }
    },
    "datePublished": "2025-02-24",
    "dateModified": "2025-02-24",
    "image": "https://financialhealth.co.in/images/mutual-funds-guide.jpg",
    "articleSection": "Mutual Funds",
    "url": "https://financialhealth.co.in/learning-center/mutual-funds/types",
    "timeRequired": "7 min read",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://financialhealth.co.in/learning-center/mutual-funds/types"
    },
    "keywords": "mutual funds, types, equity funds, debt funds, hybrid funds, index funds, ELSS, investment, personal finance",
    "articleBody": "Learn about different types of mutual funds and how to choose the right one for your investment goals. Understand equity funds, debt funds, hybrid funds, and more."
  }

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "What are the main types of mutual funds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The main types of mutual funds include equity funds, debt funds, hybrid funds, index funds, and ELSS (tax-saving) funds."
      }
    }, {
      "@type": "Question",
      "name": "How do I choose the right mutual fund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Consider your investment goal, risk tolerance, time horizon, and liquidity needs. Each type of mutual fund is suited for different investor profiles."
      }
    }, {
      "@type": "Question",
      "name": "Are mutual funds safe for beginners?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mutual funds are managed by professionals and offer diversification, making them a good option for beginners. However, all investments carry some risk, so choose funds that match your comfort level." 
      }
    }]
  }

  return (
    <>
      <Head>
        <title>Types of Mutual Funds: Which One is Right for You? | Financial Health</title>
        <meta name="description" content="Learn about different types of mutual funds and how to choose the right one for your investment goals. Understand equity funds, debt funds, hybrid funds, and more." />
        <meta name="keywords" content="mutual funds, types, equity funds, debt funds, hybrid funds, index funds, ELSS, investment, personal finance" />
        <meta property="og:title" content="Types of Mutual Funds: Which One is Right for You?" />
        <meta property="og:description" content="Learn about different types of mutual funds and how to choose the right one for your investment goals. Understand equity funds, debt funds, hybrid funds, and more." />
        <meta property="og:image" content="https://financialhealth.co.in/images/mutual-funds-guide.jpg" />
        <meta property="og:url" content="https://financialhealth.co.in/learning-center/mutual-funds/types" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://financialhealth.co.in/learning-center/mutual-funds/types" />
      </Head>

      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section aria-label="Article Header" className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
            <div className="max-w-6xl mx-auto px-4">
              <h1 className="text-4xl font-bold mb-4">Types of Mutual Funds: Which One is Right for You?</h1>
              <div className="flex items-center text-sm">
                <time dateTime="2025-02-24" className="mr-4">7 min read</time>
                <span className="bg-blue-500 px-3 py-1 rounded-full text-xs">All</span>
              </div>
            </div>
          </section>
  
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
          <article className="max-w-6xl mx-auto px-4 py-8">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Investing in mutual funds is a great way to grow wealth, but with so many options available, choosing the right one can be overwhelming. Understanding the different types of mutual funds and how they align with your financial goals is crucial. In this article, we break down the major types of mutual funds to help you make an informed decision.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">1. Equity Mutual Funds</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                Equity mutual funds primarily invest in stocks. They offer high growth potential but come with higher risk. They are best suited for long-term investors who can tolerate market fluctuations.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Large-Cap Funds:</strong> Invest in well-established companies with stable returns</li>
                <li><strong>Mid-Cap & Small-Cap Funds:</strong> Higher risk but greater growth potential</li>
                <li><strong>Sectoral/Thematic Funds:</strong> Focus on specific industries like technology, healthcare, or finance</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">2. Debt Mutual Funds</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                Debt funds invest in fixed-income securities like bonds and treasury bills. They are ideal for conservative investors looking for stability and regular income.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Liquid Funds:</strong> Short-term investments with high liquidity, ideal for parking surplus cash</li>
                <li><strong>Corporate Bond Funds:</strong> Invest in high-rated corporate bonds, offering better returns than savings accounts</li>
                <li><strong>Gilt Funds:</strong> Invest in government securities, ensuring high safety but moderate returns</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">3. Hybrid Mutual Funds</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                Hybrid funds offer a mix of equity and debt, balancing risk and reward. They are suitable for moderate-risk investors.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Aggressive Hybrid Funds:</strong> Higher equity allocation for better growth</li>
                <li><strong>Conservative Hybrid Funds:</strong> Focus more on debt instruments for stability</li>
                <li><strong>Balanced Advantage Funds:</strong> Adjust asset allocation dynamically based on market conditions</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">4. Index Funds & ETFs</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                These funds passively track a market index like the NIFTY 50 or S&P 500. They have lower costs and are suitable for investors who prefer a hands-off approach.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Index Funds:</strong> Mimic the performance of a benchmark index</li>
                <li><strong>Exchange-Traded Funds (ETFs):</strong> Trade like stocks on an exchange and offer better liquidity</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">5. Tax-Saving Mutual Funds (ELSS)</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                Equity-Linked Savings Schemes (ELSS) are the best option for tax-saving under Section 80C of the Income Tax Act. They have a lock-in period of three years and offer the potential for high returns.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">Choosing the Right Mutual Fund</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                Consider these factors before investing:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Investment Goal:</strong> Are you saving for retirement, a house, or short-term expenses?</li>
                <li><strong>Risk Tolerance:</strong> Can you handle market fluctuations?</li>
                <li><strong>Time Horizon:</strong> How long can you stay invested?</li>
                <li><strong>Liquidity Needs:</strong> Do you need quick access to your money?</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">Conclusion</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                Mutual funds cater to different investor needs, from aggressive wealth building to stable income generation. By understanding your financial goals and risk appetite, you can choose the right type of mutual fund to maximize your investment potential.
              </p>
              <p className="text-gray-700 leading-relaxed">Looking for personalized investment advice? Start exploring today!</p>
            </div>

            {/* FAQ Section */}
            <section aria-label="Frequently Asked Questions" className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-indigo-800">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-lg mb-2">What are the main types of mutual funds?</h3>
                  <p className="text-gray-700">The main types of mutual funds include equity funds, debt funds, hybrid funds, index funds, and ELSS (tax-saving) funds.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-lg mb-2">How do I choose the right mutual fund?</h3>
                  <p className="text-gray-700">Consider your investment goal, risk tolerance, time horizon, and liquidity needs. Each type of mutual fund is suited for different investor profiles.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-lg mb-2">Are mutual funds safe for beginners?</h3>
                  <p className="text-gray-700">Mutual funds are managed by professionals and offer diversification, making them a good option for beginners. However, all investments carry some risk, so choose funds that match your comfort level.</p>
                </div>
              </div>
            </section>
          </article>
        </main>
      </div>
    </>
  )
}