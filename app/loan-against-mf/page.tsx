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
    interestRate: "10.5% p.a.",
    processingFee: "₹999 + GST",
    loanAmount: "₹10,000 - ₹5 Crores",
    tenure: "3 years",
    features: ["Quick disbursal", "No documentation", "Pay for the Used Limit", "Instant approval","Higher Approval Rate"]
  },
  {
    id: 2,
    name: "Mirae Asset Financial Services",
    logo: "MAFS-logo.png",
    interestRate: "10.5% p.a.",
    processingFee: "₹999 + GST",
    loanAmount: "₹10,000 - ₹3 Crores",
    tenure: "3 years",
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
  let showApply = (id: number) => true

  const [formData, setFormData] = useState({
    mfPortfolioValue: '',
    loanAmount: '',
    employmentType: '',
    monthlyIncome: '',
    acceptTerms: false
  })

  const resetForm = () => {
    setFormData({
      mfPortfolioValue: '',
      loanAmount: '',
      employmentType: '',
      monthlyIncome: '',
      acceptTerms: false
    })
  }

  const checkLogin = () => {
    const user = auth.currentUser;
    if (!user) {
      const currentPath = encodeURIComponent('/loan-against-mf');
      router.push(`/login?redirect=${currentPath}`);
      return false;
    }
    return true;
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      // Save the eligibility check data to the database
      const response = await fetch('/api/lamf/eligibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firebase_user_id: user.uid,
          email: user.email,
          display_name: user.displayName,
          phone_number: user.phoneNumber,
          mutual_fund_portfolio_value: mfPortfolioValue,
          loan_amount: loanAmount,
          loan_tenure_months: 36, // Default to 3 years
          monthly_income: monthlyIncome,
          employment_type: formData.employmentType,
          mutual_fund_holdings: [], // This would be populated with actual holdings in a real scenario
          eligibility_status: isEligible,
          interest_rate: isEligible ? (loanAmount <= 1000000 ? 9.5 : 10.5) : null
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Server error response:', responseData);
        throw new Error(responseData.details || responseData.error || 'Failed to save eligibility check data');
      }

      // Update URL with eligibility parameter
      const params = new URLSearchParams()
      if (isEligible) {
        if (loanAmount <= 1000000) { // 10 Lakhs
          params.set('eligible', 'volt')
        } else {
          params.set('eligible', 'mirae')
        }
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

      // Scroll to lending partners section
      if (lendersRef.current) {
        lendersRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } catch (error) {
      console.error('Error saving eligibility check:', error);
      setEligibilityMessage(
        <div className="text-red-600">
          {error instanceof Error ? error.message : 'Failed to save eligibility check data. Please try again.'}
        </div>
      );
    }
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
  const featuresRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const formCardRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
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
        {!eligible && (
          <div ref={sliderRef} className="sticky top-0.5 z-50 w-full bg-white border-b border-gray-200 shadow-sm" style={{ overflow: 'visible' }}>
            <div className="flex w-full rounded-none bg-white">
              <button
                className="flex-1 py-3 text-blue-700 text-base md:text-lg font-medium hover:bg-blue-50 focus:bg-blue-100 transition-colors"
                onClick={() => handleScroll(eligibilityRef)}
              >
                Eligibility Check
              </button>
              <button
                className="flex-1 py-3 text-blue-700 text-base md:text-lg font-medium hover:bg-blue-50 focus:bg-blue-100 transition-colors"
                onClick={() => handleScroll(calculatorRef)}
              >
                Features & Benefits
              </button>
              <button
                className="flex-1 py-3 text-blue-700 text-base md:text-lg font-medium hover:bg-blue-50 focus:bg-blue-100 transition-colors"
                onClick={() => handleScroll(lendersRef)}
              >
                Lending Partners
              </button>
            </div>
          </div>
        )}

        {/* Side-by-side Info + Get Started Form Section */}
        {!eligible && (
          <section ref={eligibilityRef} className="w-full bg-gradient-to-r from-blue-50 to-green-50 py-10 md:py-16">
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
              {/* Right: Eligibility Form */}
              <div className="flex-1 max-w-xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-8 scroll-mt-24">
                <h2 className="text-2xl md:text-2xl font-extrabold text-blue-900 mb-6 text-center">Check Your Eligibility</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mfPortfolioValue">Mutual Fund Portfolio Value</Label>
                      <Input
                        id="mfPortfolioValue"
                        type="text"
                        placeholder="Enter portfolio value"
                        value={formData.mfPortfolioValue}
                        onChange={(e) => handleInputChange('mfPortfolioValue', e.target.value)}
                        onFocus={checkLogin}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loanAmount">Loan Amount Required</Label>
                      <Input
                        id="loanAmount"
                        type="text"
                        placeholder="Enter loan amount"
                        value={formData.loanAmount}
                        onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                        onFocus={checkLogin}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employmentType">Employment Type</Label>
                      <Select
                        value={formData.employmentType}
                        onValueChange={(value) => handleInputChange('employmentType', value)}
                        onOpenChange={(open) => {
                          if (open) checkLogin();
                        }}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salaried">Salaried</SelectItem>
                          <SelectItem value="self-employed">Self Employed</SelectItem>
                          {/* <SelectItem value="business">Business</SelectItem> */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyIncome">Monthly Income</Label>
                      <Input
                        id="monthlyIncome"
                        type="text"
                        placeholder="Enter monthly income"
                        value={formData.monthlyIncome}
                        onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                        onFocus={checkLogin}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                      onFocus={checkLogin}
                      required
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="acceptTerms" className="text-sm text-gray-600">
                      I agree to the terms and conditions
                    </Label>
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Check Eligibility
                  </Button>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* Features & Benefits Section */}
        {!eligible && (
          <section ref={calculatorRef} className="w-full bg-white py-10 md:py-14">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8 text-center">Features & Benefits of Loan Against Mutual Funds</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Feature 1 */}
                <div className="flex gap-4 items-start">
                  <span className="text-4xl text-orange-500"><i className="fas fa-stopwatch"></i></span>
                  <div>
                    <h3 className="font-bold text-lg text-blue-900 mb-1">Get LAMF Limit Online Within Minutes</h3>
                    <p className="text-gray-700 text-sm">No need to wait for days. Complete 6 simple steps to get an overdraft limit against mutual funds within minutes using the MAFS mobile app. Your application will be processed instantly to provide you with a limit within minutes.</p>
                  </div>
                </div>
                {/* Feature 2 */}
                <div className="flex gap-4 items-start">
                  <span className="text-4xl text-orange-500"><i className="fas fa-ban"></i></span>
                  <div>
                    <h3 className="font-bold text-lg text-blue-900 mb-1">Zero Foreclosure Charges</h3>
                    <p className="text-gray-700 text-sm">No lock-in & no foreclosure charges if you decide to repay your outstanding's early. You can make payment towards your outstanding amount anytime with zero foreclosure charges.</p>
                  </div>
                </div>
                {/* Feature 3 */}
                <div className="flex gap-4 items-start">
                  <span className="text-4xl text-orange-500"><i className="fas fa-bolt"></i></span>
                  <div>
                    <h3 className="font-bold text-lg text-blue-900 mb-1">Instant Disbursal</h3>
                    <p className="text-gray-700 text-sm">MAFS provide access to funds whenever you need them. Get the required amount credited directly to your provided bank account on the same day.</p>
                  </div>
                </div>
                {/* Feature 4 */}
                <div className="flex gap-4 items-start">
                  <span className="text-4xl text-orange-500"><i className="fas fa-list"></i></span>
                  <div>
                    <h3 className="font-bold text-lg text-blue-900 mb-1">Large List of Approved Securities</h3>
                    <p className="text-gray-700 text-sm">Select from a large list of approved mutual funds from different asset management companies (AMCs) in India. You can lien mark mutual funds registered with both CAMS & KFintech (earlier known as KARVY), Registrars & Transfer Agents (RTAs).</p>
                  </div>
                </div>
                {/* Feature 5 */}
                <div className="flex gap-4 items-start">
                  <span className="text-4xl text-orange-500"><i className="fas fa-mobile-alt"></i></span>
                  <div>
                    <h3 className="font-bold text-lg text-blue-900 mb-1">100% Digital Process</h3>
                    <p className="text-gray-700 text-sm">No need of visiting branches or reaching out to relationship managers. With the MAFS mobile app you can complete your entire journey online from your mobile device without any need of submitting physical documents.</p>
                  </div>
                </div>
                {/* Feature 6 */}
                <div className="flex gap-4 items-start">
                  <span className="text-4xl text-orange-500"><i className="fas fa-user-shield"></i></span>
                  <div>
                    <h3 className="font-bold text-lg text-blue-900 mb-1">Retain Ownership</h3>
                    <p className="text-gray-700 text-sm">Allow your mutual funds to achieve long-term goals. You continue to retain ownership of your mutual funds and reap all the benefits that are associated with it.</p>
                  </div>
                </div>
                {/* Feature 7 */}
                <div className="flex gap-4 items-start">
                  <span className="text-4xl text-orange-500"><i className="fas fa-percent"></i></span>
                  <div>
                    <h3 className="font-bold text-lg text-blue-900 mb-1">Attractive Interest Rate</h3>
                    <p className="text-gray-700 text-sm">Avail loan at an attractive Interest rate starting 10.5% p.a (on utilized amount) with flexi payment option. Unlike term loans, interest on LAMF is levied only on the amount you use and for the number of days you utilize.</p>
                  </div>
                </div>
                {/* Feature 8 */}
                <div className="flex gap-4 items-start">
                  <span className="text-4xl text-orange-500"><i className="fas fa-hourglass-half"></i></span>
                  <div>
                    <h3 className="font-bold text-lg text-blue-900 mb-1">Loan Tenure</h3>
                    <p className="text-gray-700 text-sm">The overdraft limit provided against your mutual funds has a tenure of 12 to 36 months and is renewed thereafter.</p>
                  </div>
                </div>
                {/* Feature 9 */}
                <div className="flex gap-4 items-start">
                  <span className="text-4xl text-orange-500"><i className="fas fa-arrow-up"></i></span>
                  <div>
                    <h3 className="font-bold text-lg text-blue-900 mb-1">Higher Loan Value</h3>
                    <p className="text-gray-700 text-sm">One place for all your financial requirements. You can get up to 80% of your mutual funds portfolio value as loan against your mutual funds.</p>
                  </div>
                </div>
                {/* Feature 10 */}
                <div className="flex gap-4 items-start">
                  <span className="text-4xl text-orange-500"><i className="fas fa-rupee-sign"></i></span>
                  <div>
                    <h3 className="font-bold text-lg text-blue-900 mb-1">Easy Repayment</h3>
                    <p className="text-gray-700 text-sm">Manage your funds with more flexibility. You are required to service the interest only on the utilized amount and can repay the principal as per your convenience.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Lenders Section */}
        <section ref={lendersRef} className="py-16" id="lenders-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                <span className="text-purple-700 font-extrabold">Lending</span> Partners
              </h2>
              {eligible && eligible !== 'no_offers' && (
                <p className="text-center text-base md:text-lg text-green-600 font-medium mb-4">
                  You are eligible to apply with the below lending partner
                </p>
              )}
              {eligible === 'no_offers' && (
                <p className="text-center text-base md:text-lg text-red-600 font-medium mb-4">
                  We don't have an eligible offer for you right now. Please check back later or contact our support team for assistance.
                </p>
              )}
              {!eligible && (
                <p className="text-center text-base md:text-lg text-gray-700">We have partnered with lenders to get the best offers for our customers.</p>
              )}
            </div>
            {/* Desktop: Table style */}
            <div className="hidden md:block">
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 w-full min-w-0 mx-auto">
                <div className="grid grid-cols-7 gap-2 mb-4 px-3 py-2 bg-gray-50 rounded-lg text-sm font-semibold text-gray-700">
                  <div className="text-center">Lender</div>
                  <div className="text-center">Interest Rate</div>
                  <div className="text-center">Processing Fee</div>
                  <div className="text-left">Loan Amount</div>
                  <div className="text-left">Tenure</div>
                  <div className="text-left">Key Features</div>
                  <div className="text-center"></div>
                </div>
                <div className="space-y-0">
                  {filteredLenders.map((lender) => (
                    <div key={lender.id} className="grid grid-cols-7 gap-2 items-center px-2 py-4 md:py-2 md:px-3 border-b last:border-b-0 hover:bg-gray-50 rounded-lg transition-colors" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1.5fr auto' }}>
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
                      <div className="flex justify-center items-center">
                        {(!eligible || eligible === 'no_offers') ? (
                          <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full md:w-auto" onClick={() => handleScroll(eligibilityRef)}>
                            Check Eligibility
                          </Button>
                        ) : (
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

        {/* FAQ Section */}
        {!eligible && (
          <section ref={faqRef} className="w-full bg-white py-10 md:py-14">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">What is a Loan Against Mutual Funds?</h3>
                  <p className="text-gray-600 text-sm">Loan Against Mutual Funds (LAMF) allows you to borrow money by pledging your mutual fund units as collateral. The process is fully digital - lien marking is done via CAMS or KFintech.</p>
                  <p className="text-gray-600 text-sm">It works like an overdraft: withdraw funds as needed, repay at your convenience, and pay interest only on the amount and duration used. A wide range of mutual funds from top AMCs are eligible.</p>
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
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">What documents are required?</h3>
                  <p className="text-gray-600 text-sm">The process is mostly digital and requires minimal documentation. You'll need your PAN card, Aadhaar card, and mutual fund statements. The lien marking process is handled digitally through CAMS or KFintech.</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
} 