'use client'

import { useState, useEffect, useRef } from 'react'
import Header from "@/components/Header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation'
import Link from "next/link"
import { checkEligibility } from '@/app/utils/eligibility'
import LoanEmiCalculator from '@/components/LoanEmiCalculator'

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
    interestRate: "10.5% - 24% p.a.",
    processingFee: "Up to 2.5%",
    loanAmount: "₹50,000 - ₹40 Lakhs",
    tenure: "12 - 60 months",
    features: ["Quick disbursal", "Minimal documentation", "Flexible EMI options"]
  },
  {
    id: 2,
    name: "ICICI Bank",
    logo: "icici-logo.png",
    interestRate: "10.75% - 19% p.a.",
    processingFee: "Up to 2.25%",
    loanAmount: "₹50,000 - ₹50 Lakhs",
    tenure: "12 - 60 months",
    features: ["Instant approval", "Zero prepayment charges", "Online account management"]
  },
  {
    id: 3,
    name: "Axis Bank",
    logo: "axis-logo.png",
    interestRate: "10.49% - 22% p.a.",
    processingFee: "Up to 2%",
    loanAmount: "₹50,000 - ₹40 Lakhs",
    tenure: "12 - 60 months",
    features: ["Quick processing", "Competitive rates", "Flexible repayment"]
  },
  {
    id: 4,
    name: "InCred Finance",
    logo: "incred-logo.png",
    interestRate: "11% - 24% p.a.",
    processingFee: "Up to 2.5%",
    loanAmount: "₹25,000 - ₹15 Lakhs",
    tenure: "12 - 48 months",
    features: ["Fast approval", "Minimal paperwork", "Attractive interest rates"]
  },
  {
    id: 5,
    name: "Freo Money",
    logo: "freo-logo.png",
    interestRate: "12% - 24% p.a.",
    processingFee: "Up to 2%",
    loanAmount: "₹10,000 - ₹5 Lakhs",
    tenure: "3 - 36 months",
    features: ["Pay for what you use", "Quick disbursal", "Flexible repayment options"]
  }
]

export default function PersonalLoans() {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false)
  const [eligibilityMessage, setEligibilityMessage] = useState<React.ReactNode>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const eligible = searchParams.get('eligible')

  let filteredLenders = lenders
  let showApply = (id: number) => false
  if (eligible === 'incred') {
    filteredLenders = lenders.filter(l => l.name === 'InCred Finance')
    showApply = (id: number) => filteredLenders.some(l => l.id === id)
  } else if (eligible === 'banks') {
    filteredLenders = lenders.filter(l => l.name !== 'InCred Finance')
    showApply = (id: number) => filteredLenders.some(l => l.id === id)
  } else if (eligible === 'no_offers') {
    filteredLenders = []
  }

  const [formData, setFormData] = useState({
    monthlyIncome: '',
    employmentType: '',
    creditScore: '',
    existingLoans: '',
    currentEmi: '',
    loanAmount: '',
    loanTenure: ''
  })

  const resetForm = () => {
    setFormData({
      monthlyIncome: '',
      employmentType: '',
      creditScore: '',
      existingLoans: '',
      currentEmi: '',
      loanAmount: '',
      loanTenure: ''
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Convert string inputs to numbers
    const monthlyIncome = parseInt(formData.monthlyIncome.replace(/,/g, '')) || 0
    const creditScore = parseInt(formData.creditScore) || 0
    const currentEmi = parseInt(formData.currentEmi.replace(/,/g, '')) || 0
    const loanAmount = parseInt(formData.loanAmount.replace(/,/g, '')) || 0
    const loanTenure = parseInt(formData.loanTenure) || 0
    const existingLoans = parseInt(formData.existingLoans) || 0

    // Check eligibility using the utility function
    const result = checkEligibility({
      monthlyIncome,
      employmentType: formData.employmentType as 'salaried' | 'self-employed' | 'business',
      creditScore,
      existingLoans,
      currentEmi,
      loanAmount,
      loanTenure
    })

    // Update URL with eligibility parameter
    const params = new URLSearchParams()
    if (result.eligibleFor !== 'none') {
      params.set('eligible', result.eligibleFor)
    }
    router.push(`/personal-loans?${params.toString()}`)
    
    // Set eligibility message if no offers
    if (result.eligibleFor === 'no_offers') {
      setEligibilityMessage(
        <div>
          We don't have an eligible offer for you right now. Please look at our{' '}
          <Link href="/credit-score-main/score/" className="text-blue-600 hover:underline font-medium">
            credit score
          </Link>
          {' '}that can help you improve your credit score and overall, credit profile.
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

  const lendersRef = useRef<HTMLDivElement>(null)
  const eligibilityRef = useRef<HTMLDivElement>(null)
  const calculatorRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleScroll = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Personal Loans (Coming Soon)</h1>
              <p className="text-lg md:text-xl text-white/90 mb-4 text-center">
                Check eligibility and we will show you the offers that you are likely to get approved for
              </p>
            </div>
          </div>
        </section>

        {/* Sticky Navigation Slider/Tab Bar below hero section - now a direct child of <main> */}
        <div ref={sliderRef} className="sticky top-0.5 z-50 w-full bg-white border-b border-gray-200 shadow-sm" style={{ overflow: 'visible' }}>
          <div className="flex w-full rounded-none bg-white">
            <button
              className="flex-1 py-3 text-blue-700 text-base md:text-lg font-medium hover:bg-blue-50 focus:bg-blue-100 transition-colors"
              onClick={() => handleScroll(eligibilityRef as React.RefObject<HTMLDivElement>)}
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

        {/* Eligibility Message */}
        {eligibilityMessage && (
          <div className="max-w-7xl mx-auto px-4 mt-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {eligibilityMessage}
            </div>
          </div>
        )}

        {/* Back Button below hero section, only when filtered */}
        {(eligible === 'incred' || eligible === 'banks') && (
          <div className="max-w-7xl mx-auto px-4 mt-4">
            <Link href="/personal-loans" className="inline-flex items-center text-blue-600 hover:underline font-medium mb-4">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Personal Loans
            </Link>
          </div>
        )}

        {/* Eligibility Check Section (visible, not just dialog) */}
        <section ref={eligibilityRef} id="eligibility-section" className="my-12">
          <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl shadow-lg p-0 md:p-8">
            {/* Mobile: Heading and offer above form */}
            <div className="block md:hidden px-0 pt-4 pb-2">
              <div className="text-xl font-bold text-blue-900 leading-tight mb-2 text-center max-w-full px-2">Turn your Dreams into Reality<br />with Personal Loans up to ₹50 Lakh!</div>
              <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2 shadow-sm mx-auto mb-2 max-w-sm w-full">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-yellow-700' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z' /></svg>
                <span className="font-semibold text-yellow-800 text-sm">On every successful application, customers will earn <span className="text-yellow-900">Amazon vouchers worth INR 500 to 1000</span>.</span>
              </div>
            </div>
            {/* Left: Headline, subheadline, offer (desktop only) */}
            <div className="hidden md:flex flex-col gap-6 pl-8 justify-start self-start mt-0">
              <div>
                <div className="text-lg font-semibold text-green-700 mb-2">Personal Loan</div>
                <div className="text-3xl font-bold text-blue-900 leading-tight mb-4">Turn your Dreams into Reality<br />with Personal Loans up to ₹50 Lakh!</div>
                <div className="text-base text-gray-700 mb-4 max-w-md">Get personal loans with fast disbursal directly into your bank account. Enjoy a hassle-free online process with minimal documentation!</div>
              </div>
              <div className="mt-2">
                <div className="flex items-center gap-3 px-4 py-4 rounded-2xl max-w-xs shadow-2xl border-0"
                  style={{
                    background: 'linear-gradient(120deg, #fceabb 0%, #f8b500 100%)',
                    transform: 'rotate(-4deg)',
                    boxShadow: '0 8px 32px 0 rgba(255, 193, 7, 0.25), 0 1.5px 8px 0 rgba(0,0,0,0.10)'
                  }}>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8 text-yellow-700 drop-shadow' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z' /></svg>
                  <span className="font-bold text-yellow-900 text-lg drop-shadow-sm">On every successful application, customers will earn <span className="text-white bg-yellow-700 px-2 py-1 rounded">Amazon vouchers worth INR 500 to 1000</span>.</span>
                </div>
              </div>
            </div>
            {/* Right: Form card (always visible, but styled as card on desktop) */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 md:max-w-2xl w-full mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Get Started</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-2 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="monthlyIncome">Monthly Income</Label>
                    <Input
                      id="monthlyIncome"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Enter your monthly income"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="employmentType">Employment Type</Label>
                    <Select
                      value={formData.employmentType}
                      onValueChange={(value) => handleInputChange('employmentType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salaried">Salaried</SelectItem>
                        <SelectItem value="self-employed">Self Employed</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="creditScore">Credit Score</Label>
                    <Input
                      id="creditScore"
                      type="number"
                      placeholder="Enter your credit score"
                      value={formData.creditScore}
                      onChange={(e) => handleInputChange('creditScore', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="existingLoans">Existing Loans</Label>
                    <Select
                      value={formData.existingLoans}
                      onValueChange={(value) => handleInputChange('existingLoans', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of existing loans" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">None</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3+">3 or more</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="currentEmi">Current Monthly Loan EMI (including mortgage EMI)</Label>
                    <Input
                      id="currentEmi"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Enter your current monthly EMI"
                      value={formData.currentEmi || ''}
                      onChange={(e) => handleInputChange('currentEmi', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="loanAmount">Desired Loan Amount</Label>
                    <Input
                      id="loanAmount"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Enter desired loan amount"
                      value={formData.loanAmount}
                      onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="loanTenure">Desired Loan Tenure (months)</Label>
                    <Input
                      id="loanTenure"
                      type="number"
                      placeholder="Enter desired tenure in months"
                      value={formData.loanTenure}
                      onChange={(e) => handleInputChange('loanTenure', e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 mb-4">
                  <input type="checkbox" id="terms" required className="accent-green-600 w-4 h-4" />
                  <label htmlFor="terms" className="text-sm text-gray-700">I accept the <a href="#" className="text-green-700 underline">terms and conditions</a></label>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">Check Eligibility</Button>
                </DialogFooter>
              </form>
              {/* Show eligibility message if present */}
              {eligibilityMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mt-6">
                  {eligibilityMessage}
                </div>
              )}
            </div>
          </div>
        </section>
        {/* Personal Loan EMI Calculator Section */}
        <div ref={calculatorRef} id="emi-calculator-section">
          <div className="max-w-4xl mx-auto px-4 pt-4 pb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              <span className="text-purple-700 font-extrabold">EMI</span> Calculator
            </h2>
            <p className="text-center text-base md:text-lg text-black mb-0">
              You can calculate your monthly loan payment (EMI) in just 3 easy steps! Enter the loan amount, interest rate, and loan term. See how these factors impact your EMI.
            </p>
          </div>
          <LoanEmiCalculator />
        </div>
        {/* Lenders Section */}
        <section className="py-16" ref={lendersRef} id="lenders-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-2">Lending Partners</h2>
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
