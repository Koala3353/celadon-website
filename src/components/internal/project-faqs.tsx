import { RichParagraphs } from "@/components/internal/rich-text";
import type { AboutRun } from "@/lib/deputy-departments";

/**
 * A project page's FAQ list, laid out the same on every Wave 2 project:
 * each question in bold in the page's own accent, its answer underneath in
 * the page's body color. Follows the Mandopop page, which set the pattern.
 */
export function ProjectFaqs({ faqs }: { faqs: { q: string; a: string | AboutRun[][] }[] }) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      {faqs.map((faq) => (
        <div key={faq.q} data-reveal>
          <p className="font-bold text-dept-accent">{faq.q}</p>
          <RichParagraphs
            paragraphs={typeof faq.a === "string" ? [[{ text: faq.a }]] : faq.a}
            className="mt-1.5 flex flex-col gap-2"
            paragraphClassName="prose-body opacity-90"
          />
        </div>
      ))}
    </div>
  );
}
