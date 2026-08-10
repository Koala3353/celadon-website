import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="sky-wash relative isolate overflow-hidden">
      <div aria-hidden className="paper-grid absolute inset-0 opacity-60" />
      <Container className="relative flex flex-col items-start gap-6 pb-32 pt-24">
        <p className="font-hanzi text-2xl font-bold text-green-ink">迷路了</p>
        <h1 className="font-poster text-5xl text-red sm:text-6xl">
          This corner of the village doesn&apos;t exist
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          The page you were looking for isn&apos;t here. Try the map instead.
        </p>
        <Link
          href="/"
          className="rounded-full bg-red px-7 py-3.5 font-display text-base font-bold text-cream transition-transform hover:-translate-y-0.5"
        >
          Back to Celaville
        </Link>
      </Container>
      <div aria-hidden className="absolute inset-x-0 bottom-0">
        <div className="fence h-5 w-full opacity-70" />
        <div className="hill h-14 w-full" />
      </div>
    </section>
  );
}
