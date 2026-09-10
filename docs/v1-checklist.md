# blurise v1.0 checklist

Use this before tagging `1.0.0` and publishing to npm.

## Product

- [ ] Motion language page reviewed in Storybook (rise, stagger, grain, float).
- [ ] Kit / Page landing story still reads as one composition.
- [ ] Overlays: Dialog, Menu, Tooltip, Toast, Tabs, Accordion smoke-tested in Storybook.
- [ ] Light and dark themes checked on Tokens + Actions stories.

## Accessibility

- [ ] `prefers-reduced-motion: reduce` — rise is opacity-only; float stops; dialog/menu remain usable.
- [ ] Keyboard: Tab / Shift+Tab through forms; Escape closes Dialog and Menu; arrows work in Menu and Tabs.
- [ ] Focus-visible rings visible on Button, fields, tabs, and accordion triggers.
- [ ] Dialog restores focus to the opener on close.
- [ ] Contrast: text / muted / accent readable on surface and elevated in both themes.

## Package

- [ ] `npm run lint && npm run typecheck && npm run format:check && npm run test && npm run build` all green.
- [ ] `dist/index.js`, `dist/index.d.ts`, and `dist/styles.css` present; CSS classes/vars stay under `.br-` / `--br-`.
- [ ] Tree-shake smoke: importing `Button` alone does not pull overlay modules (spot-check bundle or import graph).
- [ ] Peer deps documented: `react` / `react-dom` ≥ 18.
- [ ] README install snippet matches published export map (`blurise`, `blurise/styles.css`).
- [ ] `CHANGELOG.md` has a `1.0.0` section.
- [ ] Version bumped to `1.0.0` in `package.json`.

## Publish

```bash
npm run build
npm pack --dry-run   # inspect files that would ship
npm publish --access public
```

Optional: confirm Storybook on GitHub Pages after the docs workflow runs on `main`.

## Out of scope for 1.0

- Extra brand kits beyond dark/light tokens.
- Framer Motion / GSAP / scroll-scrub.
- Vue / Svelte / CSS-only packages.
- Form-library adapters (e.g. React Hook Form).
- Custom icon set.
