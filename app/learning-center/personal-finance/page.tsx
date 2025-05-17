'use client'

import Header from '@/components/Header'
import Link from 'next/link'
import { articles } from '../articles-data'

function PersonalFinancePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link 
              href="/learning-center"
              className="text-blue-600 hover:text-blue-800"
            >
              Learning Center
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-600">Personal Finance</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Personal Finance</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <Link href={article.link} key={index}>
                <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow h-full">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {article.title}
                  </h2>
                  <p className="text-base text-gray-600 mb-4">
                    {article.description}
                  </p>
                  <div className="text-sm text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {article.readTime}
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

export default PersonalFinancePage
