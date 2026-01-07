/**
 * @author Witse Panneels
 */
import http from "http";
import HealthHandler from "./handlers/health";
import MarketHandler from "./handlers/market";
import ProductHandler from "./handlers/product";
import IntervalHandler from "./handlers/interval";
import CalculatorHandler from "./handlers/calculator";
import { json } from "../utils/networking";

type Route = {
  method?: string;
  prefix: string;
  handler: (req: http.IncomingMessage, res: http.ServerResponse, subPath: string) => void | Promise<void>;
};

const routes: Route[] = [
  {
    prefix: "/server/",
    handler: HealthHandler,
  },
  {
    prefix: "/market/",
    handler: MarketHandler,
  },
  {
    prefix: "/product/",
    handler: ProductHandler,
  },
  {
    prefix: "/interval/",
    handler: IntervalHandler,
  },
  {
    prefix: "/calculator/",
    handler: CalculatorHandler,
  },
];

export default async function route(req: http.IncomingMessage, res: http.ServerResponse) {
  const { method, url } = req;

  if (!method || !url) {
    return json(res, { error: "Invalid request" }, 400);
  }

  for (const r of routes) {
    if (url.startsWith(r.prefix)) {
      const subPath = url.slice(r.prefix.length) || "/";
      return r.handler(req, res, subPath);
    }
  }

  res.statusCode = 404;
  res.end();
}
