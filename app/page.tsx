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
import { FiCreditCard, FiGift, FiDollarSign, FiDroplet, FiGlobe, FiTrendingUp, FiHome, FiBriefcase, FiAirplay, FiLayers, FiCreditCard as FiCard, FiBook, FiTruck, FiHome as FiHomeIcon, FiDollarSign as FiDollarIcon, FiBookOpen, FiAward } from 'react-icons/fi'

const AnnouncementBanner = () => {
  return (
    <div className="bg-blue-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center text-center">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">🔗 New Partnership Announcement</span>
            <span className="mx-2">-</span>
            We're excited to join hands with "Kiwi" to get you the best credit card offers. Explore offerings on{' '}
            <Link href="/credit/kiwi-neon" className="text-blue-600 hover:text-blue-800 underline">
              Credit Cards
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

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

interface ReportData {
  created_at: string;
  report_analysis: {
    first_block?: {
      score_value?: number;
    };
    score_details?: {
      score?: number;
    };
  };
}

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
  const [user, setUser] = useState<User | null>(null)
  const [latestReport, setLatestReport] = useState<{
    date: string;
    type: string;
    score?: number;
    openAccounts?: number;
    closedAccounts?: number;
    totalCreditLimit?: string;
    report_analysis?: any;
  } | null>(null)
  const [latestAllocation, setLatestAllocation] = useState<AllocationItem[] | null>(null)
  const [reportData, setReportData] = useState<ReportData | null>(null)
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
              {sliderData[currentSlide].type === 'credit-cards' ? (
                <Link 
                  href={cardLinks[currentSlide % cardLinks.length]}
                  className="block"
                  aria-label={`View details for card ${currentSlide + 1}`}
                >
                  <Image
                    src={sliderData[currentSlide].images[currentSlide % sliderData[currentSlide].images.length]}
                    width={240}
                    height={150}
                    alt={`Credit Card ${currentSlide + 1}`}
                    className="rounded-2xl shadow-2xl mx-auto"
                  />
                </Link>
              ) : (
                <div className="block">
                  <Image
                    src={sliderData[currentSlide].images[currentSlide % sliderData[currentSlide].images.length]}
                    width={240}
                    height={150}
                    alt={`Loan ${currentSlide + 1}`}
                    className="rounded-2xl shadow-2xl mx-auto w-[240px] h-[150px] object-contain"
                  />
                </div>
              )}
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

  // Notification carousel messages
  const notificationMessages = [
    {
      icon: (
        <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      text: 'We respect your privacy — no calls, no data sharing, unless you request it.'
    },
    {
      icon: (
        <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: 'Apply through us and get INR 100-1000 reward on successful application!'
    },
    {
      icon: (
        <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      text: 'We respect your privacy — no calls, no data sharing, unless you request it.'
    },
    {
      icon: (
        <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: 'Explore freely, there is no hidden subscription fee, walk away if you find one.'
    }
  ];
  const [notificationIndex, setNotificationIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationIndex((prev) => (prev + 1) % notificationMessages.length);
    }, 5000); // 5 seconds per message
    return () => clearInterval(interval);
  }, [notificationMessages.length]);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <AnnouncementBanner />
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
                  Our partner performs a soft pull to assess your eligibility. This check doesn't impact your credit score.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="bg-indigo-600 text-white overflow-hidden">
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
                Apply through us and get INR 100-5000 reward on successful application! &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            {/* Third message - new */}
            <span className="mx-4 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-base md:text-lg font-medium">
                Explore freely! There is no hidden subscription fee, walk away if you find one. &nbsp;&nbsp;&nbsp;
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
                Apply through us and get INR 100-5000 reward on successful application! &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            {/* Third message - new */}
            <span className="mx-4 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-base md:text-lg font-medium">
                Explore freely! There is no hidden subscription fee, walk away if you find one. &nbsp;&nbsp;&nbsp;
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
                Apply through us and get INR 100-5000 reward on successful application! &nbsp;&nbsp;&nbsp;
              </span>
            </span>
            {/* Third message - new */}
            <span className="mx-4 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-base md:text-lg font-medium">
                Explore freely! There is no hidden subscription fee, walk away if you find one. &nbsp;&nbsp;&nbsp;
              </span>
            </span>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-[32px] md:text-[48px] leading-tight font-bold mb-6 text-center md:text-left">
                <span className="text-black">{sliderData[currentSlide].title}</span>
                <br />
                <span className="text-[#4F46E5]">{sliderData[currentSlide].subtitle}</span>
              </h1>
              <p className="text-lg text-gray-600 mb-4 md:mb-8">
                {sliderData[currentSlide].description}
              </p>
            </div>

            {/* Right Content - Buttons */}
            <div className="flex flex-col gap-4">
              {(sliderData[currentSlide].type as 'credit-cards' | 'loans') === 'credit-cards' ? (
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <Link href="/credit?category=lifetime-free" className="col-span-1">
                    <div className="group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.02] p-2 md:p-3 h-12 md:h-14 text-sm gap-2 flex items-center cursor-pointer">
                      <div className="bg-gray-100 rounded-full p-1.5 md:p-1.5">
                        <svg className="w-4 h-4 md:w-4 md:h-4 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-bold text-[#4F46E5] text-xs md:text-sm">Lifetime Free</span>
                    </div>
                  </Link>
                  <Link href="/credit?category=lifestyle" className="col-span-1">
                    <div className="group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.02] p-2 md:p-3 h-12 md:h-14 text-sm gap-2 flex items-center cursor-pointer">
                      <div className="bg-gray-100 rounded-full p-1.5 md:p-1.5">
                        <svg className="w-4 h-4 md:w-4 md:h-4 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                      <span className="font-bold text-[#4F46E5] text-xs md:text-sm">Lifestyle</span>
                    </div>
                  </Link>
                  <Link href="/credit?category=premium" className="col-span-1">
                    <div className="group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.02] p-2 md:p-3 h-12 md:h-14 text-sm gap-2 flex items-center cursor-pointer">
                      <div className="bg-gray-100 rounded-full p-1.5 md:p-1.5">
                        <FiAward className="w-4 h-4 md:w-4 md:h-4 text-[#4F46E5]" />
                      </div>
                      <span className="font-bold text-[#4F46E5] text-xs md:text-sm">Premium</span>
                    </div>
                  </Link>
                  <Link href="/credit?category=upi" className="col-span-1">
                    <div className="group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.02] p-2 md:p-3 h-12 md:h-14 text-sm gap-2 flex items-center cursor-pointer">
                      <div className="bg-gray-100 rounded-full p-1.5 md:p-1.5">
                        <svg className="w-4 h-4 md:w-4 md:h-4 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <span className="font-bold text-[#4F46E5] text-xs md:text-sm">UPI</span>
                    </div>
                  </Link>
                  <Link href="/credit?category=airlines" className="col-span-1">
                    <div className="group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.02] p-2 md:p-3 h-12 md:h-14 text-sm gap-2 flex items-center cursor-pointer">
                      <div className="bg-gray-100 rounded-full p-1.5 md:p-1.5">
                        <svg className="w-4 h-4 md:w-4 md:h-4 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                      <span className="font-bold text-[#4F46E5] text-xs md:text-sm">Airlines</span>
                    </div>
                  </Link>
                  <Link href="/credit?category=fuel" className="col-span-1">
                    <div className="group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.02] p-2 md:p-3 h-12 md:h-14 text-sm gap-2 flex items-center cursor-pointer">
                      <div className="bg-gray-100 rounded-full p-1.5 md:p-1.5">
                        <FiDroplet className="w-4 h-4 md:w-4 md:h-4 text-[#4F46E5]" />
                      </div>
                      <span className="font-bold text-[#4F46E5] text-xs md:text-sm">Fuel</span>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <Link href="/personal-loans" className="col-span-1">
                    <div className="group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.02] p-2 md:p-3 h-12 md:h-14 text-sm gap-2 flex items-center cursor-pointer">
                      <div className="bg-gray-100 rounded-full p-1.5 md:p-1.5">
                        <svg className="w-4 h-4 md:w-4 md:h-4 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-bold text-[#4F46E5] text-xs md:text-sm">Personal Loan</span>
                    </div>
                  </Link>
                  <Link href="/home-loans-refinance" className="col-span-1">
                    <div className="group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.02] p-2 md:p-3 h-12 md:h-14 text-sm gap-2 flex items-center cursor-pointer">
                      <div className="bg-gray-100 rounded-full p-1.5 md:p-1.5">
                        <svg className="w-4 h-4 md:w-4 md:h-4 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <span className="font-bold text-[#4F46E5] text-xs md:text-sm">Home Loan Refinance</span>
                    </div>
                  </Link>
                  <Link href="/auto-loan" className="col-span-1">
                    <div className="group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.02] p-2 md:p-3 h-12 md:h-14 text-sm gap-2 flex items-center cursor-pointer">
                      <div className="bg-gray-100 rounded-full p-1.5 md:p-1.5">
                        <FiTruck className="w-4 h-4 md:w-4 md:h-4 text-[#4F46E5]" />
                      </div>
                      <span className="font-bold text-[#4F46E5] text-xs md:text-sm">Auto Loan</span>
                    </div>
                  </Link>
                  <Link href="/loan-against-mf" className="col-span-1">
                    <div className="group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.02] p-2 md:p-3 h-12 md:h-14 text-sm gap-2 flex items-center cursor-pointer">
                      <div className="bg-gray-100 rounded-full p-1.5 md:p-1.5">
                        <FiTrendingUp className="w-4 h-4 md:w-4 md:h-4 text-[#4F46E5]" />
                      </div>
                      <span className="font-bold text-[#4F46E5] text-xs md:text-sm">Loan Against Mutual Funds</span>
                    </div>
                  </Link>
                  <Link href="/education-loan" className="col-span-1">
                    <div className="group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.02] p-2 md:p-3 h-12 md:h-14 text-sm gap-2 flex items-center cursor-pointer">
                      <div className="bg-gray-100 rounded-full p-1.5 md:p-1.5">
                        <svg className="w-4 h-4 md:w-4 md:h-4 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                      </div>
                      <span className="font-bold text-[#4F46E5] text-xs md:text-sm">Education Loan</span>
                    </div>
                  </Link>
                  <div className="col-span-1">
                    <div className="group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 ease-in-out hover:scale-[1.02] p-2 md:p-3 h-12 md:h-14 text-sm gap-2 flex items-center cursor-pointer">
                      <div className="bg-gray-100 rounded-full p-1.5 md:p-1.5">
                        <svg className="w-4 h-4 md:w-4 md:h-4 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-bold text-[#4F46E5] text-xs md:text-sm">Coming Soon</span>
                    </div>
                  </div>
                </div>
              )}
              {/* Carousel Navigation Dots */}
              <div className="flex justify-center items-center gap-2 mt-4">
                {sliderData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-[#4F46E5] scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Card Questionnaire Section */}
      <div className="w-full py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full max-w-xl md:max-w-3xl">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-1">Not sure which card is suitable for you?</h3>
                  <p className="text-xs md:text-gray-600 md:text-sm">Answer a few questions to get personalized recommendations</p>
                </div>
                <div className="flex-shrink-0">
                  <Link 
                    href="/credit-card-questionnaire"
                    className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 border border-transparent text-sm md:text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
                  >
                    Find Your Card
                    <svg className="ml-2 -mr-1 w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IDFC First Bank Offer Banner */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/50 via-transparent to-indigo-600/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 flex items-center justify-center relative">
            {/* Left decorative element */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            {/* Main content */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="text-center md:text-left">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs md:text-sm font-medium mb-2">
                  Limited Time Offer
                </span>
                <h3 className="text-base md:text-xl lg:text-2xl font-bold">
                  Get INR 750 for every successful IDFC First and Axis Bank Credit Card application!
                </h3>
              </div>
              <div className="flex gap-2 md:gap-3 mt-2">
                <Link 
                  href="/credit?bank=idfc-first"
                  className="inline-flex items-center px-3 py-2 md:px-6 md:py-3 bg-white text-indigo-600 hover:bg-indigo-50 rounded-lg text-xs md:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap"
                >
                  Explore IDFC First Cards
                  <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link 
                  href="/credit?bank=axis-bank"
                  className="inline-flex items-center px-3 py-2 md:px-6 md:py-3 bg-white text-indigo-600 hover:bg-indigo-50 rounded-lg text-xs md:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap"
                >
                  Explore Axis Bank Cards
                  <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right decorative element */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Team's Choice Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* HSBC TravelOne Card */}
          <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden p-6 md:p-10 gap-8">
            {/* Card Image */}
            <div className="flex-shrink-0 flex justify-center items-center w-full md:w-1/3">
              <img
                src="/credit-cards/HSBC-TravelOne.png"
                alt="HSBC TravelOne Card"
                className="w-32 h-auto rounded-xl shadow-md"
                style={{ minWidth: '80px', maxWidth: '120px', transform: 'rotate(-10deg)' }}
              />
            </div>
            {/* Card Details */}
            <div className="flex-1 flex flex-col justify-center items-start">
              <h2 className="text-xl md:text-2xl font-bold text-indigo-800 mb-2">Team's Choice for Travel</h2>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">HSBC TravelOne Credit Card</h3>
              <ul className="mb-4 pl-0 space-y-2">
                <li className="flex items-center text-base text-gray-700 pl-0 ml-0">
                  <span className="text-green-600 mr-2">✔</span>
                  Complimentary international & domestic lounge access
                </li>
                <li className="flex items-center text-base text-gray-700 pl-0 ml-0">
                  <span className="text-green-600 mr-2">✔</span>
                  Earn accelerated air miles & travel rewards
                </li>
                <li className="flex items-center text-base text-gray-700 pl-0 ml-0">
                  <span className="text-green-600 mr-2">✔</span>
                  Convert reward points to leading airlines & hotels
                </li>
                <li className="flex items-center text-base text-gray-700 pl-0 ml-0">
                  <span className="text-green-600 mr-2">✔</span>
                  Fee Waived after 8L annual spend
                </li>
              </ul>
              <a
                href="https://www.financialhealth.co.in/credit/hsbc-travel-one"
                className="text-indigo-700 font-semibold hover:underline text-base"
              >
                Know More
              </a>
              {/* Apply Now Gradient Message */}
              <div className="mt-4 rounded-full bg-white flex items-center px-4 py-2 shadow-sm w-full max-w-none md:max-w-[350px] text-left">
                <svg className="w-5 h-5 mr-2 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="2" />
                </svg>
                <span className="font-bold text-sm md:text-base bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                  Apply now and get INR 1000 for successful application
                </span>
              </div>
            </div>
          </div>

          {/* HDFC Marriott Bonvoy Card */}
          <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden p-6 md:p-10 gap-8">
            {/* Card Image */}
            <div className="flex-shrink-0 flex justify-center items-center w-full md:w-1/3">
              <img
                src="/credit-cards/HDFC-Regalia-Marriott.png"
                alt="HDFC Marriott Bonvoy Card"
                className="w-48 h-auto rounded-xl shadow-md"
                style={{ minWidth: '160px', maxWidth: '200px', transform: 'rotate(-10deg)' }}
              />
            </div>
            {/* Card Details */}
            <div className="flex-1 flex flex-col justify-center items-start">
              <h2 className="text-xl md:text-2xl font-bold text-indigo-800 mb-2">Team's Choice for Hotels</h2>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">HDFC Regalia Marriott Bonvoy Credit Card</h3>
              <ul className="mb-4 pl-0 space-y-2">
                <li className="flex items-center text-base text-gray-700 pl-0 ml-0">
                  <span className="text-green-600 mr-2">✔</span>
                  8X Marriott Bonvoy Points at Marriott hotels
                </li>
                <li className="flex items-center text-base text-gray-700 pl-0 ml-0">
                  <span className="text-green-600 mr-2">✔</span>
                  Complimentary Silver Elite Status
                </li>
                <li className="flex items-center text-base text-gray-700 pl-0 ml-0">
                  <span className="text-green-600 mr-2">✔</span>
                  Free Night Awards on milestone spends
                </li>
                <li className="flex items-center text-base text-gray-700 pl-0 ml-0">
                  <span className="text-green-600 mr-2">✔</span>
                  24 Airport Lounge visits annually
                </li>
              </ul>
              <a
                href="https://www.financialhealth.co.in/credit/hdfc-regalia-marriott"
                className="text-indigo-700 font-semibold hover:underline text-base"
              >
                Know More
              </a>
              {/* Apply Now Gradient Message */}
              <div className="mt-4 rounded-full bg-white flex items-center px-4 py-2 shadow-sm w-full max-w-none md:max-w-[350px] text-left">
                <svg className="w-5 h-5 mr-2 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="2" />
                </svg>
                <span className="font-bold text-sm md:text-base bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                  Apply now and get INR 1000 for successful application
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                Get an AI-powered analysis that helps you understand your credit score, identify areas for improvement, and receive personalized recommendations.
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
                Get an AI-powered analysis that helps you understand your credit score, identify areas for improvement, and receive personalized recommendations.
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

      {/* Credit Assessment Container */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/50 via-transparent to-indigo-600/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-8 relative">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-indigo-400/20 rounded-full text-sm font-medium mb-4">
                Smart Credit Assessment
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Get Instant Credit Assessment
              </h3>
              <p className="text-lg text-white/90 mb-6 max-w-2xl">
                Our AI-powered system analyzes your credit profile and provides personalized recommendations for credit cards and loans that match your financial profile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link 
                  href="/credit-vs-loan-assessment"
                  className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 hover:bg-indigo-50 rounded-lg text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Start Assessment
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Content - Features */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 gap-4">
              <div className="bg-indigo-400/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center border border-indigo-300/20 text-center">
                <div className="flex flex-col items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-indigo-400/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-sm sm:text-lg font-semibold text-white">Smart Matching</h4>
                </div>
                <p className="text-white/80 text-sm hidden sm:block">Get matched with credit products that suit your financial profile and needs.</p>
              </div>
              <div className="bg-indigo-400/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center border border-indigo-300/20 text-center">
                <div className="flex flex-col items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-indigo-400/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-sm sm:text-lg font-semibold text-white">Instant Results</h4>
                </div>
                <p className="text-white/80 text-sm hidden sm:block">Receive immediate assessment and recommendations without any waiting time.</p>
              </div>
              <div className="bg-indigo-400/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center border border-indigo-300/20 text-center">
                <div className="flex flex-col items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-indigo-400/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-sm sm:text-lg font-semibold text-white">No Cost</h4>
                </div>
                <p className="text-white/80 text-sm hidden sm:block">Free assessment with no hidden charges or subscription fees.</p>
              </div>
              <div className="bg-indigo-400/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center border border-indigo-300/20 text-center">
                <div className="flex flex-col items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-indigo-400/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-sm sm:text-lg font-semibold text-white">Privacy First</h4>
                </div>
                <p className="text-white/80 text-sm hidden sm:block">Your data is secure and we never share it without your consent.</p>
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
            <div className="hidden lg:block">
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
    </main>
  )
}

