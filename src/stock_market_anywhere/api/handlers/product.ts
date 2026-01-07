/**
 * @author Witse Panneels
 */
import http from "http";
import { market } from "@src/stock_market_anywhere/engine/StockMarketAnywhere";
import { json, getQueryParams, readJsonBody } from "../../utils/networking";
import { isProduct } from "../../utils/stockmarket";
import type { PricesHistory } from "@/src/types/SMA_objects";

export default async function ProductHandler(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  suffix: string
) {
  const { subPath, params } = getQueryParams(suffix);

  if (req.method === "POST" && subPath === "add") {
    const temp = await readJsonBody(req);

    if (isProduct(temp)) {
      market.addProduct(temp);
      return json(res, { success: true, time: new Date() });
    } else {
      return json(res, { success: false, time: new Date(), message: "body is not of type 'Product'" });
    }
  }

  if (req.method === "POST" && subPath === "change") {
    const temp = await readJsonBody(req);

    if (isProduct(temp)) {
      market.changeProduct(temp);
      return json(res, { success: true, time: new Date() });
    } else {
      return json(res, { success: false, time: new Date(), message: "body is not of type 'Product'" });
    }
  }

  // product/delete?tri=JUP
  if (req.method === "GET" && subPath === "delete") {
    let done = false;
    let msg = "";

    if ("tri" in params) {
      market.deleteProduct(params.tri);
      done = true;
    } else {
      msg = "did not find query parameter 'tri'";
    }

    return json(res, { success: done, time: new Date(), message: msg });
  }

  if (req.method === "GET" && subPath === "getProducts") {
    const products = market.getProducts();
    return json(res, { products: products, meta: { success: true, time: new Date() } });
  }

  // /product/sell?tri=JUP&price=2.5
  if (req.method === "GET" && subPath === "sell") {
    let done = false;
    let msg = "";

    if ("tri" in params && "price" in params) {
      try {
        market.addSale({
          tri: params.tri,
          price: Number(params.price),
        });
        done = true;
      } catch (e) {
        msg = String(e);
      }
    } else {
      msg = "did not find query parameter 'tri' or 'price'";
    }

    return json(res, { success: done, time: new Date(), message: msg });
  }

  if (req.method === "GET" && subPath === "getCurrentPrices") {
    const prices = market.getCurrentPrices();

    return json(res, { prices: prices, meta: { success: true, time: new Date() } });
  }

  // /product/getPriceHistory?size=10
  if (req.method === "GET" && subPath === "getPriceHistory") {
    let hist: PricesHistory;

    if ("size" in params) {
      hist = market.getPriceHistory(Number(params.size));
    } else {
      hist = market.getPriceHistory();
    }
    // add param to see how big a history it wants
    return json(res, { histories: hist, meta: { success: true, time: new Date() } });
  }

  res.statusCode = 404;
  res.end();
}
