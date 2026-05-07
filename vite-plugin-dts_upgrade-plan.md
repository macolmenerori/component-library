# Context

Dependabot opened a PR upgrading `vite-plugin-dts` from `4.5.4` to `5.0.0`. The user wants to know if the upgrade is safe or if breaking changes require code modifications before merging.

## Research Summary

`vite-plugin-dts` v5 is a major architectural overhaul: the core logic was extracted into a new package `unplugin-dts`, and `vite-plugin-dts` is now a two-line re-export shim:

```ts
export { default } from 'unplugin-dts/vite'
export { type PluginOptions, editSourceMapDir } from 'unplugin-dts'
```

There is **no formal changelog** for v5.0.0 (only betas with no notes), and the README now says "Do not recommend anymore, please use `unplugin-dts` instead."

## Breaking Changes That Affect This Project

Both are in `vite.config.ts` at the `dts({ ... })` call (lines 16–21):

### 1. `rollupTypes` renamed to `bundleTypes`

| v4 | v5 |
|---|---|
| `rollupTypes: false` | `bundleTypes: false` (or just omit — it defaults to `false`) |

Current code uses `rollupTypes: false`. This option no longer exists in v5's `PluginOptions`. TypeScript strict mode will flag it as an unknown property, and `tsc --noEmit` (which runs first in `pnpm build`) will **error**, breaking the build.

Fix: remove `rollupTypes: false` entirely (since `bundleTypes` defaults to `false`, behavior is identical).

### 2. `outDir` renamed to `outDirs`

| v4 | v5 |
|---|---|
| `outDir: 'dist/types'` | `outDirs: 'dist/types'` |

Current code uses `outDir: 'dist/types'`. Same situation — unknown property in v5's types, will cause `tsc --noEmit` to error. The `outDirs` option in v5 accepts the same string format so no value change is needed, just the key name.

Fix: rename `outDir` → `outDirs`.

## Options That Are Safe (No Changes Needed)

- `include: ['src/**/*.ts', 'src/**/*.tsx']` — unchanged in v5
- `exclude: ['src/main.tsx', 'src/App.tsx', 'src/Playground.tsx']` — unchanged in v5
- Import path `import dts from 'vite-plugin-dts'` — still works, package still published

## Other v5 Changes That Don't Affect This Project

- `@microsoft/api-extractor` moved to optional peer dep (not used — `rollupTypes`/`bundleTypes` is `false`)
- `@vue/language-core` moved to optional peer dep (no Vue files in project)
- `logLevel` option removed (not used in this project)
- `copyDtsFiles` default changed for non-Vite bundlers (Vite build unaffected)

## Required Code Change

**File**: `vite.config.ts` lines 16–21

```ts
// BEFORE (v4)
dts({
  include: ['src/**/*.ts', 'src/**/*.tsx'],
  exclude: ['src/main.tsx', 'src/App.tsx', 'src/Playground.tsx'],
  outDir: 'dist/types',
  rollupTypes: false
})

// AFTER (v5)
dts({
  include: ['src/**/*.ts', 'src/**/*.tsx'],
  exclude: ['src/main.tsx', 'src/App.tsx', 'src/Playground.tsx'],
  outDirs: 'dist/types'
})
```

## Verification

After the change, run:
1. `pnpm install` — installs v5
2. `pnpm types` — confirms `tsc --noEmit` passes with no unknown-property errors
3. `pnpm build` — confirms the full build succeeds and `dist/types/` is populated correctly

Then push to the branch `claude/review-vite-plugin-dts-upgrade-gqrDE` and the build result confirms safe merge.