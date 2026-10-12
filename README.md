# Portfolio Website

Single-page portfolio with a React frontend, an Express API, and PostgreSQL storage.

## Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- PostgreSQL

## Set up PostgreSQL

Create a database named `portfolio_db`, then run `backend/src/config/schema.sql` against it. The SQL file creates the project and contact-message tables and inserts sample project records.

## Start the backend

In a terminal:

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Edit `backend/.env` and set `DATABASE_URL` and `FRONTEND_URL`. Start the API with:

```powershell
npm run dev
```

The API listens on `http://localhost:5000` by default. Contact messages are stored in PostgreSQL; email notifications are not configured.

## Start the frontend

In a second terminal:

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Set `VITE_API_URL` in `frontend/.env` if the API is not at `http://localhost:5000`.

## Contact rate limit

The contact endpoint accepts up to 5 submissions per IP address every 15 minutes. The default limiter store is in memory, so counters reset when the API restarts and are not shared between multiple API instances. Use a shared store if you deploy multiple instances.

If the API runs behind a reverse proxy, set `TRUST_PROXY_HOPS` in `backend/.env` to the number of trusted proxy hops so Express can identify visitor IP addresses correctly. Leave it unset for direct local access.

## Frontend commands

From `frontend/`:

- `npm run build` — create a production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run Oxlint
