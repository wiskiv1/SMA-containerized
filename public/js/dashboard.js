/**
 * @author Witse Panneels
 *
 * based on page_dashboard.js by Marc Bresson
 */
/* --- GLOBAL VARIABLES --- */
var minuterie_display_new_curve = new Minuterie(20, display_new_curve);
//no listeners => dont use localstorage
var prices_history = {};
var is_krach = false;
let products;
let interval = 60000;
let nextInterval = 0;

/**
 * initial setup of the page
 */
async function setup() {
  // get basic product information
  let getRequest = await fetch("/api/getProducts");
  products = (await getRequest.json()).products;
  for (let i = 0; i < products.length; i++) {
    products[i].color = "hsl(" + Math.ceil((i * 360) / (products.length + 1)) + ", 90%, 60%)";
  }

  // get interval information
  getRequest = await fetch("/api/getInterval");
  let getResponse = await getRequest.json();
  interval = getResponse.interval;
  nextInterval = getResponse.time;

  // get prices History
  getRequest = await fetch("/api/getPriceHistory");
  let priceHist = await getRequest.json();
  for (let product of priceHist.prices) {
    prices_history[product.tri] = product.price;
  }

  // todo update chart
  update_cheapest();
  generate_price_display();
  update_prices_table(); // calculate percentages and give color
  init_chart(); // dashboard_chart.js

  //start loop every 500 ms
  setInterval(() => {
    loop();
  }, 500);
}

/**
 * function that is called every x seconds to update prices and other information
 */
async function loop() {
  minuterie_display_new_curve.check();
  const timeLeft = nextInterval - Date.now(); // time (ms) left till next interval

  // check for crash
  let data = await fetch("/api/isCrash");
  data = await data.json();

  // if new interval or if crash status has changed
  if (timeLeft < 0 || data.is_crash != is_krach) {
    // get new interval information
    let intervalData = await (await fetch("/api/getInterval")).json();
    interval = intervalData.interval;
    nextInterval = intervalData.time;

    // get new price information
    // in future only et current prices and append => less network traffic => watch out for clogging history
    let priceData = await (await fetch("/api/getPriceHistory")).json();
    for (let product of priceData.prices) {
      prices_history[product.tri] = product.price;
    }

    is_krach = data.is_crash;

    // update dashboard
    add_new_prices_to_chart();
    update_cheapest();
    update_prices_table();
    krach_style();
  }
}

// sale animation => how am I gonna do this?
// setInterval(() => {
//   if (new_sale_listener.check()) {
//     new_sale_animation(new_sale_listener.value[0], new_sale_listener.value[1]);
//   }
// }, 30);

function get_last_prices(index = -1) {
  let last_prices = {};
  for (trigram in prices_history) {
    last_prices[trigram] = prices_history[trigram].at(index);
  }

  return last_prices;
}

function get_variation() {
  let variation = {};

  let last_prices = get_last_prices();
  let last_last_prices = get_last_prices(-2);
  for (trigram in prices_history) {
    variation[trigram] = last_prices[trigram] / last_last_prices[trigram];
    variation[trigram] = round((variation[trigram] - 1) * 100, 2);
  }

  return variation;
}

function update_cheapest() {
  let last_prices = get_last_prices();
  var cheapest = Object.keys(last_prices).map(function (key) {
    return [key, last_prices[key]];
  });

  cheapest.sort(function (first, second) {
    return first[1] - second[1];
  });

  cheapest = cheapest.splice(0, 3);
  for (let i = 0; i < 3; i++) {
    let trigram = cheapest[i][0];
    document.querySelector("#cheapest .indice#numero_" + (i + 1)).innerHTML = getProduct(trigram).name;
  }
}

function generate_price_display() {
  let last_prices = get_last_prices();
  let tableau = document.querySelector("#afficheur_prix tbody");

  for (let product of products) {
    tableau.innerHTML +=
      "<tr class='prix_" +
      product.tri +
      "'>" +
      "<td style='color:" +
      product.color +
      "'>&#11044;</td>" +
      "<td>" +
      product.name +
      "</td>" +
      "<td class='indice'>" +
      product.tri +
      "</td>" +
      "<td class='prix'>" +
      last_prices[product.tri] +
      " &euro;</td>" +
      "<td class='croissance'>0 %</td>" +
      "</tr>";
  }
}

function update_prices_table() {
  let last_prices = get_last_prices();
  let variation = get_variation();

  for (let product of products) {
    let trigram_el = document.querySelector("#afficheur_prix .prix_" + product.tri);
    let trigram_el_price = trigram_el.querySelector(".prix");
    let trigram_el_variation = trigram_el.querySelector(".croissance");

    trigram_el_price.innerText = last_prices[product.tri] + " €";

    let variation_sign = variation[product.tri] > 0 ? "+" : "";
    trigram_el_variation.innerText = variation_sign + variation[product.tri] + "%";

    if (variation[product.tri] > 0) variation_sign = "positive";
    else if (variation[product.tri] < 0) variation_sign = "negative";
    else variation_sign = "neutral";
    trigram_el.setAttribute("growth", variation_sign);
  }
}

function krach_style() {
  if (is_krach === true) {
    document.querySelector("html").classList.add("active_krach");
  } else {
    document.querySelector("html").classList.remove("active_krach");
  }
}

/**
 * get a drink by its trigram
 * @param {string} tri
 */
function getProduct(tri) {
  for (let drink of products) {
    if (drink.tri == tri) {
      return drink;
    }
  }
}

setup();
