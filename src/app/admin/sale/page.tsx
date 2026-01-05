/**
 * @author Witse Panneels
 * @date 2026-01-02
 */
import "./page.css";
import Script from "next/script";

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
      <div id="drinks"></div>
      <Script src="/js/sale_animation.js" />
      <Script src="/js/sale_button.js" />
      <Script src="/js/adminSale.js" />
    </div>
  );
}
