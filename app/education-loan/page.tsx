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
    logo: "/bank-logos/hdfc-logo.png",
    interestRate: "8.5% - 9.5% p.a.",
    processingFee: "Up to 0.5%",
    loanAmount: "₹2 Lakhs - ₹50 Lakhs",
    tenure: "1 - 15 years",
    features: ["Quick disbursal", "Minimal documentation", "Flexible EMI options"]
  },
  {
    id: 2,
    name: "ICICI Bank",
    logo: "/bank-logos/icici-logo.png",
    interestRate: "8.75% - 9.25% p.a.",
    processingFee: "Up to 0.5%",
    loanAmount: "₹2 Lakhs - ₹50 Lakhs",
    tenure: "1 - 15 years",
    features: ["Instant approval", "Zero prepayment charges", "Online account management"]
  },
  {
    id: 3,
    name: "Axis Bank",
    logo: "/bank-logos/axis-logo.png",
    interestRate: "8.49% - 9.25% p.a.",
    processingFee: "Up to 0.5%",
    loanAmount: "₹2 Lakhs - ₹50 Lakhs",
    tenure: "1 - 15 years",
    features: ["Quick processing", "Competitive rates", "Flexible repayment"]
  }
]

export default function EducationLoanPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EducationLoan />
    </Suspense>
  )
}

function EducationLoan() {
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
    name: '',
    gender: '',
    courseType: '',
    courseDuration: '',
    loanAmount: '',
    employmentType: '',
    city: '',
    hasCoApplicant: '',
    collateral: '',
    coApplicantIncome: '',
    coApplicantEmi: '',
    referralSource: '',
    acceptTerms: false,
    loanType: 'education-loan',
    whatsapp: 'no',
    offerLetter: 'no',
    courseStartYear: '',
    courseStartMonth: '',
    courseLevel: '',
    courseDegree: '',
    courseName: '',
    targetCountry: '',
    collegeName: ''
  })

  const resetForm = () => {
    setFormData({
      name: '',
      gender: '',
      courseType: '',
      courseDuration: '',
      loanAmount: '',
      employmentType: '',
      city: '',
      hasCoApplicant: '',
      collateral: '',
      coApplicantIncome: '',
      coApplicantEmi: '',
      referralSource: '',
      acceptTerms: false,
      loanType: 'education-loan',
      whatsapp: 'no',
      offerLetter: 'no',
      courseStartYear: '',
      courseStartMonth: '',
      courseLevel: '',
      courseDegree: '',
      courseName: '',
      targetCountry: '',
      collegeName: ''
    })
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    const user = auth.currentUser;
    if (!user) {
      const currentPath = encodeURIComponent('/education-loan');
      router.push(`/login?redirect=${currentPath}`);
      return;
    }
    
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
      const currentPath = encodeURIComponent('/education-loan');
      router.push(`/login?redirect=${currentPath}`);
      return;
    }
    
    // Convert string inputs to numbers
    const loanAmount = parseInt(formData.loanAmount.replace(/,/g, '')) || 0
    const courseDuration = parseInt(formData.courseDuration) || 0

    // Basic eligibility check
    const isEligible = loanAmount > 0 && courseDuration > 0

    // Update URL with eligibility parameter
    const params = new URLSearchParams()
    if (isEligible) {
      params.set('eligible', 'banks')
    } else {
      params.set('eligible', 'no_offers')
    }
    router.push(`/education-loan?${params.toString()}`)
    
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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Education Loan (Coming Soon)</h1>
              <p className="text-lg md:text-xl text-white/90 mb-2">
                Check eligibility and we will show you the best education loan offers
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
              <div className="text-green-700 font-semibold text-lg mb-2">Education Loan</div>
              <h1 className="text-2xl md:text-4xl font-bold text-blue-900 mb-3 leading-tight">
                Finance your education with the best loan offers!
              </h1>
              <div className="hidden sm:block">
                <p className="text-gray-700 text-lg mb-6">
                  Get access to education loans from top banks and financial institutions. We help you find the best rates and terms for your educational journey.
                </p>
              </div>
              {/* Amazon Voucher Offer Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm w-fit mb-4">
                <span className="font-medium text-blue-900">On every successful application, customers will earn <span className="bg-blue-600 text-white px-2 py-1 rounded">Amazon vouchers worth INR 1,500 to 5,000</span>.</span>
              </div>
            </div>

            {/* Right: Get Started Form */}
            <div ref={formCardRef} className="flex-1 max-w-xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-8 scroll-mt-24">
              <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Get Started</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="col-span-1">
                    <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={e => handleInputChange('name', e.target.value)}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  {/* Gender */}
                  <div className="col-span-1">
                    <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange('gender', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                        <SelectItem value="O">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Education Section Heading */}
                  <div className="col-span-2 mt-4">
                    <h3 className="text-xl font-semibold">Tell more about the education you want us to finance</h3>
                  </div>
                  {/* Offer Letter */}
                  <div className="col-span-2">
                    <Label>Do you have a college offer letter? <span className="text-red-500">*</span></Label>
                    <div className="flex items-center gap-6 mt-2">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="offerLetter" value="yes" checked={formData.offerLetter === 'yes'} onChange={() => handleInputChange('offerLetter', 'yes')} required className="accent-purple-700" />
                        Yes
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="offerLetter" value="no" checked={formData.offerLetter === 'no'} onChange={() => handleInputChange('offerLetter', 'no')} required className="accent-purple-700" />
                        No
                      </label>
                    </div>
                  </div>
                  {/* Education fields if offerLetter is yes */}
                  {formData.offerLetter === 'yes' && <>
                    {/* Tentative Course Start Year */}
                    <div>
                      <Label htmlFor="courseStartYear">Tentative Course Start Year <span className="text-red-500">*</span></Label>
                      <select
                        id="courseStartYear"
                        value={formData.courseStartYear || ''}
                        onChange={e => handleInputChange('courseStartYear', e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                      >
                        <option value="" disabled>Select from dropdown</option>
                        {Array.from({length: 6}, (_, i) => new Date().getFullYear() + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    {/* Tentative Course Start Month */}
                    <div>
                      <Label htmlFor="courseStartMonth">Tentative Course Start Month <span className="text-red-500">*</span></Label>
                      <select
                        id="courseStartMonth"
                        value={formData.courseStartMonth || ''}
                        onChange={e => handleInputChange('courseStartMonth', e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                      >
                        <option value="" disabled>Select from Dropdown</option>
                        {['January','February','March','April','May','June','July','August','September','October','November','December'].map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </div>
                    {/* Target Course Level */}
                    <div>
                      <Label htmlFor="courseLevel">Target Course Level <span className="text-red-500">*</span></Label>
                      <select
                        id="courseLevel"
                        value={formData.courseLevel || ''}
                        onChange={e => handleInputChange('courseLevel', e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                      >
                        <option value="" disabled>Please select</option>
                        <option value="undergraduate">Undergraduate</option>
                        <option value="postgraduate">Postgraduate</option>
                        <option value="phd">PhD</option>
                        <option value="diploma">Diploma</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {/* Target Course Degree */}
                    <div>
                      <Label htmlFor="courseDegree">Target Course Degree <span className="text-red-500">*</span></Label>
                      <select
                        id="courseDegree"
                        value={formData.courseDegree || ''}
                        onChange={e => handleInputChange('courseDegree', e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                      >
                        <option value="" disabled>Select</option>
                        <option value="bachelors">Bachelors</option>
                        <option value="masters">Masters</option>
                        <option value="phd">PhD</option>
                        <option value="diploma">Diploma</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {/* Target Course Name */}
                    <div>
                      <Label htmlFor="courseName">Target Course Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="courseName"
                        type="text"
                        value={formData.courseName}
                        onChange={e => handleInputChange('courseName', e.target.value)}
                        placeholder="Masters in Computer Science"
                        required
                      />
                      <div className="text-xs text-gray-500 mt-1">Eg: Masters in Computer Science</div>
                    </div>
                    {/* Target Country */}
                    <div>
                      <Label htmlFor="targetCountry">Target Country <span className="text-red-500">*</span></Label>
                      <select
                        id="targetCountry"
                        value={formData.targetCountry || ''}
                        onChange={e => handleInputChange('targetCountry', e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                      >
                        <option value="" disabled>Select</option>
                        <option value="india">India</option>
                        <option value="usa">USA</option>
                        <option value="uk">UK</option>
                        <option value="canada">Canada</option>
                        <option value="australia">Australia</option>
                        <option value="germany">Germany</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {/* Target College/University */}
                    <div className="col-span-2">
                      <Label htmlFor="collegeName">Target College/University <span className="text-red-500">*</span></Label>
                      <Input
                        id="collegeName"
                        type="text"
                        value={formData.collegeName}
                        onChange={e => handleInputChange('collegeName', e.target.value)}
                        placeholder="Eg: University of Texas Dallas"
                        required
                      />
                      {/* <div className="text-xs text-gray-500 mt-1">Please continue typing even if you don't find your institute in the list</div> */}
                    </div>

                    {/* Collateral and other details section */}
                    <div className="col-span-2 mt-8">
                      <h3 className="text-xl font-semibold mb-4">Collateral and other details</h3>
                    </div>
                    {/* Required Loan Amount (moved here) */}
                    <div className="col-span-1">
                      <Label htmlFor="loanAmount">Required Loan Amount <span className="text-red-500">*</span></Label>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-700 rounded-l-md">INR</span>
                        <Input
                          id="loanAmount"
                          type="text"
                          value={formData.loanAmount}
                          onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                          placeholder="20,00,000"
                          className="rounded-l-none"
                          required
                        />
                        <span className="ml-2 cursor-pointer" title="Minimum: 7.5 Lakhs and Maximum: 2 Crores">
                          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-700"><circle cx="12" cy="12" r="10" strokeWidth="2"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01"/></svg>
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Minimum: 7.5 Lakhs and Maximum: 2 Crores</div>
                    </div>
                    {/* Security/Collateral */}
                    <div className="col-span-1">
                      <Label>Security/Collateral <span className="text-red-500">*</span></Label>
                      <div className="flex items-center gap-4 mt-2">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input type="radio" name="collateral" value="yes" checked={formData.collateral === 'yes'} onChange={() => handleInputChange('collateral', 'yes')} required className="accent-purple-700" />
                          Yes
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input type="radio" name="collateral" value="no" checked={formData.collateral === 'no'} onChange={() => handleInputChange('collateral', 'no')} required className="accent-purple-700" />
                          No
                        </label>
                        <span className="ml-2 cursor-pointer" title="Collateral/Security is required for some education loans.">
                          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-700"><circle cx="12" cy="12" r="10" strokeWidth="2"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01"/></svg>
                        </span>
                      </div>
                    </div>
                    {/* Co-Applicant fields: only show if collateral is 'yes' */}
                    {formData.collateral === 'yes' && <>
                      <div className="col-span-1">
                        <Label htmlFor="coApplicantIncome">Co-Applicant's Monthly Income <span className="text-red-500">*</span></Label>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-700 rounded-l-md">INR</span>
                          <Input
                            id="coApplicantIncome"
                            type="text"
                            value={formData.coApplicantIncome}
                            onChange={(e) => handleInputChange('coApplicantIncome', e.target.value)}
                            placeholder="1,00,000"
                            className="rounded-l-none"
                            required
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Minimum: 0 and Maximum: 1 Crore</div>
                      </div>
                      <div className="col-span-1">
                        <Label htmlFor="coApplicantEmi">Co-Applicant's Existing Monthly EMIs <span className="text-red-500">*</span></Label>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-700 rounded-l-md">INR</span>
                          <Input
                            id="coApplicantEmi"
                            type="text"
                            value={formData.coApplicantEmi}
                            onChange={(e) => handleInputChange('coApplicantEmi', e.target.value)}
                            placeholder="50,000"
                            className="rounded-l-none"
                            required
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Minimum: 0 and Maximum: 1 Crore</div>
                      </div>
                    </>}
                    {/* Where Did You First Hear About Us? */}
                    <div className="col-span-2 mt-6">
                      <Label htmlFor="referralSource">Where Did You First Hear About Us? <span className="text-red-500">*</span></Label>
                      <select
                        id="referralSource"
                        value={formData.referralSource || ''}
                        onChange={e => handleInputChange('referralSource', e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                      >
                        <option value="" disabled>Select</option>
                        <option value="google">Google</option>
                        <option value="facebook">Facebook</option>
                        <option value="instagram">Instagram</option>
                        <option value="friend">Friend/Family</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </>}
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

        {/* EMI Calculator Section */}
        <section ref={calculatorRef} className="w-full py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Calculate Your EMI</h2>
            <LoanEmiCalculator />
          </div>
        </section>

        {/* Lenders Section */}
        <section ref={lendersRef} className="w-full py-16 bg-gray-50">
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
                        <img src={lender.logo} alt={lender.name} className="h-8 w-auto" style={{ maxWidth: 48 }} />
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
                        {showApply(lender.id) ? (
                          <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full md:w-auto">Apply Now</Button>
                        ) : null}
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
                    <img src={lender.logo} alt={lender.name} className="h-8 w-auto" style={{ maxWidth: 48 }} />
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
                  {showApply(lender.id) ? (
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full mt-4">Apply Now</Button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
