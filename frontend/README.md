# Frontend

React single-page portfolio built with Vite and Tailwind CSS.

## Local development

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Set `VITE_API_URL` in `.env` to the backend base URL. If it is omitted, the frontend uses `http://localhost:5000`.

## Available commands

- `npm run dev` — start the development server
- `npm run build` — create a production build in `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run Oxlint

For database and backend setup, see the [project README](../README.md).
