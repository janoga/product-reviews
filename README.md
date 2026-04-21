# Product Reviews

## 🎯 Overview

Product Reviews is a web-based product review system where users can browse a catalog of electronics, read customer reviews, and submit their own — modeled after the review experience on Amazon or Alza. The project is a polished MVP that strictly implements the scope defined in [`PRD.md`](./PRD.md) and is built to be easy to set up, extend, and maintain.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+
- **pnpm** 10+
- **Docker** + Docker Compose

### Installation & Development

```bash
git clone <repo-url> product-reviews
cd product-reviews

cp .env.example .env.local

pnpm install

pnpm docker:up
pnpm db:migrate
pnpm db:seed

pnpm dev
```

The app is now running at [http://localhost:3000](http://localhost:3000), pre-populated with 60 products and sample reviews.

### Useful scripts

| Script             | What it does                               |
| ------------------ | ------------------------------------------ |
| `pnpm dev`         | Start the Next.js dev server               |
| `pnpm build`       | Production build                           |
| `pnpm lint`        | Run ESLint                                 |
| `pnpm format`      | Run Prettier                               |
| `pnpm docker:up`   | Start PostgreSQL + MinIO containers        |
| `pnpm docker:down` | Stop containers                            |
| `pnpm db:migrate`  | Apply Prisma migrations                    |
| `pnpm db:seed`     | Seed 60 products and reviews               |
| `pnpm db:studio`   | Open Prisma Studio                         |
| `pnpm db:reset`    | Drop, re-migrate, and re-seed the database |

### Environment Variables

All variables live in `.env.local` (see [`.env.example`](./.env.example) for the full list).

| Variable                  | Purpose                                                    |
| ------------------------- | ---------------------------------------------------------- |
| `DATABASE_URL`            | Postgres connection string used by Prisma                  |
| `POSTGRES_*`              | Credentials + port for the local Postgres container        |
| `MINIO_*`                 | Credentials, bucket, and ports for the local MinIO service |
| `NEXT_PUBLIC_STORAGE_URL` | Public URL the browser uses to load product images         |

The same `.env.local` file is consumed by both the app and `docker-compose.yml`, so one file configures the entire stack.

## 🧱 Tech Stack

- **Next.js 16** (App Router) + **React 19** — Server Components by default, Server Actions for mutations
- **TypeScript** (strict) + **Zod** for end-to-end type safety and validation
- **Prisma 7** + **PostgreSQL 16** — type-safe data layer
- **Tailwind CSS 4** + **shadcn/ui** — accessible, composable UI primitives
- **TanStack Query** — client-side data fetching for infinite scroll
- **React Hook Form** — form state management
- **MinIO** — local S3-compatible storage for product images

## 📁 Project Structure

```
app/         Next.js routes (catalog, category, product detail)
features/    Feature slices — products, reviews, categories
  ├─ components/   UI components for the feature
  ├─ actions.ts    Server Actions (mutations)
  ├─ queries.ts    Server-side data fetching
  └─ repository.ts Prisma data access
lib/         Shared utilities, env parsing, storage, hooks
prisma/      Schema, migrations, seed data
components/  Shared shadcn/ui primitives
```

## 🧠 Design Decisions & Trade-offs

### Next.js App Router + Server Components

The catalog, category, and product pages are Server Components that fetch data directly from Prisma. Mutations (review submission) go through Server Actions. This removes the need for a dedicated API layer and keeps the code simple and type-safe from the database all the way to the UI.

**Trade-off:** infinite scroll is inherently client-side, so those slices use TanStack Query against thin Server Action wrappers. This is the only place where client-side data fetching is introduced.

### Feature-based folder layout

Instead of splitting by technical type (`/controllers`, `/services`, ...), code is grouped by feature (`features/products`, `features/reviews`, `features/categories`). Each feature owns its components, server actions, queries, and repository. This keeps related code colocated and the project trivially extendable.

### Prisma + PostgreSQL

Prisma was chosen for its first-class TypeScript support, migrations, and seeding story. PostgreSQL runs in Docker so local setup is a single command. Average ratings are computed on the server (never on the client) as required by the PRD.

### Docker for local infrastructure

`docker-compose.yml` provisions PostgreSQL and a MinIO bucket out of the box. This means a new developer can go from `git clone` to a running, fully seeded application in under a minute, without installing a database locally.

### MinIO for product images

Product seed images are served from a local S3-compatible bucket so the setup mirrors a realistic production environment (S3/R2/…) while remaining fully local and free. In production, only `NEXT_PUBLIC_STORAGE_URL` and the S3 credentials need to change.

### Strict quality gates

- ESLint + Prettier + `simple-import-sort` + Tailwind plugin
- Husky + lint-staged pre-commit hooks
- `strict` TypeScript, no `any`
- Conventional commit messages

These guardrails keep the codebase consistent as it grows and make onboarding painless.

### What is intentionally out of scope

Authentication, review voting, review moderation, media uploads on reviews, admin tooling, and AI-powered features are explicitly excluded per `PRD.md` to keep the MVP focused and shippable.
