"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track, type WebEventType } from "@/lib/track";

/**
 * Invisible sitewide tracker.
 *
 * - Logs a pageview on every route change.
 * - One document-level click listener classifies outbound CTAs
 *   (WhatsApp, phone calls, directions, socials) — no per-button wiring.
 */

function classifyLink(href: string): WebEventType | null {
  if (href.startsWith("tel:")) return "call_click";
  if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) return "whatsapp_click";
  if (href.includes("instagram.com")) return "instagram_click";
  if (href.includes("facebook.com")) return "facebook_click";
  if (
    href.includes("google.com/maps") ||
    href.includes("maps.google") ||
    href.includes("maps.app.goo.gl")
  )
    return "directions_click";
  return null;
}

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    track("pageview", { path: pathname });
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const type = classifyLink(link.getAttribute("href") ?? "");
      if (!type) return;
      const label =
        link.getAttribute("aria-label") ?? link.textContent?.trim().slice(0, 80) ?? "";
      track(type, { label });
    };
    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
