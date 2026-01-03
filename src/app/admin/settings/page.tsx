/**
 * @author Witse Panneels
 * @date 2026-01-02
 */
import "./page.css";

export default function Settings() {
  return (
    <div id="parametres" style={{ display: "flex" }} className="big_buttons">
      <div className="multiple_buttons_container">
        <div
          className="parametre gradient_div"
          style={{
            backgroundImage:
              "linear-gradient(240deg, #ff823c 0%, #ffc94c 100%)",
          }}
        >
          <h2>Refresh period</h2>
          <input
            type="number"
            id="parametre_refresh_period"
            defaultValue={60}
          />
          <p>Compute new prices every n seconds.</p>
        </div>
        <div
          className="parametre gradient_div"
          style={{
            backgroundImage: "linear-gradient(99deg, #ff823c 0%, #ffc94c 100%)",
          }}
        >
          <h2>Prices variation amplification</h2>
          <input
            type="number"
            id="parametre_prices_var_amp"
            defaultValue={100}
          />
          <p>Handles the price variation amplification.</p>
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        <div
          id="validate_parametres"
          className="gradient_button"
          style={{
            backgroundImage:
              "linear-gradient(193deg, #ff823c 0%, #ffc94c 100%)",
          }}
        >
          Validate
        </div>
      </div>
    </div>
  );
}
