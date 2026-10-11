import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing. Add it to Backend/.env");
}

const env = {
  port: Number(process.env.PORT) || 8000,
  backendUrl: process.env.BACKEND_URL || "http://localhost:8000",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  databaseUrl: process.env.DATABASE_URL,
};

export default env;
