/**
 * @author Witse Panneels
 * @date 2026-01-07
 *
 * server side components to run the stock market
 */
import Products from "./Products";
import Sales from "./Sales";
import PriceCalculator, { IPriceCalculator } from "./PriceCalculator";
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
  private calculator = new PriceCalculator() as IPriceCalculator;

  // System parameters
  private intervalLength: number = 60000; // 60 sec default
  private intervalID?: NodeJS.Timeout;
  private status: MarketState = "off";
  private is_crash = false;
  private plannedStartTime?: Date;

  constructor() {}

  /* ------ CORE FUNCTIONS ------ */

  seed(config: SMAconfig) {
    if (config.products) {
      for (const prod of config.products) {
        this.addProduct(prod);
      }
    }

    console.log("calculator name: " + this.calculator.name);
    console.log("calculator version: " + this.calculator.version);
    if (config.calculatorParams) {
      console.log("Loading Calculator Parameters");
      console.log(config.calculatorParams);
      this.calculator.setParameters(config.calculatorParams);
    }
  }

  /**
   * add a new Product to the Stock Market
   * @param product product to be added
   */
  addProduct(product: Product): void {
    console.log("[SMA] adding product " + product.tri);
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
    console.log("[SMA] changing product " + product.tri);
  }

  /**
   * delete a product from the market
   * @param trigram
   */
  deleteProduct(trigram: string): void {
    this.products.delete(trigram);
    console.log("[SMA] deleting product " + trigram);
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

  planMarket(when: Date): void {
    if (this.status === "running") throw new Error("cannot plan market already running");
    if (when.getTime() < Date.now()) throw new Error("Cannot plan party in the past");
    this.plannedStartTime = new Date(when.getTime());
    this.status = "planned";
    console.log("[SMA] planned market for: " + when.toISOString());
  }

  whenMarketOpen(): Date {
    return this.plannedStartTime ? this.plannedStartTime : new Date(Date.now() - 60000);
  }

  /**start the market & force start if party is planned*/
  startMarket(): void {
    if (this.status === "running") throw new Error("market already running");

    this.status = "running";
    this.new_index(new Date());

    this.intervalID = setInterval(() => {
      this.loop();
    }, 500);

    console.log("[SMA] started market: " + this.intervalID);
  }

  pauseMarket(): void {
    if (this.status !== "running") throw new Error("market not running");

    this.status = "paused";
    this.end_index();
    clearInterval(this.intervalID);

    console.log("[SMA] paused market: " + this.intervalID);
  }

  /** Reset price and sale history and set state to off, can only be called if marked is paused or state off*/
  resetMarket(): void {
    this.end_index();
    clearInterval(this.intervalID); // stop loop

    this.indexes = []; // reset indexes

    this.is_crash = false;
    this.sales.reset();
    this.products.reset();

    this.status = "off";

    console.log("[SMA] reset market: " + this.intervalID);
  }

  /**
   * @returns current state of the market
   */
  getMarketStatus(): MarketState {
    if (this.status === "planned" && this.timeToStart()) {
      this.startMarket(); // if market open is planned => start the market
    }

    return this.status;
  }

  /**
   * set the time between new price calculations
   * @param int new Time interval in ms
   */
  setIntervalTime(int: number): void {
    console.log("[SMA] setting interval to " + int + "ms");
    if (this.status === "running") this.indexes.at(-1)!.length = int; // set current interval length
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
    if (this.status === "off" || this.status === "planned") return -1;
    const milliseconds_remaining = this.indexes.at(-1)!.time_start.getTime() + this.intervalLength - Date.now();
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
    if (this.status !== "running") throw new Error("cannot toggle crash: market is not running"); // if not running dont swap

    this.is_crash = !this.is_crash;
    this.new_index(this.end_index()); // end current index and start new one at the same timestamp
    return this.is_crash;
  }

  isCrash(): boolean {
    return this.is_crash;
  }

  getCalculatorName(): string {
    return this.calculator.name;
  }

  getCalculatorVersion(): string {
    return this.calculator.version;
  }

  getCalculatorParams(): object {
    return this.calculator.getParameters();
  }

  setCalculatorParams(params: object): void {
    this.calculator.setParameters(params);
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

    const newPrices = this.calculator.calculateNewPrices(this.products, this.sales, this.indexes, this.is_crash);

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

  /** is it time to open the market? */
  private timeToStart(): boolean {
    if (this.status !== "planned") return false;

    const milliseconds_remaining = this.plannedStartTime!.getTime() - Date.now();
    return milliseconds_remaining < 0;
  }
}

export const market = new StockMarkerAnywhere();
