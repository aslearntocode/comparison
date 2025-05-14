'use client'

import { useState, use, useEffect } from 'react'
import Header from "@/components/Header"
import Link from 'next/link'
import Image from 'next/image'
import { creditCards, type CreditCard, type UserFeedback } from '../../data/creditCards'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { Button } from '../../../components/ui/button'
import { Textarea } from '../../../components/ui/textarea'
import { Input } from '../../../components/ui/input'
import { supabase, type Review } from '@/lib/supabase'
import RewardPointsCard from '@/components/RewardPointsCard'
import CardDiscrepancyNotification from '../../components/CardDiscrepancyNotification'

export default function CreditCardDetail({ params }: { params: Promise<{ cardId: string }> }) {
  const [activeTab, setActiveTab] = useState<
    | 'fees'
    | 'rewards'
    | 'welcome'
    | 'milestone'
    | 'reviews'
  >('fees');
  const [mobileSuitabilityIndex, setMobileSuitabilityIndex] = useState(0);
  
  const { cardId } = use(params)
  const card = creditCards.find(c => c.id === cardId)
  const [user, setUser] = useState<User | null>(null)
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [error, setError] = useState<string | null>(null)
  const [showNotification, setShowNotification] = useState(true)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch reviews when component mounts
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('card_id', cardId)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setReviews(data)
      }
    }

    fetchReviews()
  }, [cardId])

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

  const getAverageRating = (reviews: Review[]): number => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }

  const getSentimentColor = (rating: number): string => {
    if (rating >= 8) return 'text-green-600';
    if (rating >= 6) return 'text-blue-600';
    if (rating >= 4) return 'text-yellow-600';
    return 'text-red-600';
  }

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !card) return;

    if (newReview.rating < 1 || newReview.rating > 10) {
      setError('Rating must be between 1 and 10');
      return;
    }

    if (!newReview.comment.trim()) {
      setError('Please provide a review comment');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const review: Review = {
        user_id: user.uid,
        user_name: user.displayName || 'Anonymous',
        card_id: card.id,
        card_name: card.name,
        rating: newReview.rating,
        comment: newReview.comment.trim(),
      };

      console.log('Submitting review:', review);

      const { data, error: submitError } = await supabase
        .from('reviews')
        .insert([review])
        .select()

      if (submitError) {
        console.error('Supabase error details:', {
          code: submitError.code,
          message: submitError.message,
          details: submitError.details,
          hint: submitError.hint
        });
        throw new Error(submitError.message || 'Error submitting review. Please try again.');
      }

      console.log('Review submitted successfully:', data);

      // Refresh reviews
      const { data: updatedReviews, error: fetchError } = await supabase
        .from('reviews')
        .select('*')
        .eq('card_id', card.id)
        .order('created_at', { ascending: false })

      if (fetchError) {
        console.error('Error fetching updated reviews:', fetchError);
        throw new Error(fetchError.message || 'Error fetching updated reviews');
      }

      if (updatedReviews) {
        console.log('Updated reviews:', updatedReviews);
        setReviews(updatedReviews);
      }

      // Reset form
      setNewReview({
        rating: 0,
        comment: '',
      });

      // Show success message
      alert('Review submitted successfully!');

    } catch (error: any) {
      console.error('Error in handleReviewSubmit:', error);
      setError(error.message || 'An error occurred while submitting your review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'fees':
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Joining and Annual Fees</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">Joining Fee: {card.joiningFee}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">Annual Fee: {card.annualFee}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'rewards':
        return (
          <div className="space-y-6">
            {/* Rewards Section */}
            {card.additionalDetails?.rewardsProgram && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Rewards</h4>
                <ul className="list-disc pl-6 space-y-2">
                  {(() => {
                    const rewards = card.additionalDetails.rewardsProgram;
                    let items: string[] = [];
                    if (rewards.includes('•')) {
                      items = rewards.split('•');
                    } else if (rewards.includes('\n')) {
                      items = rewards.split('\n');
                    } else if (rewards.includes('. ')) {
                      items = rewards.split('. ').map(s => s.endsWith('.') ? s : s + '.');
                    } else {
                      items = [rewards];
                    }
                    return items.map((item, idx) => item.trim() && <li key={"rewards-"+idx}>{item.trim()}</li>);
                  })()}
                </ul>
              </div>
            )}
            {/* Redemption Section */}
            {card.additionalDetails?.redemptionOptions && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Redemption</h4>
                <ul className="list-disc pl-6 space-y-2">
                  {card.additionalDetails.redemptionOptions.split('•').map((item, idx) => (
                    item.trim() && <li key={"redemption-"+idx}>{item.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* Lounge Benefits Section */}
            {(card.additionalDetails?.airportLounge || card.additionalDetails?.additionalServices?.toLowerCase().includes('lounge')) && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Lounge Benefits</h4>
                <ul className="list-disc pl-6 space-y-2">
                  {/* Airport Lounge */}
                  {card.additionalDetails?.airportLounge && card.additionalDetails.airportLounge.split('•').map((item, idx) => (
                    item.trim() && <li key={"lounge-"+idx}>{item.trim()}</li>
                  ))}
                  {/* Railway Lounge in Additional Services */}
                  {card.additionalDetails?.additionalServices && card.additionalDetails.additionalServices.split(/\n|•/).map((item, idx) => (
                    item.toLowerCase().includes('railway lounge') && item.trim() ? <li key={"railway-lounge-"+idx}>{item.trim()}</li> : null
                  ))}
                </ul>
              </div>
            )}
            {/* Fuel Surcharge Waiver Section */}
            {card.additionalDetails?.fuelSurcharge && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Fuel Surcharge Waiver</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fuel Surcharge: {card.additionalDetails.fuelSurcharge}</li>
                </ul>
              </div>
            )}
            {/* Other Ongoing Benefits Section */}
            {(card.additionalDetails?.insuranceCover || card.additionalDetails?.diningPrivileges || card.additionalDetails?.movieBenefits || card.additionalDetails?.emiOptions || card.additionalDetails?.additionalServices) && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Other Ongoing Benefits</h4>
                <ul className="list-disc pl-6 space-y-2">
                  {/* Insurance Cover */}
                  {card.additionalDetails?.insuranceCover && Array.isArray(card.additionalDetails.insuranceCover) && card.additionalDetails.insuranceCover.map((item, idx) => (
                    <li key={"insurance-"+idx}>{item}</li>
                  ))}
                  {/* Dining Privileges */}
                  {card.additionalDetails?.diningPrivileges && Array.isArray(card.additionalDetails.diningPrivileges) && card.additionalDetails.diningPrivileges.map((item, idx) => (
                    <li key={"dining-"+idx}>{item}</li>
                  ))}
                  {/* Movie Benefits */}
                  {card.additionalDetails?.movieBenefits && (() => {
                    const movie = card.additionalDetails.movieBenefits;
                    let items: string[] = [];
                    if (movie.includes('•')) {
                      items = movie.split('•');
                    } else if (movie.includes('\n')) {
                      items = movie.split('\n');
                    } else if (movie.includes('. ')) {
                      items = movie.split('. ').map(s => s.endsWith('.') ? s : s + '.');
                    } else {
                      items = [movie];
                    }
                    return items.map((item, idx) => item.trim() && <li key={"movie-"+idx}>{item.trim()}</li>);
                  })()}
                  {/* EMI Options */}
                  {card.additionalDetails?.emiOptions && (
                    <li>EMI Options: {card.additionalDetails.emiOptions}</li>
                  )}
                  {/* Additional Services (excluding lounge/railway lounge) */}
                  {card.additionalDetails?.additionalServices && card.additionalDetails.additionalServices.split(/\n|•/).map((item, idx) => (
                    item.trim() &&
                    !item.toLowerCase().includes('lounge') &&
                    <li key={"addl-"+idx}>{item.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      case 'welcome':
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Welcome Benefits</h3>
              <div className="space-y-4">
                {card.additionalDetails?.welcomeBonus?.split('\n').map((benefit, index) => {
                  if (benefit.endsWith(':')) {
                    return (
                      <h4 key={index} className="font-medium text-gray-900 mt-4 mb-2">{benefit}</h4>
                    );
                  } else if (benefit.startsWith('•')) {
                    return (
                      <div key={index} className="flex gap-2 ml-4 mb-2">
                        <span className="text-blue-600">•</span>
                        <span className="text-gray-700">{benefit.substring(1).trim()}</span>
                      </div>
                    );
                  } else if (benefit.trim() !== '') {
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
              {card.additionalDetails?.milestoneBenefits?.length ? (
                <ul className="space-y-2 list-disc list-outside pl-4">
                  {card.additionalDetails.milestoneBenefits.map((benefit, index) => (
                    <li key={index} className="text-gray-700">{benefit}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No milestone benefits available</p>
              )}
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                User Reviews
              </h3>

              {/* Review Submission Form */}
              {user ? (
                <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
                  <h4 className="text-lg font-semibold mb-4">Write a Review</h4>
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800">{error}</p>
                    </div>
                  )}
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating (1-10)
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                        required
                        className="w-24"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review
                      </label>
                      <Textarea
                        value={newReview.comment}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                          setNewReview({ ...newReview, comment: e.target.value })
                        }
                        required
                        placeholder="Share your experience with this card..."
                        className="min-h-[100px]"
                      />
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                  <p className="text-yellow-800">
                    Please <Link href="/login" className="text-blue-600 hover:underline">sign in</Link> to write a review.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`text-lg font-bold ${getSentimentColor(review.rating)}`}>
                          {review.rating} / 10
                        </div>
                        <span className="text-gray-600">by {review.user_name}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(review.created_at!).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}

                {reviews.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No reviews yet. Be the first to review this card!
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <CardDiscrepancyNotification cardName={card.name} />
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <Link href="/" className="text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Card Header */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-3 mb-4 md:mb-3">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 md:gap-3">
              <div className="w-32 h-20 md:w-28 md:h-16 relative mx-auto sm:mx-0">
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
                    <p className="text-lg md:text-base text-gray-600 mb-2 md:mb-1">{card.bank}</p>
                    <div className="bg-blue-50 rounded-lg p-3 md:p-2 inline-block">
                      <p className="text-blue-900 font-medium text-base md:text-sm">
                        {card.additionalDetails?.summary}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:text-right">
                    <button 
                      onClick={() => setActiveTab('reviews')}
                      className="group hover:opacity-90 transition-opacity"
                    >
                      {reviews.length > 0 ? (
                        <>
                          <div className="flex items-center justify-center sm:justify-end gap-1">
                            <span className={`text-2xl md:text-xl font-bold ${getSentimentColor(getAverageRating(reviews))}`}>{getAverageRating(reviews)}</span>
                            <div className="flex flex-col items-start justify-center">
                              <span className="text-gray-500 text-base md:text-sm">/ 10</span>
                            </div>
                          </div>
                          <div className="text-xs md:text-xs text-blue-600 group-hover:underline text-center sm:text-right whitespace-nowrap">
                            {reviews.length} reviews
                          </div>
                        </>
                      ) : (
                        <div className="text-sm text-gray-500 whitespace-nowrap">no reviews yet</div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Suitability Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-4 mb-4 md:mb-3">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                Who Should Get This Card?
              </h3>
              {/* Desktop: 3 columns */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-4">
                {/* Who Should Get This Card */}
                <div className="md:col-span-1 flex flex-col h-full">
                  <div className="bg-green-50 rounded-xl p-4 md:p-3 flex flex-col h-full">
                    <h4 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                      <span>✅</span>
                      Who Should Get This Card?
                    </h4>
                    <ul className="space-y-2 flex-1 list-disc list-outside pl-4">
                      {card.additionalDetails?.idealFor?.map((point, idx) => (
                        <li key={idx} className="text-gray-900 text-base md:text-sm">{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Not Ideal For */}
                <div className="md:col-span-1 flex flex-col h-full">
                  <div className="bg-red-50 rounded-xl p-4 md:p-3 flex flex-col h-full">
                    <h4 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                      <span>🚫</span>
                      Not Ideal For
                    </h4>
                    <ul className="space-y-2 flex-1 list-disc list-outside pl-4">
                      {card.additionalDetails?.notIdealFor?.map((point, idx) => (
                        <li key={idx} className="text-red-700 text-base md:text-sm">{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Eligibility Criteria */}
                <div className="md:col-span-1 flex flex-col h-full">
                  <div className="bg-blue-50 rounded-xl p-4 md:p-3 flex flex-col h-full">
                    <h4 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                      <span>📝</span>
                      Eligibility Criteria
                    </h4>
                    <ul className="space-y-2 flex-1 list-disc list-outside pl-4">
                      {card.additionalDetails?.eligibilityCriteria
                        ? card.additionalDetails.eligibilityCriteria.split('\n').map((point, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-sm">{point}</li>
                          ))
                        : (
                          <li className="text-gray-700 text-base md:text-sm">
                            Eligibility criteria for this card are not specified. Please check with the issuing bank for details.
                          </li>
                        )
                      }
                    </ul>
                    <div className="mt-6 flex justify-center">
                      <Link
                        href={`/credit/apply?cardId=${card.id}`}
                        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* Mobile: Carousel for suitability, eligibility below */}
              <div className="md:hidden">
                {/* Carousel */}
                <div className="flex flex-col items-center">
                  {mobileSuitabilityIndex === 0 ? (
                    <div className="w-full bg-green-50 rounded-xl p-4 mb-4">
                      <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                        <span>✅</span>
                        Who Should Get This Card?
                      </h4>
                      <ul className="space-y-2 list-disc list-outside pl-4">
                        {card.additionalDetails?.idealFor?.map((point, idx) => (
                          <li key={idx} className="text-gray-900 text-base">{point}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="w-full bg-red-50 rounded-xl p-4 mb-4">
                      <h4 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                        <span>🚫</span>
                        Not Ideal For
                      </h4>
                      <ul className="space-y-2 list-disc list-outside pl-4">
                        {card.additionalDetails?.notIdealFor?.map((point, idx) => (
                          <li key={idx} className="text-red-700 text-base">{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex justify-center gap-4 mb-4">
                    <button
                      className={`px-3 py-1 rounded-full border ${mobileSuitabilityIndex === 0 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                      onClick={() => setMobileSuitabilityIndex(0)}
                      aria-label="Show Who Should Get This Card"
                    >
                      1
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full border ${mobileSuitabilityIndex === 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                      onClick={() => setMobileSuitabilityIndex(1)}
                      aria-label="Show Not Ideal For"
                    >
                      2
                    </button>
                  </div>
                </div>
                {/* Eligibility Criteria always below */}
                <div className="w-full bg-blue-50 rounded-xl p-4 flex flex-col">
                  <h4 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <span>📝</span>
                    Eligibility Criteria
                  </h4>
                  <ul className="space-y-2 list-disc list-outside pl-4">
                    {card.additionalDetails?.eligibilityCriteria
                      ? card.additionalDetails.eligibilityCriteria.split('\n').map((point, idx) => (
                          <li key={idx} className="text-gray-700 text-base">{point}</li>
                        ))
                      : (
                        <li className="text-gray-700 text-base">
                          Eligibility criteria for this card are not specified. Please check with the issuing bank for details.
                        </li>
                      )
                    }
                  </ul>
                  <div className="mt-6 flex justify-center">
                    <Link
                      href={`/credit/apply?cardId=${card.id}`}
                      className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
                    >
                      Apply Now
                    </Link>
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
                  onClick={() => setActiveTab('fees')}
                  className={`flex-1 py-3 md:py-2 px-4 md:px-3 text-sm md:text-base font-medium text-center whitespace-nowrap ${
                    activeTab === 'fees'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Joining and Annual Fees
                </button>
                <button
                  onClick={() => setActiveTab('rewards')}
                  className={`flex-1 py-3 md:py-2 px-4 md:px-3 text-sm md:text-base font-medium text-center whitespace-nowrap ${
                    activeTab === 'rewards'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reward Points and Redemption
                </button>
                <button
                  onClick={() => setActiveTab('welcome')}
                  className={`flex-1 py-3 md:py-2 px-4 md:px-3 text-sm md:text-base font-medium text-center whitespace-nowrap ${
                    activeTab === 'welcome'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Welcome Benefits
                </button>
                <button
                  onClick={() => setActiveTab('milestone')}
                  className={`flex-1 py-3 md:py-2 px-4 md:px-3 text-sm md:text-base font-medium text-center whitespace-nowrap ${
                    activeTab === 'milestone'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Milestone Benefits
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 py-3 md:py-2 px-4 md:px-3 text-sm md:text-base font-medium text-center whitespace-nowrap ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reviews ({reviews.length > 0 ? reviews.length : 'no'})
                </button>
              </div>
            </div>

            <div className="p-6 md:p-4">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 