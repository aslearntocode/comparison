'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Script from 'next/script'
import { articles } from '../../articles-data'
import RelatedArticles from '../../components/RelatedArticles'

export default function InvestmentOptions() {
  const article = articles.find(a => a.link === '/learning-center/personal-finance/investment-options')
  
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
    "image": "https://financialhealth.co.in/images/investment-options.jpg",
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

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Types of Investments</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="font-semibold mr-2">Equity:</span>
                Stocks and equity mutual funds
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Debt:</span>
                Bonds and fixed deposits
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Real Estate:</span>
                Property and REITs
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Alternative:</span>
                Gold, commodities, and cryptocurrencies
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Investment Strategy</h2>
            <p className="text-lg leading-relaxed mb-4">
              Key considerations for investment:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Risk tolerance and investment horizon
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Diversification across asset classes
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Regular portfolio review and rebalancing
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Tax implications and investment costs
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