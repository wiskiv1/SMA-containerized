/**
 * @author Witse Panneels
 * @date 2026-01-02
 */
import { getWorkerStatus } from "@/src/lib/SMAclient";
import "./page.css";

export const dynamic = "force-dynamic";

async function safeGetWorkerStatus() {
  try {
    return await getWorkerStatus();
  } catch (e) {
    return {
      status: "offline",
      error: "Background worker is unreachable",
    };
  }
}

/**
 * Generic object renderer
 * Renders any nested object without knowing the schema
 */
function ObjectTable({ data }: { data: Record<string, never> }) {
  return (
    <table className="status-table">
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td className="status-key">{key}</td>
            <td className="status-value">
              {typeof value === "object" && value !== null ? <ObjectTable data={value} /> : String(value)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default async function StatusPage() {
  const workerStatus = await safeGetWorkerStatus();

  const generalStatus = {
    "package name": process.env.npm_package_name,
    "package version": process.env.npm_package_version,
    "worker url": process.env.MARKET_URL,
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
              <ObjectTable data={module.data} />
            </section>
          ))}
        </div>

        <footer className="landing-footer">This page updates on refresh and reflects the current system state.</footer>
      </div>
    </main>
  );
}
