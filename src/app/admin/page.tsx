/**
 * @author Witse Panneels
 * @date 2026-01-02
 */
import { redirect } from "next/navigation";
import MarketControls from "@/src/lib/components/settings/MarketControls-v2";
import { getPartyStatus } from "@/src/lib/SMAclient";
import "./page.css";

export const dynamic = "force-dynamic";

export default async function Admin() {
  let status: string;
  try {
    status = await getPartyStatus();
  } catch {
    status = "Failed";
  }

  switch (status) {
    case "off":
      redirect("/admin/start");
      break;
    case "Failed":
      redirect("/status");
      break;
  }

  return (
    <div id="content" className="choices_buttons big_buttons">
      <h1>You seem to have a party going...</h1>
      <MarketControls />
      <div className="multiple_buttons_container">
        <div
          id="download"
          className="zoom gradient_div"
          style={{
            display: "none",
            backgroundImage:
              "linear-gradient( 18deg, rgba(0,40,70,1) -4.8%, rgb(115 228 255) 82.7%, rgb(123 255 183) 97.2% )",
          }}
        >
          <h2>Download data</h2>
          <p>oh, you data scientist. Gotcha, you can create your best data viz with every data point.</p>
        </div>
      </div>
    </div>
  );
}
