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

export const metadata: Metadata = {
  title: "Muang Thai Restaurant",
  description: "Authentic Thai cuisine in Einsiedeln. Enjoy traditional dishes, cozy atmosphere, and warm hospitality at Muang Thai Restaurant. Dine-in, take away, and reservations available.",
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
