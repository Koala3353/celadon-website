import type { Metadata } from "next";
import { Grandstander, Bevan, Jost, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { asset } from "@/lib/asset";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { copy } from "@/lib/content";

// Primary typeface from the brand book.
const grandstander = Grandstander({
  variable: "--font-display",
  subsets: ["latin"],
});

// Brand book: "can use BEVAN for the first word of the Grandstander".
const bevan = Bevan({
  variable: "--font-poster",
  subsets: ["latin"],
  weight: "400",
});

// Stand-in for Glacial Indifference, which isn't web-licensed. Jost is the
// closest open geometric sans — same single-storey 'a' and circular bowls.
const jost = Jost({
  variable: "--font-body",
  subsets: ["latin"],
});

// Stand-in for 字由点字云霆楷体 for the Chinese display bits.
const notoSerifSC = Noto_Serif_SC({
  variable: "--font-hanzi",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Celaville — Ateneo Celadon Recweek 2026–2027",
    template: "%s — Celaville",
  },
  description:
    "下一课！Start the next chapter with Celadon. Explore Celadon's " +
    "departments, projects, and open Recweek roles.",
  icons: { apple: asset("/brand/apple-touch-icon.png") },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${grandstander.variable} ${bevan.variable} ${jost.variable} ${notoSerifSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-red focus:px-5 focus:py-2 focus:font-display focus:text-sm focus:font-bold focus:text-cream"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter note={copy("footer_note")} />
      </body>
    </html>
  );
}
