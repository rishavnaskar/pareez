import { BRANCHES, OPENING_HOURS_SCHEMA, SITE } from "./site";

/**
 * Structured data (schema.org) for rich results in Google Search:
 * BeautySalon listings per branch, aggregate rating, opening hours,
 * geo coordinates and social profiles.
 */
export function buildLocalBusinessJsonLd() {
  const branches = BRANCHES.map((b) => ({
    "@type": ["BeautySalon", "HairSalon"],
    "@id": `${SITE.url}/locations/${b.id}`,
    name: b.name,
    alternateName: "Pareez Salon",
    description: SITE.description,
    url: `${SITE.url}/locations/${b.id}`,
    telephone: b.phone,
    email: SITE.email,
    image: `${SITE.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${b.addressLine1}, ${b.addressLine2}`,
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      postalCode: b.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: b.geo.lat,
      longitude: b.geo.lng,
    },
    hasMap: b.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        ...OPENING_HOURS_SCHEMA,
      },
    ],
    sameAs: [SITE.socials.instagram, SITE.socials.facebook],
    ...(b.id === "garfa"
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: SITE.rating.value,
            reviewCount: SITE.rating.count,
            bestRating: 5,
          },
        }
      : {}),
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.legalName,
        url: SITE.url,
        slogan: SITE.tagline,
        logo: `${SITE.url}/icon.svg`,
        sameAs: [SITE.socials.instagram, SITE.socials.facebook],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.legalName,
        publisher: { "@id": `${SITE.url}/#organization` },
      },
      ...branches,
    ],
  };
}

export function buildFaqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export const HOME_FAQS = [
  {
    q: "Where is Pareez Salon located in Kolkata?",
    a: "Pareez has two branches in South Kolkata: Pareez Professional Unisex Salon at Sunny Tower, 48/1 Garfa Main Road, Kolkata 700078, and Pareez Family Salon in Jadavpur, Kolkata.",
  },
  {
    q: "How do I book an appointment at Pareez Salon?",
    a: "You can book instantly on WhatsApp or by calling +91 78907 91339, or use the online appointment form on this website. Walk-ins are also welcome.",
  },
  {
    q: "What services does Pareez Salon offer?",
    a: "Pareez is a full-service unisex salon offering haircuts and styling for men and women, hair colour and balayage, keratin, nanoplastia and hair botox treatments, bridal and party makeup, facials and skin care, manicure, pedicure and nail art.",
  },
  {
    q: "Is Pareez a unisex salon?",
    a: "Yes — both branches welcome men, women and kids, with dedicated stylists and services for everyone.",
  },
  {
    q: "What are Pareez Salon's opening hours?",
    a: "Both branches are open every day from 10:00 AM, including weekends. Booking ahead on WhatsApp is recommended for weekends and bridal appointments.",
  },
  {
    q: "Does Pareez offer bridal makeup packages?",
    a: "Yes. Pareez offers HD bridal makeup, reception and engagement looks, pre-bridal glow packages and groom styling. Bridal trials can be arranged — contact us on WhatsApp for a consultation.",
  },
];
