# Dare Brand Kit

Interactive brand styleguide for **Dare** — a living reference for colour tokens, typography, and component patterns.

**[View live](https://ravivasavan.github.io/dare-brand-kit/)**

## Colours

Eight brand colours with click-to-copy values in OKLCH, HEX, and RGB.

| Name | HEX | Usage |
|---|---|---|
| White | `#F4F2F8` | Backgrounds, light surfaces |
| Black | `#201B1C` | Primary text, dark surfaces |
| Celadon | `#9EEBBA` | Accent, success states |
| Peach | `#E7C0A2` | Warm accent, highlights |
| Cornflower | `#9CAFED` | Cool accent, interactive elements |
| Olive | `#8CA474` | Earthy accent, secondary actions |
| Pistachio | `#DDDC8F` | Light accent, callouts |
| Mauve | `#CDC2E3` | Soft accent, decorative elements |

## Typography

| Style | Font | Size | Line Height |
|---|---|---|---|
| Heading H1 | FK Screamer (Bold, Uppercase) | 164px | 100% |
| Heading H2 | FK Screamer (Bold, Uppercase) | 124px | 100% |
| Heading H3 | FK Screamer (Bold, Uppercase) | 80px | 100% |
| Heading H4 | FK Screamer (Bold, Uppercase) | 48px | 100% |
| Heading H5 | FK Screamer (Bold, Uppercase) | 32px | 100% |
| Body Large | Instrument Sans | 48px | 120% |
| Body Regular | Instrument Sans | 32px | 120% |
| Body Small | Instrument Sans | 24px | 120% |
| Caption | Instrument Sans | 16px | 120% |
| Detail | Instrument Sans (Uppercase) | 12px | 100% |

## Components

Interactive demos of brand-themed UI elements:

- **Buttons** — solid and outline variants in all brand colours
- **Chips** — colour-coded labels and tags
- **Cards** — content containers with brand backgrounds
- **Inputs** — text fields and textareas with branded focus states

## Stack

- [Next.js](https://nextjs.org) (static export)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Phosphor Icons](https://phosphoricons.com)
- [Agentation](https://agentation.com) (dev-mode annotation toolbar)
- Deployed via GitHub Pages

## Templates

Starter templates for creating branded documents. Make a copy and go to town.

- [Google Docs](https://docs.google.com/document/d/1UxHglmxxWhBQggPvAas5ooGCgDCh_eAgWK-9GxtV1Bs/edit?tab=t.0#heading=h.e2b3mork447t) — Starter document template

## Development

```bash
npm install
npm run dev
```

Runs at `http://localhost:3000`.

## Fonts

- **FK Screamer** — variable weight, loaded locally from `src/fonts/`
- **Instrument Sans** — loaded via Google Fonts

## Deployment

Pushes to `main` trigger the GitHub Actions workflow which builds and deploys to GitHub Pages automatically.
