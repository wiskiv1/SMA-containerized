/**
 * @author Witse Panneels, Marc Bresson
 *
 * this file is based on the sales.js file from Marc Bresson. All functions and classes are rewritten to typescript. Where possible function logic was not touched
 */

export default class Sales {
  sales: Sale[] = [];
  sale_counter: Map<string, number> = new Map(); //former most_sold

  constructor() {}

  new(drink_trigram: string, price: number) {
    this.sales.push(new Sale(drink_trigram, new Date(), price));

    if (this.sale_counter.has(drink_trigram)) {
      const t = this.sale_counter.get(drink_trigram) as number;
      this.sale_counter.set(drink_trigram, t + 1);
    } else {
      this.sale_counter.set(drink_trigram, 1);
    }
  }

  load() {}

  toCSV() {}

  /**return sales between 2 moments in time */
  between(start: Date, end: Date): Sale[] {
    if (this.sales.length == 0) return [];

    let i_start = 0;
    while (this.sales[i_start].time < start) {
      i_start++;
    }

    let i_end = i_start;
    while (this.sales[i_end].time < end) {
      i_end++;
    }

    return this.sales.slice(i_start, i_end);
  }

  /**
   * return sales since given time
   * @param since
   */
  since(since: Date): Sale[] {
    if (this.sales.length == 0) return [];

    let i = this.sales.length;
    while (i > 1 && this.sales[i - 1].time > since) {
      i--;
    }

    return this.sales.slice(i);
  }

  /**
   * Count how many times each drink was sold in a given sale array
   * @param sales_extract array of Sale
   * @returns map of the amounts
   */
  cumulative_sales(sales_extract: Sale[]): Map<string, number> {
    const sales_per_drink: Map<string, number> = new Map();
    for (const sale of sales_extract) {
      if (sales_per_drink.has(sale.tri)) {
        const t = sales_per_drink.get(sale.tri) as number;
        sales_per_drink.set(sale.tri, t + 1);
      } else {
        sales_per_drink.set(sale.tri, 1);
      }
    }

    // sales_per_drink = {
    //     "tor": 3,
    //     "bar": 1,
    //     "plo": 1
    // }
    return sales_per_drink;
  }
}

export class Sale {
  tri: string;
  time: Date;
  price: number;

  constructor(tri: string, time: Date, price: number) {
    this.tri = tri;
    this.time = time;
    this.price = price;
  }
}
