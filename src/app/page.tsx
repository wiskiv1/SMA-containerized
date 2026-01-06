/**
 * @author Witse Panneels
 * @date 2026-01-02
 */
import "./page.css";
import { redirect } from "next/navigation";
import { getPartyStatus } from "@/src/lib/stock_market_anywhere/StockMarketAnywhere";

export const dynamic = "force-dynamic";

export default async function Home() {
  const status = await getPartyStatus();

  switch (status) {
    case "running":
      redirect("/dashboard");
      break;
    case "paused":
      redirect("/dashboard");
      break;
    case "planned":
      redirect("/countdown");
      break;
  }

  return (
    <div>
      <h1>Stock Market Anywhere</h1>
      <p>Welcome, this is the home page! If u see this, no party is currently active or scheduled</p>
      <p>{status}</p>
    </div>
  );
}
