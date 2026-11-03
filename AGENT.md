# portfolio

A personal "coming soon" / pre-launch portfolio page for Gilead Odo, displayed while the full portfolio is under development.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.9
- **UI Library**: shadcn/ui (`class-variance-authority`, `clsx`, `tailwind-merge`)
- **Icons**: Lucide React (`lucide-react`)
- **Styling**: Tailwind CSS v4 CSS-first (`tw-animate-css`, `shadcn/tailwind.css`)
- **Theming**: next-themes 0.4 (with custom `ThemeProvider` + `ThemeHotkey`)
- **Email**: Resend (`resend`)
- **HTTP Client**: Axios
- **Package Manager**: pnpm

## Project Structure

```
src/
  app/
    layout.tsx           # Root layout (Inter font, ThemeProvider)
    page.tsx             # Home / landing page
    globals.css          # Tailwind v4 CSS-first config (@theme tokens, CSS variables, base styles)
    contact/
      page.tsx           # Contact form page
  components/
    theme-hotkey.tsx     # Keyboard shortcut for theme toggling
    theme-provider.tsx   # next-themes provider wrapper
    ui/
      button.tsx         # shadcn/ui Button
      card.tsx           # shadcn/ui Card
      input.tsx          # shadcn/ui Input
      label.tsx          # shadcn/ui Label
      textarea.tsx       # shadcn/ui Textarea
  lib/
    utils.ts             # cn() utility (clsx + tailwind-merge)
  pages/
    api/
      send-email.ts      # Resend email API route (active)
      hello.ts           # Default Next.js hello route
public/                  # Static assets
```

## Key Conventions

- Pages use the Next.js App Router (`src/app/`)
- API routes remain in `src/pages/api/` (Pages Router API coexisting with App Router)
- shadcn/ui components live in `src/components/ui/`; shared components in `src/components/`
- `cn()` from `src/lib/utils.ts` is used for conditional class merging
- API responses follow the shape `{ entity?: string; message: string }`
- Tailwind v4 CSS-first: no `tailwind.config.ts`; design tokens (colors, radii) are defined via `@theme inline` in `globals.css`; PostCSS wired via `postcss.config.mjs`; dark mode via `@custom-variant dark (&:is(.dark *))`

## Environment Variables

| Variable         | Description                      |
| ---------------- | -------------------------------- |
| `RESEND_API_KEY` | Resend API key for sending email |

Set these in a `.env.local` file (not committed to git).

## Development

```bash
pnpm dev      # Start dev server (http://localhost:3000)
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Email Flow

Contact form (`/contact`) → `POST /api/send-email` → Resend → `odogilead@gmail.com`

- Sender address: `info@gileadodo.xyz`
- Email template is an inline HTML string in `send-email.ts`
