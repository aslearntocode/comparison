'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { User } from "firebase/auth"
import { ProfileDropdown } from "@/components/ProfileDropdown"
import Testimonials from "@/components/Testimonials"
import Header from "@/components/Header"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { PieChart } from "@/components/PieChart"
import { supabase } from '@/lib/supabase'
import LearningCenterPreview from '@/components/LearningCenterPreview'
import CreditCardVsLoanComparison from '@/components/CreditCardVsLoanComparison'

interface AllocationItem {
  name: string;
  value: number;
}

interface CreditCardSlide {
  type: 'credit-cards';
  images: string[];
}

interface PersonalLoanSlide {
  type: 'personal-loan';
  sampleLoan: {
    bankName: string;
    interestRate: string;
    loanAmount: string;
    tenure: string;
    emi: string;
    processingFee: string;
  };
}

type SlideData = CreditCardSlide | PersonalLoanSlide;

export default function Home() {
  const [activeSection, setActiveSection] = useState('distribution') // 'distribution' or 'offer'
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [proTipPosition, setProTipPosition] = useState(100)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatForm, setChatForm] = useState({
    name: '',
    message: ''
  })
  const [user, setUser] = useState<any>(null)
  const [latestReport, setLatestReport] = useState<null | {
    date: string;
    type: string;
    score?: number;
    openAccounts?: number;
    closedAccounts?: number;
    totalCreditLimit?: string;
    report_analysis?: any;
  }>(null)
  const [latestAllocation, setLatestAllocation] = useState(null)
  const [reportData, setReportData] = useState<any>(null)
  const [activeCard, setActiveCard] = useState<'investment' | 'credit'>('investment')
  const [touchStartTime, setTouchStartTime] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchStartY, setTouchStartY] = useState(0)
  const [lastTouchTime, setLastTouchTime] = useState(0)
  const TOUCH_DELAY = 500 // Minimum time between touches in milliseconds
  const TOUCH_THRESHOLD = 10 // Pixel threshold to determine if it's a tap or scroll
  const [activeServiceCard, setActiveServiceCard] = useState('credit') // Add this new state
  const [isMobile, setIsMobile] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      initial: 'R',
      name: 'Rahul Sharma',
      role: 'Software Engineer',
      color: 'bg-blue-600',
      text: 'This platform helped me diversify my investment portfolio perfectly. The AI-driven recommendations aligned well with my risk tolerance and retirement goals.'
    },
    {
      initial: 'P',
      name: 'Priya Patel',
      role: 'Business Owner',
      color: 'bg-purple-600',
      text: 'As a busy entrepreneur, I needed guidance on balancing my investments. This tool provided clear, actionable advice that helped me achieve a 15% better return on my portfolio.'
    },
    {
      initial: 'A',
      name: 'Amit Kumar',
      role: 'Medical Professional',
      color: 'bg-green-600',
      text: 'The personalized investment strategy considered my age, goals, and risk appetite. It\'s been 6 months, and my portfolio is much more balanced than before.'
    },
    {
      initial: 'N',
      name: 'Neha Gupta',
      role: 'Financial Analyst',
      color: 'bg-red-600',
      text: 'The portfolio rebalancing suggestions are spot-on. I\'ve recommended this tool to many of my clients for its accurate and personalized approach.'
    },
    {
      initial: 'S',
      name: 'Suresh Reddy',
      role: 'Retired Professional',
      color: 'bg-yellow-600',
      text: 'The retirement planning features gave me confidence in my financial future. The recommendations were practical and easy to implement.'
    }
  ]

  // Update the slider data with type annotation
  const sliderData: SlideData[] = [
    {
      type: 'credit-cards',
      images: [
        '/Credit-card-1.png',
        '/Credit-card-2.png',
        '/Credit-card-3.png'
      ]
    },
    {
      type: 'personal-loan',
      sampleLoan: {
        bankName: 'XXX Bank',
        interestRate: '10.75% p.a.',
        loanAmount: '₹5,00,000',
        tenure: '36 months',
        emi: '₹16,289',
        processingFee: '1%'
      }
    }
  ]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialIndex((current) => 
        current === testimonials.length - 3 ? 0 : current + 1
      )
    }, 5000) // Rotate every 5 seconds

    return () => clearInterval(timer)
  }, [testimonials.length])

  useEffect(() => {
    const animateProTip = () => {
      setProTipPosition((prev) => {
        if (prev <= -100) {
          // When message exits screen, reset to start position
          return 100
        }
        // Increase speed by 20% (from -0.06 to -0.072)
        return prev - 0.072
      })
    }

    // Decrease interval by 20% (from 40 to 32) for faster animation
    const animation = setInterval(animateProTip, 32)
    return () => clearInterval(animation)
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user)
      if (user) {
        // Fetch latest credit report from Supabase
        const supabase = createClientComponentClient()
        const { data, error } = await supabase
          .from('credit_reports')
          .select('created_at, report_analysis')
          .eq('user_id', user.uid)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (data) {
          try {
            // Parse the report_analysis if it's a string
            const reportAnalysis = typeof data.report_analysis === 'string' 
              ? JSON.parse(data.report_analysis) 
              : data.report_analysis

            const score = reportAnalysis?.first_block?.score_value || reportAnalysis?.score_details?.score || 0
            
            // Fix: Properly format the date from Supabase
            const formattedDate = new Date(data.created_at).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })
            
            const report = {
              date: formattedDate, // Use the formatted date
              type: 'Credit Analysis',
              score: parseInt(score)
            }
            setLatestReport(report)
          } catch (parseError) {
            console.error("Error parsing report data:", parseError)
            setLatestReport(null)
          }
        } else {
          setLatestReport(null)
        }
      } else {
        setLatestReport(null)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const fetchAllocation = async () => {
      if (user) {
        const supabase = createClientComponentClient()
        const { data, error } = await supabase
          .from('investment_records')
          .select('allocation')
          .eq('user_id', user.uid)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (!error && data?.allocation) {
          setLatestAllocation(data.allocation);
        }
      }
    };

    fetchAllocation();
  }, [user]);

  useEffect(() => {
    const fetchReport = async () => {
      if (user) {  // Only fetch if user is logged in
        const { data: reports } = await supabase
          .from('credit_reports')
          .select('*')
          .eq('user_id', user.uid)  // Filter by user_id
          .order('created_at', { ascending: false })
          .limit(1);

        if (reports && reports[0]) {
          // Format the date from created_at
          const formattedDate = new Date(reports[0].created_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });

          // Parse the report_analysis JSON if it's stored as a string
          const parsedReport = {
            ...reports[0],
            report_analysis: typeof reports[0].report_analysis === 'string' 
              ? JSON.parse(reports[0].report_analysis)
              : reports[0].report_analysis,
            formattedDate // Add the formatted date to the parsed report
          };
          setReportData(parsedReport);
        }
      }
    };

    fetchReport();
  }, [user]); // Add user to dependency array

  // Debug log for render
  console.log("Render state:", { user: !!user, latestReport })

  // Add slider effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length)
    }, 5000) // Change slides every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add country code (+91 for India) and remove any spaces or special characters
    const phoneNumber = "919321314553" // Added 91 prefix for India
    const whatsappMessage = encodeURIComponent(`Name: ${chatForm.name}\nMessage: ${chatForm.message}`)
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank')
    setIsChatOpen(false) // Close the popup after sending
    setChatForm({ name: '', message: '' }) // Reset form
  }

  // Common card styles
  const cardStyles = "bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 w-[380px] min-h-[400px]";
  const headerStyles = "flex items-center gap-2 mb-4 p-2 rounded-lg";
  const iconContainerStyles = "p-2 rounded-lg";
  const titleStyles = "text-gray-900 font-semibold text-lg";
  const buttonStyles = "w-full flex items-center justify-center gap-2 text-blue-600 font-medium py-2.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors mt-2";

  const MobileCarousel = () => {
    return (
      <div className="md:hidden px-4">
        {!user ? (
          <div className="flex flex-col gap-4">
            {/* Remove standalone buttons */}
          </div>
        ) : (
          <>
            <div className="flex gap-2 mb-4 justify-center">
              <button
                onClick={() => setActiveCard('investment')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeCard === 'investment'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 active:bg-gray-200'
                }`}
              >
                Investment
              </button>
              <button
                onClick={() => setActiveCard('credit')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeCard === 'credit'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 active:bg-gray-200'
                }`}
              >
                Credit
              </button>
            </div>

            <div className="transition-all duration-500 ease-in-out">
              {activeCard === 'investment' ? (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 w-full">
                  {latestAllocation ? (
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-blue-600/10">
                        <div className="p-2 rounded-lg">
                          <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                          </svg>
                        </div>
                        <span className="text-gray-900 font-semibold text-lg">Investment Allocation</span>
                      </div>

                      <div className="space-y-2.5 my-4">
                        {[...Array(6)].map((_, index) => {
                          const item = latestAllocation?.[index] as AllocationItem | undefined;
                          return (
                            <div key={item?.name || `empty-${index}`} className="flex justify-between items-center">
                              <span className="text-gray-600">
                                {item?.name || '\u00A0'}
                              </span>
                              <span className="font-semibold text-gray-900">
                                {item?.value ? `${item.value}%` : ''}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="space-y-2 pt-4">
                        <Link 
                          href="/investment" 
                          className={buttonStyles}
                        >
                          View Full Investment Allocation
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        
                        <Link 
                          href="/investment" 
                          className={buttonStyles}
                        >
                          Update Risk Profile
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-50 p-6 w-full">
                      <h3 className="text-xl font-bold text-blue-600 mb-4">Investment Planning</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-base font-bold">1</span>
                          </div>
                          <div>
                            <h4 className="text-base font-semibold mb-1">Fill Investment Form</h4>
                            <p className="text-sm text-gray-600">Share your financial goals and risk appetite by filling our investment form</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-base font-bold">2</span>
                          </div>
                          <div>
                            <h4 className="text-base font-semibold mb-1">Get Portfolio Strategy</h4>
                            <p className="text-sm text-gray-600">Receive AI-driven fund distribution recommendations to allocate your funds optimally</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-base font-bold">3</span>
                          </div>
                          <div>
                            <h4 className="text-base font-semibold mb-1">Start Investing</h4>
                            <p className="text-sm text-gray-600">Get specific investment recommendations and begin your journey</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Link 
                          href="/investment" 
                          className="w-full inline-block text-center rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                        >
                          Start Investment Planning
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 w-full">
                  {latestReport && (latestReport.score ?? 0) > 0 ? (
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-green-600/10">
                        <div className="p-2 rounded-lg">
                          <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                          </svg>
                        </div>
                        <span className="text-gray-900 font-semibold text-lg">Credit Report</span>
                      </div>

                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <p className="text-gray-500">Generated on:</p>
                          <p className="font-medium text-gray-900">{reportData?.formattedDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500">Score:</p>
                          <p className={`font-semibold text-2xl ${
                            (reportData?.report_analysis?.score_details?.score >= 750) ? 'text-green-600' :
                            (reportData?.report_analysis?.score_details?.score >= 600) ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>{reportData?.report_analysis?.score_details?.score}</p>
                        </div>
                      </div>

                      <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Open Accounts</span>
                          <span className="font-semibold text-gray-900">
                            {reportData?.report_analysis?.account_summary?.["PRIMARY-ACCOUNTS-SUMMARY"]?.["ACTIVE-ACCOUNTS"] || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Closed Accounts</span>
                          <span className="font-semibold text-gray-900">
                            {(parseInt(reportData?.report_analysis?.account_summary?.["PRIMARY-ACCOUNTS-SUMMARY"]?.["NUMBER-OF-ACCOUNTS"] || "0") - 
                             parseInt(reportData?.report_analysis?.account_summary?.["PRIMARY-ACCOUNTS-SUMMARY"]?.["ACTIVE-ACCOUNTS"] || "0")) || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total Credit Limit</span>
                          <span className="font-semibold text-gray-900">
                            ₹{(parseInt(reportData?.report_analysis?.account_summary?.["PRIMARY-ACCOUNTS-SUMMARY"]?.["TOTAL-CC-SANCTION-AMOUNT-ALL-ACCOUNT"] || "0"))?.toLocaleString('en-IN') || 0}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4">
                        <Link 
                          href="/credit/score/report" 
                          className={buttonStyles}
                        >
                          View Credit Report Summary Video
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        
                        <Link 
                          href="/credit/score"
                          className={`${buttonStyles} ${
                            new Date().getTime() - new Date(reportData?.created_at).getTime() <= 30 * 24 * 60 * 60 * 1000 
                              ? 'opacity-50 pointer-events-none'
                              : ''
                          }`}
                        >
                          Refresh Analysis
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-green-50 p-6 w-full">
                      <h3 className="text-xl font-bold text-green-600 mb-4">Credit Solutions</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-base font-bold">1</span>
                          </div>
                          <div>
                            <h4 className="text-base font-semibold mb-1">Credit Score</h4>
                            <p className="text-sm text-gray-600">Understand Your Credit Score through our AI generated personalized video and summary</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-base font-bold">2</span>
                          </div>
                          <div>
                            <h4 className="text-base font-semibold mb-1">Get Recommendations</h4>
                            <p className="text-sm text-gray-600">Receive personalized recommendations for score improvement and simplify account management</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-base font-bold">3</span>
                          </div>
                          <div>
                            <h4 className="text-base font-semibold mb-1">Apply for Products</h4>
                            <p className="text-sm text-gray-600">Apply for secured and unsecured loans with higher chances of approval</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Link 
                          href="/credit/score" 
                          className="w-full inline-block text-center rounded-md bg-green-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
                        >
                          Get Started with Credit Solutions
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartTime(Date.now())
    setTouchStartX(e.touches[0].clientX)
    setTouchStartY(e.touches[0].clientY)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault() // Prevent default touch behavior
    
    const now = Date.now()
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    
    // Calculate touch duration and distance
    const touchDuration = now - touchStartTime
    const touchDistance = Math.sqrt(
      Math.pow(touchEndX - touchStartX, 2) + 
      Math.pow(touchEndY - touchStartY, 2)
    )
    
    // Check if enough time has passed since last touch
    if (now - lastTouchTime < TOUCH_DELAY) {
      return // Ignore touches that are too close together
    }
    
    // Only handle as tap if:
    // 1. Touch duration is less than 500ms
    // 2. Touch distance is less than threshold (to differentiate from scrolling)
    if (touchDuration < 500 && touchDistance < TOUCH_THRESHOLD) {
      const target = e.target as HTMLElement
      const clickableElement = target.closest('a, button') as HTMLElement
      
      if (clickableElement) {
        setLastTouchTime(now)
        clickableElement.click()
      }
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div>
              <h1 className="text-[64px] leading-tight font-bold mb-8">
                <span className="text-black">Find The Right</span>
                <br />
                <span className="text-[#4F46E5]">Credit Product</span>
              </h1>
              <p className="text-2xl text-gray-600 mb-12">
                Compare different credit products from multiple banks and find the perfect match for your needs. Get personalized recommendations based on your profile.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/credit?type=credit-cards" className="col-span-1">
                  <div className="group bg-[#4F46E5] hover:bg-[#4338CA] transition-all duration-200 rounded-xl p-4 h-[80px] flex items-center gap-3 cursor-pointer">
                    <div className="bg-white/20 p-1.5 rounded-lg">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h.01M11 15h.01M15 15h.01M19 15h.01M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      </svg>
                    </div>
                    <span className="text-base text-white font-medium">Compare Credit Cards</span>
                  </div>
                </Link>
                <Link href="/loans/personal" className="col-span-1">
                  <div className="group bg-[#4F46E5] hover:bg-[#4338CA] transition-all duration-200 rounded-xl p-4 h-[80px] flex items-center gap-3 cursor-pointer">
                    <div className="bg-white/20 p-1.5 rounded-lg">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-base text-white font-medium">Compare Personal Loans</span>
                  </div>
                </Link>
                <Link href="/loans/home" className="col-span-1">
                  <div className="group bg-[#4F46E5] hover:bg-[#4338CA] transition-all duration-200 rounded-xl p-4 h-[80px] flex items-center gap-3 cursor-pointer">
                    <div className="bg-white/20 p-1.5 rounded-lg">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <span className="text-base text-white font-medium">Compare Home Loans</span>
                  </div>
                </Link>
                <Link href="/loans/auto" className="col-span-1">
                  <div className="group bg-[#4F46E5] hover:bg-[#4338CA] transition-all duration-200 rounded-xl p-4 h-[80px] flex items-center gap-3 cursor-pointer">
                    <div className="bg-white/20 p-1.5 rounded-lg">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <span className="text-base text-white font-medium">Compare Auto Loans</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Content - Product Images Slider */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[400px] overflow-hidden">
                {sliderData.map((slide, index) => (
                  <div
                    key={slide.type}
                    className={`absolute w-full transition-all duration-500 transform ${
                      index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                    }`}
                  >
                    {slide.type === 'credit-cards' ? (
                      <div className="relative w-full h-[400px]">
                        <div className="absolute top-0 right-0 transform -rotate-6 transition-transform hover:rotate-0">
                          <Image
                            src={(slide as CreditCardSlide).images[2]}
                            alt="Credit Card 3"
                            width={320}
                            height={200}
                            className="rounded-2xl shadow-2xl"
                          />
                        </div>
                        <div className="absolute top-10 right-20 transform rotate-6 transition-transform hover:rotate-0">
                          <Image
                            src={(slide as CreditCardSlide).images[1]}
                            alt="Credit Card 2"
                            width={320}
                            height={200}
                            className="rounded-2xl shadow-2xl"
                          />
                        </div>
                        <div className="absolute top-20 right-40 transform -rotate-3 transition-transform hover:rotate-0">
                          <Image
                            src={(slide as CreditCardSlide).images[0]}
                            alt="Credit Card 1"
                            width={320}
                            height={200}
                            className="rounded-2xl shadow-2xl"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-[400px] flex items-center justify-center">
                        <div className="bg-white rounded-2xl shadow-2xl p-6 w-[360px] transform rotate-3 hover:rotate-0 transition-transform">
                          <div className="flex items-center justify-between mb-6">
                            <div className="bg-[#4F46E5] w-12 h-12 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-xl">SB</span>
                            </div>
                            <div className="text-right">
                              <h3 className="text-xl font-bold text-gray-900">{(slide as PersonalLoanSlide).sampleLoan.bankName}</h3>
                              <p className="text-sm text-gray-500">Personal Loan</p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                              <span className="text-gray-600">Interest Rate</span>
                              <span className="font-semibold text-gray-900">{(slide as PersonalLoanSlide).sampleLoan.interestRate}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                              <span className="text-gray-600">Loan Amount</span>
                              <span className="font-semibold text-gray-900">{(slide as PersonalLoanSlide).sampleLoan.loanAmount}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                              <span className="text-gray-600">Tenure</span>
                              <span className="font-semibold text-gray-900">{(slide as PersonalLoanSlide).sampleLoan.tenure}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                              <span className="text-gray-600">EMI</span>
                              <span className="font-semibold text-gray-900">{(slide as PersonalLoanSlide).sampleLoan.emi}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Processing Fee</span>
                              <span className="font-semibold text-gray-900">{(slide as PersonalLoanSlide).sampleLoan.processingFee}</span>
                            </div>
                          </div>

                          <div className="mt-6">
                            <div className="bg-[#4F46E5]/10 rounded-lg p-3">
                              <p className="text-sm text-[#4F46E5] font-medium">
                                ✨ Pre-approved offer available
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Success Badge */}
              <div className="absolute -top-4 right-0 bg-green-500 text-white p-3 rounded-full shadow-lg z-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {/* Slider Indicators */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {sliderData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-blue-600 w-4' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Card vs Personal Loan Comparison Section */}
      <CreditCardVsLoanComparison />

      {/* Learning Center Preview Section */}
      <LearningCenterPreview />

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  )
}
