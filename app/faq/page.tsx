'use client'

import Header from "@/components/Header"
import { useState } from "react"

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a credit score and why is it important?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A credit score is a three-digit number that represents your creditworthiness. It ranges from 300 to 900, with higher scores indicating better credit health. A good credit score is crucial for getting approved for credit cards, loans, and better interest rates. It also affects your ability to rent apartments, get insurance, and even secure certain jobs."
        }
      },
      {
        "@type": "Question",
        "name": "How can I get my credit report from CIBIL?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can get your CIBIL credit report in three ways:\n1. Visit the official CIBIL website (www.cibil.com)\n2. Use the CIBIL mobile app\n3. Request through your bank's website\n\nYou're entitled to one free credit report per year. Additional reports can be purchased for a nominal fee."
        }
      },
      // Add more FAQ items...
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Find answers to common questions about credit cards, credit scores, and financial planning.
        </p>
        
        <div className="space-y-6">
          <section>
            <div className="space-y-4">
              {[
                {
                  question: "What is a credit score and why is it important?",
                  answer: "A credit score is a three-digit number that represents your creditworthiness. It ranges from 300 to 900, with higher scores indicating better credit health. A good credit score is crucial for getting approved for credit cards, loans, and better interest rates. It also affects your ability to rent apartments, get insurance, and even secure certain jobs."
                },
                {
                  question: "How can I get my credit report from CIBIL?",
                  answer: (
                    <div>
                      You can get your CIBIL credit report in three ways:
                      <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Visit the official CIBIL website (www.cibil.com)</li>
                        <li>Use the CIBIL mobile app</li>
                        <li>Request through your bank's website</li>
                      </ul>
                      <p className="mt-2">You're entitled to one free credit report per year. Additional reports can be purchased for a nominal fee.</p>
                    </div>
                  )
                },
                {
                  question: "What factors affect my credit score?",
                  answer: (
                    <div>
                      Several factors influence your credit score:
                      <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Payment history (35%) - Timely payments of credit card bills and loans</li>
                        <li>Credit utilization (30%) - How much of your available credit you're using</li>
                        <li>Credit history length (15%) - How long you've had credit accounts</li>
                        <li>Credit mix (10%) - Different types of credit (cards, loans, etc.)</li>
                        <li>New credit (10%) - Recent credit inquiries and new accounts</li>
                      </ul>
                    </div>
                  )
                },
                {
                  question: "How can I improve my credit score?",
                  answer: (
                    <div>
                      Here are key steps to improve your credit score:
                      <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Pay all bills on time, including credit card bills</li>
                        <li>Keep credit card utilization below 30%</li>
                        <li>Don't close old credit card accounts</li>
                        <li>Limit new credit applications</li>
                        <li>Regularly check your credit report for errors</li>
                        <li>Maintain a mix of different types of credit</li>
                      </ul>
                    </div>
                  )
                },
                {
                  question: "What is the difference between a credit card and a debit card?",
                  answer: "A credit card allows you to borrow money up to a certain limit to make purchases, which you must repay later with interest if not paid in full. A debit card directly deducts money from your bank account when you make a purchase. Credit cards help build credit history, offer rewards, and provide additional protection, while debit cards help you spend within your means and avoid debt."
                },
                {
                  question: "How do I choose the right credit card?",
                  answer: (
                    <div>
                      Consider these factors when choosing a credit card:
                      <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Your spending habits and patterns</li>
                        <li>Annual fee and joining fee</li>
                        <li>Reward points or cashback structure</li>
                        <li>Interest rates and charges</li>
                        <li>Additional benefits (lounge access, travel insurance, etc.)</li>
                        <li>Your credit score and eligibility</li>
                      </ul>
                    </div>
                  )
                },
                {
                  question: "What is an AI-Powered Credit Score Summary?",
                  answer: "The summary gives you the key elements of your credit report and presents the metrics in an understandable way. The summary also suggests specific actions you can take to enhance your credit health."
                }
              ].map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  <button
                    onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center"
                  >
                    <h3 className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </h3>
                    <span className={`ml-4 flex-shrink-0 transition-transform duration-200 ${openQuestion === index ? 'rotate-180' : ''}`}>
                      <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div className={`px-6 transition-all duration-200 ease-in-out ${openQuestion === index ? 'py-4 border-t border-gray-200' : 'max-h-0 overflow-hidden'}`}>
                    <div className="text-gray-600">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
} 