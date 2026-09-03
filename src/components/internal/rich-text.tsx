import type { AboutRun } from "@/lib/deputy-departments";

/** Renders one run of a rich-text paragraph, applying bold, italic, and/or
 * the department's own accent color. */
export function AboutRunText({ run }: { run: AboutRun }) {
  let node: React.ReactNode = run.text;
  if (run.italic) node = <em className="italic">{node}</em>;
  if (run.bold) node = <strong className="font-bold">{node}</strong>;
  if (run.accent) node = <span className="text-dept-accent">{node}</span>;
  return <>{node}</>;
}

/** Matches a short leading "Label: " prefix — deliberately conservative (a
 * handful of words, no sentence-ending punctuation before the colon) so it
 * only fires on genuine labels, not a colon that happens to appear early in
 * an ordinary sentence. */
const LABEL_PREFIX = /^([A-Za-z][A-Za-z0-9 &'/-]{1,48}):\s+([\s\S]+)$/;

/** Renders a bullet item, bolding and accent-coloring a leading "Label:"
 * prefix if present — used where a department's own material highlights
 * those labels in its brand color. Falls back to plain text otherwise. */
export function LabeledItemText({ text }: { text: string }) {
  const match = LABEL_PREFIX.exec(text);
  if (!match) return <>{text}</>;
  const [, label, rest] = match;
  return (
    <>
      <span className="font-bold text-dept-accent">{label}:</span> {rest}
    </>
  );
}

/** Renders a list of rich-text paragraphs (each an array of runs) as `<p>`s. */
export function RichParagraphs({
  paragraphs,
  className,
  paragraphClassName,
  ...props
}: {
  paragraphs: AboutRun[][];
  className?: string;
  paragraphClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className={paragraphClassName}>
          {paragraph.map((run, j) => (
            <AboutRunText key={j} run={run} />
          ))}
        </p>
      ))}
    </div>
  );
}
