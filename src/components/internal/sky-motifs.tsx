/**
 * Decorative shapes for the CelaSkies sub-brand: folded paper (crane, plane)
 * and soft cloud blobs, per the brand book's "Elements and Patterns" page.
 * Purely ornamental — always aria-hidden.
 */

export function PaperCrane({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 80" fill="none" className={className} aria-hidden>
      <path d="M50 8 L74 40 L58 40 L58 62 L42 62 L42 40 L26 40 Z" fill="currentColor" opacity="0.9" />
      <path d="M50 8 L58 40 L50 46 L42 40 Z" fill="currentColor" opacity="0.55" />
      <path d="M74 40 L94 30 L80 48 Z" fill="currentColor" opacity="0.75" />
      <path d="M26 40 L6 30 L20 48 Z" fill="currentColor" opacity="0.75" />
      <path d="M42 62 L36 76 L46 66 Z" fill="currentColor" opacity="0.65" />
      <path d="M58 62 L64 76 L54 66 Z" fill="currentColor" opacity="0.65" />
    </svg>
  );
}

export function PaperAirplane({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" fill="none" className={className} aria-hidden>
      <path d="M4 30 L96 8 L52 30 L96 52 Z" fill="currentColor" opacity="0.85" />
      <path d="M4 30 L52 30 L28 44 Z" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function CloudBlob({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 100" fill="none" className={className} aria-hidden>
      <path
        d="M40 75 C15 75 0 58 0 42 C0 24 16 12 33 14 C38 2 54 -3 68 5 C74 -2 88 -3 97 6 C112 0 132 8 136 24 C158 22 176 38 172 55 C185 58 190 72 178 82 C170 92 150 90 140 82 C128 92 100 92 88 82 C70 92 46 88 40 75 Z"
        fill="currentColor"
      />
    </svg>
  );
}
