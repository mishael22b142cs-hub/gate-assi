// Options for the auth token cookie. The frontend and API share an origin in
// every environment (Vite proxy target in dev, same Vercel domain in prod),
// so SameSite=Lax is enough. `secure` is on only in production (HTTPS).
export const authCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
});

export const AUTH_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days
