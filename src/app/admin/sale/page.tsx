"use client";
/**
 * @author Witse Panneels
 * @date 2026-01-02
 */
import "./page.css";
import Link from "next/link";
import SaleWindow from "@/src/lib/components/sale/SaleWindow";
import { IntervalContext } from "@/src/lib/components/sale/InervalContext";
import IntervalCountdown from "@/src/lib/components/IntervalCountdown";
import type { crashInfo } from "@/src/types/SMA_networking";

export default function Sale() {
  async function handleCrash() {
    const req = await fetch("/api/admin/toggleCrash");
    const resp = (await req.json()) as crashInfo;

    if (!resp.meta.success) {
      console.error(resp.meta.message);
    }
  }

  return (
    <div id="window">
      <IntervalContext>
        <div id="top_line">
          <div id="party_info">
            <div>
              new prices in <IntervalCountdown />
            </div>
          </div>
          <Link href="/admin/settings" id="button_parametres">
            <div>Settings</div>
          </Link>
          <div id="krach" onClick={handleCrash}>
            Krach
          </div>
        </div>
        <SaleWindow />
      </IntervalContext>
    </div>
  );
}
