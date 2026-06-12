import type { Metadata } from "next";
import LocationsSection from "@/components/LocationsSection";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "Our Salon Locations — Garfa & Jadavpur, Kolkata",
  description:
    "Visit Pareez Salon at Sunny Tower, 48/1 Garfa Main Road, Kolkata 700078 or our Pareez Family Salon branch in Jadavpur. Open every day from 10 AM — directions, phone numbers and timings.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <div className="pt-24" />
      <LocationsSection />
      <CtaSection />
    </>
  );
}
