# MorganHacks 2026 Website

Official website for Morgan State University’s 2026 hackathon. Built with Next.js App Router and a custom, neon city theme.

## Stack
- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Radix UI primitives
- Vercel Analytics (optional)

## Local Development
Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

## Scripts
- `npm run dev` — start development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — lint the codebase

## Project Structure
- [app/](app) — routes and pages
- [components/](components) — UI building blocks
- [public/](public) — static assets and JSON content
- [lib/](lib) — shared utilities

## Content Notes
- Tracks, sponsors, and team data live in [public/](public)
- Hero date currently set to April 11–12, 2026

## Deployment
Deploy on Vercel or any platform that supports Next.js. Configure environment variables as needed for analytics.
