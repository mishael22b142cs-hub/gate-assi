// Vercel serverless entrypoint. All /api/* requests are rewritten here
// (see vercel.json) and handled by the Express app.
import app from "../backend/app.js";

export default app;
