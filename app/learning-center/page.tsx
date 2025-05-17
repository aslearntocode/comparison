'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Link from 'next/link'
import Script from 'next/script'
import SearchBar from './components/SearchBar'
import { articles, Article } from './articles-data'

function LearningCenter() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const categories = ['all', ...new Set(articles.map(article => article.category))]
  
  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory)

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setIsMobileMenuOpen(false)
  }

  // Generate schema markup for articles
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": articles.map((article, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Article",
        "headline": article.title,
        "description": article.description,
        "url": `https://yourdomain.com${article.link}`,
        "articleSection": article.category,
        "timeRequired": article.readTime
      }
    }))
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Schema Markup */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <main className="flex-1">
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-[160px] bg-gradient-to-r from-blue-600 to-blue-700" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation - REMOVED */}
            {/* <nav className="pt-4" aria-label="Breadcrumb"> ... </nav> */}

            <div className="text-center pt-10">
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 font-serif tracking-wide">
                Learning Center
              </h1>
              
              <p className="text-sm md:text-lg text-white/90 max-w-3xl mx-auto mb-8 font-sans">
                Explore our comprehensive guides and articles to enhance your investment knowledge
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-4">
                <SearchBar articles={articles} />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav aria-label="Category navigation" className="flex flex-col lg:flex-row gap-4">
            {/* Mobile Category Menu Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg shadow-sm"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-category-menu"
              >
                <span className="text-gray-700 font-medium">
                  {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
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
                <div 
                  id="mobile-category-menu"
                  className="absolute z-50 mt-2 w-[calc(100%-2rem)] bg-white rounded-lg shadow-lg py-2 border border-gray-100"
                  role="menu"
                >
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
                      role="menuitem"
                    >
                      {category === 'all' ? 'All Categories' : category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Category Sidebar */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
                <nav aria-label="Category navigation">
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
                </nav>
              </div>
            </aside>

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
          </nav>
        </div>
      </main>
    </div>
  )
}

export default LearningCenter 