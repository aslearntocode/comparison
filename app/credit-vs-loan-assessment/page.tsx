'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

const loanTypes = [
  { value: 'personal_loan', label: 'Personal Loan' },
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'home_loan', label: 'Home Loan' },
  { value: 'car_loan', label: 'Car Loan' },
  { value: 'other', label: 'Other' },
];

// Helper to parse assessment into named sections
function parseAssessmentSections(assessment: string) {
  // Split by numbered headings (e.g., 1. Recommendation:, 2. Key Points:, etc.)
  const sectionRegex = /\n?\s*(\d+\.\s[^:]+:)/g;
  const parts = assessment.split(sectionRegex).filter(Boolean);
  // parts: [before, heading1, content1, heading2, content2, ...]
  const sections: Record<string, string> = {};
  let i = 0;
  // Skip intro (parts[0]) if not a heading
  if (parts.length && !/^\d+\./.test(parts[0])) {
    i = 1;
  }
  for (; i < parts.length - 1; i += 2) {
    const heading = parts[i].replace(/\n/g, '').trim();
    sections[heading] = parts[i + 1].trim();
  }
  return sections;
}

export default function CreditVsLoanAssessment() {
  const [form, setForm] = useState({
    reason: '',
    loan_type: 'personal_loan',
    income: '',
    current_emi: '',
    existing_cards: '',
    credit_card_outstanding: '',
    ever_defaulted: 'no',
    credit_score: '',
  });
  const [assessment, setAssessment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAssessment(null);
    try {
      const response = await fetch('/api/analyze/credit-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          income: form.income,
          current_emi: form.current_emi,
          credit_card_outstanding: form.credit_card_outstanding,
          credit_Score: form.credit_score,
        }),
      });
      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        if (typeof data === 'string') {
          setAssessment(data);
        } else if (data.assessment) {
          setAssessment(data.assessment);
        } else {
          setAssessment(JSON.stringify(data));
        }
      } else {
        const text = await response.text();
        setAssessment(text);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Section styles by logical name
  const sectionStyles: Record<string, { bg: string; border: string; icon: string }> = {
    '1. Recommendation:': {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      icon: '📋',
    },
    '2. Key Points:': {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: '💡',
    },
    '3. Conditions/Suggestions:': {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: '📝',
    },
    '4. Summary of Values:': {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: '📊',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <Card className="p-8 shadow-2xl rounded-3xl border-0 bg-white/90">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Credit Assessment Summary</h1>
          {assessment ? (() => {
            // Split by double newlines or fallback to single newlines
            const paras = assessment.split(/\n\s*\n/).filter(Boolean);
            // If only one para, try splitting by single newline
            const paragraphs = paras.length >= 3 ? paras : assessment.split(/\n/).filter(Boolean);
            const [rec, cond, summ] = [paragraphs[0] || 'No recommendation available.', paragraphs[1] || 'No condition available.', paragraphs[2] || 'No summary available.'];
            return (
              <div className="space-y-6">
                {/* Recommendation */}
                <div className="w-full rounded-2xl border border-purple-200 bg-purple-50 p-6 shadow-md flex flex-col mb-2">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">📋</span>
                    <h2 className="text-xl font-semibold text-gray-800">Recommendation</h2>
                  </div>
                  <div className="prose max-w-none text-gray-700 flex-1">
                    {rec}
                  </div>
                </div>
                {/* Condition */}
                <div className="w-full rounded-2xl border border-green-200 bg-green-50 p-6 shadow-md flex flex-col">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">📝</span>
                    <h2 className="text-xl font-semibold text-gray-800">Condition</h2>
                  </div>
                  <div className="prose max-w-none text-gray-700 flex-1">
                    {cond}
                  </div>
                </div>
                {/* Summary */}
                <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-md flex flex-col mt-2">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">📊</span>
                    <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
                  </div>
                  <div className="prose max-w-none text-gray-700 flex-1">
                    {summ}
                  </div>
                </div>
                <Button className="mt-4 w-full" onClick={() => setAssessment(null)}>
                  Start Over
                </Button>
              </div>
            );
          })() : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Reason for applying:</label>
                <textarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                  placeholder="e.g. need a loan to travel"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Looking for what kind of loan?</label>
                <select
                  name="loan_type"
                  value={form.loan_type}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                >
                  {loanTypes.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">What is your credit score (CIBIL)?</label>
                <input
                  type="number"
                  name="credit_score"
                  value={form.credit_score}
                  onChange={handleChange}
                  min={0}
                  max={900}
                  required
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                  placeholder="e.g. 750"
                />
                <div className="mt-2 p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 flex items-start text-sm">
                  <span className="mr-2 mt-0.5">ℹ️</span>
                  <span>
                    If you don't know your credit score, you can download it from any credit bureau and upload it on our platform as a PDF to understand it thoroughly.
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Monthly Income (₹):</label>
                <input
                  type="number"
                  name="income"
                  value={form.income}
                  onChange={handleChange}
                  required
                  min={0}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                  placeholder="e.g. 150000"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Current Loan EMI (₹):</label>
                <input
                  type="number"
                  name="current_emi"
                  value={form.current_emi}
                  onChange={handleChange}
                  required
                  min={0}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                  placeholder="e.g. 25000"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Number of existing credit cards:</label>
                <input
                  type="number"
                  name="existing_cards"
                  value={form.existing_cards}
                  onChange={handleChange}
                  required
                  min={0}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                  placeholder="e.g. 2"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Credit Card Outstanding (₹):</label>
                <input
                  type="number"
                  name="credit_card_outstanding"
                  value={form.credit_card_outstanding}
                  onChange={handleChange}
                  required
                  min={0}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                  placeholder="e.g. 25000"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Ever Defaulted on a Loan?</label>
                <select
                  name="ever_defaulted"
                  value={form.ever_defaulted}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-center">{error}</div>
              )}
              <Button
                type="submit"
                className="w-full py-3 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                disabled={loading}
              >
                {loading ? 'Assessing...' : 'Get Assessment'}
              </Button>
            </form>
          )}
        </Card>
      </main>
    </div>
  );
} 