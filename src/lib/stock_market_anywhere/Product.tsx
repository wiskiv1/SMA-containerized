/**
 * Product class
 */
export default class Product {
  tri: string;
  name: string;
  defaultPrice: number;
  crashPrice: number;
  minPrice: number;

  /**
   * @param t TRI (identifier)
   * @param n Full name of the product
   * @param p Default Price
   * @param c Crash Price
   * @param m minimum Price
   */
  constructor(t: string, n: string, p: number, c: number, m: number) {
    this.tri = t;
    this.name = n;
    this.defaultPrice = p;
    this.crashPrice = c;
    this.minPrice = m;
  }
}
