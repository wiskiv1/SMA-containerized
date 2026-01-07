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
   * @param start time of first Sale
   * @param end time of Last Sale
   */
  between(start: Date, end: Date): Sale[] {
    if (this.sales.length == 0) return [];

    let i_start = 0;
    while (this.sales[i_start].date < start) {
      i_start++;
    }

    let i_end = i_start;
    while (this.sales[i_end].date < end) {
      i_end++;
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
}
