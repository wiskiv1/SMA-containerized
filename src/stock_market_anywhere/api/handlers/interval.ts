/**
 * @author Witse Panneels
 */
import http from "http";
import { market } from "@src/stock_market_anywhere/engine/StockMarketAnywhere";
import { json, getQueryParams } from "../../utils/networking";

export default function IntervalHandler(req: http.IncomingMessage, res: http.ServerResponse, suffix: string) {
  const { subPath, params } = getQueryParams(suffix);

  if (req.method === "GET" && (subPath === "get" || subPath === "whenNext")) {
    return json(res, {
      intervalLength: market.getIntervalTime(),
      nextInterval: Date.now() + market.TimeUntilNextInterval(true),
      meta: { success: true, time: new Date() },
    });
  }

  // interval/set?length=20000
  if (req.method === "GET" && subPath === "set") {
    let done: boolean;
    let msg;
    if ("length" in params) {
      market.setIntervalTime(Number(params.length));
      done = true;
    } else {
      done = false;
      msg = "did not find query parameter 'length'";
    }

    return json(res, {
      intervalLength: market.getIntervalTime(),
      nextInterval: Date.now() + market.TimeUntilNextInterval(true),
      meta: { success: done, time: new Date(), message: msg },
    });
  }

  if (req.method === "GET" && subPath === "toggleCrash") {
    let done = false;
    let msg;
    try {
      market.toggleCrash();
      done = true;
    } catch (e) {
      msg = String(e);
    }
    return json(res, {
      is_crash: market.isCrash(),
      meta: { success: done, time: new Date(), message: msg },
    });
  }

  if (req.method === "GET" && subPath === "isCrash") {
    return json(res, {
      is_crash: market.isCrash(),
      meta: { success: true, time: new Date() },
    });
  }

  res.statusCode = 404;
  res.end();
}
