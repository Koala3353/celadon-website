import { Fredoka } from "next/font/google";

// Scoped to this subtree only — the rest of the site keeps its Montserrat
// (Gotham stand-in) brand type for body copy. Fredoka stands in for the
// CelaSkies brand book's Kingred Modern, used for every title and header
// in the internal portal — Gotham and Kingred Modern are the only two
// typefaces the portal uses.
const fredoka = Fredoka({
  variable: "--font-sky-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return <div className={fredoka.variable}>{children}</div>;
}
