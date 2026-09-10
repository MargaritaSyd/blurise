# blurise

React component library with cinematic motion — blur-rise, staggered reveals, grain, and idle float.

Animations live in CSS. React only orchestrates classes, stagger indices, and optional in-view triggers.

## Install

```bash
npm install blurise
```

**Peer dependencies:** `react` and `react-dom` ≥ 18.

## Quick start

```tsx
import { BlurRise, Button, Card, Heading, Stagger, Text } from 'blurise';
import 'blurise/styles.css';

export function Hero() {
  return (
    <Stagger gap={80}>
      <BlurRise>
        <Card rise grain>
          <Heading as="h1">Cinematic UI</Heading>
          <Text tone="muted">Mostly CSS. Quiet motion by default.</Text>
          <Button>Start</Button>
        </Card>
      </BlurRise>
    </Stagger>
  );
}
```

Import `blurise/styles.css` once at the app root. Tokens use the `--br-*` prefix; classes use `.br-*`.

## Themes

Default (and `:root`) is dark. Switch with `data-br-theme`:

```html
<div data-br-theme="light">…</div>
```

## Motion language

| Primitive  | React                  | Role                                                 |
| ---------- | ---------------------- | ---------------------------------------------------- |
| Blur rise  | `BlurRise`             | Enter with blur + lift + opacity. Optional `inView`. |
| Blur fade  | `BlurFade`             | Enter with blur + opacity (no translate).            |
| Scale rise | `ScaleRise`            | Enter with blur + lift + soft scale.                 |
| Slide      | `Slide`                | Enter from `up` / `down` / `left` / `right`.         |
| Clip wipe  | `ClipWipe`             | Clip-path reveal from an edge.                       |
| Blur fall  | `BlurFall`             | Exit with blur + drop + fade (`active`).             |
| Stagger    | `Stagger`              | Cascading delays via `--br-i`.                       |
| Grain      | `Grain` / `Card grain` | Film texture overlay (not motion).                   |
| Idle float | `Float` / `Card float` | Soft translate/rotate loop.                          |
| Breathe    | `Breathe`              | Soft scale pulse (when translate would collide).     |
| Shimmer    | `Shimmer`              | Loading / skeleton highlight sweep.                  |

Keep transform animations on separate wrappers so rise and float do not collide:

```tsx
<BlurRise>
  <Float>
    <Grain>
      <YourSurface />
    </Grain>
  </Float>
</BlurRise>
```

## Kit surface (v0.5)

- **Action:** `Button`, `IconButton`, `Link`
- **Surface:** `Card`, `Badge`, `Avatar`, `Separator`
- **Type:** `Heading`, `Text`
- **Form:** `Input`, `Textarea`, `Label`, `Checkbox`, `Switch`
- **Layout:** `Stack`, `Grid`, `Container`
- **Overlays:** `Dialog`, `Menu`, `Tooltip`, `ToastProvider` / `useToast`, `Tabs`, `Accordion`

## Accessibility

- `prefers-reduced-motion` is honored from day one (opacity-only enters/exits; float, breathe, and shimmer disabled).
- Focus-visible rings on interactive controls.
- Dialog traps focus, locks scroll, and closes on Escape.
- Menus and tabs support arrow-key navigation.

## Development

```bash
npm install
npm run storybook
```

| Script                               | What it does                                         |
| ------------------------------------ | ---------------------------------------------------- |
| `npm run storybook`                  | Playground on http://localhost:6006                  |
| `npm run build-storybook`            | Static docs site → `storybook-static/`               |
| `npm run test`                       | Unit tests                                           |
| `npm run build`                      | Library bundle (`dist/index.js` + `dist/styles.css`) |
| `npm run lint` / `npm run typecheck` | Static checks                                        |

Before publishing: see [docs/v1-checklist.md](docs/v1-checklist.md). Changelog: [CHANGELOG.md](CHANGELOG.md).

## License

MIT
