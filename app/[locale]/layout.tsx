import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getContactInfo, defaultQuickLinks } from "@/lib/api";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Script from "next/script";
import GAClient from "@/components/ga-client";

const myFont = localFont({
  src: [
    {
      path: "../../font/SaoChingcha-Regular.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../font/SaoChingcha-Bold.otf",
      style: "bold",
      weight: "00",
    },
    {
      path: "../../font/SaoChingcha-Light.otf",
      style: "light",
      weight: "300",
    },
  ],
});

const SITE_URL = "https://muangthairestaurant.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Muang Thai Restaurant",
    template: "%s | Muang Thai Restaurant",
  },
  description:
    "Authentic Thai cuisine in Einsiedeln. Traditional dishes, cozy atmosphere, and warm hospitality. Dine-in, take away, and reservations available.",
  keywords: [
    "Thai restaurant",
    "Einsiedeln",
    "Thai food",
    "Thai cuisine",
    "Muang Thai",
    "take away",
    "reservation",
  ],
  openGraph: {
    type: "website",
    siteName: "Muang Thai Restaurant",
    title: "Muang Thai Restaurant",
    description:
      "Authentic Thai cuisine in Einsiedeln. Traditional dishes, cozy atmosphere, and warm hospitality.",
    url: SITE_URL,
    images: [{ url: "/branding.jpg", width: 400, height: 400, alt: "Muang Thai Restaurant" }],
  },
  twitter: {
    card: "summary",
    title: "Muang Thai Restaurant",
    description: "Authentic Thai cuisine in Einsiedeln.",
    images: ["/branding.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: `${SITE_URL}/en`,
      de: `${SITE_URL}/de`,
    },
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "de")) {
    notFound();
  }

  const [contactInfo, messages] = await Promise.all([
    getContactInfo(locale),
    getMessages(),
  ]);

  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Muang Thai Restaurant",
              description: "Authentic Thai cuisine in Einsiedeln.",
              url: SITE_URL,
              telephone: "+41555357330",
              email: "info@muangthairestaurant.com",
              image: `${SITE_URL}/branding.jpg`,
              servesCuisine: "Thai",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Heidenbühl 2",
                addressLocality: "Einsiedeln",
                postalCode: "8840",
                addressCountry: "CH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 47.1268,
                longitude: 8.7465,
              },
              hasMap: "https://maps.google.com/?cid=ChIJm2deHVuzmkcRx0dhxhYka9w",
              sameAs: [],
            }),
          }}
        />
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body
        suppressHydrationWarning
        className={`${myFont.className} bg-[#242424] flex flex-col justify-center`}
      >
        <NextIntlClientProvider messages={messages}>
          {/* Client-side tracker to record pageviews on route change */}
          <GAClient />
          <div className="bg-[url('/cover.svg')] bg-[length:100vw_auto] bg-top bg-no-repeat min-h-screen w-full space-y-7">
            <Navbar />
            <div> {children}</div>
            <Footer contactInfo={contactInfo} quickLinks={defaultQuickLinks} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
