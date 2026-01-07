/**
 * @author Witse Panneels
 * @date 2026-01-07
 *
 * server side components to run the stock market
 */

/*
  TODO: restrict certain actions to certain states

  TODO API 
  [X]  [ ] add product
  [X]  [ ] change product
  [X]  [ ] delete product
  [ ]  [ ] sell product
  [X]  [ ] get products (tri, name, standard price)
  [~]  [ ] get all products (tri, name, standard price, crash price)
  [X]  [ ] get current prices (tri, current price)
  [X]  [ ] get prices history (if needed by the dashboard)?
  [ ]  [ ] clear price history
  [ ]  [ ] start market
  [ ]  [ ] pause market
  [X]  [ ] set interval
  [X]  [ ] get interval
  [ ]  [ ] toggle crash
  [X]  [ ] is crash?
  [X]  [ ] get state
  [ ]  [ ] plan party => how to auto start the party?
  */
import Products from "./Products";
import Sales from "./Sales";
import PriceCalculator from "./PriceCalculator";
import type {
  MarketState,
  SMAconfig,
  Product,
  TimeInterval,
  Sale,
  Prices,
  PricesHistory,
} from "@src/types/SMA_objects";

export default class StockMarkerAnywhere {
  // market information
  private products = new Products();
  private sales = new Sales();
  private indexes: TimeInterval[] = []; // last index is most current
  private calculator = new PriceCalculator();

  // System parameters
  private intervalLength: number = 60000; // 60 sec default
  private intervalID?: NodeJS.Timeout;
  private status: MarketState = "off";
  private is_crash = false;

  constructor() {}

  /* ------ CORE FUNCTIONS ------ */

  seed(config: SMAconfig) {} //TODO

  /**
   * add a new Product to the Stock Market
   * @param product product to be added
   */
  addProduct(product: Product): void {
    console.log("adding product " + product.tri);
    this.products.add(product);
  }

  /**
   * swap out a product with the same trigram while preserving its price history
   *
   * used for fixing a spelling mistake in the full name or when changing some price information
   * @param p — the changed product
   */
  changeProduct(product: Product): void {
    this.products.change(product);
  }

  /**
   * delete a product from the market
   * @param trigram
   */
  deleteProduct(trigram: string): void {
    this.products.delete(trigram);
  }

  /**
   * @param trigram trigram of the product
   * @returns Product object
   */
  getProduct(trigram: string): Product {
    return this.products.getProduct(trigram);
  }

  /**
   * @returns all active products in the market
   */
  getProducts(): Product[] {
    const products: Product[] = [];
    for (const prod of this.products.getProducts().values()) {
      products.push(prod);
    }
    return products;
  }

  /**
   * register a new sale of a product
   * @param sale Sale object
   */
  addSale(sale: Sale): void {
    if (this.status !== "running") throw new Error("No sale allowed, market is not open!");
    this.sales.new(sale);
  }

  /**
   * @returns Current Prices of all the products
   */
  getCurrentPrices(): Prices {
    const result: Prices = {};
    for (const [tri, price] of this.products.getPrices()) {
      result[tri] = price;
    }
    return result;
  }

  /**
   * get the (partial) price history of all products
   *
   * if the size of the history requested is longer then the entire history of a product, the entire history is returned
   * result[tri].length is not guaranteed to be the same for every product
   *
   * the last element of the array is the most recent prize
   *
   * @param i optional: number of most recent elements to be returned (default: entire history)
   * @returns history of all products
   */
  getPriceHistory(i = 0): PricesHistory {
    const result: PricesHistory = {};
    for (const [tri, hist] of this.products.getPriceHistories()) {
      result[tri] = hist.slice(-i);
    }
    return result;
  }

  planMarket(when: number): void {
    throw new Error("Method not implemented."); // TODO
  }

  /**start the market */
  startMarket(): void {
    if (this.status === "running") throw new Error("market already running");
    // TODO check if market is allowed to start (planned time has elapsed)?

    this.status = "running";
    this.new_index(new Date());

    this.intervalID = setInterval(this.loop, 500);
  }

  pauseMarket(): void {
    if (this.status !== "running") throw new Error("market not running");

    this.status = "paused";
    this.end_index();
    clearInterval(this.intervalID);
  }

  /** Reset price and sale history and set state to off, can only be called if marked is paused or state off*/
  resetMarket(): void {
    throw new Error("Method not implemented."); // TODO
  }

  /**
   * @returns current state of the market
   */
  getMarketStatus(): MarketState {
    return this.status;
  }

  /**
   * set the time between new price calculations
   * @param int new Time interval in ms
   */
  setIntervalTime(int: number): void {
    this.indexes.at(-1)!.length = int; // set current interval length
    this.intervalLength = int; // set future interval lengths
  }

  /**
   * @returns current time between new price calculations in ms
   */
  getIntervalTime(): number {
    return this.intervalLength;
  }

  /**
   * @param ms optional: return time in milliseconds
   * @returns the time left until the next interval
   */
  TimeUntilNextInterval(ms = false): number {
    const milliseconds_remaining =
      this.indexes.at(-1)!.time_start.getTime() + this.intervalLength - Date.now();
    if (ms) {
      return milliseconds_remaining;
    } else {
      return Math.ceil(milliseconds_remaining / 1000);
    }
  }

  /**
   *
   */
  toggleCrash(): boolean {
    // set this.iscrash variable
    // start new interval with the crash prizes
    // return this.is_crash
    this.is_crash = !this.is_crash;
    this.new_index(this.end_index()); // end current index and start new one at the same timestamp
    return this.is_crash;
  }

  isCrash(): boolean {
    return this.is_crash;
  }

  /* ------ PRIVATE FUNCTIONS ------ */

  // function called every 500ms when market is running
  private loop(): void {
    if (this.isTimeForNext()) {
      this.new_index(this.end_index()); // end current index and start new one at the same timestamp
    }
  }

  /**
   * start new index, calculate prices and append
   * @param time start time of new interval
   */
  private new_index(time: Date): void {
    this.indexes.push({
      time_start: time,
      length: this.intervalLength,
      is_krach: this.is_crash,
    });

    const newPrices = this.calculator.calculateNewPrices(
      this.products,
      this.sales,
      this.indexes,
      this.is_crash
    );

    // if price calculator changed the crash state, change it without starting a new interval
    const c = this.indexes.at(-1);
    this.is_crash = c ? c.is_krach : this.is_crash;

    this.products.updatePrices(newPrices);
  }

  private end_index(): Date {
    const time = new Date();
    this.indexes.at(-1)!.time_end = time;
    return time;
  }

  private isTimeForNext(): boolean {
    return this.TimeUntilNextInterval(true) < 0;
  }
}

export const market = new StockMarkerAnywhere();
