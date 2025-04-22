'use client'

import { useState, use } from 'react'
import Header from "@/components/Header"
import Link from 'next/link'
import Image from 'next/image'
import { creditCards, type UserFeedback } from '../../data/creditCards'

export default function CreditCardDetail({ params }: { params: Promise<{ cardId: string }> }) {
  const [activeTab, setActiveTab] = useState<
    | 'welcome-annual'
    | 'milestone'
    | 'rewards'
    | 'fees'
  >('welcome-annual');
  
  const { cardId } = use(params)
  const card = creditCards.find(c => c.id === cardId)
  
  if (!card) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Card Not Found</h2>
            <Link href="/credit" className="text-blue-600 hover:text-blue-800">
              Back to Credit Cards
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const getAverageRating = (feedback: UserFeedback[]): number => {
    if (feedback.length === 0) return 0;
    const sum = feedback.reduce((acc, curr) => acc + curr.rating, 0);
    return Math.round((sum / feedback.length) * 10) / 10;
  }

  const getSentimentColor = (rating: number): string => {
    if (rating >= 8) return 'text-green-600';
    if (rating >= 6) return 'text-blue-600';
    if (rating >= 4) return 'text-yellow-600';
    return 'text-red-600';
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'welcome-annual':
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Welcome Benefits</h3>
              <div className="space-y-6">
                {card.additionalDetails?.welcomeBonus?.split('\n').map((benefit, index) => {
                  if (benefit.endsWith(':')) {
                    // This is a section header (like "Taj Epicure Membership:" or "EazyDiner Prime Membership:")
                    return (
                      <div key={index} className="mt-4">
                        <h4 className="text-gray-900 font-medium mb-2">{benefit}</h4>
                      </div>
                    );
                  } else if (benefit.startsWith('•')) {
                    // This is a sub-point
                    return (
                      <div key={index} className="flex gap-2 ml-8">
                        <span className="text-blue-600">•</span>
                        <span className="text-gray-700">{benefit.substring(1).trim()}</span>
                      </div>
                    );
                  } else if (benefit.trim() !== '') {
                    // This is a main point (like the reward points)
                    return (
                      <div key={index} className="flex gap-2">
                        <span className="text-blue-600">•</span>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        );
      case 'milestone':
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Milestone Benefits</h3>
              <ul className="list-disc list-inside space-y-2">
                {card.additionalDetails?.milestoneBenefits?.map((benefit, index) => (
                  <li key={index} className="text-gray-700">{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'rewards':
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Reward Points & Other Benefits
              </h3>
              
              <div className="space-y-8">
                {/* Rewards Program Section */}
                <div className="bg-white rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Reward Points</h4>
                  {card.additionalDetails?.rewardsProgram?.split('\n').map((line, index) => {
                    if (line.endsWith(':')) {
                      return (
                        <h5 key={index} className="font-medium text-gray-900 mt-4 mb-2">{line}</h5>
                      );
                    } else if (line.startsWith('•')) {
                      return (
                        <div key={index} className="flex gap-2 ml-4 mb-2">
                          <span className="text-blue-600">•</span>
                          <span className="text-gray-700">{line.substring(1).trim()}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Travel & Lifestyle Benefits Section */}
                <div className="bg-white rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Travel & Lifestyle Benefits</h4>
                  {card.additionalDetails?.airportLounge?.split('\n').map((line, index) => {
                    if (line.endsWith(':')) {
                      return (
                        <h5 key={index} className="font-medium text-gray-900 mt-4 mb-2">{line}</h5>
                      );
                    } else if (line.startsWith('•')) {
                      return (
                        <div key={index} className="flex gap-2 ml-4 mb-2">
                          <span className="text-blue-600">•</span>
                          <span className="text-gray-700">{line.substring(1).trim()}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Insurance & Protection Section */}
                <div className="bg-white rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Insurance & Protection</h4>
                  <div className="space-y-2">
                    {card.additionalDetails?.insuranceCover?.map((item, index) => (
                      <div key={index}>
                        {item.startsWith('•') ? (
                          <div className="flex gap-2 ml-4">
                            <span className="text-blue-600">•</span>
                            <span className="text-gray-700">{item.substring(1).trim()}</span>
                          </div>
                        ) : item.endsWith(':') ? (
                          <h5 className="font-medium text-gray-900 mt-4 mb-2">{item}</h5>
                        ) : (
                          <div className="text-gray-700">{item}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Features Section */}
                <div className="bg-white rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Features</h4>
                  {card.additionalDetails?.additionalServices?.split('\n').map((line, index) => {
                    if (line.endsWith(':')) {
                      return (
                        <h5 key={index} className="font-medium text-gray-900 mt-4 mb-2">{line}</h5>
                      );
                    } else if (line.startsWith('•')) {
                      return (
                        <div key={index} className="flex gap-2 ml-4 mb-2">
                          <span className="text-blue-600">•</span>
                          <span className="text-gray-700">{line.substring(1).trim()}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      case 'fees':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Fees Structure</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-700">Joining Fee</p>
                  <p className="text-gray-600">{card.joiningFee}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Annual Fee</p>
                  <p className="text-gray-600">{card.annualFee}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Interest Rate</p>
                  <p className="text-gray-600">{card.additionalDetails?.interestRate}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Domestic Transaction Fee</p>
                  <p className="text-gray-600">{card.additionalDetails?.domesticTransactionFee}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">International Transaction Fee</p>
                  <p className="text-gray-600">{card.additionalDetails?.internationalTransactionFee}</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <Link href="/credit" className="text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Credit Cards
            </Link>
          </div>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Card Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="w-40 h-24 relative mx-auto sm:mx-0">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{card.name}</h1>
                    <p className="text-xl text-gray-600 mb-4">{card.bank}</p>
                    <div className="bg-blue-50 rounded-lg p-4 inline-block">
                      <p className="text-blue-900 font-medium">
                        {card.additionalDetails?.summary}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:text-right">
                    <div className="flex items-center justify-center sm:justify-end gap-2">
                      <span className={`text-4xl font-bold ${getSentimentColor(getAverageRating(card.feedback))}`}>
                        {getAverageRating(card.feedback)}
                      </span>
                      <div className="flex flex-col items-start">
                        <span className="text-gray-500">/ 10</span>
                        <span className="text-sm text-gray-500">{card.feedback.length} reviews</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Suitability Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                Who Should Get This Card?
              </h3>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Who Should Get Column - Takes 2/3 of space */}
                <div className="md:col-span-2 space-y-6">
                  {card.additionalDetails?.idealFor?.map((profile, index) => {
                    const [title, description] = profile.split(': ');
                    const icons = {
                      'High Net-Worth Professionals': '💼',
                      'High Net-Worth Individuals': '💼',
                      'Mid-to-High Spenders': '💼',
                      'Frequent Jetsetters': '✈️',
                      'Luxury Travel Enthusiasts': '✈️',
                      'Occasional Travelers': '✈️',
                      'Premium Lifestyle Lovers': '🎭',
                      'Golf Lovers': '⛳',
                      'Premium Dining Connoisseurs': '🍽️',
                      'Lifestyle & Entertainment Enthusiasts': '🎭',
                      'Reward Collectors': '🎯',
                      'Reward Maximizers': '🎯'
                    };
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-xl">{icons[title as keyof typeof icons] || '✨'}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 text-lg">{title}</span>
                          <p className="text-gray-700 mt-1">{description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Not Ideal For Column - Takes 1/3 of space */}
                <div className="md:col-span-1">
                  <div className="bg-red-50 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                      <span>🚫</span>
                      Not Ideal For
                    </h4>
                    <ul className="space-y-3">
                      {card.additionalDetails?.notIdealFor?.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-red-700">
                          <span className="mt-1.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('welcome-annual')}
                  className={`flex-1 py-4 px-6 text-sm font-medium text-center whitespace-nowrap ${
                    activeTab === 'welcome-annual'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Welcome & Annual Benefits
                </button>
                <button
                  onClick={() => setActiveTab('milestone')}
                  className={`flex-1 py-4 px-6 text-sm font-medium text-center whitespace-nowrap ${
                    activeTab === 'milestone'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Milestone Benefits
                </button>
                <button
                  onClick={() => setActiveTab('rewards')}
                  className={`flex-1 py-4 px-6 text-sm font-medium text-center whitespace-nowrap ${
                    activeTab === 'rewards'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reward Points and Other Benefits
                </button>
                <button
                  onClick={() => setActiveTab('fees')}
                  className={`flex-1 py-4 px-6 text-sm font-medium text-center whitespace-nowrap ${
                    activeTab === 'fees'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Joining and Annual Fees
                </button>
              </div>
            </div>

            <div className="p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 