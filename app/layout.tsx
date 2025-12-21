import type { Metadata } from 'next'
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Navigation from './components/ui/Navigation'
import Footer from './components/ui/Footer'
import SEO from './components/ui/SEO'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'Asakia Hawawu Hanan | GMB 2025 First Runner-Up',
  description: 'Official platform of Asakia Hawawu Hanan, Ghana\'s Most Beautiful 2025 First Runner-Up. Cultural Ambassador, Women Empowerment Advocate, and National Treasure.',
  keywords: ['Ghana Most Beautiful', 'GMB 2025', 'Asakia Hanan', 'Cultural Ambassador', 'Ghana Pageant'],
  authors: [{ name: 'Asakia Hawawu Hanan' }],
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://asakiahanan.com',
    title: 'Asakia Hawawu Hanan | GMB 2025 First Runner-Up',
    description: 'Cultural Ambassador and Women Empowerment Advocate',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Asakia Hawawu Hanan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asakia Hawawu Hanan | GMB 2025 First Runner-Up',
    description: 'Official platform of Asakia Hawawu Hanan',
    images: ['/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <head>
        <SEO />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Asakia Hawawu Hanan",
              "jobTitle": "Cultural Ambassador",
              "description": "Ghana's Most Beautiful 2025 First Runner-Up",
              "nationality": "Ghanaian",
              "birthPlace": {
                "@type": "Place",
                "name": "Ghana"
              },
              "award": "GMB 2025 First Runner-Up",
              "sameAs": [
                "https://instagram.com/asakiahanan",
                "https://twitter.com/asakiahanan"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-ivory text-earth-500">
        <div className="fixed inset-0 kente-overlay -z-10" />
        <Navigation />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}