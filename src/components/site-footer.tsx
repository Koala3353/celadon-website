import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { copy } from "@/lib/content";
import { Container } from "@/components/ui/container";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/departments", label: "Departments" },
  { href: "/projects", label: "Projects" },
  { href: "/recruitment", label: "Recruitment" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  const socials = [
    { label: "Instagram", href: copy("org_instagram"), Icon: InstagramIcon },
    { label: "Facebook", href: copy("org_facebook"), Icon: FacebookIcon },
    { label: "TikTok", href: copy("org_tiktok"), Icon: TikTokIcon },
    { label: "Email us", href: `mailto:${copy("org_email")}`, Icon: MailIcon },
  ];

  return (
    <footer className="navy-field mt-20 text-on-navy">
      <div className="navy-grid">
        <Container className="grid gap-8 py-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            {/* The crest already has "Celadon" set into its own artwork, so
                no separate wordmark is stacked underneath it. */}
            <Image
              src={asset("/brand/dreagle-mark-white.png")}
              alt=""
              width={5000}
              height={5000}
              className="h-14 w-auto self-start"
            />
            <span className="sr-only">Ateneo Celadon</span>
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
            <h2 className="eyebrow text-white">Connect with us</h2>
            <address className="prose-body max-w-xs text-sm not-italic">
              {copy("org_address")}
            </address>
            <div className="mt-2 flex gap-4">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-on-navy transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </Container>

        <Container>
          <div className="border-t border-white/10 py-4">
            <p className="text-xs text-on-navy/70">
              Copyright © {year} Ateneo Celadon. All rights reserved.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

type IconProps = { className?: string };

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M15 3h-2a4 4 0 0 0-4 4v3H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TikTokIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M9 12.5a3.5 3.5 0 1 0 3.5 3.5V3.5c.4 2.3 2.3 4.6 5.5 4.9" />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m3 7 8.14 5.7a1.94 1.94 0 0 0 2.06 0L21 7" />
    </svg>
  );
}
