### Fullstack monorepo application: social network for publishing posts, adding friends. Scrolling feed, based on your choosen interests or friends posts.

## Used technologies:

- ### Frontend:
  - [Next.js](https://nextjs.org/)
  - [React](https://react.dev/)
  - [TailwindCSS](https://tailwindcss.com/)
- ### Backend:
  - [Hono](https://hono.dev/)
  - [DrizzleORM](https://orm.drizzle.team/)
  - [PostgreSQL](https://www.postgresql.org/)
- ### Tools:
  - [Turborepo](https://turbo.build/repo)
  - [Docker](https://www.docker.com/)
  - [Bun](https://bun.sh/)

## Getting Started (pnpm required)

### Install dependencies (root folder):

```bash
pnpm install
or
bun install
```

### Run in development mode:

```bash
pnpm run dev
or
bun run dev
```

This comand in the background will fire:

```bash
turbo run dev
```

In `turbo.json`:

```json
"tasks": {
    "dev": {
      "cache": false
    }
  }
```

Starting applications in development mode separately:

- Web: `pnpm run dev:web`
- Api: `pnpm run dev:api`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
API: [http://localhost:4000](http://localhost:4000)

### Run in production mode:

```bash
pnpm run prod
```

This comand in the background will fire:

```bash
turbo run nextjs-frontend#start nestjs-backend#start:prod
```

In `turbo.json`:

```json
"tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/*"]
    },
    "nextjs-frontend#start": {
      "dependsOn": ["build"]
    },
    "nestjs-backend#start:prod": {
      "dependsOn": ["build"]
    }
  }
```

`outputs` in `build` task conigured to cache results of building an application.
