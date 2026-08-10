import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-brand text-brand-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-lg">COnstruct</p>
          <p className="mt-1 max-w-sm text-sm text-brand-muted-foreground">
            Celadon&apos;s official digital portfolio and recruitment portal,
            built in collaboration with COMMPUB.
          </p>
        </div>
        <div className="flex gap-10 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-brand-foreground">Explore</span>
            <Link href="/projects" className="text-brand-muted-foreground hover:text-brand-foreground">
              Projects
            </Link>
            <Link href="/departments" className="text-brand-muted-foreground hover:text-brand-foreground">
              Departments
            </Link>
            <Link href="/about" className="text-brand-muted-foreground hover:text-brand-foreground">
              About
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-brand-foreground">Get Involved</span>
            <Link href="/recruitment" className="text-brand-muted-foreground hover:text-brand-foreground">
              Open Roles
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-brand-muted-foreground/20 px-6 py-4 text-center text-xs text-brand-muted-foreground">
        © {new Date().getFullYear()} Celadon. All rights reserved.
      </div>
    </footer>
  );
}
