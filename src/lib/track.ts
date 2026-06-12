/**
 * ─────────────────────────────────────────────────────────────────
 *  PAREEZ — first-party analytics (zero dependencies, zero cookies-banner)
 *
 *  Writes tiny event documents to the shared `pareez-billing` Firestore
 *  via its public REST endpoint, so the owner's admin dashboard
 *  (pareez-billing-admin-dashboard → "Website" section) can show
 *  traffic, conversions and appointment requests.
 *
 *  - No SDK: a single fetch() per event keeps the site's bundle tiny.
 *  - Anonymous: random visitor/session ids only — no personal data
 *    except what a customer types into the booking form themselves.
 *  - Fails silently: analytics must never break the website.
 * ─────────────────────────────────────────────────────────────────
 */

// Public Firebase *web* config values — safe to ship to the browser;
// Firestore security rules are what actually protect the data.
const FIREBASE_PROJECT_ID = "pareez-billing";
const FIREBASE_API_KEY = "AIzaSyA-EBa6z6faNDUVgtIIlyRgwszLAllgTuc";

const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

/** Hosts on which tracking is active. Localhost/preview traffic is ignored. */
const TRACKED_HOSTS = ["pareezsalon.com", "www.pareezsalon.com", "pareez.vercel.app"];

export type WebEventType =
  | "pageview"
  | "whatsapp_click"
  | "call_click"
  | "directions_click"
  | "instagram_click"
  | "facebook_click"
  | "booking_submitted";

function isBot(): boolean {
  if (typeof navigator === "undefined") return true;
  if (navigator.webdriver) return true;
  return /bot|crawl|spider|slurp|lighthouse|headless/i.test(navigator.userAgent);
}

function shouldTrack(): boolean {
  if (typeof window === "undefined") return false;
  if (!TRACKED_HOSTS.includes(window.location.hostname)) return false;
  return !isBot();
}

function getId(storage: Storage, key: string): string {
  let id = storage.getItem(key);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    storage.setItem(key, id);
  }
  return id;
}

function visitorId(): string {
  try {
    return getId(window.localStorage, "pz_vid");
  } catch {
    return "unknown";
  }
}

function sessionId(): string {
  try {
    return getId(window.sessionStorage, "pz_sid");
  } catch {
    return "unknown";
  }
}

function device(): string {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

/** External referrer hostname (e.g. "instagram.com"), empty for direct/internal. */
function referrer(): string {
  try {
    if (!document.referrer) return "";
    const ref = new URL(document.referrer);
    return ref.hostname === window.location.hostname ? "" : ref.hostname;
  } catch {
    return "";
  }
}

function utm(name: string): string {
  try {
    return new URLSearchParams(window.location.search).get(`utm_${name}`) ?? "";
  } catch {
    return "";
  }
}

type FirestoreFields = Record<string, { stringValue: string } | { timestampValue: string }>;

function str(v: string): { stringValue: string } {
  return { stringValue: v.slice(0, 200) };
}

/** Fire-and-forget Firestore REST write. keepalive lets it survive navigation. */
function firestoreCreate(collection: string, fields: FirestoreFields): Promise<Response | void> {
  return fetch(`${FIRESTORE_BASE}/${collection}?key=${FIREBASE_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
    keepalive: true,
  }).catch(() => {});
}

/**
 * Record an analytics event. Safe to call anywhere on the client;
 * it is a no-op on localhost, in bots and on the server.
 */
export function track(type: WebEventType, opts?: { label?: string; path?: string }): void {
  if (!shouldTrack()) return;
  void firestoreCreate("webEvents", {
    type: str(type),
    path: str(opts?.path ?? window.location.pathname),
    label: str(opts?.label ?? ""),
    sessionId: str(sessionId()),
    visitorId: str(visitorId()),
    device: str(device()),
    referrer: str(referrer()),
    utmSource: str(utm("source")),
    utmMedium: str(utm("medium")),
    utmCampaign: str(utm("campaign")),
    ts: { timestampValue: new Date().toISOString() },
  });
}

export type BookingRequest = {
  name: string;
  phone: string;
  branchId: string;
  branchName: string;
  service: string;
  date: string; // YYYY-MM-DD
  time: string;
  notes: string;
};

/**
 * Save an appointment request so it appears in the admin dashboard's
 * "Website" inbox — in addition to the WhatsApp message the customer sends.
 */
export function logBookingRequest(req: BookingRequest): void {
  if (!shouldTrack()) return;
  void firestoreCreate("webBookings", {
    name: str(req.name),
    phone: str(req.phone),
    branchId: str(req.branchId),
    branchName: str(req.branchName),
    service: str(req.service),
    date: str(req.date),
    time: str(req.time),
    notes: str(req.notes),
    status: str("new"),
    sessionId: str(sessionId()),
    visitorId: str(visitorId()),
    device: str(device()),
    createdAt: { timestampValue: new Date().toISOString() },
  });
  track("booking_submitted", { label: `${req.branchName} · ${req.service}` });
}
