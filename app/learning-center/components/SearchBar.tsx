'use client'

import { useState, useEffect } from 'react'
import { Article } from '../articles-data'
import Link from 'next/link'

interface SearchBarProps {
  articles: Article[]
}

export default function SearchBar({ articles }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Article[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results = articles.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    )
    setSearchResults(results)
  }, [searchQuery, articles])

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearching(true)}
          className="w-full px-4 py-2 pl-10 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Search Results Dropdown */}
      {isSearching && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {searchResults.map(article => (
            <Link
              key={article.id}
              href={article.link}
              className="block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              onClick={() => {
                setIsSearching(false)
                setSearchQuery('')
              }}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {article.category}
                    </span>
                    <span className="ml-2 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 