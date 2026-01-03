/**
 * @author Witse Panneels
 * @date 2026-01-02
 */
import "./page.css";

export default function Sale() {
  return (
    <div id="stock_market" style={{ display: "block" }}>
      <div id="top_line">
        <div id="party_info">
          <div>
            new prices in <span id="remaining_time_til_new_prices"></span>
          </div>
        </div>
        <div id="button_parametres">
          <div>Parametres</div>
        </div>
        <div id="krach">Krach</div>
      </div>
      <div id="drinks">
        <div className="drink" id="jup">
          <div className="name">
            <span className="trigram">JUP</span> - <span>Jupiler</span>
          </div>
          <div className="infos">
            <div className="prices">
              <span className="actual_price">€2.00</span>
              <div>
                <div className="initial_price">€2.50</div>
                <div className="variation">-20%</div>
              </div>
            </div>
            <div className="add_sale" style={{ backgroundColor: "red" }}>
              +1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
