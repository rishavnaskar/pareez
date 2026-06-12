import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Pareez Salon — home"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <Image
        src="/brand/pareez-logo.jpg"
        alt="Pareez Salon logo"
        width={44}
        height={44}
        priority
        className="size-11 rounded-full ring-1 ring-brand/40 transition-shadow duration-300 group-hover:shadow-[0_0_18px_-4px_var(--color-brand)]"
      />
      <span className="flex flex-col">
        <span className="inline-flex items-baseline font-display text-xl font-bold tracking-[0.18em] uppercase">
          <span className="text-cream">Paree</span>
          <span className="text-brand transition-transform duration-300 group-hover:-translate-y-0.5">
            z
          </span>
        </span>
        <span className="hidden text-[8px] font-semibold tracking-[0.28em] text-cream-dim uppercase sm:block">
          Unisex Professional Salon
        </span>
      </span>
    </Link>
  );
}
