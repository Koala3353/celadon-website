import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { copy } from "@/lib/content";

export function SiteFooter({ note }: { note: string }) {
  const instagram = copy("org_instagram");
  const facebook = copy("org_facebook");

  return (
    <footer className="mt-24">
      {/* The grass horizon that closes every brand-book slide. */}
      <div aria-hidden className="hill h-24 w-full" />

      <div className="bg-green text-cream">
        <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/brand/celaville-mark.png"
              alt=""
              width={512}
              height={512}
              className="h-14 w-14 shrink-0"
            />
            <div>
              <p className="font-poster text-xl">Celaville</p>
              <p className="mt-1 text-sm text-cream/80">{note}</p>
            </div>
          </div>

          <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/recruitment"
              className="font-display text-sm font-semibold underline-offset-4 hover:underline"
            >
              Open roles
            </Link>
            <a
              href={instagram}
              className="font-display text-sm font-semibold underline-offset-4 hover:underline"
            >
              Instagram
            </a>
            <a
              href={facebook}
              className="font-display text-sm font-semibold underline-offset-4 hover:underline"
            >
              Facebook
            </a>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
