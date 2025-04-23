'use client'

import { useState, use, useEffect } from 'react'
import Header from "@/components/Header"
import Link from 'next/link'
import Image from 'next/image'
import { personalLoans, type PersonalLoan, type UserFeedback } from '@/app/data/personalLoans'
import { supabase, type Review } from '@/lib/supabase'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { Input } from '@/components/ui/input'

export default function PersonalLoanDetail({ params }: { params: Promise<{ loanId: string }> }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'documents' | 'reviews'>('overview')
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  
  const { loanId } = use(params)
  const loan = personalLoans.find(l => l.id === loanId)
  
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
        .eq('card_id', loanId)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setReviews(data)
      }
    }

    fetchReviews()
  }, [loanId])
  
  if (!loan) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Loan Not Found</h2>
            <Link href="/loans/personal" className="text-blue-600 hover:text-blue-800">
              Back to Personal Loans
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

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !loan) return;

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
        card_id: loan.id,
        card_name: loan.name,
        rating: newReview.rating,
        comment: newReview.comment.trim(),
      };

      const { data, error: submitError } = await supabase
        .from('reviews')
        .insert([review])
        .select()

      if (submitError) {
        throw new Error(submitError.message || 'Error submitting review. Please try again.');
      }

      // Refresh reviews
      const { data: updatedReviews, error: fetchError } = await supabase
        .from('reviews')
        .select('*')
        .eq('card_id', loan.id)
        .order('created_at', { ascending: false })

      if (fetchError) {
        throw new Error(fetchError.message || 'Error fetching updated reviews');
      }

      if (updatedReviews) {
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
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Loan Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Loan Amount Range</h4>
                  <p className="text-gray-600">₹{loan.minAmount} - {loan.maxAmount}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tenure Range</h4>
                  <p className="text-gray-600">{loan.minTenure} - {loan.maxTenure}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Prepayment Charges</h4>
                  <p className="text-gray-600">{loan.additionalDetails?.prepaymentCharges}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Foreclosure Charges</h4>
                  <p className="text-gray-600">{loan.additionalDetails?.foreclosureCharges}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Disbursal Time</h4>
                  <p className="text-gray-600">{loan.additionalDetails?.disbursalTime}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
              <div className="flex flex-wrap gap-3">
                {loan.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ideal For Column - Takes 2/3 of space */}
              <div className="md:col-span-1">
                <div className="bg-green-50 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                    <span>✨</span>
                    Ideal For
                  </h4>
                  <div className="space-y-4">
                    {loan.additionalDetails?.idealFor?.map((profile, index) => {
                      const [title, description] = profile.split(': ');
                      return (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-xl">✨</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 text-lg">{title}</span>
                            <p className="text-gray-700 mt-1">{description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Not Ideal For Column - Takes 1/3 of space */}
              <div className="md:col-span-1">
                <div className="bg-red-50 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                    <span>🚫</span>
                    Not Ideal For
                  </h4>
                  <ul className="space-y-3">
                    {loan.additionalDetails?.notIdealFor?.map((item, index) => (
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
        );
      case 'eligibility':
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Eligibility Criteria</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Income Requirement</h4>
                  <p className="text-gray-600">{loan.additionalDetails?.eligibility?.minIncome}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Age</h4>
                  <p className="text-gray-600">{loan.additionalDetails?.eligibility?.minAge} - {loan.additionalDetails?.eligibility?.maxAge}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Employment Type</h4>
                  <p className="text-gray-600">{loan.additionalDetails?.eligibility?.employmentType?.join(', ')}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Credit Score</h4>
                  <p className="text-gray-600">{loan.additionalDetails?.eligibility?.creditScore}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {loan.additionalDetails?.requiredDocuments?.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
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
                        Comment
                      </label>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-gray-600">Please sign in to write a review</p>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-6">
                {loan.feedback.map((review, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`text-lg font-bold ${getSentimentColor(review.rating)}`}>
                        {review.rating} / 10
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-[160px] bg-gradient-to-r from-blue-600 to-blue-700" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="pt-10 mb-4">
            <Link href="/loans/personal" className="text-white/80 hover:text-white flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Personal Loans
            </Link>
          </div>

          {/* Loan Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-8">
              <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-700">
                  {loan.bank.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{loan.name}</h1>
                    <p className="text-xl text-gray-600 mb-4">{loan.bank}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-3xl font-bold ${getSentimentColor(getAverageRating(loan.feedback))}`}>
                        {getAverageRating(loan.feedback)}
                      </span>
                      <span className="text-gray-500">/ 10</span>
                    </div>
                    <p className="text-sm text-gray-500">{loan.feedback.length} reviews</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Interest Rate</p>
                    <p className="text-lg font-semibold text-gray-900">{loan.interestRate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Processing Fee</p>
                    <p className="text-lg font-semibold text-gray-900">{loan.processingFee}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'overview'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('eligibility')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'eligibility'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Eligibility
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'documents'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Documents
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'reviews'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reviews
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