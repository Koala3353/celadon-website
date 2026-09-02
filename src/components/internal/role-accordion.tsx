import type { DeptRole } from "@/lib/deputy-departments";

/**
 * Only rendered where a department actually has more than one distinct
 * applicant-facing position (COMMPUB's five pools) — everything else is a
 * single role described directly in `sections`, no accordion needed.
 */
export function RoleAccordion({ roles }: { roles: DeptRole[] }) {
  return (
    <div className="flex flex-col gap-3">
      {roles.map((role) => (
        <details
          key={role.slug}
          className="group rounded-2xl bg-dept-tint p-1.5 ring-1 ring-inset ring-dept-accent/15"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[1.125rem] bg-white p-5 shadow-[var(--shadow-sm)] transition-colors hover:bg-dept-tint group-open:rounded-b-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-3">
              {role.emoji && <span className="text-xl">{role.emoji}</span>}
              <span className="font-extrabold text-dept-ink">{role.title}</span>
            </span>
            <span
              className="shrink-0 text-dept-ink/50 transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            >
              &#8964;
            </span>
          </summary>
          <div className="rounded-b-[1.125rem] bg-white px-5 pb-5">
            <p className="prose-body text-sm text-muted-foreground">{role.description}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
