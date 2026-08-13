import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { copy } from "@/lib/content";
import { Container } from "@/components/ui/container";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/departments", label: "Departments" },
  { href: "/projects", label: "Projects" },
  { href: "/recruitment", label: "Join" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="navy-field mt-32 text-on-navy">
      <div className="navy-grid">
        <Container className="grid gap-12 py-20 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Image
              src={asset("/brand/dreagle-white.png")}
              alt=""
              width={800}
              height={670}
              className="h-16 w-auto self-start"
            />
            <p className="prose-body max-w-sm text-sm">{copy("org_tagline")}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <h2 className="eyebrow text-white">Explore</h2>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit text-sm text-on-navy underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <h2 className="eyebrow text-white">Contact</h2>
            <a
              href={`tel:${copy("org_phone").replace(/\s/g, "")}`}
              className="w-fit text-sm text-link-navy underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {copy("org_phone")}
            </a>
            <address className="prose-body max-w-xs text-sm not-italic">
              {copy("org_address")}
            </address>
            <div className="mt-2 flex gap-4">
              <a
                href={copy("org_instagram")}
                className="text-sm text-link-navy underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Instagram
              </a>
              <a
                href={copy("org_facebook")}
                className="text-sm text-link-navy underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Facebook
              </a>
            </div>
          </div>
        </Container>

        <Container>
          <div className="border-t border-white/10 py-6">
            <p className="text-xs text-on-navy/70">
              Copyright © {year} Ateneo Celadon. All rights reserved.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
