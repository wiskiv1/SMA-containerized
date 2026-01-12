/**
 * @author Witse Panneels
 * @date 2026-01-08
 */
import ProductSettings from "@/src/lib/components/settings/ProductSettings";
import GeneralSettings from "@/src/lib/components/settings/GeneralSettings";
import ParamSettings from "@/src/lib/components/settings/ParamSettings";
import "./page.css";

export default async function Settings() {
  return (
    <div id="page">
      <div id="header">
        <h1>Settings</h1>
      </div>
      <div id="parametres">
        <div
          id="settingsContainer"
          style={{ backgroundImage: "linear-gradient(60deg, #ff823c 0%, #ffc94c 100%)" }}
          className="container"
        >
          <GeneralSettings />
        </div>
        <div
          id="productsContainer"
          style={{ backgroundImage: "linear-gradient(340deg, #ff823c 0%, #ffc94c 100%)" }}
          className="container"
        >
          <ProductSettings />
        </div>
        <div
          id="parametersContainer"
          style={{ backgroundImage: "linear-gradient(240deg, #ff823c 0%, #ffc94c 100%)" }}
          className="container"
        >
          {/* TODO ADD CALCULATOR NAME AND INFO USING THE SERVER*/}
          <ParamSettings />
        </div>
      </div>
      <div id="footer">
        <a
          href="/admin/sale"
          style={{
            backgroundImage: "linear-gradient(240deg, rgba(0, 40, 70, 0.85) 0%, rgba(255, 200, 70, 0.2) 100%)",
          }}
        >
          Sale Tool
        </a>

        <a
          href="/admin"
          style={{
            backgroundImage: "linear-gradient(60deg, rgba(0, 40, 70, 0.85) 0%, rgba(255, 200, 70, 0.2) 100%)",
          }}
        >
          Admin Page
        </a>
      </div>
    </div>
  );
}
