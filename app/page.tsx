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
import FeeWaiverChecker from '@/components/FeeWaiverChecker'

interface AllocationItem {
  name: string;
  value: number;
}

interface CreditCardSlide {
  type: 'credit-cards';
  images: string[];
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

  // Update slider data to only include credit cards
  const sliderData: CreditCardSlide[] = [
    {
      type: 'credit-cards',
      images: [
        '/credit-cards/idfc/Mayura-Card-revised-29-Nov.png',
        '/credit-cards/idfc/Select-New-Card_Front.png',
        '/credit-cards/idfc/Ashva-Card-revised-27-Nov.png'
      ]
    }
  ]

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
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderData[0].images.length);
      }, isMobileDevice ? 7000 : 5000); // 7s on mobile, 5s on desktop
    }
    return () => clearInterval(interval);
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
        setCurrentSlide((prev) => (prev + 1) % sliderData[0].images.length);
      } else {
        // Swipe right
        setCurrentSlide((prev) => (prev - 1 + sliderData[0].images.length) % sliderData[0].images.length);
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
                href={cardLinks[currentSlide]}
                className="block"
                aria-label={`View details for card ${currentSlide + 1}`}
              >
                <Image
                  src={sliderData[0].images[currentSlide]}
                  width={240}
                  height={150}
                  alt={`Credit Card ${currentSlide + 1}`}
                  className="rounded-2xl shadow-2xl mx-auto"
                />
              </Link>
            </div>
          </div>
          {/* Carousel Indicators */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {sliderData[0].images.map((_, index) => (
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
      
      {/* Privacy Notice Banner */}
      <div className="bg-blue-600 text-white overflow-hidden">
        <div className="relative flex">
          <div className="py-4 animate-scroll flex whitespace-nowrap">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-base md:text-lg font-medium">
                We respect your privacy — no calls, no data sharing, unless you request it. &nbsp;&nbsp;&nbsp;
              </span>
            </span>
          </div>
          <div className="absolute top-0 py-4 animate-scroll2 flex whitespace-nowrap">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-base md:text-lg font-medium">
                We respect your privacy — no calls, no data sharing, unless you request it. &nbsp;&nbsp;&nbsp;
              </span>
            </span>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Mobile Hero Section - Moved to top */}
          <div className="lg:hidden mb-8">
            <div className="relative w-full h-[200px] flex items-center">
              <div className="relative w-full h-full">
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <Link 
                    href={cardLinks[currentSlide]}
                    className="block"
                    aria-label={`View details for card ${currentSlide + 1}`}
                  >
                    <Image
                      src={sliderData[0].images[currentSlide]}
                      width={240}
                      height={150}
                      alt={`Credit Card ${currentSlide + 1}`}
                      className="rounded-2xl shadow-2xl mx-auto"
                    />
                  </Link>
                </div>
              </div>
              {/* Carousel Indicators */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                {sliderData[0].images.map((_, index) => (
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
              <h1 className="text-[32px] md:text-[48px] leading-tight font-bold mb-6">
                <span className="text-black">Find The Best</span>
                <br />
                <span className="text-[#4F46E5]">Credit Cards in India</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Compare and find the best credit cards in India from multiple banks. Get detailed comparisons of rewards, benefits, and features to choose the perfect card for your lifestyle.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/credit?category=lifetime-free" className="col-span-1">
                  <div className="group bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-600 hover:to-indigo-600 shadow-md hover:shadow-xl border border-blue-200/40 rounded-2xl transition-all duration-200 ease-in-out hover:scale-[1.03] backdrop-blur-sm bg-opacity-90 p-2.5 h-11 text-[1.05rem] gap-2.5 lg:p-3 lg:h-[60px] lg:text-lg lg:gap-3 flex items-center cursor-pointer">
                    <div className="bg-white/30 rounded-full p-1 shadow-inner lg:p-2">
                      <svg className="w-5 h-5 text-white lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-white drop-shadow-sm">Lifetime Free</span>
                  </div>
                </Link>
                <Link href="/credit?category=lifestyle" className="col-span-1">
                  <div className="group bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 shadow-md hover:shadow-xl border border-purple-200/40 rounded-2xl transition-all duration-200 ease-in-out hover:scale-[1.03] backdrop-blur-sm bg-opacity-90 p-2.5 h-11 text-[1.05rem] gap-2.5 lg:p-3 lg:h-[60px] lg:text-lg lg:gap-3 flex items-center cursor-pointer">
                    <div className="bg-white/30 rounded-full p-1 shadow-inner lg:p-2">
                      <svg className="w-5 h-5 text-white lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-white drop-shadow-sm">Lifestyle</span>
                  </div>
                </Link>
                <Link href="/credit?category=premium" className="col-span-1">
                  <div className="group bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-600 hover:to-pink-600 shadow-md hover:shadow-xl border border-pink-200/40 rounded-2xl transition-all duration-200 ease-in-out hover:scale-[1.03] backdrop-blur-sm bg-opacity-90 p-2.5 h-11 text-[1.05rem] gap-2.5 lg:p-3 lg:h-[60px] lg:text-lg lg:gap-3 flex items-center cursor-pointer">
                    <div className="bg-white/30 rounded-full p-1 shadow-inner lg:p-2">
                      <svg className="w-5 h-5 text-white lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-white drop-shadow-sm">Premium</span>
                  </div>
                </Link>
                <Link href="/credit?category=upi" className="col-span-1">
                  <div className="group bg-gradient-to-r from-teal-500 to-pink-500 hover:from-pink-600 hover:to-teal-600 shadow-md hover:shadow-xl border border-teal-200/40 rounded-2xl transition-all duration-200 ease-in-out hover:scale-[1.03] backdrop-blur-sm bg-opacity-90 p-2.5 h-11 text-[1.05rem] gap-2.5 lg:p-3 lg:h-[60px] lg:text-lg lg:gap-3 flex items-center cursor-pointer">
                    <div className="bg-white/30 rounded-full p-1 shadow-inner lg:p-2">
                      <svg className="w-5 h-5 text-white lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-white drop-shadow-sm">UPI</span>
                  </div>
                </Link>
              </div>

              {/* Card Value Calculator - Separated and visually distinct */}
              <div className="mt-6 lg:mt-3">
                <Link href="/credit/calculator" className="block">
                  <div className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-600 hover:to-green-600 shadow-md hover:shadow-xl border border-green-200/40 rounded-2xl transition-all duration-200 ease-in-out hover:scale-[1.03] backdrop-blur-sm bg-opacity-90 p-2 h-11 text-base gap-2 lg:p-4 lg:text-lg flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/30 rounded-full p-2 shadow-inner">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white drop-shadow-sm lg:text-lg">Credit Card Value Calculator</h3>
                      </div>
                    </div>
                    <svg className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>
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
                    <a href={cardLinks[currentSlide]} aria-label={`View details for card ${currentSlide + 1}`}
                      tabIndex={0}
                    >
                      <Image
                        src={sliderData[0].images[currentSlide]}
                        width={400}
                        height={250}
                        alt={`Credit Card ${currentSlide + 1}`}
                        className="rounded-2xl shadow-2xl mx-auto hover:scale-105 transition-transform duration-200"
                      />
                    </a>
                  </div>
                </div>
                {/* Carousel Indicators */}
                <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
                  {sliderData[0].images.map((_, index) => (
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
              {/* Our Featured Cards label - simple, stylish text only */}
              <div className="mt-12 flex justify-center">
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
                  Our Featured Cards
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Card vs Personal Loan Comparison Section */}
      <CreditCardVsLoanComparison />

      {/* Credit Score Analysis Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Understand Your Credit Score
                <span className="text-[#4F46E5]"> Better</span>
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
                href="/credit-score"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-colors shadow-lg"
              >
                Analyze Your Credit Report
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Right Content - Visuals */}
            <div className="relative flex flex-col items-center justify-center min-h-[420px]">
              {/* Credit Score Gauge */}
              <div className="relative z-0 flex flex-col items-center justify-center mt-0 lg:mt-24">
                <div className="bg-white rounded-2xl shadow-lg p-2 border border-gray-200">
                  <img src="/Credit-Score-Analysis.png" alt="Credit Score Meter" className="w-120 h-80 object-contain rounded-2xl" />
                </div>
                {/* Floating Cards */}
                {/* <div className="absolute top-10 right-0 flex flex-col gap-4">
                  <div className="bg-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-2 border border-blue-100 mt-8">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2a4 4 0 014-4h2" /></svg>
                    <span className="text-xs font-semibold text-gray-700">Monthly Score Analysis</span>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-2 border border-blue-100">
                    <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>
                    <span className="text-xs font-semibold text-gray-700">Actionable Recommendations</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Waiver Checker Section */}
      <FeeWaiverChecker />

      {/* Learning Center Preview Section */}
      <LearningCenterPreview />

      {/* Complaint Submission Form Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Having Issues with Financial Products?</h2>
            <p className="text-base text-gray-600">Our credit experts are here to help you understand the issue better and get it resolved</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Form Section */}
            <div className="max-w-lg">
              <form 
                className="space-y-4 bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    router.push('/resolve-complaints');
                  }
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name"
                      required
                      disabled={!!user}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email"
                      required
                      disabled={!!user}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">Financial Product</label>
                  <select
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a product</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="personal-loan">Personal Loan</option>
                    <option value="home-loan">Home Loan</option>
                    <option value="car-loan">Car Loan</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="issuer" className="block text-sm font-medium text-gray-700 mb-1">Issuer Name</label>
                  <select
                    id="issuer"
                    name="issuer"
                    value={formData.issuer}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select issuer</option>
                    <option value="axis">Axis Bank</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="idfc">IDFC FIRST Bank</option>
                    <option value="yes">Yes Bank</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="complaint" className="block text-sm font-medium text-gray-700 mb-1">Describe Your Issue</label>
                  <textarea
                    id="complaint"
                    name="complaint"
                    value={formData.complaint}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Please describe your issue in detail"
                    required
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2.5 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Click Here to Register Complaint
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Our credit experts will review your complaint and get back to you within 24-48 hours
                </p>
              </form>
            </div>

            {/* Advantages Section */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 border border-blue-100/20 backdrop-blur-sm relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mb-16 -ml-16"></div>

                <h3 className="text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-8 relative text-center">
                  Many Advantages of Registering a Complaint with Us
                </h3>

                <div className="space-y-8 relative">
                  <div className="flex items-start gap-6 group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
                      <p className="text-gray-900 font-semibold text-lg mb-1">Expert Guidance Throughout</p>
                      <p className="text-gray-600">Our credit experts will guide you till its resolved or closed, providing personalized assistance at every step</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                      </div>
                    </div>
                    <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
                      <p className="text-gray-900 font-semibold text-lg mb-1">Professional Resolution</p>
                      <p className="text-gray-600">No Need to post it on your social media profile and muddy it. We handle your concerns privately and professionally</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
                      <p className="text-gray-900 font-semibold text-lg mb-1">Real-time Tracking</p>
                      <p className="text-gray-600">Track the complaint in a timely manner with regular status updates and progress monitoring</p>
                    </div>
                  </div>
                </div>

                {/* Bottom decorative badge */}
                <div className="mt-8 inline-flex items-center px-4 py-2 bg-blue-600/10 rounded-full">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-blue-600 font-medium">Trusted by thousands of users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
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
    </div>
  )
}

