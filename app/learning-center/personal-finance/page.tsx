'use client'

import Header from '@/components/Header'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

export default function PersonalFinancePage() {
  const articles = [
    {
      title: 'Investment Options for Retail Investors in India',
      description: 'Understand what financial instruments you can invest in India for long term wealth creation.',
      readTime: '8 min read',
      link: '/learning-center/personal-finance/investment-options'
    },
    {
      title: 'Understanding Risk and Return',
      description: 'Learn about the relationship between risk and return, and how to balance them in your investment portfolio.',
      readTime: '6 min read',
      link: '/learning-center/personal-finance/risk-return'
    },
    {
      title: 'How to Invest in SIP?',
      description: 'Learn how to start investing in SIPs and make your money work for you.',
      readTime: '15 min read',
      link: '/learning-center/personal-finance/sip'
    }
  ]

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Personal Finance Articles",
    "description": "Explore personal finance articles on investment options, SIP, risk and return, and more.",
    "url": "https://financialhealth.co.in/learning-center/personal-finance",
    "mainEntity": articles.map(article => ({
      "@type": "Article",
      "headline": article.title,
      "description": article.description,
      "url": `https://financialhealth.co.in${article.link}`
    }))
  }

  return (
    <>
      <Head>
        <title>Personal Finance Articles | Financial Health</title>
        <meta name="description" content="Explore personal finance articles on investment options, SIP, risk and return, and more." />
        <meta name="keywords" content="personal finance, investment, SIP, risk, return, financial planning, India" />
        <meta property="og:title" content="Personal Finance Articles | Financial Health" />
        <meta property="og:description" content="Explore personal finance articles on investment options, SIP, risk and return, and more." />
        <meta property="og:url" content="https://financialhealth.co.in/learning-center/personal-finance" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://financialhealth.co.in/learning-center/personal-finance" />
      </Head>
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Header />
        <main>
          {/* Hero Section */}
          <section aria-label="Article Header" className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
            <div className="max-w-6xl mx-auto px-4">
              <h1 className="text-4xl font-bold mb-4">Personal Finance</h1>
              <div className="flex items-center text-sm">
                <span className="bg-blue-500 px-3 py-1 rounded-full text-xs">All</span>
              </div>
            </div>
          </section>
          {/* Articles Grid */}
          <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, idx) => (
              <Link href={article.link} key={article.link}>
                <div className="bg-white border rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-base text-gray-600 mb-4 flex-grow line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {article.readTime}
                    </span>
                    <span className="text-blue-600 text-sm font-medium">Read more →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
