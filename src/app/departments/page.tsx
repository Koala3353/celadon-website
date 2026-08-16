import type { Metadata } from "next";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { ayiFor } from "@/lib/ayi";
import { copy, getDepartments } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Departments",
  description: "The six departments that keep Ateneo Celadon running.",
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
        // Alternate which side the mascot sits on so the page doesn't read
        // as six identical rows.
        const flip = i % 2 === 1;
        const tinted = i % 2 === 1;

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
                className={
                  flip
                    ? "grid items-start gap-10 lg:grid-cols-[1.6fr_1fr]"
                    : "grid items-start gap-10 lg:grid-cols-[1fr_1.6fr]"
                }
              >
                {/* Not flipped: the image is left-aligned in its column by
                    default, which strands it far from the text on its right
                    — pull it to the column's end so it sits next to the
                    text instead. Flipped rows don't need this: the image's
                    own column already sits on the right, right next to the
                    text on its left. */}
                <div className={flip ? "lg:order-2" : "lg:justify-self-end"}>
                  {ayi && (
                    <Image
                      src={asset(ayi)}
                      alt={`Ayi in ${department.name} colours`}
                      width={700}
                      height={950}
                      data-reveal
                      className="h-44 w-auto self-start"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-5">
                  <h2 className="display text-4xl text-navy" data-reveal>
                    {department.name}
                  </h2>
                  <p className="prose-body text-muted-foreground" data-reveal>
                    {department.overview}
                  </p>
                </div>
              </div>
            </Container>
          </Reveal>
        );
      })}
    </>
  );
}
