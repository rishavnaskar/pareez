import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { SITE } from "@/lib/site";
import { buildLocalBusinessJsonLd } from "@/lib/jsonld";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Analytics from "@/components/Analytics";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.legalName} | Best Unisex Salon in Garfa & Jadavpur, Kolkata`,
    template: `%s | ${SITE.name} Salon Kolkata`,
  },
  description: SITE.description,
  keywords: [
    "salon in Garfa",
    "salon in Jadavpur",
    "best unisex salon Kolkata",
    "Pareez salon",
    "hair salon Kolkata",
    "bridal makeup Kolkata",
    "keratin treatment Kolkata",
    "nanoplastia Kolkata",
    "hair botox Kolkata",
    "hair colour Garfa",
    "beauty parlour Jadavpur",
    "party makeup South Kolkata",
    "haircut Garfa Main Road",
    "nail art Kolkata",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.legalName,
    title: `${SITE.legalName} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.legalName} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Beauty Salon",
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = buildLocalBusinessJsonLd();

  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  );
}
