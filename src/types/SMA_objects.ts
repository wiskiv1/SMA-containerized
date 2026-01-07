/**
 * @author Witse Panneels
 */

export type MarketState = "running" | "planned" | "paused" | "off";

export type SMAconfig = {
  interval?: number; // default 60 seconds
  products?: Product[];
  calculatorParams?: object;
};

export type Product = {
  tri: string;
  name: string;
  defaultPrice: number;
  crashPrice: number;
  minPrice?: number;
  maxPrice?: number;
};

export type Prices = {
  [tri: string]: number;
};

export type PricesHistory = {
  [tri: string]: number[];
};

export type Sale = {
  tri: string;
  price: number;
  date?: Date;
};

export type TimeInterval = {
  time_start: Date;
  time_end?: Date;
  length: number;
  is_krach: boolean;
};
