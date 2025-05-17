'use client'

import { Article } from '../articles-data'
import Link from 'next/link'

interface RelatedArticlesProps {
  currentArticle: Article
  allArticles: Article[]
}

export default function RelatedArticles({ currentArticle, allArticles }: RelatedArticlesProps) {
  // Find related articles based on category and content similarity
  const relatedArticles = allArticles
    .filter(article => 
      article.id !== currentArticle.id && // Exclude current article
      (
        article.category === currentArticle.category || // Same category
        article.description.toLowerCase().includes(currentArticle.title.toLowerCase()) || // Content similarity
        currentArticle.description.toLowerCase().includes(article.title.toLowerCase())
      )
    )
    .slice(0, 3) // Limit to 3 related articles

  if (relatedArticles.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedArticles.map(article => (
          <Link href={article.link} key={article.id}>
            <div className="bg-white border rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
              <div className="inline-block px-3 py-1 rounded-full text-sm font-medium text-blue-600 bg-blue-50 mb-4 self-start">
                {article.category}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">
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
  )
} 