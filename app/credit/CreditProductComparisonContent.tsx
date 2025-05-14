'use client'

import Header from "@/components/Header"
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useMemo, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { creditCards, type CreditCard, type UserFeedback } from '../data/creditCards'
import { supabase, type Review } from '@/lib/supabase'
import Script from 'next/script'

type SortField = 'apr' | 'annualFee' | 'joiningFee' | 'rewards' | 'sentiment';
type SortDirection = 'asc' | 'desc';

function CreditProductComparisonContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [cardReviews, setCardReviews] = useState<{ [key: string]: Review[] }>({})
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const [showCompareButton, setShowCompareButton] = useState(false)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Best Credit Cards in India",
    "description": "Compare and find the best credit cards in India. Get detailed comparisons of rewards, benefits, and features to choose the perfect credit card for your needs.",
    "publisher": {
      "@type": "Organization",
      "name": "Financial Health",
      "logo": {
        "@type": "ImageObject",
        "url": "https://financialhealth.co.in/Logo_Final3.jpeg"
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Best Credit Cards in India",
          "description": "Compare and find the best credit cards in India with detailed comparisons of rewards, benefits, and features"
        }
      ]
    }
  }

  // Get the category from URL params
  const category = searchParams.get('category')
  const currentCategory = searchParams.get('category')

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
          compareA = a.additionalDetails?.rewardsProgram?.split('\n')[0] || '';
          compareB = b.additionalDetails?.rewardsProgram?.split('\n')[0] || '';
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
    let filtered = creditCards

    // Filter by category if specified
    if (category) {
      // Only show cards that have the specified category in their categories array
      filtered = filtered.filter(card => card.categories.includes(category))
    }

    // Filter by search query
    if (query) {
      filtered = filtered.filter(card => 
        card.name.toLowerCase().includes(query) ||
        card.categories.some(category => category.toLowerCase().includes(query)) ||
        card.additionalDetails?.rewardsProgram?.toLowerCase().includes(query) ||
        card.feedback.some(f => f.comment.toLowerCase().includes(query))
      )
    }

    return sortCards(filtered);
  }, [searchQuery, sortField, sortDirection, category])

  // Get page title based on category
  const getPageTitle = () => {
    if (!category) return 'Credit Cards'
    switch (category) {
      case 'branded': return 'Branded Credit Cards'
      case 'cobranded': return 'Co-Branded Credit Cards'
      case 'fintech': return 'Fintech Credit Cards'
      case 'premium': return 'Premium Credit Cards'
      case 'rewards': return 'Rewards Credit Cards'
      case 'cashback': return 'Cashback Credit Cards'
      case 'fuel': return 'Fuel Credit Cards'
      case 'lifetime-free': return 'Lifetime Free Credit Cards'
      case 'forex': return 'Forex Credit Cards'
      case 'upi': return 'UPI Credit Cards'
      case 'emi': return 'EMI Credit Cards'
      case 'domestic-lounge': return 'Domestic Lounge Access Credit Cards'
      case 'international-lounge': return 'International Lounge Access Credit Cards'
      case 'airlines': return 'Airlines Credit Cards'
      case 'hotels': return 'Hotels Credit Cards'
      case 'lifestyle': return 'Lifestyle Credit Cards'
      case 'secured': return 'Secured Credit Cards'
      case 'ultra-premium': return 'Ultra Premium Credit Cards'
      default: return 'Credit Cards'
    }
  }

  // Update the category title function
  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'fintech': return 'Fintech Credit Cards'
      case 'airlines': return 'Airlines Credit Cards'
      case 'hotels': return 'Hotel Credit Cards'
      // ... existing code ...
    }
  }

  const handleCardSelection = (cardId: string) => {
    setSelectedCards(prev => {
      // If card is already selected, remove it
      if (prev.includes(cardId)) {
        const newSelected = prev.filter(id => id !== cardId);
        setShowCompareButton(newSelected.length >= 2);
        return newSelected;
      }
      // If trying to add more than 3 cards, don't add
      if (prev.length >= 3) {
        return prev;
      }
      // Add the new card
      const newSelected = [...prev, cardId];
      setShowCompareButton(newSelected.length >= 2);
      return newSelected;
    });
  };

  const handleCompare = () => {
    // Navigate to comparison page with selected cards and category
    const queryString = selectedCards.join(',');
    const categoryParam = currentCategory ? `&category=${encodeURIComponent(currentCategory)}` : '';
    window.location.href = `/credit/compare?cards=${queryString}${categoryParam}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-[130px] md:h-[160px] bg-gradient-to-r from-blue-600 to-blue-700" />
        
        <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-4 md:pb-0 z-10">
          <div className="text-center pt-5 md:pt-10">
            <h1 className="text-base md:text-4xl font-bold text-white mb-1 md:mb-3 font-serif tracking-wide">
              {getPageTitle()}
            </h1>
            <p className="text-xs md:text-lg text-white/90 max-w-3xl mx-auto mb-1 md:mb-8 font-sans">
              Compare and find the best credit cards tailored to your needs
            </p>
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative z-10 mt-1 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by rewards, annual fee, etc..."
                  className="w-full px-3 md:px-6 py-1.5 md:py-3 rounded-xl bg-white shadow-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-base"
                />
                <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* Add a little padding below the search bar for mobile only */}
          <div className="h-1 md:h-0" />

          {/* Credit Cards Grid */}
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            {/* Table Header - Desktop */}
            <div className="hidden md:grid md:grid-cols-8 gap-2 mb-6 px-3 py-2 bg-gray-50 rounded-lg" style={{ gridTemplateColumns: '2fr 0.8fr 0.6fr 1.2fr 0.8fr 0.6fr 1fr' }}>
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
                onClick={() => handleSort('sentiment')}
                className="font-medium text-gray-700 text-[13px] flex items-center gap-1 hover:text-blue-600 whitespace-nowrap"
              >
                User Sentiment
                <SortIcon field="sentiment" />
              </button>
              <div className="font-medium text-gray-700 text-[13px]">Compare</div>
              <div className="font-medium text-gray-700 text-[13px] text-center">Apply</div>
            </div>

            {/* Mobile Sort Dropdown */}
            {/* Removed the sort by dropdown for mobile */}

            {/* Cards List */}
            <div className="space-y-4 md:space-y-2 mt-1 md:mt-0">
              {filteredCards.map((card) => (
                <div key={card.id} className="block hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex flex-col">
                    {/* Mobile View */}
                    <div className="md:hidden px-2 py-3 w-full overflow-x-hidden">
                      <div className="flex flex-col w-full">
                        <div className="flex items-start gap-2 mb-2 w-full">
                          <div className="relative w-full max-w-[80px]" style={{ aspectRatio: '7/4' }}>
                            <Image
                              src={card.image}
                              alt={card.name}
                              fill
                              className="object-contain rounded-lg"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <Link href={`/credit/${card.id}`} className="block flex-1 min-w-0">
                                <h3 className="text-base font-bold text-gray-900 mb-1 whitespace-normal break-words">{card.name}</h3>
                                <p className="text-gray-600 mb-2">{card.bank}</p>
                                <div className="flex flex-col">
                                  {getReviewCount(card.id) > 0 && getAverageRating(card.id) ? (
                                    <div className="flex items-center gap-1 whitespace-nowrap text-base">
                                      <span className={`text-2xl font-bold ${getSentimentColor(getAverageRating(card.id))}`}>{getAverageRating(card.id)}</span>
                                      <span className="text-gray-500">/ 10</span>
                                      <span className="text-xs text-blue-600">{getReviewCount(card.id)} reviews</span>
                                    </div>
                                  ) : (
                                    <div className="text-sm text-gray-500">No Reviews Yet</div>
                                  )}
                                </div>
                              </Link>
                              <input
                                type="checkbox"
                                checked={selectedCards.includes(card.id)}
                                onChange={() => handleCardSelection(card.id)}
                                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ml-2 mt-1 flex-shrink-0"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row flex-wrap items-center gap-2 text-xs">
                          <div className="flex items-center gap-1 whitespace-nowrap font-medium text-gray-700">
                            APR <span className="text-gray-900 ml-1 whitespace-nowrap">{card.apr}</span>
                          </div>
                          <div className="flex items-center gap-1 font-medium text-gray-700">
                            Fees
                            <span className="text-gray-900 ml-1 whitespace-nowrap">
                              Annual: {card.annualFee} | Joining: {card.joiningFee}
                            </span>
                          </div>
                        </div>
                        {/* Check Eligibility Button (mobile only) */}
                        <div className="flex justify-end mt-2">
                          <Link
                            href={`/credit/${card.id}`}
                            className="inline-block px-3 py-1 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition-colors"
                          >
                            Check Eligibility
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* Desktop View */}
                    <div className="hidden md:grid md:grid-cols-8 gap-2 px-3 py-2" style={{ gridTemplateColumns: '2fr 0.8fr 0.6fr 1.2fr 0.8fr 0.6fr 1fr' }}>
                      <Link href={`/credit/${card.id}`} className="flex items-center gap-4 col-span-1 group cursor-pointer">
                        <div className="w-32 h-20 relative flex-shrink-0">
                          <Image
                            src={card.image}
                            alt={card.name}
                            fill
                            className="object-contain rounded-lg"
                          />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:underline leading-tight whitespace-normal break-words">{card.name}</h3>
                        </div>
                      </Link>
                      <div className="text-gray-900 flex items-center">{card.apr}</div>
                      <div className="flex items-center">
                        {card.rupay ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            No
                          </span>
                        )}
                      </div>
                      <div className="text-gray-900 text-sm flex items-center text-left">
                        <ul className="list-disc list-inside space-y-1">
                          <li>Annual: {card.annualFee}</li>
                          <li>Joining: {card.joiningFee}</li>
                        </ul>
                      </div>
                      <div className="flex flex-col justify-center text-left">
                        {getReviewCount(card.id) > 0 && getAverageRating(card.id) ? (
                          <div className="flex items-center gap-1 whitespace-nowrap text-base">
                            <span className={`text-2xl font-bold ${getSentimentColor(getAverageRating(card.id))}`}>{getAverageRating(card.id)}</span>
                            <span className="text-gray-500">/ 10</span>
                            <span className="text-xs text-blue-600">{getReviewCount(card.id)} reviews</span>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">No Reviews Yet</div>
                        )}
                      </div>
                      <div className="flex items-center justify-start">
                        <input
                          type="checkbox"
                          checked={selectedCards.includes(card.id)}
                          onChange={() => handleCardSelection(card.id)}
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <Link
                          href={`/credit/${card.id}`}
                          target="_self"
                          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Check Eligibility
                        </Link>
                      </div>
                    </div>
                    {/* Features Section - Desktop Only */}
                    <div className="hidden md:block px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {card.categories.map((category, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-gray-100" />
                  </div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredCards.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No credit cards found matching your search criteria.</p>
              </div>
            )}

            {/* Premium Category Link for Ultra-Premium */}
            {category === 'ultra-premium' && (
              <div className="text-center py-4 md:py-8">
                <Link 
                  href="/credit?category=premium"
                  className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm md:text-base"
                >
                  <span>Looking for Lower Fee Cards, Explore Premium Category</span>
                  <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}

            {/* Lifestyle Category Link for Premium */}
            {category === 'premium' && (
              <div className="text-center py-4 md:py-8">
                <Link 
                  href="/credit?category=lifestyle"
                  className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm md:text-base"
                >
                  <span>Looking for a Lifestyle Card, Explore Lifestyle Category</span>
                  <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}

            {/* Lifetime Free Category Link for Lifestyle */}
            {category === 'lifestyle' && (
              <div className="text-center py-4 md:py-8">
                <Link 
                  href="/credit?category=lifetime-free"
                  className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm md:text-base"
                >
                  <span>Looking for a No Fee Card, Explore Lifetime Free Category</span>
                  <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Button */}
      {showCompareButton && (
        <div className="fixed md:bottom-4 right-4 z-50">
          <button
            onClick={handleCompare}
            className="w-full md:w-auto bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
          >
            Compare {selectedCards.length} Cards
          </button>
        </div>
      )}
    </div>
  )
}

export default function CreditProductComparison() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreditProductComparisonContent />
    </Suspense>
  )
} 