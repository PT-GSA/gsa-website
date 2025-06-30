import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '../src/components/I18nProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GSA - Digital Strategic Partner',
  description: 'Gemerlang Sejahtera Abadi - Your Digital Strategic Partner. Layanan Web, AI, Software, dan Digital Marketing terbaik di Indonesia.',
  openGraph: {
    title: 'GSA - Digital Strategic Partner',
    description: 'Gemerlang Sejahtera Abadi - Your Digital Strategic Partner. Layanan Web, AI, Software, dan Digital Marketing terbaik di Indonesia.',
    url: 'https://gsagroup.id',
    siteName: 'GSA',
    images: [
      {
        url: 'https://gsagroup.id/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GSA OG Image',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GSA - Digital Strategic Partner',
    description: 'Gemerlang Sejahtera Abadi - Your Digital Strategic Partner. Layanan Web, AI, Software, dan Digital Marketing terbaik di Indonesia.',
    images: ['https://gsagroup.id/og-image.jpg'],
  },
  metadataBase: new URL('https://gsagroup.id'),
  alternates: {
    canonical: 'https://gsagroup.id',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "GSA",
              "url": "https://gsagroup.id",
              "logo": "https://gsagroup.id/logo.png",
              "contactPoint": [{
                "@type": "ContactPoint",
                "telephone": "+62-878-5420-7963",
                "contactType": "customer service",
                "areaServed": "ID",
                "availableLanguage": ["Indonesian", "English"]
              }]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
