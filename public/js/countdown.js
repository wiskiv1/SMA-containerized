/**
 * @author Marc Bresson & Witse Panneels
 */
/* --- GLOBAL VARIABLES --- */
var date_countdown_end;
var message = "Starting in";
var body_el;

var number_of_bars;
let max_bar_height;
var amplifier;

var bars = [];

var i;
var hue;
var countdown;

let intervalID;

async function setup() {
  // get start time
  const resp = await fetch("/api/getPartyStatus");
  const body = await resp.json(); // status whenOpen
  date_countdown_end = new Date(body.whenOpen);
  // TODO if status not planned => go to dashboard

  document.getElementById("message").innerHTML = message;

  body_el = document.getElementsByTagName("body")[0];

  number_of_bars = evenify(window.innerWidth / (30 * 2));
  max_bar_height = new Bar(0).bar_height(0, 1, 0);
  amplifier = Math.ceil(window.innerHeight / max_bar_height);

  for (let i = 0; i < number_of_bars; i++) {
    let bar = new Bar(i);
    bar.append_html();
    bars.push(bar);
  }

  i = 0;
  hue = 0;
  countdown = new Countdown(date_countdown_end, terminate_countdown);

  intervalID = setInterval(() => {
    loop();
  }, 1000 / number_of_bars);
}

function loop() {
  let time_rem = countdown.time_remaining();
  display_countdown(time_rem[0], time_rem[1]);
  countdown.check();

  let seconds_remaining = countdown.seconds_remaining();

  if (seconds_remaining > 3) {
    let bar_height = bars[i].bar_height(seconds_remaining, amplifier);
    bars[i].update(bar_height, "hsl(" + hue + ", 90%, 50%)");

    hue = (hue + 1 / 2) % 360;
  } else {
    let bar_height = bars[i].bar_height(seconds_remaining, amplifier, 0);
    bars[i].update(bar_height, "hsl(" + hue + ", 90%, 50%)");
    hue = (hue + (360 * 1.4) / number_of_bars) % 360;
  }

  i = (i + 1) % number_of_bars;
}

var countdown_el = document.getElementById("countdown_value");
var countdown_unit_el = document.getElementById("countdown_unit");
function display_countdown(times, units) {
  times = times.slice(0, 2);
  units = units.slice(0, 2);

  var complementary_unit = "";
  if (times.length > 1) {
    complementary_unit = " " + times[1] + " " + units[1];
  }

  countdown_el.innerText = times[0];
  countdown_unit_el.innerText = units[0] + complementary_unit;
}

function evenify(n) {
  return Math.floor(n / 2) * 2;
}

function terminate_countdown() {
  clearInterval(intervalID);

  for (var index in bars) {
    bars[index].dom.classList.add("grow"); // the outro transition
  }

  setTimeout(() => {
    document.getElementById("hidden_link").click();
  }, 1000);
}

setup();
