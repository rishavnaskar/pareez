import {
  Scissors,
  Palette,
  Sparkles,
  Crown,
  Flower2,
  Hand,
  Droplets,
  Brush,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  blurb: string;
  description: string;
  items: { name: string }[];
  /** for gallery placeholder + accent variation */
  tone: "orange" | "amber" | "ember";
};

export const SERVICES: Service[] = [
  {
    slug: "haircuts-styling",
    title: "Haircuts & Styling",
    icon: Scissors,
    blurb: "Precision cuts and blow-dries for men, women & kids.",
    description:
      "Signature consultations, precision haircuts, washes and blowouts by senior stylists trained on the latest international trends — for men, women and kids.",
    items: [
      { name: "Men's Advanced Haircut" },
      { name: "Women's Advanced Haircut" },
      { name: "Hair Wash + Blow Dry" },
      { name: "Kids' Haircut" },
      { name: "Beard Sculpting & Shave" },
      { name: "Ironing, Tongs & Styling" },
    ],
    tone: "orange",
  },
  {
    slug: "hair-colour",
    title: "Hair Colour",
    icon: Palette,
    blurb: "Global colour, balayage, highlights & fashion shades.",
    description:
      "From rich global colour to hand-painted balayage, ombré, highlights and bold fashion shades — using premium professional colour lines like L'Oréal Majirel.",
    items: [
      { name: "Global Hair Colour" },
      { name: "Balayage / Ombré" },
      { name: "Highlights & Lowlights" },
      { name: "Root Touch-up" },
      { name: "Fashion / Creative Colour" },
      { name: "Grey Coverage" },
    ],
    tone: "amber",
  },
  {
    slug: "hair-treatments",
    title: "Keratin, Nanoplastia & Botox",
    icon: Droplets,
    blurb: "Smoothening, keratin, nanoplastia & hair botox rituals.",
    description:
      "Transform frizzy, damaged hair into glass-smooth, glossy hair with our advanced rituals — keratin, smoothening, rebonding, nanoplastia and hair botox, tailored to your hair type.",
    items: [
      { name: "Keratin Treatment" },
      { name: "Nanoplastia" },
      { name: "Hair Botox" },
      { name: "Smoothening & Rebonding" },
      { name: "Hair Spa Rituals" },
      { name: "Scalp & Hair-fall Therapy" },
    ],
    tone: "ember",
  },
  {
    slug: "bridal",
    title: "Bridal & Occasion Makeup",
    icon: Crown,
    blurb: "HD bridal, reception & party makeup artistry.",
    description:
      "Your biggest days deserve our finest artistry. HD & airbrush bridal makeup, reception looks, engagement and party glam — with trials, draping and hairstyling included on request.",
    items: [
      { name: "HD Bridal Makeup" },
      { name: "Reception & Engagement Looks" },
      { name: "Party / Glam Makeup" },
      { name: "Groom Styling" },
      { name: "Saree Draping & Hairstyling" },
      { name: "Pre-bridal Packages" },
    ],
    tone: "orange",
  },
  {
    slug: "skin",
    title: "Skin & Facials",
    icon: Sparkles,
    blurb: "Luxury facials, clean-ups, de-tan & glow rituals.",
    description:
      "Brightening facials, deep clean-ups, de-tan, anti-ageing and bridal glow packages using dermat-grade professional skincare ranges.",
    items: [
      { name: "Luxury & Brightening Facials" },
      { name: "Clean-up & De-tan" },
      { name: "Anti-ageing Rituals" },
      { name: "Bridal Glow Packages" },
      { name: "Threading & Waxing" },
      { name: "Bleach & Polishing" },
    ],
    tone: "amber",
  },
  {
    slug: "nails-grooming",
    title: "Nails, Mehndi & Grooming",
    icon: Hand,
    blurb: "Manicure, pedicure, nail art & complete self-care.",
    description:
      "Complete self-care under one roof — spa manicures and pedicures, gel polish and nail art, mehndi, plus head-to-toe grooming for men and women.",
    items: [
      { name: "Spa Manicure & Pedicure" },
      { name: "Gel Polish & Nail Art" },
      { name: "Nail Extensions" },
      { name: "Mehndi" },
      { name: "Body Polishing" },
      { name: "Men's Grooming Packages" },
    ],
    tone: "ember",
  },
];

export const SERVICE_MARQUEE = [
  "Haircuts",
  "Hair Colour",
  "Balayage",
  "Keratin",
  "Nanoplastia",
  "Hair Botox",
  "Smoothening",
  "Bridal Makeup",
  "Party Makeup",
  "Facials",
  "Clean-ups",
  "Manicure",
  "Pedicure",
  "Nail Art",
  "Mehndi",
  "Beard Styling",
];

export { Flower2, Brush };
