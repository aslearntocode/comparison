'use client'

import { useAuth } from '@/context/AuthContext'
import Header from '@/components/Header'
import Script from 'next/script'
import { JSX } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function AxisRewardsRedemption(): JSX.Element {
    const articleStructuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Axis Bank EDGE Rewards Redemption Guide: Maximize Your Points Value",
      "description": "Learn how to check and redeem your Axis Bank EDGE Reward Points for maximum value, including step-by-step instructions and best redemption options.",
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
      "datePublished": "2025-05-19",
      "dateModified": "2025-05-19",
      "image": "https://financialhealth.co.in/CreditCards.png",
      "articleSection": "Credit Cards",
      "url": "https://financialhealth.co.in/learning-center/credit-cards/axis-rewards-redemption",
      "timeRequired": "8 min read",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://financialhealth.co.in/learning-center/credit-cards/axis-rewards-redemption"
      },
      "keywords": "Axis Bank, EDGE Rewards, reward points, credit card rewards, points redemption, gift vouchers, Amazon vouchers, Flipkart vouchers",
      "articleBody": "Learn how to check and redeem your Axis Bank EDGE Reward Points for maximum value, including step-by-step instructions and best redemption options."
    }

    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "How do I check my Axis Bank EDGE Reward Points?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can check your EDGE Reward Points through the Axis Mobile App by going to 'Rewards' or 'EDGE Rewards' section, or by visiting edgerewards.axisbank.co.in and logging in with your internet banking credentials."
        }
      }, {
        "@type": "Question",
        "name": "What is the best way to redeem Axis Bank EDGE Reward Points?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best value comes from redeeming points for gift vouchers (Amazon, Flipkart, etc.) which offer ₹0.20-₹0.25 per point. Flights and hotels offer ₹0.15-₹0.20 per point, while products and mobile recharges offer lower value at ₹0.10-₹0.15 per point."
        }
      }, {
        "@type": "Question",
        "name": "Do Axis Bank EDGE Reward Points expire?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, EDGE Reward Points typically expire after 3 years. It's recommended to redeem your points regularly rather than accumulating them for too long."
        }
      }]
    }

    return (
      <>
        <Head>
          <title>Axis Bank EDGE Rewards Redemption Guide: Maximize Your Points Value | Financial Health</title>
          <meta name="description" content="Learn how to check and redeem your Axis Bank EDGE Reward Points for maximum value, including step-by-step instructions and best redemption options." />
          <meta name="keywords" content="Axis Bank, EDGE Rewards, reward points, credit card rewards, points redemption, gift vouchers, Amazon vouchers, Flipkart vouchers" />
          <meta property="og:title" content="Axis Bank EDGE Rewards Redemption Guide: Maximize Your Points Value" />
          <meta property="og:description" content="Learn how to check and redeem your Axis Bank EDGE Reward Points for maximum value, including step-by-step instructions and best redemption options." />
          <meta property="og:image" content="https://financialhealth.co.in/CreditCards.png" />
          <meta property="og:url" content="https://financialhealth.co.in/learning-center/credit-cards/axis-rewards-redemption" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="canonical" href="https://financialhealth.co.in/learning-center/credit-cards/axis-rewards-redemption" />
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
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Axis Bank EDGE Rewards Redemption Guide: Maximize Your Points Value</h1>
                <div className="flex items-center text-sm">
                  <time dateTime="2024-03-19" className="mr-4">8 min read</time>
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
                Many users find the Axis Bank mobile app interface for redeeming EDGE Reward Points quite confusing. This comprehensive guide will help you check your points and redeem them for maximum value.
              </p>

              <h2 className="text-xl md:text-2xl font-bold mt-12 mb-6 text-indigo-800">How to Check Your EDGE Reward Points</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <h3 className="font-semibold text-base md:text-lg mb-4">Method 1: Through Axis Mobile App</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Log in to the Axis Mobile App</li>
                  <li>Tap the menu icon (≡) on the top-left</li>
                  <li>Go to "Rewards" or "EDGE Rewards"</li>
                  <li>You'll see your total points balance there</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  ⚠️ If you don't see "Rewards", sometimes it's nested under "More Services" or "Cards" &gt; "Credit Card Services"
                </p>

                <h3 className="font-semibold text-base md:text-lg mt-6 mb-4">Method 2: Through Website</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Visit: <a href="https://edgerewards.axisbank.co.in" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">edgerewards.axisbank.co.in</a></li>
                  <li>Login using your Axis Internet Banking credentials</li>
                  <li>Your points and reward history will be visible on the dashboard</li>
                </ul>
              </div>

              <h2 className="text-xl md:text-2xl font-bold mt-12 mb-6 text-indigo-800">Redeem Your Points for Maximum Value</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <p className="text-gray-700 mb-4">Not all redemptions give equal value. Here's a quick guide:</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Redemption Option</th>
                        <th className="px-4 py-2 text-left">Value per Point</th>
                        <th className="px-4 py-2 text-left">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border-t">Gift Vouchers (Amazon, Flipkart, etc.)</td>
                        <td className="px-4 py-2 border-t">₹0.20 – ₹0.25</td>
                        <td className="px-4 py-2 border-t">Among the best options</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-t">Flights & Hotels</td>
                        <td className="px-4 py-2 border-t">₹0.15 – ₹0.20</td>
                        <td className="px-4 py-2 border-t">Decent value</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-t">Products / Merchandise</td>
                        <td className="px-4 py-2 border-t">₹0.10 – ₹0.15</td>
                        <td className="px-4 py-2 border-t">Poor value – avoid unless needed</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-t">Mobile Recharge / DTH</td>
                        <td className="px-4 py-2 border-t">₹0.10 – ₹0.15</td>
                        <td className="px-4 py-2 border-t">Lower value</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-t">Donation / Charity</td>
                        <td className="px-4 py-2 border-t">₹0.10 – ₹0.12</td>
                        <td className="px-4 py-2 border-t">For goodwill only</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-t">Cashback (rarely offered)</td>
                        <td className="px-4 py-2 border-t">₹0.10 – ₹0.15</td>
                        <td className="px-4 py-2 border-t">Not always available</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 mt-4">
                  💡 Best Tip: Redeem for Amazon / Flipkart vouchers – these offer the best mix of flexibility and value.
                </p>
              </div>

              <h2 className="text-xl md:text-2xl font-bold mt-12 mb-6 text-indigo-800">How to Redeem Your EDGE Points (Amazon/Flipkart Vouchers)</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Visit <a href="https://edgerewards.axisbank.co.in" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">edgerewards.axisbank.co.in</a> (desktop works better)</li>
                  <li>Log in</li>
                  <li>Go to "Redeem &gt; Gift Vouchers"</li>
                  <li>Choose Amazon / Flipkart (or others like Myntra, Croma, etc.)</li>
                  <li>Select the denomination and proceed</li>
                  <li>The voucher code will be sent to your registered email/SMS</li>
                </ol>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
                <h3 className="font-semibold text-base md:text-lg mb-2">🧠 Pro Tips:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Don't wait too long to redeem — reward catalogs change and some points may expire after 3 years</li>
                  <li>You can also combine your EDGE points with cash if you don't have enough points</li>
                </ul>
              </div>

              {/* FAQ Section */}
              <section aria-label="Frequently Asked Questions" className="mt-12">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-indigo-800">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-base md:text-lg mb-2">How do I check my Axis Bank EDGE Reward Points?</h3>
                    <p className="text-gray-700">You can check your EDGE Reward Points through the Axis Mobile App by going to 'Rewards' or 'EDGE Rewards' section, or by visiting edgerewards.axisbank.co.in and logging in with your internet banking credentials.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-base md:text-lg mb-2">What is the best way to redeem Axis Bank EDGE Reward Points?</h3>
                    <p className="text-gray-700">The best value comes from redeeming points for gift vouchers (Amazon, Flipkart, etc.) which offer ₹0.20-₹0.25 per point. Flights and hotels offer ₹0.15-₹0.20 per point, while products and mobile recharges offer lower value at ₹0.10-₹0.15 per point.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-base md:text-lg mb-2">Do Axis Bank EDGE Reward Points expire?</h3>
                    <p className="text-gray-700">Yes, EDGE Reward Points typically expire after 3 years. It's recommended to redeem your points regularly rather than accumulating them for too long.</p>
                  </div>
                </div>
              </section>
            </article>
          </main>
        </div>
      </>
    )
}
