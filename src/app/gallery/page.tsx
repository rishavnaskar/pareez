import type { Metadata } from "next";
import GallerySection from "@/components/GallerySection";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "Gallery — Hair, Makeup & Beauty Transformations",
  description:
    "See real client transformations from Pareez Salon Kolkata: keratin and nanoplastia results, balayage and hair colour, bridal and party makeup, nail art and more from our Garfa and Jadavpur studios.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <div className="pt-24" />
      <GallerySection />
      <CtaSection />
    </>
  );
}
