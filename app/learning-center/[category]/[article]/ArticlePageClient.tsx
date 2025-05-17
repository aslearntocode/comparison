'use client'

import { Article } from '../../page'
import Header from '@/components/Header'
import Link from 'next/link'
import Script from 'next/script'
import RelatedArticles from '../../components/RelatedArticles'

interface ArticlePageClientProps {
  article: Article
  allArticles: Article[]
}

export default function ArticlePageClient({ article, allArticles }: ArticlePageClientProps) {
  // Generate schema markup for article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "articleSection": article.category,
    "timeRequired": article.readTime,
    "url": `https://yourdomain.com${article.link}`,
    "author": {
      "@type": "Organization",
      "name": "Your Company Name"
    }
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
                  <Link href={`/learning-center/${article.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-white">
                    {article.category}
                  </Link>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">{article.title}</span>
                </li>
              </ol>
            </nav>

            <div className="text-center pt-10">
              <div className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-white/20 mb-4">
                {article.category}
              </div>
              <h1 className="text-4xl font-bold text-white mb-3 font-serif tracking-wide">
                {article.title}
              </h1>
              
              <div className="flex items-center justify-center text-white/90">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              {article.description}
            </p>
            
            {/* Article content would go here */}
            <div className="bg-gray-100 p-8 rounded-lg mb-8">
              <p className="text-gray-600 italic">
                This is where the full article content would be displayed. The actual content would be stored in a database or CMS and fetched here.
              </p>
            </div>
          </article>

          {/* Related Articles */}
          <RelatedArticles currentArticle={article} allArticles={allArticles} />
        </div>
      </main>
    </div>
  )
} 