import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { SITE } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import GalleryVideo from "./GalleryVideo";

/**
 * Showcase grid. Each item can be an image (src) or a silent looping
 * reel-style video (set `video` to an mp4/webm under /public/gallery;
 * `src` then acts as the poster shown while it loads).
 */
type GalleryItem = {
  src: string;
  alt: string;
  label: string;
  tall?: boolean;
  video?: string;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  { src: "/gallery/work-1.jpg", alt: "Glossy keratin hair treatment result at Pareez Salon Kolkata", label: "Keratin Gloss", tall: true },
  { src: "/gallery/work-2.jpg", alt: "Balayage hair colour transformation at Pareez Salon Garfa", label: "Balayage" },
  { src: "/gallery/work-3.jpg", alt: "HD bridal makeup look by Pareez Salon Kolkata", label: "Bridal Makeup", tall: true },
  { src: "/gallery/work-4.jpg", alt: "Men's precision haircut and styling at Pareez unisex salon", label: "Men's Styling" },
  { src: "/gallery/work-5.jpg", alt: "Nanoplastia hair smoothening result at Pareez Salon Jadavpur", label: "Nanoplastia" },
  { src: "/gallery/work-6.jpg", alt: "Luxury facial and skin glow ritual at Pareez Salon", label: "Skin Rituals", tall: true },
  { src: "/gallery/work-7.jpg", alt: "Gel nail art design at Pareez Salon Kolkata", label: "Nail Art" },
  { src: "/gallery/work-8.jpg", alt: "Party makeup and hairstyling at Pareez Salon South Kolkata", label: "Party Glam" },
];

export default function GallerySection({ compact = false }: { compact?: boolean }) {
  const items = compact ? GALLERY_ITEMS.slice(0, 6) : GALLERY_ITEMS;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Our Work"
        title="Transformations,"
        accent="not just appointments"
        sub="A glimpse of the looks our stylists create every day. Follow @pareezsalon on Instagram for daily transformations."
      />

      <div className="columns-2 gap-5 md:columns-3 [&>*]:mb-5">
        {items.map((g, i) => (
          <Reveal key={g.src} delay={(i % 3) * 0.08}>
            <figure className="group relative overflow-hidden rounded-3xl border border-cream/8">
              {g.video ? (
                <GalleryVideo
                  src={g.video}
                  poster={g.src}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={g.tall ? 1086 : 1254}
                  height={g.tall ? 1448 : 1254}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-ink/90 via-ink/30 to-transparent p-5 pt-16">
                <span className="text-sm font-bold tracking-wide text-cream">
                  {g.label}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 text-center">
        <Link
          href={SITE.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full border border-cream/20 px-8 py-4 text-sm font-bold text-cream transition-all duration-300 hover:border-brand hover:text-brand-bright"
        >
          <Instagram className="size-5 text-brand" />
          See more on Instagram — @pareezsalon
        </Link>
      </Reveal>
    </section>
  );
}
