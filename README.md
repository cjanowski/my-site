# my-site-woad-ten.vercel.app

Personal site. Next.js 14 (App Router), TypeScript, Tailwind, deployed on Vercel.

## How it's put together

- **One source of truth.** All content lives in `src/content/profile.ts`, mirrored from LinkedIn. It's declared `as const satisfies …`, so it's checked against the schema but keeps literal types; section ids, company names and tech names are derived from the data instead of being repeated.
- **Dates the compiler checks.** `YearMonth` in `src/lib/dates.ts` is a template-literal type, so `'2015-13'` doesn't compile. Durations are computed LinkedIn-style (inclusive months), and the page re-renders daily (`revalidate = 86400`), so "7 mos" and "11+ years" never go stale.
- **Projects can't lie about their stack.** `defineProject` uses a `const` type parameter so a project's `primary` tech must be one of its own `stack` entries.
- **Résumé as code.** The `profile.ts` card in About is generated from the same object by a small tokenizer (`src/lib/tsLiteral.ts`), so it can't drift from the rest of the page.
- **⌘K command palette.** Commands are a discriminated union, handled with an exhaustive `switch` + `assertNever`, with a small fuzzy matcher for search.
- **Theme.** Light and dark, from CSS variables as RGB channels so Tailwind alpha modifiers work. An inline script applies the saved choice before paint, so there's no flash.
- There's also a Konami code.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # type-checks and builds
```

To update content, edit `src/content/profile.ts`.

© Cory Janowski. All rights reserved.
