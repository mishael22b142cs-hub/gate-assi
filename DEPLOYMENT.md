# Deploying to Vercel

The frontend (Vite static build) and the backend (Express) are deployed together
to **one** Vercel project on the **same domain**:

- `https://<your-app>.vercel.app/`            → React app (`frontend/dist`)
- `https://<your-app>.vercel.app/api/...`     → Express serverless function (`api/index.js` → `backend/app.js`)

Because they share an origin, the auth cookie is first-party and no CORS config
is needed in production.

---

## 1. Create a MongoDB Atlas database (required)

The app can't use your local MongoDB in production.

1. Go to <https://www.mongodb.com/cloud/atlas/register> and sign in.
2. **Create a free cluster** (M0). Pick any provider/region.
3. **Database Access** → *Add New Database User* → username + password
   (use the "Autogenerate Secure Password" button and copy it).
4. **Network Access** → *Add IP Address* → **Allow Access from Anywhere**
   (`0.0.0.0/0`). Vercel functions don't have static IPs.
5. **Clusters** → *Connect* → *Drivers* → copy the connection string. It looks like:

   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

   Replace `<password>` with the real password. You do **not** need to add a
   database name to the string — the app uses the `gate-prep` database
   automatically (`dbName` option in `backend/config/mongodb.js`).

---

## 2. Push the repo to GitHub

```bash
git add .
git commit -m "Set up Vercel deployment"
git push
```

`backend/.env` is no longer tracked — production secrets come from Vercel
environment variables (next step).

---

## 3. Import the project into Vercel

1. <https://vercel.com/new> → import your GitHub repo.
2. **Root Directory:** leave as the repo root (`.`) — do **not** set it to
   `frontend` or `backend`.
3. **Framework Preset:** "Other" (the included `vercel.json` handles the build).
   Vercel will run:
   - install: `npm install` at the root (installs the API's dependencies)
   - build:   `cd frontend && npm install && npm run build`
   - output:  `frontend/dist`
4. Add **Environment Variables** (Settings → Environment Variables), for all
   environments (Production, Preview, Development):

   | Name          | Value                                                        |
   |---------------|--------------------------------------------------------------|
   | `MONGODB_URL` | your Atlas `mongodb+srv://...` string from step 1            |
   | `JWT_SECRET`  | a long random string — `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |

   `NODE_ENV=production` is set by Vercel automatically. Do **not** set
   `VITE_API_URL` — `frontend/.env.production` leaves it empty so the app uses
   relative `/api` requests.

5. Click **Deploy**.

---

## 4. Verify

- `https://<your-app>.vercel.app/api` → `{"success":true,"message":"API Working"}`
- Open the site, sign up, complete the profile, refresh → you stay logged in
  and see your real name / branch / year.

---

## Deploying with the CLI instead

```bash
npm i -g vercel
vercel login
vercel link            # once, to connect the folder to a project
vercel env add MONGODB_URL production
vercel env add JWT_SECRET production
vercel --prod
```

---

## Local development is unchanged

```bash
# terminal 1
cd backend && npm run dev        # http://localhost:4000

# terminal 2
cd frontend && npm run dev       # http://localhost:5173
```

`frontend/.env` still points `VITE_API_URL` at `http://localhost:4000` for dev;
`frontend/.env.production` (empty) is only used by `npm run build`.

---

## Troubleshooting

- **500 / "Database unavailable"** — check `MONGODB_URL` in Vercel env vars and
  that Atlas Network Access allows `0.0.0.0/0`. Redeploy after changing env vars.
- **API route 404s** — confirm the project Root Directory is the repo root and
  `api/index.js` + `vercel.json` are committed.
- **Function build can't find `backend/`** — make sure `backend/` (minus
  `node_modules`) is committed; `api/index.js` imports `../backend/app.js`.
- **Login works but refresh logs you out** — the cookie is `Secure` in
  production, which needs HTTPS. Vercel URLs are HTTPS, so this only bites on a
  custom setup without TLS.
