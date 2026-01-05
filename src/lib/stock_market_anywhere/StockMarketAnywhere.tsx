/**
 * @author Witse Panneels
 * @date 2026-01-02
 *
 * server side components to run the stock market
 */

/*
THIS FILE IS THE STOCK MARKET

TODO API 
[X]  [X] add product
[ ]  [ ] change product
[X]  [ ] delete product
[X]  [X] sell product
[X]  [X] get products (tri, name, standard price)
[X]  [X] get all products (tri, name, standard price, crash price)
[X]  [X] get current prices (tri, current price)
[X]  [X] get prices history (if needed by the dashboard)?
[ ]  [ ] clear price history
[X]  [X] start market
[X]  [X] pause market
[X]  [ ] set interval
[X]  [X] get interval
[X]  [X] toggle crash
[X]  [X] is crash?
*/
"use server";
import Product from "./Product";
import Prices from "./Prices";
import Sales from "./Sales";
import Indexes from "./Indexes";

const products: Map<string, Product> = new Map();
const prices = new Prices();
const sales = new Sales();
const indexes = new Indexes();
let interval: number;
let intervalID: NodeJS.Timeout;

seed();

let test = 20;

/**
 * seed the products and other objects
 */
function seed() {
  console.log("seeding");
  // products
  products.set("JUP", new Product("JUP", "Jupiler", 2.5, 1.25, 1));
  products.set("DUV", new Product("DUV", "Duvel", 4, 1.5, 1.5));
  products.set("CHO", new Product("CHO", "Chouffe", 4, 1.5, 1.5));
  products.set("KWA", new Product("KWA", "Kwak", 4, 1.5, 1.5));
  products.set("HOE", new Product("HOE", "Hoegaarden Blond", 3, 1, 1));
  products.set("OME", new Product("OME", "Omer", 4, 1.5, 1.5));
  products.set("LIN", new Product("LIN", "Lindemans Kriek", 2, 1, 1));
  products.set("KAS", new Product("KAS", "Kasteelbier Rouge", 4, 1.5, 1.5));

  // other variables
  interval = indexes.refresh_period * 1000;

  // prices
  prices.seed(getDefaultPrices());

  // indexes
  indexes.new(false);
  indexes.end();
}

/**
 * Add a new product to the market
 * @param t TRI of the product (identifier)
 * @param n full name
 * @param p default price
 * @param c crash price
 * @param m minimum price
 */
export async function addProduct(t: string, n: string, p: number, c: number, m: number) {
  console.log("adding product " + t);
  products.set(t, new Product(t, n, p, c, m));

  //stupid workaround for now
  prices.seed(getDefaultPrices());
}

export async function changeProduct() {}

export async function deleteProduct(tri: string) {
  products.delete(tri);
}

export async function addSale(tri: string) {
  const current_price = prices.getCurrentPrice(tri);
  sales.new(tri, current_price);
}

export async function getProducts(): Promise<{ tri: string; name: string; defaultPrice: number }[]> {
  const res: { tri: string; name: string; defaultPrice: number }[] = [];

  for (const [tri, product] of products) {
    const drink: { tri: string; name: string; defaultPrice: number } = {
      tri: tri,
      name: product.name,
      defaultPrice: product.defaultPrice,
    };
    res.push(drink);
  }

  return res;
}

export async function getAllProducts(): Promise<Map<string, Product>> {
  return products; //representation exposure!
}

export async function getCurrentPrices(): Promise<Map<string, number>> {
  return prices.last(indexes);
}

export async function getPriceHistory(): Promise<Map<string, number[]>> {
  return prices.prices_history; //representation exposure!
}

export async function clearPriceHistory() {} // maybe not implement yet

/**
 * using setInterval every X milliseconds
 */
export async function startMarket() {
  indexes.new();

  intervalID = setInterval(() => {
    if (indexes.is_time_for_next()) {
      new_interval();
    }
  }, 1000);
}

export async function pauseMarket() {
  indexes.end();
  clearInterval(intervalID);
}

/**
 * change how frequently prices change
 * @param i new interval in ms
 * @returns interval between price changes and when the next price change wil be
 */
export async function setIntervalTime(i: number): Promise<{ int: number; when: number }> {
  pauseMarket();
  interval = i;
  indexes.refresh_period = Math.floor(i / 1000);
  startMarket();

  return getIntervalTime();
}

/**
 * @returns interval between price changes and when the next price change wil be
 */
export async function getIntervalTime(): Promise<{ int: number; when: number }> {
  const time = Date.now() + indexes.time_until_next(true);
  return {
    int: interval,
    when: time,
  };
}

export async function toggleCrash() {
  if (indexes.is_krach()) {
    new_interval(false);
  } else {
    new_interval(true);
  }
}

export async function isCrash(): Promise<boolean> {
  return indexes.is_krach();
}

/* --- HELP FUNCTIONS --- */
function new_interval(set_krach?: boolean) {
  indexes.end();
  indexes.new(set_krach);

  if (indexes.is_krach()) {
    const krach_prices = getKrachPrices();
    prices.append(krach_prices);
  } else {
    const new_sales_start = indexes.last_non_krach_party_index().time_start;
    const new_sales = sales.since(new_sales_start);

    const new_prices = prices.compute_new_prices(new_sales, indexes, products); //default prices switched to products map
    prices.append(new_prices);
  }

  //data_upload("sales", sales); ==> No localstorage
  //data_upload("indexes", indexes); ==> No localstorage
  //data_upload("prices", prices); ==> No localstorage
  //data_upload("is_krach", indexes.is_krach()); ==> No localstorage
  //update_sales(prices.last(indexes)); ==> No localstorage client has to request new prices
}

function getDefaultPrices(): Map<string, number> {
  const res = new Map();
  for (const [drink, product] of products) {
    res.set(drink, product.defaultPrice);
  }
  return res;
}

function getKrachPrices(): Map<string, number> {
  const res = new Map();
  for (const [drink, product] of products) {
    res.set(drink, product.crashPrice);
  }
  return res;
}

/* --- TEST FUNCTIONS --- */
export async function get() {
  return test;
}

export async function set() {
  intervalID = setInterval(() => {
    test = Math.floor(Math.random() * 10);
    console.log(test);
  }, 10000);
}
