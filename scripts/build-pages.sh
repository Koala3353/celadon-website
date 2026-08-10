#!/usr/bin/env bash
# Build the public site as a static bundle for GitHub Pages.
#
# GitHub Pages serves files only — it cannot run route handlers, Proxy
# (middleware), or force-dynamic pages. Those surfaces are moved aside for the
# duration of the build and restored on exit, so the working tree is unchanged
# whether the build succeeds or fails.
set -euo pipefail

cd "$(dirname "$0")/.."

STASH=".pages-stash"
# .next/dev/types holds generated route types for the *full* route tree; stale
# entries for the stripped admin routes would fail type checking.
rm -rf "$STASH" out .next
mkdir -p "$STASH/src/app"

restore() {
  [ -d "$STASH/src/app/admin" ] && mv "$STASH/src/app/admin" src/app/admin
  [ -d "$STASH/src/app/api" ]   && mv "$STASH/src/app/api"   src/app/api
  [ -f "$STASH/src/proxy.ts" ]  && mv "$STASH/src/proxy.ts"  src/proxy.ts
  rm -rf "$STASH"
}
trap restore EXIT

[ -d src/app/admin ] && mv src/app/admin "$STASH/src/app/admin"
[ -d src/app/api ]   && mv src/app/api   "$STASH/src/app/api"
[ -f src/proxy.ts ]  && mv src/proxy.ts  "$STASH/src/proxy.ts"

# Turbopack currently fails to load the lightningcss native binding through the
# PostCSS worker (Tailwind v4); the webpack builder handles it correctly.
STATIC_EXPORT=1 npx next build --webpack

touch out/.nojekyll   # keep _next/ from being swallowed by Jekyll

echo "Static site written to ./out"
