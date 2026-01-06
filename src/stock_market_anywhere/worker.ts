import { startServer } from "./api/router";

const port = process.env.MARKET_PORT ? Number(process.env.MARKET_PORT) : 4000;

startServer({ port });
