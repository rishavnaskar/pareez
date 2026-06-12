import { DEFAULT_WA_MESSAGE, waLink } from "@/lib/site";

/** Floating WhatsApp booking button, present on every page. */
export default function WhatsAppFloat() {
  return (
    <a
      href={waLink(DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Pareez on WhatsApp"
      className="fixed right-5 bottom-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] shadow-xl shadow-black/40 transition-transform duration-300 hover:scale-110"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" aria-hidden />
      <svg viewBox="0 0 32 32" className="relative size-7 fill-white" aria-hidden>
        <path d="M16.04 3C9.4 3 4 8.36 4 14.96c0 2.1.56 4.16 1.62 5.98L4 29l8.26-1.58a12.1 12.1 0 0 0 3.78.6c6.63 0 12.03-5.36 12.03-11.96C28.07 8.36 22.67 3 16.04 3Zm0 21.86c-1.2 0-2.38-.2-3.5-.6l-.25-.1-4.9.94.98-4.74-.16-.26a9.8 9.8 0 0 1-1.52-5.24c0-5.42 4.43-9.83 9.9-9.83 5.45 0 9.88 4.4 9.88 9.83 0 5.42-4.43 9.83-9.88 9.83Zm5.42-7.36c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47a8.9 8.9 0 0 1-1.65-2.04c-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.1 4.48.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
