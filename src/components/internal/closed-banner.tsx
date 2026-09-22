/**
 * A notice pinned just under the internal nav, for application sections that
 * have closed.
 *
 * These pages are no longer linked from anywhere in the portal, but the URLs
 * still resolve — they're in old email blasts, group chats and browser
 * history. Someone arriving that way would otherwise read a page full of
 * present-tense "apply now" copy with no hint that the form is shut. This
 * says so before they scroll.
 *
 * Deliberately `fixed` rather than sticky: it has to be true the whole way
 * down the page, not just at the top. It sits one layer below the nav so the
 * mobile menu overlays it, and `BackLink` is offset to clear it.
 */
export function ClosedBanner({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="status"
      style={{ zIndex: "calc(var(--z-nav) - 1)" }}
      className="fixed inset-x-0 top-16 border-b border-navy/10 bg-navy/[0.06] backdrop-blur-md sm:top-[4.5rem]"
    >
      <p className="prose-body px-4 py-2 text-center text-xs text-muted-foreground sm:px-6 sm:text-sm">
        {children}
      </p>
    </div>
  );
}
