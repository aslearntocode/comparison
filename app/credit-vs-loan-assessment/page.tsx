'use client';

import { useState, useEffect, Suspense } from 'react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { supabase } from '@/lib/supabase';

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

function CreditVsLoanAssessmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    reason: '',
    loan_type: 'personal_loan',
    income: '',
    current_emi: '',
    existing_cards: '',
    credit_card_outstanding: '',
    ever_defaulted: 'no',
    credit_score: '',
    mortgage: 'no',
  });
  const [assessment, setAssessment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch latest assessment on component mount
  useEffect(() => {
    const fetchLatestAssessment = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('credit_assessments')
          .select('*')
          .eq('user_id', user.uid)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            console.log('No previous assessment found');
            return;
          }
          console.error('Error fetching assessment:', error);
          return;
        }

        if (data) {
          // Set the assessment response
          if (typeof data.assessment_response === 'string') {
            setAssessment(data.assessment_response);
          } else if (data.assessment_response?.assessment) {
            setAssessment(data.assessment_response.assessment);
          } else {
            setAssessment(JSON.stringify(data.assessment_response));
          }

          // Pre-fill form with previous data
          setForm({
            reason: data.reason || '',
            loan_type: data.loan_type || 'personal_loan',
            income: data.income?.toString() || '',
            current_emi: data.current_emi?.toString() || '',
            existing_cards: data.existing_cards?.toString() || '',
            credit_card_outstanding: data.credit_card_outstanding?.toString() || '',
            ever_defaulted: data.ever_defaulted || 'no',
            credit_score: data.credit_score?.toString() || '',
            mortgage: data.mortgage || 'no',
          });
        }
      } catch (error) {
        console.error('Error in fetchLatestAssessment:', error);
      }
    };

    fetchLatestAssessment();
  }, []);

  const handlePageClick = () => {
    const user = auth.currentUser;
    if (!user) {
      const currentPath = encodeURIComponent('/credit-vs-loan-assessment');
      router.push(`/login?redirect=${currentPath}`);
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const user = auth.currentUser;
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      console.log('Starting assessment submission for user:', user.uid);

      // First get the assessment from the API
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
      let assessmentData;
      if (contentType && contentType.includes('application/json')) {
        assessmentData = await response.json();
        if (typeof assessmentData === 'string') {
          setAssessment(assessmentData);
        } else if (assessmentData.assessment) {
          setAssessment(assessmentData.assessment);
        } else {
          setAssessment(JSON.stringify(assessmentData));
        }
      } else {
        const text = await response.text();
        setAssessment(text);
        assessmentData = text;
      }

      console.log('Assessment data received:', assessmentData);

      // Prepare data for Supabase with proper type conversion
      const supabaseData = {
        user_id: user.uid,
        reason: form.reason,
        loan_type: form.loan_type,
        income: form.income ? parseFloat(form.income) : null,
        current_emi: form.current_emi ? parseFloat(form.current_emi) : null,
        existing_cards: form.existing_cards ? parseInt(form.existing_cards) : null,
        credit_card_outstanding: form.credit_card_outstanding ? parseFloat(form.credit_card_outstanding) : null,
        ever_defaulted: form.ever_defaulted,
        credit_score: form.credit_score ? parseInt(form.credit_score) : null,
        mortgage: form.mortgage,
        assessment_response: assessmentData
      };

      console.log('Prepared Supabase data:', supabaseData);

      // Save to Supabase with better error handling
      const { data: insertData, error: supabaseError } = await supabase
        .from('credit_assessments')
        .insert(supabaseData)
        .select()
        .single();

      if (supabaseError) {
        console.error('Error saving to Supabase:', {
          error: supabaseError,
          errorCode: supabaseError.code,
          errorMessage: supabaseError.message,
          errorDetails: supabaseError.details,
          data: supabaseData
        });
        throw new Error(`Failed to save assessment: ${supabaseError.message}`);
      }

      console.log('Successfully saved assessment:', insertData);

    } catch (err) {
      console.error('Full error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Section styles by logical name
  const sectionStyles: Record<string, { bg: string; border: string; icon: string }> = {
    'Recommendation:': {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      icon: '📋',
    },
    'Key Points:': {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: '💡',
    },
    'Conditions/Suggestions:': {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: '📝',
    },
    'Summary of Values:': {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: '📊',
    },
  };

  // Helper function to parse assessment text
  const parseAssessmentText = (assessmentText: string | any) => {
    if (!assessmentText) return ['No recommendation available.', 'No condition available.', 'No summary available.'];
    
    // If it's an object, try to get the assessment property
    if (typeof assessmentText === 'object') {
      if (assessmentText.assessment) {
        assessmentText = assessmentText.assessment;
      } else {
        assessmentText = JSON.stringify(assessmentText);
      }
    }

    // Ensure we have a string
    let text = String(assessmentText);
    
    // Replace DTI with full form
    text = text.replace(/DTI/g, 'Debt to Income Ratio (DTI)');
    
    // Remove numbers from section headings
    text = text.replace(/^\d+\.\s*/gm, '');
    
    // Split by double newlines or fallback to single newlines
    const paras = text.split(/\n\s*\n/).filter(Boolean);
    // If only one para, try splitting by single newline
    const paragraphs = paras.length >= 3 ? paras : text.split(/\n/).filter(Boolean);
    
    // Format conditions and summary as bullet points
    const formatAsBulletPoints = (text: string) => {
      // Split by sentences or newlines
      const points = text.split(/[.!?]\s+|\n/).filter(Boolean);
      return points.map(point => `• ${point.trim()}`).join('\n');
    };
    
    return [
      paragraphs[0] || 'No recommendation available.',
      formatAsBulletPoints(paragraphs[1] || 'No condition available.'),
      formatAsBulletPoints(paragraphs[2] || 'No summary available.')
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main 
        className="max-w-7xl mx-auto px-4 py-12"
        onClick={handlePageClick}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="p-6 shadow-2xl rounded-3xl border-0 bg-white/90">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Credit Assessment Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4" onClick={(e) => {
              e.stopPropagation();
              const user = auth.currentUser;
              if (!user) {
                const currentPath = encodeURIComponent('/credit-vs-loan-assessment');
                router.push(`/login?redirect=${currentPath}`);
                return;
              }
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for applying (max 100 words)?</label>
                <textarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                  placeholder="e.g. need a loan to travel"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Looking for what kind of loan?</label>
                <select
                  name="loan_type"
                  value={form.loan_type}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                >
                  {loanTypes.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What is your Credit Score (CIBIL)?</label>
                <input
                  type="number"
                  name="credit_score"
                  value={form.credit_score}
                  onChange={handleChange}
                  min={0}
                  max={900}
                  required
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                  placeholder="e.g. 750"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income (₹):</label>
                <input
                  type="number"
                  name="income"
                  value={form.income}
                  onChange={handleChange}
                  required
                  min={0}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                  placeholder="e.g. 150000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Loan EMI including Mortgage (₹):</label>
                <input
                  type="number"
                  name="current_emi"
                  value={form.current_emi}
                  onChange={handleChange}
                  required
                  min={0}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                  placeholder="e.g. 25000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Do you have an existing mortgage?</label>
                <select
                  name="mortgage"
                  value={form.mortgage}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of existing credit cards:</label>
                <input
                  type="number"
                  name="existing_cards"
                  value={form.existing_cards}
                  onChange={handleChange}
                  required
                  min={0}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                  placeholder="e.g. 2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Credit Card Outstanding (₹):</label>
                <input
                  type="number"
                  name="credit_card_outstanding"
                  value={form.credit_card_outstanding}
                  onChange={handleChange}
                  required
                  min={0}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                  placeholder="e.g. 25000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ever Defaulted on a Loan?</label>
                <select
                  name="ever_defaulted"
                  value={form.ever_defaulted}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-white"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              {error && (
                <div className="p-2 rounded-lg bg-red-50 text-red-700 text-sm text-center">{error}</div>
              )}
              <Button
                type="submit"
                className="w-full py-2 text-base rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                disabled={loading}
              >
                {loading ? 'Assessing...' : 'Get Assessment'}
              </Button>
            </form>
          </Card>

          {/* Results Section */}
          <Card className="p-8 shadow-2xl rounded-3xl border-0 bg-white/90">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Assessment Results</h2>
            {assessment ? (() => {
              const [rec, cond, summ] = parseAssessmentText(assessment);
              return (
                <div className="space-y-6">
                  {/* Recommendation */}
                  <div className="w-full rounded-2xl border border-purple-200 bg-purple-50 p-6 shadow-md flex flex-col mb-2 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">📋</span>
                      <h3 className="text-xl font-semibold text-gray-800">Recommendation</h3>
                    </div>
                    <div className="prose max-w-none text-gray-700 flex-1 leading-relaxed">
                      <p className="text-base font-medium">{rec}</p>
                    </div>
                  </div>
                  {/* Condition */}
                  <div className="w-full rounded-2xl border border-green-200 bg-green-50 p-6 shadow-md flex flex-col hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">📝</span>
                      <h3 className="text-xl font-semibold text-gray-800">Conditions</h3>
                    </div>
                    <div className="prose max-w-none text-gray-700 flex-1">
                      <ul className="space-y-3 list-none pl-0">
                        {cond.split('\n').map((point, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-600 mr-2 mt-1">•</span>
                            <span className="text-base leading-relaxed">{point.replace('•', '').trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Summary */}
                  <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-md flex flex-col mt-2 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">📊</span>
                      <h3 className="text-xl font-semibold text-gray-800">Summary</h3>
                    </div>
                    <div className="prose max-w-none text-gray-700 flex-1">
                      <ul className="space-y-3 list-none pl-0">
                        {summ.split('\n').map((point, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-600 mr-2 mt-1">•</span>
                            <span className="text-base leading-relaxed">{point.replace('•', '').trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })() : (
              <div className="text-center py-12 text-gray-500">
                <p>Complete the form to see your assessment results</p>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function CreditVsLoanAssessment() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreditVsLoanAssessmentContent />
    </Suspense>
  );
} 