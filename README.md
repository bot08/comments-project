# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## API Endpoints

## **Authentication**

- **/api/auth/login**
  - Body: `{ email, password }`

- **/api/auth/register**
  - Body: `{ name, email, password }`

## **Users**

- **/api/users**
  - !auth, Query: `{ page, limit }`

- **/api/users/{user_id}/update**
  - !auth, Body: `{ name, role, isActive }`

- **/api/users/me**
  - !auth

- **/api/users/me/update**
  - !auth, Body: `{ name, email, password }`

- **/api/users/me/sites**
  - !auth, Query: `{ page, limit }`

## **Sites**

- **/api/sites**
  - Query: `{ page, limit }`

- **/api/sites/create**
  - !auth, Body: `{ name, url }`

- **/api/sites/{site_id}**
  - !auth

- **/api/sites/{site_id}/comments**
  - Query: `{ page, limit, branch }`

- **/api/sites/{site_id}/comments/create**
  - !auth, Body: `{ name, content, branch }`

- **/api/sites/{site_id}/comments/{comment_id}/delete**
  - !auth
