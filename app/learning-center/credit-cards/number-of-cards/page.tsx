'use client'

import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import Header from '@/components/Header'
import Script from 'next/script'
import { JSX } from 'react'
import Head from 'next/head'
import { articles } from '../../page'
import RelatedArticles from '../../components/RelatedArticles'

export default function NumberOfCards(): JSX.Element {
    const article = articles.find(a => a.link === '/learning-center/credit-cards/number-of-cards')
    
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
      "image": "https://financialhealth.co.in/images/number-of-cards.jpg",
      "articleSection": article.category,
      "url": `https://financialhealth.co.in${article.link}`,
      "timeRequired": article.readTime,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://financialhealth.co.in${article.link}`
      }
    }

    // Additional FAQ structured data for rich results
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What is FOIR and why is it important?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FOIR (Fixed Obligation to Income Ratio) is a metric used by lenders to assess your financial standing. It's important because it determines your loan eligibility and affects your ability to get future credit."
        }
      }, {
        "@type": "Question",
        "name": "How do multiple credit cards affect my FOIR?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Multiple credit cards increase your total credit limit, which adds to your FOIR calculation. Banks typically consider 5% of your total credit limit or outstanding amount (whichever is higher) as a monthly obligation, even if you don't use the full limit."
        }
      }, {
        "@type": "Question",
        "name": "What is a healthy FOIR percentage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ideally, your FOIR should stay below 50% to ensure you have room for future financial needs and maintain good creditworthiness."
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
          <meta property="og:image" content="https://financialhealth.co.in/images/number-of-cards.jpg" />
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

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Factors to Consider</h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">Credit Score Impact:</span>
                    Multiple cards can affect your credit score
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">Annual Fees:</span>
                    Consider the total cost of maintaining multiple cards
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">Reward Categories:</span>
                    Different cards for different spending categories
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">Credit Limit:</span>
                    Total available credit across all cards
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Best Practices</h2>
                <p className="text-lg leading-relaxed mb-4">
                  To manage multiple credit cards effectively:
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">•</span>
                    Start with 2-3 cards and add more gradually
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">•</span>
                    Keep track of payment due dates
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">•</span>
                    Monitor credit utilization ratio
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">•</span>
                    Review annual fees and benefits regularly
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
