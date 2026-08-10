import { Container } from "@/components/ui/container";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}) {
  const { redirect = "/admin/metrics", error } = await searchParams;

  return (
    <Container className="flex min-h-[60vh] items-center justify-center py-16">
      <form
        action="/api/admin/login"
        method="POST"
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-border p-8"
      >
        <h1 className="font-display text-2xl font-medium">Admin Access</h1>
        <p className="text-sm text-muted-foreground">
          Enter the shared password to edit project metrics.
        </p>
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            Incorrect password. Try again.
          </p>
        )}
        <input type="hidden" name="redirect" value={redirect} />
        <input
          type="password"
          name="password"
          required
          autoFocus
          placeholder="Password"
          className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Sign in
        </button>
      </form>
    </Container>
  );
}
