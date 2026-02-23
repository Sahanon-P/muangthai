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

  return (
    <html lang={locale}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-SBPQ40JYTV`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SBPQ40JYTV', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body
        className={`${myFont.className} bg-[#242424] flex flex-col justify-center`}
      >
        <NextIntlClientProvider messages={messages}>
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
