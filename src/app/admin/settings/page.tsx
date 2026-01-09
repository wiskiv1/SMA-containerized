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

/*
<div className="multiple_buttons_container">
        <div
          className="parametre gradient_div"
          style={{
            backgroundImage: "linear-gradient(240deg, #ff823c 0%, #ffc94c 100%)",
          }}
        >
          <h2>Refresh period</h2>
          <input type="number" id="parametre_refresh_period" defaultValue={60} />
          <p>Compute new prices every n seconds.</p>
        </div>
        <div
          className="parametre gradient_div"
          style={{
            backgroundImage: "linear-gradient(99deg, #ff823c 0%, #ffc94c 100%)",
          }}
        >
          <h2>Prices variation amplification</h2>
          <input type="number" id="parametre_prices_var_amp" defaultValue={100} />
          <p>Handles the price variation amplification.</p>
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        <div
          id="validate_parametres"
          className="gradient_button"
          style={{
            backgroundImage: "linear-gradient(193deg, #ff823c 0%, #ffc94c 100%)",
          }}
        >
          Validate
        </div>
      </div>
 */
