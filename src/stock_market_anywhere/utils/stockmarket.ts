import { Product, Sale, TimeInterval } from "@src/types/SMA_objects";

/**
 * @param sales
 * @returns map of product trigrams and the amount of sales they have
 */
export function countSalesPerProduct(sales: Sale[]): Map<string, number> {
  const sales_per_drink: Map<string, number> = new Map();
  for (const sale of sales) {
    if (sales_per_drink.has(sale.tri)) {
      const t = sales_per_drink.get(sale.tri) as number;
      sales_per_drink.set(sale.tri, t + 1);
    } else {
      sales_per_drink.set(sale.tri, 1);
    }
  }
  return sales_per_drink;
}

/**
 * round a number to the nearest n digits
 * @param x number to be rounder
 * @param n_digit amount of digits
 * @returns rounded number
 */
export function round(x: number, n_digit: number): number {
  return Math.round(x * 10 ** n_digit) / 10 ** n_digit;
}

/**
 * returns the index for the last non crash entry's
 *
 * => 0= most recent interval, 1= previous Interval, ...
 * @param indexes indexes of the stockmarket
 * @returns index
 */
export function lastNonCrashIndex(indexes: TimeInterval[]): number {
  if (indexes.length == 1) return 0;
  let i = 0;

  if (indexes.at(-1)!.time_end == undefined) {
    // check if last index is done yet
    i++;
  }

  while (indexes.at(-1 - i)!.is_krach) {
    i++;
  }

  return i - 1;
}

export function isProduct(obj: unknown): obj is Product {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const p = obj as Record<string, unknown>;

  return (
    typeof p.tri === "string" &&
    typeof p.name === "string" &&
    typeof p.defaultPrice === "number" &&
    typeof p.crashPrice === "number" &&
    (p.minPrice === undefined || typeof p.minPrice === "number") &&
    (p.maxPrice === undefined || typeof p.maxPrice === "number")
  );
}
