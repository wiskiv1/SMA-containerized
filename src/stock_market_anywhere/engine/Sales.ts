import { Sale } from "@/src/types/SMA_objects";

/**
 * Object to store Sale objects
 *
 * @author Witse Panneels
 */
export default class Sales {
  private sales: { tri: string; price: number; date: Date }[] = []; // 0 is the oldest sale

  /**
   * register a new sale
   *
   * this function overwrites the sale.date parameter with the current time
   * @param sale
   */
  new(sale: Sale): void {
    this.sales.push({
      tri: sale.tri,
      price: sale.price,
      date: new Date(),
    });
  }

  /**
   * Get all sales (in order) between the given date objects
   * start inclusive end exclusive
   * @param start time of first Sale
   * @param end time of Last Sale
   */
  between(start: Date, end: Date): Sale[] {
    if (this.sales.length == 0) return [];

    let i_start;
    for (let i = 0; i < this.sales.length; i++) {
      if (this.sales[i].date.getTime() >= start.getTime()) {
        i_start = i;
        break;
      }
    }
    if (i_start === undefined) i_start = this.sales.length;

    let i_end: number | undefined;
    for (let i = i_start; i < this.sales.length; i++) {
      if (this.sales[i].date.getTime() > end.getTime()) {
        i_end = i;
        break;
      }
    }

    return this.sales.slice(i_start, i_end);
  }

  /**
   * Get all sales (in order) starting from the given date
   * @param since time of first sale
   */
  since(since: Date): Sale[] {
    return this.between(since, new Date());
  }

  /**
   * delete all sale data, and reset object
   */
  reset() {
    this.sales = [];
  }
}
