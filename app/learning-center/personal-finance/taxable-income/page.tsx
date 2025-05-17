"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import './styles.css';
import Script from 'next/script';
import { articles } from '../../articles-data';
import RelatedArticles from '../../components/RelatedArticles';

// Update interfaces
interface SubCategories {
  shortTerm?: string[];
  longTerm?: string[];
  speculative?: string[];
  nonSpeculative?: string[];
}

type SubCategoriesType = Partial<SubCategories>;

interface IncomeHead {
  title: string;
  details?: string[];
  subCategories?: SubCategoriesType;
}

const TaxableIncomePage = () => {
  // Track expanded state for each step
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const toggleStep = (stepId: number) => {
    setExpandedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const incomeHeads: Record<string, IncomeHead> = {
    salary: {
      title: "Income from Salary",
      details: ["Basic Salary", "HRA", "Special Allowances", "Perquisites", "Other Allowances"]
    },
    houseProperty: {
      title: "Income from House Property",
      details: ["Rental Income", "Municipal Taxes", "Interest on Home Loan", "Standard Deduction"]
    },
    capitalGains: {
      title: "Income from Capital Gains",
      subCategories: {
        shortTerm: ["Stocks < 1 year", "Property < 2 years"],
        longTerm: ["Stocks > 1 year", "Property > 2 years"]
      }
    },
    business: {
      title: "Income from Business",
      subCategories: {
        speculative: ["Intraday Trading", "Futures & Options"],
        nonSpeculative: ["Regular Business Income", "Professional Income"]
      }
    },
    otherSources: {
      title: "Income from Other Sources",
      details: ["Interest Income", "Dividends", "Gifts", "Lottery", "Commission"]
    }
  };

  const steps = [
    {
      id: 1,
      title: "Calculate Gross Total Income",
      description: "Sum up income from all 5 heads of income. Click to see details.",
      icon: "💰",
      expandedContent: (
        <Card className="p-8 bg-white">
          <h3 className="text-2xl font-bold text-center mb-8 text-blue-600">5 Heads of Income</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {Object.entries(incomeHeads).map(([key, income]) => (
              <div key={key} className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold text-lg mb-3 text-gray-800">{income.title}</h4>
                {income.details ? (
                  <ul className="space-y-2">
                    {income.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-600">• {detail}</li>
                    ))}
                  </ul>
                ) : income.subCategories && (
                  <div className="space-y-4">
                    {income.subCategories.shortTerm && (
                      <div>
                        <h5 className="font-medium text-sm mb-2 text-gray-700">Short Term:</h5>
                        <ul className="space-y-1">
                          {income.subCategories.shortTerm.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-600">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {income.subCategories.longTerm && (
                      <div>
                        <h5 className="font-medium text-sm mb-2 text-gray-700">Long Term:</h5>
                        <ul className="space-y-1">
                          {income.subCategories.longTerm.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-600">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {income.subCategories.speculative && (
                      <div>
                        <h5 className="font-medium text-sm mb-2 text-gray-700">Speculative:</h5>
                        <ul className="space-y-1">
                          {income.subCategories.speculative.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-600">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {income.subCategories.nonSpeculative && (
                      <div>
                        <h5 className="font-medium text-sm mb-2 text-gray-700">Non-Speculative:</h5>
                        <ul className="space-y-1">
                          {income.subCategories.nonSpeculative.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-600">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )
    },
    {
      id: 2,
      title: "Combine All Income Sources",
      description: "Add up income from all heads to arrive at total income",
      icon: "🔄",
      expandedContent: (
        <Card className="p-8 bg-white">
          <h3 className="text-2xl font-bold text-center mb-8 text-blue-600">Combining Income Sources</h3>
          <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="border rounded-lg p-6 bg-gray-50">
              <h4 className="font-semibold text-lg mb-4">Steps to Combine Income:</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <span>Add all positive income from different heads</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <span>Include income of spouse/minor if applicable</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <span>Consider clubbing provisions for family income</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <span>Exclude exempt income under various sections</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      )
    },
    {
      id: 3,
      title: "Offset Losses",
      description: "Adjust for any losses from current year or carried forward",
      icon: "📊",
      expandedContent: (
        <Card className="p-8 bg-white">
          <h3 className="text-2xl font-bold text-center mb-8 text-blue-600">Loss Adjustment Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="border rounded-lg p-6 bg-gray-50">
              <h4 className="font-semibold text-lg mb-4">Current Year Losses</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <span>Business losses can be set off against any head of income</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <span>Capital losses can only be set off against capital gains</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <span>House property loss up to ₹2 lakhs can be set off</span>
                </li>
              </ul>
            </div>
            <div className="border rounded-lg p-6 bg-gray-50">
              <h4 className="font-semibold text-lg mb-4">Carried Forward Losses</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <span>Business losses can be carried forward for 8 years</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <span>Speculation losses can be carried forward for 4 years</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <span>Capital losses can be carried forward for 8 years</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      )
    },
    {
      id: 4,
      title: "Apply Deductions",
      description: "Claim eligible deductions under various sections",
      icon: "✅",
      expandedContent: (
        <Card className="p-8 bg-white">
          <h3 className="text-2xl font-bold text-center mb-8 text-blue-600">Available Deductions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="border rounded-lg p-6 bg-gray-50">
              <h4 className="font-semibold text-lg mb-4">Section 80C (₹1.5L)</h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">• PPF Investment</li>
                <li className="text-sm text-gray-600">• ELSS Mutual Funds</li>
                <li className="text-sm text-gray-600">• Life Insurance Premium</li>
                <li className="text-sm text-gray-600">• Home Loan Principal</li>
              </ul>
            </div>
            <div className="border rounded-lg p-6 bg-gray-50">
              <h4 className="font-semibold text-lg mb-4">Health & Education</h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">• 80D: Health Insurance</li>
                <li className="text-sm text-gray-600">• 80E: Education Loan</li>
                <li className="text-sm text-gray-600">• 80DD: Medical Treatment</li>
                <li className="text-sm text-gray-600">• 80DDB: Specified Diseases</li>
              </ul>
            </div>
            <div className="border rounded-lg p-6 bg-gray-50">
              <h4 className="font-semibold text-lg mb-4">Other Deductions</h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">• 80G: Donations</li>
                <li className="text-sm text-gray-600">• 80GG: House Rent</li>
                <li className="text-sm text-gray-600">• 80TTA: Savings Interest</li>
                <li className="text-sm text-gray-600">• 80U: Disability</li>
              </ul>
            </div>
          </div>
        </Card>
      )
    }
  ];

  const article = articles.find(a => a.link === '/learning-center/personal-finance/taxable-income');
  
  if (!article) {
    return <div>Article not found</div>;
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
    "image": "https://financialhealth.co.in/images/taxable-income.jpg",
    "articleSection": article.category,
    "url": `https://financialhealth.co.in${article.link}`,
    "timeRequired": article.readTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://financialhealth.co.in${article.link}`
    }
  };

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

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Types of Taxable Income</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="font-semibold mr-2">Salary Income:</span>
                Regular income from employment
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Business Income:</span>
                Profits from business operations
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Capital Gains:</span>
                Profits from selling assets
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Other Sources:</span>
                Interest, rent, and other earnings
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Tax Planning Strategies</h2>
            <p className="text-lg leading-relaxed mb-4">
              Effective tax planning involves:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Understanding tax brackets and rates
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Utilizing tax deductions and exemptions
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Investing in tax-saving instruments
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                Planning for long-term tax efficiency
              </li>
            </ul>
          </div>

          {/* Related Articles */}
          <RelatedArticles currentArticle={article} allArticles={articles} />
        </article>
      </main>
    </div>
  );
};

export default TaxableIncomePage;
