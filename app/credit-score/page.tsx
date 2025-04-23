'use client'

import Header from "@/components/Header"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { supabase } from "@/lib/supabase"
import { config } from '@/app/config'

const CreditScoreMeter = ({ score }: { score: number }) => {
  // Calculate needle rotation (0 to 180 degrees)
  const rotation = Math.min(Math.max((score / 900) * 180, 0), 180);

  return (
    <div className="relative w-full max-w-[400px] mx-auto mt-8">
      {/* Semi-circular meter background */}
      <div className="relative h-[200px] overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bottom-0 rounded-[50%] bg-gradient-to-r from-red-500 via-yellow-400 to-green-500"></div>
        
        {/* Score ranges */}
        <div className="absolute bottom-0 w-full h-[200px]">
          <div className="relative w-full h-full">
            <span className="absolute left-[5%] bottom-8 text-sm font-semibold">Very Low</span>
            <span className="absolute left-[25%] bottom-8 text-sm font-semibold">Low</span>
            <span className="absolute left-[45%] bottom-8 text-sm font-semibold">Average</span>
            <span className="absolute left-[65%] bottom-8 text-sm font-semibold">Above Avg</span>
            <span className="absolute right-[5%] bottom-8 text-sm font-semibold">Excellent</span>
          </div>
        </div>

        {/* Needle */}
        <div 
          className="absolute bottom-0 left-1/2 w-1 h-[160px] bg-black origin-bottom transform -translate-x-1/2"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="absolute -top-2 left-1/2 w-4 h-4 bg-black rounded-full -translate-x-1/2"></div>
        </div>

        {/* Center point */}
        <div className="absolute bottom-0 left-1/2 w-6 h-6 bg-white border-4 border-black rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Score display */}
      <div className="text-center mt-8">
        <span className="text-4xl font-bold">{score}</span>
        <span className="text-xl text-gray-600">/900</span>
      </div>
    </div>
  );
};

export default function CreditScorePage() {
  const router = useRouter()
  const [structuredData, setStructuredData] = useState<{
    score: number;
    openAccounts: number;
    closedAccounts: number;
    writtenOffAccounts: any[];
    overdueAccounts: any[];
  } | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName || '',
    dob: '',
    mobile: '',
    pdfFile: null as File | null,
    pdfPassword: '',
    acceptTerms: false
  })

  const [reportData, setReportData] = useState<{
    report_created_date: string;
    credit_score: number;
    total_accounts: number;
    active_accounts: Array<{
      account_type: string;
      lender: string;
      credit_limit: number;
      balance: number;
      date_opened: string;
    }>;
    credit_limit: number;
    closed_accounts: number;
    current_balance: number;
    overdue_accounts: Array<{
      account_type: string;
      lender: string;
      overdue_amount: number;
    }>;
    written_off_accounts: any[];
    enquiries: Array<{
      enquiry_date: string;
      enquiry_type: string;
    }>;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.displayName) {
        setFormData(prev => ({...prev, name: user.displayName || ''}))
      }
    })

    return () => unsubscribe()
  }, [])

  const handlePageClick = () => {
    const user = auth.currentUser
    if (!user) {
      const currentPath = encodeURIComponent('/credit/score')
      router.push(`/login?redirect=${currentPath}`)
      return
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const form = e.target as HTMLFormElement
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement
    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement
    
    const user = auth.currentUser
    if (!user) {
      const currentPath = encodeURIComponent('/credit/score')
      router.push(`/login?redirect=${currentPath}`)
      return
    }

    // Check if file is selected from the input element
    const file = fileInput.files?.[0]
    if (!file) {
      alert('Please upload a PDF file')
      return
    }

    try {
      submitButton.disabled = true
      submitButton.textContent = 'Processing...'

      // Create FormData and append file with correct field name
      const pdfFormData = new FormData()
      pdfFormData.append('pdf_file', file)
      if (formData.pdfPassword) {
        pdfFormData.append('password', formData.pdfPassword)
      }

      // Log the FormData contents for debugging
      console.log('FormData contents:', {
        hasFile: pdfFormData.has('pdf_file'),
        fileType: file.type,
        fileSize: file.size,
        hasPassword: pdfFormData.has('password')
      })

      // Upload PDF and get analysis
      const analysisResponse = await fetch('/api/analyze/pdf', {
        method: 'POST',
        body: pdfFormData
      })

      const responseData = await analysisResponse.json()

      if (!analysisResponse.ok || !responseData.success) {
        throw new Error(responseData.details || responseData.error || 'Failed to analyze PDF')
      }

      // Set the report data from the response
      setReportData(responseData.data)

      // Save to Supabase with better error handling
      const saveReportToSupabase = async (reportData: any) => {
        try {
          const { data, error } = await supabase
            .from('credit_reports')
            .insert({
              user_id: auth.currentUser?.uid,
              report_analysis: reportData,
              mobile: formData.mobile,
              name: formData.name,
              dob: formData.dob,
              created_at: new Date().toISOString()
            })

          if (error) {
            console.error('Supabase error details:', error);
            throw error;
          }
          return data;
        } catch (error: any) {
          console.error('Error saving report:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          throw error;
        }
      };

      const savedData = await saveReportToSupabase(responseData.data);
      console.log('Successfully saved report:', savedData);

      // Store the analysis data in localStorage for immediate access
      localStorage.setItem('latestCreditReport', JSON.stringify(responseData.data))

    } catch (err: any) {
      console.error('Raw error:', err);
      const errorDetails = {
        message: err?.message || 'Unknown error occurred',
        stack: err?.stack || '',
        details: err?.details || {},
        code: err?.code || '',
        name: err?.name || 'Error'
      };
      console.error('Structured error details:', errorDetails);
      
      let userMessage = 'An error occurred while processing your request. ';
      if (err?.message?.includes('network')) {
        userMessage += 'Please check your internet connection.';
      } else if (err?.message?.includes('validation')) {
        userMessage += 'Please check your input details.';
      } else {
        userMessage += err.message || 'Please try again later.';
      }
      
      alert(userMessage);
    } finally {
      submitButton.disabled = false
      submitButton.textContent = 'Submit'
    }
  }

  const handleOTPVerification = async () => {
    try {
      // 1. Verify OTP
      // 2. Save to Supabase
      // 3. Redirect to report page
      
      await supabase.from('credit_reports').insert({
        user_id: auth.currentUser?.uid,
        report_analysis: {},
        audio_url: ''
      });

      router.push('/credit/score/report');
    } catch (error) {
      console.error('Error during OTP verification:', error);
      alert('An error occurred during OTP verification. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div 
        className="flex-1 bg-gray-50"
        onClick={handlePageClick}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4">
            {/* Steps Section */}
            <div className="w-full">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex items-start p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-medium text-xs">
                      1
                    </div>
                    <div className="ml-2">
                      <h3 className="font-medium text-sm text-gray-800">Login and Enter Details</h3>
                      <p className="text-xs text-gray-600 mt-0.5">Fill in your personal details including name, date of birth, and mobile number</p>
                    </div>
                  </div>

                  <div className="flex items-start p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-medium text-xs">
                      2
                    </div>
                    <div className="ml-2">
                      <h3 className="font-medium text-sm text-gray-800">Upload Credit Report</h3>
                      <p className="text-xs text-gray-600 mt-0.5">Upload your credit report PDF file</p>
                    </div>
                  </div>

                  <div className="flex items-start p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-medium text-xs">
                      3
                    </div>
                    <div className="ml-2">
                      <h3 className="font-medium text-sm text-gray-800">Provide Password</h3>
                      <p className="text-xs text-gray-600 mt-0.5">Enter password if your PDF is password protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Section */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Form Section */}
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 h-full">
                  <h2 className="text-lg font-semibold mb-3 text-gray-800">Enter Your Details</h2>
                  <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="space-y-4">
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input 
                        type="text"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input 
                        type="date"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={formData.dob}
                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                      <input 
                        type="tel"
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit mobile number"
                        placeholder="Enter 10-digit mobile number"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Credit Report (PDF) received from CIBIL or Other Credit Bureaus</label>
                      <input 
                        type="file"
                        name="pdf_file"
                        required
                        accept=".pdf,application/pdf"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            console.log('File selected:', {
                              name: file.name,
                              type: file.type,
                              size: file.size
                            })
                            setFormData(prev => ({...prev, pdfFile: file}))
                          }
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">PDF Password (Optional)</label>
                      <input 
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={formData.pdfPassword || ''}
                        onChange={(e) => setFormData({...formData, pdfPassword: e.target.value})}
                        placeholder="Enter password if PDF is protected"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="flex items-start">
                        <input 
                          type="checkbox"
                          required
                          className="mt-1 mr-2"
                          checked={formData.acceptTerms}
                          onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                        />
                        <span className="text-xs text-gray-600">
                          By clicking submit below, 
                          you allow FHAI Services Pvt Ltd to process your credit report and provide you the summary {' '}
                          <a 
                            href="/terms-and-conditions" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            T&C apply
                          </a>
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors font-medium"
                    >
                      Submit
                    </button>
                  </form>

                  {/* How to get credit report section */}
                  <div className="mt-6 text-center">
                    <button 
                      onClick={() => setShowModal(true)}
                      className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>How to get your credit report?</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Report Summary Section */}
              <div className="w-full md:w-1/2">
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg border border-blue-100 h-full">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Report Summary
                  </h2>
                  <div className="space-y-6">
                    {/* Credit Score Section */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-sm text-gray-800 flex items-center gap-2">
                          <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          Credit Score
                        </h3>
                        <span className="text-xs text-gray-500 bg-white/50 px-2 py-1 rounded-full">
                          Last updated: {reportData?.report_created_date || 'Not available'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center border-2 border-blue-200">
                          <span className="text-2xl font-bold text-gray-800">{reportData?.credit_score || '--'}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {reportData?.credit_score ? 
                              reportData.credit_score >= 750 ? 'Excellent' :
                              reportData.credit_score >= 650 ? 'Good' :
                              reportData.credit_score >= 550 ? 'Fair' : 'Poor' 
                              : 'Score not available'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {reportData?.credit_score ? 
                              `Based on ${reportData.total_accounts} accounts` : 
                              'Upload your report to see your score'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Account Summary Section */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                      <h3 className="font-medium text-sm text-gray-800 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Account Summary
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                          <p className="text-xs text-gray-500">Active Accounts</p>
                          <p className="text-sm font-medium text-gray-800 mt-1">
                            {reportData?.active_accounts?.length || '--'}
                          </p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                          <p className="text-xs text-gray-500">Closed Accounts</p>
                          <p className="text-sm font-medium text-gray-800 mt-1">
                            {reportData?.closed_accounts || '--'}
                          </p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                          <p className="text-xs text-gray-500">Total Credit Limit</p>
                          <p className="text-sm font-medium text-gray-800 mt-1">
                            ₹{reportData?.credit_limit?.toLocaleString('en-IN') || '--'}
                          </p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                          <p className="text-xs text-gray-500">Current Balance</p>
                          <p className="text-sm font-medium text-gray-800 mt-1">
                            ₹{reportData?.current_balance?.toLocaleString('en-IN') || '--'}
                          </p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border-l-4 border-red-400">
                          <p className="text-xs text-gray-500">Written-off Accounts</p>
                          <p className="text-sm font-medium text-gray-800 mt-1">
                            {reportData?.written_off_accounts?.length || '--'}
                          </p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border-l-4 border-orange-400">
                          <p className="text-xs text-gray-500">Overdue Accounts</p>
                          <p className="text-sm font-medium text-gray-800 mt-1">
                            {reportData?.overdue_accounts?.length || '--'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity Section */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                      <h3 className="font-medium text-sm text-gray-800 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Recent Activity
                      </h3>
                      <div className="space-y-2">
                        {reportData?.enquiries && reportData.enquiries.length > 0 ? (
                          reportData.enquiries.map((enquiry, index) => (
                            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                              <p className="text-xs text-gray-500">Recent Enquiry</p>
                              <p className="text-sm font-medium text-gray-800 mt-1">
                                {enquiry.enquiry_type} on {enquiry.enquiry_date}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                            <p className="text-xs text-gray-500">No recent activity</p>
                            <p className="text-xs text-gray-400 mt-1">Upload your report to see your recent credit activities</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Get Your Credit Report</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                You can get your credit report from any of these sources:
              </p>
              
              <div className="space-y-3">
                <a 
                  href="https://www.cibil.com/freecibilscore" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">CIBIL</p>
                    <p className="text-xs text-gray-500">Get your free credit score from CIBIL</p>
                  </div>
                </a>

                <a 
                  href="https://www.experian.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Experian</p>
                    <p className="text-xs text-gray-500">Get your credit report from Experian</p>
                  </div>
                </a>

                <a 
                  href="https://www.crifhighmark.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">CRIF High Mark</p>
                    <p className="text-xs text-gray-500">Get your credit report from CRIF High Mark</p>
                  </div>
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  After getting your report, you can upload it here to get a detailed analysis and personalized recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 