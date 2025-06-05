'use client'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function EligibilityPage() {
  const [formData, setFormData] = useState({
    mfPortfolioValue: '',
    mfHoldingPeriod: '',
    loanAmount: '',
    loanTenure: '',
    creditScore: '',
    employmentType: ''
  })
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const loanAmount = Number(formData.loanAmount)
    
    if (loanAmount <= 1000000) { // 10 lakhs
      router.push('/loan-against-mf?eligible=volt')
    } else {
      router.push('/loan-against-mf?eligible=mirae')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Loan Against Mutual Funds</h1>
              <p className="text-lg md:text-xl text-white/90 mb-4 text-center">
                Check your eligibility for a loan against your mutual funds portfolio
              </p>
            </div>
          </div>
        </section>
        <div className="max-w-md w-full mx-auto mt-4 mb-2 flex justify-center md:justify-start">
          <Link href="/loan-against-mf">
            <Button variant="secondary" className="rounded-lg">
              ← Back to Loan Against MF
            </Button>
          </Link>
        </div>
        <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-4 mt-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-center">Check Your Eligibility</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="mfPortfolioValue">Total Mutual Fund Portfolio Value</Label>
              <Input
                id="mfPortfolioValue"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter your total MF portfolio value"
                value={formData.mfPortfolioValue}
                onChange={e => handleInputChange('mfPortfolioValue', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="mfHoldingPeriod">Average Holding Period (months)</Label>
              <Input
                id="mfHoldingPeriod"
                type="number"
                placeholder="Enter average holding period in months"
                value={formData.mfHoldingPeriod}
                onChange={e => handleInputChange('mfHoldingPeriod', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="employmentType">Employment Type</Label>
              <Select
                value={formData.employmentType}
                onValueChange={value => handleInputChange('employmentType', value)}
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
            <div>
              <Label htmlFor="creditScore">Credit Score</Label>
              <Input
                id="creditScore"
                type="number"
                placeholder="Enter your credit score"
                value={formData.creditScore}
                onChange={e => handleInputChange('creditScore', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="loanAmount">Desired Loan Amount</Label>
              <Input
                id="loanAmount"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter desired loan amount"
                value={formData.loanAmount}
                onChange={e => handleInputChange('loanAmount', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="loanTenure">Desired Loan Tenure (months)</Label>
              <Input
                id="loanTenure"
                type="number"
                placeholder="Enter desired tenure in months"
                value={formData.loanTenure}
                onChange={e => handleInputChange('loanTenure', e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full mt-4">Check Eligibility</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
} 