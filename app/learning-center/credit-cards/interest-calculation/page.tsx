'use client'

import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import Header from '@/components/Header'
import Script from 'next/script'
import { articles } from '../../articles-data'
import RelatedArticles from '../../components/RelatedArticles'

export default function EquityIntro() {
    // Define structured data for the article
    const article = articles.find(a => a.link === '/learning-center/credit-cards/interest-calculation')
    
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
      "image": "https://financialhealth.co.in/images/credit-card-interest.jpg",
      "articleSection": article.category,
      "url": `https://financialhealth.co.in${article.link}`,
      "timeRequired": article.readTime,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://financialhealth.co.in${article.link}`
      }
    }

    // Define structured data for the credit card comparison table
    const creditCardComparisonData = {
      "@context": "https://schema.org",
      "@type": "Table",
      "about": "Credit Card Comparison",
      "mainEntity": [
        {
          "@type": "FinancialProduct",
          "name": "Regalia Credit Card",
          "brand": "HDFC Bank",
          "annualPercentageRate": {
            "@type": "QuantitativeValue",
            "minValue": 36,
            "maxValue": 42,
            "unitText": "PERCENT_PER_ANNUM"
          },
          "feesAndCommissionsSpecification": "₹2,500 annual fee",
          "description": "4X rewards on travel & dining, Airport lounge access, Milestone benefits up to ₹12,000"
        },
        {
          "@type": "FinancialProduct",
          "name": "Ace Credit Card",
          "brand": "Axis Bank",
          "annualPercentageRate": {
            "@type": "QuantitativeValue",
            "minValue": 37,
            "maxValue": 42,
            "unitText": "PERCENT_PER_ANNUM"
          },
          "feesAndCommissionsSpecification": "₹499 annual fee",
          "description": "5% cashback on bill payments, 2% on other spends, Welcome benefits worth ₹5,000"
        },
        // Add other cards similarly...
      ]
    }

    return (
      <div className="min-h-screen flex flex-col">
        <Script
          id="article-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
        />
        <Script
          id="comparison-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(creditCardComparisonData) }}
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

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Understanding Credit Card Interest</h2>
              <p className="text-lg leading-relaxed mb-8">
                Credit card interest is calculated based on your outstanding balance and the annual percentage rate (APR) of your card. The calculation method can vary between different credit card issuers.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">How Interest is Calculated</h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Daily Balance Method:</span>
                  Interest is calculated on your daily balance
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Average Daily Balance:</span>
                  Based on the average of your daily balances
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Previous Balance Method:</span>
                  Uses the balance from the previous billing cycle
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Adjusted Balance Method:</span>
                  Subtracts payments from the previous balance
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Factors Affecting Interest</h2>
              <p className="text-lg leading-relaxed mb-4">
                Several factors influence your credit card interest:
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Your credit score
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Type of transaction
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Payment history
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Market conditions
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