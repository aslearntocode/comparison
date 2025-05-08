'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog } from '@headlessui/react'
import { auth } from '@/lib/firebase'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Header from '@/components/Header'

export default function ResolveComplaints() {
  const router = useRouter()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    issuer: '',
    complaint: ''
  })

  // Check authentication status when component mounts
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Pre-fill form data when user is logged in
        setFormData(prev => ({
          ...prev,
          name: user.displayName || '',
          email: user.email || ''
        }))
      }
    })

    return () => unsubscribe()
  }, [])

  // Handle any form interaction
  const handleFormInteraction = () => {
    if (!auth.currentUser) {
      setIsLoginModalOpen(true)
      return false
    }
    return true
  }

  const handleFormClick = (e: React.MouseEvent) => {
    if (!handleFormInteraction()) {
      e.preventDefault()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!handleFormInteraction()) {
      return
    }
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!handleFormInteraction()) {
      return
    }

    try {
      // First, validate the data
      const complaintData = {
        user_id: auth.currentUser!.uid,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        product: formData.product,
        issuer: formData.issuer,
        complaint: formData.complaint.trim(),
        status: 'pending'
      }

      const { data, error } = await supabase
        .from('complaints')
        .insert([complaintData])
        .select('id, created_at')
        .single()

      if (error) {
        console.error('Supabase error:', error)
        throw new Error(error.message)
      }

      if (!data) {
        throw new Error('No data returned from insert')
      }

      // Reset form
      setFormData({
        name: auth.currentUser!.displayName || '',
        email: auth.currentUser!.email || '',
        phone: '',
        product: '',
        issuer: '',
        complaint: ''
      })

      // Show success message with complaint ID
      alert(`Your complaint has been submitted successfully! Reference ID: ${data.id}`)
    } catch (error) {
      console.error('Error submitting complaint:', error instanceof Error ? error.message : 'Unknown error')
      alert('There was an error submitting your complaint. Please try again.')
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      
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
                className="space-y-4 bg-white rounded-xl shadow-lg p-6"
                onClick={handleFormClick}
                onSubmit={handleFormSubmit}
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
                      disabled={!!auth.currentUser}
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
                      disabled={!!auth.currentUser}
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
                    Submit Complaint
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Our credit experts will review your complaint and get back to you within 24-48 hours
                </p>
              </form>
            </div>

            {/* Image Section replaced with Advantages Box */}
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
                {/* Bottom badge */}
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

      {/* Login Modal */}
      <Dialog
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-xl bg-white p-6">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              Login Required
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 mb-6">
              Please login to submit your complaint. This will help us track and manage your complaints better.
            </Dialog.Description>
            
            <div className="space-y-4">
              <button
                onClick={() => {
                  setIsLoginModalOpen(false)
                  router.push('/login')
                }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsLoginModalOpen(false)
                  router.push('/signup')
                }}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Create Account
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
} 