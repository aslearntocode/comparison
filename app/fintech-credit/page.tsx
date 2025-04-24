'use client'

import Header from "@/components/Header"
import { useRouter } from 'next/navigation'
import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type CreditCard, type UserFeedback } from '../data/creditCards'
import { fintechCards } from '../data/fintechCards'
import { supabase, type Review } from '@/lib/supabase'

type SortField = 'apr' | 'annualFee' | 'joiningFee' | 'rewards' | 'sentiment';
type SortDirection = 'asc' | 'desc';

export default function CreditProductComparison() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [cardReviews, setCardReviews] = useState<{ [key: string]: Review[] }>({})

  useEffect(() => {
    // Fetch all reviews when component mounts
    const fetchAllReviews = async () => {
      try {
        console.log('Fetching reviews...')
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching reviews:', error)
          return
        }

        if (!data) {
          console.log('No reviews data returned')
          return
        }

        console.log('Fetched reviews:', data)

        // Group reviews by card_id
        const reviewsByCard = data.reduce((acc: { [key: string]: Review[] }, review) => {
          if (!acc[review.card_id]) {
            acc[review.card_id] = []
          }
          acc[review.card_id].push(review)
          return acc
        }, {})

        console.log('Grouped reviews:', reviewsByCard)
        setCardReviews(reviewsByCard)
      } catch (err) {
        console.error('Error in fetchAllReviews:', err)
      }
    }

    fetchAllReviews()
  }, [])

  // Debug log when cardReviews changes
  useEffect(() => {
    console.log('cardReviews state updated:', cardReviews)
  }, [cardReviews])

  // Calculate average rating from reviews
  const getAverageRating = (cardId: string): number | undefined => {
    const reviews = cardReviews[cardId] || []
    if (reviews.length === 0) return undefined
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0)
    const average = sum / reviews.length
    return isNaN(average) ? undefined : Math.round(average * 10) / 10
  }

  // Get number of reviews for a card
  const getReviewCount = (cardId: string): number => {
    return (cardReviews[cardId] || []).length
  }

  // Get sentiment color based on rating
  const getSentimentColor = (rating: number | undefined): string => {
    if (!rating) return 'text-gray-500'
    if (rating >= 8) return 'text-green-600'
    if (rating >= 6) return 'text-blue-600'
    if (rating >= 4) return 'text-yellow-600'
    return 'text-red-600'
  }

  // Sort function
  const sortCards = (cards: CreditCard[]): CreditCard[] => {
    if (!sortField) return cards;

    return [...cards].sort((a, b) => {
      let compareA: string | number = '';
      let compareB: string | number = '';

      switch (sortField) {
        case 'apr':
          compareA = parseFloat(a.apr.replace(/[^0-9.]/g, ''));
          compareB = parseFloat(b.apr.replace(/[^0-9.]/g, ''));
          break;
        case 'annualFee':
          compareA = parseFloat(a.annualFee.replace(/[^0-9]/g, '')) || 0;
          compareB = parseFloat(b.annualFee.replace(/[^0-9]/g, '')) || 0;
          break;
        case 'joiningFee':
          compareA = a.joiningFee === 'Free' ? 0 : parseFloat(a.joiningFee.replace(/[^0-9]/g, '')) || 0;
          compareB = b.joiningFee === 'Free' ? 0 : parseFloat(b.joiningFee.replace(/[^0-9]/g, '')) || 0;
          break;
        case 'rewards':
          compareA = a.rewards === 'None' ? '' : a.rewards;
          compareB = b.rewards === 'None' ? '' : b.rewards;
          break;
        case 'sentiment':
          const ratingA = getAverageRating(a.id)
          const ratingB = getAverageRating(b.id)
          compareA = ratingA ?? 0
          compareB = ratingB ?? 0
          break;
      }

      if (typeof compareA === 'number' && typeof compareB === 'number') {
        return sortDirection === 'asc' ? compareA - compareB : compareB - compareA;
      }
      
      return sortDirection === 'asc'
        ? String(compareA).localeCompare(String(compareB))
        : String(compareB).localeCompare(String(compareA));
    });
  };

  // Handle sort click
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort icon component
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  // Filter and sort credit cards
  const filteredCards = useMemo(() => {
    const query = searchQuery.toLowerCase()
    const filtered = fintechCards.filter(card => 
      card.name.toLowerCase().includes(query) ||
      card.features.some(feature => feature.toLowerCase().includes(query)) ||
      card.rewards.toLowerCase().includes(query) ||
      card.feedback.some(f => f.comment.toLowerCase().includes(query))
    )
    return sortCards(filtered);
  }, [searchQuery, sortField, sortDirection])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-[160px] bg-gradient-to-r from-blue-600 to-blue-700" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-10">
            <h1 className="text-4xl font-bold text-white mb-3 font-serif tracking-wide">
              Fintech Credit Cards
            </h1>
            
            <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8 font-sans">
              Compare and find the best credit cards tailored to your needs
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative z-10">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by rewards, annual fee, etc..."
                  className="w-full px-6 py-3 rounded-xl bg-white shadow-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Credit Cards Grid */}
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            {/* Table Header - Desktop */}
            <div className="hidden md:grid md:grid-cols-7 gap-2 mb-6 px-3 py-2 bg-gray-50 rounded-lg" style={{ gridTemplateColumns: '2fr 0.8fr 0.6fr 1.2fr 1.8fr 0.8fr' }}>
              <div className="col-span-1 font-medium text-gray-700 text-[13px]">Card Details</div>
              <button
                onClick={() => handleSort('apr')}
                className="font-medium text-gray-700 text-[13px] flex items-center gap-1 hover:text-blue-600"
              >
                APR
                <SortIcon field="apr" />
              </button>
              <div className="font-medium text-gray-700 text-[13px]">Rupay</div>
              <button
                onClick={() => handleSort('annualFee')}
                className="font-medium text-gray-700 text-[13px] flex items-center gap-1 hover:text-blue-600"
              >
                Fees
                <SortIcon field="annualFee" />
              </button>
              <button
                onClick={() => handleSort('rewards')}
                className="font-medium text-gray-700 text-[13px] flex items-center gap-1 hover:text-blue-600"
              >
                Rewards
                <SortIcon field="rewards" />
              </button>
              <button
                onClick={() => handleSort('sentiment')}
                className="font-medium text-gray-700 text-[13px] flex items-center gap-1 hover:text-blue-600 whitespace-nowrap"
              >
                User Sentiment
                <SortIcon field="sentiment" />
              </button>
            </div>

            {/* Mobile Sort Dropdown */}
            <div className="md:hidden mb-4">
              <select
                value={sortField || ''}
                onChange={(e) => {
                  const value = e.target.value as SortField;
                  if (value) {
                    handleSort(value);
                  } else {
                    setSortField(null);
                  }
                }}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
              >
                <option value="">Sort by...</option>
                <option value="apr">APR</option>
                <option value="annualFee">Annual Fee</option>
                <option value="joiningFee">Joining Fee</option>
                <option value="rewards">Rewards</option>
                <option value="sentiment">User Sentiment</option>
              </select>
            </div>

            {/* Cards List */}
            <div className="space-y-8">
              {filteredCards.map((card) => (
                <Link
                  key={card.id}
                  href={`/fintech-credit/${card.id}`}
                  className="block hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex flex-col">
                    {/* Mobile View */}
                    <div className="md:hidden px-4 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-32 h-20 relative flex-shrink-0">
                            <Image
                              src={card.image}
                              alt={card.name}
                              fill
                              className="object-contain rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{card.name}</h3>
                            <p className="text-gray-600 mb-4">{card.bank}</p>
                            <div className="flex flex-col">
                              {getReviewCount(card.id) > 0 && getAverageRating(card.id) ? (
                                <>
                                  <div className="flex items-center gap-1">
                                    <span className={`text-3xl font-bold ${getSentimentColor(getAverageRating(card.id))}`}>
                                      {getAverageRating(card.id)}
                                    </span>
                                    <div className="flex flex-col items-start justify-center">
                                      <span className="text-gray-500 text-base">/ 10</span>
                                    </div>
                                  </div>
                                  <div className="text-xs text-blue-600 whitespace-nowrap">
                                    {getReviewCount(card.id)} reviews
                                  </div>
                                </>
                              ) : (
                                <div className="text-sm text-gray-500">
                                  No Reviews Yet
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <span className="text-gray-600">APR:</span>
                            <span className="font-medium">{card.apr}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-gray-600">Rupay:</span>
                            {card.rupay ? (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Yes</span>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">No</span>
                            )}
                          </div>
                          <div>
                            <span className="text-gray-600 block mb-2">Fees:</span>
                            <ul className="list-disc list-inside space-y-1">
                              <li className="text-gray-900">Annual: {card.annualFee}</li>
                              <li className="text-gray-900">Joining: {card.joiningFee}</li>
                            </ul>
                          </div>
                          <div>
                            <span className="text-gray-600 block mb-2">Rewards:</span>
                            <ul className="list-disc list-inside space-y-2 text-gray-900">
                              {card.rewards !== 'None' && card.rewards.split('\n').map((reward, index) => (
                                <li key={index} className="text-sm">{reward}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            {card.features.map((feature, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:grid md:grid-cols-7 gap-4 items-center px-4 py-4" style={{ gridTemplateColumns: '2fr 0.8fr 0.6fr 1.2fr 1.8fr 0.8fr' }}>
                      <div className="col-span-1 flex items-center gap-4">
                        <div className="w-40 h-24 relative">
                          <Image
                            src={card.image}
                            alt={card.name}
                            fill
                            className="object-contain rounded-lg"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{card.name}</h3>
                          <p className="text-xs text-gray-500">{card.bank}</p>
                        </div>
                      </div>
                      <div className="text-gray-900 text-sm">{card.apr}</div>
                      <div className="text-gray-900 text-sm">
                        {card.rupay ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Yes</span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">No</span>
                        )}
                      </div>
                      <div className="text-gray-900 text-sm">
                        <ul className="list-disc list-inside space-y-1">
                          <li>Annual: {card.annualFee}</li>
                          <li>Joining: {card.joiningFee}</li>
                        </ul>
                      </div>
                      <div className="text-gray-900 text-sm">
                        <ul className="list-disc list-inside">
                          {card.rewards !== 'None' && card.rewards.split('\n').map((reward, index) => (
                            <li key={index}>{reward}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col">
                        {getReviewCount(card.id) > 0 && getAverageRating(card.id) ? (
                          <>
                            <div className="flex items-center gap-1">
                              <span className={`text-3xl font-bold ${getSentimentColor(getAverageRating(card.id))}`}>
                                {getAverageRating(card.id)}
                              </span>
                              <div className="flex flex-col items-start justify-center">
                                <span className="text-gray-500 text-base">/ 10</span>
                              </div>
                            </div>
                            <div className="text-xs text-blue-600 whitespace-nowrap">
                              {getReviewCount(card.id)} reviews
                            </div>
                          </>
                        ) : (
                          <div className="text-sm text-gray-500">
                            No Reviews Yet
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features Section - Desktop Only */}
                    <div className="hidden md:block px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {card.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-gray-100" />
                  </div>
                </Link>
              ))}
            </div>

            {/* No Results Message */}
            {filteredCards.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No credit cards found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}