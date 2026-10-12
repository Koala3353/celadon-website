import { SkeletonImage } from "@/components/ui/skeleton-image";
import { asset } from "@/lib/asset";
import type { DeptContact } from "@/lib/deputy-departments";

function initials(name: string): string {
  return name
    .split(" ")
    .filter((part) => /^[A-Za-z]/.test(part) && !/^[A-Z]\.$/.test(part))
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/**
 * The project managers' contact cards, in the same format as the Wave 1
 * project pages: a round photo, name, role, then "Facebook | Email". Until
 * a PM's `photo` is set, their initials hold the photo's place at the same
 * size, so adding the photo later doesn't move anything.
 */
export function PmContacts({ contacts }: { contacts: DeptContact[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {contacts.map((contact) => (
        <div key={contact.name} className="flex flex-col items-center gap-2 text-center" data-reveal>
          {contact.photo ? (
            <SkeletonImage
              src={asset(contact.photo)}
              alt={contact.name}
              width={112}
              height={112}
              containerClassName="h-28 w-28 rounded-full"
              className="h-28 w-28 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-dept-accent/15">
              <span className="display text-2xl text-dept-ink/60">{initials(contact.name)}</span>
            </div>
          )}
          <p className="font-bold text-dept-ink">{contact.name}</p>
          <p className="text-sm text-muted-foreground">{contact.role}</p>
          <p className="text-sm">
            {contact.facebook && (
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link underline-offset-2 hover:underline"
              >
                Facebook
              </a>
            )}
            {contact.facebook && contact.email && " | "}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="text-link underline-offset-2 hover:underline">
                Email
              </a>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
