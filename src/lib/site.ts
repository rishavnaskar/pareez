/**
 * ─────────────────────────────────────────────────────────────────
 *  PAREEZ — central site configuration
 *  Every phone number, address, link and business fact lives here.
 *  Edit this ONE file to update the whole website.
 * ─────────────────────────────────────────────────────────────────
 */

export const SITE = {
  name: "Pareez",
  legalName: "Pareez Unisex Professional Salon",
  tagline: "Where Trends Meet Tradition",
  description:
    "Pareez is Kolkata's premium unisex salon with branches in Garfa and Jadavpur. Expert haircuts, hair colour, keratin, nanoplastia, hair botox, bridal & party makeup, skin, nail and grooming services — luxury salon services made personal.",
  // TODO: replace with your real domain once purchased (e.g. https://pareezsalon.com)
  url: "https://pareezsalon.com",
  email: "pareez.salon@gmail.com",
  foundingYear: 2016,
  rating: { value: 4.4, count: 308 }, // Google rating — Garfa branch
  socials: {
    instagram: "https://www.instagram.com/pareezsalon/",
    facebook: "https://www.facebook.com/PAREEZ.salon/",
  },
  /** Primary WhatsApp number for bookings (from the Facebook page). Digits only, with country code. */
  whatsapp: "917890791339",
} as const;

export type Branch = {
  id: "garfa" | "jadavpur";
  name: string;
  shortName: string;
  addressLine1: string;
  addressLine2: string;
  locality: string;
  postalCode: string;
  phone: string; // display format
  phoneHref: string; // tel: format
  geo: { lat: number; lng: number };
  mapsUrl: string;
  mapsEmbedUrl: string;
  hours: string;
  hoursShort: string;
  highlights: string[];
};

export const BRANCHES: Branch[] = [
  {
    id: "garfa",
    name: "Pareez Professional Unisex Salon",
    shortName: "Garfa (Flagship)",
    addressLine1: "Sunny Tower, 48/1 Garfa Main Road",
    addressLine2: "Garfa, Near Garfa Police Station",
    locality: "Kolkata, West Bengal",
    postalCode: "700078",
    phone: "+91 78907 91339",
    phoneHref: "tel:+917890791339",
    geo: { lat: 22.4998232, lng: 88.3838564 },
    mapsUrl:
      "https://www.google.com/maps/place/Pareez+Professional+Unisex+Salon/@22.4998232,88.3838564,17z",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Pareez%20Professional%20Unisex%20Salon%2C%20Sunny%20Tower%2C%2048%2F1%20Garfa%20Main%20Rd%2C%20Kolkata&output=embed",
    hours: "Open every day · 10:00 AM – 9:00 PM",
    hoursShort: "10 AM – 9 PM",
    highlights: ["Flagship branch", "Full hair, skin & bridal studio", "4.4★ on Google (308 reviews)"],
  },
  {
    id: "jadavpur",
    name: "Pareez Family Salon",
    shortName: "Jadavpur",
    addressLine1: "1/11B/3, Kali Bari Lane",
    addressLine2: "Jadavpur",
    locality: "Kolkata, West Bengal",
    postalCode: "700032",
    phone: "+91 78907 91339",
    phoneHref: "tel:+917890791339",
    geo: { lat: 22.4942232, lng: 88.3697112 },
    mapsUrl:
      "https://www.google.com/maps/place/Pareez+Family+Salon/@22.4942232,88.3671363,17z",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Pareez%20Family%20Salon%2C%20Jadavpur%2C%20Kolkata&output=embed",
    hours: "Open every day · 10:00 AM – 9:00 PM",
    hoursShort: "10 AM – 9 PM",
    highlights: ["Newest branch", "Hair · Skin · Makeup · Nail · Tattoo", "Family-friendly studio"],
  },
];

export const OPENING_HOURS_SCHEMA = {
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  opens: "10:00",
  closes: "21:00",
};

export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WA_MESSAGE =
  "Hi Pareez! I'd like to book an appointment. (Sent from the website)";
