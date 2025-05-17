'use client'

import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import Header from '@/components/Header'
import Script from 'next/script'
import { JSX } from 'react'
import Head from 'next/head'
import { articles } from '../../page'
import RelatedArticles from '../../components/RelatedArticles'

export default function CreditCardRiskProfile(): JSX.Element {
    const article = articles.find(a => a.link === '/learning-center/credit-cards/risk-profile')
    
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
      "image": "https://financialhealth.co.in/images/risk-profile.jpg",
      "articleSection": article.category,
      "url": `https://financialhealth.co.in${article.link}`,
      "timeRequired": article.readTime,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://financialhealth.co.in${article.link}`
      },
      "keywords": "credit cards, risk profile, credit score, financial health, credit assessment, personal finance, credit limit, loan approval",
      "articleBody": article.description
    }

    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What is a credit card risk profile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A credit card risk profile is an assessment used by credit card issuers to evaluate potential cardholders. It helps determine the likelihood that an applicant will repay their credit card debt and influences approval decisions, credit limits, and interest rates."
        }
      }, {
        "@type": "Question",
        "name": "What factors affect my credit card risk profile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Key factors include your credit score, credit history, income, employment status, existing debt obligations, and payment history on other accounts."
        }
      }, {
        "@type": "Question",
        "name": "How can I improve my credit card risk profile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can improve your risk profile by making all payments on time, keeping credit utilization low (under 30%), maintaining stable employment and income, building a longer credit history, and limiting new credit applications."
        }
      }]
    }

    return (
      <>
        <Head>
          <title>{article.title} | Financial Health</title>
          <meta name="description" content={article.description} />
          <meta property="og:title" content={article.title} />
          <meta property="og:description" content={article.description} />
          <meta property="og:image" content="https://financialhealth.co.in/images/risk-profile.jpg" />
          <meta property="og:url" content={`https://financialhealth.co.in${article.link}`} />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="canonical" href={`https://financialhealth.co.in${article.link}`} />
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

        <div className="min-h-screen flex flex-col">
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

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Understanding Risk Profiles</h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">Conservative:</span>
                    Low risk tolerance, prefers stable returns
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">Moderate:</span>
                    Balanced approach to risk and returns
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">Aggressive:</span>
                    High risk tolerance, seeks maximum returns
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Factors Affecting Risk Profile</h2>
                <p className="text-lg leading-relaxed mb-4">
                  Your risk profile is influenced by:
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">•</span>
                    Age and investment horizon
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">•</span>
                    Financial goals and objectives
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">•</span>
                    Income stability and expenses
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">•</span>
                    Market knowledge and experience
                  </li>
                </ul>
              </div>

              {/* Related Articles */}
              <RelatedArticles currentArticle={article} allArticles={articles} />
            </article>
          </main>
        </div>
      </>
    )
}
