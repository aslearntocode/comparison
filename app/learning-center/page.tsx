'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Link from 'next/link'

type Article = {
  id: string
  title: string
  description: string
  category: string
  readTime: string
  link: string
}

const articles: Article[] = [
  // {
  //   id: '1',
  //   title: "Understanding Mutual Funds: A Beginner's Guide",
  //   description: "Learn the basics of mutual funds, how they work, and why they're a popular investment choice for both new and experienced investors.",
  //   category: 'Mutual Funds',
  //   readTime: '5 min read',
  //   link: '/learning-center/mutual-funds/beginners-guide'
  // },
  // {
  //   id: '2',
  //   title: 'Types of Mutual Funds: Which One is Right for You?',
  //   description: 'Explore different types of mutual funds and how to choose the best one for your investment goals. Compare options to make informed decisions.',
  //   category: 'Mutual Funds',
  //   readTime: '7 min read',
  //   link: '/learning-center/mutual-funds/types'
  // },
  // {
  //   id: '3',
  //   title: 'Introduction to Stock Market Investing',
  //   description: 'Get started with stock market basics, understanding indices, and fundamental analysis. Learn how to build a strong investment foundation.',
  //   category: 'Equity',
  //   readTime: '6 min read',
  //   link: '/learning-center/equity/intro'
  // },
  {
    id: '4',
    title: 'Fixed Deposits vs. Debt Funds',
    description: 'Compare traditional FDs with debt mutual funds to make informed investment decisions. Understand the pros and cons of each option.',
    category: 'Fixed Deposits',
    readTime: '4 min read',
    link: '/learning-center/fixed-deposits/comparison'
  },
  // {
  //   id: '5',
  //   title: 'REITs: A Guide to Real Estate Investment Trusts',
  //   description: 'Understand how REITs work, their benefits, and how to invest in them. Learn about this accessible way to invest in real estate markets.',
  //   category: 'Real Estate',
  //   readTime: '10 min read',
  //   link: '/learning-center/real-estate/reits'
  // },
  // {
  //   id: '6',
  //   title: 'A Comprehensive Guide to REIT Investments in India',
  //   description: 'Discover how to invest in Indian REITs, understand their structure, benefits, and risks. Learn about professional real estate investment options.',
  //   category: 'Real Estate',
  //   readTime: '8 min read',
  //   link: '/learning-center/real-estate/reit-guide'
  // },
  {
    id: '7',
    title: 'Investment Options for Retail Investors in India',
    description: 'Understand what financial instruments you can invest in India for long term wealth creation. For a comprehensive guide, we recommend reading this excellent article on Groww: https://groww.in/blog/best-investment-options-in-india',
    category: 'Personal Finance',
    readTime: '8 min read',
    link: '/learning-center/personal-finance/investment-options'
  },
  {
    id: '8',
    title: 'Understanding Risk and Return',
    description: 'Learn about the relationship between risk and return, and how to balance them in your investment portfolio.',
    category: 'Personal Finance',
    readTime: '6 min read',
    link: '/learning-center/personal-finance/risk-return'
  },
  {
    id: '9',
    title: 'How to Invest in SIP?',
    description: 'Learn how to start investing in SIPs and make your money work for you.',
    category: 'Personal Finance',
    readTime: '15 min read',
    link: '/learning-center/personal-finance/sip'
  },
  {
    id: '10',
    title: 'Credit Cards: Understand Interest Calculation',
    description: 'Learn how the banks calculate the interest on your credit card.',
    category: 'Credit Cards',
    readTime: '15 min read',
    link: '/learning-center/credit-cards/interest-calculation'
  },
  {
    id: '11',
    title: 'Credit Card Rewards Explained',
    description: 'Understanding credit card rewards programs, points, cashback, and how to maximize your benefits.',
    category: 'Credit Cards',
    readTime: '7 min read',
    link: '/learning-center/credit-cards/rewards'
  },
  {
    id: '12',
    title: 'Personal Loan: The Interest You Pay',
    description: 'Learn how interest rate, tenure and loan amount impact the interest paid and principal repayment.',
    category: 'Personal Loans',
    readTime: '10 min read',
    link: '/learning-center/personal-loans/payment'
  },
  {
    id: '13',
    title: 'Auto Loans: Tips for First-Time Borrowers',
    description: 'Understanding auto loans, comparing offers, and getting the best deal on your car financing.',
    category: 'Auto Loans',
    readTime: '6 min read',
    link: '/learning-center/auto-loans/first-time'
  },
  {
    id: '14',
    title: 'Home Loan Basics: A Complete Guide',
    description: 'Everything you need to know about home loans, mortgage types, and the application process.',
    category: 'Home Loans',
    readTime: '12 min read',
    link: '/learning-center/home-loans/basics'
  },
  {
    id: '15',
    title: 'Why Having Too Many Credit Cards Is Not Recommended',
    description: 'Learn about the hidden financial impacts of having multiple credit cards and best practices for managing credit wisely.',
    category: 'Credit Cards',
    readTime: '10 min read',
    link: '/learning-center/credit-cards/number-of-cards'
  },
  {
    id: '16',
    title: 'Understanding Your Risk Profile',
    description: 'Learn about lenders build risk scores for lending products such as Credit Cards, Peronal Loans, Home Loans etc. and how they affect your applications.',
    category: 'Credit Cards',
    readTime: '20 min read',
    link: '/learning-center/credit-cards/risk-profile'
  },
  {
    id: '17',
    title: 'Comparing Fixed Deposits and Personal Loans',
    description: 'Decide Between Breaking a FD and using the Proceeds or taking a Personal Loan?',
    category: 'Personal Finance',
    readTime: '10 min read',
    link: '/learning-center/personal-finance/comparison'
  },
  {
    id: '18',
    title: 'Taxable Income: How to Calculate Your Taxable Income',
    description: 'Learn how to calculate your taxable income and understand the different components of your income.',
    category: 'Personal Finance',
    readTime: '10 min read',
    link: '/learning-center/personal-finance/taxable-income'
  },
  {
    id: '19',
    title: 'Best Value Credit Card In India',
    description: 'Learn how to choose and use credit cards strategically to maximize their value based on your spending patterns and financial goals.',
    category: 'Credit Cards',
    readTime: '10 min read',
    link: '/learning-center/credit-cards/best-value-card'
  },
  {
    id: '20',
    title: 'Best Cashback Credit Card In India',
    description: 'Find the best cashback credit card in India based on your spending patterns and financial goals.',
    category: 'Credit Cards',
    readTime: '10 min read',
    link: '/learning-center/credit-cards/cash-back-cards'
  },
  {
    id: '21',
    title: 'Why a Good Credit Score Alone Doesn\'t Guarantee Credit Card Approval',
    description: 'Learn why having a good credit score isn\'t enough for credit card approval and what other factors lenders consider when evaluating your application.',
    category: 'Credit Cards',
    readTime: '10 min read',
    link: '/learning-center/credit-cards/chances-of-approval'
  },
  {
    id: '22',
    title: 'How to Redeem Axis Bank Credit Card Reward Points',
    description: 'Learn how to redeem Axis Bank Credit Card Reward Points and make the most of your rewards.',
    category: 'Credit Cards',
    readTime: '5 min read',
    link: '/learning-center/credit-cards/axis-rewards-redemption'
  },
  {
    id: '23',
    title: 'Why a Secured Credit Card Can Be a Game Changer for Parents of College-Bound Kids',
    description: 'Learn how secured credit cards can help college students build credit history, earn rewards, and develop financial discipline while giving parents peace of mind.',
    category: 'Credit Cards',
    readTime: '8 min read',
    link: '/learning-center/credit-cards/secured-credit-card'
  },
  {
    id: '24',
    title: 'How to Redeem HDFC Bank Credit Card Reward Points',
    description: 'Learn how to redeem HDFC Bank Credit Card Reward Points and make the most of your rewards.',
    category: 'Credit Cards',
    readTime: '5 min read',
    link: '/learning-center/credit-cards/hdfc-rewards-redemption'
  },
  {
    id: '25',
    title: 'How to Redeem IDFC First Bank Credit Card Reward Points',
    description: 'Learn how to redeem IDFC First Bank Credit Card Reward Points and make the most of your rewards.',
    category: 'Credit Cards',
    readTime: '5 min read',
    link: '/learning-center/credit-cards/idfc-first-rewards-redemption'
  },
  {
    id: '26',
    title: 'HDFC IndiGo 6E Rewards Credit Card Review',
    description: 'Learn about the HDFC IndiGo 6E Rewards Credit Card, including its rewards program, benefits, and how to apply.',
    category: 'Credit Cards',
    readTime: '10 min read',
    link: '/learning-center/credit-cards/hdfc-indigo-card'
  }
]

function LearningCenter() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Custom order for categories
  const customCategoryOrder = [
    'all',
    'Credit Cards',
    'Personal Loans',
    'Auto Loans',
    'Home Loans',
    'Fixed Deposits',
    'Personal Finance'
  ];
  // Get unique categories from articles
  const uniqueCategories = Array.from(new Set(articles.map(article => article.category)));
  // Merge custom order with any extra categories
  const categories = [
    ...customCategoryOrder,
    ...uniqueCategories.filter(cat => !customCategoryOrder.includes(cat))
  ];
  
  const categoryOrder = [
    'Credit Cards',
    'Personal Loans',
    'Auto Loans',
    'Home Loans',
    'Fixed Deposits',
    'Personal Finance'
  ];

  // Sorting function for articles
  const sortByCategoryOrder = (a: Article, b: Article) => {
    const aIndex = categoryOrder.indexOf(a.category);
    const bIndex = categoryOrder.indexOf(b.category);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  };

  const filteredArticles = (selectedCategory === 'all'
    ? articles
    : articles.filter(article => article.category === selectedCategory)
  ).sort(sortByCategoryOrder);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setIsMobileMenuOpen(false) // Close mobile menu after selection
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-[160px] bg-gradient-to-r from-blue-600 to-blue-700" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center pt-10">
              <h1 className="text-4xl font-bold text-white mb-3 font-serif tracking-wide">
                Learning Center
              </h1>
              
              <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8 font-sans">
                Explore our comprehensive guides and articles to enhance your investment knowledge
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Category Menu Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg shadow-sm"
              >
                <span className="text-gray-700 font-medium">
                  {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Mobile Category Menu Dropdown */}
              {isMobileMenuOpen && (
                <div className="absolute z-50 mt-2 w-[calc(100%-2rem)] bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`
                        w-full px-4 py-3 text-left transition-colors duration-200
                        ${selectedCategory === category
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      {category === 'all' ? 'All Categories' : category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Category Sidebar */}
            <div className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
                <div className="flex flex-col gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`
                        px-4 py-3 rounded-lg text-left transition-all duration-200
                        ${selectedCategory === category
                          ? 'bg-blue-600 text-white shadow-md transform translate-x-2'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                        }
                        ${selectedCategory === category ? 'font-medium' : 'font-normal'}
                      `}
                    >
                      {category === 'all' ? 'All Categories' : category}
                      {selectedCategory === category && (
                        <span className="float-right">→</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredArticles.map(article => (
                  <Link href={article.link} key={article.id}>
                    <div className="bg-white border rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                      <div className="inline-block px-3 py-1 rounded-full text-sm font-medium text-blue-600 bg-blue-50 mb-4 self-start">
                        {article.category}
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-base text-gray-600 mb-4 flex-grow line-clamp-3">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {article.readTime}
                        </span>
                        <span className="text-blue-600 text-sm font-medium">Read more →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LearningCenter 