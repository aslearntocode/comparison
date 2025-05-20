'use client'

import { useAuth } from '@/context/AuthContext'
import Header from '@/components/Header'
import Script from 'next/script'
import { JSX } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function HDFCRewardsRedemption(): JSX.Element {
    const articleStructuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "HDFC Credit Card Reward Points Redemption: A Complete Guide",
      "description": "Learn how to check and redeem your HDFC credit card reward points for maximum value, including step-by-step instructions and best redemption options.",
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
      "datePublished": "2024-03-19",
      "dateModified": "2024-03-19",
      "image": "https://financialhealth.co.in/CreditCards.png",
      "articleSection": "Credit Cards",
      "url": "https://financialhealth.co.in/learning-center/credit-cards/hdfc-rewards-redemption",
      "timeRequired": "8 min read",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://financialhealth.co.in/learning-center/credit-cards/hdfc-rewards-redemption"
      },
      "keywords": "HDFC Bank, reward points, credit card rewards, points redemption, SmartBuy, gift vouchers, Amazon vouchers, Flipkart vouchers",
      "articleBody": "Learn how to check and redeem your HDFC credit card reward points for maximum value, including step-by-step instructions and best redemption options."
    }

    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "How do I check my HDFC credit card reward points?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can check your HDFC reward points through NetBanking by going to Cards &gt; Enquire &gt; Credit Card Hotlisting/Reward Points Summary, through the HDFC MyCards app, or by checking the last page of your monthly credit card statement."
        }
      }, {
        "@type": "Question",
        "name": "What is the best way to redeem HDFC credit card reward points?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best value comes from redeeming points through SmartBuy for travel bookings (especially for Infinia and Diners Club Black cardholders who get 33% extra value). Gift vouchers and statement credit are also good options, offering ₹0.20-₹0.35 per point depending on the card."
        }
      }, {
        "@type": "Question",
        "name": "Do HDFC credit card reward points expire?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, most HDFC reward points are valid for 2 years from the date of accumulation. It's recommended to redeem your points regularly rather than accumulating them for too long."
        }
      }]
    }

    return (
      <>
        <Head>
          <title>HDFC Credit Card Reward Points Redemption: A Complete Guide | Financial Health</title>
          <meta name="description" content="Learn how to check and redeem your HDFC credit card reward points for maximum value, including step-by-step instructions and best redemption options." />
          <meta name="keywords" content="HDFC Bank, reward points, credit card rewards, points redemption, SmartBuy, gift vouchers, Amazon vouchers, Flipkart vouchers" />
          <meta property="og:title" content="HDFC Credit Card Reward Points Redemption: A Complete Guide" />
          <meta property="og:description" content="Learn how to check and redeem your HDFC credit card reward points for maximum value, including step-by-step instructions and best redemption options." />
          <meta property="og:image" content="https://financialhealth.co.in/CreditCards.png" />
          <meta property="og:url" content="https://financialhealth.co.in/learning-center/credit-cards/hdfc-rewards-redemption" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="canonical" href="https://financialhealth.co.in/learning-center/credit-cards/hdfc-rewards-redemption" />
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
                <h1 className="text-3xl md:text-4xl font-bold mb-4">HDFC Credit Card Reward Points Redemption: A Complete Guide</h1>
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
                HDFC Bank is one of the leading credit card issuers in India, offering a wide range of cards with attractive reward programs. If you hold an HDFC credit card, you might have accumulated thousands of reward points—but are you making the most of them?
              </p>

              <h2 className="text-xl md:text-2xl font-bold mt-12 mb-6 text-indigo-800">What Are HDFC Credit Card Reward Points?</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <p className="text-gray-700 mb-4">Every time you spend using your HDFC credit card, you earn reward points. The number of points earned depends on your card type and the category of your spending (e.g., shopping, dining, travel, etc.).</p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-blue-600 font-semibold mr-2">•</span>
                    <p className="text-gray-700"><span className="font-semibold">HDFC Regalia:</span> Earns 4 reward points per ₹150 spent.</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 font-semibold mr-2">•</span>
                    <p className="text-gray-700"><span className="font-semibold">HDFC Millennia:</span> Offers cashback-style rewards, but also earns points on select categories.</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 font-semibold mr-2">•</span>
                    <p className="text-gray-700"><span className="font-semibold">HDFC Infinia:</span> Premium card with 5 points per ₹150 on most spends.</p>
                  </div>
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-bold mt-12 mb-6 text-indigo-800">How to Check Your HDFC Reward Points Balance</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <p className="text-gray-700 mb-4">There are multiple ways to check your HDFC reward points:</p>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-base md:text-lg mb-2">1. NetBanking</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Log in to HDFC NetBanking</li>
                      <li>Go to Cards &gt; Enquire &gt; Credit Card Hotlisting/Reward Points Summary</li>
                      <li>You'll see your available reward points and their monetary value</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg mb-2">2. HDFC MyCards App</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Download and log in to the HDFC MyCards app</li>
                      <li>View your rewards balance on the home screen</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg mb-2">3. Monthly Statement</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Check the last page of your credit card statement for reward summary</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-bold mt-12 mb-6 text-indigo-800">How to Redeem HDFC Credit Card Reward Points</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <p className="text-gray-700 mb-4">HDFC Bank allows reward point redemption across multiple platforms:</p>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-base md:text-lg mb-2">1. SmartBuy Rewards Portal</h3>
                    <p className="text-gray-700 mb-2">SmartBuy is HDFC's official platform for booking flights, hotels, shopping vouchers, and more using your points.</p>
                    <p className="text-gray-700 mb-2">You can redeem:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Flight tickets</li>
                      <li>Hotel bookings</li>
                      <li>Shopping vouchers (Amazon, Flipkart, BigBasket, etc.)</li>
                      <li>Electronics & lifestyle products</li>
                    </ul>
                    <p className="text-gray-700 mt-2">📝 Pro Tip: Infinia and Diners Club Black cardholders often get 33% extra value when redeeming via SmartBuy.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg mb-2">2. Catalogue Redemption</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Visit HDFC NetBanking &gt; Cards &gt; Redeem Reward Points</li>
                      <li>Choose from a catalogue of products and vouchers</li>
                      <li>Shipping charges may apply in some cases</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg mb-2">3. Cashback / Statement Credit (Available on select cards)</h3>
                    <p className="text-gray-700">Some cards like Regalia First or MoneyBack allow you to convert reward points into direct cashback, credited to your card account.</p>
                    <p className="text-gray-700 mt-2">Typically: 1 Reward Point = ₹0.20 to ₹0.35, depending on the card</p>
                  </div>
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-bold mt-12 mb-6 text-indigo-800">Best Ways to Maximize HDFC Reward Redemption</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Use SmartBuy for travel bookings if you have premium cards (Infinia, Diners Club) to get the best point-to-value ratio.</li>
                  <li>Combine points with partial payment for expensive items like flight tickets or gadgets.</li>
                  <li>Check expiry: Most HDFC reward points are valid for 2 years from the date of accumulation.</li>
                  <li>Redeem before points expire, especially if you're not a frequent flyer or big spender.</li>
                </ul>
              </div>

              <h2 className="text-xl md:text-2xl font-bold mt-12 mb-6 text-indigo-800">Reward Point Redemption Charges</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <p className="text-gray-700">HDFC Bank charges a small redemption fee of ₹99 + GST per redemption request, especially for product or voucher redemptions. Factor this in before placing a low-value redemption.</p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
                <h3 className="font-semibold text-base md:text-lg mb-2">Final Thoughts</h3>
                <p className="text-gray-700">HDFC credit cards offer excellent rewards across spending categories, but the key lies in redeeming them smartly. Whether you're booking a flight, ordering a gift voucher, or just reducing your card bill—there's real value in those points.</p>
                <p className="text-gray-700 mt-2">If you're an HDFC credit card user, log in today and explore your redemption options. Those points sitting idle could fund your next weekend trip or that Diwali gift!</p>
              </div>

              {/* FAQ Section */}
              <section aria-label="Frequently Asked Questions" className="mt-12">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-indigo-800">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-base md:text-lg mb-2">How do I check my HDFC credit card reward points?</h3>
                    <p className="text-gray-700">You can check your HDFC reward points through NetBanking by going to Cards &gt; Enquire &gt; Credit Card Hotlisting/Reward Points Summary, through the HDFC MyCards app, or by checking the last page of your monthly credit card statement.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-base md:text-lg mb-2">What is the best way to redeem HDFC credit card reward points?</h3>
                    <p className="text-gray-700">The best value comes from redeeming points through SmartBuy for travel bookings (especially for Infinia and Diners Club Black cardholders who get 33% extra value). Gift vouchers and statement credit are also good options, offering ₹0.20-₹0.35 per point depending on the card.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-base md:text-lg mb-2">Do HDFC credit card reward points expire?</h3>
                    <p className="text-gray-700">Yes, most HDFC reward points are valid for 2 years from the date of accumulation. It's recommended to redeem your points regularly rather than accumulating them for too long.</p>
                  </div>
                </div>
              </section>
            </article>
          </main>
        </div>
      </>
    )
}
