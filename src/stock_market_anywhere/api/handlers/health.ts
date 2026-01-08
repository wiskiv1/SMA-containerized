/**
 * @author Witse Panneels
 */
import http from "http";
import { market } from "@src/stock_market_anywhere/engine/StockMarketAnywhere";
import { json } from "../../utils/networking";

export default function HealthHandler(req: http.IncomingMessage, res: http.ServerResponse, subPath: string) {
  if (req.method === "GET" && subPath === "status") {
    const date = new Date(0);
    date.setSeconds(Math.floor(process.uptime())); // specify value for SECONDS here
    const uptime = date.toISOString().slice(11, 19);

    return json(res, {
      status: "alive",
      uptime: uptime,
      node_version: process.version,
      environment: process.env.NODE_ENV,
      calculator: {
        name: market.getCalculatorName(),
        version: market.getCalculatorVersion(),
        params: market.getCalculatorParams(),
      },
      meta: {
        success: true,
        time: new Date(),
      },
    });
  }

  res.statusCode = 404;
  res.end();
}
