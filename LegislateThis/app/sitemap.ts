import { MetadataRoute } from 'next'
import { adminDb } from '@/lib/firebaseAdmin'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    {
      url: 'https://legislatethis.org',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://legislatethis.org/news',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: 'https://legislatethis.org/congress',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://legislatethis.org/search',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://legislatethis.org/information',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://legislatethis.org/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: 'https://legislatethis.org/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://legislatethis.org/faqs',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://legislatethis.org/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: 'https://legislatethis.org/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Dynamic article pages
  let articlePages: MetadataRoute.Sitemap = []
  
  try {
    const articlesSnapshot = await adminDb.collection('articles').get()
    
    articlePages = articlesSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        url: `https://legislatethis.org/articles/${doc.id}`,
        lastModified: data.publishedAt?.toDate() || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error)
  }

  return [...staticPages, ...articlePages]
} 