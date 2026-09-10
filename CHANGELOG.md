# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Enter/exit motion: `BlurFade`, `ScaleRise`, `Slide` (`from`), and `BlurFall` (`active`).
- Shared `useMotionActive` for in-view enter primitives.
- Tokens `--br-scale-from` and `--br-slide-from`.
- Storybook: **Motion / Enter exit**.

## [0.5.0] - 2026-09-10

### Added

- Consumer README with install, CSS import, and a short usage example.
- Storybook docs: Introduction and Motion language pages.
- `docs/v1-checklist.md` for the path to a 1.0 release.
- GitHub Pages workflow to publish the Storybook static site.

### Notes

- Library surface from phases 0–3 (tokens, motion primitives, core kit, overlays) is packaged for early adopters.
- Version `0.5.0` marks docs-ready; `1.0.0` follows the v1 checklist.

## [0.1.0] - 2026-09-04

### Added

- Foundation: Vite library build, TypeScript, Storybook, Vitest, ESLint, Prettier, CI.
- Design tokens (`--br-*`) with dark/light themes and reduced-motion overrides.
- Motion primitives: `BlurRise`, `Stagger`, `Grain`, `Float`.
- Core kit: action, surface, type, form, and layout components.
- Overlays: `Dialog`, `Menu`, `Tooltip`, `Toast`, `Tabs`, `Accordion`.
