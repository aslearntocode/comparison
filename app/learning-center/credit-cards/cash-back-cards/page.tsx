'use client'

import { useAuth } from '@/context/AuthContext'
import Header from '@/components/Header'
import Script from 'next/script'
import { JSX } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function CashBackCards(): JSX.Element {
    const articleStructuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Best Cashback Credit Cards in India – Simple, Smart & Rewarding",
      "description": "Discover the best cashback credit cards in India for 2025, offering simple and rewarding benefits for your daily spending.",
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
      "image": "https://financialhealth.co.in/CreditCards.png",
      "articleSection": "Credit Cards",
      "url": "https://financialhealth.co.in/learning-center/credit-cards/cash-back-cards",
      "timeRequired": "10 min read",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://financialhealth.co.in/learning-center/credit-cards/cash-back-cards"
      },
      "keywords": "cashback credit cards, credit card rewards, credit card benefits, personal finance, credit cards India",
      "articleBody": "Discover the best cashback credit cards in India for 2025, offering simple and rewarding benefits for your daily spending."
    }

    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "Why choose a cashback credit card?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cashback credit cards offer a simple, no-nonsense rewards structure that puts actual money back into your pocket without the complications of points, conversions, or redemptions. They automatically credit cashback to your statement and are ideal for those who want clarity and simplicity."
        }
      }, {
        "@type": "Question",
        "name": "Do cashback cards justify their fees?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, if you spend wisely. For example, with the Axis ACE card, spending just ₹10,000/month can get you ₹200–₹400 in cashback and fee waiver eligibility, resulting in real savings of ₹2,400–₹4,800/year."
        }
      }, {
        "@type": "Question",
        "name": "How many cashback cards should I have?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It's recommended to choose 1-2 cashback cards that match your top spending categories. Avoid applying for too many cards—stick to 2-3 max for better management and credit score maintenance."
        }
      }]
    }

    return (
      <>
        <Head>
          <title>Best Cashback Credit Cards in India – Simple, Smart & Rewarding | Financial Health</title>
          <meta name="description" content="Discover the best cashback credit cards in India for 2025, offering simple and rewarding benefits for your daily spending." />
          <meta name="keywords" content="cashback credit cards, credit card rewards, credit card benefits, personal finance, credit cards India" />
          <meta property="og:title" content="Best Cashback Credit Cards in India – Simple, Smart & Rewarding" />
          <meta property="og:description" content="Discover the best cashback credit cards in India for 2025, offering simple and rewarding benefits for your daily spending." />
          <meta property="og:image" content="https://financialhealth.co.in/CreditCards.png" />
          <meta property="og:url" content="https://financialhealth.co.in/learning-center/credit-cards/cash-back-cards" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="canonical" href="https://financialhealth.co.in/learning-center/credit-cards/cash-back-cards" />
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
                <h1 className="text-4xl font-bold mb-4">Best Cashback Credit Cards in India – Simple, Smart & Rewarding</h1>
                <div className="flex items-center text-sm">
                  <time dateTime="2025-02-24" className="mr-4">10 min read</time>
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
                When it comes to getting the most out of your daily spending, cashback credit cards are a top choice for Indian consumers. They offer a simple, no-nonsense rewards structure that puts actual money back into your pocket—without the complications of points, conversions, or redemptions.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">💡 Why Choose a Cashback Credit Card?</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Unlike rewards or travel cards that require redemptions via portals, cashback cards:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Offer flat or category-based cashback (like groceries, fuel, or online shopping)</li>
                  <li>Automatically credit cashback to your statement</li>
                  <li>Are ideal for those who want clarity and simplicity</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  If you're someone who prefers direct value over flashy perks, a cashback credit card can be the best fit for your lifestyle.
                </p>
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">🔝 Top Cashback Credit Cards in India (2025)</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">1. <Link href="https://www.financialhealth.co.in/credit/hdfc-millennia" className="text-blue-600 hover:underline">HDFC Millennia Credit Card</Link></h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>5% cashback on popular e-commerce platforms (Amazon, Flipkart, Myntra)</li>
                      <li>5% on food delivery (Swiggy, Zomato) and ride-hailing (Uber)</li>
                      <li>1% on all other spends</li>
                      <li>₹1,000 + GST annual fee (waived on ₹1 lakh annual spend)</li>
                    </ul>
                    <p className="text-gray-700 mt-2">👉 Perfect for frequent online shoppers and dining enthusiasts with milestone benefits.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">2. <Link href="https://www.financialhealth.co.in/credit/amazon-pay-icici" className="text-blue-600 hover:underline">Amazon Pay ICICI Credit Card</Link></h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>5% cashback on Amazon for Prime users</li>
                      <li>3% for non-Prime</li>
                      <li>1% on all other spends</li>
                      <li>No annual fee</li>
                    </ul>
                    <p className="text-gray-700 mt-2">👉 Perfect for frequent Amazon shoppers who want lifetime free benefits.</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">💸 Do Cashback Cards Justify the Fees?</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Absolutely—if you spend wisely. For example:
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  With the HDFC Millennia card, spending ₹1 lakh annually gets you:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>₹2,000–₹3,000 in cashback (assuming 2-3% average cashback)</li>
                  <li>Annual fee waiver</li>
                  <li>Additional milestone benefits</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  So yes, a well-used cashback card can pay for itself and more.
                </p>
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">⚖️ Cashback vs Reward Points</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Feature</th>
                        <th className="px-4 py-2 text-left">Cashback Cards</th>
                        <th className="px-4 py-2 text-left">Reward Cards</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2">Ease of Use</td>
                        <td className="px-4 py-2">✅ High</td>
                        <td className="px-4 py-2">❌ Medium</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Redemption</td>
                        <td className="px-4 py-2">✅ Auto-credit</td>
                        <td className="px-4 py-2">❌ Via portals</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Transparency</td>
                        <td className="px-4 py-2">✅ Clear %</td>
                        <td className="px-4 py-2">❌ Often complex</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Ideal for</td>
                        <td className="px-4 py-2">Daily spends, non-travelers</td>
                        <td className="px-4 py-2">Heavy spenders, frequent travelers</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 leading-relaxed mt-4">
                  👉 For most users who want tangible benefits, cashback is more practical and usable.
                </p>
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800">✅ Final Tips Before You Apply</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Choose 1–2 cashback cards that match your top spending categories</li>
                  <li>Check if the fee is waived on milestone spending</li>
                  <li>Ensure cashback is credited automatically and not in the form of vouchers</li>
                  <li>Avoid applying for too many cards—stick to 2–3 max</li>
                </ul>
              </div>

              {/* FAQ Section */}
              <section aria-label="Frequently Asked Questions" className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-indigo-800">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-lg mb-2">Why choose a cashback credit card?</h3>
                    <p className="text-gray-700">Cashback credit cards offer a simple, no-nonsense rewards structure that puts actual money back into your pocket without the complications of points, conversions, or redemptions. They automatically credit cashback to your statement and are ideal for those who want clarity and simplicity.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-lg mb-2">Do cashback cards justify their fees?</h3>
                    <p className="text-gray-700">Yes, if you spend wisely. For example, with the Axis ACE card, spending just ₹10,000/month can get you ₹200–₹400 in cashback and fee waiver eligibility, resulting in real savings of ₹2,400–₹4,800/year.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-lg mb-2">How many cashback cards should I have?</h3>
                    <p className="text-gray-700">It's recommended to choose 1-2 cashback cards that match your top spending categories. Avoid applying for too many cards—stick to 2-3 max for better management and credit score maintenance.</p>
                  </div>
                </div>
              </section>
            </article>
          </main>
        </div>
      </>
    )
}
