import Script from "next/script";
import "./page.css";

export default function Countdown() {
  return (
    <div id="countdown">
      <div id="message"></div>
      <span id="countdown_value"></span>
      <span id="countdown_unit"></span>
      <a id="hidden_link" href="/dashboard" style={{ display: "none" }}>
        hidden link
      </a>

      <Script src="/js/countdown_MB.js" />
      <Script src="/js/countdown_bar.js" />
      <Script src="/js/countdown.js" />
    </div>
  );
}
