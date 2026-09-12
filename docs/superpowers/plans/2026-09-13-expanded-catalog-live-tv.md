# MovieXYZ Expanded Catalog + Live TV Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand MovieXYZ to at least 15 authorized/open movies plus official Philippine live-channel entries with unified search and playback.

**Architecture:** Keep GitHub Pages static. Extend `app.js` with separate movie and live datasets, one catalog search/filter layer, provider-specific playback URL builders, and the existing modal UI. Add CI assertions so unauthorized hosts or catalog regressions block deployment.

**Tech Stack:** Static HTML/CSS, ES modules, Node.js built-in assertions, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-13-expanded-catalog-live-tv-design.md`

## Global Constraints
- No MoviePire scraping or proxying.
- No unauthorized re-hosting.
- Keep the app dependency-free.
- Official-source fallback is mandatory for every playable item.

---

### Task 1: Catalog and source contracts
**Files:** Modify `app.js`; Modify `tests/moviexyz.test.mjs`.
- [x] Write assertions for at least 15 movies, at least 4 live channels, unique IDs, searchable broadcasters, authorized hosts, and stable channel live URLs.
- [x] Implement movie/live datasets and provider-specific URL builders.
- [x] Run `npm test` until all assertions pass.

### Task 2: Movies + Live TV UI
**Files:** Modify `index.html`; Modify `app.js`.
- [x] Add Home, Movies, Live TV, and My List navigation.
- [x] Render distinct live cards and reuse the modal player for movies/live streams.
- [x] Search across movie and live metadata.
- [x] Preserve official-source fallback and mobile layout.

### Task 3: Verification and deployment
**Files:** `package.json`; existing `.github/workflows/pages.yml`.
- [x] Run JavaScript syntax verification and catalog tests.
- [ ] Push complete changes to `main`.
- [ ] Confirm fresh GitHub Actions test + Pages deploy is green.
- [ ] Verify the public GitHub Pages document exposes the expanded navigation/catalog shell.
