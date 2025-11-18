# React + Vite

## Frontend (Expense Tracker)

This frontend is a small Vite + React app that talks to the Django backend.

Quick start (development)

1. Install dependencies

```bash
cd frontend
npm install
```

2. Create a `.env` file (copy `.env.example`)

```bash
cp .env.example .env
# Edit .env if your backend runs at a different address
```

3. Run the dev server

```bash
npm run dev
```

Notes

- The frontend expects a backend API at `VITE_API_URL` (default: `http://localhost:8000`).
- Basic components exist for budgets and expenses in `src/components`.
- Routes:
	- `/` — budgets (list + create)
	- `/expenses` — expenses (list + create)

Next steps

- Add authentication flows (Login/Register) and protected routes.
- Improve forms with validation and better error handling.
- Add tests and a CI workflow to lint and run tests on PRs.
