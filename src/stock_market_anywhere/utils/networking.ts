import http from "http";

export function json(res: http.ServerResponse, body: unknown, status = 200) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

export function getQueryParams(url: string): { subPath: string; params: Record<string, string> } {
  const [path, query = ""] = url.split("?", 2);

  const params: Record<string, string> = {};

  if (query) {
    for (const pair of query.split("&")) {
      if (!pair) continue;

      const [key, value = ""] = pair.split("=", 2);
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  }

  return {
    subPath: path || "/",
    params,
  };
}

export async function readJsonBody<T = unknown>(req: http.IncomingMessage): Promise<T> {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const text = Buffer.concat(chunks).toString("utf8");
  const body = text ? JSON.parse(text) : ({} as T);

  return body;
}
