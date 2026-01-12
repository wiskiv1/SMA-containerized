/**
 * @author Witse Panneels
 * @date 2026-01-02
 */
import { getWorkerStatus, getPartyStatus } from "@/src/lib/SMAclient";
import ObjectTable from "@/src/lib/components/ObjectTable";
import "./page.css";

export const dynamic = "force-dynamic";

async function safeGetWorkerStatus() {
  try {
    return await getWorkerStatus();
  } catch (e) {
    return {
      status: "offline",
      error: "Background worker is unreachable",
      message: String(e),
    };
  }
}

async function safeGetPartyStatus() {
  let status: string;
  try {
    status = await getPartyStatus();
  } catch {
    status = "Failed to fetch worker: backend worker is offline";
  }
  return status;
}

export default async function StatusPage() {
  const workerStatus = await safeGetWorkerStatus();

  const generalStatus = {
    "package name": process.env.npm_package_name,
    "package version": process.env.npm_package_version,
    "worker url": process.env.MARKET_URL,
    "market status": await safeGetPartyStatus(),
  };

  const date = new Date(0);
  date.setSeconds(Math.floor(process.uptime())); // specify value for SECONDS here
  const uptime = date.toISOString().slice(11, 19);

  const frontendStatus = {
    status: "alive",
    uptime: uptime,
    "node version": process.version,
    environment: process.env.NODE_ENV,
    framework: "Next.js",
  };

  /**
   * Modules list makes this page future-proof.
   * Add database, cache, etc. without touching JSX structure.
   */
  const modules = [
    { name: "General", data: generalStatus },
    { name: "Frontend", data: frontendStatus },
    { name: "Background Worker", data: workerStatus },
  ];

  return (
    <main className="status-container">
      <div className="status-card">
        <h1 className="status-title status-badge status-badge--error">System Status</h1>
        <p className="status-subtitle">Detailed operational status of all backend services</p>

        <div className="landing-divider" />

        <div className="status-modules">
          {modules.map((module) => (
            <section key={module.name} className="status-module">
              <h2 className="status-module-title status-badge status-badge--warning">{module.name}</h2>
              <ObjectTable name="status" data={module.data} />
            </section>
          ))}
        </div>

        <footer className="landing-footer">This page updates on refresh and reflects the current system state.</footer>
      </div>
    </main>
  );
}
