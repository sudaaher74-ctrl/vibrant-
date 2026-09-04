# VAULK — website design build

A static, single-page marketing site built to match the design language of
`https://vaulk.com/en-GB` (modular UHPC CBRN shelters).

## Run it

No build step, no dependencies:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

Any static host will serve it as-is (GitHub Pages, Netlify, S3, nginx).

## Files

```
index.html              markup + all copy
assets/css/style.css    design system and layout
assets/js/main.js       preloader, nav, reveals, accordion, tabs, form
```

## Design system

Tokens are declared once at the top of `style.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--bg` / `--bg-2` | `#0c0c0c` / `#0e0f0f` | dark sections |
| `--light` / `--light-3` | `#dce0dd` / `#c8cdc9` | light sections |
| `--accent` / `--accent-hot` | `#f4682b` / `#ff401f` | single accent |
| `--line` | `#2d3030` | hairline rules |
| `--sans` | Archivo | headings, body |
| `--mono` | Chivo Mono | labels, numbers, specs |

The layout alternates dark and light full-bleed bands, uses hairline rules and
`001`-style monospace numbering for section structure, and reserves the orange
for exactly one thing per screen.

### Fonts

The reference site uses **Telegraf**, a commercial face from Pangram Pangram
that cannot be redistributed here. **Archivo** (Google Fonts) stands in for it —
same wide neo-grotesque character, free to use. **Chivo Mono** is the reference's
actual mono and is used directly. To switch to Telegraf, buy a licence, drop the
`.woff2` files in `assets/fonts/`, add an `@font-face` block, and change
`--sans`; nothing else needs to move.

## Sections

Hero → statement → UHPC material → core module + specs → LUNOR partner →
logistics timeline (D+0 → D+7) → protection matrix (accordion) →
five use cases (tabs) → contact form → footer.

## Behaviour

- **Preloader** counts 0→100 with an easing tail, and has a 4.5s hard timeout so
  the page can never be trapped behind it.
- **Scroll reveals** stagger siblings; anything on the first screen is shown
  immediately rather than waiting for a scroll.
- **Accordion** is single-open, **use cases** are arrow-key navigable tabs.
- `prefers-reduced-motion` disables the preloader animation, the entrance
  animations and all transitions.
- Responsive at 1080px, 860px (mobile nav) and 520px; verified with zero
  horizontal overflow at 1440px and 390px.

## Not wired up

The contact form is **front-end only** — submitting reports a demo message and
sends nothing. Point it at a backend or a form service before going live. The
FR/EN switch is presentational; there is no second locale yet.

## Content note

The copy, company details and standards references are taken from the reference
site for layout fidelity. Replace them with your own before publishing — and note
that the imagery here is CSS/SVG placeholder work, not the original photography.
