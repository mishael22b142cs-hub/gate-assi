import "dotenv/config";
import app from "./app.js";

// Local development entrypoint. On Vercel the app is served by api/index.js
// as a serverless function and this file is not used.
const port = process.env.PORT || 4000;

const server = app.listen(port, () => console.log(`Server started on PORT:${port}`));

server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`Port ${port} is already in use. Stop the other process or set a different PORT in .env.`);
        process.exit(1);
    }
    throw err;
});
