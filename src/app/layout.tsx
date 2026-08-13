import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { asset } from "@/lib/asset";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { copy } from "@/lib/content";

/**
 * Brandbook type is Gotham Black for titles and Gotham for body. Gotham is a
 * licensed Hoefler face with no web-embedding rights here, so Montserrat
 * stands in for both weights: the same geometric construction and wide caps,
 * and it covers 400 through 900 from a single variable family.
 */
const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// Sheet-driven, so the org name and one-liner are editable without a deploy
// from a developer.
const TITLE = copy("org_name");
const DESCRIPTION = copy("org_tagline");

export const metadata: Metadata = {
  title: { default: TITLE, template: `%s — ${TITLE}` },
  description: DESCRIPTION,
  applicationName: TITLE,
  icons: { apple: asset("/brand/apple-touch-icon.png") },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: TITLE,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export const viewport = { themeColor: "#003078" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="grain flex min-h-full flex-col bg-background">
        <a
          href="#main"
          className="sr-only rounded-full focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
