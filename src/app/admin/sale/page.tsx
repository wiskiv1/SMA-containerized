"use client";
/**
 * @author Witse Panneels
 * @date 2026-01-02
 */
import "./page.css";
import Script from "next/script";
import Link from "next/link";
import SaleWindow from "@/src/lib/components/sale/SaleWindow";
import { IntervalContext } from "@/src/lib/components/sale/InervalContext";

export default function Sale() {
  return (
    <div id="window">
      <IntervalContext>
        <div id="top_line">
          <div id="party_info">
            <div>
              new prices in <span id="remaining_time_til_new_prices"></span>
            </div>
          </div>
          {/* Full page reload on navigation */}
          <Link href="/admin/settings" id="button_parametres">
            <div>Settings</div>
          </Link>
          <div id="krach">Krach</div>
        </div>
        <SaleWindow />
        {/* <Script src="/js/sale_animation.js" />
      <Script src="/js/sale_button.js" />
      <Script src="/js/adminSale.js" /> */}
      </IntervalContext>
    </div>
  );
}
