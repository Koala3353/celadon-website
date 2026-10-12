import localFont from "next/font/local";

// Served from src/fonts rather than fetched from Google Fonts at build
// time — see src/fonts/README.md.
const fraunces = localFont({
  src: [{ path: "../../fonts/fraunces/fraunces-normal.woff2", weight: "500 700", style: "normal" }],
  variable: "--font-sky-display",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

// Scoped to this subtree only — the rest of the site keeps its Montserrat
// (Gotham stand-in) brand type for body copy. Fraunces stands in for the
// CelaSkies brand book's Kingred Modern, used for every title and header
// in the internal portal — Gotham and Kingred Modern are the only two
// typefaces the portal uses. (Previously Fredoka, which reads as a
// rounded/playful "kids' app" face rather than Kingred Modern's elegant,
// high-contrast serif — Fraunces is the closer match in tone.)

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return <div className={fraunces.variable}>{children}</div>;
}
