/**
 * @author Witse Panneels & Marc Bresson
 */
/* --- GLOBAL VARIABLES --- */
let what_to_do_with_data = document.getElementById("what_to_do_with_data");
let start_the_party = document.getElementById("start_the_party");
let scheduler = document.getElementById("scheduler");

/**
 * function to setup / initialize the page, runs once every time the page is loaded to populate the elements
 */
async function setup() {
  let res = await fetch("/api/getPartyStatus");
  let body = await res.json();

  // show data screen or start screen based on party status
  if (body.status != "off") {
    go_to_data();
  }

  // add EventListeners to buttons
  // start_the_party
  document.getElementById("schedule_start").addEventListener("click", () => go_to_scheduler());
  document.getElementById("start_now").addEventListener("click", () => handleStart());
  // scheduler
  document.getElementById("validate_schedule").addEventListener("click", () => handleScheduler());
  // what_to_do_with_data
  document.getElementById("resume").addEventListener("click", () => handleStart());
  document.getElementById("pause").addEventListener("click", () => handlePause());
  document.getElementById("reset").addEventListener("click", () => handleReset());
}

/* --- trasitions --- */
function go_to_scheduler() {
  scheduler.style.display = "flex";
  scheduler.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function go_to_start_the_party() {
  start_the_party.style.display = "flex";
  start_the_party.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}

function go_to_data() {
  what_to_do_with_data.style.display = "flex";
  what_to_do_with_data.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/* --- handlers --- */
async function handleStart() {
  document.getElementById("start-title").innerHTML = "Starting...";
  document.getElementById("resume-title").innerHTML = "Starting...";
  await fetch("/api/admin/startMarket");
  document.getElementById("hidden_link").click();
}

async function handleScheduler() {
  let startTime; // get startTime
  try {
    startTime = extract_value_from_schedule();
  } catch {
    return; // if not filled abort
  }

  const req = await fetch("/api/admin/planMarket", {
    method: "POST",
    body: JSON.stringify({ time: Number(startTime) }),
  });
  const response = await req.json();

  if (response.meta.success) {
    // planning of the party was a success => what now?
  } else {
    alert(response.meta.message);
  }
}

async function handlePause() {
  document.getElementById("pause-title").innerHTML = "Stopping the party...";
  await fetch("/api/admin/pauseMarket");
  document.getElementById("pause-title").innerHTML = "Paused";
}

async function handleReset() {
  document.getElementById("reset-title").innerHTML = "Resetting the party...";

  const confirmed = window.confirm(
    `Are you sure you want to reset the market? All price history will be lost, and prices will be reset to default`
  );

  if (!confirmed) {
    document.getElementById("reset-title").innerHTML = "Reset";
    return;
  }

  const req = await fetch("/api/admin/resetMarket");
  const response = await req.json();
  if (response.meta.success) {
    document.getElementById("reset-title").innerHTML = "Reset";
    go_to_start_the_party();
  } else {
    document.getElementById("reset-title").innerHTML = "Reset failed";
  }
}

/* --- helper functions --- */

function extract_value_from_schedule() {
  let date_start = document.querySelector("#schedule_start input[type=date]");
  let time_start = document.querySelector("#schedule_start input[type=time]");

  let datetime_start = date_start.value + "T" + time_start.value + ":00"; // T defaults to local time-zone in most cases

  if (datetime_start.length == 19) {
    datetime_start = Date.parse(datetime_start);
  } else {
    datetime_start = "";
    alert("start date field must be filled");
    throw "start date field must be filled";
  }

  return datetime_start;
}

setup();
