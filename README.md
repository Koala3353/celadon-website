# COnstruct — Celadon

Celadon's digital portfolio and recruitment portal. Next.js 16 (App Router) +
Tailwind v4 + Supabase.

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in the values
npm run dev
```

### Known build quirk

`next build` (Turbopack, the default) currently fails to load the
`lightningcss` native binding through the PostCSS worker used by Tailwind v4:

```
Error evaluating Node.js code
Error: Cannot find module '../lightningcss.darwin-arm64.node'
```

Use the webpack builder until this is resolved upstream:

```bash
npx next build --webpack
```

## Architecture

| Surface | Rendering | Notes |
| --- | --- | --- |
| `/`, `/about`, `/departments`, `/projects`, `/recruitment` | Static, ISR 15m–1h | Supabase reads at build time |
| `/projects/[slug]`, `/recruitment/roles/[slug]` | SSG via `generateStaticParams` | ~78 role pages, 5 project pages |
| `/admin/login`, `/admin/metrics` | Dynamic (server) | Shared-password gate |
| `/api/admin/*` | Route handlers | Service-role writes, gated by `src/proxy.ts` |

`src/proxy.ts` is Next 16's renamed middleware; it guards `/admin/metrics/*`
and `/api/admin/*`.

## Deployment

### GitHub Pages (public site only)

GitHub Pages is a static file host. It cannot run route handlers, Proxy
(middleware), or dynamic pages, so **the admin surface is excluded from the
Pages build**. `scripts/build-pages.sh` moves `src/app/admin`, `src/app/api`,
and `src/proxy.ts` aside, builds with `output: "export"`, and restores them.

```bash
PAGES_BASE_PATH=/celadon-website ./scripts/build-pages.sh   # → ./out
```

CI: [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)
runs on every push to `main`.

Required repository secrets (Settings → Secrets and variables → Actions):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Consequences of the static build:

- Content is a **snapshot**. `revalidate` does nothing on a static host —
  Supabase edits only appear after a rebuild. Re-run the workflow (or push) to
  refresh.
- `/admin/*` returns 404 on Pages. Editing metrics requires running the app
  somewhere with a Node runtime.

### Full app (with admin)

Deploy to any Node host (Vercel, Fly, a container). Set all four variables from
`.env.local.example`; `SUPABASE_SERVICE_ROLE_KEY` must stay server-side.
