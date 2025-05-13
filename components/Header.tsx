'use client'

import { useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { User } from "firebase/auth"
import { ProfileDropdown } from "./ProfileDropdown"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { signOut } from 'firebase/auth'

// Initialize Supabase client
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasRecommendationAccess, setHasRecommendationAccess] = useState(false)
  const [hasStockAccess, setHasStockAccess] = useState(false)
  const [isInvestmentDropdownOpen, setIsInvestmentDropdownOpen] = useState(false)
  const [isCreditDropdownOpen, setIsCreditDropdownOpen] = useState(false)
  const [isComplaintsDropdownOpen, setIsComplaintsDropdownOpen] = useState(false)
  const [isCreditScoreDropdownOpen, setIsCreditScoreDropdownOpen] = useState(false)
  const [hasCreditReport, setHasCreditReport] = useState(false)
  const [hasDisputes, setHasDisputes] = useState(false)
  const [hasCreditAssessment, setHasCreditAssessment] = useState(false)
  const [latestAssessment, setLatestAssessment] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user)
      if (user?.uid) {
        try {
          // Check for mutual fund recommendations
          const { data: mfData, error: mfError } = await supabase
            .from('mutual_fund_recommendations')
            .select('id')
            .eq('user_id', user.uid)
            .limit(1)

          // Only log error if it's not a "no data found" error
          if (mfError && mfError.code !== 'PGRST116') {
            console.error('Error checking MF access:', {
              code: mfError.code,
              message: mfError.message,
              details: mfError.details
            })
          }

          setHasRecommendationAccess(Boolean(mfData?.length))

          // Check for stock recommendations - aligned with MF check
          const { data: stockData, error: stockError } = await supabaseClient
            .from('stock_recommendations')
            .select('id')
            .eq('user_id', user.uid)
            .order('created_at', { ascending: false })
            .limit(1)

          if (stockError) {
            console.error('Error checking stock access:', stockError)
          }
          setHasStockAccess(Boolean(stockData?.length))

          // First check for credit report
          const { data: creditData, error: creditError } = await supabaseClient
            .from('credit_reports')
            .select('id')
            .eq('user_id', user.uid)
            .order('created_at', { ascending: false })
            .limit(1)

          if (creditError) {
            console.error('Error checking credit access:', creditError)
          }
          setHasCreditReport(Boolean(creditData?.length))

          // Check if user has any disputes in the disputes table
          const { data: disputeData, error: disputeError } = await supabaseClient
            .from('disputes')
            .select('id')
            .eq('user_id', user.uid)
            .limit(1)

          if (disputeError) {
            console.error('Error checking disputes:', disputeError)
          }
          // Only show disputes link if user has submitted disputes before
          setHasDisputes(Boolean(disputeData?.length))

          // Check for credit assessment
          const { data: assessmentData, error: assessmentError } = await supabase
            .from('credit_assessments')
            .select('*')
            .eq('user_id', user.uid)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          if (assessmentError) {
            if (assessmentError.code !== 'PGRST116') {
              console.error('Error checking credit assessment:', assessmentError);
            }
          } else {
            setHasCreditAssessment(true);
            setLatestAssessment(assessmentData);
          }

        } catch (error) {
          // Handle unexpected errors
          console.error('Unexpected error checking recommendations:', error)
          setHasRecommendationAccess(false)
        }
      } else {
        // Reset all states when user is not logged in
        setHasRecommendationAccess(false)
        setHasStockAccess(false)
        setHasCreditReport(false)
        setHasDisputes(false)
        setHasCreditAssessment(false)
        setLatestAssessment(null)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Check if the click was outside the dropdown button and menu
      if (!target.closest('button')?.contains(target) && !target.closest('.complaints-menu')?.contains(target)) {
        setIsComplaintsDropdownOpen(false);
      }
    };

    // Add event listener when the dropdown is open
    if (isComplaintsDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isComplaintsDropdownOpen]);

  const handleMutualFundsDashboard = async (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('MF Dashboard clicked')

    if (!user) {
      console.log('No user, redirecting to login')
      router.push('/login')
      return
    }

    try {
      // Get the latest recommendation from Supabase
      const { data, error } = await supabase
        .from('mutual_fund_recommendations')
        .select('*')
        .eq('user_id', user.uid)
        .order('created_at', { ascending: false })
        .limit(1)

      console.log('Latest MF recommendation query result:', { data, error })

      if (error) throw error

      if (data && data.length > 0) {
        const latestRec = data[0]
        console.log('Found MF recommendation:', latestRec)
        // Remove localStorage.setItem and just redirect with the ID
        router.push(`/recommendations/mutual-funds?id=${latestRec.id}`)
      } else {
        console.log('No MF recommendations found')
        router.push('/investment')
      }
    } catch (error) {
      console.error('Error fetching MF recommendations:', error)
      router.push('/investment')
    }
  }

  const handleStocksDashboard = async (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('Stocks Dashboard clicked')

    if (!user) {
      console.log('No user, redirecting to login')
      router.push('/login')
      return
    }

    try {
      const { data, error } = await supabase
        .from('stock_recommendations')
        .select('*')
        .eq('user_id', user.uid)
        .order('created_at', { ascending: false })
        .limit(1)

      console.log('Latest stock recommendation query result:', { data, error })

      if (error) throw error

      if (data && data.length > 0) {
        const latestRec = data[0]
        console.log('Found stock recommendation:', latestRec)
        router.push(`/recommendations/stocks?id=${latestRec.id}`)
      } else {
        console.log('No stock recommendations found')
        router.push('/investment')
      }
    } catch (error) {
      console.error('Error fetching stock recommendations:', error)
      router.push('/investment')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Stocks Dashboard', href: '/stocks-dashboard' },
    { name: 'Existing Portfolio Tracker', href: '/investment/portfolio-tracker' }
  ]

  return (
    <header className="bg-white w-full overflow-x-hidden border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-2">
        <div className="flex justify-between h-16 items-center w-full">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/Logo_Final3.jpeg" 
                alt="Brand Logo" 
                height={144} 
                width={144} 
                className="h-16 w-auto" 
                priority
              />
            </Link>
            
            <div className="hidden md:flex items-center space-x-8 ml-8">
              <Link href="/" className="text-black hover:text-gray-700 py-2 text-base">
                Home
              </Link>
              <div className="relative" style={{ zIndex: 50 }}>
                <div className="flex items-center">
                  <button 
                    onClick={() => setIsCreditDropdownOpen(!isCreditDropdownOpen)}
                    className="text-black hover:text-gray-700 py-2 text-base"
                  >
                    Credit Card Categories
                    <svg
                      className={`ml-2 h-5 w-5 transform inline-block ${isCreditDropdownOpen ? 'rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div 
                  className={`
                    fixed w-64 bg-white rounded-lg shadow-lg py-2
                    ${isCreditDropdownOpen ? 'block' : 'hidden'}
                  `}
                  style={{
                    zIndex: 1000,
                    top: '4rem',
                    left: '28rem'
                  }}
                >
                  <Link 
                    href="/credit" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">All</span>
                  </Link>
                  <Link 
                    href="/credit?category=ultra-premium" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">Ultra Premium</span>
                  </Link>
                  <Link 
                    href="/credit?category=premium" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">Premium</span>
                  </Link>
                  {/* <Link 
                    href="/credit?category=rewards" 
                    className="flex items-center px-4 py-3 text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">Rewards</span>
                  </Link> */}
                  <Link 
                    href="/credit?category=cashback" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">Cash Back</span>
                  </Link>
                  <Link 
                    href="/credit?category=lifestyle" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">Lifestyle</span>
                  </Link>
                  <Link 
                    href="/credit?category=fuel" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">Fuel</span>
                  </Link>
                  <Link 
                    href="/credit?category=lifetime-free" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">Lifetime Free</span>
                  </Link>
                  {/* <Link 
                    href="/credit?category=forex" 
                    className="flex items-center px-4 py-3 text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">Forex</span>
                  </Link> */}
                  <Link 
                    href="/credit?category=upi" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">UPI</span>
                  </Link>
                  {/* <Link 
                    href="/credit?category=emi" 
                    className="flex items-center px-4 py-3 text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">EMI</span>
                  </Link> */}
                  <Link 
                    href="/credit?category=domestic-lounge" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">Domestic Lounge</span>
                  </Link>
                  <Link 
                    href="/credit?category=international-lounge" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">International Lounge</span>
                  </Link>
                  <Link 
                    href="/credit?category=fintech" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">Fintech</span>
                  </Link>
                  <Link 
                    href="/credit?category=airlines"
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">Airlines</span>
                  </Link>
                  <Link 
                    href="/credit?category=hotels" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">Hotels</span>
                  </Link>
                  <Link 
                    href="/credit?category=secured" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">Secured Credit Card</span>
                  </Link>
                </div>
              </div>
              {/* Commenting out Investments section
              <div className="relative" style={{ zIndex: 50 }}>
                <div className="flex items-center">
                  <button 
                    onClick={() => setIsInvestmentDropdownOpen(!isInvestmentDropdownOpen)}
                    className="text-black hover:text-gray-700 py-2 text-lg mr-1"
                  >
                    Investments
                  </button>
                  <button 
                    onClick={() => setIsInvestmentDropdownOpen(!isInvestmentDropdownOpen)}
                    className="p-1"
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className={`transition-transform duration-200 ${isInvestmentDropdownOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div 
                  className={`
                    fixed w-64 bg-white rounded-lg shadow-lg py-2
                    ${isInvestmentDropdownOpen ? 'block' : 'hidden'}
                  `}
                  style={{
                    zIndex: 1000,
                    top: '4rem',
                    left: '36rem'
                  }}
                >
                  <Link 
                    href="/investment" 
                    className="flex items-center px-4 py-3 text-black hover:bg-gray-50"
                  >
                    <span className="text-base">Investment Allocation</span>
                  </Link>
                  {Boolean(user) && Boolean(hasRecommendationAccess) && (
                    <button
                      onClick={handleMutualFundsDashboard}
                      className="w-full flex items-center px-4 py-3 text-black hover:bg-gray-50"
                    >
                      <span className="text-base">MF Dashboard</span>
                    </button>
                  )}
                  {Boolean(user) && Boolean(hasStockAccess) && (
                    <button
                      onClick={handleStocksDashboard}
                      className="w-full flex items-center px-4 py-3 text-black hover:bg-gray-50"
                    >
                      <span className="text-base">Stocks Dashboard</span>
                    </button>
                  )}
                  {Boolean(user) && (
                    <Link 
                      href="/investment/portfolio-tracker" 
                      className="flex items-center px-4 py-3 text-black hover:bg-gray-50"
                    >
                      <span className="text-base">Existing Portfolio Tracker</span>
                    </Link>
                  )}
                </div>
              </div>
              */}

              <div className="relative" style={{ zIndex: 50 }}>
                <div className="flex items-center">
                  <button 
                    onClick={() => setIsCreditScoreDropdownOpen(!isCreditScoreDropdownOpen)}
                    className="text-black hover:text-gray-700 py-2 text-base flex items-center"
                  >
                    Credit
                    <svg
                      className={`ml-2 h-5 w-5 transform inline-block ${isCreditScoreDropdownOpen ? 'rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div 
                  className={`
                    fixed w-48 bg-white rounded-lg shadow-lg py-2
                    ${isCreditScoreDropdownOpen ? 'block' : 'hidden'}
                  `}
                  style={{
                    zIndex: 1000,
                    top: '4rem',
                    left: '36rem'
                  }}
                >
                  {!hasCreditReport && (
                    <Link 
                      href="/credit-score" 
                      className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                      onClick={() => setIsCreditScoreDropdownOpen(false)}
                    >
                      <span className="ml-3">Check Credit Score (Coming Soon)</span>
                    </Link>
                  )}
                  {hasCreditReport && (
                    <Link 
                      href="/credit-score/report" 
                      className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                      onClick={() => setIsCreditScoreDropdownOpen(false)}
                    >
                      <span className="ml-3">View Credit Report</span>
                    </Link>
                  )}
                  {hasCreditAssessment ? (
                    <Link 
                      href="/credit-vs-loan-assessment?view=true" 
                      className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                      onClick={() => setIsCreditScoreDropdownOpen(false)}
                    >
                      <div className="ml-3">
                        <span className="block">View Assessment</span>
                        {latestAssessment && (
                          <span className="text-xs text-gray-500">
                            Last updated: {new Date(latestAssessment.created_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </Link>
                  ) : (
                    <Link 
                      href="/credit-vs-loan-assessment" 
                      className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                      onClick={() => setIsCreditScoreDropdownOpen(false)}
                    >
                      <span className="ml-3">Credit Assessment</span>
                    </Link>
                  )}
                </div>
              </div>

              <div className="relative" style={{ zIndex: 50 }}>
                <div className="flex items-center">
                  <button 
                    onClick={() => setIsComplaintsDropdownOpen(!isComplaintsDropdownOpen)}
                    className="text-black hover:text-gray-700 py-2 text-base flex items-center"
                  >
                    Resolve Complaints
                    <svg
                      className={`ml-2 h-5 w-5 transform inline-block ${isComplaintsDropdownOpen ? 'rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div 
                  className={`
                    fixed w-64 bg-white rounded-lg shadow-lg py-2
                    ${isComplaintsDropdownOpen ? 'block' : 'hidden'}
                  `}
                  style={{
                    zIndex: 1000,
                    top: '4rem',
                    left: '46rem'
                  }}
                >
                  <Link 
                    href="/resolve-complaints" 
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsComplaintsDropdownOpen(false)}
                  >
                    Register New Complaint
                  </Link>
                  <Link 
                    href="/track-complaints" 
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsComplaintsDropdownOpen(false)}
                  >
                    Track Complaint Status
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {user.displayName || user.email}
                  <svg
                    className={`ml-2 -mr-0.5 h-4 w-4 transition-transform duration-200 ${
                      isMenuOpen ? 'rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isMenuOpen && (
                  <div className="relative">
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0"
                      onClick={() => setIsMenuOpen(false)}
                      style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        zIndex: 998 
                      }}
                    />
                    
                    {/* Dropdown menu */}
                    <div
                      className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                      style={{ 
                        zIndex: 999,
                        position: 'fixed',
                        top: '4rem',
                        right: '1rem'
                      }}
                    >
                      <div className="py-1">
                        <Link
                          href="/my-reviews"
                          className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <svg 
                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                          My Reviews
                        </Link>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setIsMenuOpen(false)
                            handleLogout()
                          }}
                          className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <svg 
                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                            />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="text-black hover:text-gray-700 whitespace-nowrap">
                <Button variant="ghost" className="text-sm">
                  Log in
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="md:hidden py-2 w-full bg-white fixed bottom-0 left-0 border-t border-gray-200 shadow-lg" style={{ position: 'fixed', bottom: 0, zIndex: 9999 }}>
          <div className="flex justify-around items-center px-1 pb-6">
            <Link href="/" className="text-black hover:text-gray-700 flex flex-col items-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs mt-1">Home</span>
            </Link>

            <div className="relative">
              <button 
                onClick={() => setIsCreditDropdownOpen(!isCreditDropdownOpen)}
                className="text-black hover:text-gray-700 flex flex-col items-center"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-xs mt-1">Credit Cards</span>
              </button>

              {isCreditDropdownOpen && (
                <div className="absolute bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg py-2" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                  <Link 
                    href="/credit" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    <span className="ml-3">All</span>
                  </Link>
                  <Link 
                    href="/credit?category=ultra-premium" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    Ultra Premium
                  </Link>
                  <Link 
                    href="/credit?category=premium" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    Premium
                  </Link>
                  {/* <Link 
                    href="/credit?category=rewards" 
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    Rewards
                  </Link> */}
                  <Link 
                    href="/credit?category=cashback" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    Cash Back
                  </Link>
                  <Link 
                    href="/credit?category=lifestyle" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    Lifestyle
                  </Link>
                  <Link 
                    href="/credit?category=fuel" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    Fuel
                  </Link>
                  <Link 
                    href="/credit?category=lifetime-free" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    Lifetime Free
                  </Link>
                  {/* <Link 
                    href="/credit?category=forex" 
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    Forex
                  </Link> */}
                  <Link 
                    href="/credit?category=upi" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    UPI
                  </Link>
                  {/* <Link 
                    href="/credit?category=emi" 
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    EMI
                  </Link> */}
                  <Link 
                    href="/credit?category=domestic-lounge" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    Domestic Lounge
                  </Link>
                  <Link 
                    href="/credit?category=international-lounge" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    International Lounge
                  </Link>
                  <Link 
                    href="/credit?category=fintech" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    Fintech
                  </Link>
                  <Link 
                    href="/credit?category=airlines" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    Airlines
                  </Link>
                  <Link 
                    href="/credit?category=hotels" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    Hotels
                  </Link>
                  <Link 
                    href="/credit?category=secured" 
                    className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsCreditDropdownOpen(false)}
                  >
                    Secured Credit Card
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsCreditScoreDropdownOpen(!isCreditScoreDropdownOpen)}
                className="text-black hover:text-gray-700 flex flex-col items-center"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-xs mt-1">Credit</span>
              </button>

              {isCreditScoreDropdownOpen && (
                <div className="absolute bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg py-2" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                  {!hasCreditReport && (
                    <Link 
                      href="/credit-score" 
                      className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                      onClick={() => setIsCreditScoreDropdownOpen(false)}
                    >
                      <span className="ml-3">Check Credit Score (Coming Soon)</span>
                    </Link>
                  )}
                  {hasCreditReport && (
                    <Link 
                      href="/credit-score/report" 
                      className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                      onClick={() => setIsCreditScoreDropdownOpen(false)}
                    >
                      <span className="ml-3">View Credit Report</span>
                    </Link>
                  )}
                  {hasCreditAssessment ? (
                    <Link 
                      href="/credit-vs-loan-assessment?view=true" 
                      className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                      onClick={() => setIsCreditScoreDropdownOpen(false)}
                    >
                      <div className="ml-3">
                        <span className="block">View Assessment</span>
                        {latestAssessment && (
                          <span className="text-xs text-gray-500">
                            Last updated: {new Date(latestAssessment.created_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </Link>
                  ) : (
                    <Link 
                      href="/credit-vs-loan-assessment" 
                      className="flex items-center px-4 py-3 text-sm text-black hover:bg-gray-50"
                      onClick={() => setIsCreditScoreDropdownOpen(false)}
                    >
                      <span className="ml-3">Credit Assessment</span>
                    </Link>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsComplaintsDropdownOpen(!isComplaintsDropdownOpen)}
                className="text-black hover:text-gray-700 flex flex-col items-center"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs mt-1">Complaints</span>
              </button>

              {isComplaintsDropdownOpen && (
                <div className="absolute bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg py-2" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                  <Link 
                    href="/resolve-complaints" 
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsComplaintsDropdownOpen(false)}
                  >
                    Register New Complaint
                  </Link>
                  <Link 
                    href="/track-complaints" 
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-50"
                    onClick={() => setIsComplaintsDropdownOpen(false)}
                  >
                    Track Complaint Status
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Sub-header Section */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">Featured Cards</span>
            <div className="flex-1 ml-8 relative overflow-hidden">
              <div className="flex space-x-16 animate-carousel">
                <Link 
                  href="/credit/icici-times-black" 
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200 px-4"
                >
                  <Image 
                    src="/credit-cards/ICICI-Black.png" 
                    alt="ICICI Time Black" 
                    width={40} 
                    height={25} 
                    className="object-contain"
                  />
                  <span className="text-base text-blue-600 whitespace-nowrap">ICICI Times Black</span>
                </Link>
                <Link 
                  href="/credit/idfc-mayura-metal" 
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200 px-4"
                >
                  <Image 
                    src="/credit-cards/IDFC-First-Maurya.png" 
                    alt="IDFC FIRST Mayura" 
                    width={40} 
                    height={25} 
                    className="object-contain"
                  />
                  <span className="text-base text-blue-600 whitespace-nowrap">IDFC FIRST Mayura</span>
                </Link>
                <Link 
                  href="/credit/kiwi" 
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200 px-4"
                >
                  <Image 
                    src="/credit-cards/Kiwi.png" 
                    alt="Kiwi Credit Card" 
                    width={40} 
                    height={25} 
                    className="object-contain"
                  />
                  <span className="text-base text-blue-600 whitespace-nowrap">Kiwi Credit Card</span>
                </Link>
                {/* Duplicate links for seamless carousel */}
                <Link 
                  href="/credit/icici-times-black" 
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200 px-4"
                >
                  <Image 
                    src="/credit-cards/ICICI-Black.png" 
                    alt="ICICI Time Black" 
                    width={40} 
                    height={25} 
                    className="object-contain"
                  />
                  <span className="text-base text-blue-600 whitespace-nowrap">ICICI Times Black</span>
                </Link>
                <Link 
                  href="/credit/idfc-mayura-metal" 
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200 px-4"
                >
                  <Image 
                    src="/credit-cards/IDFC-First-Maurya.png" 
                    alt="IDFC FIRST Mayura" 
                    width={40} 
                    height={25} 
                    className="object-contain"
                  />
                  <span className="text-base text-blue-600 whitespace-nowrap">IDFC FIRST Mayura</span>
                </Link>
                <Link 
                  href="/credit/kiwi" 
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200 px-4"
                >
                  <Image 
                    src="/credit-cards/Kiwi.png" 
                    alt="Kiwi Credit Card" 
                    width={40} 
                    height={25} 
                    className="object-contain"
                  />
                  <span className="text-base text-blue-600 whitespace-nowrap">Kiwi Credit Card</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-carousel {
          animation: carousel 30s linear infinite;
        }
        .animate-carousel:hover {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .animate-carousel {
            animation: carousel 10s linear infinite;
          }
        }
      `}</style>
    </header>
  )
} 