/**
 * @author Witse Panneels
 */
import http from "http";
import { market } from "@src/stock_market_anywhere/engine/StockMarketAnywhere";
import { json, getQueryParams } from "../../utils/networking";

export default function MarketHandler(req: http.IncomingMessage, res: http.ServerResponse, suffix: string) {
  const { subPath, params } = getQueryParams(suffix);

  let done = false;
  let msg;

  if (req.method === "GET" && subPath === "plan") {
    if ("time" in params) {
      try {
        const when = new Date(Number(params.time));
        market.planMarket(when);
        done = true;
      } catch (e) {
        msg = String(e);
      }
    } else {
      msg = "did not find query parameter 'time'";
    }
  }

  if (req.method === "GET" && subPath === "whenOpen") {
    done = true;
  }

  if (req.method === "GET" && subPath === "start") {
    try {
      market.startMarket();
      done = true;
    } catch (error) {
      msg = String(error);
    }
  }

  if (req.method === "GET" && subPath === "pause") {
    try {
      market.pauseMarket();
      done = true;
    } catch (error) {
      msg = String(error);
    }
  }

  if (req.method === "GET" && subPath === "reset") {
    try {
      market.resetMarket();
      done = true;
    } catch (error) {
      msg = String(error);
    }
  }

  if (req.method === "GET" && subPath === "status") {
    done = true;
  }

  return json(res, {
    status: market.getMarketStatus(),
    whenOpen: market.whenMarketOpen().getTime(),
    meta: { success: done, time: new Date(), message: msg },
  });
}
