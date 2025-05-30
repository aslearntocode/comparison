'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import Header from "@/components/Header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation'
import Link from "next/link"
import { auth } from '@/lib/firebase'
import LoanEmiCalculator from "@/components/LoanEmiCalculator"

interface Lender {
  id: number
  name: string
  logo: string
  interestRate: string
  processingFee: string
  loanAmount: string
  tenure: string
  features: string[]
}

const lenders: Lender[] = [
  {
    id: 1,
    name: "Volt Money",
    logo: "volt-logo.png",
    interestRate: "9.5% - 11.5% p.a.",
    processingFee: "Up to 0.5%",
    loanAmount: "₹1 Lakh - ₹5 Crores",
    tenure: "1 - 3 years",
    features: ["Quick disbursal", "No documentation", "Pay for the Used Limit", "Instant approval","Higher Approval Rate"]
  }
]

export default function LoanAgainstMFPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoanAgainstMF />
    </Suspense>
  )
}

function LoanAgainstMF() {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false)
  const [eligibilityMessage, setEligibilityMessage] = useState<React.ReactNode>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const eligible = searchParams.get('eligible')

  let filteredLenders = lenders
  let showApply = (id: number) => false
  if (eligible === 'banks') {
    showApply = (id: number) => filteredLenders.some(l => l.id === id)
  } else if (eligible === 'no_offers') {
    filteredLenders = []
  }

  const [formData, setFormData] = useState({
    mfPortfolioValue: '',
    loanAmount: '',
    employmentType: '',
    monthlyIncome: '',
    city: '',
    mfType: '',
    hasCoApplicant: '',
    acceptTerms: false
  })

  const resetForm = () => {
    setFormData({
      mfPortfolioValue: '',
      loanAmount: '',
      employmentType: '',
      monthlyIncome: '',
      city: '',
      mfType: '',
      hasCoApplicant: '',
      acceptTerms: false
    })
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.acceptTerms) return;
    
    const user = auth.currentUser;
    if (!user) {
      const currentPath = encodeURIComponent('/loan-against-mf');
      router.push(`/login?redirect=${currentPath}`);
      return;
    }
    
    // Convert string inputs to numbers
    const mfPortfolioValue = parseInt(formData.mfPortfolioValue.replace(/,/g, '')) || 0
    const loanAmount = parseInt(formData.loanAmount.replace(/,/g, '')) || 0
    const monthlyIncome = parseInt(formData.monthlyIncome.replace(/,/g, '')) || 0

    // Basic eligibility check
    const isEligible = mfPortfolioValue > 0 && loanAmount > 0 && monthlyIncome > 0 && loanAmount <= mfPortfolioValue * 0.5

    // Update URL with eligibility parameter
    const params = new URLSearchParams()
    if (isEligible) {
      params.set('eligible', 'banks')
    } else {
      params.set('eligible', 'no_offers')
    }
    router.push(`/loan-against-mf?${params.toString()}`)
    
    // Set eligibility message if no offers
    if (!isEligible) {
      setEligibilityMessage(
        <div>
          We don't have an eligible offer for you right now. Please check back later or contact our support team for assistance.
        </div>
      )
    } else {
      setEligibilityMessage(null)
    }
    
    // Close the dialog and reset form
    setIsEligibilityOpen(false)
    resetForm()
  }

  // Prevent background scroll on mobile when dialog is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const lockScroll = () => {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';
    };
    const unlockScroll = () => {
      document.documentElement.style.overflow = '';
      document.body.style.overscrollBehavior = '';
    };
    if (isEligibilityOpen && window.matchMedia('(max-width: 767px)').matches) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => unlockScroll();
  }, [isEligibilityOpen]);

  // Refs for slider navigation
  const lendersRef = useRef<HTMLDivElement>(null)
  const eligibilityRef = useRef<HTMLDivElement>(null)
  const calculatorRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const formCardRef = useRef<HTMLDivElement>(null)

  const handleScroll = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        {/* Blue Hero Section */}
        <section className="w-full bg-blue-700 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Loan Against Mutual Funds</h1>
              <p className="text-lg md:text-xl text-white/90 mb-2">
                Check eligibility and we will show you the offers that you are likely to get approved for
              </p>
            </div>
          </div>
        </section>

        {/* Sticky Navigation Slider/Tab Bar below hero section */}
        <div ref={sliderRef} className="sticky top-0.5 z-50 w-full bg-white border-b border-gray-200 shadow-sm" style={{ overflow: 'visible' }}>
          <div className="flex w-full rounded-none bg-white">
            <button
              className="flex-1 py-3 text-blue-700 text-base md:text-lg font-medium hover:bg-blue-50 focus:bg-blue-100 transition-colors"
              onClick={() => handleScroll(formCardRef as React.RefObject<HTMLDivElement>)}
            >
              Eligibility Check
            </button>
            <button
              className="flex-1 py-3 text-blue-700 text-base md:text-lg font-medium hover:bg-blue-50 focus:bg-blue-100 transition-colors"
              onClick={() => handleScroll(calculatorRef as React.RefObject<HTMLDivElement>)}
            >
              EMI Calculator
            </button>
            <button
              className="flex-1 py-3 text-blue-700 text-base md:text-lg font-medium hover:bg-blue-50 focus:bg-blue-100 transition-colors"
              onClick={() => handleScroll(lendersRef as React.RefObject<HTMLDivElement>)}
            >
              Lending Partners
            </button>
          </div>
        </div>

        {/* Side-by-side Info + Get Started Form Section */}
        <section className="w-full bg-gradient-to-r from-blue-50 to-green-50 py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8 md:gap-12 items-start justify-between">
            {/* Left: Title, Subtitle, Description, Offer */}
            <div className="flex-1 max-w-xl">
              <div className="text-green-700 font-semibold text-lg mb-2">Loan Against Mutual Funds</div>
              <h1 className="text-2xl md:text-4xl font-bold text-blue-900 mb-3 leading-tight">
                Get instant loans against your mutual fund portfolio!
              </h1>
              <div className="hidden sm:block">
                <p className="text-gray-700 text-lg mb-6">
                  Financial Health is a platform where we show the best offers through our trusted lending partners. All loan applications are approved and sanctioned by our NBFC/Bank partners registered with the RBI.
                </p>
              </div>
              {/* Amazon Voucher Offer Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm w-fit mb-4">
                <span className="font-medium text-blue-900">On every successful application, customers will earn <span className="bg-blue-600 text-white px-2 py-1 rounded">Amazon vouchers worth INR 500 to 1,000</span>.</span>
              </div>
            </div>
            {/* Right: FAQs and Apply Now Button */}
            <div ref={formCardRef} className="flex-1 max-w-xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-8 scroll-mt-24">
              <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Frequently Asked Questions</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">What is a Loan Against Mutual Funds?</h3>
                  <p className="text-gray-600 text-sm">A loan against mutual funds allows you to borrow money by pledging your mutual fund units as collateral. This helps you get quick access to funds without selling your investments.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">How much can I borrow?</h3>
                  <p className="text-gray-600 text-sm">You can typically borrow up to 50% of your mutual fund portfolio value. The exact amount depends on the type of mutual funds you hold and their current market value.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">What are the interest rates?</h3>
                  <p className="text-gray-600 text-sm">Interest rates typically range from 9.5% to 11.5% per annum, which is generally lower than personal loans. The exact rate depends on your portfolio value and loan amount.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">What is the loan tenure?</h3>
                  <p className="text-gray-600 text-sm">The loan tenure is usually between 1 to 3 years, giving you flexibility to repay the loan while keeping your mutual fund investments intact.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Can I continue earning returns on my mutual funds?</h3>
                  <p className="text-gray-600 text-sm">Yes, you continue to earn returns on your mutual fund investments even while they are pledged as collateral for the loan.</p>
                </div>
              </div>
              <div className="mt-6">
                <Button 
                  onClick={() => {
                    const user = auth.currentUser;
                    if (!user) {
                      const currentPath = encodeURIComponent('/loan-against-mf');
                      router.push(`/login?redirect=${currentPath}`);
                      return;
                    }
                    router.push('/loan-against-mf/apply');
                  }}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 text-lg py-6"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* EMI Calculator Section */}
        <section ref={calculatorRef} className="w-full bg-white py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">Loan Against MF EMI Calculator</h2>
            <LoanEmiCalculator />
          </div>
        </section>

        {/* Lenders Section */}
        <section ref={lendersRef} className="py-16" id="lenders-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                <span className="text-purple-700 font-extrabold">Lending</span> Partners
              </h2>
              <p className="text-center text-base md:text-lg text-gray-700">We have partnered with lenders to get the best offers for our customers.</p>
            </div>
            {/* Desktop: Table style */}
            <div className="hidden md:block">
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 w-full min-w-0 mx-auto">
                <div className="grid grid-cols-7 gap-2 mb-4 px-3 py-2 bg-gray-50 rounded-lg text-sm font-semibold text-gray-700" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr auto' }}>
                  <div>Lender</div>
                  <div>Interest Rate</div>
                  <div>Processing Fee</div>
                  <div>Loan Amount</div>
                  <div>Tenure</div>
                  <div>Key Features</div>
                  <div></div>
                </div>
                <div className="space-y-0">
                  {filteredLenders.map((lender) => (
                    <div key={lender.id} className="grid grid-cols-7 gap-2 items-center px-2 py-4 md:py-2 md:px-3 border-b last:border-b-0 hover:bg-gray-50 rounded-lg transition-colors" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr auto' }}>
                      {/* Lender Logo & Name */}
                      <div className="flex items-center gap-3">
                        <img src={`/bank-logos/${lender.logo}`} alt={lender.name} className="h-8 w-auto" style={{ maxWidth: 48 }} />
                        <span className="font-semibold text-base md:text-sm">{lender.name}</span>
                      </div>
                      <div>
                        <span className="font-semibold">{lender.interestRate}</span>
                      </div>
                      <div>
                        <span className="font-semibold">{lender.processingFee}</span>
                      </div>
                      <div>
                        <span className="font-semibold">{lender.loanAmount}</span>
                      </div>
                      <div>
                        <span className="font-semibold">{lender.tenure}</span>
                      </div>
                      <div>
                        <ul className="list-disc list-inside text-xs md:text-sm text-gray-700">
                          {lender.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        {showApply(lender.id) && (
                          <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full md:w-auto">Apply Now</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Mobile: Card style */}
            <div className="block md:hidden w-full">
              {filteredLenders.map((lender) => (
                <div key={lender.id} className="bg-white rounded-xl shadow-lg p-4 mb-4 w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={`/bank-logos/${lender.logo}`} alt={lender.name} className="h-8 w-auto" style={{ maxWidth: 48 }} />
                    <span className="font-semibold text-lg">{lender.name}</span>
                  </div>
                  <div className="mb-1 flex text-sm">
                    <span className="font-semibold text-gray-700 min-w-[120px]">Interest Rate:</span>
                    <span className="ml-2">{lender.interestRate}</span>
                  </div>
                  <div className="mb-1 flex text-sm">
                    <span className="font-semibold text-gray-700 min-w-[120px]">Processing Fee:</span>
                    <span className="ml-2">{lender.processingFee}</span>
                  </div>
                  <div className="mb-1 flex text-sm">
                    <span className="font-semibold text-gray-700 min-w-[120px]">Loan Amount:</span>
                    <span className="ml-2">{lender.loanAmount}</span>
                  </div>
                  <div className="mb-1 flex text-sm">
                    <span className="font-semibold text-gray-700 min-w-[120px]">Tenure:</span>
                    <span className="ml-2">{lender.tenure}</span>
                  </div>
                  <div className="mt-2">
                    <span className="block font-semibold text-gray-700 mb-1">Key Features:</span>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {lender.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  {showApply(lender.id) && (
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full mt-4">Apply Now</Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 