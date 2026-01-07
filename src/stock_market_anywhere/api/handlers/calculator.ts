/**
 * @author Witse Panneels
 */
import http from "http";
import { market } from "@src/stock_market_anywhere/engine/StockMarketAnywhere";
import { json, getQueryParams } from "../../utils/networking";

export default function CalculatorHandler(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  suffix: string
) {
  const { subPath, params } = getQueryParams(suffix);

  return json(res, {
    meta: { success: false, time: new Date(), message: "" },
  });
}
