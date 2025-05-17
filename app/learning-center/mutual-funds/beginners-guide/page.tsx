'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Script from 'next/script'
import { articles } from '../../page'
import RelatedArticles from '../../components/RelatedArticles'

function MutualFundsGuide() {
  const article = articles.find(a => a.link === '/learning-center/mutual-funds/beginners-guide')
  
  if (!article) {
    return <div>Article not found</div>
  }

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
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
    "articleSection": article.category,
    "url": `https://financialhealth.co.in${article.link}`,
    "timeRequired": article.readTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://financialhealth.co.in${article.link}`
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />

      <Header />
      
      <main className="flex-1 py-8">
        <article className="max-w-4xl mx-auto px-4">
          {/* Article Header */}
          <header className="mb-12">
            <div className="text-blue-600 text-xl md:text-2xl font-extrabold mb-4">
              {article.category}
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-6 leading-tight whitespace-nowrap overflow-x-auto">
              {article.title}
            </h1>
            <div className="text-gray-600 text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readTime}
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-8">
              {article.description}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">How Do Mutual Funds Work?</h2>
            <p className="text-lg leading-relaxed mb-8">
              When you invest in a mutual fund, you're buying shares of the fund's portfolio. The fund manager handles all investment decisions, including what securities to buy and sell, based on the fund's investment objectives.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Key Benefits of Mutual Funds</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="font-semibold mr-2">Professional Management:</span>
                Expert fund managers make investment decisions
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Diversification:</span>
                Spread risk across multiple investments
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Accessibility:</span>
                Start investing with relatively small amounts
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Liquidity:</span>
                Easy to buy and sell fund units
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Types of Mutual Funds</h2>
            <p className="text-lg leading-relaxed mb-4">
              There are several types of mutual funds to choose from:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="font-semibold mr-2">Equity Funds:</span>
                Invest primarily in stocks
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Debt Funds:</span>
                Invest in fixed-income securities
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Hybrid Funds:</span>
                Combine both stocks and bonds
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Index Funds:</span>
                Track specific market indices
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Getting Started</h2>
            <p className="text-lg leading-relaxed mb-4">
              Before investing in mutual funds, consider:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Your investment goals
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Risk tolerance
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Investment horizon
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Expense ratios and fees
              </li>
            </ul>
          </div>

          {/* Related Articles */}
          <RelatedArticles currentArticle={article} allArticles={articles} />
        </article>
      </main>
    </div>
  )
}

export default MutualFundsGuide 