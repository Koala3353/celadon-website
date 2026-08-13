import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <section className="navy-field text-on-navy">
      <div className="navy-grid">
        <Container className="flex flex-col items-start gap-7 py-32">
          <p className="eyebrow text-link-navy">Error 404</p>
          <h1 className="display max-w-3xl text-5xl text-white sm:text-7xl">
            This page doesn&apos;t exist
          </h1>
          <p className="prose-body max-w-xl text-lg text-on-navy">
            The link may be out of date, or the page may have moved. Everything
            Celadon publishes is reachable from the main navigation.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/" variant="onNavy">
              Back to home
            </ButtonLink>
          </div>
        </Container>
      </div>
    </section>
  );
}
