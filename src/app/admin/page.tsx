/**
 * @author Witse Panneels
 * @date 2026-01-02
 */
import Script from "next/script";
import "./page.css";

/*
OPGELET!
om een "pagina" te laten zien moet de display op iets anders gezet worden dan "none"  
voor alle elementen is dit "flex" buiten voor stock_market, dan moet je "block" gebruiken
*/

export default function Admin() {
  return (
    <div style={{ height: "100%" }}>
      <div id="start_the_party" className="choices_buttons big_buttons" style={{ display: "flex" }}>
        <h1>Hello you !</h1>
        <div className="multiple_buttons_container">
          <div
            id="schedule_start"
            className="zoom gradient_div"
            style={{
              backgroundImage:
                "linear-gradient(237deg,rgb(0 40 70) -4.8%,rgb(255 115 115 / 52%) 72.7%,rgba(255, 175, 123, 1) 100% )",
            }}
          >
            <h2>Schedule the party</h2>
            <p>You want to have a beautiful countdown ? This is the way !</p>
          </div>
          <div
            id="start_now"
            className="zoom gradient_div"
            style={{
              backgroundImage:
                "linear-gradient(111deg,rgb(0 40 70) -4.8%,rgb(255 115 115 / 52%) 72.7%,rgba(255, 175, 123, 1) 100% )",
            }}
          >
            <h2 id="start-title">Start now !</h2>
            <p>You seem to be in a hurry. Go go go, Let the party begin !</p>
          </div>
          <a
            href="/admin/settings"
            id="settings"
            className="zoom gradient_div"
            style={{
              backgroundImage:
                "linear-gradient(30deg,rgb(0 40 70) -4.8%,rgb(255 115 115 / 52%) 72.7%,rgba(255, 175, 123, 1) 100% )",
            }}
          >
            <h2>Settings</h2>
            <p>Before you start! Click here to add/change/delete products</p>
          </a>
        </div>
      </div>
      <div id="what_to_do_with_data" className="choices_buttons big_buttons" style={{ display: "none" }}>
        <h1>You seem to have a party going...</h1>
        <div className="multiple_buttons_container">
          <div
            id="resume"
            className="zoom gradient_div"
            style={{
              backgroundImage:
                "linear-gradient( 111.1deg, rgba(0,40,70,1) -4.8%, rgb(115 228 255) 82.7%, rgb(123 255 183) 97.2% )",
            }}
          >
            <h2 id="resume-title">Resume the party</h2>
            <p>So much fun right now, I want it to never stop.</p>
          </div>
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
          <div
            id="pause"
            className="zoom gradient_div"
            style={{
              backgroundImage:
                "linear-gradient( 18deg, rgba(0,40,70,1) -4.8%, rgb(115 228 255) 82.7%, rgb(123 255 183) 97.2% )",
            }}
          >
            <h2 id="pause-title">Pause the party</h2>
            <p>Stop the party, but only just for a little bit.</p>
          </div>
          <div
            id="reset"
            className="zoom gradient_div"
            style={{
              backgroundImage:
                "linear-gradient( 264deg, rgba(0,40,70,1) -4.8%, rgb(115 228 255) 82.7%, rgb(123 255 183) 97.2% )",
            }}
          >
            <h2 id="reset-title">Reset</h2>
            <p>Sometimes, you need to go back to a clean board to achieve beter. Good luck !</p>
          </div>
        </div>
      </div>
      <div id="scheduler" className="scheduler_settings big_buttons" style={{ display: "none" }}>
        <h1>Setup the countdown</h1>
        <div className="multiple_buttons_container">
          <div
            id="schedule_start"
            className="gradient_div"
            style={{
              backgroundImage: "linear-gradient(41deg, #5a5ca3  0%, #ed8ad2 100%)",
            }}
          >
            <h2>Start</h2>
            <input type="date" className="datepicker-input" required />
            <p></p>
            <input type="time" className="datepicker-input" required />
            <p></p>
            <script>
              document.querySelector(&quot;#schedule_start input[type=date]&quot;).valueAsDate = new Date();
            </script>
          </div>
          <div
            id="schedule_message"
            className="gradient_div"
            style={{
              backgroundImage: "linear-gradient(336deg, #7560a7 0%, #df6cbe 100%); height:fit-content",
            }}
          >
            <h2>Hier info geven</h2>
            <input type="text" />
            <p></p>
          </div>
        </div>
        <div style={{ marginTop: "40px" }}>
          <div
            id="validate_schedule"
            className="gradient_button"
            style={{
              backgroundImage: "linear-gradient(193deg, #775ca9 0%, #ed8ad2 100%)",
            }}
          >
            Validate
          </div>
        </div>
      </div>
      <a id="hidden_link" href="/admin/sale" style={{ display: "none" }}>
        hidden link
      </a>
      <Script src="/js/admin.js" />
    </div>
  );
}
