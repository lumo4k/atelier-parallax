import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import { siteConfig as site } from "@/config/site";
import { themeStyles, themeInitScript } from "@/config/theme";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";
const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-heading",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seo.title,
  description: site.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: site.seo.title,
    description: site.seo.description,
    images: [
      {
        url: site.seo.image,
        width: 1600,
        height: 1000,
        alt: site.hero.image.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [site.seo.image],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": site.business.schemaType,
    name: site.business.legalName,
    description: site.business.description,
    url: site.url,
    telephone: `+${site.contact.phone}`,
    email: site.contact.email,
    image: new URL(site.seo.image, site.url).href,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address,
      addressLocality: site.contact.city,
      addressCountry: site.contact.country,
    },
  };
  return (
    <html lang={site.locale} data-theme="light" suppressHydrationWarning>
      <head>
        <style>{themeStyles}</style>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${body.variable} ${heading.variable}`}>
        <a className="skip-link" href="#conteudo">
          {site.labels.skip}
        </a>
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
