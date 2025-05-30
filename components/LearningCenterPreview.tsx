import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface Article {
  title: string;
  description: string;
  path: string;
  category: string;
  icon: string;
  date: string;
}

const articles: Article[] = [
  {
    title: "Loan Against Mutual Funds",
    description: "Learn about Loan Against Mutual Funds (LAMF) - a smart way to access liquidity without selling your investments.",
    path: "/learning-center/personal-loans/lamf",
    category: "Personal Loans",
    icon: "💰",
    date: "May 30, 2025"
  },
  {
    title: "Best Value Credit Card In India",
    description: "Learn how to choose and use credit cards strategically to maximize their value based on your spending patterns and financial goals",
    path: "/learning-center/credit-cards/best-value-card",
    category: "Credit Cards",
    icon: "💳",
    date: "May 15, 2025"
  },
  {
    title: "Credit Card Interest Calculation",
    description: "Understand how credit card interest is calculated and ways to minimize charges",
    path: "/learning-center/credit-cards/interest-calculation",
    category: "Credit Cards",
    icon: "💳",
    date: "May 12, 2025"
  }
];

const LearningCenterPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Helper to split date into day and month
  const getDateParts = (dateStr: string) => {
    const date = new Date(dateStr + ' 00:00:00');
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    return { day, month };
  };

  return (
    <section className="bg-gray-50 py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Learning Center</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expand your financial knowledge with our latest articles and guides
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {articles.map((article, index) => {
                const { day, month } = getDateParts(article.date);
                return (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <Link href={article.path}>
                      <div className="relative h-full group cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300">
                        {/* Date Badge */}
                        <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white rounded-lg px-3 py-1 flex flex-col items-center shadow-md">
                          <span className="text-lg font-bold leading-none">{day}</span>
                          <span className="text-xs uppercase tracking-wider" style={{letterSpacing:'0.05em'}}>{month}</span>
                        </div>
                        {/* Icon as background */}
                        <div className="h-56 w-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                          <span className="text-9xl drop-shadow-lg">{article.icon}</span>
                        </div>
                        <div className="p-5 flex flex-col h-full">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 rounded px-2 py-0.5">{article.category}</span>
                          </div>
                          <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-blue-700 transition-colors">{article.title}</h3>
                          <p className="text-gray-600 flex-grow text-sm mb-3">{article.description}</p>
                          <div className="mt-auto">
                            <span className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:underline transition-colors">
                              Read more
                              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {articles.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to article ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => {
            const { day, month } = getDateParts(article.date);
            return (
              <Link href={article.path} key={index}>
                <div className="relative h-full group cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white rounded-lg px-3 py-1 flex flex-col items-center shadow-md">
                    <span className="text-lg font-bold leading-none">{day}</span>
                    <span className="text-xs uppercase tracking-wider" style={{letterSpacing:'0.05em'}}>{month}</span>
                  </div>
                  {/* Icon as background */}
                  <div className="h-56 w-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-9xl drop-shadow-lg">{article.icon}</span>
                  </div>
                  <div className="p-5 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 rounded px-2 py-0.5">{article.category}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-blue-700 transition-colors">{article.title}</h3>
                    <p className="text-gray-600 flex-grow text-sm mb-3">{article.description}</p>
                    <div className="mt-auto">
                      <span className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:underline transition-colors">
                        Read more
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/learning-center"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LearningCenterPreview; 