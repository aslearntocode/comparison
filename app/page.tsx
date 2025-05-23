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
import RewardPointsComparison from '@/components/RewardPointsComparison'
import { useRouter } from 'next/navigation'
import { Dialog } from '@headlessui/react'
import { creditCards, type CreditCard } from '@/app/data/creditCards'
import FeeAndRewardsCarousel from '@/components/FeeAndRewardsCarousel'
import BankingPartners from '@/components/BankingPartners'

interface AllocationItem {
  name: string;
  value: number;
}

interface CreditCardSlide {
  type: 'credit-cards' | 'loans';
  images: string[];
  title: string;
  subtitle: string;
  description: string;
}

type SlideData = CreditCardSlide;

export default function Home() {
  const router = useRouter()
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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    issuer: '',
    complaint: ''
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<CreditCard[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [touchMoved, setTouchMoved] = useState(false)
  const [isSwiping, setIsSwiping] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const testimonials = [
    {
      initial: 'R',
      name: 'Rahul Sharma',
      role: 'Software Engineer',
      color: 'bg-blue-600',
      text: 'I appreciate that this app doesn\'t share my data with other companies. Unlike other platforms, I haven\'t received any unsolicited calls from lenders. It\'s refreshing to use a service that respects user privacy!'
    },
    {
      initial: 'P',
      name: 'Priya Patel',
      role: 'Business Owner',
      color: 'bg-purple-600',
      text: 'The ability to compare all credit cards in one place saved me so much time! I could easily see the benefits, fees, and rewards of each card without visiting multiple websites. Found my perfect card in minutes!'
    },
    {
      initial: 'A',
      name: 'Amit Kumar',
      role: 'Medical Professional',
      color: 'bg-green-600',
      text: 'The personalized recommendations were spot-on! The app understood my spending habits and suggested cards that perfectly matched my lifestyle. No more guesswork in choosing the right credit card.'
    },
    {
      initial: 'N',
      name: 'Neha Gupta',
      role: 'Financial Analyst',
      color: 'bg-red-600',
      text: 'What impressed me most was the transparency. No hidden charges, no spam calls, and clear comparison of all features. It\'s rare to find such an honest financial comparison platform.'
    },
    {
      initial: 'S',
      name: 'Suresh Reddy',
      role: 'Retired Professional',
      color: 'bg-yellow-600',
      text: 'The user-friendly interface made it easy for me to understand different credit card options. I could filter cards based on my needs and compare them side by side. Highly recommended!'
    },
    {
      initial: 'M',
      name: 'Meera Desai',
      role: 'Freelancer',
      color: 'bg-indigo-600',
      text: 'I was skeptical at first, but the app proved me wrong. No unwanted calls, no data sharing, and most importantly, it helped me find a card with great rewards for my business expenses.'
    }
  ]

  // Update slider data to include both credit cards and loans
  const sliderData: CreditCardSlide[] = [
    {
      type: 'credit-cards',
      images: [
        '/credit-cards/idfc/Mayura-Card-revised-29-Nov.png',
        '/credit-cards/idfc/Select-New-Card_Front.png',
        '/credit-cards/idfc/Ashva-Card-revised-27-Nov.png'
      ],
      title: 'Find The Best',
      subtitle: 'Credit Cards in India',
      description: 'Compare and find the best credit cards in India from multiple banks. Get detailed comparisons of rewards, benefits, and features to choose the perfect card for your lifestyle.'
    },
    {
      type: 'loans',
      images: [
        '/loan.png',
        '/loan.png',
        '/loan.png'
      ],
      title: 'Meet Your Needs',
      subtitle: 'via Instant Loans',
      description: 'Compare and find the best loans in India from multiple Banks and NBFCs. Get detailed comparisons of interest rates, EMI options, and features to choose the perfect loan for your needs.'
    }
  ];

  // Card links for featured cards in hero section
  const cardLinks = [
    '/credit/idfc-mayura-metal',
    '/credit/idfc-first-select',
    '/credit/idfc-first-ashva',
  ];

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
    }, 8000) // Increased from 5000 to 8000 milliseconds (8 seconds)

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
    let interval: NodeJS.Timeout | undefined;
    if (isAutoPlaying) {
      const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderData.length);
      }, 10000); // Changed to 10 seconds (10000ms) for both mobile and desktop
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying]);

  useEffect(() => {
    if (user) {
      // Pre-fill form data when user is logged in
      setFormData(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || ''
      }))
    }
  }, [user])

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

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
    setTouchMoved(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.touches[0].clientX);
    setTouchMoved(true);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const threshold = 50;
    const swipeDistance = touchStart - touchEnd;
    
    if (Math.abs(swipeDistance) > threshold) {
      // It's a swipe
      e.preventDefault();
      if (swipeDistance > 0) {
        // Swipe left
        setCurrentSlide((prev) => (prev + 1) % sliderData.length);
      } else {
        // Swipe right
        setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
      }
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (touchMoved) {
      e.preventDefault();
    }
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const handleFormClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/resolve-complaints');
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Improved search function
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0)
    
    // Search across all credit cards with improved matching
    const results = creditCards.filter(card => {
      // Create a comprehensive searchable text that includes all relevant fields
      const searchableText = `
        ${card.name.toLowerCase()} 
        ${card.bank.toLowerCase()} 
        ${card.categories.join(' ').toLowerCase()} 
        ${card.additionalDetails?.rewardsProgram?.toLowerCase() || ''} 
        ${card.additionalDetails?.welcomeBonus?.toLowerCase() || ''} 
        ${card.additionalDetails?.airportLounge?.toLowerCase() || ''}
        ${card.additionalDetails?.insuranceCover?.join(' ').toLowerCase() || ''}
        ${card.additionalDetails?.diningPrivileges?.join(' ').toLowerCase() || ''}
        ${card.additionalDetails?.movieBenefits?.toLowerCase() || ''}
        ${card.additionalDetails?.idealFor?.join(' ').toLowerCase() || ''}
        ${card.additionalDetails?.notIdealFor?.join(' ').toLowerCase() || ''}
        ${card.additionalDetails?.summary?.toLowerCase() || ''}
      `.replace(/\s+/g, ' ').trim()

      // Check if all search terms are present in the searchable text
      return searchTerms.every(term => searchableText.includes(term))
    }).sort((a, b) => {
      // Score each card based on where the match was found
      const scoreCard = (card: CreditCard, term: string) => {
        let score = 0
        const termLower = term.toLowerCase()
        
        // Highest priority - card name and bank
        if (card.name.toLowerCase().includes(termLower)) score += 10
        if (card.bank.toLowerCase().includes(termLower)) score += 8
        
        // High priority - rewards program and features
        if (card.additionalDetails?.rewardsProgram?.toLowerCase().includes(termLower)) score += 6
        if (card.categories.some(f => f.toLowerCase().includes(termLower))) score += 5
        
        // Medium priority - additional details
        if (card.additionalDetails?.summary?.toLowerCase().includes(termLower)) score += 4
        if (card.additionalDetails?.rewardsProgram?.toLowerCase().includes(termLower)) score += 3
        
        // Lower priority - other fields
        if (card.additionalDetails?.idealFor?.some(f => f.toLowerCase().includes(termLower))) score += 2
        if (card.additionalDetails?.welcomeBonus?.toLowerCase().includes(termLower)) score += 1
        
        return score
      }

      // Calculate total score for all search terms
      const scoreA = searchTerms.reduce((sum, term) => sum + scoreCard(a, term), 0)
      const scoreB = searchTerms.reduce((sum, term) => sum + scoreCard(b, term), 0)
      
      return scoreB - scoreA
    })

    setSearchResults(results)
  }

  const MobileCarousel = () => {
    return (
      <div className="md:hidden px-4">
        <div className="mt-6 mb-2 flex justify-center">
          <span className="text-sm font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
            Our Featured Cards
          </span>
        </div>
        <div className="relative w-full h-[200px] flex items-center">
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <Link 
                href={sliderData[currentSlide].type === 'credit-cards' ? cardLinks[currentSlide % cardLinks.length] : '/loans'}
                className="block"
                aria-label={`View details for ${sliderData[currentSlide].type === 'credit-cards' ? 'card' : 'loan'} ${currentSlide + 1}`}
              >
                <Image
                  src={sliderData[currentSlide].images[currentSlide % sliderData[currentSlide].images.length]}
                  width={240}
                  height={150}
                  alt={`${sliderData[currentSlide].type === 'credit-cards' ? 'Credit Card' : 'Loan'} ${currentSlide + 1}`}
                  className="rounded-2xl shadow-2xl mx-auto"
                />
              </Link>
            </div>
          </div>
          {/* Carousel Indicators */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {sliderData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Floating Info Cards */}
      <div className="fixed right-4 top-52 md:top-44 z-50 flex flex-col gap-4">
        {/* Amazon Voucher Card */}
        <div 
          className={`bg-white rounded-lg shadow-lg transition-all duration-300 overflow-hidden absolute right-0 ${
            expandedCard === 'voucher' ? 'w-80 md:w-96' : 'w-12 md:w-14'
          }`}
          style={{ top: '0' }}
        >
          <div 
            className="flex items-center p-3 md:p-4 cursor-pointer"
            onClick={() => setExpandedCard(expandedCard === 'voucher' ? null : 'voucher')}
          >
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            {expandedCard === 'voucher' && (
              <div className="ml-3 md:ml-4">
                <h3 className="text-sm md:text-base font-semibold text-gray-900">Amazon Voucher Reward</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  Amazon vouchers will be sent to your registered email within one week of credit card approval.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Soft Pull Card */}
        <div 
          className={`bg-white rounded-lg shadow-lg transition-all duration-300 overflow-hidden absolute right-0 ${
            expandedCard === 'softpull' ? 'w-80 md:w-96' : 'w-12 md:w-14'
          }`}
          style={{ top: '5rem' }}
        >
          <div 
            className="flex items-center p-3 md:p-4 cursor-pointer"
            onClick={() => setExpandedCard(expandedCard === 'softpull' ? null : 'softpull')}
          >
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            {expandedCard === 'softpull' && (
              <div className="ml-3 md:ml-4">
                <h3 className="text-sm md:text-base font-semibold text-gray-900">Soft Pull Check</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  We perform a soft pull to assess your eligibility. This check doesn't impact your credit score.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="bg-blue-600 text-white overflow-hidden">
        <div className="relative flex">
          <div className="py-4 animate-scroll flex whitespace-nowrap">
            {/* First set */}
            <span className="mx-4 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-base md:text-lg font-medium">
                We respect your privacy — no calls, no data sharing, unless you request it. &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span className="mx-4 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-base md:text-lg font-medium">
                Apply through us and get INR 100-1000 reward on successful application! &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            {/* Second set */}
            <span className="mx-4 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-base md:text-lg font-medium">
                We respect your privacy — no calls, no data sharing, unless you request it. &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span className="mx-4 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-base md:text-lg font-medium">
                Apply through us and get INR 100-1000 reward on successful application! &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            {/* Third set */}
            <span className="mx-4 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-base md:text-lg font-medium">
                We respect your privacy — no calls, no data sharing, unless you request it. &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <span className="mx-4 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-base md:text-lg font-medium">
                Apply through us and get INR 100-1000 reward on successful application! &nbsp;&nbsp;&nbsp;
              </span>
            </span>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Mobile Hero Section */}
          <div className="lg:hidden mb-8">
            <div className="relative w-full h-[200px] flex items-center">
              <div className="relative w-full h-full">
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <Link 
                    href={sliderData[currentSlide].type === 'credit-cards' ? cardLinks[currentSlide % cardLinks.length] : '/loans'}
                    className="block"
                    aria-label={`View details for ${sliderData[currentSlide].type === 'credit-cards' ? 'card' : 'loan'} ${currentSlide + 1}`}
                  >
                    <Image
                      src={sliderData[currentSlide].images[currentSlide % sliderData[currentSlide].images.length]}
                      width={240}
                      height={150}
                      alt={`${sliderData[currentSlide].type === 'credit-cards' ? 'Credit Card' : 'Loan'} ${currentSlide + 1}`}
                      className="rounded-2xl shadow-2xl mx-auto"
                    />
                  </Link>
                </div>
              </div>
              {/* Carousel Indicators */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                {sliderData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Content */}
            <div>
              <h1 className="text-[32px] md:text-[48px] leading-tight font-bold mb-6 text-center md:text-left">
                <span className="text-black">{sliderData[currentSlide].title}</span>
                <br />
                <span className="text-[#4F46E5]">{sliderData[currentSlide].subtitle}</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {sliderData[currentSlide].description}
              </p>
              <div className={sliderData[currentSlide].type === 'loans' ? "grid grid-cols-2 md:grid-cols-3 gap-2 mb-2" : "grid grid-cols-3 gap-3"}>
                {sliderData[currentSlide].type === 'credit-cards' ? (
                  <>
                    <Link href="/credit?category=lifetime-free" className="col-span-1">
                      <div className="group bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-600 hover:to-indigo-600 shadow-md hover:shadow-xl border border-blue-200/40 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.03] backdrop-blur-sm bg-opacity-90 p-2 h-12 text-sm gap-2 flex items-center cursor-pointer">
                        <div className="bg-white/30 rounded-full p-1 shadow-inner">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-white drop-shadow-sm text-sm">Lifetime Free</span>
                      </div>
                    </Link>
                    <Link href="/credit?category=lifestyle" className="col-span-1">
                      <div className="group bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 shadow-md hover:shadow-xl border border-purple-200/40 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.03] backdrop-blur-sm bg-opacity-90 p-2 h-12 text-sm gap-2 flex items-center cursor-pointer">
                        <div className="bg-white/30 rounded-full p-1 shadow-inner">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-white drop-shadow-sm text-sm">Lifestyle</span>
                      </div>
                    </Link>
                    <Link href="/credit?category=premium" className="col-span-1">
                      <div className="group bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-600 hover:to-pink-600 shadow-md hover:shadow-xl border border-pink-200/40 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.03] backdrop-blur-sm bg-opacity-90 p-2 h-12 text-sm gap-2 flex items-center cursor-pointer">
                        <div className="bg-white/30 rounded-full p-1 shadow-inner">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-white drop-shadow-sm text-sm">Premium</span>
                      </div>
                    </Link>
                    <Link href="/credit?category=upi" className="col-span-1">
                      <div className="group bg-gradient-to-r from-teal-500 to-pink-500 hover:from-pink-600 hover:to-teal-600 shadow-md hover:shadow-xl border border-teal-200/40 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.03] backdrop-blur-sm bg-opacity-90 p-2 h-12 text-sm gap-2 flex items-center cursor-pointer">
                        <div className="bg-white/30 rounded-full p-1 shadow-inner">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-white drop-shadow-sm text-sm">UPI</span>
                      </div>
                    </Link>
                    <Link href="/credit?category=airlines" className="col-span-1">
                      <div className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-600 hover:to-orange-600 shadow-md hover:shadow-xl border border-orange-200/40 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.03] backdrop-blur-sm bg-opacity-90 p-2 h-12 text-sm gap-2 flex items-center cursor-pointer">
                        <div className="bg-white/30 rounded-full p-1 shadow-inner">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </div>
                        <span className="font-semibold text-white drop-shadow-sm text-sm">Airlines</span>
                      </div>
                    </Link>
                    <Link href="/credit?category=fintech" className="col-span-1">
                      <div className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-cyan-600 shadow-md hover:shadow-xl border border-cyan-200/40 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.03] backdrop-blur-sm bg-opacity-90 p-2 h-12 text-sm gap-2 flex items-center cursor-pointer">
                        <div className="bg-white/30 rounded-full p-1 shadow-inner">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-white drop-shadow-sm text-sm">Fintech</span>
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/personal-loans" className="col-span-1">
                      <div className="group bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-600 hover:to-indigo-600 shadow-md hover:shadow-xl border border-blue-200/40 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.03] backdrop-blur-sm bg-opacity-90 p-1.5 h-12 text-xs gap-1 flex items-center cursor-pointer w-full md:w-[180px]">
                        <div className="bg-white/30 rounded-full p-1 shadow-inner">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-white drop-shadow-sm text-sm">Personal Loan</span>
                      </div>
                    </Link>
                    <Link href="/home-loans-refinance" className="col-span-1">
                      <div className="group bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 shadow-md hover:shadow-xl border border-purple-200/40 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.03] backdrop-blur-sm bg-opacity-90 p-1.5 h-12 text-xs gap-1 flex items-center cursor-pointer w-full md:w-[180px]">
                        <div className="bg-white/30 rounded-full p-1 shadow-inner">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <span className="font-semibold text-white drop-shadow-sm text-sm">Home Loan Refinance</span>
                      </div>
                    </Link>
                    <div className="col-span-1">
                      <div className="group bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-600 hover:to-pink-600 shadow-md hover:shadow-xl border border-pink-200/40 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.03] backdrop-blur-sm bg-opacity-90 p-1.5 h-12 text-xs gap-1 flex items-center cursor-pointer w-full md:w-[180px]">
                        <div className="bg-white/30 rounded-full p-1 shadow-inner">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-white drop-shadow-sm text-sm">Auto Loan</span>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="group bg-gradient-to-r from-teal-500 to-pink-500 hover:from-pink-600 hover:to-teal-600 shadow-md hover:shadow-xl border border-teal-200/40 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.03] backdrop-blur-sm bg-opacity-90 p-1.5 h-12 text-xs gap-1 flex items-center cursor-pointer w-full md:w-[180px]">
                        <div className="bg-white/30 rounded-full p-1 shadow-inner">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-white drop-shadow-sm text-sm">Loan Against MF</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Content - Product Images */}
            <div className="relative hidden lg:block">
              <div 
                className="relative w-full h-[280px] flex items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative w-full h-full">
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <Link 
                      href={sliderData[currentSlide].type === 'credit-cards' ? cardLinks[currentSlide % cardLinks.length] : '/loans'}
                      className="block"
                      aria-label={`View details for ${sliderData[currentSlide].type === 'credit-cards' ? 'card' : 'loan'} ${currentSlide + 1}`}
                    >
                      <Image
                        src={sliderData[currentSlide].images[currentSlide % sliderData[currentSlide].images.length]}
                        width={400}
                        height={250}
                        alt={`${sliderData[currentSlide].type === 'credit-cards' ? 'Credit Card' : 'Loan'} ${currentSlide + 1}`}
                        className="rounded-2xl shadow-2xl mx-auto hover:scale-105 transition-transform duration-200"
                      />
                    </Link>
                  </div>
                </div>
                {/* Carousel Indicators */}
                <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
                  {sliderData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Card vs Personal Loan Comparison Section */}
      <CreditCardVsLoanComparison />

      {/* Credit Score Analysis Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Only: Text + Button + Image stacked closely */}
          <div className="block lg:hidden mb-4">
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-2xl font-bold mb-2 text-center">
                Understand Your Credit Score
                <span className="text-[#4F46E5]"> Better (Coming Soon)</span>
              </h2>
              <p className="text-base text-gray-600 mb-2 text-center">
                Upload your credit report PDF and get an AI-powered analysis that helps you understand your credit score, identify areas for improvement, and receive personalized recommendations.
              </p>
              <ul className="space-y-2 mb-2">
                <li className="flex items-center gap-2 text-sm text-gray-800">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 border border-green-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  Know what impacts your score
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-800">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 border border-green-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  Get actionable recommendations
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-800">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 border border-green-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  Check anytime - No impact on your score
                </li>
              </ul>
              <Link 
                href="/credit-score-main/score"
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-colors shadow-lg mb-0"
              >
                Analyze Your Credit Report
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <div className="w-full flex justify-center">
                <img 
                  src="/Credit-Score-Analysis.png" 
                  alt="Credit Score Meter" 
                  className="w-full max-w-xs rounded-2xl shadow-lg object-contain"
                  style={{ maxHeight: 220 }}
                />
              </div>
            </div>
          </div>
          {/* Desktop layout (unchanged) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Text */}
            <div className="hidden lg:block">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Understand Your Credit Score
                <span className="text-[#4F46E5]"> Better (Coming Soon)</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Upload your credit report PDF and get an AI-powered analysis that helps you understand your credit score, identify areas for improvement, and receive personalized recommendations.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-base text-gray-800">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-600 border border-green-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  Know what impacts your score
                </li>
                <li className="flex items-center gap-3 text-base text-gray-800">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-600 border border-green-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  Get actionable recommendations
                </li>
                <li className="flex items-center gap-3 text-base text-gray-800">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-600 border border-green-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  Check anytime - No impact on your score
                </li>
              </ul>
              <Link 
                href="/credit-score-main/score"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-colors shadow-lg"
              >
                Analyze Your Credit Report
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            {/* Right Content - Visuals */}
            <div className="relative hidden lg:flex flex-col items-center justify-center min-h-[420px]">
              {/* Credit Score Gauge */}
              <div className="relative z-0 flex flex-col items-center justify-center mt-0 lg:mt-24">
                <div className="bg-white rounded-2xl shadow-lg p-2 border border-gray-200">
                  <img src="/Credit-Score-Analysis.png" alt="Credit Score Meter" className="w-120 h-80 object-contain rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Waiver Checker and Reward Points Comparison Container */}
      <FeeAndRewardsCarousel />

      {/* Connect with Credit Expert Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Need Help with Your Financial Products?</h2>
            <p className="text-lg text-gray-600">Connect with our credit experts for personalized assistance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Why Choose Us Section */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-purple-100/20 flex flex-col justify-between min-h-[340px]" style={{ minHeight: '340px' }}>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
                <div className="space-y-3 lg:space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z M12 13c-2.5 0-7 1.25-7 3.75V19h14v-2.25C19 14.25 14.5 13 12 13z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-0 lg:mb-1">Expert Guidance</h4>
                      <p className="text-gray-600">Our credit experts will guide you throughout the resolution process, providing personalized assistance at every step.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11V7a2 2 0 00-2-2h-2.586a1 1 0 01-.707-.293l-1.414-1.414a1 1 0 00-1.414 0L8.293 4.707A1 1 0 017.586 5H5a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2z" />
                        <circle cx="12" cy="16" r="2" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-0 lg:mb-1">Professional Resolution</h4>
                      <p className="text-gray-600">We handle your concerns privately and professionally, ensuring a dignified resolution process.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Issue Box */}
            <div 
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 lg:p-8 shadow-lg border border-blue-100/20 flex flex-col justify-between min-h-[340px]"
              style={{ minHeight: '340px' }}
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z M12 13c-2.5 0-7 1.25-7 3.75V19h14v-2.25C19 14.25 14.5 13 12 13z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Submit Your Issue</h3>
                    <p className="text-gray-600">Get expert help with any financial product</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 text-blue-600">
                      {/* Credit Card Icon */}
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="2" y="6" width="20" height="12" rx="3" strokeWidth="2"/><path d="M2 10h20" strokeWidth="2"/></svg>
                    </span>
                    <span className="text-gray-800 font-medium">Credit Cards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-purple-100 text-purple-600">
                      {/* Personal Loan Icon */}
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8v8m0 0l-3-3m3 3l3-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="2"/></svg>
                    </span>
                    <span className="text-gray-800 font-medium">Personal Loans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-green-100 text-green-600">
                      {/* Home Loan Icon */}
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 12l9-7 9 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="6" y="12" width="12" height="8" rx="2" strokeWidth="2"/></svg>
                    </span>
                    <span className="text-gray-800 font-medium">Home Loans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-pink-100 text-pink-600">
                      {/* Car Loan Icon */}
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="11" width="18" height="5" rx="2" strokeWidth="2"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/></svg>
                    </span>
                    <span className="text-gray-800 font-medium">Car Loans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-yellow-100 text-yellow-600">
                      {/* Other Financial Icon */}
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2"/><path d="M8 12h8M12 8v8" strokeWidth="2"/></svg>
                    </span>
                    <span className="text-gray-800 font-medium">
                      Other Products
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4 mt-auto">
                <a href="https://wa.me/919321314553" target="_blank" rel="noopener noreferrer" className="w-full flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition-colors text-base min-w-[180px] text-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  Chat with Us
                </a>
                <button className="w-full flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow text-base min-w-[180px] text-center cursor-default">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Call Us: +91 93213 14553
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Center Preview Section */}
      <LearningCenterPreview />

      {/* Testimonials Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentTestimonialIndex * (isMobile ? 100 : 33.33)}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full md:w-1/3 px-2 md:px-4 flex-shrink-0">
                  <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 h-full">
                    <div className="flex items-center mb-3 md:mb-4">
                      <div className={`w-8 h-8 md:w-10 md:h-10 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold mr-3 md:mr-4`}>
                        {testimonial.initial}
                      </div>
                      <div>
                        <h3 className="text-base md:text-sm font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm md:text-xs text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-base md:text-sm text-gray-600 leading-relaxed">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Banking Partners Section */}
      <BankingPartners />
    </div>
  )
}

