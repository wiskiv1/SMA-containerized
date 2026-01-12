import { Product } from "@/src/types/SMA_objects";

/**
 * Object to store and manipulate Products and their Price history
 *
 * @author Witse Panneels
 */
export default class Products {
  private products: Map<string, Product> = new Map();
  private priceHistory: Map<string, number[]> = new Map(); // last index is the current price

  constructor() {}

  /**
   * add a new product to the market and set its price history to the default price
   * @param p
   */
  add(p: Product) {
    this.products.set(p.tri, p);
    this.priceHistory.set(p.tri, [p.defaultPrice]);
  }

  /**
   * swap out a product with the same trigram while preserving its price history
   *
   * used for fixing a spelling mistake in the full name or when changing some price information
   * @param p the changed product
   */
  change(p: Product): void {
    const temp = this.priceHistory.get(p.tri);
    this.products.set(p.tri, p);
    this.priceHistory.set(p.tri, temp ? temp : [p.defaultPrice]);
  }

  /**
   * delete a product and its price history
   *
   * @param tri trigram of the product to be deleted
   */
  delete(tri: string): void {
    this.products.delete(tri);
    this.priceHistory.delete(tri);
  }

  /**
   * get all products
   * @returns Map of trigrams and Products
   */
  getProducts(): Map<string, Product> {
    return this.products; // TODO make deep copy
  }

  /**
   * get a specific product
   * @param tri trigram of the product
   * @returns product
   */
  getProduct(tri: string): Product {
    if (this.products.has(tri)) {
      return this.products.get(tri) as Product;
    } else {
      throw new Error("Trigram does not exist");
    }
  }

  /**
   * get the default prices of all products
   * @returns Map of trigrams and default prices
   */
  getDefaultPrices(): Map<string, number> {
    const result: Map<string, number> = new Map();
    for (const [tri, prod] of this.products) {
      result.set(tri, prod.defaultPrice);
    }
    return result;
  }

  /**
   * get the default price of a specific product
   * @param tri trigram of the product
   * @returns product.defaultPrice
   */
  getDefaultPrice(tri: string): number {
    if (this.products.has(tri)) {
      return (this.products.get(tri) as Product).defaultPrice;
    } else {
      throw new Error("Trigram does not exist");
    }
  }

  /**
   * get the crash prices of all products
   * @returns Map of trigrams and crash prices
   */
  getCrashPrices(): Map<string, number> {
    const result: Map<string, number> = new Map();
    for (const [tri, prod] of this.products) {
      result.set(tri, prod.crashPrice);
    }
    return result;
  }

  /**
   * get the crash price of a specific product
   * @param tri trigram of the product
   * @returns product.crashPrice
   */
  getCrashPrice(tri: string): number {
    if (this.products.has(tri)) {
      return (this.products.get(tri) as Product).crashPrice;
    } else {
      throw new Error("Trigram does not exist");
    }
  }

  /**
   * get the minimum prices of all products
   * if the minimum price is not defined, the crash price is returned
   * @returns Map of trigrams and minimum prices
   */
  getMinPrices(): Map<string, number> {
    const result: Map<string, number> = new Map();
    for (const [tri, prod] of this.products) {
      const minPrice = prod.minPrice ? prod.minPrice : prod.crashPrice;
      result.set(tri, minPrice);
    }
    return result;
  }

  /**
   * get the minium price of a specific product
   * if the minimum price is not defined, the crash price is returned
   * @param tri trigram of the product
   * @returns product.minPrice
   */
  getMinPrice(tri: string): number {
    if (this.products.has(tri)) {
      const prod = this.products.get(tri) as Product;
      return prod.minPrice ? prod.minPrice : prod.crashPrice;
    } else {
      throw new Error("Trigram does not exist");
    }
  }

  /**
   * get the maximum prices of all products
   * if the maximum price is not defined, undefined is returned
   * @returns Map of trigrams and maximum prices
   */
  getMaxPrices(): Map<string, number | undefined> {
    const result: Map<string, number | undefined> = new Map();
    for (const [tri, prod] of this.products) {
      result.set(tri, prod.maxPrice);
    }
    return result;
  }

  /**
   * get the maximum price of a specific product
   * if the maximum price is not defined, undefined is returned
   * @param tri trigram of the product
   * @returns product.maxPrice
   */
  getMaxPrice(tri: string): number | undefined {
    if (this.products.has(tri)) {
      const prod = this.products.get(tri) as Product;
      return prod.maxPrice;
    } else {
      throw new Error("Trigram does not exist");
    }
  }

  /**
   * Get all the prices at specified index
   * 0 (default): most current, 1: prices 1 interval ago, ...
   * @param index
   */
  getPrices(index = 0): Map<string, number> {
    const result: Map<string, number> = new Map();
    for (const [tri, hist] of this.priceHistory) {
      // get the correct index => if out of bounds: loop over the price history
      let number = hist.length - 1 - index;
      while (number < 0) {
        number += hist.length;
      }

      result.set(tri, hist.at(number) as number);
    }
    return result;
  }

  /**
   * Get the price at specified index
   * 0 (default): most current, 1: prices 1 interval ago, ...
   * @param tri trigram of the product you want the price of
   * @param index
   */
  getPrice(tri: string, index = 0): number {
    if (this.priceHistory.has(tri)) {
      const hist = this.priceHistory.get(tri) as number[];

      // get the correct index => if out of bounds: loop over the price history
      let number = -1 - index;
      while (number < 0) {
        number += hist.length;
      }

      return hist.at(number) as number;
    } else {
      throw new Error("Trigram does not exist");
    }
  }

  /**
   * maybe at a parameter for how far back you want? => if param not filled in give whole history
   */
  getPriceHistories(): Map<string, number[]> {
    const result: Map<string, number[]> = new Map();
    for (const [tri, hist] of this.priceHistory) {
      result.set(tri, hist);
    }
    return result;
  }

  /**
   * maybe at a parameter for how far back you want? => if param not filled in give whole history
   */
  getPriceHistory(tri: string): number[] {
    if (this.priceHistory.has(tri)) {
      return this.priceHistory.get(tri)!;
    } else {
      throw new Error("Trigram does not exist");
    }
  }

  /**
   * Append new prices for products.
   *
   * products not in the map do net get updated!
   * extra trigrams in the map are ignored.
   *
   * @param newPrices map of trigrams and new prices
   */
  updatePrices(newPrices: Map<string, number>): void {
    for (const [tri, hist] of this.priceHistory) {
      const newPrice = newPrices.get(tri);
      if (newPrice !== undefined) {
        hist.push(newPrice);
      }
    }
  }

  /**
   * delete all price history data and reset prices to default
   */
  reset() {
    for (const [tri, product] of this.products) {
      this.priceHistory.set(tri, [product.defaultPrice]);
    }
  }
}
