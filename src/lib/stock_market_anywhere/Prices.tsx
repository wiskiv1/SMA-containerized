/**
 * @author Witse Panneels, Marc Bresson
 *
 * this file is based on the prices.js file from Marc Bresson. All functions and classes are rewritten to typescript. Where possible function logic was not touched
 */
import { Sale } from "./Sales";
import Sales from "./Sales";
import Indexes from "./Indexes";
import Product from "./Product";

export default class Prices {
  prices_history: Map<string, number[]> = new Map();
  // prices_history structure :
  // {
  //      "tor": [3.2, 4, 5],
  //      "bar": [1.5, 1.34, 1.7],
  //      "plo": [0.62, 0.45, 0.2],
  // }
  amplification: number;

  constructor(amplification = 100) {
    this.amplification = amplification;
  }

  load() {
    //TODO
  }

  toCSV() {
    //TODO
  }

  append(prices_dict: Map<string, number>) {
    for (const drink in this.prices_history) {
      if (prices_dict.has(drink)) {
        this.prices_history.get(drink)?.push(prices_dict.get(drink) as number);
      }
    }

    return this; // why do we return this?
  }

  /*default(), set_default() and krach() are skipped => if we want to set the default/crash prices we can just append those as needed */

  price_variation(
    new_sales: Sale[],
    former_prices: Map<string, number>,
    milliseconds_since_last_update: number
  ): Map<string, number> {
    // compte le nombre total de boissons vendues sur l'intervalle de temps.
    const total_sales = new_sales.length;

    const sales_per_drink = new Sales().cumulative_sales(new_sales);
    for (const drink in former_prices) {
      if (!(drink in sales_per_drink)) {
        sales_per_drink.set(drink, 0);
      }
    }

    const average_sales = total_sales / this.prices_history.size;
    const maximum = Math.max(...Object.values(sales_per_drink));
    const centered_sales = this.center_sales(
      sales_per_drink,
      average_sales,
      maximum
    );

    // tend to amplification's value when total_sales goes to infinity
    // those points are then shared between the drinks
    const max_var_per_minute =
      (Math.atan(total_sales / 10) / (Math.PI / 2)) * this.amplification;
    const max_var =
      (max_var_per_minute * milliseconds_since_last_update) / 1000 / 60;
    for (const [tri, val] of centered_sales) {
      centered_sales.set(tri, val * max_var);
    }

    return centered_sales;
  }

  center_sales(
    sales_per_drink: Map<string, number>,
    average: number,
    max: number
  ): Map<string, number> {
    max = Math.max(max, 1);

    const centered_sales: Map<string, number> = new Map();
    for (const [drink, sales] of sales_per_drink) {
      centered_sales.set(drink, (sales - average) / max);
    }

    return centered_sales;
  }

  last_non_krach(indexes: Indexes): Map<string, number> {
    const number_of_completed_indexes = indexes.party_index.length - 1;
    const last_non_krach_index = indexes.last_non_krach_index();

    const last_non_krach: Map<string, number> = new Map();
    for (const [drink, hist] of this.prices_history) {
      if (hist.length == number_of_completed_indexes) {
        // take only drinks that are still updated
        last_non_krach.set(drink, hist[last_non_krach_index]);
      }
    }

    return last_non_krach;
  }

  /** return the latest prices of drinks */
  last(indexes: Indexes): Map<string, number> {
    const number_of_indexes = indexes.party_index.length;

    const last_prices: Map<string, number> = new Map();
    for (const [drink, hist] of this.prices_history) {
      if (hist.length == number_of_indexes) {
        // take only drinks that are still updated
        last_prices.set(drink, hist[number_of_indexes - 1]);
      }
    }

    return last_prices;
  }

  compute_new_prices(
    new_sales: Sale[],
    indexes: Indexes,
    default_prices: Map<string, Product>
  ): Map<string, number> {
    const last_non_krach_party_index = indexes.last_non_krach_party_index();
    const milliseconds_since_last_update =
      Date.now() - last_non_krach_party_index.time_start.getTime();

    const former_prices = this.last_non_krach(indexes);

    const price_var = this.price_variation(
      new_sales,
      former_prices,
      milliseconds_since_last_update
    );

    const new_prices: Map<string, number> = new Map();
    for (const drink in this.prices_history) {
      let min_price = 0;
      const product = default_prices.get(drink);
      if (product && "minPrice" in product) {
        min_price = product.minPrice;
      }

      const newPrice = round(
        Math.max(
          (former_prices.get(drink) as number) *
            ((1 + (price_var.get(drink) as number)) / 100),
          min_price
        ),
        2
      );
      new_prices.set(drink, newPrice);
    }

    return new_prices;
  }

  // ---- Extra functions ----

  /**
   * get the current price of 1 product
   * @param tri trigram of product
   * @returns
   */
  getCurrentPrice(tri: string): number {
    if (this.prices_history.has(tri)) {
      const arr = this.prices_history.get(tri) as number[];
      return arr[arr.length - 1];
    } else {
      return -1;
    }
  }

  /**
   * Get the current prices of all products
   * @returns
   */
  getCurrentPrices(): Map<string, number> {
    const prices = new Map();
    for (const [tri, arr] of this.prices_history) {
      prices.set(tri, arr[arr.length - 1]);
    }
    return prices;
  }
}

// copy pasted from data.js
function round(x: number, n_digit: number): number {
  return Math.round(x * 10 ** n_digit) / 10 ** n_digit;
}
