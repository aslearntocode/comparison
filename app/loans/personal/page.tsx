'use client'

import Header from "@/components/Header"
import { useRouter } from 'next/navigation'
import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { personalLoans, type PersonalLoan, type UserFeedback } from '@/app/data/personalLoans'
import { supabase, type Review } from '@/lib/supabase'

type SortField = 'interestRate' | 'processingFee' | 'maxAmount' | 'sentiment';

type SortDirection = 'asc' | 'desc';

export default function PersonalLoanComparison() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [loanReviews, setLoanReviews] = useState<{ [key: string]: Review[] }>({})

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
        const reviewsByLoan = data.reduce((acc: { [key: string]: Review[] }, review) => {
          if (!acc[review.card_id]) {
            acc[review.card_id] = []
          }
          acc[review.card_id].push(review)
          return acc
        }, {})

        console.log('Grouped reviews:', reviewsByLoan)
        setLoanReviews(reviewsByLoan)
      } catch (err) {
        console.error('Error in fetchAllReviews:', err)
      }
    }

    fetchAllReviews()
  }, [])

  // Debug log when loanReviews changes
  useEffect(() => {
    console.log('loanReviews state updated:', loanReviews)
  }, [loanReviews])

  // Calculate average rating from reviews
  const getAverageRating = (loanId: string): number | undefined => {
    const reviews = loanReviews[loanId] || []
    if (reviews.length === 0) return undefined
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0)
    const average = sum / reviews.length
    return isNaN(average) ? undefined : Math.round(average * 10) / 10
  }

  const getReviewCount = (loanId: string): number => {
    return loanReviews[loanId]?.length || 0
  }

  const getSentimentColor = (rating: number | undefined): string => {
    if (rating === undefined) return 'text-gray-500'
    if (rating >= 8) return 'text-green-600'
    if (rating >= 6) return 'text-blue-600'
    if (rating >= 4) return 'text-yellow-600'
    return 'text-red-600'
  }

  const sortLoans = (loans: PersonalLoan[]): PersonalLoan[] => {
    if (!sortField) return loans

    return [...loans].sort((a, b) => {
      let compareA: string | number
      let compareB: string | number

      switch (sortField) {
        case 'interestRate':
          compareA = parseFloat(a.interestRate)
          compareB = parseFloat(b.interestRate)
          break
        case 'processingFee':
          compareA = parseFloat(a.processingFee)
          compareB = parseFloat(b.processingFee)
          break
        case 'maxAmount':
          compareA = parseFloat(a.maxAmount.replace(/[^0-9.]/g, ''))
          compareB = parseFloat(b.maxAmount.replace(/[^0-9.]/g, ''))
          break
        case 'sentiment':
          compareA = getAverageRating(a.id) || 0
          compareB = getAverageRating(b.id) || 0
          break
        default:
          return 0
      }

      return sortDirection === 'asc'
        ? String(compareA).localeCompare(String(compareB))
        : String(compareB).localeCompare(String(compareA))
    })
  }

  // Handle sort click
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Sort icon component
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )
    }
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    )
  }

  // Filter and sort personal loans
  const filteredLoans = useMemo(() => {
    const query = searchQuery.toLowerCase()
    const filtered = personalLoans.filter(loan => 
      loan.name.toLowerCase().includes(query) ||
      loan.features.some(feature => feature.toLowerCase().includes(query)) ||
      loan.feedback.some(f => f.comment.toLowerCase().includes(query))
    )
    return sortLoans(filtered)
  }, [searchQuery, sortField, sortDirection])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-[160px] bg-gradient-to-r from-blue-600 to-blue-700" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-10">
            <h1 className="text-4xl font-bold text-white mb-3 font-serif tracking-wide">
              Personal Loans
            </h1>
            
            <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8 font-sans">
              Compare and find the best personal loans tailored to your needs
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative z-10">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by interest rate, processing fee, etc..."
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

          {/* Sort Options - Desktop */}
          <div className="hidden md:flex items-center justify-end gap-4 mb-6">
            <span className="text-sm text-gray-500">Sort by:</span>
            <button
              onClick={() => handleSort('interestRate')}
              className={`text-sm font-medium ${
                sortField === 'interestRate'
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Interest Rate
              {sortField === 'interestRate' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
            <button
              onClick={() => handleSort('processingFee')}
              className={`text-sm font-medium ${
                sortField === 'processingFee'
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Processing Fee
              {sortField === 'processingFee' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
            <button
              onClick={() => handleSort('maxAmount')}
              className={`text-sm font-medium ${
                sortField === 'maxAmount'
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Max Amount
              {sortField === 'maxAmount' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
            <button
              onClick={() => handleSort('sentiment')}
              className={`text-sm font-medium ${
                sortField === 'sentiment'
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              User Rating
              {sortField === 'sentiment' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
          </div>

          {/* Sort Options - Mobile */}
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
              <option value="interestRate">Interest Rate</option>
              <option value="processingFee">Processing Fee</option>
              <option value="maxAmount">Max Amount</option>
              <option value="sentiment">User Rating</option>
            </select>
          </div>

          {/* Loans List */}
          <div className="space-y-8">
            {filteredLoans.map((loan) => (
              <Link
                key={loan.id}
                href={`/loans/personal/${loan.id}`}
                className="block hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex flex-col">
                  {/* Mobile View */}
                  <div className="md:hidden px-4 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-32 h-20 relative flex-shrink-0">
                          <Image
                            src={loan.image}
                            alt={loan.name}
                            fill
                            className="object-contain rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{loan.name}</h3>
                          <p className="text-gray-600 mb-4">{loan.bank}</p>
                          <div className="flex flex-col">
                            {getReviewCount(loan.id) > 0 && getAverageRating(loan.id) ? (
                              <>
                                <div className="flex items-center gap-1">
                                  <span className={`text-3xl font-bold ${getSentimentColor(getAverageRating(loan.id))}`}>
                                    {getAverageRating(loan.id)}
                                  </span>
                                  <div className="flex flex-col items-start justify-center">
                                    <span className="text-gray-500 text-base">/ 10</span>
                                  </div>
                                </div>
                                <div className="text-xs text-blue-600 whitespace-nowrap">
                                  {getReviewCount(loan.id)} reviews
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
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Interest Rate</p>
                          <p className="text-sm font-medium text-gray-900">{loan.interestRate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Processing Fee</p>
                          <p className="text-sm font-medium text-gray-900">{loan.processingFee}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden md:flex items-center p-6">
                    <div className="w-40 h-24 relative flex-shrink-0">
                      <Image
                        src={loan.image}
                        alt={loan.name}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex-1 ml-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {loan.name}
                          </h3>
                          <p className="text-gray-600">{loan.bank}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className={`text-lg font-bold ${getSentimentColor(getAverageRating(loan.id))}`}>
                              {getAverageRating(loan.id) || 'N/A'}
                            </span>
                            <span className="text-gray-500">/ 10</span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {getReviewCount(loan.id)} reviews
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-6 mt-4">
                        <div>
                          <p className="text-sm text-gray-500">Interest Rate</p>
                          <p className="text-lg font-medium text-gray-900">{loan.interestRate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Processing Fee</p>
                          <p className="text-lg font-medium text-gray-900">{loan.processingFee}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Max Amount</p>
                          <p className="text-lg font-medium text-gray-900">{loan.maxAmount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Tenure</p>
                          <p className="text-lg font-medium text-gray-900">{loan.minTenure} - {loan.maxTenure}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 