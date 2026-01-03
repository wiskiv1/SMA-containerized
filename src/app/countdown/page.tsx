import Link from "next/link";
import "./page.css";

export default function Countdown() {
  return (
    <div id="countdown">
      <div id="message"></div>
      <span id="countdown_value"></span>
      <span id="countdown_unit"></span>
      <Link id="hidden_link" href="/dashboard" style={{ display: "none" }}>
        hidden link
      </Link>
    </div>
  );
}
