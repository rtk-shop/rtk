This is a [Next.js 15](https://nextjs.org/) project
The `/font` directory contains custom font.

## Getting Started

Run the development server:

```bash
npm run dev
```

## Features

Some generally accepted approaches and practices implemented in this project

- [GraphQL Cursor Connections Specification (pagination)](https://relay.dev/graphql/connections.htm)

- [Sprite based `SVG` assets](https://neodx.pages.dev/svg/)

- [GraphQL generation](https://the-guild.dev/graphql/codegen/docs/advanced/generated-files-colocation)

- [Tailwind](https://tailwindcss.com)

- [Localization](https://next-intl.dev)

- [Domain entities state cache based](https://commerce.nearform.com/open-source/urql/docs/graphcache/normalized-caching/)

## Important

In monorepo, [symbolic links](https://en.wikipedia.org/wiki/Symbolic_link) are used to optimize storage of static files in `packages/icons`, so please check that your git system on Windows supports this behavior.

Local support

```bash
git clone -c core.symlinks=true
```
