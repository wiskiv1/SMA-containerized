/**
 * @author Witse Panneels
 */
import http from "http";
import { market } from "@src/stock_market_anywhere/engine/StockMarketAnywhere";
import { json, getQueryParams, readJsonBody } from "../../utils/networking";

export default async function CalculatorHandler(req: http.IncomingMessage, res: http.ServerResponse, suffix: string) {
  const { subPath, params } = getQueryParams(suffix);

  if (req.method === "GET" && (subPath === "getName" || subPath === "getVersion")) {
    const n = market.getCalculatorName();
    const v = market.getCalculatorVersion();

    return json(res, { name: n, version: v, meta: { success: true, time: new Date() } });
  }

  if (req.method === "GET" && subPath === "getParameters") {
    const p = market.getCalculatorParams();

    return json(res, { parameters: p, meta: { success: true, time: new Date() } });
  }

  if (req.method === "POST" && subPath === "setParameters") {
    const temp = await readJsonBody(req);

    market.setCalculatorParams(temp as object);

    return json(res, { success: true, time: new Date() });
  }

  res.statusCode = 404;
  res.end();
}
