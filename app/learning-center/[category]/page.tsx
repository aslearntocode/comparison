import { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'
import Script from 'next/script'
import { articles, Article } from '../articles-data'
import CategoryPageClient from './CategoryPageClient'

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = params.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  
  return {
    title: `${category} | Financial Education & Investment Guides`,
    description: `Explore comprehensive guides on ${category.toLowerCase()}. Learn about investment strategies, market insights, and expert advice.`,
    keywords: `${category.toLowerCase()}, financial education, investment guides, financial literacy`,
    openGraph: {
      title: `${category} | Financial Education & Investment Guides`,
      description: `Explore comprehensive guides on ${category.toLowerCase()}. Learn about investment strategies, market insights, and expert advice.`,
      type: 'website',
    },
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const categoryArticles = articles.filter((article: Article) => 
    article.category.toLowerCase() === category.toLowerCase()
  )

  return <CategoryPageClient category={category} categoryArticles={categoryArticles} />
} 