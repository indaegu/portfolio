# Rendering, loading and copy fixes — 2026-09-18

## Baseline and scope

Base commit: `9d317abc46e299a59e9d2953acb058aac1d2eb71`.
GitHub Pages builds `dist/` from `src/`; the root `index.html` is a legacy page.
The workflow, project IDs and links are unchanged. Local CSS optimizations are retained.

The original content module, template, build/check/serve scripts, package.json and
Node content tests were verified against their GitHub blob IDs before validation.
CSS/JS and branding were recovered from the existing Pages build and their blob
IDs verified. No synthetic project-content fixture is used for these checks.

## Changes

- Keep the hero headline smaller: desktop cap 54px; 24–32px on narrow screens.
- Reserve a 470px square flex item for the orbit. Previously, at 390px viewport
  width it could shrink to 370px wide while its height remained 470px.
- Remove the 1.8s orbit entrance that changed rotation and opacity after JS loaded.
  The finished CSS pose is visible before JS. Use 12 rings instead of 24, without
  per-ring shadows. Handle pointer movement only when visible and motion is allowed.
- Remove whole-card entrances, large cover hover transforms and the sticky-header
  backdrop blur. Keep small call-to-action feedback. These remove known rendering
  work; no claim is made about the user's actual GPU bottleneck or FPS gain.
- Preserve the local CSS scroll-timeline progress bar with a feature-query fallback.
  No JS progress loop or per-scroll document-height reads. Cancel pointer effects
  when hidden or disabled; retain small project-info entrances, never the artwork.
- Use installed Korean system fonts rather than a blocking third-party font
  stylesheet. Append performance.css to the existing CSS output at build time;
  content-hash query strings invalidate CSS/JS caches without an extra stylesheet.
- Keep the earlier project ordering and rewrite the copy using concrete work
  descriptions. See COPY_STYLE.md. Underlying experience and case body paragraphs
  are unchanged and protected by a copy-regression test.

## Reproduce

```sh
npm run check
BASE_PATH=/ npm run check
# Requires Python Playwright and Chromium:
python tests/performance_browser.py
```

Windows PC verification (2026-09-19): 29 tests, 11 built pages, 173 local references. Both the
`/portfolio` and `/` base paths are checked before delivery.

The optional offline browser test renders the built HTML/CSS/JS at seven widths
(320, 390, 560, 768, 1024, 1440 and 1920px), plus nine case pages. It checks square
orbit geometry, no startup animation, delayed JS, no horizontal overflow, static
project-card entrances, motion toggle and live reduced-motion preferences.
Screenshots are written to `.test-output/`. The existing browser_smoke.py is a
separate offline interaction suite; its execution is not implied by this test.

Earlier sandbox validation passed the offline rendering suite. Its HTTP browser
navigation attempt was blocked (`net::ERR_BLOCKED_BY_ADMINISTRATOR`).
After merging the local Windows changes, Node tests and both builds were rerun
successfully. Browser suites were not rerun on this PC because Python Playwright
is not installed. HTTP navigation/E2E remains unverified.

These checks are not benchmarks of the user's GPU, real network throughput,
production Core Web Vitals or FPS.
