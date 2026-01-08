/**
 * @author Marc Bresson & Witse Panneels
 */
/* --- GLOBAL VARIABLES --- */
let products;
let interval;
let nextInterval;
var is_krach;
var sale_buttons = {};

/**
 * initial setup of the page
 */
async function setup() {
  let postRequest = await fetch("/api/getProducts");
  let postResponse = await postRequest.json();
  products = postResponse.products;

  buildSaleInterface();

  // check if already crashing
  html_el = document.getElementsByTagName("html")[0];
  let crash = await (await fetch("/api/isCrash")).json();
  is_krach = crash.is_crash;
  if (is_krach) {
    html_el.classList.add("active_krach");
  }

  // add crash event listener
  krach_button = document.getElementById("krach");
  krach_button.addEventListener("click", async () => {
    let data = await (await fetch("/api/admin/toggleCrash")).json();
    if (data.is_crash) {
      html_el.classList.add("active_krach");
    } else {
      html_el.classList.remove("active_krach");
    }
  });

  // get interval information
  let getRequest = await fetch("/api/getInterval");
  let getResponse = await getRequest.json();
  interval = getResponse.intervalLength;
  nextInterval = getResponse.nextInterval;

  //start loop every second
  setInterval(() => {
    loop();
  }, 1000);
}

/**
 * function that is called every x seconds to update prices and other information
 */
function loop() {
  const timeLeft = nextInterval - Date.now(); // time (ms) left till next interval

  update_countdown_new_price(timeLeft);

  //check if other console has activated a crash
  fetch("/api/isCrash").then(async (resp) => {
    let data = await resp.json();
    if (data.is_crash != is_krach) {
      is_krach = data.is_crash;
      if (is_krach) {
        html_el.classList.add("active_krach");
      } else {
        html_el.classList.remove("active_krach");
      }
    }
  });

  if (timeLeft < 0) {
    update_prices();

    // get new interval info
    fetch("/api/getInterval").then(async (resp) => {
      let data = await resp.json();
      interval = data.intervalLength;
      nextInterval = data.nextInterval;
    });
  }
}

function buildSaleInterface() {
  // build up the admin interface
  let el_drinks = document.getElementById("drinks");

  let compteur = 0;
  for (let product of products) {
    let trigram = product.tri;
    let fullname = product.name;
    let initial_price = product.defaultPrice;
    let colour = "hsl(" + Math.ceil((compteur * 360) / (products.length + 1)) + ", 90%, 60%)";
    product.color = colour;
    compteur += 1;

    let bouton = new SaleButton(trigram, fullname, initial_price, colour);
    sale_buttons[trigram] = bouton;

    el_drinks.appendChild(bouton.html());
  }

  for (let trigram in sale_buttons) {
    sale_buttons[trigram].dom.addEventListener("click", function () {
      let actual_price = sale_buttons[trigram].actual_price;
      newSale(trigram, Number(actual_price));

      new_sale_animation(getProduct(trigram).color, actual_price);
      sale_buttons[trigram].add_counter(trigram);
    });
  }

  // TODO move this to somewhere more logical
  for (let trigram in sale_buttons) {
    sale_buttons[trigram].dom.removeAttribute("disabled");
  }
}

async function update_prices() {
  let response = await fetch("/api/getCurrentPrices");
  let prices = (await response.json()).prices;
  let new_price = {};
  for (let p in prices) {
    new_price[p] = prices[p];
  }

  update_sales(new_price);
}

function update_sales(new_price) {
  for (let drink in new_price) {
    sale_buttons[drink].update_dom(new_price[drink]);
  }
}

// update countdown to new price
countdown_new_price_el = document.getElementById("remaining_time_til_new_prices");
function update_countdown_new_price(i) {
  const time = Math.ceil(i / 1000);
  if (time < 0) {
    countdown_new_price_el.innerText = "0";
  } else {
    countdown_new_price_el.innerText = time;
  }
}

/**
 * Sell a drink
 * @param {string} tri
 */
function newSale(tri, pri) {
  fetch("/api/admin/sale", {
    method: "POST",
    body: JSON.stringify({
      tri: tri,
      price: pri,
    }),
  })
    .catch((e) => {
      console.log("Failed to sell " + tri);
      console.log(e);
    })
    .then(async (response) => {
      let json = await response.json();
      if (!json.succes) {
        console.log("Failed to sell " + tri);
      }
    });
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
