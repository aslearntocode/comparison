'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Script from 'next/script'
import { articles } from '../../page'
import RelatedArticles from '../../components/RelatedArticles'

export default function EquityIntro() {
  const article = articles.find(a => a.link === '/learning-center/equity/intro')
  
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
    "image": "https://financialhealth.co.in/images/equity-intro.jpg",
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

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Understanding Equity</h2>
            <p className="text-lg leading-relaxed mb-4">
              Equity represents ownership in a company. When you buy shares of a company's stock, you become a partial owner of that company. This ownership comes with certain rights and potential benefits:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Voting rights on company decisions
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Potential for capital appreciation
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Dividend payments (if declared)
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Right to company assets in case of liquidation
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Types of Equity Investments</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="font-semibold mr-2">Common Stock:</span>
                Basic ownership shares with voting rights
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Preferred Stock:</span>
                Shares with priority in dividends and liquidation
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Equity Mutual Funds:</span>
                Professionally managed portfolios of stocks
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">ETFs:</span>
                Exchange-traded funds tracking stock indices
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Risk and Returns</h2>
            <p className="text-lg leading-relaxed mb-4">
              Equity investments offer the potential for higher returns compared to fixed-income investments, but they also come with higher risks:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Market volatility and price fluctuations
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Company-specific risks
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Economic and industry risks
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Liquidity risks
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