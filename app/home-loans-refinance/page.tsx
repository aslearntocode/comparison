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
    name: "HDFC Bank",
    logo: "hdfc-logo.png",
    interestRate: "8.5% - 9.5% p.a.",
    processingFee: "Up to 0.5%",
    loanAmount: "₹5 Lakhs - ₹10 Crores",
    tenure: "5 - 30 years",
    features: ["Quick disbursal", "Minimal documentation", "Flexible EMI options"]
  },
  {
    id: 2,
    name: "ICICI Bank",
    logo: "icici-logo.png",
    interestRate: "8.75% - 9.25% p.a.",
    processingFee: "Up to 0.5%",
    loanAmount: "₹5 Lakhs - ₹10 Crores",
    tenure: "5 - 30 years",
    features: ["Instant approval", "Zero prepayment charges", "Online account management"]
  },
  {
    id: 3,
    name: "Axis Bank",
    logo: "axis-logo.png",
    interestRate: "8.49% - 9.25% p.a.",
    processingFee: "Up to 0.5%",
    loanAmount: "₹5 Lakhs - ₹10 Crores",
    tenure: "5 - 30 years",
    features: ["Quick processing", "Competitive rates", "Flexible repayment"]
  }
]

export default function HomeLoansRefinancePageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeLoansRefinance />
    </Suspense>
  )
}

function HomeLoansRefinance() {
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
    currentLoanAmount: '',
    remainingTenure: '',
    currentInterestRate: '',
    employmentType: '',
    monthlyIncome: '',
    city: '',
    propertyType: '',
    hasCoApplicant: '',
    acceptTerms: false
  })

  const resetForm = () => {
    setFormData({
      currentLoanAmount: '',
      remainingTenure: '',
      currentInterestRate: '',
      employmentType: '',
      monthlyIncome: '',
      city: '',
      propertyType: '',
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
      const currentPath = encodeURIComponent('/home-loans-refinance');
      router.push(`/login?redirect=${currentPath}`);
      return;
    }
    
    // Convert string inputs to numbers
    const currentLoanAmount = parseInt(formData.currentLoanAmount.replace(/,/g, '')) || 0
    const remainingTenure = parseInt(formData.remainingTenure) || 0
    const currentInterestRate = parseFloat(formData.currentInterestRate) || 0
    const monthlyIncome = parseInt(formData.monthlyIncome.replace(/,/g, '')) || 0

    // Basic eligibility check
    const isEligible = currentLoanAmount > 0 && remainingTenure > 0 && currentInterestRate > 0 && monthlyIncome > 0

    // Update URL with eligibility parameter
    const params = new URLSearchParams()
    if (isEligible) {
      params.set('eligible', 'banks')
    } else {
      params.set('eligible', 'no_offers')
    }
    router.push(`/home-loans-refinance?${params.toString()}`)
    
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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Home Loan Refinance (Coming Soon)</h1>
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
              <div className="text-green-700 font-semibold text-lg mb-2">Home Loan Refinance</div>
              <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3 leading-tight">
                Get the best offers for your home loan refinance!
              </h1>
              <p className="text-gray-700 text-lg mb-6">
                Financial Health is a platform where we show the best offers through our trusted lending partners. All loan applications are approved and sanctioned by our NBFC/Bank partners registered with the RBI.
              </p>
              {/* Optional Offer Card */}
              {/* <div className="bg-yellow-300 rounded-lg p-4 shadow-md w-fit mb-4">
                <span className="font-medium">On every successful application, customers will earn <span className="bg-yellow-500 text-white px-2 rounded">Amazon vouchers worth INR 500 to 1000</span>.</span>
              </div> */}
            </div>
            {/* Right: Get Started Form */}
            <div ref={formCardRef} className="flex-1 max-w-xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-8 scroll-mt-24">
              <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Get Started</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentLoanAmount">Current Home Loan Amount (₹)</Label>
                    <Input
                      id="currentLoanAmount"
                      type="text"
                      value={formData.currentLoanAmount}
                      onChange={(e) => handleInputChange('currentLoanAmount', e.target.value)}
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="remainingTenure">Remaining Loan Tenure (Months)</Label>
                    <Input
                      id="remainingTenure"
                      type="number"
                      value={formData.remainingTenure}
                      onChange={(e) => handleInputChange('remainingTenure', e.target.value)}
                      placeholder="Enter months"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentInterestRate">Current Interest Rate (%)</Label>
                    <Input
                      id="currentInterestRate"
                      type="number"
                      step="0.01"
                      value={formData.currentInterestRate}
                      onChange={(e) => handleInputChange('currentInterestRate', e.target.value)}
                      placeholder="Enter rate"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="employmentType">Type of Employment</Label>
                    <Select
                      value={formData.employmentType}
                      onValueChange={(value) => handleInputChange('employmentType', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salaried">Salaried</SelectItem>
                        <SelectItem value="self-employed">Self-Employed</SelectItem>
                        <SelectItem value="business">Business Owner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                    <Input
                      id="monthlyIncome"
                      type="text"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                      placeholder="Enter income"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City & Property Location</Label>
                    <Input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Enter city"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => handleInputChange('propertyType', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flat">Flat</SelectItem>
                        <SelectItem value="independent">Independent House</SelectItem>
                        <SelectItem value="under-construction">Under Construction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="hasCoApplicant">Co-applicant</Label>
                    <Select
                      value={formData.hasCoApplicant}
                      onValueChange={(value) => handleInputChange('hasCoApplicant', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={e => handleInputChange('acceptTerms', e.target.checked)}
                    className="w-4 h-4"
                    required
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                    I accept the <Link href="/terms" className="text-green-700 underline">terms and conditions</Link>
                  </label>
                </div>
                <Button type="submit" className="w-full" disabled={!formData.acceptTerms}>Check Eligibility</Button>
              </form>
            </div>
          </div>
        </section>

        {/* Eligibility Check Section */}
        <section ref={eligibilityRef} className="py-8 px-4 sm:px-6 lg:px-8">
          {/* ... existing eligibility form ... */}
        </section>

        {/* EMI Calculator Section */}
        <section ref={calculatorRef} className="w-full bg-white py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">Home Loan Refinance EMI Calculator</h2>
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
