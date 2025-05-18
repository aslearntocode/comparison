'use client'

import { useAuth } from '@/context/AuthContext'
import Header from '@/components/Header'
import Script from 'next/script'
import { JSX } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function MutualFundsGuide(): JSX.Element {
    const articleStructuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Understanding Mutual Funds: A Beginner's Guide",
      "description": "Learn the basics of mutual funds, how they work, and why they're a popular investment choice for both new and experienced investors.",
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
      "datePublished": "2025-01-01",
      "dateModified": "2025-02-21",
      "image": "https://financialhealth.co.in/images/mutual-funds-guide.jpg",
      "articleSection": "Mutual Funds",
      "url": "https://financialhealth.co.in/learning-center/mutual-funds/beginners-guide",
      "timeRequired": "5 min read",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://financialhealth.co.in/learning-center/mutual-funds/beginners-guide"
      },
      "keywords": "mutual funds, investment, beginner's guide, portfolio, diversification, fund management, investment strategy",
      "articleBody": "Learn the basics of mutual funds, how they work, and why they're a popular investment choice for both new and experienced investors."
    }

    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What are the main types of mutual funds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The main types of mutual funds include equity funds (investing in stocks), debt funds (investing in fixed-income securities), hybrid funds (combining stocks and bonds), and index funds (tracking specific market indices)."
        }
      }, {
        "@type": "Question",
        "name": "How do I choose the right mutual fund?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Consider your investment goals, risk tolerance, investment horizon, and the fund's expense ratios and fees. It's also important to review the fund's past performance and the fund manager's track record."
        }
      }, {
        "@type": "Question",
        "name": "What are the benefits of investing in mutual funds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mutual funds offer professional management, diversification across multiple investments, accessibility with small investment amounts, and liquidity for easy buying and selling of fund units."
        }
      }]
    }

    return (
      <>
        <Head>
          <title>Understanding Mutual Funds: A Beginner's Guide | Financial Health</title>
          <meta name="description" content="Learn the basics of mutual funds, how they work, and why they're a popular investment choice for both new and experienced investors." />
          <meta name="keywords" content="mutual funds, investment, beginner's guide, portfolio, diversification, fund management, investment strategy" />
          <meta property="og:title" content="Understanding Mutual Funds: A Beginner's Guide" />
          <meta property="og:description" content="Learn the basics of mutual funds, how they work, and why they're a popular investment choice for both new and experienced investors." />
          <meta property="og:image" content="https://financialhealth.co.in/images/mutual-funds-guide.jpg" />
          <meta property="og:url" content="https://financialhealth.co.in/learning-center/mutual-funds/beginners-guide" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="canonical" href="https://financialhealth.co.in/learning-center/mutual-funds/beginners-guide" />
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
                <h1 className="text-4xl font-bold mb-4">Understanding Mutual Funds: A Beginner's Guide</h1>
                <div className="flex items-center text-sm">
                  <time dateTime="2025-01-01" className="mr-4">5 min read</time>
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
                Mutual funds are investment vehicles that pool money from multiple investors to purchase a diversified portfolio of stocks, bonds, or other securities. They offer a convenient way for individuals to access professional investment management and diversification.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">How Do Mutual Funds Work?</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <p className="text-gray-700 leading-relaxed">
                  When you invest in a mutual fund, you're buying shares of the fund's portfolio. The fund manager handles all investment decisions, including what securities to buy and sell, based on the fund's investment objectives.
                </p>
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">Key Benefits of Mutual Funds</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Professional Management:</strong> Expert fund managers make investment decisions</li>
                  <li><strong>Diversification:</strong> Spread risk across multiple investments</li>
                  <li><strong>Accessibility:</strong> Start investing with relatively small amounts</li>
                  <li><strong>Liquidity:</strong> Easy to buy and sell fund units</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">Types of Mutual Funds</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                  There are several types of mutual funds to choose from:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Equity Funds:</strong> Invest primarily in stocks</li>
                  <li><strong>Debt Funds:</strong> Invest in fixed-income securities</li>
                  <li><strong>Hybrid Funds:</strong> Combine both stocks and bonds</li>
                  <li><strong>Index Funds:</strong> Track specific market indices</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">Getting Started</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Before investing in mutual funds, consider:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Your investment goals</li>
                  <li>Risk tolerance</li>
                  <li>Investment horizon</li>
                  <li>Expense ratios and fees</li>
                </ul>
              </div>

              {/* FAQ Section */}
              <section aria-label="Frequently Asked Questions" className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-indigo-800">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-lg mb-2">What are the main types of mutual funds?</h3>
                    <p className="text-gray-700">The main types of mutual funds include equity funds (investing in stocks), debt funds (investing in fixed-income securities), hybrid funds (combining stocks and bonds), and index funds (tracking specific market indices).</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-lg mb-2">How do I choose the right mutual fund?</h3>
                    <p className="text-gray-700">Consider your investment goals, risk tolerance, investment horizon, and the fund's expense ratios and fees. It's also important to review the fund's past performance and the fund manager's track record.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-lg mb-2">What are the benefits of investing in mutual funds?</h3>
                    <p className="text-gray-700">Mutual funds offer professional management, diversification across multiple investments, accessibility with small investment amounts, and liquidity for easy buying and selling of fund units.</p>
                  </div>
                </div>
              </section>
            </article>
          </main>
        </div>
      </>
    )
} 