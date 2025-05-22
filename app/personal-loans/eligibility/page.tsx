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
    monthlyIncome: '',
    employmentType: '',
    creditScore: '',
    existingLoans: '',
    currentEmi: '',
    loanAmount: '',
    loanTenure: ''
  })
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const score = Number(formData.creditScore)
    if (score >= 700 && score <= 750) {
      router.push('/personal-loans?eligible=incred')
    } else if (score > 750) {
      router.push('/personal-loans?eligible=banks')
    } else {
      // Optionally handle other cases
      alert('Sorry, no offers available for your score.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Personal Loans</h1>
              <p className="text-lg md:text-xl text-white/90 mb-4 text-center">
                Check eligibility and we will show you the offers that you are likely to get approved for
              </p>
            </div>
          </div>
        </section>
        <div className="max-w-md w-full mx-auto mt-4 mb-2 flex justify-center md:justify-start">
          <Link href="/personal-loans">
            <Button variant="secondary" className="rounded-lg">
              ← Back to Personal Loans
            </Button>
          </Link>
        </div>
        <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-4 mt-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-center">Check Your Eligibility</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="monthlyIncome">Monthly Income</Label>
              <Input
                id="monthlyIncome"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter your monthly income"
                value={formData.monthlyIncome}
                onChange={e => handleInputChange('monthlyIncome', e.target.value)}
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
              <Label htmlFor="existingLoans">Existing Loans</Label>
              <Select
                value={formData.existingLoans}
                onValueChange={value => handleInputChange('existingLoans', value)}
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
            <div>
              <Label htmlFor="currentEmi">Current Monthly Loan EMI (including mortgage EMI)</Label>
              <Input
                id="currentEmi"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter your current monthly EMI"
                value={formData.currentEmi}
                onChange={e => handleInputChange('currentEmi', e.target.value)}
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