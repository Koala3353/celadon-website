import Link from "next/link";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/recruitment", label: "Recruitment" },
  { href: "/departments", label: "Departments" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-brand text-brand-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-xl font-medium tracking-tight text-brand-foreground"
        >
          COnstruct
        </Link>
        <nav className="hidden gap-8 text-sm font-medium text-brand-muted-foreground sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-brand-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/recruitment"
          className="hidden rounded-full bg-highlight px-4 py-2 text-sm font-medium text-highlight-foreground transition-opacity hover:opacity-90 sm:inline-block"
        >
          Apply Now
        </Link>
        <MobileNav />
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <details className="relative sm:hidden">
      <summary className="list-none cursor-pointer rounded-md border border-brand-muted-foreground/40 px-3 py-1.5 text-sm font-medium text-brand-foreground">
        Menu
      </summary>
      <div className="absolute right-0 mt-2 flex w-48 flex-col gap-1 rounded-lg border border-border bg-background p-2 shadow-lg">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/recruitment"
          className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
        >
          Apply Now
        </Link>
      </div>
    </details>
  );
}
