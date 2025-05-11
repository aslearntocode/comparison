'use client'

import { useState, useRef } from 'react'
import { creditCards } from '@/app/data/creditCards'
import Header from '@/components/Header'
import { Card } from '@/types/card'

interface CalculationResults {
  reward_points: number;
  welcome_benefits: number;
  other_benefits: number;
  lounge_benefits: {
    domestic_visits: number;
    international_visits: number;
    domestic_value: number;
    international_value: number;
    total_value: number;
  };
  total_benefits_year1: number;
  total_benefits_year2: number;
  joining_fee: number;
  annual_fee: number;
  is_fee_waived: boolean;
  net_value_year1: number;
  net_value_year2: number;
  fee_waiver_criteria: number;
}

export default function CalculatorPage() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [annualSpendLakhs, setAnnualSpendLakhs] = useState<string>('')
  const [showResults, setShowResults] = useState(false)
  const [calculationResults, setCalculationResults] = useState<CalculationResults | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardSearch, setCardSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredCards = creditCards.filter(card =>
    card.name.toLowerCase().includes(cardSearch.toLowerCase()) ||
    card.bank.toLowerCase().includes(cardSearch.toLowerCase())
  )

  const handleCardSelect = (cardId: string) => {
    const card = creditCards.find(c => c.id === cardId)
    setSelectedCard(card || null)
    setShowResults(false)
    setCalculationResults(null)
    setError(null)
    setCardSearch(card ? `${card.name} - ${card.bank}` : '')
    setShowDropdown(false)
  }

  const calculateCardValue = async () => {
    if (!selectedCard) return
    if (!annualSpendLakhs || isNaN(Number(annualSpendLakhs))) {
      setError('Please enter a valid annual spend amount')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log('Sending calculation request:', {
        card_name: selectedCard.name,
        annual_spend: Number(annualSpendLakhs) * 100000 // Convert lakhs to actual amount
      })

      const response = await fetch('/api/analyze/calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          card_name: selectedCard.name,
          annual_spend: Number(annualSpendLakhs) * 100000 // Convert lakhs to actual amount
        }),
      })

      console.log('Received response:', {
        status: response.status,
        ok: response.ok
      })

      const data = await response.json()
      console.log('Response data:', data)

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || 'Failed to calculate card value')
      }

      if (!data.data || typeof data.data !== 'object') {
        throw new Error('Invalid response format from server')
      }

      // Use correct annual fee based on is_fee_waived
      const annualFeeForCalc = data.data.is_fee_waived ? 0 : Math.abs(data.data.annual_fee);
      setCalculationResults({
        ...data.data,
        annual_fee: annualFeeForCalc, // for display
        net_value_year1:
          data.data.reward_points +
          data.data.welcome_benefits +
          data.data.other_benefits +
          data.data.lounge_benefits.total_value -
          Math.abs(data.data.joining_fee),
        net_value_year2:
          data.data.reward_points +
          data.data.other_benefits +
          data.data.lounge_benefits.total_value -
          annualFeeForCalc,
      })
      setShowResults(true)
    } catch (err) {
      console.error('Calculation error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to calculate card value. Please try again.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Section - matches category pages */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-[160px] bg-gradient-to-r from-blue-600 to-blue-700" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-10">
            <h1 className="text-4xl font-bold text-white mb-3 font-serif tracking-wide">
              Card Value Calculator
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8 font-sans">
              Calculate the true value of your credit card rewards and benefits for your spending profile
            </p>
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            {/* Card Selection */}
            <div className="relative">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Type The Name Of The Credit Card
              </label>
              <input
                ref={inputRef}
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type card name or bank..."
                value={cardSearch}
                onChange={e => {
                  setCardSearch(e.target.value)
                  setShowDropdown(true)
                  setSelectedCard(null)
                  setShowResults(false)
                  setCalculationResults(null)
                  setError(null)
                }}
                onFocus={() => setShowDropdown(true)}
                autoComplete="off"
              />
              {showDropdown && cardSearch && filteredCards.length > 0 && (
                <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-56 overflow-y-auto shadow-lg">
                  {filteredCards.map(card => (
                    <li
                      key={card.id}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                      onClick={() => handleCardSelect(card.id)}
                    >
                      {card.name} - {card.bank}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {selectedCard && (
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                {/* Card Details & Inputs */}
                <div className="border rounded-lg p-4 bg-white md:w-1/2 w-full">
                  {/* Fees Section */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold mb-3">Fees & Charges</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Annual Fee</p>
                        <p className="font-medium">{selectedCard.annualFee}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Joining Fee</p>
                        <p className="font-medium">{selectedCard.joiningFee}</p>
                      </div>
                      {selectedCard.additionalDetails?.minimumSpend && (
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">Annual Fee Waiver Criteria</p>
                          <p className="font-medium">{selectedCard.additionalDetails.minimumSpend}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Annual Spend Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Spend (in Lakhs)
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={annualSpendLakhs}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Only allow numbers and decimal point
                        if (value === '' || /^\d*\.?\d*$/.test(value)) {
                          setAnnualSpendLakhs(value);
                        }
                      }}
                      placeholder="Enter your annual spend in lakhs"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {annualSpendLakhs ? `Total Annual Spend: ₹${(Number(annualSpendLakhs) * 100000).toLocaleString()}` : ''}
                    </p>
                  </div>

                  <button
                    onClick={calculateCardValue}
                    disabled={isLoading}
                    className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-6 ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? 'Calculating...' : 'Calculate Value'}
                  </button>
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>

                {/* Results */}
                {showResults && calculationResults && (
                  <div className="border rounded-lg p-4 bg-blue-50 md:w-1/2 w-full md:max-w-2xl mx-auto">
                    <h3 className="text-lg font-semibold mb-4">Card Value Analysis</h3>
                    <div className="grid grid-cols-2 md:gap-3 gap-6 bg-blue-50 md:p-2 p-4 rounded-xl md:max-w-xl mx-auto">
                      {/* Column headers */}
                      <div className="font-semibold md:text-base text-lg mb-2">Year 1 Value</div>
                      <div className="font-semibold md:text-base text-lg mb-2">Year 2 Onwards Value</div>

                      {/* Reward Points */}
                      <div className="bg-white md:p-2 p-3 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1 md:mb-0.5 md:text-xs">Reward Points Value</p>
                        <p className="font-medium md:text-base">₹{calculationResults.reward_points.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                      </div>
                      <div className="bg-white md:p-2 p-3 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1 md:mb-0.5 md:text-xs">Reward Points Value</p>
                        <p className="font-medium md:text-base">₹{calculationResults.reward_points.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                      </div>

                      {/* Other Benefits (was Travel Benefits) */}
                      <div className="bg-white md:p-2 p-3 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1 md:mb-0.5 md:text-xs">Other Benefits</p>
                        <p className="font-medium md:text-base">₹{calculationResults.other_benefits.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                      </div>
                      <div className="bg-white md:p-2 p-3 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1 md:mb-0.5 md:text-xs">Other Benefits</p>
                        <p className="font-medium md:text-base">₹{calculationResults.other_benefits.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                      </div>

                      {/* Lounge Benefits */}
                      <div className="bg-white md:p-2 p-3 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1 md:mb-0.5 md:text-xs">Lounge Benefits</p>
                        <p className="font-medium md:text-base">₹{calculationResults.lounge_benefits.total_value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        <p className="text-xs text-gray-500 mt-1 md:mt-0.5">
                          {calculationResults.lounge_benefits.domestic_visits} Domestic + {calculationResults.lounge_benefits.international_visits} International visits
                        </p>
                      </div>
                      <div className="bg-white md:p-2 p-3 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1 md:mb-0.5 md:text-xs">Lounge Benefits</p>
                        <p className="font-medium md:text-base">₹{calculationResults.lounge_benefits.total_value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        <p className="text-xs text-gray-500 mt-1 md:mt-0.5">
                          {calculationResults.lounge_benefits.domestic_visits} Domestic + {calculationResults.lounge_benefits.international_visits} International visits
                        </p>
                      </div>

                      {/* Joining Fee / Annual Fee */}
                      <div className="bg-white md:p-2 p-3 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1 md:mb-0.5 md:text-xs">Joining Fee</p>
                        <p className="font-medium text-red-600 md:text-base">-₹{calculationResults.joining_fee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                      </div>
                      <div className="bg-white md:p-2 p-3 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1 md:mb-0.5 md:text-xs">Annual Fee</p>
                        <p className="font-medium text-red-600 md:text-base">-₹{calculationResults.annual_fee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                      </div>

                      {/* Welcome Benefits (second last row, only Year 1) */}
                      <div className="bg-white md:p-2 p-3 rounded-lg col-span-1 flex flex-col justify-between">
                        <p className="text-sm text-gray-500 mb-1 md:mb-0.5 md:text-xs">Welcome Benefits</p>
                        <p className="font-medium md:text-base">₹{calculationResults.welcome_benefits.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                      </div>
                      {/* Empty cell for alignment */}
                      <div></div>

                      {/* Net Value (last row) */}
                      <div className="bg-white md:p-2 p-3 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1 md:mb-0.5 md:text-xs">Net Value Year 1</p>
                        <p className={`font-medium ${calculationResults.net_value_year1 > 0 ? 'text-green-600' : 'text-red-600'} md:text-base`}>₹{calculationResults.net_value_year1.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                      </div>
                      <div className="bg-white md:p-2 p-3 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1 md:mb-0.5 md:text-xs">Net Value Year 2</p>
                        <p className={`font-medium ${calculationResults.net_value_year2 > 0 ? 'text-green-600' : 'text-red-600'} md:text-base`}>₹{calculationResults.net_value_year2.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 