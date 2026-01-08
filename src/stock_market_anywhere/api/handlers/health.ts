/**
 * @author Witse Panneels
 */
import http from "http";
import { market } from "@src/stock_market_anywhere/engine/StockMarketAnywhere";
import { json } from "../../utils/networking";

export default function HealthHandler(req: http.IncomingMessage, res: http.ServerResponse, subPath: string) {
  if (req.method === "GET" && subPath === "status") {
    return json(res, {
      status: "alive",
      uptime: Math.floor(process.uptime()),
      node_version: process.version,
      environment: process.env.NODE_ENV,
      SMA: {
        name: process.env.npm_package_name,
        version: process.env.npm_package_version,
        calculator: {
          name: market.getCalculatorName(),
          version: market.getCalculatorVersion(),
          params: market.getCalculatorParams(),
        },
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
