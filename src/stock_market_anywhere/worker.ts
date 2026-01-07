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

// setup market
market.seed(SMAconfig);

const server = http.createServer(async (req, res) => {
  await route(req, res);
});
server.listen(port, "0.0.0.0", () => console.log(`Done! listening on ${port}`));
