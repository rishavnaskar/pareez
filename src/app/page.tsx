import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LocationsSection from "@/components/LocationsSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import { buildFaqJsonLd, HOME_FAQS } from "@/lib/jsonld";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(HOME_FAQS)) }}
      />
      <Hero />
      <Marquee />
      <ServicesSection compact />
      <StatsSection />
      <GallerySection compact />
      <TestimonialsSection />
      <LocationsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
