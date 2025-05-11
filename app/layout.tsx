import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Analytics } from "@vercel/analytics/react"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Best Credit Cards in India | Compare & Find the Right Card',
  description: 'Find and compare the best credit cards in India. Get detailed comparisons of rewards, benefits, and features to choose the perfect credit card for your needs. Additionally, learn about your credit profile and improve your credit score.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black',
  },
  icons: {
    apple: '/icons/icon-192x192.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="Find the best credit card for you; Learn more about your credit profile" />
        <meta property="og:description" content="Explore the best credit cards and learn more about your credit profile at financialhealth.co.in" />
        <meta property="og:image" content="https://financialhealth.co.in/new-preview-image.png" />
        <meta property="og:url" content="https://financialhealth.co.in/" />
      </head>
      <body className="min-h-screen">
        <main>
          {children}
        </main>
        <Footer />
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
