'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Question = {
  id: number;
  text: string;
  options: {
    value: string;
    label: string;
  }[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "What is your primary purpose for borrowing?",
    options: [
      { value: "emergency", label: "Emergency expenses" },
      { value: "planned", label: "Planned purchase" },
      { value: "debt", label: "Debt consolidation" },
      { value: "travel", label: "Travel" },
      { value: "regular", label: "Regular expenses" }
    ]
  },
  {
    id: 2,
    text: "What is your approximate monthly income?",
    options: [
      { value: "low", label: "Less than ₹25,000" },
      { value: "medium", label: "₹25,000 - ₹50,000" },
      { value: "medium_high", label: "₹50,000 - ₹1,00,000" },
      { value: "high", label: "₹1,00,000 - ₹2,00,000" },
      { value: "very_high", label: "More than ₹2,00,000" }
    ]
  },
  {
    id: 3,
    text: "How much do you need to borrow?",
    options: [
      { value: "small", label: "Less than ₹50,000" },
      { value: "medium", label: "₹50,000 - ₹1,00,000" },
      { value: "medium_large", label: "₹1,00,000 - ₹2,00,000" },
      { value: "large", label: "₹2,00,000 - ₹5,00,000" },
      { value: "very_large", label: "More than ₹5,00,000" }
    ]
  },
  {
    id: 4,
    text: "How quickly do you plan to repay?",
    options: [
      { value: "very_short", label: "Within 1 month" },
      { value: "short", label: "1-6 months" },
      { value: "medium", label: "6-12 months" },
      { value: "medium_long", label: "12-24 months" },
      { value: "long", label: "24-36 months" },
      { value: "very_long", label: "More than 36 months" }
    ]
  },
  {
    id: 5,
    text: "What is your credit score (CIBIL Score) range?",
    options: [
      { value: "poor", label: "Below 600" },
      { value: "fair", label: "600-700" },
      { value: "good", label: "700-750" },
      { value: "excellent", label: "750-800" },
      { value: "outstanding", label: "Above 800" }
    ]
  },
  {
    id: 6,
    text: "Do you have any existing credit card?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: 7,
    text: "Have you ever defaulted on a loan or a credit card?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" }
    ]
  }
];
export default function CreditVsLoanAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const getRecommendation = () => {
    const purpose = answers[1];
    const amount = answers[3];
    const repayment = answers[4];
    const creditScore = answers[5];
    const hasExistingCard = answers[6];
    const hasDefaulted = answers[7];

    if (creditScore === "poor") {
      return {
        product: "Credit Score Improvement Required",
        reason: "Based on your credit score (below 600), lenders might not be able to approve your application at this time. It's recommended to work on improving your credit score first.",
        isLowScore: true,
        showSecuredCardOption: true
      };
    }

    // Check for personal loan recommendation based on amount and horizon
    if ((amount === "medium_large" || amount === "large" || amount === "very_large") && 
        (repayment === "medium" || repayment === "medium_long" || repayment === "long" || repayment === "very_long")) {
      return {
        product: "Personal Loan",
        reason: "Given your need for a larger amount (more than ₹1,00,000) and longer repayment horizon (more than 6 months), a personal loan would be more suitable for your financial needs.",
        isLowScore: false
      };
    }

    // Check for credit card recommendations for smaller amounts and shorter horizons
    if ((amount === "small" || amount === "medium") && 
        (repayment === "very_short" || repayment === "short")) {
      
      if (hasExistingCard === "yes") {
        return {
          product: "Use Existing Credit Card",
          reason: "Since you already have a credit card and your borrowing needs are small with a short repayment horizon, it's recommended to use your existing credit card instead of taking on additional debt.",
          isLowScore: false
        };
      } else {
        return {
          product: "Apply for Credit Card",
          reason: "Given your borrowing needs and repayment horizon, a credit card would be the most suitable option. You can apply for a new credit card to meet your financial needs.",
          isLowScore: false
        };
      }
    }

    if (purpose === "regular" || (amount === "small" && repayment === "very_short")) {
      return {
        product: "Credit Card",
        reason: "Your needs align better with a credit card for regular expenses and short-term borrowing.",
        isLowScore: false
      };
    } else if (purpose === "debt" || amount === "very_large" || repayment === "long") {
      return {
        product: "Personal Loan",
        reason: "A personal loan would be more suitable for your larger borrowing needs and longer repayment period.",
        isLowScore: false
      };
    } else {
      return {
        product: "Credit Card",
        reason: "Based on your responses, a credit card would be more appropriate for your financial needs.",
        isLowScore: false
      };
    }
  };

  if (showResult) {
    const recommendation = getRecommendation();
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <Card className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Recommendation</h1>
            <div className={`p-6 rounded-lg mb-8 ${recommendation.isLowScore ? 'bg-red-50' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {recommendation.product}
              </h2>
              <p className="text-gray-600">{recommendation.reason}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Next Steps</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                {recommendation.isLowScore ? (
                  <>
                    <li>Check your credit report for errors</li>
                    <li>Pay your bills on time</li>
                    <li>Reduce your credit utilization</li>
                    <li>Maintain a good mix of credit</li>
                    {recommendation.showSecuredCardOption && (
                      <li>Consider applying for a secured credit card to build your credit history</li>
                    )}
                  </>
                ) : (
                  <>
                    <li>Compare different {recommendation.product.toLowerCase()} options</li>
                    <li>Check your eligibility</li>
                    <li>Review interest rates and fees</li>
                    <li>Understand the terms and conditions</li>
                  </>
                )}
              </ul>
            </div>
            <div className="mt-8">
              <Button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResult(false);
                }}
                className="w-full"
              >
                {recommendation.isLowScore ? 
                  (recommendation.showSecuredCardOption ? 
                    "View Secured Credit Card Options" : 
                    "Click here to learn how to increase your score") : 
                  "Look at Some Products and Apply"}
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Card className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Credit Card vs Personal Loan Assessment
            </h1>
            <p className="text-gray-600">
              Answer a few questions to get personalized recommendations
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-4">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`
                }}
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {questions[currentQuestion].text}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option) => (
              <Button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full justify-start text-left p-4 h-auto"
                variant="outline"
              >
                {option.label}
              </Button>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={currentQuestion === 0}
            >
              Back
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
} 