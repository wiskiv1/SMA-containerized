/**
 * @author Witse Panneels
 *
 * This file sets up the separate market engine and the http sever needed to communicate with it
 */
import "dotenv/config";
import http from "http";
import route from "./api/router";
import SMAconfig from "./config";
import { market } from "@src/stock_market_anywhere/engine/StockMarketAnywhere";

console.log("--- Starting backend ---");
// get process variables
const port = process.env.MARKET_PORT ? Number(process.env.MARKET_PORT) : 4000;
const host = process.env.MARKET_HOST ? process.env.MARKET_HOST : "0.0.0.0";

// setup market
console.log("--- Seeding Market ---");
market.seed(SMAconfig);

const server = http.createServer(async (req, res) => {
  await route(req, res);
});
server.listen(port, host, () => {
  console.log(`listening on http://${host}:${port}`);
  console.log("--- DONE ---");
});
