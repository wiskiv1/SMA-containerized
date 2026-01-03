/**
 * @author Witse Panneels
 * @date 2026-01-02
 *
 * server side components to run the stock market
 */

/*
THIS FILE IS THE STOCK MARKET

TODO 
[X] add product
[ ] change product
[X] delete product
[X] sell product
[X] get products (tri, name, standard price)
[X] get all products (tri, name, standard price, crash price)
[X] get current prices (tri, current price)
[X] get prices history (if needed by the dashboard)?
[ ] clear price history
[X] start market
[X] pause market
[X] set interval
[X] get interval
[X] toggle crash
[X] is crash?
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
let interval: number = 60 * 1000;
let intervalID: NodeJS.Timeout;

let test = 20;

/**
 * Add a new product to the market
 * @param t TRI of the product (identifier)
 * @param n full name
 * @param p default price
 * @param c crash price
 * @param m minimum price
 */
export async function addProduct(
  t: string,
  n: string,
  p: number,
  c: number,
  m: number
) {
  products.set(t, new Product(t, n, p, c, m));
}

export async function changeProduct() {}

export async function deleteProduct(tri: string) {
  products.delete(tri);
}

export async function addSale(tri: string) {
  const current_price = prices.getCurrentPrice(tri);
  sales.new(tri, current_price);
}

export async function getProducts(): Promise<
  { tri: string; name: string; default_price: number }[]
> {
  const res: { tri: string; name: string; default_price: number }[] = [];

  for (const [tri, product] of products) {
    const drink: { tri: string; name: string; default_price: number } = {
      tri: tri,
      name: product.name,
      default_price: product.defaultPrice,
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
  intervalID = setInterval(() => {
    if (indexes.is_time_for_next()) {
      new_interval();
    }
  }, 1000);
}

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

function getKrachPrices(): Map<string, number> {
  const res = new Map();
  for (const [drink, product] of products) {
    res.set(drink, product.crashPrice);
  }
  return res;
}

export async function pauseMarket() {
  clearInterval(intervalID);
}

/**
 * change how frequently prices change
 * @param i new interval in ms
 */
export async function setIntervalTime(i: number) {
  pauseMarket();
  interval = i;
  indexes.refresh_period = i;
  startMarket();
}

/**
 * @returns interval between price changes
 */
export async function getIntervalTime(): Promise<number> {
  return interval;
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

/* --- TEST FUNCTIONS -- */
export async function get() {
  return test;
}

export async function set() {
  intervalID = setInterval(() => {
    test = Math.floor(Math.random() * 10);
    console.log(test);
  }, 10000);
}
