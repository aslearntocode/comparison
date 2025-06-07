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
  url?: string
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
    features: ["Quick disbursal", "No documentation", "Pay for the Used Limit", "Instant approval", "Higher Approval Rate"],
    url: "https://voltmoney.in/check-loan-eligibility-against-mutual-funds-partner/Platform?platform=FINANCIALHEALTH&showHome=false&showVoltDefaultHeader=false&isRedirection=true"
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
    name: '',
    loanAmount: '',
    acceptTerms: false
  })

  const resetForm = () => {
    setFormData({
      name: '',
      loanAmount: '',
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
    const loanAmount = parseInt(formData.loanAmount.replace(/,/g, '')) || 0

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
          display_name: formData.name,
          loan_amount: loanAmount,
          eligibility_status: true,
          interest_rate: loanAmount <= 1000000 ? 9.5 : 10.5
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Server error response:', responseData);
        throw new Error(responseData.details || responseData.error || 'Failed to save eligibility check data');
      }

      // Update URL with eligibility parameter
      const params = new URLSearchParams()
      if (loanAmount <= 1000000) { // 10 Lakhs
        params.set('eligible', 'volt')
      } else {
        params.set('eligible', 'mirae')
      }
      router.push(`/loan-against-mf?${params.toString()}`)
      
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

  const handleApply = (lender: Lender) => {
    if (!checkLogin()) return;
    
    if (lender.name === "Volt Money" && lender.url) {
      window.open(lender.url, '_blank');
    } else {
      // Handle other lenders
      router.push(`/loan-against-mf/eligibility?lender=${lender.id}`);
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

  // FAQ data array
  const faqs = [
    {
      question: "What is a Loan Against Mutual Funds?",
      answer: (
        <>
          <p className="text-gray-600 text-sm">Loan Against Mutual Funds (LAMF) allows you to borrow money by pledging your mutual fund units as collateral. The process is fully digital - lien marking is done via CAMS or KFintech.</p>
          <p className="text-gray-600 text-sm">It works like an overdraft: withdraw funds as needed, repay at your convenience, and pay interest only on the amount and duration used. A wide range of mutual funds from top AMCs are eligible.</p>
        </>
      )
    },
    {
      question: "How much can I borrow?",
      answer: (
        <p className="text-gray-600 text-sm">You can typically borrow up to 50% of your mutual fund portfolio value. The exact amount depends on the type of mutual funds you hold and their current market value.</p>
      )
    },
    {
      question: "What are the interest rates?",
      answer: (
        <p className="text-gray-600 text-sm">Interest rates typically range from 9.5% to 11.5% per annum, which is generally lower than personal loans. The exact rate depends on your portfolio value and loan amount.</p>
      )
    },
    {
      question: "What is the loan tenure?",
      answer: (
        <p className="text-gray-600 text-sm">The loan tenure is usually between 1 to 3 years, giving you flexibility to repay the loan while keeping your mutual fund investments intact.</p>
      )
    },
    {
      question: "Can I continue earning returns on my mutual funds?",
      answer: (
        <p className="text-gray-600 text-sm">Yes, you continue to earn returns on your mutual fund investments even while they are pledged as collateral for the loan.</p>
      )
    },
    {
      question: "What documents are required?",
      answer: (
        <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
          <li>The whole process is 100% digital, hence you don't need any document in physical form. For quick processing, please keep below handy:
            <ol className="list-decimal list-inside ml-4">
              <li>PAN and Aadhar card number</li>
              <li>Your mobile number linked with mutual fund investments</li>
              <li>Bank account details for account verification and receiving the loan amount</li>
              <li>Debit card or net banking details for setting up the mandate.</li>
            </ol>
          </li>
        </ul>
      )
    },
    {
      question: "Do I have to pay interest on the complete line amount?",
      answer: (
        <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
          <li>No, you do not have to pay interest on the complete line amount.</li>
          <li>Volt Money provides complete flexibility for the customer, and interest is only charged on the amount withdrawn.</li>
          <li>Interest is calculated daily based on the loan outstanding at the end of each day. Let's look at a couple of scenarios to explain:
            <ul className="list-decimal list-inside ml-4">
              <li>If the loan amount at the end of the day is zero, no interest will be charged for that day.</li>
              <li>If an amount is withdrawn, used and repaid within 10 days, you will only be charged interest for the 10 days of utilization.</li>
            </ul>
          </li>
        </ul>
      )
    },
    {
      question: "What is lien marking/pledging of Mutual Funds?",
      answer: (
        <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
          <li>When you take a loan against your mutual funds, we lien mark/pledge your mutual fund units in the name of the lender, so that it cannot be redeemed/sold until you pay back the loan. The lien marking process is done 100% digitally and in real time.</li>
        </ul>
      )
    },
    {
      question: "When will my funds be un-lienmarked?",
      answer: (
        <ul className="text-gray-600 text-sm list-disc list-inside mb-2">
          <li>You have the flexibility to request the removal of the lien from your mutual fund units at any time. Depending on your current loan amount and utilization, you can choose to remove the lien from specific mutual fund units or from all the units you have pledged.</li>
        </ul>
      )
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
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
                      I accept the <Link href="/terms" className="text-green-700 underline">terms and conditions</Link>
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
                          <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full md:w-auto" onClick={() => handleApply(lender)}>Apply Now</Button>
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
                  {(!eligible || eligible === 'no_offers') ? (
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full mt-4" onClick={() => handleScroll(eligibilityRef)}>
                      Check Eligibility
                    </Button>
                  ) : (
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full mt-4" onClick={() => handleApply(lender)}>Apply Now</Button>
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
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border rounded-lg bg-white shadow-sm">
                    <button
                      className="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      aria-expanded={openFaq === idx}
                      aria-controls={`faq-panel-${idx}`}
                    >
                      <span className="font-semibold text-lg text-gray-900">{faq.question}</span>
                      <span className="ml-4 text-xl text-gray-500 transform transition-transform duration-200" style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 8L10 12L14 8" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                    {openFaq === idx && (
                      <div id={`faq-panel-${idx}`} className="px-6 pb-4 pt-0 animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
} 