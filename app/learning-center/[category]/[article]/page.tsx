import { Metadata } from 'next'
import { articles, Article } from '../../page'
import ArticlePageClient from './ArticlePageClient'

export async function generateMetadata({ params }: { params: { category: string; article: string } }): Promise<Metadata> {
  const article = articles.find(a => a.link === `/learning-center/${params.category}/${params.article}`)
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    }
  }

  return {
    title: `${article.title} | Financial Education & Investment Guides`,
    description: article.description,
    keywords: `${article.category.toLowerCase()}, ${article.title.toLowerCase()}, financial education, investment guides`,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ category: string; article: string }> }) {
  const resolvedParams = await params;
  const article = articles.find(a => a.link === `/learning-center/${resolvedParams.category}/${resolvedParams.article}`)
  
  if (!article) {
    return <div>Article not found</div>
  }

  return <ArticlePageClient article={article} allArticles={articles} />
} 