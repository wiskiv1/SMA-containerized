/**
 * @author Witse Panneels
 * @date 2026-01-02
 */
import { getPartyStatus } from "../lib/SMAclient";
import { redirect } from "next/navigation";
import "./page.css";

export const dynamic = "force-dynamic";

export default async function Home() {
  let status: string;
  try {
    status = await getPartyStatus();
  } catch {
    status = "Failed to fetch worker: backend worker is offline";
  }

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
    <main className="landing-container">
      <div className="landing-card">
        <span className="landing-badge">Service Status</span>

        <h1 className="landing-title">Stock Market Anywhere</h1>

        <p className="landing-subtitle">Self-hosted party brokerage for stock market party&apos;s</p>

        <div className="landing-divider" />

        <p className="landing-message">
          There is currently no active or planned session.
          <br />
          If this is unexpected please contact the party host.
        </p>

        <p className="landing-status">
          Backend Worker Status: <strong>{status}</strong>
        </p>

        <footer className="landing-footer">
          For detailed system information, visit the{" "}
          <a href="/status" className="landing-status-link">
            status page
          </a>
          .
        </footer>
      </div>
    </main>
  );
}
