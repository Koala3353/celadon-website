import type { Metadata } from "next";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { ayiFor } from "@/lib/ayi";
import { copy, getDepartments } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";
import { PhotoCarousel } from "@/components/photo-carousel";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Departments",
  description:
    "Meet the six departments that run Ateneo Celadon — COMMPUB, CUL, EXREL, FIN, HR, and OSR — and the Ayi mascot that represents each one.",
  alternates: { canonical: "/departments/" },
};

export default function DepartmentsPage() {
  const departments = getDepartments();

  return (
    <>
      <PageHero
        eyebrow="The organization"
        title={copy("departments_heading")}
        description={copy("departments_body")}
      />

      {departments.map((department, i) => {
        const ayi = ayiFor(department.slug);
        // COMMPUB/EXREL/HR (even rows): carousel on the far left, text on the
        // right. CUL/FIN/OSR (odd rows): mirrored. Ayi always sits in the
        // middle column either way.
        const flip = i % 2 === 1;
        const tinted = i % 2 === 1;

        const ayiEl = ayi && (
          <div className="flex items-center justify-center self-center lg:col-start-2">
            <Image
              src={asset(ayi)}
              alt={`Ayi in ${department.name} colours`}
              width={700}
              height={950}
              data-reveal
              className="h-44 w-auto"
            />
          </div>
        );

        const carouselEl = department.photos.length > 0 && (
          <PhotoCarousel
            photos={department.photos}
            alt={`${department.name} department`}
            data-reveal
            className="aspect-video w-full rounded-2xl"
          />
        );

        const textEl = (
          <div className="flex flex-col gap-5">
            <h2 className="display text-4xl text-navy" data-reveal>
              {department.name}
            </h2>
            <p className="prose-body text-muted-foreground" data-reveal>
              {department.overview}
            </p>
          </div>
        );

        return (
          <Reveal
            as="section"
            key={department.slug}
            className={
              tinted
                ? "scroll-mt-28 bg-navy/[0.035] py-16"
                : "scroll-mt-28 py-16"
            }
          >
            <Container>
              <div
                id={department.slug}
                className="grid items-start gap-8 lg:grid-cols-[1fr_auto_1fr]"
              >
                {flip ? (
                  <>
                    {textEl}
                    {ayiEl}
                    {carouselEl}
                  </>
                ) : (
                  <>
                    {carouselEl}
                    {ayiEl}
                    {textEl}
                  </>
                )}
              </div>
            </Container>
          </Reveal>
        );
      })}
    </>
  );
}
