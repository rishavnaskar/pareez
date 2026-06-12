import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-bold tracking-[0.35em] text-brand uppercase">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-cream md:text-6xl">
        This page took a <span className="text-gradient-brand italic">day off</span>
      </h1>
      <p className="mt-5 max-w-md text-sm text-cream-dim">
        The page you&apos;re looking for doesn&apos;t exist — but your next
        great look does.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-brand px-8 py-4 text-sm font-bold text-ink transition-all hover:bg-brand-bright"
      >
        Back to home
      </Link>
    </section>
  );
}
