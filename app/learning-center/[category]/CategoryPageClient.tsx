'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Link from 'next/link'
import Script from 'next/script'
import { Article } from '../articles-data'

interface CategoryPageClientProps {
  category: string
  categoryArticles: Article[]
}

export default function CategoryPageClient({ category, categoryArticles }: CategoryPageClientProps) {
  // Generate schema markup for category page
  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category} Guides`,
    "description": `Comprehensive guides and articles about ${category.toLowerCase()}`,
    "url": `https://yourdomain.com/learning-center/${category.toLowerCase().replace(/\s+/g, '-')}`,
    "about": {
      "@type": "Thing",
      "name": category
    },
    "hasPart": categoryArticles.map((article: Article) => ({
      "@type": "Article",
      "headline": article.title,
      "description": article.description,
      "url": `https://yourdomain.com${article.link}`,
      "timeRequired": article.readTime
    }))
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Schema Markup */}
      <Script
        id="category-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      
      <main className="flex-1">
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-[160px] bg-gradient-to-r from-blue-600 to-blue-700" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav className="pt-4" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-white/90">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/learning-center" className="hover:text-white">
                    Learning Center
                  </Link>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">{category}</span>
                </li>
              </ol>
            </nav>

            <div className="text-center pt-10">
              <h1 className="text-4xl font-bold text-white mb-3 font-serif tracking-wide">
                {category} Guides
              </h1>
              
              <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8 font-sans">
                Explore our comprehensive guides and articles about {category.toLowerCase()}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {categoryArticles.map(article => (
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
      </main>
    </div>
  )
} 